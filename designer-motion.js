/* Scroll input changes each independent layer; native flow remains untouched. */
(()=>{
 const reduce=matchMedia('(prefers-reduced-motion: reduce)'),scenes=[...document.querySelectorAll('[data-scroll-visual]')];
 const meter=document.querySelector('.detail-journey-meter');let pending=false;
 function render(){pending=false;const vh=innerHeight;for(const node of scenes){const box=node.getBoundingClientRect();const p=reduce.matches?1:Math.max(0,Math.min(1,node.classList.contains('reference-hero')?-box.top/Math.max(1,box.height*.55):(vh-box.top)/(vh+box.height*.25)));node.style.setProperty('--visual-p',p.toFixed(4));node.classList.toggle('is-in-view',box.bottom>0&&box.top<vh)}if(meter)meter.style.setProperty('--read-progress',String(scrollY/Math.max(1,document.documentElement.scrollHeight-vh)));}
 const schedule=()=>{if(!pending){pending=true;requestAnimationFrame(render)}};addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});reduce.addEventListener('change',schedule);document.addEventListener('visibilitychange',()=>{scenes.forEach(n=>n.classList.toggle('is-in-view',!document.hidden));schedule()});render();
 document.querySelectorAll('[data-pointer-scene]').forEach(node=>{node.addEventListener('pointermove',event=>{if(reduce.matches||!matchMedia('(pointer:fine)').matches)return;const r=node.getBoundingClientRect();node.style.setProperty('--pointer-x',((event.clientX-r.left)/r.width-.5)*8+'px')});node.addEventListener('pointerleave',()=>node.style.setProperty('--pointer-x','0px'))});
})();
