/* Native scrolling and links; effects respond to visibility, input and motion preference. */
(()=>{
 const media=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(pointer:fine)'),all=s=>[...document.querySelectorAll(s)];
 let frame=0;const updates=new Map();
 const flush=()=>{frame=0;for(const [node,values]of updates){for(const [key,value]of Object.entries(values))node.style.setProperty(key,value)}updates.clear();};
 const set=(node,values)=>{updates.set(node,{...updates.get(node),...values});if(!frame)frame=requestAnimationFrame(flush)};
 all('[data-pointer-scene],.topic-section,.detail-links>a').forEach(node=>{
  node.addEventListener('pointermove',event=>{if(media.matches||!fine.matches)return;const r=node.getBoundingClientRect(),x=(event.clientX-r.left)/r.width-.5,y=(event.clientY-r.top)/r.height-.5;set(node,{'--pointer-x':x*18+'px','--pointer-y':y*14+'px','--tilt-x':-y*5+'deg','--tilt-y':x*7+'deg'});});
  node.addEventListener('pointerleave',()=>set(node,{'--pointer-x':'0px','--pointer-y':'0px','--tilt-x':'0deg','--tilt-y':'0deg'}));
 });
 all('.designer-explore,.topic-cta .button').forEach(node=>{
  node.addEventListener('pointermove',event=>{if(media.matches||!fine.matches)return;const r=node.getBoundingClientRect();set(node,{'--magnet-x':(event.clientX-r.left-r.width/2)*.12+'px','--magnet-y':(event.clientY-r.top-r.height/2)*.12+'px'});});
  node.addEventListener('pointerleave',()=>set(node,{'--magnet-x':'0px','--magnet-y':'0px'}));
 });
 const meter=document.querySelector('.detail-journey-meter');
 const progress=()=>{if(!meter)return;const range=document.documentElement.scrollHeight-innerHeight;set(meter,{'--read-progress':String(range>0?Math.min(1,scrollY/range):0)});};
 addEventListener('scroll',progress,{passive:true});addEventListener('resize',progress,{passive:true});progress();
 const ambient=all('.designer-hero,.location-copy,.location-map');
 if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('fx-visible',e.isIntersecting)),{rootMargin:'60px'});ambient.forEach(n=>observer.observe(n));}
 const reset=()=>{if(media.matches)all('[data-pointer-scene],.topic-section,.detail-links>a').forEach(n=>set(n,{'--pointer-x':'0px','--pointer-y':'0px','--tilt-x':'0deg','--tilt-y':'0deg'}));};media.addEventListener('change',reset);
})();
