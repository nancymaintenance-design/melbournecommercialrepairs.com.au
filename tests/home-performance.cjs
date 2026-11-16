const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function deferred(){let resolve,reject;const promise=new Promise((a,b)=>{resolve=a;reject=b});return{promise,resolve,reject}}
const flush=async()=>{for(let i=0;i<8;i++)await Promise.resolve()};
function scene(){
 let writes=0;const style=()=>new Proxy({setProperty(k,v){writes++;this[k]=v}},{set(o,k,v){if(k!=='setProperty')writes++;o[k]=v;return true}});
 const pending=Array.from({length:4},deferred),images=pending.map((job,i)=>({complete:true,naturalWidth:1536,style:style(),addEventListener(){},removeEventListener(){},decodeCalls:0,decode(){this.decodeCalls++;return job.promise}}));
 const animations=[],camera={style:style(),insertAdjacentHTML(){},animate(frames,options){const done=deferred(),a={frames,options,finished:done.promise,finish:done.resolve,cancel(){done.reject(new Error('cancelled'))}};animations.push(a);return a}};
 const callout={textContent:'',remove(){}},unavailable={hidden:false},host={dataset:{},querySelectorAll:()=>images,querySelector:s=>s==='.building-camera'?camera:s==='.arch-callout'?callout:s==='.visual-unavailable'?unavailable:{remove(){}}};
 const document={hidden:false,documentElement:{lang:'zh-CN'},addEventListener(){},removeEventListener(){}};const window={};vm.runInNewContext(fs.readFileSync('scene-visual.js','utf8'),{window,document,console,Set,Map,Promise});
 return{api:window.createEllisScene(host),pending,images,animations,host,camera,unavailable,get writes(){return writes}};
}
test('a scene image is decoded before it can replace the current artwork',async()=>{
 const s=scene();s.pending[0].resolve();await flush();s.api.setView('building');await flush();
 assert.equal(s.images[1].decodeCalls,1,'the next artwork is explicitly decoded once');
 assert.equal(s.host.dataset.visualState,'0');assert.equal(s.animations.length,0,'keep the decoded old picture while the next image is pending');
 s.pending[1].resolve();await flush();assert.equal(s.animations.length,1);assert.equal(s.animations[0].options.duration,140);
 s.animations[0].finish();await flush();assert.equal(s.host.dataset.visualState,'1');assert.equal(s.animations[1].options.duration,220);
 s.animations[1].finish();await flush();s.api.destroy();
});
test('one timeline frame is idempotent instead of rewriting the camera repeatedly',async()=>{
 const s=scene();s.pending.forEach(p=>p.resolve());await flush();
 assert.equal(typeof s.api.setFrame,'function','the motion owner can deliver a complete frame atomically');
 s.api.setFrame({view:'all',exploded:false,paused:false,progress:.08});const before=s.writes;
 for(let i=0;i<20;i++)s.api.setFrame({view:'all',exploded:false,paused:false,progress:.08});
 assert.equal(s.writes,before,'unchanged frames must not cause DOM writes');s.api.destroy();
});
test('rapid reversal retargets the existing handoff without an animation queue',async()=>{
 const s=scene();s.pending.forEach(p=>p.resolve());await flush();s.api.setView('building');s.api.setView('systems');s.api.setView('all');
 assert.equal(s.animations.length,1);s.animations[0].finish();await flush();assert.equal(s.host.dataset.visualState,'0');
 s.animations[1].finish();await flush();assert.equal(s.animations.length,2,'only the original exit and entry remain');s.api.destroy();
});
test('destroyed scenes ignore delayed image decoding',async()=>{
 const s=scene();s.api.destroy();const before=s.writes;s.pending.forEach(p=>p.resolve());await flush();assert.equal(s.writes,before);
});
test('settled service cards do not rewrite styles or reread pin height on every scroll',()=>{
 let writes=0,heightReads=0;const frames=[],listeners={};
 const style=()=>new Proxy({setProperty(){writes++}},{set(o,k,v){writes++;o[k]=v;return true}});
 const classes={add(){},toggle(){}};
 const cards=[0,1,2].map(i=>({offsetLeft:i*200,offsetTop:i*100,offsetWidth:200,offsetHeight:250,style:style()}));
 const grid={getBoundingClientRect:()=>({width:900}),querySelectorAll:()=>cards};
 const pin={get offsetHeight(){heightReads++;return 600}};
 const section={dataset:{},style:style(),classList:classes,getBoundingClientRect:()=>({top:-4000}),querySelector:q=>q==='.showcase-grid'?grid:pin};
 const ctx={document:{readyState:'complete',hidden:false,body:{classList:{contains:()=>false}},documentElement:{},querySelector:()=>section,addEventListener(){}},innerHeight:1000,scrollY:5000,matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener:(type,fn)=>listeners[type]=fn,requestAnimationFrame:fn=>{frames.push(fn);return frames.length},cancelAnimationFrame(){},ResizeObserver:class{observe(){}},MutationObserver:class{observe(){}},IntersectionObserver:class{observe(){}}};
 vm.runInNewContext(fs.readFileSync('service-showcase.js','utf8'),ctx);
 const run=()=>{const fn=frames.shift();if(fn)fn()};run();const before=writes,reads=heightReads;
 for(let i=0;i<30;i++){listeners.scroll();run()}
 assert.equal(writes,before,'a finished/offscreen directory remains visually identical without repeated writes');
 assert.equal(heightReads,reads,'height is measured only when layout is invalidated');
});
function motion(){
 const frames=[],events={},documentEvents={},scrolls=[];let now=1000;
 const node=(extra={})=>Object.assign({nodeType:1,dataset:{},style:{getPropertyValue(){return''},setProperty(){}},classList:{add(){},remove(){},toggle(){},contains(){return false}},matches:()=>false,querySelectorAll:()=>[],setAttribute(){},getAttribute(){return null},removeAttribute(){}},extra);
 let ctx;const pin=node({offsetHeight:918}),story=node({offsetTop:82,getBoundingClientRect:()=>({top:82-ctx.scrollY,bottom:5082-ctx.scrollY,height:5000}),querySelector:s=>s==='.care-pin'?pin:null});
 const services=node({getBoundingClientRect:()=>({top:5082-ctx.scrollY})});
 const root=node({scrollHeight:10000,clientHeight:1000,lang:'zh-CN'}),body=node({scrollHeight:10000});
 const document={readyState:'complete',hidden:false,documentElement:root,body,querySelector:s=>s==='#home'?story:s==='.site-header'?{getBoundingClientRect:()=>({height:82})}:null,querySelectorAll:()=>[],getElementById:id=>id==='services'?services:null,addEventListener:(type,fn)=>documentEvents[type]=fn,removeEventListener(){}};
 class Element{closest(selector){return selector==='a[href]'?this:null}}
 const observer=class{observe(){}unobserve(){}disconnect(){}};
 ctx=vm.createContext({document,Element,URL,location:{href:'https://example.test/?lang=zh',origin:'https://example.test',pathname:'/'},history:{pushState(){}},innerWidth:1600,innerHeight:1000,scrollY:0,matchMedia:()=>({matches:false,addEventListener(){}}),performance:{now:()=>now},addEventListener:(type,fn)=>events[type]=fn,removeEventListener(){},requestAnimationFrame:fn=>{frames.push(fn);return frames.length},cancelAnimationFrame(){},IntersectionObserver:observer,MutationObserver:observer,ResizeObserver:observer,scrollTo:options=>{scrolls.push(options);if(options.behavior==='instant')ctx.scrollY=options.top}});ctx.window=ctx;
 vm.runInContext(fs.readFileSync('motion.js','utf8'),ctx);while(frames.length)frames.shift()();
 return{ctx,events,documentEvents,scrolls,Element,wheel(delta){now+=20;events.wheel({deltaY:delta,deltaX:0,deltaMode:0,preventDefault(){}})}};
}
test('reversing a wheel gesture starts from the visible scroll position, not the old target',()=>{
 const s=motion();for(let i=0;i<14;i++)s.wheel(100);s.ctx.scrollY=4082*.4;const current=s.ctx.scrollY;s.wheel(-100);
 assert(s.scrolls.at(-1).top<current,'the first reverse input must move back immediately');
});
test('Explore services bypasses the pinned story and lands at the services heading',()=>{
 const s=motion(),anchor=new s.Element();anchor.href='https://example.test/?lang=zh#services';anchor.target='';let prevented=false;
 s.documentEvents.click({target:anchor,button:0,preventDefault(){prevented=true}});
 assert(prevented);assert.equal(s.scrolls.at(-1).top,5000);assert.equal(s.scrolls.at(-1).behavior,'instant');
});
