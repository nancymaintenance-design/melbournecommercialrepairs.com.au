const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),pack=require('../content/service-pages.json'),en=require('../content/service-pages.en.json');
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
const header=home.match(/<header class="site-header">[\s\S]*?<\/header>/)[0].replace('src="assets/','src="/assets/');
const footer=home.match(/<footer\b[\s\S]*?<\/footer>/)[0];
let localLinks=0;
for(const [i,s] of pack.services.entries()){
 const html=fs.readFileSync(path.join(root,s.route,'index.html'),'utf8');
 assert.equal((html.match(/<h1\b/g)||[]).length,1,s.slug+': one H1');
 assert.equal(html.match(/<header class="site-header">[\s\S]*?<\/header>/)[0],header,s.slug+': homepage header unchanged');
 assert.equal(html.match(/<footer\b[\s\S]*?<\/footer>/)[0],footer,s.slug+': full homepage footer unchanged');
 assert(html.includes(`data-service-reference="${s.slug}"`));
 assert.equal((html.match(/id="problem-tab-/g)||[]).length,4);
 assert.equal((html.match(/id="problem-panel-/g)||[]).length,4);
 const ids=[...html.matchAll(/\bid="([^\"]+)"/g)].map(x=>x[1]);
 assert.equal(ids.length,new Set(ids).size,s.slug+': unique control and panel IDs');
 for(const [,target] of html.matchAll(/role="tab"[^>]*aria-controls="([^\"]+)"/g))assert(ids.includes(target),s.slug+': tab has its real associated panel '+target);
 for(const p of s.problems)for(const value of [p.label,...Object.values(p.solution)])assert(html.includes(value.replaceAll('&','&amp;').replaceAll('"','&quot;')),s.slug+': complete supplied issue copy');
 assert.equal(s.faq.length,4);assert.equal(s.workflow.length,4);assert.equal(en[i].problems.length,4);
 for(const id of ['problems','solutions','workflow','gallery','questions'])assert(html.includes(`id="${id}"`));
 assert(html.includes(s.gallery.label));assert(html.includes('service='+s.slug));
 assert(!html.includes('referenceImage=')&&!/src="[^\"]*(?:-full|-detail)\.png/.test(html),'no full-page mockup image');
 for(const [,url] of html.matchAll(/(?:href|src)="(\/[^\"]*)"/g)){
  const pathname=url.split(/[?#]/)[0];const target=path.join(root,pathname.endsWith('/')?pathname+'index.html':pathname);
  assert(fs.existsSync(target),s.slug+': local URL '+url);localLinks++;
 }
}
assert.equal(pack.services.length,12);assert.equal(en.length,12);
console.log(`Service reference contracts passed: 12 original routes, 48 full issue states, all supplied workflows/FAQs, independent assets, unchanged header/footer and ${localLinks} real local references.`);
