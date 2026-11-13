/* Ellis Services Group — native-scroll motion, progressive enhancement. */
(() => {
  'use strict';

  function initMotion() {
    const root = document.documentElement;
    const body = document.body;
    if (!body || window.EllisMotion) return;
    const $ = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
    const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
    const revealSelector = '[data-reveal],.service-card,.news-card,.area-card,.faq-list details,.sector-film-card,.sector-tab,.sector-detail,.about-graphic,.contact-section,.footer-columns>div,.footer-columns>nav';
    const media = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    let systemReduced = !!media?.matches;
    let userPaused = !systemReduced && ($('#pause-toggle')?.getAttribute('aria-pressed') === 'true');
    let disabled = systemReduced || userPaused || window.innerHeight < 720;
    let frame = 0, measureNeeded = true, destroyed = false, syncingHero = false;
    let viewportHeight = window.innerHeight, headerHeight = 0, documentHeight = 1;
    let story = null, storyPin = null, storyNode = null, chapters = [], steps = [], counters = [];
    let storyScene = null, sceneAttempted = false, sceneChapter = -1, scenePaused = null, sceneScroll = -1;
    let currentChapter = -1, currentStoryProgress = 0, chapterMode = null;
    let wheelStep=-1, wheelLastAt=0, wheelPosition=0;
    const wheelStops=[0,.18,.51,.81,1];
    function wheelProgress(position){const phase=Math.min(3,Math.floor(position/5));return wheelStops[phase]+(wheelStops[phase+1]-wheelStops[phase])*((position-phase*5)/5);}
    let sectors = [], parallax = [], keyboardInput = false;
    const registered = new WeakSet();
    const pendingReveals = new Set();
    const parallaxRecords = new WeakMap();
    const listeners = [];

    function listen(target, type, handler, options) {
      target.addEventListener(type, handler, options);
      listeners.push(() => target.removeEventListener(type, handler, options));
    }
    function setStyle(element, name, value) {
      if (element && element.style.getPropertyValue(name) !== value) element.style.setProperty(name, value);
    }
    function setText(element, value) {
      if (element && element.textContent !== value) element.textContent = value;
    }
    function setAttribute(element, name, value) {
      if (element && element.getAttribute(name) !== value) element.setAttribute(name, value);
    }
    function isEnglish() { return /^en\b/i.test(root.lang); }

    function reveal(element) {
      if (!element) return;
      element.classList.add('is-revealed');
      pendingReveals.delete(element);
      revealObserver?.unobserve(element);
    }
    const revealObserver = window.IntersectionObserver ? new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) reveal(entry.target); });
    }, { rootMargin: '0px 0px -5% 0px', threshold: 0.08 }) : null;
    const ambientObserver=window.IntersectionObserver?new IntersectionObserver(entries=>{
      entries.forEach(entry=>entry.target.classList.toggle('fx-visible',entry.isIntersecting));
    },{rootMargin:'60px 0px',threshold:0}):null;

    function registerReveal(element) {
      if (registered.has(element)) return;
      registered.add(element);
      ambientObserver?.observe(element);
      if (!element.hasAttribute('data-reveal')) element.setAttribute('data-reveal', '');
      if (!element.style.getPropertyValue('--reveal-delay')) {
        const siblings = element.parentElement ? [...element.parentElement.children].filter(node => node.matches(revealSelector)) : [element];
        const index = Math.max(0, siblings.indexOf(element));
        const explicit = Number.parseFloat(element.getAttribute('data-reveal-delay'));
        setStyle(element, '--reveal-delay', `${Number.isFinite(explicit) ? clamp(explicit, 0, 600) : (index % 4) * 110}ms`);
      }
      if (disabled || !revealObserver || element.classList.contains('is-revealed')) reveal(element);
      else { pendingReveals.add(element); revealObserver.observe(element); }
    }
    function registerTree(node) {
      if (!node || node.nodeType !== 1) return;
      if (node.matches(revealSelector)) registerReveal(node);
      $$(revealSelector, node).forEach(registerReveal);
    }

    function updateLabels() {
      const button = $('#motion-switch');
      if (!button) return;
      const english = isEnglish();
      const label = systemReduced
        ? (english ? 'Reduced motion' : '已减少动态')
        : disabled ? (english ? 'Resume motion' : '开启动效') : (english ? 'Pause motion' : '暂停动效');
      const description = systemReduced
        ? (english ? 'Reduced motion follows your system preference' : '已遵循系统的减少动态效果设置')
        : disabled ? (english ? 'Resume page animations' : '恢复页面动态效果') : (english ? 'Pause page animations' : '暂停页面动态效果');
      setAttribute(button, 'aria-label', description);
      setAttribute(button, 'title', description);
      setAttribute(button, 'aria-pressed', String(disabled));
      setAttribute(button, 'aria-disabled', String(systemReduced));
      button.disabled = systemReduced;
      setText($('[data-motion-label]', button), label);
      setText($('.motion-switch-icon', button), systemReduced ? '◐' : disabled ? '▶' : 'Ⅱ');
    }

    function syncHeroPause() {
      const heroButton = $('#pause-toggle');
      if (!heroButton || syncingHero || heroButton.getAttribute('aria-pressed') === String(disabled)) return;
      // app.js owns the first scene; use its existing control to update its state.
      syncingHero = true;
      try { heroButton.click(); } finally { syncingHero = false; }
    }
    function applyMode(syncHero = true) {
      disabled = systemReduced || userPaused || window.innerHeight < 720;
      if (syncHero) syncHeroPause();
      body.classList.toggle('motion-paused', disabled);
      body.classList.toggle('motion-reduced', disabled);
      if (disabled) [...pendingReveals].forEach(reveal);
      updateLabels();
      chapterMode = null;
      setScenePaused(disabled || document.hidden || !isSceneVisible());
      schedule(true);
    }

    function setScenePaused(value) {
      if (!storyScene || scenePaused === value) return;
      scenePaused = value;
      storyScene.setPaused?.(value);
    }
    function isSceneVisible() {
      if (!storyNode) return false;
      const rect = storyNode.getBoundingClientRect();
      return rect.bottom > headerHeight && rect.top < viewportHeight && rect.width > 0 && rect.height > 0;
    }
    function applySceneChapter(index) {
      if (!storyScene || sceneChapter === index) return;
      sceneChapter = index;
      storyScene.setView?.(['all', 'building', 'systems', 'grounds'][index]);
      storyScene.setExploded?.(index === 2);
    }
    function ensureStoryScene() {
      if (destroyed || document.hidden || !storyNode || sceneAttempted || typeof window.createEllisScene !== 'function') return;
      const rect = storyNode.getBoundingClientRect();
      if (rect.top > viewportHeight + 650 || rect.bottom < -650) return;
      sceneAttempted = true;
      try {
        // This may be a canvas or a visual adapter element; the public API is identical.
        storyScene = window.createEllisScene(storyNode);
        sceneChapter = -1; scenePaused = null; sceneScroll = -1;
        setScenePaused(disabled || !isSceneVisible());
        applySceneChapter(Math.max(0, currentChapter));
        storyScene?.setScroll?.(currentStoryProgress);
        sceneScroll = currentStoryProgress;
      } catch {
        storyScene = null;
        storyNode.dataset.motionScene = 'unavailable';
      }
    }
    function sceneRestore() {
      storyScene?.destroy?.(); storyScene = null;
      sceneAttempted = false; scenePaused = null; sceneChapter = -1;
      if (storyNode) delete storyNode.dataset.error;
      ensureStoryScene(); schedule();
    }
    const sceneObserver = window.IntersectionObserver ? new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) ensureStoryScene();
      schedule();
    }, { rootMargin: '650px 0px' }) : null;

    function readStructure() {
      story = $('#home');
      storyPin = story ? $('.care-pin', story) : null;
      chapters = story ? $$('[data-story-chapter]', story) : [];
      steps = story ? $$('[data-story-step]', story) : [];
      counters = story ? $$('[data-story-current]', story) : [];
      const nextNode = $('#story-canvas');
      if (nextNode !== storyNode) {
        if (storyNode) { sceneObserver?.unobserve(storyNode); storyNode.removeEventListener('ellis-scene-restore', sceneRestore); }
        storyScene?.destroy?.(); storyScene = null;
        storyNode = nextNode; sceneAttempted = false; scenePaused = null; sceneChapter = -1;
        if (storyNode) { storyNode.addEventListener('ellis-scene-restore', sceneRestore); sceneObserver?.observe(storyNode); }
      }
      sectors = $$('.sector-journey').map(element => {
        const pin = $('.sector-pin', element), film = $('.sector-film', element), track = $('.sector-film-track', element);
        return { element, pin, film, track, native: window.innerWidth <= 700, overflow: film && track ? Math.max(0, track.scrollWidth - film.clientWidth) : 0 };
      }).filter(item => item.pin && item.film && item.track);
      parallax = $$('[data-parallax]').map(element => {
        let record = parallaxRecords.get(element);
        if (!record) { record = { element, last: 0, amplitude: 42 }; parallaxRecords.set(element, record); }
        const raw = Number.parseFloat(element.getAttribute('data-parallax'));
        record.amplitude = Number.isFinite(raw) ? clamp(Math.abs(raw) <= 1 ? raw * viewportHeight : raw, -140, 140) : 42;
        return record;
      });
      chapterMode = null;
    }
    function measure() {
      viewportHeight = Math.max(1, window.innerHeight || root.clientHeight);
      const header = $('.site-header');
      headerHeight = header ? header.getBoundingClientRect().height : 0;
      documentHeight = Math.max(root.scrollHeight, body.scrollHeight, viewportHeight);
      readStructure();
      measureNeeded = false;
    }

    function sectionMetrics(element, pin) {
      const rect = element.getBoundingClientRect();
      const pinHeight = pin?.offsetHeight || Math.max(1, viewportHeight - headerHeight);
      const range = Math.max(1, rect.height - pinHeight);
      return { rect, range, progress: clamp((headerHeight - rect.top) / range) };
    }
    function storyColor(progress) {
      // Original reference: continuous blue -> orange -> lime interpolation.
      // Purple/rose and amber are intermediate moments, never a shared fixed theme.
      const colors = [[36, 71, 255], [255, 90, 36], [216, 255, 62]];
      const part = Math.min(1, Math.floor(progress * 2));
      const t = clamp(progress * 2 - part);
      const smooth = t * t * (3 - 2 * t);
      const color = colors[part].map((value, index) => Math.round(value + (colors[part + 1][index] - value) * smooth));
      const linear = color.map(value => { const s = value / 255; return s <= .04045 ? s / 12.92 : Math.pow((s + .055) / 1.055, 2.4); });
      const luminance = linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722;
      return { bg: `rgb(${color.join(',')})`, fg: luminance < .18 ? '#f8f7f0' : '#13182a' };
    }
    function activateChapter(index) {
      index = clamp(index, 0, 3);
      if (currentChapter === index && chapterMode === disabled) return;
      currentChapter = index; chapterMode = disabled;
      chapters.forEach(element => {
        const active = Number(element.dataset.storyChapter) === index;
        element.classList.toggle('is-active', active);
        setAttribute(element, 'aria-hidden', String(!disabled && !active));
        element.inert = !disabled && !active;
      });
      steps.forEach(element => {
        const active = Number(element.dataset.storyStep) === index;
        element.classList.toggle('is-active', active);
        setAttribute(element, 'aria-pressed', String(active));
        if (active) setAttribute(element, 'aria-current', 'step'); else element.removeAttribute('aria-current');
      });
      counters.forEach(element => setText(element, String(Math.max(1,index)).padStart(2, '0')));
      if (story) story.dataset.activeChapter = String(index);
      applySceneChapter(index);
    }

    function update() {
      frame = 0;
      if (destroyed || document.hidden) return;
      if (measureNeeded) measure();
      const y = window.scrollY || root.scrollTop || 0;
      const pageProgress = clamp(y / Math.max(1, documentHeight - viewportHeight));
      const storyMetrics = story ? sectionMetrics(story, storyPin) : null;
      const sectorMetrics = sectors.map(item => ({ ...item, metrics: sectionMetrics(item.element, item.pin) }));
      // Read all geometry before updating transforms to avoid layout thrashing.
      const parallaxValues = parallax.map(record => {
        const rect = record.element.getBoundingClientRect();
        const centre = rect.top - record.last + rect.height / 2;
        const travel = clamp((viewportHeight / 2 - centre) / Math.max(1, viewportHeight / 2 + rect.height / 2), -1, 1);
        return { record, value: disabled ? 0 : travel * record.amplitude };
      });
      const sceneVisible = isSceneVisible();

      setStyle(root, '--page-progress', pageProgress.toFixed(5));
      if (storyMetrics) {
        const progress = disabled ? 0 : storyMetrics.progress;
        currentStoryProgress = progress;
        const color = storyColor(progress);
        setStyle(story, '--story-progress', progress.toFixed(5));
        const openingTravel=disabled?0:Math.max(0,y-story.offsetTop+headerHeight);
        setStyle(story, '--opening-y', `${-openingTravel.toFixed(2)}px`);
        setStyle(story, '--story-bg', color.bg);
        setStyle(story, '--story-fg', color.fg);
        setStyle(root, '--scene-nav-bg', color.bg);
        setStyle(root, '--scene-nav-fg', color.fg);
        setStyle(story, '--story-turn', `${(progress * 130 - 22).toFixed(2)}deg`);
        activateChapter(disabled ? Math.max(0, currentChapter) : (progress < .17 ? 0 : progress < .50 ? 1 : progress < .80 ? 2 : 3));
        const heroHeader=storyMetrics.rect.top<viewportHeight && storyMetrics.rect.bottom>headerHeight;
        body.classList.toggle('hero-header',heroHeader);
      }
      for (const item of sectorMetrics) {
        const progress = disabled ? 0 : item.native ? clamp(item.film.scrollLeft / Math.max(1, item.overflow)) : item.metrics.progress;
        const offset = disabled || item.native ? 0 : -item.overflow * progress;
        setStyle(item.element, '--sector-progress', progress.toFixed(5));
        setStyle(root, '--sector-progress', progress.toFixed(5));
        setStyle(item.track, '--sector-x', `${offset.toFixed(2)}px`);
        const transform = disabled || item.native ? 'none' : `translate3d(${offset.toFixed(2)}px,0,0)`;
        if (item.track.style.transform !== transform) item.track.style.transform = transform;
        if (!disabled && !item.native && item.film.scrollLeft) item.film.scrollLeft = 0;
      }
      parallaxValues.forEach(({ record, value }) => {
        record.last = value;
        setStyle(record.element, '--parallax-y', `${value.toFixed(2)}px`);
      });
      ensureStoryScene();
      setScenePaused(disabled || !sceneVisible);
      if (storyScene && Math.abs(sceneScroll - currentStoryProgress) > .0001) {
        sceneScroll = currentStoryProgress;
        storyScene.setScroll?.(currentStoryProgress);
      }
      if (!revealObserver) [...pendingReveals].forEach(reveal);
    }
    function schedule(needsMeasure = false) {
      if (destroyed) return;
      if (needsMeasure === true) measureNeeded = true;
      if (!frame && !document.hidden) frame = window.requestAnimationFrame(update);
    }

    function scrollToChapter(index) {
      if (!story) return;
      index = clamp(Number(index) || 0, 0, 3);
      if (disabled) {
        activateChapter(index);
        const chapter = chapters.find(element => Number(element.dataset.storyChapter) === index);
        if (chapter) window.scrollTo({ top: Math.max(0, chapter.getBoundingClientRect().top + window.scrollY - headerHeight - 24), behavior: 'auto' });
        return;
      }
      const metrics = sectionMetrics(story, storyPin);
      const top = metrics.rect.top + window.scrollY - headerHeight + metrics.range * wheelStops[index];
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
    function onStoryWheel(event){
      if(disabled||event.ctrlKey||event.metaKey||event.shiftKey||Math.abs(event.deltaX)>Math.abs(event.deltaY)||!event.deltaY||$('dialog[open]'))return;
      if(!story||!storyPin)return;
      const metrics=sectionMetrics(story,storyPin),start=metrics.rect.top+window.scrollY-headerHeight;
      if(window.scrollY<start-2||window.scrollY>start+metrics.range+2)return;
      const direction=Math.sign(event.deltaY),now=performance.now();
      const delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?viewportHeight:1);
      if(now-wheelLastAt>600&&Math.abs(metrics.progress-wheelProgress(wheelPosition))>.14)wheelPosition=Math.max(0,currentChapter)*5;
      if((wheelPosition===0&&direction<0)||(wheelPosition===20&&direction>0))return;
      event.preventDefault();
      // Trackpad momentum belongs to one gesture; discrete mouse notches can queue.
      if(Math.abs(delta)<60&&now-wheelLastAt<180){wheelLastAt=now;return;}
      wheelLastAt=now;
      wheelPosition=clamp(wheelPosition+direction,0,20);
      wheelStep=Math.min(3,Math.floor(wheelPosition/5));
      // Five deliberate inputs per scene; intermediate inputs move the camera.
      if(wheelPosition===20){$('#services')?.scrollIntoView({behavior:'smooth',block:'start'});return;}
      window.scrollTo({top:Math.max(0,start+metrics.range*wheelProgress(wheelPosition)),behavior:'smooth'});
    }
    function onClick(event) {
      const target = event.target instanceof Element ? event.target : event.target?.parentElement;
      if (!target) return;
      if (target.closest('#motion-switch')) {
        if (!systemReduced) { userPaused = !userPaused; applyMode(); }
      } else if (target.closest('#pause-toggle') && !syncingHero) {
        if (!systemReduced) userPaused = $('#pause-toggle')?.getAttribute('aria-pressed') === 'true';
        applyMode();
      } else {
        const step = target.closest('[data-story-step]');
        if (step && story?.contains(step)){wheelStep=Number(step.dataset.storyStep);wheelPosition=wheelStep*5;scrollToChapter(wheelStep);}
      }
    }
    function onFocus(event) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      let revealed = target.closest(revealSelector);
      while (revealed) { reveal(revealed); revealed = revealed.parentElement?.closest(revealSelector); }
      if (!keyboardInput || disabled) return;
      const card = target.closest('[data-sector-card]');
      const item = card && sectors.find(entry => entry.track.contains(card));
      if (!item || item.native || !item.overflow) return;
      const cardRect = card.getBoundingClientRect(), trackRect = item.track.getBoundingClientRect();
      const offset = clamp(cardRect.left - trackRect.left - (item.film.clientWidth - cardRect.width) / 2, 0, item.overflow);
      const metrics = sectionMetrics(item.element, item.pin);
      window.scrollTo({ top: Math.max(0, metrics.rect.top + window.scrollY - headerHeight + metrics.range * offset / item.overflow), behavior: 'smooth' });
    }
    function languageChange() { updateLabels(); schedule(true); }
    function visibilityChange() {
      if (document.hidden) {
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0; setScenePaused(true);
      } else schedule(true);
    }
    function mediaChange(event) { systemReduced = event.matches; applyMode(); }

    const mutationObserver = window.MutationObserver ? new MutationObserver(records => {
      let relevant = false;
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node.nodeType === 1) { registerTree(node); relevant = true; }
        }
        if ([...record.removedNodes].some(node => node.nodeType === 1)) relevant = true;
      }
      if (!relevant) return; // Ignore our own counter/label text updates.
      for (const element of pendingReveals) {
        if (!element.isConnected) { pendingReveals.delete(element); revealObserver?.unobserve(element); }
      }
      schedule(true);
    }) : null;
    const resizeObserver = window.ResizeObserver ? new ResizeObserver(() => schedule(true)) : null;

    registerTree(body);
    const ribbon=$('.service-ribbon');if(ribbon)ambientObserver?.observe(ribbon);
    body.classList.add('motion-ready');
    applyMode();
    mutationObserver?.observe(body, { childList: true, subtree: true });
    resizeObserver?.observe(body);
    const header = $('.site-header');
    if (header) resizeObserver?.observe(header);
    listen(window, 'scroll', () => schedule(), { passive: true });
    listen(window, 'wheel', onStoryWheel, { passive: false });
    listen(document, 'scroll', event => {
      if (event.target instanceof Element && event.target.matches('.sector-film')) schedule();
    }, { capture: true, passive: true });
    listen(window, 'resize', () => { applyMode(); schedule(true); }, { passive: true });
    listen(window, 'orientationchange', () => schedule(true), { passive: true });
    listen(window, 'load', () => schedule(true));
    listen(window, 'pageshow', () => schedule(true));
    listen(document, 'click', onClick);
    listen(document, 'focusin', onFocus);
    listen(document, 'pointerdown', () => { keyboardInput = false; }, { passive: true });
    listen(document, 'keydown', event => { if (event.key === 'Tab' || event.key.startsWith('Arrow')) keyboardInput = true; });
    listen(document, 'visibilitychange', visibilityChange);
    listen(document, 'ellislanguagechange', languageChange);
    listen(document, 'toggle', () => schedule(true), true);
    if (media?.addEventListener) listen(media, 'change', mediaChange);
    else if (media?.addListener) { media.addListener(mediaChange); listeners.push(() => media.removeListener(mediaChange)); }
    document.fonts?.ready?.then(() => schedule(true));

    window.EllisMotion = {
      refresh() { registerTree(body); updateLabels(); schedule(true); },
      setPaused(value) { userPaused = !!value; applyMode(); },
      get paused() { return disabled; },
      destroy() {
        if (destroyed) return;
        destroyed = true;
        if (frame) window.cancelAnimationFrame(frame);
        listeners.forEach(remove => remove());
        revealObserver?.disconnect(); ambientObserver?.disconnect(); sceneObserver?.disconnect(); mutationObserver?.disconnect(); resizeObserver?.disconnect();
        storyNode?.removeEventListener('ellis-scene-restore', sceneRestore);
        storyScene?.destroy?.(); storyScene = null;
        [...pendingReveals].forEach(reveal);
        chapters.forEach(element => { element.inert = false; setAttribute(element, 'aria-hidden', 'false'); });
        parallax.forEach(record => setStyle(record.element, '--parallax-y', '0px'));
        sectors.forEach(item => { item.track.style.transform = 'none'; });
        body.classList.remove('motion-ready'); body.classList.add('motion-reduced');
        delete window.EllisMotion;
      }
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initMotion, { once: true });
  else initMotion();
})();
