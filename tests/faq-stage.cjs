const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),data=require('../content/faq-content.json');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const html=read('faq/index.html'),main=html.match(/<main\b[\s\S]*?<\/main>/)[0];
const source=read('content/faq-source.md');
const rows=[...source.matchAll(/^### Q(\d+)\. (.+?) \/ (.+)\r?\n\s*\*\*EN:\*\* ([\s\S]*?)\r?\n\s*\*\*中文：\*\* ([\s\S]*?)(?=^### |^## |$(?![\s\S]))/gm)];
const questions=data.topics.flatMap(t=>t.questions),expected=[7,6,8,6,6,5,6,5,6,6,5,4,7];
assert.deepEqual(data.topics.map(t=>t.questions.length),expected);
assert.equal(questions.length,77);assert.equal(rows.length,77);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
for(const [i,q] of questions.entries()){
 const row=rows[i];assert.equal(q.id,'q'+String(i+1).padStart(2,'0'));
 assert.deepEqual([q.question.en,q.question.zh,q.answer.en,q.answer.zh],row.slice(2).map(x=>x.trim()),'Exact bilingual source preserved: '+q.id);
 assert.equal((main.match(new RegExp('id="'+q.id+'"','g'))||[]).length,1,'One stable question anchor '+q.id);
 const article=main.match(new RegExp('<article[^>]*id="'+q.id+'"[\\s\\S]*?</article>'))[0];
 for(const text of [q.question.zh,q.question.en,q.answer.zh,q.answer.en])assert(article.includes(esc(text)),q.id+' complete original text in initial HTML');
 assert(!/^<article[^>]*\bhidden/.test(article),'No-JS answer readable');
}
assert.equal((main.match(/<h1\b/g)||[]).length,1);assert(!main.includes('<details'));
assert.equal((main.match(/data-faq-topic=/g)||[]).length,14);
for(const id of ['q08','q14','q06','q19'])assert(main.includes('data-faq-jump="'+id+'"'));
assert.equal((main.match(/data-faq-copy=/g)||[]).length,77);
for(const [attr,url] of [...main.matchAll(/(src|href)="(\/[^"#?]+)(?:[?#][^"]*)?"/g)].map(m=>[m[1],m[2]])){
 const target=path.join(root,url,url.endsWith('/')?'index.html':'');assert(fs.existsSync(target),attr+' valid: '+url);
}
assert.equal(html.match(/<header class="site-header"[\s\S]*?<\/header>/)[0],read('about/index.html').match(/<header class="site-header"[\s\S]*?<\/header>/)[0]);
assert.equal(html.match(/<footer\b[\s\S]*?<\/footer>/)[0],read('index.html').match(/<footer\b[\s\S]*?<\/footer>/)[0]);
const vm=require('node:vm'),handlers={},search={value:'roof',addEventListener:(name,fn)=>{handlers[name]=fn;}},calls=[];
const ime=read('faq-stage.js').match(/ search.addEventListener\('compositionstart'[\s\S]*?(?=\n clear.addEventListener)/)[0];
const context={search,render:()=>calls.push('render')};
vm.runInNewContext("let composing=false,query='',topic='scope';"+ime+';globalThis.state=()=>({composing,query,topic});',context);
handlers.compositionstart();handlers.input({isComposing:true});assert.equal(calls.length,0);
let prevented=false;handlers.keydown({key:'Enter',isComposing:true,preventDefault(){prevented=true;}});assert(prevented);
handlers.compositionend();assert.equal(calls.length,1);assert.equal(context.state().query,'roof');assert.equal(context.state().topic,'all');
console.log('IME composition handlers passed: no filter while composing; Enter does not submit; completion applies one global search.');
console.log('FAQ source and HTML contracts passed: 13 topics,77 unique QIDs,154 complete original language answers,14 categories,4 quick links,77 copy buttons,real URLs,original header/footer,no accordion.');
// Exercise the real click handler with clipboard permission failure, rather
// than relying on a browser's clipboard being available in every context.
(async()=>{
 const body=read('faq-stage.js').match(/root.addEventListener\('click',async event=>\{([\s\S]*?)\n \}\);/)[1];
 const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
 const feedback={textContent:''},input={value:'',focus(){this.focused=true;},select(){this.selected=true;}},fallback={hidden:true,querySelector:()=>input};
 const area={querySelector:s=>s==='.faq-copy-feedback'?feedback:fallback};
 const button={dataset:{faqCopy:'q41'},closest:()=>area},event={target:{closest:()=>button}};
 const handler=new AsyncFunction('event','byId','lang','copyTimers','tr','location','navigator',body);
 await handler(event,new Map([['q41',{topic:'plumbing'}]]),()=>'en',new Map(),(zh,en)=>en,{origin:'http://127.0.0.1:8767'},{clipboard:{writeText:async()=>{throw Error('Permission denied');}}});
 assert.equal(fallback.hidden,false);assert(input.focused&&input.selected);assert.equal(input.value,'http://127.0.0.1:8767/faq/?lang=en&topic=plumbing#q41');
 console.log('Clipboard denial fallback passed: complete selectable link, focused input, stable language/QID.');
})();
