const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const business=require('../business.json');

assert.equal(business.telephoneDisplay,'0482 602 558','Approved public telephone');
assert.equal(business.telephoneHref,'tel:+61482602558','Approved telephone link');
assert.equal(business.telephone,'+61 482 602 558','Approved international schema telephone');
assert.equal(business.telephoneHref,'tel:+'+business.telephone.replace(/\D/g,''),'Schema and dial link agree');

const excluded=new Set(['.git','node_modules','assets','docs','reports']);
function walk(directory){
 return fs.readdirSync(directory,{withFileTypes:true}).flatMap(item=>{
  if(item.name.startsWith('.')||excluded.has(item.name))return [];
  const file=path.join(directory,item.name);
  return item.isDirectory()?walk(file):item.name.endsWith('.html')?[file]:[];
 });
}
const files=walk(root);
const pages=files.filter(file=>path.basename(file)==='index.html');
assert.equal(pages.length,42,'Scan every generated page, including all service, sector and area routes');
const staleNumber=/(?:\b0[\s().-]*405[\s().-]*878[\s().-]*406\b|\+?61[\s().-]*405[\s().-]*878[\s().-]*406\b)/i;
let dialLinks=0,organizationNodes=0,structuredTelephoneNodes=0;

function inspectSchema(value,where,counter){
 if(!value||typeof value!=='object')return;
 if(Array.isArray(value)){value.forEach(item=>inspectSchema(item,where,counter));return;}
 const types=Array.isArray(value['@type'])?value['@type']:[value['@type']];
 if(types.includes('Organization')){
  counter.organizations++;
  organizationNodes++;
  assert.equal(value.telephone,business.telephone,'Organization telephone: '+where);
 }
 if(Object.hasOwn(value,'telephone')){
  structuredTelephoneNodes++;
  assert.equal(value.telephone,business.telephone,'Structured telephone: '+where);
 }
 Object.values(value).forEach(item=>inspectSchema(item,where,counter));
}

for(const file of files){
 const relative=path.relative(root,file).replaceAll('\\','/');
 const html=fs.readFileSync(file,'utf8');
 const decoded=html.replace(/&nbsp;|&#160;|&#x0*a0;/gi,' ');
 assert(!staleNumber.test(decoded),'No superseded telephone anywhere in public HTML: '+relative);
 const phones=[...html.matchAll(/\bhref\s*=\s*(["'])(tel:[^"']*)\1/gi)].map(match=>match[2]);
 assert(phones.length>0,'Every public page/fragment has a usable telephone link: '+relative);
 for(const href of phones){
  assert.equal(href,business.telephoneHref,'Telephone link destination: '+relative);
  dialLinks++;
 }
 if(path.basename(file)!=='index.html')continue;
 assert(html.includes(business.telephoneDisplay),'Consistent visible telephone: '+relative);
 const counter={organizations:0};
 for(const [,attributes,json] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)){
  if(!/\btype\s*=\s*["']application\/ld\+json["']/i.test(attributes))continue;
  let data;
  try{data=JSON.parse(json);}catch(error){assert.fail('Valid JSON-LD in '+relative+': '+error.message);}
  inspectSchema(data,relative,counter);
 }
 assert(counter.organizations>0,'Organization schema checked on this page: '+relative);
}
console.log(JSON.stringify({pagesScanned:pages.length,htmlFilesScanned:files.length,dialLinks,organizationNodes,structuredTelephoneNodes,telephone:business.telephoneDisplay,legacyNumbers:0,allTelephoneLinksCorrect:true}));
