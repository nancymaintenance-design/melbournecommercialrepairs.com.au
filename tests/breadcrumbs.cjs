const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { parse } = require('parse5');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const attrs = (node, name) => node.attrs?.find(attribute => attribute.name === name)?.value;
const content = node => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(content).join('');
function* walk(node) {
  yield node;
  for (const child of node.childNodes || []) yield* walk(child);
}
const entries = new Set([...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]));
let tested = 0;
for (const canonical of entries) {
  const url = new URL(canonical);
  const locale = url.searchParams.get('lang');
  const route = url.pathname;
  const file = (locale === 'en' ? '_ellisl10n/' : '') + route.slice(1) + 'index.html';
  const nodes = [...walk(parse(read(file)))];
  const navs = nodes.filter(node => node.tagName === 'nav' &&
    /\b(?:ellis-breadcrumb|breadcrumbs|tn-crumb|rr-breadcrumb)\b/.test(attrs(node, 'class') || ''));
  const graph = nodes.filter(node => node.tagName === 'script' && attrs(node, 'type') === 'application/ld+json')
    .flatMap(node => JSON.parse(content(node))['@graph'] || []);
  const lists = graph.filter(node => node['@type'] === 'BreadcrumbList');

  if (route === '/') {
    assert.equal(navs.length, 0, canonical);
    assert.equal(lists.length, 0, canonical);
    continue;
  }
  assert.equal(navs.length, 1, canonical);
  assert.equal(lists.length, 1, canonical);
  assert.equal(attrs(navs[0], 'aria-label'), locale === 'en' ? 'Breadcrumb' : '当前位置', canonical);
  assert(graph.some(node => node.url === canonical && node.breadcrumb?.['@id'] === lists[0]['@id']), canonical);
  const ol = navs[0].childNodes.find(node => node.tagName === 'ol');
  assert(ol, canonical);
  const items = ol.childNodes.filter(node => node.tagName === 'li');
  const parents = ['/'];
  for (let i = 1; i < route.length - 1; i++) {
    if (route[i] === '/' && entries.has(url.origin + route.slice(0, i + 1) + url.search)) {
      parents.push(route.slice(0, i + 1));
    }
  }
  assert.equal(items.length, parents.length + 1, canonical);
  const visible = items.map((item, index) => {
    if (index === items.length - 1) {
      assert(!item.childNodes.some(node => node.tagName === 'a'), canonical);
      const current = item.childNodes.find(node => attrs(node, 'aria-current') === 'page');
      assert(current && content(current).trim(), canonical);
      return { name: content(current), item: canonical };
    }
    const anchor = item.childNodes.find(node => node.tagName === 'a');
    assert(anchor && content(anchor).trim(), canonical);
    const href = new URL(attrs(anchor, 'href'), canonical).href;
    assert.equal(href, url.origin + parents[index] + url.search, canonical);
    assert(entries.has(href), canonical);
    return { name: content(anchor), item: href };
  });
  assert.equal(visible[0].name, locale === 'en' ? 'Home' : '首页', canonical);
  assert.deepEqual(lists[0].itemListElement, visible.map((item, i) =>
    ({ '@type': 'ListItem', position: i + 1, ...item })), canonical);
  assert(nodes.some(node => node.tagName === 'link' && /^\/breadcrumbs\.css\?v=[a-f0-9]{12}$/.test(attrs(node, 'href') || '')), canonical);
  tested++;
}
assert.equal(tested, entries.size - 2);
console.log('Breadcrumbs: ' + tested + ' bilingual inner URLs match the visible trail and structured data, with real same-language parents.');
