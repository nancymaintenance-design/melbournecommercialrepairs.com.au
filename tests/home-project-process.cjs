const fs=require('fs'),cp=require('child_process'),assert=require('assert/strict');
const h=fs.readFileSync('index.html','utf8'),b=cp.execFileSync('git',['show','HEAD:index.html'],{encoding:'utf8',maxBuffer:4e6});
const section=(s,id)=>s.match(new RegExp('<section[^>]*id="'+id+'"[^]*?</section>'))[0];
const map=section(h,'location'),oldMap=section(b,'location'),flow=section(h,'contact');
const mapEmbed=source=>source.match(/<iframe\b[^>]+\bsrc="([^"]+)"/)[1];
assert(map.includes('墨尔本服务位置'));assert.equal(mapEmbed(map),mapEmbed(oldMap));
for(const text of ['459 Collins Street, Melbourne, VIC 3000','tel:+61450666876','mailto:melbournecommercialrepairs.au@outlook.com'])assert(map.includes(text));
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
const withoutMetadata=html=>html.replace(/<!-- home-locales:start -->[\s\S]*?<!-- home-locales:end -->/g,'')
 .replace(/<head>[\s\S]*?<\/head>/,head=>head
 .replace(/<script type="application\/ld\+json"(?: data-ellis-discovery)?>[\s\S]*?<\/script>/g,'')
 .replace(/<link rel="alternate" type="application\/(?:rss\+xml|feed\+json)"[^>]*>/g,'')
 .replace(/>\s+</g,'><'));
const withoutRevisedCopy=html=>html
 .replace(/<p class="visual-unavailable"[^>]*>[\s\S]*?<\/p>/g,'')
 .replace(/^[ 	]*<dialog id="quote-dialog"[^>]*>[\s\S]*?<\/dialog>\r?\n/gm,'')
 .replace(/<p class="(?:story-description|nm-intro)"[^>]*>[^<]*<\/p>/g,match=>match.replace(/ data-(?:zh|en)="[^"]*"|>[^<]*<\/p>/g,value=>value.startsWith('>')?'></p>':''))
 .replace(/<h3\b[^>]*\bid="nm-title-\d+"[^>]*>[^<]*<\/h3>/g,match=>match.replace(/ data-(?:zh|en)="[^"]*"|>[^<]*<\/h3>/g,value=>value.startsWith('>')?'></h3>':''))
 .replace(/<span\b[^>]*\bclass="nm-note"[^>]*>[^<]*<\/span>/g,'<span class="nm-note"></span>')
 .replace(/(<div class="hf-answer-copy">\s*<h3[^>]*>[^<]*<\/h3>)<p[^>]*>[^<]*<\/p>/g,'$1<p></p>')
 .replace(/<p data-zh="草稿仅在当前页面生成[^>]*>[^<]*<\/p>/g,'')
 .replace(/^[ \t]*<noscript><p class="section">当前为静态阅读模式[^<]*<\/p><\/noscript>\r?\n/m,'')
 .replace(/\sdata-(?:(?:[\w-]+-)?en|aria-label-zh)="[^"]*"/g,'')
 .replace(/\s+(?=<\/main>)/g,'\n');
assert.doesNotMatch(h,/id="quote-(?:dialog|form)"|生成咨询草稿|CREATE ENQUIRY DRAFT/);
assert.equal(stable(withoutRevisedCopy(withoutMetadata(h))),stable(withoutRevisedCopy(withoutMetadata(b))));
console.log(JSON.stringify({mapPreserved:true,steps:3,oneProjectCTA:true,referenceContactStrip:true,otherHomepageMarkupPreserved:true}));
