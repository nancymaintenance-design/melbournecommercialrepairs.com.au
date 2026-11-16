/* Calibrated key-state illustrations; driven exclusively by EllisMotion. */
(() => {
  'use strict';
  const clamp = n => Math.max(0, Math.min(1, n));
  const stateByView={all:0,building:1,systems:2,grounds:3};
  // Camera anchors are the original approved H2 adapter's exact view targets.
  const views={all:[0,0,1],building:[6,-2,1.08],systems:[-1,-2,1.10],grounds:[-3,-11,1.10]};
  const labels={all:['商业物业全景','COMPLETE PROPERTY CARE'],building:['建筑 · 室内 · 防水','BUILDINGS · INTERIORS · WATERPROOFING'],systems:['空调 · 通风 · 水电','HVAC · VENTILATION · SERVICES'],grounds:['园林 · 场地 · 清洁','LANDSCAPING · GROUNDS · CLEANING']};
  window.createEllisScene = host => {
    const images = [...host.querySelectorAll('.motion-state')];
    const camera = host.querySelector('.building-camera');
    camera.insertAdjacentHTML('beforebegin','<div class="arch-route" aria-hidden="true"><i></i></div>');
    camera.insertAdjacentHTML('afterend','<div class="arch-callout" aria-hidden="true"></div>');
    const callout=host.querySelector('.arch-callout');
    const unavailable=host.querySelector('.visual-unavailable');
    const ready = new Set();
    const loaded = new Set();
    const decoding = new Map();
    let progress = 0, paused = false, view = 'all', exploded=false, lastGood = 0, disposed = false;
    let shown=-1,desired=0,swapping=false,generation=0,animation=null;
    const style=(node,key,value)=>{if(node.style.getPropertyValue?.(key)!==value)node.style.setProperty(key,value)};
    function show(index){
      if(shown===index)return;
      shown=index;
      if(ready.has(index))lastGood=index;
      images.forEach((image,i)=>{image.style.opacity=i===index?'1':'0';image.style.clipPath='none';});
      host.dataset.visualState=String(index);
    }
    function cancelSwap(){
      generation++;animation?.cancel();animation=null;swapping=false;
    }
    function selectState(index){
      desired=index;
      if(paused||document.hidden||!camera.animate){if(swapping)cancelSwap();show(index);return;}
      if(swapping||shown===index)return;
      swapping=true;const token=++generation;
      // Whole-picture handoff: one illustration at a time, no masks or overlaps.
      // Keep a visible silhouette throughout instead of fading to an empty stage.
      animation=camera.animate([{opacity:1},{opacity:.65}],{duration:140,fill:'forwards',easing:'ease-out'});
      animation.finished.then(()=>{
        if(disposed||token!==generation)return;
        show(desired);animation.cancel();
        animation=camera.animate([{opacity:.65},{opacity:1}],{duration:220,fill:'forwards',easing:'ease-in'});
        return animation.finished.then(()=>{
          if(disposed||token!==generation)return;
          animation.cancel();animation=null;swapping=false;
          if(shown!==desired)selectState(desired);
        });
      }).catch(()=>{});
    }
    function paint() {
      if (disposed) return;
      // Each project has exactly one user-confirmed picture. No secondary old frames.
      const requested=stateByView[view]??0;
      const available=ready.has(requested)?requested:ready.has(lastGood)?lastGood:[...ready][0]??0;
      selectState(available);
      const target=views[view]||views.all;
      const stops=[0,.18,.51,.81,1],phase=stateByView[view]??0;
      const local=clamp((progress-stops[phase])/(stops[phase+1]-stops[phase]));
      const arc=Math.sin(local*Math.PI);
      style(camera,'--camera-scale', paused ? '1' : String(target[2]+(exploded?.05:0)+arc*.008));
      style(camera,'--camera-x', paused ? '0%' : `${target[0]+arc*1.1+local*.3}%`);
      style(camera,'--camera-y', paused ? '0%' : `${Math.min(0,target[1]-arc*.65-local*.2)}%`);
      const label=(labels[view]||labels.all)[document.documentElement.lang==='en'?1:0];
      if(callout.textContent!==label)callout.textContent=label;
      if(host.dataset.view!==view)host.dataset.view=view;
      if(host.dataset.motionRunning!==String(!paused))host.dataset.motionRunning=String(!paused);
      if(host.dataset.renderer!=='calibrated-key-states')host.dataset.renderer='calibrated-key-states';
      if(unavailable.hidden!==(loaded.size>0))unavailable.hidden=loaded.size>0;
    }
    const handlers = images.map((img,i) => {
      // Decode each source once, off the visible handoff. Keep the last ready
      // illustration until the requested image can be painted without a decode stall.
      const load = () => {
        if(disposed||!img.naturalWidth||decoding.has(i))return;
        loaded.add(i);
        const job=Promise.resolve().then(()=>typeof img.decode==='function'?img.decode():undefined);
        decoding.set(i,job);
        job.then(()=>{if(disposed)return;ready.add(i);if(shown===i)lastGood=i;paint();},()=>{if(!disposed){ready.delete(i);loaded.delete(i);paint();}});
      };
      const error = () => { ready.delete(i); loaded.delete(i); decoding.delete(i); if(!disposed)paint(); };
      img.addEventListener('load',load); img.addEventListener('error',error);
      if(img.complete && img.naturalWidth) load();
      return () => { img.removeEventListener('load',load); img.removeEventListener('error',error); };
    });
    show(0);paint();
    document.addEventListener('ellislanguagechange',paint);
    return {
      setFrame(next) {
        const p=clamp(Number(next.progress)||0),e=!!next.exploded,s=!!next.paused;
        if(view===next.view&&progress===p&&exploded===e&&paused===s)return;
        view=next.view;progress=p;exploded=e;paused=s;paint();
      },
      setView(value) { if(view!==value){view=value;paint();} },
      setExploded(value) { if(exploded!==!!value){exploded=!!value;paint();} },
      setPaused(value) { if(paused!==!!value){paused=!!value;paint();} },
      setScroll(value) { const p=clamp(Number(value)||0);if(progress!==p){progress=p;paint();} },
      destroy() { disposed=true; cancelSwap(); handlers.forEach(remove=>remove()); document.removeEventListener('ellislanguagechange',paint);host.querySelector('.arch-route')?.remove();callout.remove(); }
    };
  };
})();
