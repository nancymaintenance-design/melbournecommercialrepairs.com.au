/* Native buttons and stable panels; no form or shared navigation ownership. */
(()=>{
 const root=document.querySelector('[data-service-reference]');if(!root)return;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const groups=new Map();root.querySelectorAll('[role=tablist]').forEach(list=>{
  const tabs=[...list.querySelectorAll('[role=tab]')];if(!tabs.length)return;
  const scope=tabs[0].dataset.select;groups.set(scope,{list,tabs});
 });
 function select(scope,index,focus=false){
  const group=groups.get(scope);if(!group||!group.tabs[index])return;
  for(const [i,tab] of group.tabs.entries()){
   const active=i===index;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;
   const panel=document.getElementById(tab.getAttribute('aria-controls'));if(panel){panel.hidden=!active;panel.tabIndex=active?0:-1;panel.classList.toggle('is-selected',active&&!reduce.matches);}
  }
  if(scope==='specialist')root.querySelectorAll('[data-specialist-note]').forEach(note=>note.classList.toggle('is-current',Number(note.dataset.specialistNote)===index));
  if(scope==='specialist')root.querySelectorAll('[data-specialist-scope]').forEach(note=>note.hidden=Number(note.dataset.specialistScope)!==index);
  if(focus)group.tabs[index].focus();
 }
 root.addEventListener('click',e=>{
  const tab=e.target.closest('[data-select]');if(tab){select(tab.dataset.select,Number(tab.dataset.index));return;}
  const step=e.target.closest('[data-specialist-step]');if(step){const group=groups.get('specialist');if(group){const current=group.tabs.findIndex(t=>t.getAttribute('aria-selected')==='true');select('specialist',(current+Number(step.dataset.specialistStep)+group.tabs.length)%group.tabs.length);root.querySelector('.su-craft-panels [role=tabpanel]:not([hidden]) [data-specialist-step="'+step.dataset.specialistStep+'"]').focus()}return;}
  const thumb=e.target.closest('[data-gallery-jump]');if(thumb)select('gallery',Number(thumb.dataset.galleryJump));
  const stage=e.target.closest('[data-stage-card]');if(stage)root.querySelectorAll('[data-stage-card]').forEach(b=>b.setAttribute('aria-pressed',String(b===stage)));
 });
 root.addEventListener('keydown',e=>{
  const tab=e.target.closest('[role=tab]');if(!tab)return;const group=groups.get(tab.dataset.select);let i=group.tabs.indexOf(tab);
  if(['ArrowRight','ArrowDown'].includes(e.key))i=(i+1)%group.tabs.length;
  else if(['ArrowLeft','ArrowUp'].includes(e.key))i=(i-1+group.tabs.length)%group.tabs.length;
  else if(e.key==='Home')i=0;else if(e.key==='End')i=group.tabs.length-1;else return;
  e.preventDefault();select(tab.dataset.select,i,true);
 });
 root.querySelectorAll('.su-comparison input').forEach(input=>input.addEventListener('input',()=>input.closest('.su-comparison').style.setProperty('--split',input.value+'%')));
 const setActive=id=>root.querySelectorAll('.su-section-nav a').forEach(a=>{const active=a.hash==='#'+id;a.classList.toggle('is-active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});
 setActive('problems');
 if('IntersectionObserver' in window){
  const entries=new IntersectionObserver(items=>items.forEach(({target,isIntersecting})=>{if(isIntersecting){if(!reduce.matches)target.classList.add('su-entered');entries.unobserve(target)}}),{threshold:.08});
  root.querySelectorAll('[data-su-reveal]').forEach(n=>entries.observe(n));
  const hero=new IntersectionObserver(items=>items.forEach(e=>e.target.classList.toggle('is-in-view',e.isIntersecting)));root.querySelectorAll('[data-su-float]').forEach(n=>hero.observe(n));
  const nav=new IntersectionObserver(items=>{const visible=items.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);if(visible[0])setActive(visible[0].target.id)},{rootMargin:'-100px 0px -45% 0px',threshold:[0,.2,.5]});
  for(const id of ['problems','solutions','workflow','gallery','questions']){const node=document.getElementById(id);if(node)nav.observe(node)}
 }
 document.addEventListener('visibilitychange',()=>root.classList.toggle('su-motion-paused',document.hidden));
})();
