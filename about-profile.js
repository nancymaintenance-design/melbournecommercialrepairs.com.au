/* Local decorative motion: company copy, Logo and insurance amount stay stable. */
(() => {
 const page=document.querySelector('[data-about-profile]');
 if(!page)return;
 const media=matchMedia('(prefers-reduced-motion: reduce)');
 let frame=0;
 const card=page.querySelector('.ap-intro-card');
 const smallScreen=matchMedia('(max-width:760px)');
 const extra=page.querySelector('.ap-secondary-info');
 const intro=page.querySelector('.ap-intro-inner');
 const serviceGroups=page.querySelector('.ap-service-groups');
 const registrationSummary=page.querySelector('.ap-registration-summary');
 function arrangeInfo(){
  const target=smallScreen.matches?extra:intro;
  target.append(serviceGroups,registrationSummary);
 }
 smallScreen.addEventListener('change',arrangeInfo);arrangeInfo();
 function clear(){
  cancelAnimationFrame(frame);frame=0;
  card?.style.removeProperty('--ap-parallax');
  document.body.classList.remove('ap-motion-on');
 }
 function configure(){
  clear();
  if(media.matches)return;
  document.body.classList.add('ap-motion-on');
 }
 function update(){
  frame=0;
  if(media.matches||!card)return;
  const rect=page.getBoundingClientRect();
  card.style.setProperty('--ap-parallax',Math.max(-5,Math.min(5,-rect.top*.018))+'px');
 }
 window.addEventListener('scroll',()=>{if(!media.matches&&!frame)frame=requestAnimationFrame(update)},{passive:true});
 media.addEventListener('change',configure);
 configure();

 // The registration body stays in normal flow. Only its visual face tilts.
 const identity=page.querySelector('[data-company-identity]');
 const visual=identity?.querySelector('[data-identity-visual]');
 const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
 let tiltFrame=0,tiltX=0,tiltY=0;
 function resetTilt(){
  cancelAnimationFrame(tiltFrame);tiltFrame=0;
  visual?.style.removeProperty('--ai-tilt-x');
  visual?.style.removeProperty('--ai-tilt-y');
 }
 visual?.addEventListener('pointermove',event=>{
  if(media.matches||!finePointer.matches||event.pointerType==='touch')return;
  const bounds=visual.getBoundingClientRect();
  tiltX=-(event.clientY-bounds.top-bounds.height/2)/bounds.height*3;
  tiltY=(event.clientX-bounds.left-bounds.width/2)/bounds.width*3;
  if(!tiltFrame)tiltFrame=requestAnimationFrame(()=>{
   tiltFrame=0;
   visual.style.setProperty('--ai-tilt-x',tiltX.toFixed(2)+'deg');
   visual.style.setProperty('--ai-tilt-y',tiltY.toFixed(2)+'deg');
  });
 });
 visual?.addEventListener('pointerleave',resetTilt);
 media.addEventListener('change',resetTilt);
 finePointer.addEventListener('change',resetTilt);
 if(identity&&window.IntersectionObserver){
  new IntersectionObserver(entries=>entries.forEach(entry=>{
   identity.classList.toggle('ai-offscreen',!entry.isIntersecting);
   if(!entry.isIntersecting)resetTilt();
  })).observe(identity);
 }
 document.addEventListener('visibilitychange',()=>{
  identity?.classList.toggle('ai-document-hidden',document.hidden);
  if(document.hidden)resetTilt();
 });
})();
