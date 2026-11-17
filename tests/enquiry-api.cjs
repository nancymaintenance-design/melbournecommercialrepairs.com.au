const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createHandler } = require('../api/enquiry.js');
const origin = 'https://melbournecommercialrepairscomau.vercel.app';
const valid = () => ({ name: 'TEST Enquiry', email: 'test@example.com', phone: '0400000000', address: 'TEST Melbourne', service: '0', sector: '0', region: 'Melbourne', details: 'TEST only; no work required.', requestId: '8e40296e-648a-487c-a3b9-125666ce287a', photos: [] });
function setup(options = {}) {
  const calls = [];
  const handler = createHandler({ env: { RESEND_API_KEY: 'test-key', RESEND_FROM: 'Ellis <enquiries@example.com>' }, fetch: async (url, init) => { calls.push({ url, ...init }); return { ok: true, json: async () => ({ id: 'email-test-id' }) }; }, ...options });
  async function run(body = valid(), overrides = {}) {
    const req = { method: 'POST', headers: { origin, 'content-type': 'application/json', 'x-forwarded-for': '192.0.2.1' }, body, ...overrides };
    const res = { headers: {}, setHeader(k, v) { this.headers[k] = v; }, status(n) { this.statusCode = n; return this; }, json(data) { this.body = data; return this; }, end() {} };
    await handler(req, res); return res;
  }
  return { run, calls };
}
test('sends only to Ellis, with visitor reply-to and attached bytes', async () => {
  const { run, calls } = setup(); const body = valid();
  body.to = 'attacker@example.com';
  body.photos = [{ filename: 'site.png', content: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aP2kAAAAASUVORK5CYII=' }];
  const res = await run(body); assert.equal(res.statusCode, 200);
  const mail = JSON.parse(calls[0].body);
  assert.deepEqual(mail.to, ['elliservices.group@gmail.com']); assert.equal(mail.reply_to, body.email);
  assert.equal(mail.attachments[0].content, body.photos[0].content);
  assert.match(calls[0].headers['Idempotency-Key'], /^ellis-enquiry\//);
  assert.equal(res.body.id, undefined);
});
test('validates required fields, service, sector and header injection', async () => {
  for (const patch of [{ name: '' }, { email: 'a\r\nBcc: a@b.co' }, { details: 'a'.repeat(3001) }, { service: '12' }, { sector: '99' }, { requestId: 'bad' }]) {
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
  const { run } = setup({ fetch: async () => ({ ok: false, json: async () => ({ message: 'private provider detail' }) }) });
  const res = await run(); assert.equal(res.statusCode, 502); assert.doesNotMatch(JSON.stringify(res.body), /private/);
});
test('same request payload uses same provider idempotency key; edits change it', async () => {
  const { run, calls } = setup(); await run(); await run(); await run({ ...valid(), details: 'Changed project details' });
  assert.equal(calls[0].headers['Idempotency-Key'], calls[1].headers['Idempotency-Key']); assert.notEqual(calls[1].headers['Idempotency-Key'], calls[2].headers['Idempotency-Key']);
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
  assert.equal((await setup({ fetch: async () => ({ ok: true, json: async () => ({}) }) }).run()).statusCode, 502);
  assert.equal((await setup({ fetch: async () => { throw new Error('secret transport error'); } }).run()).statusCode, 502);
});
