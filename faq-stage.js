/* Local, bilingual search over the complete source. No remote answer service. */
(() => {
 const root=document.querySelector('.fq-index'),source=document.querySelector('#faq-data');if(!root||!source)return;
 const {topics}=JSON.parse(source.textContent),questions=topics.flatMap(t=>t.questions.map(q=>({...q,topic:t.key})));
 const normal=s=>s.normalize('NFKC').toLocaleLowerCase().replace(/[\s,，.。!?？!·&/]+/g,' ').trim();
 const index=new Map(questions.map(q=>[q.id,normal([q.id,q.question.zh,q.question.en,q.answer.zh,q.answer.en].join(' '))]));
 const byId=new Map(questions.map(q=>[q.id,q])),byTopic=new Map(topics.map(t=>[t.key,t]));
 const cards=[...root.querySelectorAll('.faq-card')],groups=[...root.querySelectorAll('.faq-group')];
 const search=root.querySelector('#faq-search-input'),form=root.querySelector('.faq-search'),clear=root.querySelector('.faq-clear');
 const choices=[...root.querySelectorAll('[data-faq-topic]')],results=root.querySelector('.faq-results');
 const title=root.querySelector('.faq-current-title'),count=root.querySelector('.faq-results-count'),status=root.querySelector('.faq-filter-state');
 const empty=root.querySelector('.faq-empty'),next=root.querySelector('[data-faq-next]');
 let topic='scope',query='',composing=false,targetTimer,filterAnimation;
 const english=()=>document.documentElement.lang.startsWith('en');
 const tr=(zh,en)=>english()?en:zh;
 const lang=()=>english()?'en':'zh';
 const match=q=>!query.trim()||normal(query).split(' ').filter(Boolean).every(term=>index.get(q.id).includes(term));
 function translate(node,zh,en){node.dataset.zh=zh;node.dataset.en=en;node.textContent=tr(zh,en);}
 function stateUrl(hash='') {
  const url=new URL(location.href);url.searchParams.set('lang',lang());url.searchParams.set('topic',topic);
  if(query.trim())url.searchParams.set('q',query.trim());else url.searchParams.delete('q');url.hash=hash;
  return url;
 }
 function remember(hash='',replace=false){const url=stateUrl(hash);if(url.href!==location.href)history[replace?'replaceState':'pushState'](null,'',url);}
 function render({animate=false}={}) {
  const shown=questions.filter(q=>(topic==='all'||q.topic===topic)&&match(q)),ids=new Set(shown.map(q=>q.id));
  cards.forEach(card=>{card.hidden=!ids.has(card.id);});
  groups.forEach(group=>{group.hidden=!shown.some(q=>q.topic===group.dataset.group);});
  root.classList.toggle('is-single-topic',topic!=='all');
  choices.forEach(a=>{if(a.dataset.faqTopic===topic)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');
   const url=new URL('/faq/',location.origin);url.searchParams.set('lang',lang());url.searchParams.set('topic',a.dataset.faqTopic);if(query.trim())url.searchParams.set('q',query.trim());url.hash='faq-results';a.href=url.pathname+url.search+url.hash;
  });
  const selected=byTopic.get(topic);
  translate(title,selected?.title.zh||'全部问题',selected?.title.en||'All questions');
  count.textContent=tr(`${shown.length} 个问题`,`${shown.length} ${shown.length===1?'question':'questions'}`);
  root.querySelector('.faq-outline-count').textContent=String(shown.length).padStart(2,'0');
  status.textContent=query.trim()?tr(`${selected?.short.zh||'全部主题'} · 找到 ${shown.length} 个问题 · “${query.trim()}”`,`${selected?.short.en||'All topics'} · ${shown.length} results · “${query.trim()}”`):'';
  clear.hidden=!search.value;empty.hidden=shown.length>0;
  search.placeholder=tr('搜索漏水、报价、营业期间施工…','Search leaks, quotes, working during business hours…');
  form.querySelector('[name=lang]').value=lang();
  form.querySelector('[type=submit]').setAttribute('aria-label',tr('搜索问答','Search questions'));
  const following=selected?topics[topics.indexOf(selected)+1]:null;
  next.hidden=!following||!!query.trim()||shown.length===0;
  if(following){next.dataset.faqNext=following.key;next.href=`/faq/?lang=${lang()}&topic=${following.key}#faq-results`;next.querySelector('.faq-next-name').textContent=tr(`${following.title.zh} · ${following.questions.length} 个问题`,`${following.title.en} · ${following.questions.length} questions`);}
  if(animate&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
   filterAnimation?.cancel();filterAnimation=root.querySelector('.faq-groups').animate([{opacity:.8,translate:'0 6px'},{opacity:1,translate:'0 0'}],{duration:210,easing:'ease-out'});
  }
 }
 function locate(id,{focus=true}={}) {
  const target=document.getElementById(id);if(!target)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(focus)target.focus({preventScroll:true});
  const header=document.querySelector('.site-header').getBoundingClientRect();
  window.scrollTo({top:Math.max(0,scrollY+target.getBoundingClientRect().top-header.bottom-18),behavior:reduced?'instant':'smooth'});
  cards.forEach(c=>c.classList.remove('is-target'));clearTimeout(targetTimer);
  if(byId.has(id)){target.classList.add('is-target');targetTimer=setTimeout(()=>target.classList.remove('is-target'),1800);}
 }
 function goQuestion(id,{history=true,focus=true}={}) {
  const q=byId.get(id);if(!q)return;
  topic=q.topic;if(!match(q)){query='';search.value='';}
  render({animate:true});if(history)remember(id);locate(id,{focus});
 }
 function readUrl({scroll=true}={}) {
  const url=new URL(location.href),requested=url.searchParams.get('topic');query=url.searchParams.get('q')||'';
  topic=byTopic.has(requested)||requested==='all'?requested:query?'all':'scope';search.value=query;
  const id=url.hash.slice(1).toLowerCase();
  if(byId.has(id)){topic=byId.get(id).topic;if(!match(byId.get(id))){query='';search.value='';remember(id,true);}render();if(scroll)locate(id,{focus:false});}
  else {render();if(scroll&&id==='faq-results')locate(id,{focus:false});}
 }
 function reset(){query='';topic='all';search.value='';render({animate:true});remember();search.focus({preventScroll:false});}
 root.classList.add('is-enhanced');
 form.addEventListener('submit',event=>{event.preventDefault();if(composing)return;query=search.value;topic='all';render({animate:true});remember('faq-results');locate('faq-results');});
 search.addEventListener('compositionstart',()=>{composing=true;});
 search.addEventListener('compositionend',()=>{composing=false;query=search.value;topic='all';render();});
 search.addEventListener('keydown',e=>{if(e.key==='Enter'&&(e.isComposing||composing))e.preventDefault();});
 search.addEventListener('input',event=>{if(composing||event.isComposing)return;query=search.value;topic='all';render();});
 clear.addEventListener('click',reset);root.querySelector('[data-faq-reset]').addEventListener('click',reset);
 root.querySelector('[data-faq-all]').addEventListener('click',()=>{topic='all';render({animate:true});remember('faq-results');locate('faq-results');});
 root.addEventListener('click',event=>{
  const a=event.target.closest('a');if(!a||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  if(a.dataset.faqJump){event.preventDefault();goQuestion(a.dataset.faqJump);}
  else if(a.dataset.faqTopic||a.dataset.faqNext){event.preventDefault();topic=a.dataset.faqTopic||a.dataset.faqNext;render({animate:true});remember('faq-results');locate('faq-results');}
 });
 const copyTimers=new Map();
 root.addEventListener('click',async event=>{
  const button=event.target.closest('[data-faq-copy]');if(!button)return;
  const id=button.dataset.faqCopy,q=byId.get(id),url=new URL('/faq/',location.origin);
  url.searchParams.set('lang',lang());url.searchParams.set('topic',q.topic);url.hash=id;
  const area=button.closest('.faq-copy-area'),feedback=area.querySelector('.faq-copy-feedback'),fallback=area.querySelector('.faq-copy-fallback');
  clearTimeout(copyTimers.get(id));fallback.hidden=true;
  try {if(!navigator.clipboard?.writeText)throw Error('Clipboard unavailable');await navigator.clipboard.writeText(url.href);feedback.textContent=tr('链接已复制','Link copied');copyTimers.set(id,setTimeout(()=>{feedback.textContent='';},2500));}
  catch {feedback.textContent='';fallback.hidden=false;const input=fallback.querySelector('input');input.value=url.href;input.focus();input.select();}
 });
 document.querySelector('#language-switch')?.addEventListener('click',()=>queueMicrotask(()=>{
  copyTimers.forEach(timer=>clearTimeout(timer));copyTimers.clear();
  root.querySelectorAll('.faq-copy-feedback').forEach(node=>{node.textContent='';});
  render();syncMotion();
 }));
 window.addEventListener('popstate',()=>{const requested=new URLSearchParams(location.search).get('lang')==='en'?'en':'zh';if(requested!==lang())document.querySelector('#language-switch').click();readUrl();});
 window.addEventListener('hashchange',()=>{const id=location.hash.slice(1).toLowerCase();if(byId.has(id))goQuestion(id,{history:false,focus:false});});

 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),stage=root.querySelector('.faq-stage'),motionButton=root.querySelector('.faq-motion');
 let paused=false,onScreen=true,frame=0;
 motionButton.hidden=false;
 function syncMotion(){root.classList.toggle('is-paused',paused||reduced.matches);root.classList.toggle('is-offscreen',!onScreen||document.hidden||!document.hasFocus());motionButton.hidden=reduced.matches;translate(motionButton,paused?'播放动效':'暂停动效',paused?'Play motion':'Pause motion');}
 motionButton.addEventListener('click',()=>{paused=!paused;syncMotion();});
 new IntersectionObserver(entries=>{onScreen=entries[0].isIntersecting;syncMotion();}).observe(stage);
 document.addEventListener('visibilitychange',syncMotion);window.addEventListener('blur',syncMotion);window.addEventListener('focus',syncMotion);reduced.addEventListener('change',syncMotion);
 stage.addEventListener('pointermove',event=>{
  if(paused||reduced.matches||!onScreen||event.pointerType==='touch'||frame)return;
  const {clientX,clientY}=event;
  frame=requestAnimationFrame(()=>{frame=0;const r=stage.getBoundingClientRect(),x=(clientX-r.left)/r.width-.5,y=(clientY-r.top)/r.height-.5;
   stage.style.setProperty('--scene-y',`${x*7}deg`);stage.style.setProperty('--scene-x',`${x*8}px`);stage.style.setProperty('--scene-py',`${y*5}px`);
   stage.style.setProperty('--mark-y',`${-x*12}deg`);stage.style.setProperty('--mark-x',`${-x*14}px`);stage.style.setProperty('--mark-py',`${-y*9}px`);
  });
 });
 stage.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);frame=0;stage.removeAttribute('style');});
 const revealed=new WeakSet(),entrances=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting&&!revealed.has(entry.target)){revealed.add(entry.target);entry.target.classList.add('is-new');entrances.unobserve(entry.target);}}),{threshold:.05});
 cards.forEach(c=>entrances.observe(c));
 root.addEventListener('animationend',event=>{if(event.animationName==='faq-answer-in')event.target.closest('.faq-card')?.classList.remove('is-new');});
 readUrl();syncMotion();
})();
