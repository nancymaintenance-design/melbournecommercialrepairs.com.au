// Localize the final HTML without reserializing the existing page or its scripts.
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const {parse} = require('parse5');
const {origin, canonicalUrl} = require('./content/search-config.cjs');
const {sectors, sectorSlugs} = require('./content/site-data.cjs');
const propertySelector = require('./home-sector-selector.js');
const servicePack = require('./content/service-pages.json').services;
const serviceTranslations = require('./content/service-pages.en.json');
const root = __dirname;
const localeDirectory = '_ellisl10n';
const lastmodFile = path.join(root, 'content', 'search-lastmod.json');
const lastmod = fs.existsSync(lastmodFile) ? JSON.parse(fs.readFileSync(lastmodFile, 'utf8')) : {};
const dateOverride = process.argv[2]?.match(/^--lastmod=(\d{4}-\d{2}-\d{2})$/)?.[1];
if (process.argv[2]) {
 assert(dateOverride && new Date(dateOverride).toISOString().slice(0, 10) === dateOverride, 'Expected --lastmod=YYYY-MM-DD');
}

const escapeText = text => String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const escapeAttribute = text => escapeText(text).replaceAll('"', '&quot;');
const attr = (node, key) => node.attrs?.find(value => value.name === key)?.value;
const hasClass = (node, token) => attr(node, 'class')?.split(/\s+/).includes(token);
const textOf = node => node?.nodeName === '#text' ? node.value : (node?.childNodes || []).map(textOf).join('');
function* descendants(node) {
 yield node;
 for (const child of node.childNodes || []) yield* descendants(child);
}
const nodesOf = source => [...descendants(parse(source, {sourceCodeLocationInfo: true}))];
const readJson = node => JSON.parse(textOf(node));
const inSite = href => href?.startsWith('/') && !href.startsWith('//');
function withLocale(href, language) {
 const url = new URL(href, origin);
 url.searchParams.set('lang', language);
 return url.pathname + url.search + url.hash;
}

function breadcrumbs(nodes, route, language) {
 const nav = nodes.find(node => node.tagName === 'nav' && hasClass(node, 'breadcrumbs'));
 const items = nav?.childNodes.filter(node => attr(node, 'data-zh') !== undefined);
 assert.equal(items?.length, 3, 'Expected the existing Home / directory / current page breadcrumb on ' + route);
 return {
  '@type': 'BreadcrumbList',
  itemListElement: items.map((node, index) => ({
   '@type': 'ListItem',
   position: index + 1,
   name: attr(node, 'data-' + language),
   item: canonicalUrl(attr(node, 'href') || route, language)
  }))
 };
}

function structuredData(schema, nodes, route, language) {
 const url = canonicalUrl(route, language);
 function localizeService(entity) {
  const index = servicePack.findIndex(service => service.route === route);
  assert(index >= 0, 'Missing service data for ' + route);
  const local = language === 'en' ? serviceTranslations[index] : servicePack[index];
  const service = {...entity, '@id': url + '#service', url,
   name: language === 'en' ? servicePack[index].EnglishH1 : servicePack[index].ChineseH1,
   serviceType: local.title, description: local.heroCopy, provider: {'@id': origin + '/#ellis-organization'}};
  assert(service.serviceType, 'Missing localized service title for ' + route);
  delete service['@context'];
  return service;
 }
 if (schema['@type'] === 'Service') {
  return {'@context': schema['@context'], '@graph': [localizeService(schema), breadcrumbs(nodes, route, language)]};
 }
 if (schema['@type'] === 'Article') {
  const meta = readJson(nodes.find(node => attr(node, 'id') === 'page-meta'));
  const suffix = language === 'en' ? 'En' : 'Zh';
  return {...schema, '@id': url + '#article', url, mainEntityOfPage: url,
   inLanguage: language === 'en' ? 'en-AU' : 'zh-CN',
   headline: meta['title' + suffix].replace(/ \| Ellis Services Group Melbourne$/, ''),
   description: meta['description' + suffix]};
 }
 if (!schema['@graph']) return schema;
 return {...schema, '@graph': schema['@graph'].map(entity => {
  if (entity['@type'] === 'Service') return localizeService(entity);
  if (entity['@type'] === 'BreadcrumbList') return breadcrumbs(nodes, route, language);
  if (entity['@type'] !== 'WebPage') return entity;
  const meta = readJson(nodes.find(node => attr(node, 'id') === 'page-meta'));
  return {...entity, '@id': url + '#topic', url, inLanguage: language === 'en' ? 'en-AU' : 'zh-CN',
   name: breadcrumbs(nodes, route, language).itemListElement[2].name,
   description: language === 'en' ? meta.descriptionEn : meta.descriptionZh,
   about: {'@id': origin + '/#ellis-organization'}};
 })};
}

