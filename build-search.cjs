// Localize the final HTML without reserializing the existing page or its scripts.
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const {parse} = require('parse5');
const {origin, canonicalUrl} = require('./content/search-config.cjs');
const {withAnalytics} = require('./content/ga4.cjs');
const {pageRecord, writeResources} = require('./content/machine-discovery.cjs');
const {sectors, sectorSlugs} = require('./content/site-data.cjs');
const propertySelector = require('./home-sector-selector.js');
const servicePack = require('./content/service-pages.json').services;
const serviceTranslations = require('./content/service-pages.en.json');
const root = __dirname;
const localeDirectory = '_ellisl10n';
const lastmodFile = path.join(root, 'content', 'search-lastmod.json');
const lastmod = fs.existsSync(lastmodFile) ? JSON.parse(fs.readFileSync(lastmodFile, 'utf8')) : {};
const option = process.argv[2];
const seedFingerprints = option === '--record-fingerprints';
const dateOverride = option?.match(/^--lastmod=(\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2}))?)$/)?.[1];
if (option && !seedFingerprints) {
 assert(dateOverride && Number.isFinite(Date.parse(dateOverride)) &&
  new Date(dateOverride.slice(0, 10)).toISOString().slice(0, 10) === dateOverride.slice(0, 10),
 'Expected --lastmod=YYYY-MM-DD or an ISO timestamp with a timezone');
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
function withLocale(href, route, language) {
 if (!href || href.startsWith('#')) return href;
 const url = new URL(href, origin + route);
 if (url.origin !== origin) return href;
 const pathname = url.pathname.replace(/\/index\.html$/, '/').replace(/\/?$/, '/');
 if (!pageRoutes.has(pathname)) return href;
 url.pathname = pathname;
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
  if (node.tagName === 'a' && attr(node, 'href') !== undefined) update.href = withLocale(attr(node, 'href'), route, language);
  if (node.tagName === 'script' && attr(node, 'type') === 'application/ld+json' && attr(node,'data-ellis-discovery') === undefined) {
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
 return {source, metadata, fingerprint: [main, metadata, schemaContent]};
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
const routeOf = file => '/' + path.relative(root, file).replaceAll('\\', '/').replace(/index\.html$/, '');
const pageRoutes = new Set(pages.map(routeOf));
const sitemap = [];
const nextLastmod = {};
const publicRecords = {zh: [], en: []};
function withMachineMetadata({source, metadata}, route, language, updated) {
 const record = pageRecord(source, route, language, metadata, updated);
 publicRecords[language].push(record);
 // Replace the old graph after localisation so the sitemap fingerprint still uses the existing inputs.
 return source
  .replace(/<script type="application\/ld\+json"(?: data-ellis-discovery)?>(?:[\s\S]*?)<\/script>/g, '')
  .replace(/<link rel="alternate" type="application\/(?:rss\+xml|feed\+json)"[^>]*>/g, '')
  .replace(/<meta property="og:[^"]+"[^>]* data-ellis-discovery>/g, '')
  .replace('</head>', () => record.markup + '</head>');
}
for (const file of pages) {
 const relative = path.relative(root, file);
 const route = routeOf(file);
 const source = fs.readFileSync(file, 'utf8');
 const zh = render(source, route, 'zh');
 const en = render(source, route, 'en');
 const hash = crypto.createHash('sha256').update(JSON.stringify([zh.fingerprint, en.fingerprint]).replaceAll('\\r\\n', '\\n')).digest('hex');
 const entry = lastmod[route];
 // An ordinary build retains the last verified date. Only an explicit release record advances it.
 const date = dateOverride && entry?.hash !== hash ? dateOverride : entry?.date;
 nextLastmod[route] = date ? {hash, date} : {hash};
 const destination = path.join(root, localeDirectory, relative);
 fs.mkdirSync(path.dirname(destination), {recursive: true});
 fs.writeFileSync(file, withAnalytics(withMachineMetadata(zh, route, 'zh', date), canonicalUrl(route, 'zh')));
 fs.writeFileSync(destination, withAnalytics(withMachineMetadata(en, route, 'en', date), canonicalUrl(route, 'en')));
 for (const language of ['zh', 'en']) {
  sitemap.push('  <url><loc>' + escapeText(canonicalUrl(route, language)) + '</loc>' +
   (date ? '<lastmod>' + date + '</lastmod>' : '') + '</url>');
 }
}
if (dateOverride || seedFingerprints) fs.writeFileSync(lastmodFile, JSON.stringify(nextLastmod, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n' +
 '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + sitemap.join('\n') + '\n</urlset>\n');
fs.writeFileSync(path.join(root, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: ' + origin + '/sitemap.xml\n');
writeResources(root, publicRecords);
const indexNowKey = process.env.INDEXNOW_PUBLIC_KEY;
if (indexNowKey) {
 assert(/^[a-f0-9]{8,128}$/i.test(indexNowKey), 'Invalid IndexNow public verification key format');
 fs.writeFileSync(path.join(root, indexNowKey + '.txt'), indexNowKey);
}
console.log('Localized ' + pages.length + ' existing routes and generated ' + sitemap.length + ' sitemap entries.');
