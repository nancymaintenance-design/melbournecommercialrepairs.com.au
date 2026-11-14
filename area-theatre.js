/* Local Melbourne scene controller. It never moves the page or its copy/cards. */
(() => {
  'use strict';
  const mounted = new WeakSet();
  const phrase = 'I love Melbourne';
  const family = '"Ellis Pacifico"';
  let fontPromise;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const smooth = value => value * value * (3 - 2 * value);
  function loadScriptFont() {
    if (!fontPromise) fontPromise = document.fonts
      ? document.fonts.load('100px "Ellis Pacifico"', phrase)
        .then(faces => faces.length > 0 && document.fonts.check('100px "Ellis Pacifico"', phrase)).catch(() => false)
      : Promise.resolve(false);
    return fontPromise;
  }
  function nightAlpha(hour) {
    const h = ((hour % 24) + 24) % 24;
    if (h >= 8 && h < 17) return 0;
    if (h >= 17 && h < 20) return smooth((h - 17) / 3);
    if (h >= 20 || h < 5) return 1;
    return 1 - smooth((h - 5) / 3);
  }

  function sceneWeights(hour) {
    const h = ((hour % 24) + 24) % 24;
    if (h < 6 || h >= 20) return { day: 0, dusk: 0, night: 1 };
    if (h < 7) { const p = smooth(h - 6); return { day: 0, dusk: p, night: 1 - p }; }
    if (h < 8) { const p = smooth(h - 7); return { day: p, dusk: 1 - p, night: 0 }; }
    if (h < 17) return { day: 1, dusk: 0, night: 0 };
    if (h < 18.5) { const p = smooth((h - 17) / 1.5); return { day: 1 - p, dusk: p, night: 0 }; }
    const p = smooth((h - 18.5) / 1.5);
    return { day: 0, dusk: 1 - p, night: p };
  }

  function mount(root) {
    if (mounted.has(root) || root.dataset.maMounted === '1') return;
    const stage = root.querySelector('.ma-stage');
    const scene = root.querySelector('.ma-scene');
    const images = [...root.querySelectorAll('.ma-scene img[data-ma-phase]')];
    const canvas = root.querySelector('canvas.ma-particles');
    if (!stage || !scene || !images.length) return;
    mounted.add(root);
    root.dataset.maMounted = '1';
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const small = matchMedia('(max-width: 700px), (pointer: coarse)');
    const fine = matchMedia('(pointer: fine)');
    const context = canvas?.getContext('2d');
    const state = {
      hour: 14, frozen: false, visible: false, frame: 0, last: 0, elapsed: 0,
      width: 1, height: 1, points: [], specks: [], font: 24, fontReady: false,
      textX: 0, textY: 0, inkWidth: 0, glyph: null,
      pointerX: 0, pointerY: 0, x: 0, y: 0, scrollY: 0, scrollDirty: true
    };
    if (canvas) {
      canvas.setAttribute('aria-hidden', 'true');
      canvas.style.pointerEvents = 'none';
      let text = root.querySelector('[data-ma-particle-text],.ma-particle-text');
      if (!text) {
        text = document.createElement('span');
        text.className = 'ma-particle-text sr-only';
        text.dataset.maParticleText = '';
        text.textContent = 'I love Melbourne';
        text.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0';
        root.append(text);
      }
      text.textContent = 'I love Melbourne';
    }

    function renderTime() {
      const weights = sceneWeights(state.hour);
      // Convert desired contributions into source-over opacity in DOM order.
      // This keeps the composite opaque during transitions between RGB photos.
      let below = 0;
      images.forEach((image, index) => {
        const contribution = weights[image.dataset.maPhase] || 0;
        below += contribution;
        image.style.opacity = (below > 0 ? contribution / below : 0).toFixed(5);
        image.style.zIndex = String(index);
      });
      const h = ((state.hour % 24) + 24) % 24;
      root.dataset.phase = h >= 8 && h < 17 ? 'day' : h >= 6 && h < 20 ? 'dusk' : 'night';
      root.dataset.hour = state.hour.toFixed(3);
      root.dataset.maNightAlpha = nightAlpha(state.hour).toFixed(4);
    }

    function measureScroll() {
      const rect = stage.getBoundingClientRect();
      const viewport = Math.max(1, innerHeight);
      state.scrollY = clamp((viewport / 2 - rect.top - rect.height / 2) / (viewport / 2 + rect.height / 2), -1, 1) * 3;
      state.scrollDirty = false;
    }

    function fitGlyph(sampleContext) {
      sampleContext.textAlign = 'left'; sampleContext.textBaseline = 'alphabetic';
      const target = state.width * .5;
      let size = 100, metrics;
      // Advance width excludes script swashes; fit the complete visible ink.
      for (let pass = 0; pass < 4; pass++) {
        sampleContext.font = `${size}px ${family}`;
        metrics = sampleContext.measureText(phrase);
        const ink = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
        const width = Number.isFinite(ink) && ink > 0 ? ink : metrics.width;
        size *= target / Math.max(1, width);
      }
      state.font = size;
      sampleContext.font = `${state.font}px ${family}`;
      metrics = sampleContext.measureText(phrase);
      const left = metrics.actualBoundingBoxLeft ?? 0;
      const right = metrics.actualBoundingBoxRight ?? metrics.width;
      const ascent = metrics.actualBoundingBoxAscent ?? state.font * .8;
      const descent = metrics.actualBoundingBoxDescent ?? state.font * .2;
      state.inkWidth = left + right;
      state.textX = state.width / 2 + (left - right) / 2;
      state.textY = state.height / 2 + (ascent - descent) / 2;
      root.dataset.maGlyphWidth = state.inkWidth.toFixed(2);
      root.dataset.maGlyphTarget = target.toFixed(2);
    }

    function buildParticles() {
      if (!canvas || !context) return;
      const rect = canvas.getBoundingClientRect();
      state.width = Math.max(1, rect.width || stage.clientWidth);
      state.height = Math.max(1, rect.height || stage.clientHeight * .28);
      const ratio = Math.min(1.5, devicePixelRatio || 1);
      canvas.width = Math.round(state.width * ratio);
      canvas.height = Math.round(state.height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      state.points = []; state.specks = []; state.glyph = null;
      if (!state.fontReady) { drawParticles(); return; }
      const sample = document.createElement('canvas');
      sample.width = Math.ceil(state.width); sample.height = Math.ceil(state.height);
      const sampleContext = sample.getContext('2d', { willReadFrequently: true });
      if (!sampleContext) return;
      fitGlyph(sampleContext);
      sampleContext.fillStyle = '#ffb8df';
      sampleContext.fillText(phrase, state.textX, state.textY);
      state.glyph = sample;
      const mask = sampleContext.getImageData(0, 0, sample.width, sample.height).data;
      const candidates = [];
      // One-pixel sampling preserves the fine connections between letters.
      for (let y = 0; y < sample.height; y++) {
        for (let x = 0; x < sample.width; x++) {
          if (mask[(y * sample.width + x) * 4 + 3] > 96) candidates.push({ x, y });
        }
      }
      const budget = small.matches ? 1400 : 4500;
      const speckCount = small.matches ? 18 : 40;
      const count = Math.min(candidates.length, budget - speckCount);
      state.points = Array.from({ length: count }, (_, index) => {
        const point = candidates[Math.floor(index * candidates.length / count)];
        return { ...point, radius: small.matches ? .68 + (index % 4) * .11 : 1.1 + (index % 4) * .1 };
      });
      state.specks = Array.from({ length: speckCount }, (_, index) => ({
        x: state.width * (.25 + ((index * .618034) % 1) * .5),
        y: state.height * (.27 + ((index * .381966) % 1) * .46),
        seed: index * 1.83, radius: .7 + (index % 3) * .2
      }));
      root.dataset.maParticleCount = String(state.points.length + state.specks.length);
      drawParticles();
    }

    function drawParticles() {
      if (!context) return;
      context.clearRect(0, 0, state.width, state.height);
      const opacity = nightAlpha(state.hour);
      if (!state.fontReady || opacity <= 0) return;
      context.fillStyle = '#ffb8df';
      context.globalAlpha = opacity;
      if (reduce.matches) {
        context.font = `${state.font}px ${family}`;
        context.textAlign = 'left'; context.textBaseline = 'alphabetic';
        context.fillText(phrase, state.textX, state.textY);
        context.globalAlpha = 1;
        return;
      }
      const lift = Math.sin(state.elapsed * Math.PI / 3);
      // A crisp, pre-rendered 12% ink layer connects the script's finest strokes.
      // It shares the exact sampled font/position and the same night-time fade.
      if (state.glyph) {
        context.globalAlpha = opacity * .12;
        context.drawImage(state.glyph, 0, lift);
      }
      context.globalAlpha = opacity * (.95 + .05 * Math.cos(state.elapsed * Math.PI / 3));
      // One glyph path/fill keeps the denser point cloud inexpensive to paint.
      context.beginPath();
      state.points.forEach(point => {
        const y = point.y + lift;
        context.moveTo(point.x + point.radius, y);
        context.arc(point.x, y, point.radius, 0, Math.PI * 2);
      });
      context.fill();
      state.specks.forEach(point => {
        context.globalAlpha = opacity * (.25 + .3 * (.5 + .5 * Math.sin(point.seed + state.elapsed)));
        context.beginPath();
        context.arc(point.x + Math.sin(point.seed + state.elapsed * .3) * 2,
          point.y + Math.cos(point.seed + state.elapsed * .3) * 3, point.radius, 0, Math.PI * 2);
        context.fill();
      });
      context.globalAlpha = 1;
    }

    function canAnimate() { return state.visible && !document.hidden && !reduce.matches && root.isConnected; }
    function stop() {
      if (state.frame) cancelAnimationFrame(state.frame);
      state.frame = 0; state.last = 0;
    }
    function tick(now) {
      state.frame = 0;
      if (!canAnimate()) { state.last = 0; return; }
      const seconds = state.last ? Math.max(0, (now - state.last) / 1000) : 0;
      state.last = now; state.elapsed += seconds;
      if (!state.frozen) state.hour = (state.hour + seconds * .25) % 24;
      if (state.scrollDirty) measureScroll();
      state.x += (state.pointerX - state.x) * .12;
      state.y += (state.scrollY + state.pointerY - state.y) * .12;
      scene.style.setProperty('--ma-city-x', `${state.x.toFixed(2)}px`);
      scene.style.setProperty('--ma-city-y', `${state.y.toFixed(2)}px`);
      renderTime(); drawParticles();
      state.frame = requestAnimationFrame(tick);
    }
    function resume() {
      if (canAnimate() && !state.frame) { state.last = 0; state.frame = requestAnimationFrame(tick); }
    }
    function setTestTime(raw) {
      const value = Number(raw);
      if (!Number.isFinite(value)) return;
      state.hour = clamp(value, 0, 24); state.frozen = true;
      renderTime(); drawParticles();
    }

    // Test-only time freeze. There is deliberately no public playback UI.
    root.addEventListener('ma:set-time', event => setTestTime(event.detail?.hour ?? event.detail));
    stage.addEventListener('pointermove', event => {
      if (reduce.matches || !fine.matches || event.pointerType === 'touch') return;
      const rect = stage.getBoundingClientRect();
      state.pointerX = clamp((event.clientX - rect.left) / Math.max(1, rect.width) - .5, -.5, .5) * 4;
      state.pointerY = clamp((event.clientY - rect.top) / Math.max(1, rect.height) - .5, -.5, .5) * 4;
    });
    stage.addEventListener('pointerleave', () => { state.pointerX = 0; state.pointerY = 0; });
    addEventListener('scroll', () => { state.scrollDirty = true; }, { passive: true });
    addEventListener('resize', () => { state.scrollDirty = true; buildParticles(); }, { passive: true });
    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else { state.scrollDirty = true; resume(); } });
    reduce.addEventListener('change', () => {
      stop(); state.x = 0; state.y = 0; state.pointerX = 0; state.pointerY = 0;
      scene.style.setProperty('--ma-city-x', '0px'); scene.style.setProperty('--ma-city-y', '0px');
      drawParticles(); renderTime(); resume();
    });
    small.addEventListener('change', buildParticles);
    const resize = new ResizeObserver(() => { state.scrollDirty = true; buildParticles(); renderTime(); });
    resize.observe(stage); if (canvas) resize.observe(canvas);
    const box = stage.getBoundingClientRect();
    state.visible = box.bottom > 0 && box.top < innerHeight && box.width > 0 && box.height > 0;
    if (state.visible) root.classList.add('ma-has-entered');
    if ('IntersectionObserver' in window) {
      const visibility = new IntersectionObserver(entries => {
        state.visible = entries.some(entry => entry.isIntersecting && entry.intersectionRatio > 0);
        if (state.visible) { root.classList.add('ma-has-entered'); state.scrollDirty = true; resume(); } else stop();
      }, { threshold: 0 });
      visibility.observe(stage);
    }
    buildParticles(); renderTime(); resume();
    loadScriptFont().then(ready => {
      state.fontReady = ready;
      root.dataset.maFont = ready ? 'ready' : 'unavailable';
      if (ready) buildParticles();
    });
  }

  function start() { document.querySelectorAll('[data-area-theatre]').forEach(mount); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
