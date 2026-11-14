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
})();
