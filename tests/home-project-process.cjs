const fs=require('fs'),cp=require('child_process'),assert=require('assert/strict');
const h=fs.readFileSync('index.html','utf8'),b=cp.execFileSync('git',['show','HEAD:index.html'],{encoding:'utf8',maxBuffer:4e6});
const section=(s,id)=>s.match(new RegExp('<section[^>]*id="'+id+'"[^]*?</section>'))[0];
const map=section(h,'location'),oldMap=section(b,'location'),flow=section(h,'contact');
assert(map.includes('墨尔本服务位置'));assert.equal(map.match(/<iframe[^]*?<\/iframe>/)[0],oldMap.match(/<iframe[^]*?<\/iframe>/)[0]);
for(const text of ['459 Collins St, Melbourne VIC 3004, Australia','tel:+61450666876','mailto:melbournecommercialrepairs.au@outlook.com'])assert(map.includes(text));
assert(!map.includes('href="/#contact"'));assert(!flow.includes('data-quote'));assert(flow.includes('<a class="pp-submit" href="/contact/" data-local-page>'));assert.equal((flow.match(/class="pp-note /g)||[]).length,3);
for(const t of ['提交需求','沟通与报价','确认安排','单项维修','多工种项目','定期维护','填写项目需求'])assert(flow.includes(t));
assert(!/Collins|Insurance|<iframe/.test(flow));
assert(flow.includes('ellis · 0450666876'));
assert.equal((flow.match(/href="tel:\+61450666876"/g)||[]).length,1);
assert.equal((flow.match(/href="mailto:melbournecommercialrepairs.au@outlook.com"/g)||[]).length,1);
assert(flow.includes('Monday–Sunday, 9:00 am–9:00 pm'));
// The subsequently approved office-hotspot component has its own scope regression.
const withoutSelector=s=>{const start=s.indexOf('<div class="sector-selection"');if(start<0)return s;const tags=/<\/?div\b[^>]*>/g;tags.lastIndex=start;let depth=0,m;while((m=tags.exec(s))){depth+=m[0].startsWith('</')?-1:1;if(!depth)return s.slice(0,start)+s.slice(tags.lastIndex);}throw new Error('Incomplete property selector');};
const stable=s=>withoutSelector(s.replaceAll('elliservices.group@gmail.com','melbournecommercialrepairs.au@outlook.com').replaceAll('+61 482 602 558','+61 450 666 876').replaceAll('0482 602 558','0450666876').replaceAll('+61482602558','+61450666876').replaceAll('\r\n','\n').replace(/<section[^>]*id="(?:location|contact)"[^]*?<\/section>/g,'').replace(/<link[^>]*href="\/?home-project-process.css[^>]*>/g,'').replace(/<link\b[^>]*href="(?:\/?home-sector-selector\.css|\/?home-commercial-campus\.css|\/?vendor\/ellis-hotspot-kit\/ellis-explorer\.css)[^"]*"[^>]*>|<script\b[^>]*src="(?:\/?home-sector-selector\.js|\/?home-commercial-campus\.js|\/?vendor\/ellis-hotspot-kit\/(?:ellis-explorer|ellis-sectors)\.js)[^"]*"[^>]*><\/script>/g,'').replace(/([.](?:css|js))\?v=[a-f0-9]+/g,'$1'));
assert.equal(stable(h),stable(b));
console.log(JSON.stringify({mapPreserved:true,steps:3,oneProjectCTA:true,referenceContactStrip:true,otherHomepageMarkupPreserved:true}));
