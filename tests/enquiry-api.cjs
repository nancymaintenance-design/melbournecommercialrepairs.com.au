const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createHandler } = require('../api/enquiry.js');
const origin = 'https://melbournecommercialrepairscomau.vercel.app';
const valid = () => ({ name: 'TEST Enquiry', email: 'test@example.com', phone: '0400000000', address: 'TEST Melbourne', service: '0', sector: '0', region: 'Melbourne', details: 'TEST only; no work required.', requestId: '8e40296e-648a-487c-a3b9-125666ce287a', photos: [] });
function setup(options = {}) {
  const calls = [];
  const { provider = () => ({ ok: true, json: async () => ({ id: 'email-test-id' }) }), ...overrides } = options;
  const handler = createHandler({
    env: { RESEND_API_KEY: 'test-key', RESEND_FROM: 'Ellis <enquiries@example.com>' },
    fetch: async (url, init) => {
      calls.push({ url, ...init });
      return provider(calls.length);
    },
    ...overrides
  });
  async function run(body = valid(), overrides = {}) {
    const req = { method: 'POST', body, ...overrides, headers: { origin, 'content-type': 'application/json', 'x-forwarded-for': '192.0.2.1', ...overrides.headers } };
    const res = { headers: {}, setHeader(k, v) { this.headers[k] = v; }, status(n) { this.statusCode = n; return this; }, json(data) { this.body = data; return this; }, end() {} };
    await handler(req, res); return res;
  }
  return { run, calls };
}
test('sends original enquiry to Ellis, then a private receipt to the validated customer address', async () => {
  const { run, calls } = setup(); const body = valid();
  body.to = 'attacker@example.com';
  body.photos = [{ filename: 'site.png', content: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aP2kAAAAASUVORK5CYII=' }];
  body.details = '<script>private project text</script>';
  const res = await run(body); assert.equal(res.statusCode, 200);
  assert.equal(calls.length, 2);
  assert(calls.every(call => call.url === 'https://api.resend.com/emails'));
  const mail = JSON.parse(calls[0].body);
  assert.deepEqual(mail.to, ['melbournecommercialrepairs.au@outlook.com']); assert.equal(mail.reply_to, body.email);
  assert.equal(mail.attachments[0].content, body.photos[0].content);
  assert.match(calls[0].headers['Idempotency-Key'], /^ellis-enquiry\//);
  const receipt = JSON.parse(calls[1].body);
  assert.deepEqual(receipt.to, [body.email]);
  assert.equal(receipt.from, mail.from);
  assert.equal(receipt.reply_to, 'melbournecommercialrepairs.au@outlook.com');
  assert.match(receipt.subject, /我们已收到您的项目咨询/);
  assert.match(receipt.text, /0450666876/);
  assert.doesNotMatch(calls[1].body, /private project text|site.png|attacker@example.com/);
  assert.equal(receipt.attachments, undefined);
  assert.deepEqual(res.body, { ok: true });
});
test('takes receipt language from the same-origin contact URL', async () => {
  for (const [referer, expected] of [
    [origin + '/contact/?lang=en&service=multi', /We’ve received your enquiry/],
    [origin + '/contact/?lang=zh', /我们已收到/],
    ['https://example.com/contact/?lang=en', /我们已收到/]
  ]) {
    const { run, calls } = setup();
    assert.equal((await run(valid(), { headers: { referer } })).statusCode, 200);
    assert.match(JSON.parse(calls[1].body).subject, expected);
  }
});
test('does not attempt the receipt until the owner acceptance has been confirmed', async () => {
  let ownerReached;
  let acceptOwner;
  const ownerReachedPromise = new Promise(resolve => { ownerReached = resolve; });
  const ownerResult = new Promise(resolve => { acceptOwner = resolve; });
  const { run, calls } = setup({
    provider: n => n === 1 ? { ok: true, json: () => { ownerReached(); return ownerResult; } } :
      { ok: true, json: async () => ({ id: 'receipt-id' }) }
  });
  const pending = run();
  await ownerReachedPromise;
  assert.equal(calls.length, 1);
  acceptOwner({ id: 'owner-id' });
  assert.equal((await pending).statusCode, 200);
  assert.equal(calls.length, 2);
});
test('logs receipt rejection and transport failure separately without failing the enquiry', async t => {
  const logs = t.mock.method(console, 'warn', () => {});
  for (const [failure, reason] of [
    [() => ({ ok: false, status: 422, json: async () => ({ message: 'private provider detail' }) }), 'provider_rejected'],
    [() => { throw new Error('private provider detail'); }, 'transport_or_response_error'],
    [() => ({ ok: true, json: async () => ({}) }), 'invalid_provider_response']
  ]) {
    const { run, calls } = setup({ provider: n => n === 1 ? { ok: true, json: async () => ({ id: 'owner-id' }) } : failure() });
    const res = await run();
    assert.equal(calls.length, 2);
    assert.equal(res.statusCode, 200);
    assert.deepEqual(res.body, { ok: true });
    const event = logs.mock.calls.at(-1).arguments[0];
    assert.equal(JSON.parse(event).event, 'enquiry.receipt_failed');
    assert.equal(JSON.parse(event).reason, reason);
    assert.equal(JSON.parse(event).requestId, valid().requestId);
    assert.doesNotMatch(event, /private provider detail|test@example.com|test-key/);
  }
});
test('validates required fields, service, sector and header injection', async () => {
  for (const patch of [{ name: '' }, { email: '' }, { email: undefined }, { email: 'a\r\nBcc: a@b.co' }, { details: 'a'.repeat(3001) }, { service: '12' }, { sector: '99' }, { requestId: 'bad' }]) {
    const { run, calls } = setup(); assert.equal((await run({ ...valid(), ...patch })).statusCode, 400); assert.equal(calls.length, 0);
  }
});
test('rejects non-image bytes, bad base64, remote attachment paths and too many photos', async () => {
  for (const photos of [[{ filename: 'x.jpg', content: Buffer.from('<script>x</script>').toString('base64') }], [{ filename: 'x.png', content: '!!!!' }], [{ path: 'https://example.com/a' }], Array(6).fill({})]) {
    const { run, calls } = setup(); assert.equal((await run({ ...valid(), photos })).statusCode, 400); assert.equal(calls.length, 0);
  }
});
test('rejects oversized payloads before sending', async () => {
  const { run, calls } = setup(); assert.equal((await run({ ...valid(), padding: 'a'.repeat(4200000) })).statusCode, 413); assert.equal(calls.length, 0);
});
test('method, origin and media type are enforced', async () => {
  const { run } = setup(); assert.equal((await run(valid(), { method: 'GET' })).statusCode, 405);
  assert.equal((await run(valid(), { headers: { origin: 'https://evil.example', 'content-type': 'application/json' } })).statusCode, 403);
  assert.equal((await run(valid(), { headers: { origin, 'content-type': 'text/plain' } })).statusCode, 415);
});
test('missing config and provider failures do not report success or expose details', async () => {
  assert.equal((await setup({ env: {} }).run()).statusCode, 503);
  const { run, calls } = setup({ provider: () => ({ ok: false, json: async () => ({ message: 'private provider detail' }) }) });
  const res = await run(); assert.equal(res.statusCode, 502); assert.doesNotMatch(JSON.stringify(res.body), /private/);
  assert.equal(calls.length, 1);
});
test('same request payload uses same provider idempotency key; edits change it', async () => {
  const { run, calls } = setup(); await run(); await run(); await run({ ...valid(), details: 'Changed project details' });
  assert.equal(calls.length, 6);
  const [owner, receipt, ownerRetry, receiptRetry, changedOwner, changedReceipt] = calls.map(call => call.headers['Idempotency-Key']);
  assert.equal(owner, ownerRetry);
  assert.equal(receipt, receiptRetry);
  assert.notEqual(owner, receipt);
  assert.notEqual(owner, changedOwner);
  assert.notEqual(receipt, changedReceipt);
});
test('honeypot does not send email', async () => {
  const { run, calls } = setup(); assert.equal((await run({ ...valid(), website: 'spam' })).statusCode, 400); assert.equal(calls.length, 0);
});
test('burst limit bounds requests in a warm function instance', async () => {
  const { run } = setup(); for (let i = 0; i < 5; i++) assert.equal((await run()).statusCode, 200);
  assert.equal((await run()).statusCode, 429);
});
test('all service and sector names match the visible form catalogue', async () => {
  const fs = require('node:fs'), vm = require('node:vm');
  const app = fs.readFileSync(require('node:path').join(__dirname, '../app.js'), 'utf8');
  const catalogue = vm.runInNewContext(app.slice(app.indexOf('  const services ='), app.indexOf('  function renderServices()')) + ';({services,sectors})');
  for (let i = 0; i < catalogue.services.length; i++) {
    const { run, calls } = setup(); await run({ ...valid(), service: String(i), sector: String(i % 8), area: 'cbd-inner' });
    const mail = JSON.parse(calls[0].body); assert.equal(mail.subject, `Ellis website enquiry — ${catalogue.services[i].en}`);
    assert.ok(mail.text.includes(`Property type: ${catalogue.sectors[i % 8].en}`)); assert.ok(mail.text.includes('Area: cbd-inner'));
  }
});
test('invalid provider success and network rejection fail safely', async () => {
  for (const provider of [() => ({ ok: true, json: async () => ({}) }), () => { throw new Error('secret transport error'); }]) {
    const { run, calls } = setup({ provider });
    assert.equal((await run()).statusCode, 502);
    assert.equal(calls.length, 1);
  }
});
