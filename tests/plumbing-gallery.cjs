const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(root,'services/plumbing-drainage-gas/index.html'),'utf8');
const gallery=html.match(/<section class="su-gallery[\s\S]*?<\/section>/)[0];
const sources=[...gallery.matchAll(/class="pg-photo"><img[^>]+src="([^"]+)"/g)].map(m=>m[1]);
assert.equal(sources.length,4,'Four independent site photographs');
assert.equal(new Set(sources).size,4,'Every stage has a distinct view');
for(const [i,phase]of ['site','inspection','work','completed'].entries()){
 assert(sources[i].endsWith(`gallery-plumbing-${phase}-v2.webp`),'Correct photo for '+phase);
 assert(fs.statSync(path.join(root,sources[i])).size>20000,'Full photographic asset exists: '+phase);
}
assert(!/connector-pipe|problem-plumbing-gas|design\/plumbing/.test(gallery),'No orange-only model or unrelated gas photo in the drainage gallery');
assert.equal((gallery.match(/class="pg-phase"/g)||[]).length,4,'Four HTML stage labels');
assert.equal((gallery.match(/class="pg-join"/g)||[]).length,3,'Three decorative sequence markers');
assert(gallery.includes('案例版式示意｜上线替换为真实项目'),'Illustrations are not presented as real work');
assert(!/<button\b|role="button"/.test(gallery),'Sequence markers are not nonfunctional controls');
for(const s of require('../content/service-pages.json').services){
 const page=fs.readFileSync(path.join(root,s.route,'index.html'),'utf8');
 assert.equal(page.includes('/plumbing-gallery.css?'),s.slug==='plumbing-drainage-gas','Local stylesheet only loads on its intended route');
}
console.log('Plumbing gallery passed: four distinct environment-backed photos, real bilingual labels, honest illustration notice and page-local styling.');
