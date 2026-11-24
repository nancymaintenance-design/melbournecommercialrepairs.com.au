const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { parse } = require('parse5');
const { origin, languages, canonicalUrl } = require('./search-config.cjs');
const { serviceSlugs, sectorSlugs } = require('./site-data.cjs');
const { articles, libraryArticles } = require('./technical-notes.cjs');
const business = require('../business.json');
const services = require('./service-pages.json').services;
const englishServices = require('./service-pages.en.json');
const regions = require('../vendor/ellis-regions-v2/data/region-pages.json').regions;
const notes = new Map(articles.map(article => [article.route, article]));

const orgId = origin + '/#ellis-organization';
const websiteId = origin + '/#website';
const ref = id => ({ '@id': id });
const organization = {
  '@type': 'Organization', '@id': orgId, name: business.name, legalName: business.legalName,
  url: origin + '/', logo: origin + '/assets/ellis-services-logo.png',
  taxID: business.abn,
  identifier: [
    { '@type': 'PropertyValue', propertyID: 'ABN', value: business.abn },
    { '@type': 'PropertyValue', propertyID: 'ACN', value: business.acn }
  ],
  address: {
    '@type': 'PostalAddress', streetAddress: business.streetAddress, addressLocality: business.addressLocality,
    addressRegion: business.addressRegion, postalCode: business.postalCode, addressCountry: 'AU'
  },
  telephone: business.telephone, email: business.email,
  areaServed: { '@type': 'City', name: business.serviceArea },
  sameAs: [business.registerUrl, business.mapsUrl]
};
const website = {
  '@type': 'WebSite', '@id': websiteId, name: business.name, url: origin + '/',
  publisher: ref(orgId), inLanguage: Object.values(languages)
};
const directories = {
  '/services/': serviceSlugs.map(slug => '/services/' + slug + '/'),
  '/sectors/': sectorSlugs.map(slug => '/sectors/' + slug + '/'),
  '/areas/melbourne/': regions.map(region => region.route)
};
const pageTypes = { '/about/': 'AboutPage', '/contact/': 'ContactPage' };
const english = language => language === 'en';
const localFeed = (language, extension) => '/feed' + (english(language) ? '-en' : '') + '.' + extension;
const feedTitle = language => business.name + (english(language) ? ' · Commercial Maintenance Articles' : ' · 商业维护技术文章');
const feedDescription = language => english(language)
  ? 'Commercial property maintenance articles from Ellis Services Group in Melbourne.'
  : 'Ellis Services Group 的墨尔本商业物业维护与维修技术文章。';

const attr = (node, name) => node?.attrs?.find(a => a.name === name)?.value;
const hasClass = (node, name) => attr(node, 'class')?.split(/\s+/).includes(name);
const kids = node => node?.childNodes || [];
function* descendants(node) {
  yield node;
  for (const child of kids(node)) yield* descendants(child);
}
const visibleText = node => node?.nodeName === '#text' ? node.value
  : attr(node, 'aria-hidden') === 'true' ? '' : kids(node).map(visibleText).join('');
