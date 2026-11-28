const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {parse} = require('parse5');
const normalizePage = require('../api/normalize-page.js');
const {origin, canonicalUrl} = require('../content/search-config.cjs');
const {urlLanguage} = require('../content/url-language.cjs');
const {routes} = require('../vercel.json');

const root = path.resolve(__dirname, '..');
const localeRoute = routes.find(route => route.dest === '/api/normalize-page?__ellisPage=$1');
const source = new RegExp(localeRoute.src);
const sitemap = [...fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map(([,href]) => new URL(href));
const languageCases = ['', 'lang=invalid', 'lang=en&lang=zh', 'lang=zh&lang=en', 'lang=zh&lang=unknown'];
assert.deepEqual(languageCases.map(search => urlLanguage(new URLSearchParams(search))), ['en', 'en', 'zh', 'en', 'zh']);

async function request(url, {method = 'GET', query, host = new URL(origin).host} = {}) {
  const headers = {};
  let status, body;
  await normalizePage({url, method, headers: {host}, query}, {
    setHeader(name, value) { headers[name] = value; },
    status(code) { status = code; return this; },
    end(value) { body = value?.toString('utf8') || ''; },
  });
  return {status, headers, body};
}

function* elements(node) {
  if (node.tagName) yield node;
  for (const child of node.childNodes || []) yield* elements(child);
}
function attrs(body, selector) {
  return [...elements(parse(body))]
    .filter(selector)
    .map(node => Object.fromEntries(node.attrs.map(attr => [attr.name, attr.value])));
}
const hasAttr = (node, name, value) => node.attrs.some(attr =>
  attr.name === name && (value === undefined || attr.value === value));

async function main() {
  for (const [url, expected] of [
    ['/', '/?lang=en'],
    ['/about/', '/about/?lang=en'],
    ['/index.html', '/?lang=en'],
    ['/services/index.html?lang=zh', '/services/?lang=zh'],
    ['/areas/melbourne/cbd-inner?lang=zh', '/areas/melbourne/cbd-inner/?lang=zh'],
    ['/contact?service=roofing-waterproofing', '/contact/?service=roofing-waterproofing&lang=en'],
    ['/contact/?lang=en&lang=zh&area=cbd-inner', '/contact/?lang=zh&area=cbd-inner'],
    ['/contact/?lang=zh&lang=en&area=cbd-inner', '/contact/?lang=en&area=cbd-inner'],
    ['/faq/?lang=invalid&topic=roofing', '/faq/?lang=en&topic=roofing'],
    ['/faq/?lang=invalid&lang=zh&lang=invalid&topic=roofing', '/faq/?lang=zh&topic=roofing'],
    ['/faq/?lang=zh&lang=zh&topic=roofing', '/faq/?lang=zh&topic=roofing'],
    ['/?region=Melbourne', '/?region=Melbourne&lang=en'],
  ]) {
    const result = await request(url);
    assert.equal(result.status, 308, url);
    assert.equal(result.headers.Location, expected, url);
    const second = await request(expected);
    assert.equal(second.status, 200, expected);
  }

  const rewritten = await request('/api/normalize-page?__ellisPage=%2Fcontact%2F&lang=zh', {
    query: {__ellisPage:'/contact/', lang:['zh', 'invalid', 'en'], area:'cbd-inner'},
  });
  assert.equal(rewritten.status, 308);
  assert.equal(rewritten.headers.Location, '/contact/?lang=en&area=cbd-inner');

  const preservedOrder = await request('/api/normalize-page?__ellisPage=%2Ffaq%2F&lang=zh&lang=invalid&lang=en&topic=roofing', {
    query: {__ellisPage:'/faq/', lang:['en', 'invalid', 'zh'], topic:'roofing'},
  });
  assert.equal(preservedOrder.status, 308);
  assert.equal(preservedOrder.headers.Location, '/faq/?lang=en&topic=roofing');

  const legacy = await request('/privacy/?lang=zh', {host:'melbournecommercialrepairscomau.vercel.app'});
  assert.equal(legacy.status, 308);
  assert.equal(legacy.headers.Location, origin + '/privacy/?lang=zh');

  assert.equal((await request('/insights/not-a-real-article/')).status, 404);
  assert.equal((await request('/insights/not-a-real-article/?lang=zh')).status, 404);
  assert.equal((await request('/api/normalize-page')).status, 404);
  assert.equal((await request('/contact/?lang=en', {method:'POST'})).status, 405);
  assert.equal((await request('/contact/?lang=en', {method:'HEAD'})).body, '');

  for (const [url, expected] of [
    ['/contact/?service=roofing-waterproofing&lang=en', '/contact/?lang=zh&service=roofing-waterproofing'],
    ['/contact/?lang=en&area=cbd-inner', '/contact/?lang=zh&area=cbd-inner'],
    ['/faq/?lang=en&topic=roofing', '/faq/?lang=zh&topic=roofing'],
    ['/faq/?lang=zh&topic=roofing&q=private', '/faq/?lang=en&topic=roofing'],
    ['/contact/?lang=zh&area=not-a-real-region', '/contact/?lang=en'],
  ]) {
    const result = await request(url);
    assert.equal(result.status, 200, url);
    assert.deepEqual(attrs(result.body, node => node.tagName === 'a' && hasAttr(node, 'data-language-switch'))
      .map(link => link.href), [expected], url);
  }

  for (const url of [
    '/contact/?utm_source=fixture&area=cbd-inner&service=roofing-waterproofing&lang=en',
    '/faq/?topic=roofing&utm_campaign=fixture&lang=zh',
  ]) {
    const result = await request(url);
    assert.equal(result.status, 200, 'Query ordering alone must not trigger a redirect: ' + url);
    assert.equal(result.headers.Location, undefined);
  }

  assert(sitemap.length > 0 && new Set(sitemap.map(url => url.href)).size === sitemap.length);
  for (const url of sitemap) {
    const language = url.searchParams.get('lang');
    assert.equal(url.href, canonicalUrl(url.pathname, language));
    assert(source.test(url.pathname), url.pathname + ' is matched by the normalization route');
    const result = await request(url.pathname + url.search);
    assert.equal(result.status, 200, url.href);
    assert.match(result.body, language === 'en' ? /<html[^>]*lang="en"/ : /<html[^>]*lang="zh-CN"/);
    const other = language === 'en' ? 'zh' : 'en';
    assert.deepEqual(attrs(result.body, node => node.tagName === 'a' && hasAttr(node, 'data-language-switch'))
      .map(link => link.href), [url.pathname + '?lang=' + other], url.href + ' language link');
    const head = result.body.split('</head>')[0];
    const schema = JSON.parse(head.match(/<script type="application\/ld\+json" data-ellis-discovery>([\s\S]*?)<\/script>/)?.[1]);
    const webpage = schema['@graph'].find(entry => entry.url === url.href && entry.inLanguage);
    assert.equal(webpage?.inLanguage, language === 'en' ? 'en-AU' : 'zh-CN', url.href + ' structured data language');
    assert(head.includes('<link rel="canonical" href="' + url.href + '">'), url.href + ' canonical');
    for (const [hreflang, lang] of [['en-AU', 'en'], ['zh-CN', 'zh'], ['x-default', 'en']]) {
      assert(head.includes('hreflang="' + hreflang + '" href="' + canonicalUrl(url.pathname, lang) + '"'),
        url.href + ' ' + hreflang);
    }
  }
  console.log('Verified English default, language redirects, business query and ' + sitemap.length + ' canonical URLs.');
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
