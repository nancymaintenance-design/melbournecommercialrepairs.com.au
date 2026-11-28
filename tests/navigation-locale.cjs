const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):e.name==='index.html'?[path.join(dir,e.name)]:[]);
const pages=[path.join(root,'index.html'),...['services','sectors','areas','insights','faq','about','contact','privacy'].flatMap(dir=>walk(path.join(root,dir)))];
const homeSource=fs.readFileSync(pages[0],'utf8');
const homeLocale=homeSource.search(/<script[^>]*src="\/locale-ui\.js\?/);
const homeApp=homeSource.search(/<script[^>]*src="\/?app\.js\?/);
assert(homeLocale>=0&&homeApp>homeLocale,'Homepage loads the shared locale helper before app.js');
const {localizeUrl}=require('../locale-ui.js');
const combined=localizeUrl(new URL('https://example.com/contact/?utm_source=ad&area=cbd-inner&service=roofing-waterproofing&lang=en&gclid=raw%2Bvalue&utm_source=second#contact-enquiry-form'),'zh');
assert.equal(combined.href,'https://example.com/contact/?lang=zh&service=roofing-waterproofing&area=cbd-inner&utm_source=ad&gclid=raw%2Bvalue&utm_source=second#contact-enquiry-form');
assert.equal(localizeUrl(combined,'zh').href,combined.href,'Link normalization must be stable');
const faqUrl=localizeUrl(new URL('https://example.com/faq/?q=roof+repair&lang=zh&topic=roofing&lang=en#faq-results'),'en');
assert.equal(faqUrl.href,'https://example.com/faq/?lang=en&topic=roofing&q=roof+repair#faq-results');
const homeFooter=fs.readFileSync(pages[0],'utf8').match(/<footer\b[\s\S]*?<\/footer>/)[0];
for(const file of pages){
 const html=fs.readFileSync(file,'utf8');
 const header=html.match(/<header class="site-header">[\s\S]*?<\/header>/)[0];
 assert.equal((html.match(/href="\/navigation-refinement\.css\?/g)||[]).length,1,`${file}: one shared unlayered navigation stylesheet`);
 assert.equal((html.match(/href="\/footer-brand\.css\?/g)||[]).length,1,`${file}: one shared unlayered footer stylesheet`);
 assert.equal((html.match(/src="\/locale-ui\.js\?/g)||[]).length,1,`${file}: shared localized attributes`);
 assert.equal((header.match(/data-nav-path=/g)||[]).length,8,`${file}: all eight original routes`);
 assert(header.includes('<span class="lang-zh active">中</span>'),`${file}: original language button retained`);
 assert(header.includes('<span class="lang-en">EN</span>'),`${file}: original English switch retained`);
 const route='/' + path.relative(root,file).replaceAll('\\','/').replace(/index\.html$/,'');
 const flip=page=>page.match(/<a\b[^>]*\bid="language-switch"[^>]*>/)?.[0];
 const english=fs.readFileSync(path.join(root,'_ellisl10n',route,'index.html'),'utf8');
 assert(flip(html)?.includes('href="'+route+'?lang=en"'),file+': Chinese switch has a real English href');
 assert(flip(english)?.includes('href="'+route+'?lang=zh"'),file+': English switch has a real Chinese href');
 const footer=html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0];
 assert(footer&&!footer.includes('<details'),`${file}: footer has no collapsed content`);
 assert.equal(footer,homeFooter,`${file}: full footer markup matches homepage`);
 assert(!html.includes('rr-footer-expanded'),`${file}: no regional footer fold`);
 const variants=html.match(/id="region-v2-locales">([\s\S]*?)<\/script>/);
 if(variants)assert(!/\p{Script=Han}/u.test(JSON.parse(variants[1]).en),`${file}: entire English region variant contains no Chinese`);
}
for(const home of [homeSource,fs.readFileSync(path.join(root,'_ellisl10n/index.html'),'utf8')]){
 const cards=[...home.matchAll(/<a class="nm-article-link"[^>]*>[\s\S]*?<\/a>/g)].map(([card])=>card);
 assert.equal(cards.length,3,'Homepage has all three news article links');
 for(const card of cards){
  assert.match(card,/<div class="nm-cover" aria-hidden="true"><img[^>]+ alt=""[^>]*>/);
  const label=card.match(/aria-labelledby="([^"]+)"/)[1];
  assert(card.includes('id="'+label+'"'),'Article name still uses the localized visible title');
 }
}
console.log(`Navigation/locale contracts passed: ${pages.length} pages share one navigation stylesheet, original language control, localized attributes and fully visible footers; English region variants contain no Chinese.`);
