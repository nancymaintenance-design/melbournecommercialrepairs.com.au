(() => {
 const $=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];
 let language=new URLSearchParams(location.search).get('lang')==='en'?'en':'zh';
 const metadata=JSON.parse($('#page-meta')?.textContent||'{}');
 function apply(){
  document.documentElement.lang=language==='en'?'en':'zh-CN';
  all('[data-zh][data-en]').forEach(n=>n.textContent=n.dataset[language].replace(/\\n/g,'\n'));
  all('a[href^="/"]').forEach(a=>{const u=new URL(a.href);u.searchParams.set('lang',language);a.href=u.pathname+u.search+u.hash});
  $('.lang-en').classList.toggle('active',language==='en');$('.lang-zh').classList.toggle('active',language==='zh');
  document.title=metadata[language==='en'?'titleEn':'titleZh']||$('h1').textContent+' | Ellis Services Group Melbourne';
  const description=$('meta[name="description"]');if(description)description.content=metadata[language==='en'?'descriptionEn':'descriptionZh']||description.content;
  const canonical=$('link[rel="canonical"]');if(canonical){const u=new URL(metadata.route||location.pathname,location.origin);u.searchParams.set('lang',language);canonical.href=u.href;}
  $('#language-switch').setAttribute('aria-label',language==='en'?'切换到中文':'Switch to English');
  $('#main-nav').setAttribute('aria-label',language==='en'?'Main navigation':'主导航');
  const currentPath=metadata.route?.startsWith('/services/')?'/services/':metadata.route?.startsWith('/sectors/')?'/sectors/':metadata.route?.startsWith('/insights/')?'/insights/':metadata.route;
  all('#main-nav a').forEach(a=>{const current=new URL(a.href).pathname===currentPath;a.classList.toggle('active',current);if(current)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  $('.topic-toc')?.setAttribute('aria-label',language==='en'?'On this page':'本页内容');
  $('#year').textContent=new Date().getFullYear();
 }
 $('#language-switch').onclick=()=>{language=language==='zh'?'en':'zh';apply();const u=new URL(location.href);u.searchParams.set('lang',language);history.replaceState(null,'',u)};
 $('#menu-toggle').onclick=()=>{const open=$('#menu-toggle').getAttribute('aria-expanded')!=='true';$('#menu-toggle').setAttribute('aria-expanded',open);$('#main-nav').classList.toggle('is-open',open)};
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('#main-nav').classList.remove('is-open');$('#menu-toggle').setAttribute('aria-expanded','false')}});
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
