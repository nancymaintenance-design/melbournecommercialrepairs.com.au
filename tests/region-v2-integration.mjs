import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderMain} from '../vendor/ellis-regions-v2/src/render.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'vendor/ellis-regions-v2/data/region-pages.json')));
const assets='/assets/ellis-regions-v2';
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
let routes=0,links=0;
for(const page of [data.hub,...data.regions]){
 const html=fs.readFileSync(path.join(root,page.route,'index.html'),'utf8');
 const main=html.match(/<main\b[\s\S]*?<\/main>/)[0];
 assert.equal((main.match(/<h1\b/g)||[]).length,1,`${page.route}: one visible H1`);
 assert.equal((html.match(/<footer\b/g)||[]).length,1,`${page.route}: original footer once`);
 assert(!html.includes('area-theatre.js'),`${page.route}: no old area animation instance`);
 assert(!main.includes('data-enquiry-form'),`${page.route}: no demo form`);
 for(const lang of ['zh','en']){
  const rendered=renderMain({data,pathname:page.route,lang,assetBase:assets,siteOrigin:'https://melbournecommercialrepairscomau.vercel.app',preview:false,contactLocal:true});
  const variants=JSON.parse(html.match(/id="region-v2-locales">([\s\S]*?)<\/script>/)[1]);
  assert.equal(variants[lang],rendered.replaceAll('https://melbournecommercialrepairscomau.vercel.app',''),`${page.route}: complete ${lang} content`);
  for(const match of rendered.matchAll(/(?:href|src)="([^"]+)"/g)){
   const url=new URL(match[1].replaceAll('&amp;','&'),'https://melbournecommercialrepairscomau.vercel.app');
   if(url.origin!=='https://melbournecommercialrepairscomau.vercel.app')continue;
   let target=path.join(root,decodeURIComponent(url.pathname));
   if(url.pathname.endsWith('/'))target=path.join(target,'index.html');
   assert(fs.existsSync(target),`${page.route}: missing ${url.pathname}`);links++;
  }
 }
 if(page.coverageSuburbs)for(const suburb of page.coverageSuburbs)assert(html.includes(escape(suburb)),`complete coverage: ${suburb}`);
 routes++;
}
const hub=fs.readFileSync(path.join(root,'areas/melbourne/index.html'),'utf8').match(/<main\b[\s\S]*?<\/main>/)[0];
assert.equal((hub.match(/data-region-preview-select=/g)||[]).length,10);
assert.equal((hub.match(/class="area-card__link"/g)||[]).length,10);
const styles=fs.readFileSync(path.join(root,assets,'styles.css'),'utf8');
assert(styles.includes("@import url('./fidelity.css') layer(fidelity)"),'supplied final fidelity import');
for(const file of ['fidelity.css','ellis-sans-sc-400.woff','ellis-sans-sc-700.woff','FONT_LICENSE.txt'])assert(fs.existsSync(path.join(root,assets,file)));
const contact=fs.readFileSync(path.join(root,'contact/index.html'),'utf8');
assert.equal((contact.match(/src="\/region-contact-prefill\.mjs/g)||[]).length,1);
assert(!contact.includes('id="contact-draft-result"'));
assert(!contact.includes('本地设计预览'));
console.log(`Region integration passed: ${routes} routes, 22 complete locale variants, ${links} local URL references, 10 preview/select arrows, fonts/fidelity/coverage, original shell and production contact.`);
