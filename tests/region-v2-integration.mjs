import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderRegionReference,withOverviewPlaces,esc} from '../content/region-reference.mjs';
import {renderMain} from '../vendor/ellis-regions-v2/src/render.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'vendor/ellis-regions-v2/data/region-pages.json')));
const places=JSON.parse(fs.readFileSync(path.join(root,'content/region-places.json')));
assert.equal(Object.values(places).flat().length,67,'all 67 supplied key locations');
for(const region of data.regions)assert.deepEqual(region.coverageSuburbs,places[region.areaParam],`${region.areaParam}: original coverage agrees with supplied MD`);
const assets='/assets/ellis-regions-v2';
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const breadcrumb=/<nav class="(?:ellis-breadcrumb )?(?:breadcrumbs|rr-breadcrumb|ellis-breadcrumb-inline)"[\s\S]*?<\/nav>/;
let routes=0,links=0;
for(const page of [data.hub,...data.regions]){
 const html=fs.readFileSync(path.join(root,page.route,'index.html'),'utf8');
 const main=html.match(/<main\b[\s\S]*?<\/main>/)[0];
 assert.equal((main.match(/<h1\b/g)||[]).length,1,`${page.route}: one visible H1`);
 assert.equal((html.match(/<footer\b/g)||[]).length,1,`${page.route}: original footer once`);
 assert(!html.includes('area-theatre.js'),`${page.route}: no old area animation instance`);
 assert(!main.includes('data-enquiry-form'),`${page.route}: no demo form`);
 for(const lang of ['zh','en']){
  const rendered=(page===data.hub?withOverviewPlaces(renderMain({data,pathname:page.route,lang,assetBase:assets,siteOrigin:'https://melbournecommercialrepairscomau.vercel.app',preview:false,contactLocal:true,includeHubCoverage:false}),data,lang):renderRegionReference({data,page,lang})).replaceAll('/assets/ellis-regions-v2/hero-melbourne-v2.webp','/assets/region-reference-v3/overview-city.webp');
  const variants=JSON.parse(html.match(/id="region-v2-locales">([\s\S]*?)<\/script>/)[1]);
  assert.equal(variants[lang].replace(breadcrumb,''),rendered.replaceAll('https://melbournecommercialrepairscomau.vercel.app','').replace(breadcrumb,''),`${page.route}: complete ${lang} content outside the breadcrumb`);
  const file=lang==='zh'?html:fs.readFileSync(path.join(root,'_ellisl10n',page.route,'index.html'),'utf8');
  const initialBreadcrumb=file.match(breadcrumb)?.[0];
  assert(initialBreadcrumb?.includes('class="ellis-breadcrumb '),`${page.route}: initial ${lang} breadcrumb`);
  assert.equal(variants[lang].match(breadcrumb)?.[0],initialBreadcrumb,`${page.route}: remounted ${lang} breadcrumb agrees with initial HTML`);
  if(page!==data.hub){
   const chips=rendered.match(/<ul class="rr-suburbs">([\s\S]*?)<\/ul>/)?.[1]||'';
   for(const place of places[page.areaParam])assert(chips.includes(escape(place)),`${page.route}: ${place} visible outside disclosure in ${lang}`);
   const full=rendered.match(/<div class="rr-coverage-body">([\s\S]*?)<\/details>/)?.[1]||'';
   for(const scene of page.locales[lang].scenarios)for(const key of ['title','problem','approach','handover'])assert(full.includes(esc(scene[key])),`${page.route}: full ${lang} ${key} retained`);
   for(const step of page.locales[lang].planning)assert(full.includes(esc(step.body)),`${page.route}: full ${lang} planning retained`);
  }else{
   assert(!rendered.includes('hub-coverage__details'),`overview: no duplicate coverage disclosure in ${lang}`);
   const cardLinks=[...rendered.matchAll(/class="area-card__link" href="([^"]+)"/g)].map(([,href])=>new URL(href,'https://melbournecommercialrepairscomau.vercel.app').pathname);
   assert.deepEqual(cardLinks,data.regions.map(region=>region.route),`overview: direct links to every region in ${lang}`);
   for(const region of data.regions){
    const preview=rendered.match(new RegExp(`data-region-preview-panel="${region.areaParam}"[\\s\\S]*?<p class="rr-preview-places">([\\s\\S]*?)<\\/p>`))?.[1]||'';
    for(const place of places[region.areaParam])assert(preview.includes(escape(place)),`overview ${region.areaParam}: ${place} visible when selected`);
   }
  }
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
