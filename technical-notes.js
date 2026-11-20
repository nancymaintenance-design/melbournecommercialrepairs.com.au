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
 const rail = root.querySelector('.tn-rail');
 const track = rail.querySelector('.tn-rail-scroll');
 const railControls = rail.querySelector('.tn-rail-controls');
 const steps = [...railControls.querySelectorAll('[data-tn-step]')];
 const range = railControls.querySelector('input');
 const position = railControls.querySelector('[data-tn-position]');
 const cards = [...track.children];
 const filterGroup = root.querySelector('.tn-filters');
 const filterButtons = [...filterGroup.querySelectorAll('[data-tn-filter]')];
 const status = root.querySelector('.tn-count span');
 const empty = root.querySelector('.tn-empty');
 let filter = 'all';
 let shown = cards;
 let frame = 0;
 let settleTimer = 0;
 let pendingTarget = null;
 const nativeScrollEnd = 'onscrollend' in track;
 const maximum = () => Math.max(0, track.scrollWidth - track.clientWidth);

 function syncProgress() {
  frame = 0;
  const max = maximum();
  const left = Math.min(max, Math.max(0, track.scrollLeft));
  const progress = max ? left / max * 100 : 0;
  if (!track.hasAttribute('data-tn-scrubbing')) range.value = Math.round(progress);
  railControls.style.setProperty('--tn-rail-progress', progress + '%');
  steps[0].setAttribute('aria-disabled', String(left <= 1));
  steps[1].setAttribute('aria-disabled', String(left >= max - 1));
 }
 function syncPosition() {
  if (!shown.length) return;
  const left = track.scrollLeft;
  const right = left + track.clientWidth;
  const visible = shown.flatMap((card, index)=>{
   const center = card.offsetLeft + card.offsetWidth / 2;
   return center >= left && center <= right ? [index + 1] : [];
  });
  if (!visible.length) return;
  const first = visible[0];
  const last = visible[visible.length - 1];
  const numbers = first === last ? String(first) : first + '–' + last;
  const message = isEnglish()
   ? numbers + ' of ' + shown.length
   : '第 ' + numbers + ' 篇 · 共 ' + shown.length + ' 篇';
  if (position.textContent !== message) position.textContent = message;
  range.setAttribute('aria-valuetext', message);
 }
 function settle() {
  pendingTarget = null;
  syncPosition();
 }
 function move(direction) {
  const limit = maximum();
  const from = pendingTarget ?? track.scrollLeft;
  const inset = parseFloat(getComputedStyle(track).scrollPaddingInlineStart) || 0;
  const offsets = shown.map(card=>Math.min(limit, Math.max(0, card.offsetLeft - inset)));
  const candidates = offsets.filter(offset=>direction > 0 ? offset > from + 2 : offset < from - 2);
  const next = direction > 0 ? candidates[0] ?? limit : candidates[candidates.length - 1] ?? 0;
  if (Math.abs(next - from) <= 1) return;
  pendingTarget = next;
  track.scrollTo({left:next, behavior:motion.matches ? 'instant' : 'smooth'});
 }
 function measureRail() {
  railControls.hidden = maximum() <= 1;
  if (railControls.hidden && railControls.contains(document.activeElement)) track.focus({preventScroll:true});
  syncProgress();
  syncPosition();
 }
 function syncCount() {
  status.textContent = isEnglish()
   ? shown.length + (shown.length === 1 ? ' article' : ' articles')
   : '共 ' + shown.length + ' 篇';
 }
 function select(key) {
  filter = key;
  shown = cards.filter(card=>key === 'all' || card.dataset.tnCategory === key);
  for (const card of cards) card.hidden = key !== 'all' && card.dataset.tnCategory !== key;
  for (const button of filterButtons) button.setAttribute('aria-pressed', String(button.dataset.tnFilter === key));
  rail.dataset.tnView = key === 'all' ? 'all' : 'category';
  empty.hidden = shown.length !== 0;
  rail.hidden = shown.length === 0;
  pendingTarget = null;
  track.scrollTo({left:0, behavior:'instant'});
  syncCount();
  measureRail();
 }
 status.removeAttribute('data-zh');
 status.removeAttribute('data-en');
 filterGroup.addEventListener('click',event=>{
  const button = event.target.closest('[data-tn-filter]');
  if (button && button.dataset.tnFilter !== filter) select(button.dataset.tnFilter);
 });
 empty.querySelector('[data-tn-reset]').addEventListener('click',()=>{
  filterButtons[0].focus();
  select('all');
 });
 for (const button of steps) button.addEventListener('click',()=>move(Number(button.dataset.tnStep)));
 range.addEventListener('input',()=>{
  pendingTarget = null;
  track.setAttribute('data-tn-scrubbing','');
  track.scrollTo({left:maximum() * Number(range.value) / 100, behavior:'instant'});
  syncProgress();
 });
 function finishScrub() {
  track.removeAttribute('data-tn-scrubbing');
  syncProgress();
  settle();
 }
 range.addEventListener('change',finishScrub);
 range.addEventListener('blur',finishScrub);
 track.addEventListener('pointerdown',()=>{pendingTarget = null;});
 track.addEventListener('scroll',()=>{
  if (!frame) frame = requestAnimationFrame(syncProgress);
  if (!nativeScrollEnd) {
   clearTimeout(settleTimer);
   settleTimer = setTimeout(settle, 140);
  }
 },{passive:true});
 if (nativeScrollEnd) track.addEventListener('scrollend',settle);
 if ('ResizeObserver' in window) new ResizeObserver(measureRail).observe(track);
 else window.addEventListener('resize',measureRail,{passive:true});
 new MutationObserver(()=>{
  syncCount();
  syncPosition();
 }).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 filterGroup.hidden = false;
 rail.setAttribute('data-tn-ready','');
 select('all');
})();
