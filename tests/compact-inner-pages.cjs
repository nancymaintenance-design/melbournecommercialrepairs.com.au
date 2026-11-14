const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8').replaceAll('\r\n','\n');
const old=p=>cp.execFileSync('git',['show','ce18882:'+p],{cwd:root,encoding:'utf8',maxBuffer:4e6});
const app=read('app.js');
const data=vm.runInNewContext(app.slice(app.indexOf('  const services ='),app.indexOf('  function renderServices()'))+';({articles,faqs})');
const escape=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const routes=['insights','faq','about'];
for(const route of routes){
 const h=read(route+'/index.html'),b=old(route+'/index.html');
 assert.equal((h.match(/<h1\b/g)||[]).length,1,route+' has one H1');
 assert.equal(h.match(/id="page-meta">(.*?)<\/script>/)[1],b.match(/id="page-meta">(.*?)<\/script>/)[1],route+' preserves bilingual SEO metadata');
 assert(!h.includes('class="reference-hero'),route+' has no duplicate opening building hero');
 assert(!h.includes('data-scroll-visual'),route+' has no pinned model opening');
 assert.equal((h.match(/id="main-nav"/g)||[]).length,1,'One original navigation');
 for(const [,href]of h.matchAll(/href="(\/[^"#]*)/g)){
  const u=decodeURI(href.split('?')[0]);assert(fs.existsSync(path.join(root,u,u.endsWith('/')?'index.html':'')),'Real link: '+href);
 }
}
const news=read('insights/index.html');
for(const [i,a]of data.articles.entries()){
 for(const t of [a.zh,a.en])assert(news.includes(escape(t)),'Original full article title: '+t);
 const slug=['maintenance-plan','facade-cleaning','signage-make-good'][i];
 assert(news.includes('/insights/'+slug+'/'),'Original article URL: '+slug);
}
const faq=read('faq/index.html');
for(const row of data.faqs)for(const text of row)assert(faq.includes(escape(text)),'Original FAQ content: '+text);
assert(/<details\b[^>]*\bopen\b/.test(faq),'A full answer is open without JavaScript');
assert(/type="search"/.test(faq),'Real search input');
const about=read('about/index.html'),business=require('../business.json');
for(const text of [business.legalName,business.abn,business.acn,business.registeredRegion,business.registerUrl,'$20M','Public Liability Insurance','2000万澳币公众责任险'])assert(about.includes(escape(text)),'Verified about detail: '+text);
assert(about.includes('/assets/ellis-services-logo.png'),'Original supplied logo');
// The generator refreshes content hashes; CRLF/LF can also vary by checkout.
// Neither changes the protected page's markup, content or referenced files.
const stable=h=>h.replaceAll('\r\n','\n').replace(/([.](?:css|js))\?v=[a-f0-9]+/g,'$1');
assert(stable(read('index.html'))===stable(old('index.html')),'Homepage markup and content remain unchanged');
for(const route of ['contact','services','sectors','areas/melbourne','insights/maintenance-plan','insights/facade-cleaning','insights/signage-make-good'])assert(stable(read(route+'/index.html'))===stable(old(route+'/index.html')),'Outside-scope page unchanged: '+route);
console.log(JSON.stringify({compactPages:3,singleH1:true,metadataPreserved:true,articleTitlesAndRoutes:3,originalFAQs:data.faqs.length,originalLogoAndRegistration:true,insuranceDOM:true,homepageAndOtherModulesPreserved:true}));
