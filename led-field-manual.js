(() => {
 const manual = document.querySelector('.led-manual');
 if (!manual) return;

 const controls = manual.querySelector('.led-diagnosis-controls');
 const scene = manual.querySelector('.led-scene-diagnosis');
 const scenes = [...scene.querySelectorAll('[data-field-scene]')];
 const statuses = [...manual.querySelectorAll('[data-led-status]')];
 const evidenceRows = [...manual.querySelectorAll('[data-led-row]')];

 function showDiagnosis(value) {
  scene.dataset.ledScene = value;
  for (const panel of scenes) panel.hidden = panel.dataset.fieldScene !== value;
  for (const panel of statuses) panel.hidden = panel.dataset.ledStatus !== value;
  for (const row of evidenceRows) {
   if (row.dataset.ledRow === value) row.setAttribute('aria-current','true');
   else row.removeAttribute('aria-current');
  }
 }
 controls.addEventListener('change',event=>{
  if (event.target.matches('input[name="led-diagnosis"]:checked')) showDiagnosis(event.target.value);
 });
 showDiagnosis(controls.querySelector(':checked').value);
 controls.hidden = false;

 const header = document.querySelector('.site-header');
 const bar = manual.querySelector('[data-led-chapters]');
 const toggle = bar.querySelector('.led-chapters-toggle');
 const links = [...bar.querySelectorAll('a[href^="#tn-"]')];
 const sections = links.map(link=>document.getElementById(link.hash.slice(1)));
 const current = [...bar.querySelectorAll('[data-led-current]')];
 const reading = manual.querySelector('.led-reading');
 const mobile = matchMedia('(max-width:760px)');
 let frame = 0;
 let activeIndex = -1;
 let stickyEdge = 0;

 function markChapter(index) {
  if (index === activeIndex) return;
  if (activeIndex >= 0) {
   links[activeIndex].removeAttribute('aria-current');
   current[activeIndex].hidden = true;
  }
  links[index].setAttribute('aria-current','location');
  current[index].hidden = false;
  activeIndex = index;
 }
 function updatePosition() {
  frame = 0;
  let index = 0;
  for (let i=1;i<sections.length;i++) {
   if (sections[i].getBoundingClientRect().top > stickyEdge + 20) break;
   index=i;
  }
  markChapter(index);
  const rect = reading.getBoundingClientRect();
  const range = Math.max(1,rect.height - innerHeight + stickyEdge);
  const fill = Math.max(0,Math.min(1,(stickyEdge - rect.top) / range));
  bar.style.setProperty('--led-progress',fill.toFixed(4));
 }
 function schedulePosition() {
  if (frame===0) frame=requestAnimationFrame(updatePosition);
 }
 function measureHeader() {
  const headerBottom = Math.ceil(header.getBoundingClientRect().bottom);
  manual.style.setProperty('--led-header',headerBottom+'px');
  stickyEdge = headerBottom + Math.ceil(bar.getBoundingClientRect().height);
  const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingBlockStart) || 0;
  manual.style.setProperty('--led-anchor-gap',Math.max(0,stickyEdge + 13 - padding)+'px');
  schedulePosition();
 }
 function setMenu(open) {
  toggle.setAttribute('aria-expanded',String(open));
  measureHeader();
 }
 manual.classList.add('led-ready');
 toggle.hidden = false;
 toggle.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
 bar.addEventListener('keydown',event=>{
  if(event.key==='Escape' && mobile.matches && toggle.getAttribute('aria-expanded')==='true'){
   toggle.focus();
   setMenu(false);
  }
 });
 for (const [index,link] of links.entries()) {
  link.addEventListener('click',()=>{
   if (mobile.matches) setMenu(false);
   sections[index].focus({preventScroll:true});
  });
 }
 mobile.addEventListener('change',()=>setMenu(false));
 window.addEventListener('scroll',schedulePosition,{passive:true});
 window.addEventListener('resize',measureHeader,{passive:true});
 if ('ResizeObserver' in window) {
  const resize = new ResizeObserver(measureHeader);
  resize.observe(header);
  resize.observe(bar);
 }
 measureHeader();
})();
