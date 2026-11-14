const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const regions=require('../content/area-data.cjs');
const expectedSlugs=[
 'cbd-inner','eastern','south-east','western','northern','north-east',
 'north-west','bayside-southern','casey-cardinia','frankston-mornington-peninsula'
];
assert.deepEqual(regions.map(region=>region.slug),expectedSlugs,'Exactly the ten approved regions');
const escape=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const read=route=>fs.readFileSync(path.join(root,route,'index.html'),'utf8');
const overview=read('areas/melbourne');
const home=read('');

for(const [label,html,isHome] of [['homepage',home,true],['Melbourne overview',overview,false]]){
 const section=html.match(/<section\b[^>]*data-area-theatre\b[\s\S]*?<\/section>/)?.[0];
 assert(section,'Area theatre exists: '+label);
 assert.equal((html.match(/data-area-theatre\b/g)||[]).length,1,'One theatre: '+label);
 assert.equal((section.match(/<h1\b/g)||[]).length,isHome?0:1,'Correct heading level: '+label);
 assert.equal((section.match(/<h2\b/g)||[]).length,isHome?1:0,'Correct home H2: '+label);
 for(const row of ['top','bottom']){
  const markup=section.match(new RegExp('<nav class="ma-row ma-'+row+'"[^>]*>([\\s\\S]*?)<\\/nav>'))?.[1];
  assert(markup,'Directory row exists: '+row);
  assert.equal((markup.match(/class="ma-region /g)||[]).length,5,'Five links in '+row+' row');
 }
 const links=[...section.matchAll(/class="ma-region [^"]*" href="([^"]+)"/g)].map(match=>match[1].split('?')[0]);
 assert.deepEqual(links,regions.map(region=>region.route),'Ten ordered region destinations: '+label);
 for(const region of regions){
  assert(section.includes(escape(region.zh))&&section.includes(escape(region.en)),'Bilingual region: '+region.id);
  assert(fs.existsSync(path.join(root,region.route,'index.html')),'Region destination exists: '+region.route);
 }
 for(const phase of ['day','dusk','night'])assert.equal((section.match(new RegExp('data-ma-phase="'+phase+'"','g'))||[]).length,1,'One '+phase+' image');
 assert(!/ma-time-controls|ma-time-range|ma-auto-toggle|<output\b/.test(section),'Automatic scene has no public time controls: '+label);
 assert(section.includes('I love Melbourne'),'Actual particle phrase in HTML');
 assert.equal((html.match(/src="\/?area-theatre\.js\?/g)||[]).length,1,'One local scene controller: '+label);
 assert.equal((html.match(/href="\/?area-theatre\.css\?/g)||[]).length,1,'One local scene stylesheet: '+label);
 assert(!/href="[^"]*\/suburbs(?:\/|\.html|\?)/i.test(section),'No fabricated suburbs directory');
}
// The one navigation layer follows every base/feature stylesheet; the one
// readability layer follows navigation and is the final stylesheet.
const pageFiles=[];
function walkPages(directory){
 for(const item of fs.readdirSync(directory,{withFileTypes:true})){
  if(item.name.startsWith('.')||['node_modules','assets'].includes(item.name))continue;
  const file=path.join(directory,item.name);
  if(item.isDirectory())walkPages(file);else if(item.name==='index.html')pageFiles.push(file);
 }
}
walkPages(root);
assert.equal(pageFiles.length,42,'Check shared layers on all 42 generated pages');
for(const file of pageFiles){
 const html=fs.readFileSync(file,'utf8');
 const sheets=[...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g)].map(match=>match[1]);
 assert.equal(sheets.filter(href=>/^\/?navigation-refinement\.css(?:\?|$)/.test(href)).length,1,'One shared navigation stylesheet: '+path.relative(root,file));
 assert.equal(sheets.filter(href=>/^\/?readability-refinement\.css(?:\?|$)/.test(href)).length,1,'One shared readability stylesheet: '+path.relative(root,file));
 assert.match(sheets.at(-2),/^\/?navigation-refinement\.css(?:\?|$)/,'Shared navigation follows every base/feature stylesheet: '+path.relative(root,file));
 assert.match(sheets.at(-1),/^\/?readability-refinement\.css(?:\?|$)/,'Readability follows navigation and loads last: '+path.relative(root,file));
}
assert.match(overview,/<body\b[^>]*\barea-overview-page\b/,'Overview body variant');
assert(!overview.includes('class="reference-hero'),'Overview has no extra design-shell hero');
assert(!overview.includes('Business location &amp; registration'),'No duplicate geographic/registration chapter');

for(const region of regions){
 const html=read(region.route);
 assert.equal((html.match(/<h1\b/g)||[]).length,1,'One regional H1: '+region.id);
 assert.match(html,/<body\b[^>]*\barea-region-page\b/,'Regional body variant: '+region.id);
 assert(!html.includes('class="reference-hero'),'Region starts directly with its content: '+region.id);
 assert(html.includes(escape(region.zh+'商业物业维护')),'Chinese H1: '+region.id);
 assert(html.includes(escape(region.en+': commercial property maintenance')),'English H1: '+region.id);
 assert.equal((html.match(/class="area-detail-content"/g)||[]).length,1,'One regional content module: '+region.id);
 assert.equal((html.match(/class="area-detail-work"/g)||[]).length,3,'Three specific work arrangements: '+region.id);
 assert(html.includes('href="/areas/melbourne/"'),'Back to real directory: '+region.id);
 assert(html.includes('href="/contact/"'),'Contact route: '+region.id);
 assert.equal((html.match(/href="\/area-theatre\.css\?/g)||[]).length,1,'Regional CSS: '+region.id);
 assert(!html.includes('src="/area-theatre.js'),'No unnecessary scene controller on region page: '+region.id);
 const metadata=JSON.parse(html.match(/id="page-meta">([\s\S]*?)<\/script>/)[1]);
 assert.equal(metadata.route,region.route,'Regional canonical route: '+region.id);
 for(const key of ['titleZh','titleEn','descriptionZh','descriptionEn'])assert(metadata[key]?.trim(),'Bilingual metadata '+key+': '+region.id);
 for(const [,href] of html.matchAll(/href="(\/[^"#]*)/g)){
  const target=decodeURI(href.split('?')[0]);
  assert(fs.existsSync(path.join(root,target,target.endsWith('/')?'index.html':'')),'Real internal destination: '+href);
 }
}
console.log(JSON.stringify({theatres:2,regions:10,linksPerDirectory:10,rows:'5+5',singleH1:true,bilingual:true,realDestinations:true,publicTimeControls:0,sharedNavigationPages:pageFiles.length,readabilityPages:pageFiles.length,exactFinalCSSOrder:true,extraHeroChapters:0,fabricatedSuburbsRoutes:0}));
