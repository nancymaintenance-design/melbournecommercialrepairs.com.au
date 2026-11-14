// One small controller; the service links are usable before any animation.
(()=>{
  const root=document.querySelector('[data-service-directory]');if(!root||root.dataset.directoryMounted)return;root.dataset.directoryMounted='1';
  const tabs=[...root.querySelectorAll('[data-directory-group]')],cards=[...root.querySelectorAll('[data-directory-card]')],reduce=matchMedia('(prefers-reduced-motion: reduce)');let frame=0,pointer=0;
  function select(index){root.dataset.activeGroup=String(index);tabs.forEach((tab,i)=>tab.setAttribute('aria-pressed',String(i===index)));cards.forEach((card,i)=>card.classList.toggle('is-front',i===index));root.querySelector('[data-directory-phase]').textContent=String(index+1).padStart(2,'0');root.querySelectorAll('[data-service-group]').forEach(a=>a.classList.toggle('in-active-group',Number(a.dataset.serviceGroup)===index));}
  tabs.forEach((tab,index)=>tab.addEventListener('click',()=>select(index)));
  tabs.forEach((tab,index)=>tab.addEventListener('keydown',event=>{if(event.key!=='ArrowLeft'&&event.key!=='ArrowRight')return;event.preventDefault();const next=(index+(event.key==='ArrowRight'?1:2))%3;select(next);tabs[next].focus();}));
  function render(){frame=0;const box=root.getBoundingClientRect(),visible=!document.hidden&&box.bottom>0&&box.top<innerHeight;root.classList.toggle('directory-is-visible',visible&&!reduce.matches);root.style.setProperty('--directory-scroll',reduce.matches?'0':Math.max(0,Math.min(1,-box.top/Math.max(1,box.height))).toFixed(4));root.style.setProperty('--directory-pointer',reduce.matches?'0px':pointer+'px');}
  function schedule(){if(!frame)frame=requestAnimationFrame(render)}
  root.querySelector('.directory-theatre').addEventListener('pointermove',event=>{if(!matchMedia('(pointer:fine)').matches)return;const box=event.currentTarget.getBoundingClientRect();pointer=((event.clientX-box.left)/box.width-.5)*8;schedule()});
  root.addEventListener('pointerleave',()=>{pointer=0;schedule()});addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});document.addEventListener('visibilitychange',schedule);reduce.addEventListener('change',schedule);render();
})();
