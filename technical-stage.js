(() => {
 const library = document.querySelector('[data-tn-stage-library]');
 if (!library) return;
 const stage = library.querySelector('.tn-stage');
 const track = stage.querySelector('.tn-rail-scroll');
 const controls = stage.querySelector('.tn-rail-controls');
 const previous = controls.querySelector('[data-tn-step="-1"]');
 const next = controls.querySelector('[data-tn-step="1"]');
 const range = controls.querySelector('input');
 const position = controls.querySelector('[data-tn-position]');
 const announcement = controls.querySelector('[data-tn-announcement]');
 const count = library.querySelector('.tn-count span');
 const heading = library.querySelector('.tn-stage-title');
 const filters = library.querySelector('.tn-filters');
 const buttons = [...filters.querySelectorAll('[data-tn-filter]')];
 const empty = library.querySelector('.tn-empty');
 const cards = [...track.querySelectorAll('.tn-card')];
 const links = new Map(cards.map(card=>[card,[...card.querySelectorAll('.tn-card-title, .tn-card-link')]]));
 const parked = new Map();
 const leadingTitle = {zh:heading.dataset.zh,en:heading.dataset.en};
 const motion = matchMedia('(prefers-reduced-motion: reduce)');
 const names = ['far-left','previous','current','next','far-right'];
 const scales = [1,.84,.64,.54];
 const drops = [0,18,36,54];
 let visible = cards;
 let index = 0;
 let filter = 'all';
 let gesture = null;
 let ignoreClickUntil = 0;
 const english = () => document.documentElement.lang.startsWith('en');
 const cyclic = () => visible.length >= 5;
 const modulo = (value,length) => (value % length + length) % length;

 function offsetFor(itemIndex) {
  const difference = itemIndex - index;
  if (!cyclic()) return difference;
  const half = Math.floor(visible.length / 2);
  return modulo(difference + half, visible.length) - half;
 }

 function motionPose(card, slot) {
  const magnitude = Math.min(3,Math.abs(slot));
  const start = Math.min(2,Math.floor(magnitude));
  const fraction = magnitude - start;
  const scale = scales[start] + (scales[start+1] - scales[start]) * fraction;
  const drop = drops[start] + (drops[start+1] - drops[start]) * fraction;
  card.style.setProperty('--tn-slot-x',slot.toFixed(3));
  card.style.setProperty('--tn-slot-drop',drop.toFixed(2)+'px');
  card.style.setProperty('--tn-slot-scale',scale.toFixed(3));
  card.style.setProperty('--tn-slot-tilt',(Math.max(-2,Math.min(2,slot))*-5).toFixed(2)+'deg');
 }

 function paint(dragOffset=0) {
  const layout = new Map(visible.map((card,i)=>[card,offsetFor(i)]));
  for (const card of cards) {
   const delta = layout.get(card);
   card.hidden = delta === undefined;
   if (delta === undefined) {
    card.removeAttribute('data-tn-slot');
    card.inert = true;
    continue;
   }
   const slot = Math.min(3,Math.max(-3,delta));
   const old = parked.get(card);
   const onStage = Math.abs(delta) <= 2;
   const incoming = Boolean(dragOffset && Math.abs(slot - dragOffset) < 3 && Math.abs(delta) === 3);
   if (old !== undefined && Math.abs(old - slot) > 3 && onStage &&
       !stage.hasAttribute('data-tn-jump') && !motion.matches) {
    card.setAttribute('data-tn-parked','');
    motionPose(card,Math.sign(slot)*3);
    card.getBoundingClientRect();
    card.removeAttribute('data-tn-parked');
   }
   if (Math.abs(delta) <= 3) {
    const image = card.querySelector('img');
    if (image.loading === 'lazy') image.loading = 'eager';
   }
   card.dataset.tnSlot = names[delta+2] || (incoming ? 'incoming' : 'offstage');
   card.style.setProperty('--tn-layer',String(Math.max(1,6-Math.abs(delta))));
   card.inert = !onStage;
   for (const link of links.get(card)) link.tabIndex = delta === 0 ? 0 : -1;
   motionPose(card,slot-dragOffset);
   parked.set(card,slot);
  }
 }

 function description() {
  const number = index+1;
  return english()
   ? 'Article ' + number + ' of ' + visible.length
   : '第 ' + number + ' 篇，共 ' + visible.length + ' 篇';
 }

 function syncControls(announce=false) {
  const total = visible.length;
  const loop = cyclic();
  stage.hidden = total===0;
  empty.hidden = total!==0;
  controls.hidden = total<2;
  range.max = Math.max(1,total);
  range.value = index+1;
  range.setAttribute('aria-valuetext',description());
  const focused = document.activeElement;
  previous.disabled = !loop && index===0;
  next.disabled = !loop && index>=total-1;
  if (total>1 && ((focused===previous && previous.disabled) || (focused===next && next.disabled))) {
   range.focus({preventScroll:true});
  }
  controls.style.setProperty('--tn-rail-progress',(total>1 ? index/(total-1)*100 : 0)+'%');
  position.textContent = String(index+1).padStart(2,'0') + ' / ' + String(total).padStart(2,'0');
  if (announce && total) announcement.textContent = description();
 }

 function syncHeading() {
  count.textContent = english()
   ? visible.length + (visible.length === 1 ? ' article' : ' articles')
   : '共 ' + visible.length + ' 篇';
  heading.textContent = filter==='all'
   ? leadingTitle[english()?'en':'zh']
   : filters.querySelector('[data-tn-filter="'+filter+'"] span').textContent;
 }

 function withoutTransition(action) {
  stage.setAttribute('data-tn-jump','');
  action();
  track.getBoundingClientRect();
  stage.removeAttribute('data-tn-jump');
 }

 function setIndex(destination, announce=true, immediate=false) {
  if (!visible.length) return;
  const before = visible[index];
  const focusedLink = links.get(before)?.indexOf(document.activeElement) ?? -1;
  const focusedCard = focusedLink >= 0;
  index = cyclic() ? modulo(destination,visible.length) : Math.max(0,Math.min(visible.length-1,destination));
  if (focusedCard && before !== visible[index]) track.focus({preventScroll:true});
  if (immediate) withoutTransition(()=>paint());
  else paint();
  syncControls(announce);
  if (focusedCard && before !== visible[index]) links.get(visible[index])[focusedLink].focus({preventScroll:true});
 }

 function select(key) {
  const current = visible[index];
  filter = key;
  visible = cards.filter(card=>key==='all' || card.dataset.tnCategory===key);
  index = Math.max(0,visible.indexOf(current));
  gesture = null;
  track.removeAttribute('data-tn-dragging');
  stage.dataset.tnView = key==='all' ? 'all' : 'category';
  for (const button of buttons) button.setAttribute('aria-pressed',String(button.dataset.tnFilter===key));
  withoutTransition(()=>paint());
  syncHeading();
  syncControls();
 }

 heading.removeAttribute('data-zh');
 heading.removeAttribute('data-en');
 count.removeAttribute('data-zh');
 count.removeAttribute('data-en');
 filters.addEventListener('click',event=>{
  const button = event.target.closest('[data-tn-filter]');
  if (button && button.dataset.tnFilter!==filter) select(button.dataset.tnFilter);
 });
 empty.querySelector('[data-tn-reset]').addEventListener('click',()=>{
  buttons[0].focus();
  select('all');
 });
 for (const button of [previous,next]) {
  button.addEventListener('click',()=>setIndex(index+Number(button.dataset.tnStep)));
 }
 range.addEventListener('input',()=>{
  const target = Number(range.value)-1;
  setIndex(target,false,Math.abs(target-index)>1);
 });
 range.addEventListener('change',()=>syncControls(true));
 stage.addEventListener('keydown',event=>{
  if (event.target===range || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.key!=='ArrowLeft' && event.key!=='ArrowRight') return;
  if (visible.length<2) return;
  event.preventDefault();
  setIndex(index+(event.key==='ArrowRight'?1:-1));
 });

 track.addEventListener('pointerdown',event=>{
  if (!event.isPrimary || event.button!==0 || visible.length<2) return;
  gesture = {id:event.pointerId,x:event.clientX,y:event.clientY,dragged:false};
 });
 track.addEventListener('pointermove',event=>{
  if (!gesture || gesture.id!==event.pointerId) return;
  const dx = event.clientX - gesture.x;
  const dy = event.clientY - gesture.y;
  if (!gesture.dragged) {
   if (Math.abs(dy)>12 && Math.abs(dy)>Math.abs(dx)) { gesture=null; return; }
   if (Math.abs(dx)<10 || Math.abs(dx)<Math.abs(dy)) return;
   gesture.dragged = true;
   track.setPointerCapture(event.pointerId);
   track.setAttribute('data-tn-dragging','');
  }
  const step = track.clientWidth * (track.clientWidth>700?.25:.57);
  let progress = Math.min(.94,Math.max(-.94,-dx/Math.max(95,step)));
  if (!cyclic() && ((index===0&&progress<0)||(index===visible.length-1&&progress>0))) progress*=.2;
  if (!motion.matches) paint(progress);
 });
 function finishDrag(event) {
  if (!gesture || gesture.id!==event.pointerId) return;
  const state = gesture;
  gesture = null;
  track.removeAttribute('data-tn-dragging');
  if (!state.dragged) return;
  ignoreClickUntil = performance.now()+220;
  const dx = event.clientX - state.x;
  const changed = event.type==='pointerup' && Math.abs(dx)>=Math.min(65,track.clientWidth*.16);
  if (changed) setIndex(index+(dx<0?1:-1));
  else paint();
 }
 track.addEventListener('pointerup',finishDrag);
 track.addEventListener('pointercancel',finishDrag);
 track.addEventListener('dragstart',event=>event.preventDefault());
 track.addEventListener('click',event=>{
  if (performance.now()<ignoreClickUntil && event.detail!==0) {
   event.preventDefault();
   event.stopPropagation();
   return;
  }
  if (event.target.closest('a')) return;
  const card = event.target.closest('.tn-card');
  const destination = visible.indexOf(card);
  if (destination>=0 && destination!==index) setIndex(destination);
 },true);
 new MutationObserver(()=>{
  syncHeading();
  syncControls();
 }).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});

 stage.classList.add('tn-stage-is-ready');
 filters.hidden = false;
 select('all');
})();
