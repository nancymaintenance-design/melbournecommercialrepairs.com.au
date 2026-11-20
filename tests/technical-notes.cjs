const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {parse} = require('parse5');
const {articles,categories} = require('../content/technical-notes.cjs');
const {serviceSlugs,articleSlugs} = require('../content/site-data.cjs');
const {canonicalUrl,origin} = require('../content/search-config.cjs');
const {routes} = require('../vercel.json');
const localeRoute = new RegExp(routes.find(route=>route.dest==='/_ellisl10n/$1/index.html').src);

const root = path.resolve(__dirname,'..');
const read = file => fs.readFileSync(path.join(root,file),'utf8');
const attribute = (node,key) => node.attrs?.find(item=>item.name===key)?.value;
const hasClass = (node,cls) => attribute(node,'class')?.split(/\s+/).includes(cls);
function* tree(node) {
 yield node;
 for (const child of node.childNodes || []) yield* tree(child);
}
function page(route,lang) {
 const filename = (lang==='en'?'_ellisl10n':'') + route + 'index.html';
 return [...tree(parse(read(filename)))];
}
const urls = nodes => nodes.filter(node=>node.tagName==='a').map(node=>attribute(node,'href'));
const sitemap = [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map(([,url])=>url);
assert.equal(new Set(sitemap).size,sitemap.length,'Sitemap URL uniqueness');
assert.equal(articles.length,24);
for (const category of Object.keys(categories)) {
 assert.equal(articles.filter(article=>article.category===category).length,2,category+' technical notes');
}
assert.equal(new Set(articles.map(article=>article.slug)).size,articles.length);
const bySlug = new Map(articles.map(article=>[article.slug,article]));

for (const lang of ['zh','en']) {
 const library = page('/insights/',lang);
 assert.equal(library.filter(node=>node.tagName==='h1').length,1);
 assert.equal(library.filter(node=>node.tagName==='button'&&attribute(node,'data-tn-filter')).length,13);
 assert.equal(library.filter(node=>attribute(node,'data-tn-category')).length,articles.length);
 assert.equal(library.filter(node=>hasClass(node,'tn-feature')).length,1);
 for (const article of articles) {
  const {route} = article;
  assert(localeRoute.test(route),route+' served as English HTML by Vercel');
  const local = base => lang==='en'?base+'?lang=en':base;
  assert(urls(library).includes(local(route)),route+' discoverable in initial HTML');
  const nodes = page(route,lang);
  assert.equal(nodes.filter(node=>node.tagName==='h1').length,1,route);
  const main = [...tree(nodes.find(node=>node.tagName==='main'))];
  const mainLinks = urls(main);
  assert(mainLinks.every(href=>href.startsWith('#')||(href.startsWith('/')&&!href.startsWith('//'))),route+' no external links');
  assert(!mainLinks.includes('#tn-references'),route+' no references TOC entry');
  assert(!main.some(node=>attribute(node,'id')==='tn-references'||hasClass(node,'tn-bibliography')),route+' no public bibliography');
  assert.equal(main.filter(node=>hasClass(node,'tn-diagnostic-note')).length,1,route+' topic-specific evidence interpretation');
  for (const href of mainLinks.filter(href=>href.startsWith('#'))) {
   assert(main.some(node=>attribute(node,'id')===href.slice(1)),route+' valid anchor '+href);
  }
  assert(mainLinks.includes(local('/services/'+article.primary+'/')),route+' primary service');
  const related = main.find(node=>hasClass(node,'tn-related'));
  assert.equal(article.related.length,2);
  for(const slug of article.related) assert(urls([...tree(related)]).includes(local(bySlug.get(slug).route)));
  const primary = page('/services/'+article.primary+'/',lang).find(node=>hasClass(node,'tn-service-notes'));
  assert(urls([...tree(primary)]).includes(local(route)),route+' reciprocal service link');
  assert.equal(main.filter(node=>node.tagName==='table').length,1,route+' semantic table');
  assert.equal(main.filter(node=>node.tagName==='td').length,6,route+' table evidence');
  const canonical = canonicalUrl(route,lang);
  assert.equal(attribute(nodes.find(node=>attribute(node,'rel')==='canonical'),'href'),canonical);
  assert(nodes.some(node=>attribute(node,'hreflang')==='en-AU'&&attribute(node,'href')===canonicalUrl(route,'en')));
  assert(nodes.some(node=>attribute(node,'hreflang')==='zh-CN'&&attribute(node,'href')===canonicalUrl(route,'zh')));
  assert(sitemap.includes(canonical));
  const json = nodes.filter(node=>attribute(node,'type')==='application/ld+json').map(node=>JSON.parse(node.childNodes[0].value));
  const schema = json.find(entity=>entity['@type']==='Article');
  assert.equal(schema.url,canonical);
  assert.equal(schema.inLanguage,lang==='en'?'en-AU':'zh-CN');
  assert.equal(schema.headline,article.title[lang==='en'?1:0].replaceAll('\n',' '));
  assert.equal(schema.author['@id'],origin+'/#ellis-organization');
  assert.equal(schema.datePublished,article.publishedOn);
  assert(!schema.dateModified,'No generated modification date');
  for(const node of main.filter(node=>node.tagName==='img')){
   const src=attribute(node,'src').split('?')[0];
   assert(fs.existsSync(path.join(root,src)),route+' existing visual '+src);
  }
 }
 for(const slug of serviceSlugs){
  const service=page('/services/'+slug+'/',lang);
  const section=service.find(node=>hasClass(node,'tn-service-notes'));
  const required = articles.filter(article=>article.primary===slug || article.secondary===slug);
  const destinations = urls([...tree(section)]);
  assert.equal(destinations.length,required.length,slug+' article link count');
  for (const article of required) assert(destinations.includes(article.route+(lang==='en'?'?lang=en':'')));
  assert(required.length,slug+' has articles');
 }
 for(const slug of articleSlugs) assert(page('/insights/'+slug+'/',lang).some(node=>node.tagName==='h1'),slug+' legacy article preserved');
}
console.log('Technical notes: 24 articles, 13 filters, 48 prerendered locale pages, reciprocal service links, preserved legacy pages and no article external links.');
