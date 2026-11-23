const assert = require('node:assert/strict');
const { canonicalUrl } = require('./search-config.cjs');
const { sectors, sectorSlugs } = require('./site-data.cjs');
const { articles } = require('./technical-notes.cjs');
const { services } = require('./service-pages.json');
const englishServices = require('./service-pages.en.json');
const { regions } = require('../vendor/ellis-regions-v2/data/region-pages.json');

const labels = new Map([
  ['/', ['首页', 'Home']],
  ['/about/', ['关于我们', 'About us']],
  ['/areas/melbourne/', ['墨尔本服务地区', 'Melbourne service areas']],
  ['/contact/', ['联系我们', 'Contact us']],
  ['/faq/', ['常见问题', 'FAQs']],
  ['/insights/', ['技术文章', 'Technical articles']],
  ['/privacy/', ['隐私说明', 'Privacy']],
  ['/sectors/', ['商业种类', 'Property sectors']],
  ['/services/', ['服务内容', 'Services']],
  ...services.map((service, i) => [service.route, [service.title, englishServices[i].title]]),
  ...sectorSlugs.map((slug, i) => ['/sectors/' + slug + '/', [sectors[i].zh, sectors[i].en]]),
  ...regions.map(region => [region.route, [region.nameZh, region.nameEn]]),
  ...articles.map(article => [article.route, article.title])
]);

const attr = (node, name) => node.attrs?.find(attribute => attribute.name === name)?.value;
const hasClass = (node, name) => attr(node, 'class')?.split(/\s+/).includes(name);
const escape = value => value.replace(/[&<>"]/g, character =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[character]);
const parentRoute = route => route.replace(/[^/]+\/$/, '');
const navLabel = ['当前位置', 'Breadcrumb'];

function hierarchy(route, pageRoutes) {
  const routes = [route];
  for (let parent = parentRoute(route); parent !== '/'; parent = parentRoute(parent)) {
    if (pageRoutes.has(parent)) routes.unshift(parent);
  }
  routes.unshift('/');
  return routes.map(path => {
    const label = labels.get(path);
    assert(label?.every(value => value?.trim()), 'Missing bilingual breadcrumb label for ' + path);
    return { path, label: label.map(value => value.replace(/\s+/g, ' ').trim()) };
  });
}

function markup(trail, language, placement, chain, liveTranslation) {
  const items = trail.map(({ name, item }, i) => {
    const label = escape(name);
    const [zh, en] = chain[i].label.map(escape);
    const copy = liveTranslation ? ' data-zh="' + zh + '" data-en="' + en + '"' : '';
    if (i === trail.length - 1) return '<li><span' + copy + ' aria-current="page">' + label + '</span></li>';
    const { pathname, search } = new URL(item);
    return '<li><a' + copy + ' href="' + escape(pathname + search) + '">' + label +
      '</a><span class="ellis-breadcrumb-separator" aria-hidden="true">/</span></li>';
  });
  const copy = liveTranslation ? ' data-aria-label-zh="' + navLabel[0] + '" data-aria-label-en="' + navLabel[1] + '"' : '';
  return '<nav class="ellis-breadcrumb ' + placement + '" aria-label="' +
    navLabel[language === 'en' ? 1 : 0] + '"' + copy + '><ol role="list">' + items.join('') + '</ol></nav>';
}

// Retain the original placement where the hero already makes room for a visible trail.
// For layouts that hid it, place the trail in the heading copy instead of using an overlay.
function withBreadcrumb(source, nodesOf, route, language, pageRoutes) {
  const nodes = nodesOf(source);
  const heading = nodes.find(node => node.tagName === 'h1');
  const current = nodes.filter(node => node.tagName === 'nav' &&
    ['breadcrumbs', 'tn-crumb', 'rr-breadcrumb', 'ellis-breadcrumb'].some(name => hasClass(node, name)));
  const embedded = current.find(node => hasClass(node, 'tn-crumb') || hasClass(node, 'rr-breadcrumb') ||
    (hasClass(node, 'breadcrumbs') && parentRoute(route) === '/services/'));
  const contact = route === '/contact/';
  const placement = embedded ? ['tn-crumb', 'rr-breadcrumb', 'breadcrumbs'].find(name => hasClass(embedded, name)) :
    contact ? 'ellis-breadcrumb-contact' : 'ellis-breadcrumb-inline';
  const chain = hierarchy(route, pageRoutes);
  const trail = chain.map(({ path, label }) => ({
    name: label[language === 'en' ? 1 : 0], item: canonicalUrl(path, language)
  }));
  const breadcrumb = markup(trail, language, placement, chain, !route.startsWith('/areas/melbourne/'));
  const edits = current.map(node => {
    const { startOffset, endOffset } = node.sourceCodeLocation;
    return [startOffset, endOffset, node === embedded ? breadcrumb : ''];
  });
  if (!embedded) {
    const container = contact ? nodes.find(node => hasClass(node, 'contact-page-grid')) : heading?.parentNode;
    assert(container, 'Missing breadcrumb placement for ' + route);
    const start = container.sourceCodeLocation.startTag.endOffset;
    edits.push([start, start, breadcrumb]);
  }
  // The region adapter remounts from these HTML fragments after an in-page language switch.
  const regionLocales = nodes.find(node => attr(node, 'id') === 'region-v2-locales');
  if (regionLocales) {
    const variants = JSON.parse(regionLocales.childNodes[0].value);
    for (const locale of ['zh', 'en']) {
      variants[locale] = withBreadcrumb(variants[locale], nodesOf, route, locale, pageRoutes).source;
    }
    const { startTag, endTag } = regionLocales.sourceCodeLocation;
    edits.push([startTag.endOffset, endTag.startOffset, JSON.stringify(variants).replaceAll('<', '\\u003c')]);
  }
  for (const [start, end, value] of edits.sort((a, b) => b[0] - a[0])) {
    source = source.slice(0, start) + value + source.slice(end);
  }
  return { source, trail };
}

module.exports = { withBreadcrumb };
