const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(x=>x.name.startsWith('.')?[]:x.isDirectory()?walk(path.join(d,x.name)):x.name==='index.html'?[path.join(d,x.name)]:[]);
const old=rel=>cp.execFileSync('git',['show','d1733f2:'+rel],{cwd:root,encoding:'utf8',maxBuffer:4e6});
const metadata=h=>h.match(/id="page-meta">(.*?)<\/script>/)[1];
const hero=h=>h.match(/<section class="reference-hero[\s\S]*?<\/section>/)?.[0];
const content=h=>h.match(/<div id="page-content" class="designer-page-content">([\s\S]*?)<\/main>/)?.[1];
// The user explicitly replaced the company telephone sitewide. Preserve every
// other byte of the previously approved copy, FAQ and links.
const currentTelephone=h=>h?.replaceAll('tel:+61405878406','tel:+61482602558').replaceAll('0405 878 406','0482 602 558');
// These ten requested regional URLs are new, so there is no historical HTML
// to git-show. They still receive the H1, real-link and image checks below.
const newAreaPages=new Set([
 'cbd-inner','eastern','south-east','western','northern','north-east',
 'north-west','bayside-southern','casey-cardinia','frankston-mornington-peninsula'
].map(slug=>'areas/melbourne/'+slug+'/index.html'));
const changedCompositions=new Set(['services/index.html','sectors/index.html','contact/index.html','areas/melbourne/index.html']);
let restored=0,links=0,images=0,pages=0,metadataPreserved=0;
for(const p of walk(root)){
 const rel=path.relative(root,p).replaceAll('\\','/'),h=fs.readFileSync(p,'utf8');pages++;assert.equal((h.match(/<h1\b/g)||[]).length,1,'One H1: '+rel);
 if(rel!=='index.html'){
  assert(!h.includes('class="reference-bridge'),'No duplicated visual chapter: '+rel);
  if(!newAreaPages.has(rel)){
   const b=old(rel);assert.equal(metadata(h),metadata(b),'SEO metadata: '+rel);metadataPreserved++;
   if(!changedCompositions.has(rel)){assert.equal(hero(h),hero(b),'Original full visual composition: '+rel);assert.equal(content(h),currentTelephone(content(b)),'Formal copy / FAQ / links, with approved telephone: '+rel);restored++;}
  }
 }
 for(const [,href]of h.matchAll(/href="(\/[^"#]*)/g)){const u=decodeURI(href.split('?')[0]);assert(fs.existsSync(path.join(root,u,u.endsWith('/')?'index.html':'')),href);links++;}
 for(const [,src]of h.matchAll(/src="(\/?assets\/[^"?]*)/g)){assert(fs.existsSync(path.join(root,decodeURI(src))),src);images++;}
}
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');const data=vm.runInNewContext(app.slice(app.indexOf('  const services ='),app.indexOf('  function renderServices()'))+';({services,sectors,articles,faqs})');const originalApp=old('app.js');const original=vm.runInNewContext(originalApp.slice(originalApp.indexOf('  const services ='),originalApp.indexOf('  function renderServices()'))+';({services,sectors,articles,faqs})');assert.equal(JSON.stringify(data),JSON.stringify(original),'Existing bilingual source data');
const sector=fs.readFileSync(path.join(root,'sectors/index.html'),'utf8');assert.equal((sector.match(/data-sector-choice="/g)||[]).length,8);assert.equal((sector.match(/data-campus-hotspot="/g)||[]).length,8);assert.equal((sector.match(/class="sector-feature-panel"/g)||[]).length,8);assert.equal((sector.match(/id="page-content"/g)||[]).length,1);assert.equal((sector.match(/sector-explorer.js\?/g)||[]).length,1);assert(!sector.includes('class="detail-links"'),'One eight-sector directory');
const escape=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');for(const s of data.sectors)for(const value of [s.zh,s.en,s.descZh,s.descEn,...s.tagsZh,...s.tagsEn])assert(sector.includes(escape(value)),'Original sector copy: '+value);
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');assert.equal((home.match(/class="showcase-card /g)||[]).length,12);const opening=h=>h.match(/<section[^>]*id="home"[\s\S]*?<div class="service-ribbon"/)[0].replaceAll('\r\n','\n');assert.equal(opening(home),opening(old('index.html')),'Homepage opening remains intact');assert(!home.includes('sector-explorer.js'),'No explorer on homepage');
const services=fs.readFileSync(path.join(root,'services/index.html'),'utf8');assert.equal((services.match(/data-directory-service="/g)||[]).length,12);assert.equal((services.match(/data-directory-card="/g)||[]).length,3);
// Contact is explicitly authorised to open with the existing enquiry flow.
const contact=fs.readFileSync(path.join(root,'contact/index.html'),'utf8');assert(!hero(contact),'Contact opens directly with a form');assert.equal((contact.match(/<form\b/g)||[]).length,1,'One immediate enquiry form');
const fields=h=>[...h.matchAll(/<(?:input|select|textarea)\b[^>]*name="([^"]+)"/g)].map(m=>m[1]).sort();const originalForm=home.match(/<form id="quote-form"[\s\S]*?<\/form>/)[0];for(const name of fields(originalForm))assert(fields(contact).includes(name),'Contact preserves original field: '+name);for(const name of ['phone','sector','photos'])assert(fields(contact).includes(name),'Reference Contact field: '+name);assert(contact.includes('type="file" multiple accept="image/*"'),'Real local photo selector');assert(contact.includes('ellis 0482 602 558'),'Correct contact name');assert(!contact.includes('Ellie'),'No superseded contact name');
assert(contact.includes('$20M Public Liability Insurance'),'Contact retains insurance');assert(contact.includes('mailto:elliservices.group@gmail.com'));assert(contact.includes('tel:+61482602558'));assert(!contact.includes('tel:+61405878406'),'Contact has no stale phone');for(const s of data.services)assert(contact.includes(escape(s.zh))&&contact.includes(escape(s.en)),'Contact reuses bilingual services');
console.log(JSON.stringify({pages,restoredOriginalHeroes:restored,formalBodiesPreserved:restored,metadataPreserved,newAreaPages:newAreaPages.size,originalBilingualData:true,sectorEntries:8,hotspots:8,sectorPanels:8,duplicateHeroChapters:0,homepagePreserved:true,serviceDirectoryPreserved:true,internalLinks:links,imageReferences:images}));
