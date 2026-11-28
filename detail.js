(() => {
 const $=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];
 const localeUI=window.EllisLocaleUI;
 let language=localeUI.urlLanguage();
 const metadata=JSON.parse($('#page-meta')?.textContent||'{}');
 function apply(){
  document.documentElement.lang=language==='en'?'en':'zh-CN';
  all('[data-zh][data-en]').forEach(n=>{const copy=n.dataset[language].replace(/\\n/g,'\n');if(n.textContent!==copy)n.textContent=copy;});
  all('a[href^="/"]:not([data-language-switch])').forEach(a=>{const u=localeUI.localizeUrl(new URL(a.href),language);a.href=u.pathname+u.search+u.hash});
  $('.lang-en').classList.toggle('active',language==='en');$('.lang-zh').classList.toggle('active',language==='zh');
  $('#language-switch').setAttribute('aria-label',language==='en'?'切换到中文':'Switch to English');
  $('#main-nav').setAttribute('aria-label',language==='en'?'Main navigation':'主导航');
  const currentPath=metadata.route?.startsWith('/services/')?'/services/':metadata.route?.startsWith('/sectors/')?'/sectors/':metadata.route?.startsWith('/areas/')?'/areas/melbourne/':metadata.route?.startsWith('/insights/')?'/insights/':metadata.route;
  all('#main-nav a').forEach(a=>{const current=new URL(a.href).pathname===currentPath;a.classList.toggle('active',current);if(current)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  $('.topic-toc')?.setAttribute('aria-label',language==='en'?'On this page':'本页内容');
  $('#year').textContent=new Date().getFullYear();
  window.EllisLocaleUI?.apply();
 }
 $('#language-switch').addEventListener('click',event=>{
  if(!localeUI.isLanguageClick(event))return;
  event.preventDefault();
  language=language==='zh'?'en':'zh';
  localeUI.syncUrl(language);
  apply();
 });
 $('#menu-toggle').onclick=()=>{const open=$('#menu-toggle').getAttribute('aria-expanded')!=='true';$('#menu-toggle').setAttribute('aria-expanded',open);$('#main-nav').classList.toggle('is-open',open);window.EllisLocaleUI?.syncMenu()};
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('#main-nav').classList.remove('is-open');$('#menu-toggle').setAttribute('aria-expanded','false');window.EllisLocaleUI?.syncMenu()}});
 apply();
 const media=matchMedia('(prefers-reduced-motion: reduce)');
 let observer;
 function watchEntrances(){
  observer?.disconnect();
  if(media.matches||!window.IntersectionObserver){all('[data-entrance]').forEach(n=>n.classList.add('has-entered'));return;}
  document.body.classList.add('detail-motion-ready');
  observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('has-entered');observer.unobserve(entry.target);}}),{threshold:.08});
  all('[data-entrance]:not(.has-entered)').forEach(n=>observer.observe(n));
 }
 media.addEventListener('change',watchEntrances);watchEntrances();
 const hero=$('.content-hero');
 if(hero&&window.IntersectionObserver){new IntersectionObserver(entries=>entries.forEach(e=>hero.classList.toggle('hero-is-visible',e.isIntersecting))).observe(hero);}
})();
