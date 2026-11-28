/* The homepage and Melbourne stage share one queue and one decode result per source. */
(() => {
 'use strict';
 const limit = 2;
 const states = new WeakMap();
 const decoded = new Map();
 const queue = new Map();
 let busy = 0;
 let scheduled = false;

 function schedule() {
  if (scheduled) return;
  scheduled = true;
  queueMicrotask(() => {
   scheduled = false;
   while (busy < limit && queue.size) {
    const [image, priority] = [...queue].reduce((a, b) => b[1] > a[1] ? b : a);
    queue.delete(image);
    const state = states.get(image);
    if (!state || state.started) continue;
    state.started = state.active = true;
    busy++;
    image.fetchPriority = priority > 0 ? 'auto' : 'low';
    // The browser selects one srcset candidate; src is the fallback.
    image.sizes = image.dataset.sizes || '';
    image.srcset = image.dataset.srcset || '';
    image.src = image.dataset.src;
    inspect(image, state);
   }
  });
 }

 function release(state) {
  if (!state.active) return;
  state.active = false;
  busy--;
  schedule();
 }

 function tell(state) {
  for (const notify of state.listeners) notify();
 }

 function inspect(image, state) {
  const source = image.currentSrc;
  if (!image.complete || !image.naturalWidth || !source || source === state.source) return;
  state.source = source;
  const revision = ++state.revision;
  let task = decoded.get(source);
  if (!task) {
   task = Promise.resolve().then(() => typeof image.decode === 'function' ? image.decode() : undefined);
   decoded.set(source, task);
   task.catch(() => { if (decoded.get(source) === task) decoded.delete(source); });
  }
  task.then(() => {
   if (revision !== state.revision || image.currentSrc !== source) return;
   state.readySource = source;
   release(state);
   tell(state);
  }, () => {
   if (revision !== state.revision) return;
   state.source = '';
   release(state);
   tell(state);
  });
 }

 function watch(image, notify) {
  let state = states.get(image);
  if (!state) {
   state = {started: image.hasAttribute('src'), active: false, revision: 0, source: '', readySource: '', listeners: new Set()};
   states.set(image, state);
   const eagerPending = state.started && !image.complete;
   if (eagerPending) { state.active = true; busy++; }
   image.addEventListener('load', () => inspect(image, state));
   image.addEventListener('error', () => {
    state.revision++;
    state.source = state.readySource = '';
    const fallback = image.dataset.fallback;
    if (fallback && !state.fallback && new URL(fallback, document.baseURI).href !== image.currentSrc) {
     state.fallback = true;
     image.removeAttribute('srcset');
     image.src = fallback;
     return;
    }
    release(state);
    tell(state);
   });
   inspect(image, state);
  }
  state.listeners.add(notify);
  return () => state.listeners.delete(notify);
 }

 function request(image, priority = 0) {
  const state = states.get(image);
  if (!state || !image.dataset.src) return;
  if (state.started) {
   if (state.active && priority > 0 && image.fetchPriority === 'low') image.fetchPriority = 'auto';
   return;
  }
  if (!queue.has(image) || priority > queue.get(image)) queue.set(image, priority);
  schedule();
 }

 function ready(image) {
  const state = states.get(image);
  return Boolean(state?.readySource && state.readySource === image.currentSrc && image.naturalWidth);
 }

 function cancelQueued(image) { queue.delete(image); }

 window.EllisStageImages = {watch, request, ready, cancelQueued};
})();