function render(source, route, language) {
 const english = language === 'en';
 if (english && route === '/') {
  const selector = nodesOf(source).find(node => attr(node, 'id') === 'property-selector');
  const {startOffset, endOffset} = selector.sourceCodeLocation;
  source = source.slice(0, startOffset) + propertySelector.markup(sectors, sectorSlugs, language) + source.slice(endOffset);
 }
 if (english && source.includes('id="region-v2-locales"')) {
  const variants = readJson(nodesOf(source).find(node => attr(node, 'id') === 'region-v2-locales'));
  source = source.replace(/(<main\b[^>]*data-lang=")zh("[^>]*>)[\s\S]*?(<\/main>)/,
   (_, start, end, closing) => start + 'en' + end + variants.en + closing);
 }

 const nodes = nodesOf(source);
 const metadata = readJson(nodes.find(node => attr(node, 'id') === 'page-meta'));
 assert.equal(metadata.route, route);
 const suffix = english ? 'En' : 'Zh';
 const edits = [];
 const schemaContent = [];
 let localizedParentEnd = -1;

 function replaceBody(node, value) {
  const {startTag, endTag} = node.sourceCodeLocation;
  assert(endTag, 'Missing closing tag for ' + node.tagName + ' on ' + route);
  edits.push([startTag.endOffset, endTag.startOffset, value]);
 }

 for (const node of nodes) {
  const location = node.sourceCodeLocation;
  if (!location?.startTag || location.startOffset < localizedParentEnd) continue;
  const update = {};
  if (node.tagName === 'html') update.lang = english ? 'en' : 'zh-CN';
  if (node.tagName === 'title') replaceBody(node, escapeText(metadata['title' + suffix]));
  if (node.tagName === 'meta' && attr(node, 'name') === 'description') update.content = metadata['description' + suffix];
  if (node.tagName === 'link' && attr(node, 'rel') === 'canonical') update.href = canonicalUrl(route, language);
  if (node.tagName === 'script' && attr(node, 'type') === 'application/ld+json') {
   const json = JSON.stringify(structuredData(readJson(node), nodes, route, language)).replaceAll('<', '\\u003c');
   schemaContent.push(json);
   replaceBody(node, json);
  }
  if (english) {
   const copy = attr(node, 'data-en');
   if (copy !== undefined && attr(node, 'data-zh') !== undefined) {
    assert(node.childNodes.every(child => ['#text', 'br'].includes(child.nodeName)), 'Localized element contains structural markup on ' + route);
    replaceBody(node, escapeText(copy.replaceAll('\\n', '\n')));
    localizedParentEnd = location.endTag.startOffset;
   }
   for (const name of ['aria-label', 'alt', 'title', 'placeholder', 'value']) {
    const value = attr(node, 'data-' + name + '-en');
    if (value !== undefined) update[name] = value;
   }
   if (node.tagName === 'a' && inSite(attr(node, 'href'))) update.href = withLocale(attr(node, 'href'), language);
   if (hasClass(node, 'lang-en')) update.class = 'lang-en active';
   if (hasClass(node, 'lang-zh')) update.class = 'lang-zh';
   if (attr(node, 'id') === 'main-nav') update['aria-label'] = 'Main navigation';
   if (attr(node, 'id') === 'menu-toggle') update['aria-label'] = 'Open menu';
   if (attr(node, 'id') === 'language-switch') update['aria-label'] = '切换到中文';
  }
  for (const [name, value] of Object.entries(update)) {
   if (attr(node, name) === value) continue;
   const serialized = name + '="' + escapeAttribute(value) + '"';
   const previous = location.attrs?.[name];
   if (previous) edits.push([previous.startOffset, previous.endOffset, serialized]);
   else edits.push([location.startTag.endOffset - 1, location.startTag.endOffset - 1, ' ' + serialized]);
  }
 }
 for (const [start, end, value] of edits.sort((a, b) => b[0] - a[0])) {
  source = source.slice(0, start) + value + source.slice(end);
 }
 const main = source.match(/<main\b[\s\S]*?<\/main>/)?.[0];
 assert(main, 'Missing main content on ' + route);
 return {source, fingerprint: [main, metadata, schemaContent]};
}

function* pageFiles(directory) {
 for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
  const target = path.join(directory, entry.name);
  if (entry.isDirectory()) yield* pageFiles(target);
  else if (entry.name === 'index.html') yield target;
 }
}
const pages = [path.join(root, 'index.html'), ...['about', 'areas', 'contact', 'faq', 'insights', 'privacy', 'sectors', 'services']
 .flatMap(section => [...pageFiles(path.join(root, section))])];
const sitemap = [];
const nextLastmod = {};
for (const file of pages) {
 const relative = path.relative(root, file);
 const route = '/' + relative.replaceAll('\\', '/').replace(/index\.html$/, '');
 const source = fs.readFileSync(file, 'utf8');
 const zh = render(source, route, 'zh');
 const en = render(source, route, 'en');
 const destination = path.join(root, localeDirectory, relative);
 fs.mkdirSync(path.dirname(destination), {recursive: true});
 fs.writeFileSync(file, zh.source);
 fs.writeFileSync(destination, en.source);
 const hash = crypto.createHash('sha256').update(JSON.stringify([zh.fingerprint, en.fingerprint]).replaceAll('\\r\\n', '\\n')).digest('hex');
 const entry = lastmod[route];
 const date = hash === entry?.hash ? entry.date : dateOverride;
 if (date) nextLastmod[route] = {hash, date};
 for (const language of ['zh', 'en']) {
  sitemap.push('  <url><loc>' + escapeText(canonicalUrl(route, language)) + '</loc>' +
   (date ? '<lastmod>' + date + '</lastmod>' : '') + '</url>');
 }
}
if (dateOverride) fs.writeFileSync(lastmodFile, JSON.stringify(nextLastmod, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n' +
 '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + sitemap.join('\n') + '\n</urlset>\n');
fs.writeFileSync(path.join(root, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: ' + origin + '/sitemap.xml\n');
console.log('Localized ' + pages.length + ' existing routes and generated ' + sitemap.length + ' sitemap entries.');
