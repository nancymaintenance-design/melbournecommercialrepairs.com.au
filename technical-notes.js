(() => {
 const root = document.querySelector('.tn');
 if (!root) return;
 const library = root.matches('[data-tn-library]');
 const motion = matchMedia('(prefers-reduced-motion: reduce)');
 const desktopMotion = matchMedia('(hover: hover) and (pointer: fine)');
 const isEnglish = () => document.documentElement.lang.startsWith('en');

 // Coordinate local jumps with the actual height of the shared navigation.
 const header = document.querySelector('.site-header');
 const measureHeader = () => root.style.setProperty('--tn-offset', Math.ceil(header.getBoundingClientRect().bottom) + 'px');
 measureHeader();
 if ('ResizeObserver' in window) new ResizeObserver(measureHeader).observe(header);

 if ('IntersectionObserver' in window) {
  const reveals = new IntersectionObserver(entries => {
   for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    if (!motion.matches && entry.target.animate) {
     entry.target.animate([{opacity:.65,translate:'0 16px'},{opacity:1,translate:'0 0'}],
      {duration:320,delay:(Number(entry.target.dataset.tnReveal) % 2)*55,easing:'cubic-bezier(.2,.65,.3,1)'});
    }
    reveals.unobserve(entry.target);
   }
  }, {threshold:.12});
  root.querySelectorAll('[data-tn-reveal]').forEach((card,i) => {
   card.dataset.tnReveal = i;
   reveals.observe(card);
  });
 }

 const hero = root.querySelector('.tn-hero');
 const artwork = hero.querySelector('[data-tn-parallax]');
 function pointer(event) {
  if (!desktopMotion.matches || motion.matches) return;
  const bounds = hero.getBoundingClientRect();
  artwork.style.setProperty('--tn-parallax-x', (event.clientX - bounds.left - bounds.width / 2) * .015 + 'px');
  artwork.style.setProperty('--tn-parallax-y', (event.clientY - bounds.top - bounds.height / 2) * .025 + 'px');
 }
 function resetParallax() {
  artwork.style.removeProperty('--tn-parallax-x');
  artwork.style.removeProperty('--tn-parallax-y');
 }
 hero.addEventListener('pointermove',pointer,{passive:true});
 hero.addEventListener('pointerleave',resetParallax);
 motion.addEventListener('change',resetParallax);

 if (!library) return;
 const cardList = [...root.querySelectorAll('[data-tn-category]')];
 const filterGroup = root.querySelector('.tn-filters');
 const filterButtons = [...filterGroup.querySelectorAll('[data-tn-filter]')];
 const current = root.querySelector('.tn-current');
 const details = root.querySelector('.tn-more');
 const limit = Number(root.dataset.tnLimit);
 const status = root.querySelector('.tn-count span');
 const disclosure = root.querySelector('.tn-disclosure');
 const disclosureCopy = disclosure.querySelector('p');
 const toggle = disclosure.querySelector('[data-tn-more]');
 const toggleLabel = toggle.querySelector('[data-tn-more-label]');
 const toggleArrow = toggle.querySelector('[data-tn-more-arrow]');
 const empty = root.querySelector('.tn-empty');
 const extra = cardList.length - limit;
 let filter = 'all';
 let expanded = false;
 let animation;

 function updateCopy(count) {
  const english = isEnglish();
  const total = filter==='all'?cardList.length:count;
  status.textContent = english
   ? `Showing ${count} of ${total} ${total===1?'article':'articles'}`
   : `已显示 ${count} / ${total} 篇`;
  disclosureCopy.textContent = english
   ? (expanded?`All ${cardList.length} technical notes`:`${extra} more technical notes`)
   : (expanded?`全部 ${cardList.length} 篇技术文章`:`还有 ${extra} 篇技术文章`);
  toggleLabel.textContent = english
   ? (expanded?'Show fewer articles':`Show more articles (${extra})`)
   : (expanded?'收起文章':`展开更多文章（${extra}）`);
  toggleArrow.textContent = expanded?'↑':'↓';
 }
 status.removeAttribute('data-zh');
 status.removeAttribute('data-en');

 function update(animate=false) {
  const all = filter==='all';
  const showMore = all?expanded:cardList.some(card=>details.contains(card)&&card.dataset.tnCategory===filter);
  const from = details.getBoundingClientRect().height;
  animation?.cancel();
  let count = 0;
  cardList.forEach((card,index) => {
   const allowed = all || card.dataset.tnCategory===filter;
   card.hidden = !allowed;
   if(allowed && (!all || expanded || index<limit)) count++;
  });
  current.hidden = !cardList.some(card=>current.contains(card)&&!card.hidden);
  filterButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.tnFilter===filter)));
  toggle.setAttribute('aria-expanded',String(all&&expanded));
  empty.hidden = count!==0;
  disclosure.hidden = !all||extra<=0;
  details.inert = !showMore;
  details.hidden = !showMore && !(animate && from>0);
  updateCopy(count);
  if (animate && !motion.matches && details.animate && !details.hidden) {
   const to = showMore ? details.scrollHeight : 0;
   if (from!==to) {
    const effect = details.animate(
     [{height:from+'px',overflow:'clip'},{height:to+'px',overflow:'clip'}],
     {duration:260,easing:'cubic-bezier(.25,.65,.3,1)'});
    animation = effect;
    const finish = () => {if (animation===effect) {details.hidden = !showMore;animation = undefined;}};
    effect.addEventListener('finish',finish,{once:true});
    return;
   }
  }
  details.hidden = !showMore;
 }

 function select(key) {
  if (filter===key) return;
  if (details.contains(document.activeElement)) filterButtons.find(button=>button.dataset.tnFilter===key).focus();
  filter = key;
  expanded = false;
  update();
 }
 filterGroup.addEventListener('click',event=>{
  const button = event.target.closest('[data-tn-filter]');
  if (button) select(button.dataset.tnFilter);
 });
 empty.querySelector('[data-tn-reset]').addEventListener('click',()=>{
  filterButtons[0].focus();
  select('all');
 });
 toggle.addEventListener('click',()=>{
  if(expanded && details.contains(document.activeElement)) toggle.focus();
  expanded = !expanded;
  if(!expanded && toggle.getBoundingClientRect().top<0) toggle.focus({preventScroll:false});
  update(true);
 });
 new MutationObserver(()=>updateCopy(cardList.filter(card=>!card.hidden && (!details.inert || !details.contains(card))).length))
  .observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 filterGroup.hidden = false;
 update();
})();
