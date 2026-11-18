const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):e.name==='index.html'?[path.join(dir,e.name)]:[]);
const pages=[path.join(root,'index.html'),...['services','sectors','areas','insights','faq','about','contact','privacy'].flatMap(dir=>walk(path.join(root,dir)))];
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
 const footer=html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0];
 assert(footer&&!footer.includes('<details'),`${file}: footer has no collapsed content`);
 assert.equal(footer,homeFooter,`${file}: full footer markup matches homepage`);
 assert(!html.includes('rr-footer-expanded'),`${file}: no regional footer fold`);
 const variants=html.match(/id="region-v2-locales">([\s\S]*?)<\/script>/);
 if(variants)assert(!/\p{Script=Han}/u.test(JSON.parse(variants[1]).en),`${file}: entire English region variant contains no Chinese`);
}
console.log(`Navigation/locale contracts passed: ${pages.length} pages share one navigation stylesheet, original language control, localized attributes and fully visible footers; English region variants contain no Chinese.`);
