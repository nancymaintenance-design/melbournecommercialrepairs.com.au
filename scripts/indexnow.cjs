const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const fs = require('node:fs/promises');
const { parse } = require('parse5');
const { canonicalUrl, origin } = require('../content/search-config.cjs');

const host = new URL(origin).host;
const endpoint = 'https://api.indexnow.org/indexnow';
const request = url => fetch(url, { redirect: 'error', signal: AbortSignal.timeout(15000) });
const attr = (node, name) => node.attrs?.find(value => value.name === name)?.value;
const text = node => (node.childNodes || []).map(child => child.value || '').join('');

function* elements(root) {
  yield root;
  for (const child of root.childNodes || []) yield* elements(child);
}

function assertCanonical(href) {
  const url = new URL(href);
  const lang = url.searchParams.get('lang');
  assert(['zh', 'en'].includes(lang) && url.pathname.endsWith('/') &&
    href === canonicalUrl(url.pathname, lang), 'Unexpected sitemap URL: ' + href);
  return url;
}

async function snapshot(base) {
  const baseUrl = new URL(base);
  assert(base === origin || (baseUrl.origin === base && baseUrl.protocol === 'http:' &&
    ['127.0.0.1', 'localhost'].includes(baseUrl.hostname)), 'Use the official origin or a loopback preview');
  const sitemap = await request(base + '/sitemap.xml');
  assert.equal(sitemap.status, 200, 'Sitemap is unavailable');
  const urls = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, href]) =>
    assertCanonical(href.replaceAll('&amp;', '&')));
  assert(urls.length && new Set(urls.map(url => url.href)).size === urls.length, 'Sitemap URLs are missing or duplicated');
  const revisions = [];
  let next = 0;
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (next < urls.length) {
      const url = urls[next++];
      const response = await request(base + url.pathname + url.search);
      assert.equal(response.status, 200, 'Page is unavailable: ' + url.href);
      const html = await response.text();
      const nodes = [...elements(parse(html, { sourceCodeLocationInfo: true }))];
      const canonical = nodes.find(node => node.tagName === 'link' && attr(node, 'rel') === 'canonical');
      const main = nodes.find(node => node.tagName === 'main')?.sourceCodeLocation;
      assert(canonical && attr(canonical, 'href') === url.href && main, 'Invalid page revision: ' + url.href);
      const title = text(nodes.find(node => node.tagName === 'title'));
      const metadata = nodes.filter(node => node.tagName === 'meta' &&
        (attr(node, 'name') === 'description' || attr(node, 'property')?.startsWith('og:')))
        .map(node => [attr(node, 'name') || attr(node, 'property'), attr(node, 'content')]);
      const schema = nodes.filter(node => node.tagName === 'script' && attr(node, 'type') === 'application/ld+json').map(text);
      const fingerprint = JSON.stringify([title, metadata, schema, html.slice(main.startOffset, main.endOffset)])
        .replaceAll('\\r\\n', '\\n');
      revisions.push([url.href, createHash('sha256').update(fingerprint).digest('hex')]);
    }
  }));
  return { origin: base, pages: Object.fromEntries(revisions.sort(([a], [b]) => a.localeCompare(b))) };
}

function changes(before, after) {
  const added = [], updated = [], removed = [];
  for (const [url, hash] of Object.entries(after.pages)) {
    assertCanonical(url);
    if (!before.pages[url]) added.push(url);
    else if (before.pages[url] !== hash) updated.push(url);
  }
  for (const url of Object.keys(before.pages)) {
    assertCanonical(url);
    if (!after.pages[url]) removed.push(url);
  }
  return { added, updated, removed };
}

async function run() {
  const [mode, first, second, flag] = process.argv.slice(2);
  if (mode === 'snapshot' && first && !flag) {
    await fs.writeFile(first, JSON.stringify(await snapshot(second || origin), null, 2) + '\n');
    return;
  }
  assert(mode === 'plan' && first && second && (!flag || flag === '--submit'),
    'Usage: indexnow.cjs snapshot FILE [ORIGIN] | indexnow.cjs plan BEFORE AFTER [--submit]');
  const [before, after] = await Promise.all([first, second].map(async file => JSON.parse(await fs.readFile(file, 'utf8'))));
  const plan = changes(before, after);
  console.log(JSON.stringify(plan, null, 2));
  if (!flag) return;
  assert(before.origin === origin && after.origin === origin, 'Submit requires two official-site snapshots');
  const urlList = [...plan.added, ...plan.updated, ...plan.removed];
  if (!urlList.length) return;
  assert(urlList.length <= 10000, 'IndexNow accepts at most 10,000 URLs in one request');
  const key = process.env.INDEXNOW_PUBLIC_KEY;
  assert(key && /^[a-f0-9]{8,128}$/i.test(key), 'Set INDEXNOW_PUBLIC_KEY before an authorised submission');
  const keyLocation = origin + '/' + key + '.txt';
  const verification = await request(keyLocation);
  assert.equal(verification.status, 200, 'Production key file is unavailable');
  assert.equal((await verification.text()).trim(), key, 'Production key file does not match');
  const live = changes(after, await snapshot(origin));
  assert(Object.values(live).every(urls => urls.length === 0), 'The after snapshot no longer matches the production site');
  const response = await fetch(endpoint, {
    method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key, keyLocation, urlList }), signal: AbortSignal.timeout(15000), redirect: 'error'
  });
  assert([200, 202].includes(response.status), 'IndexNow returned HTTP ' + response.status);
  console.log('IndexNow accepted ' + urlList.length + ' URLs with HTTP ' + response.status);
}

run().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