const flat = text => text.replace(/\s+/g, ' ').trim();
const escape = text => String(text).replace(/[&<>"']/g, character =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[character]);
const articleTags = new Set(['h2','h3','h4','p','a','ul','ol','li','dl','dt','dd','strong','em','b','i','table','caption','thead','tbody','tr','th','td']);
const excluded = new Set(['script','style','nav','svg','figure','fieldset','button','input']);

function feedBody(node, pageUrl) {
  if (node?.nodeName === '#text') return escape(node.value);
  if (excluded.has(node?.tagName) || attr(node, 'hidden') !== undefined || attr(node, 'aria-hidden') === 'true' ||
      hasClass(node, 'led-mobile-label') ||
      hasClass(node, 'led-evidence-grid') || hasClass(node, 'led-evidence-flow')) return '';
  if (node?.tagName === 'br') return '<br>';
  const body = kids(node).map(child => feedBody(child, pageUrl)).join('');
  const { tagName } = node || {};
  if (!articleTags.has(tagName)) return body;
  if (!body.trim()) return '';
  if (tagName === 'a') {
    const href = attr(node, 'href');
    if (!href) return body;
    const url = new URL(href, pageUrl);
    return url.origin === origin ? `<a href="${escape(url.href)}">${body}</a>` : body;
  }
  const scope = attr(node, 'scope');
  return `<${tagName}${scope ? ` scope="${escape(scope)}"` : ''}>${body}</${tagName}>`;
}

function readArticle(nodes, route, language, heading, updated) {
  if (!/^\/insights\/[^/]+\/$/.test(route)) return;
  const sourceNote = notes.get(route);
  const select = id => nodes.find(node => attr(node, 'id') === id);
  const parts = sourceNote ? ['mechanism','evidence','methods','verification','questions'].map(id => select('tn-' + id))
    : [select('page-content')];
  assert(parts.every(Boolean), 'Missing article body for ' + route);
  const url = canonicalUrl(route, language);
  const content = parts.map(part => feedBody(part, url)).join('\n').trim();
  const leadNode = sourceNote ? nodes.find(node => hasClass(node, 'led-lead')) : [...descendants(parts[0])].find(n => n.tagName === 'p');
  const lead = flat(visibleText(leadNode));
  const date = nodes.find(node => node.tagName === 'time' && hasClass(node, 'led-date'));
  const published = sourceNote?.publishedAt || attr(date, 'datetime');
  const modified = published && Date.parse(updated) > Date.parse(published) ? updated : undefined;
  assert(content && lead, 'Incomplete article ' + route);
  return { url, title: heading, summary: lead, content, published, modified,
    author: sourceNote && nodes.some(node => hasClass(node, 'led-byline')) ? business.name : undefined,
    image: sourceNote ? new URL(sourceNote.image, origin).href : undefined };
}

function pageRecord(html, route, language, metadata, updated, breadcrumbTrail) {
  const nodes = [...descendants(parse(html))];
  const url = canonicalUrl(route, language);
  const locale = languages[language];
  const note = notes.get(route);
  const headingNode = nodes.find(n => n.tagName === 'h1');
  assert(headingNode, 'Missing page heading: ' + route);
  const title = note ? flat(note.title[english(language) ? 1 : 0]) :
    flat(kids(headingNode).map(visibleText).join(english(language) ? ' ' : ''));
  const description = english(language) ? metadata.descriptionEn : metadata.descriptionZh;
  const entry = readArticle(nodes, route, language, title, updated);
  const main = nodes.find(node => node.tagName === 'main');
  const pageImage = [...descendants(main)].filter(node => node.tagName === 'img')
    .map(node => attr(node, 'src')).find(src => /\.(?:webp|png|jpe?g)$/i.test(src || '') && !src.includes('ellis-services-logo'));
  const image = entry?.image || new URL(pageImage || '/assets/scenes/01-home.webp', origin).href;
  const serviceIndex = services.findIndex(service => service.route === route);
  const service = serviceIndex < 0 ? undefined : english(language) ? englishServices[serviceIndex] : services[serviceIndex];
  const list = directories[route] || (route === '/insights/' ? libraryArticles.map(article => article.route) : undefined);
  const type = pageTypes[route] || (list ? 'CollectionPage' : 'WebPage');
  const pageId = url + (/^\/sectors\/[^/]+\/$/.test(route) ? '#topic' : '#webpage');
  const page = {
    '@type': type, '@id': pageId, url, name: title, description: entry?.summary || service?.heroCopy || description,
    inLanguage: locale, isPartOf: ref(websiteId), about: ref(orgId),
    primaryImageOfPage: { '@type': 'ImageObject', contentUrl: image }
  };
  const graph = [organization, website, page];
  if (breadcrumbTrail.length) {
    page.breadcrumb = ref(url + '#breadcrumb');
    graph.push({
      '@type': 'BreadcrumbList', '@id': url + '#breadcrumb',
      itemListElement: breadcrumbTrail.map((item, i) => ({ '@type': 'ListItem', position: i + 1, ...item }))
    });
  }
  function addMain(entity) {
    page.mainEntity = ref(entity['@id']);
    graph.push(entity);
  }
  if (service) addMain({
    '@type': 'Service', '@id': url + '#service', url, name: title, serviceType: service.title,
    description: service.heroCopy, provider: ref(orgId), areaServed: organization.areaServed,
    mainEntityOfPage: ref(pageId)
  });
  if (entry) addMain({
    '@type': 'Article', '@id': url + '#article', url, headline: title, description: entry.summary,
    inLanguage: locale, mainEntityOfPage: ref(pageId), publisher: ref(orgId),
    ...(entry.author && { author: ref(orgId) }),
    ...(entry.image && { image: [entry.image] }),
    ...(entry.published && { datePublished: entry.published }),
    ...(entry.modified && { dateModified: entry.modified })
  });
  if (list) addMain({
    '@type': 'ItemList', '@id': url + '#items',
    itemListElement: list.map((route, i) => ({ '@type': 'ListItem', position: i + 1, url: canonicalUrl(route, language) }))
  });
  const feeds = [['xml','application/rss+xml','RSS'],['json','application/feed+json','JSON Feed']].map(([ext,type,label]) =>
    `<link rel="alternate" type="${type}" title="${escape(feedTitle(language))} · ${label}" href="${origin + localFeed(language, ext)}">`).join('');
  const og = {
    type: entry ? 'article' : 'website', site_name: business.name, locale: locale.replace('-', '_'),
    url, title: english(language) ? metadata.titleEn : metadata.titleZh, description, image
  };
  const previews = Object.entries(og).map(([name, value]) =>
    `<meta property="og:${name}" content="${escape(value)}" data-ellis-discovery>`).join('');
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replaceAll('<', '\\u003c');
  return { route, title, entry, json, markup: `${previews}${feeds}<script type="application/ld+json" data-ellis-discovery>${json}</script>` };
}

function writeFeed(root, language, items) {
  const feedUrl = extension => origin + localFeed(language, extension);
  const title = feedTitle(language);
  const description = feedDescription(language);
  const home = canonicalUrl('/insights/', language);
  const locale = languages[language];
  const author = name => ({ name, url: canonicalUrl('/about/', language) });
  const timestamp = date => /T.+(?:Z|[+-]\d{2}:\d{2})$/.test(date || '') ? date : undefined;
  const id = entry => 'urn:ellis-services:article:' + entry.url.match(/\/insights\/([^/]+)/)[1] + ':' + locale;
  const feed = { version: 'https://jsonfeed.org/version/1.1', title, home_page_url: home,
    feed_url: feedUrl('json'), description, language: locale,
    items: items.map(item => ({
      id: id(item), url: item.url, title: item.title, summary: item.summary, content_html: item.content,
      date_published: timestamp(item.published), date_modified: timestamp(item.modified),
      image: item.image, authors: item.author ? [author(item.author)] : undefined
    })) };
  const element = (name, value) => `<${name}>${escape(value)}</${name}>`;
  const itemXml = items.map(item => `<item>
${element('title', item.title)}
${element('link', item.url)}
<guid isPermaLink="false">${id(item)}</guid>
${element('description', item.summary)}
${item.author ? element('dc:creator', item.author) : ''}
${timestamp(item.published) ? element('pubDate', new Date(item.published).toUTCString()) : ''}
${timestamp(item.modified) ? element('atom:updated', item.modified) : ''}
${element('content:encoded', item.content)}
</item>`).join('\n');
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
${element('title', title)}
${element('link', home)}
${element('description', description)}
${element('language', locale)}
<atom:link rel="self" type="application/rss+xml" href="${feedUrl('xml')}"/>
${itemXml}
</channel>
</rss>
`;
  fs.writeFileSync(path.join(root, localFeed(language, 'json').slice(1)), JSON.stringify(feed, null, 2) + '\n');
  fs.writeFileSync(path.join(root, localFeed(language, 'xml').slice(1)), rss);
}

function writeResources(root, records) {
  for (const [language, pages] of Object.entries(records)) {
    writeFeed(root, language, pages.flatMap(page => page.entry ? [page.entry] : []));
  }
  const labels = Object.fromEntries(Object.entries(records).map(([language, pages]) =>
    [language, Object.fromEntries(pages.map(page => [page.route, page.title]))]));
  const link = (label, url) => `- [${label}](${url})`;
  const bilingualLinks = routes => routes.flatMap(route => ['en', 'zh'].map(language =>
    link(labels[language][route], canonicalUrl(route, language))));
  const overview = ['/','/about/','/contact/','/services/','/sectors/','/areas/melbourne/','/faq/','/insights/'];
  const llms = [
    '# ' + business.name, '',
    '> Commercial property repairs and maintenance in Melbourne, Australia.',
    '> 为墨尔本商业物业提供维修与维护服务。', '',
    '## Company and enquiry', '',
    ...bilingualLinks(overview), '',
    '## Services', '',
    ...bilingualLinks(directories['/services/']), '',
    '## Commercial property sectors', '',
    ...bilingualLinks(directories['/sectors/']), '',
    '## Service areas', '',
    ...bilingualLinks(directories['/areas/melbourne/']), '',
    '## Optional', '',
    link('Sitemap', origin + '/sitemap.xml'),
    ...Object.keys(languages).flatMap(language => [
      link(english(language) ? 'English RSS' : '中文 RSS', origin + localFeed(language, 'xml')),
      link(english(language) ? 'English JSON Feed' : '中文 JSON Feed', origin + localFeed(language, 'json'))
    ]), ''
  ];
  fs.writeFileSync(path.join(root, 'llms.txt'), llms.join('\n'));
}

module.exports = { pageRecord, writeResources };
