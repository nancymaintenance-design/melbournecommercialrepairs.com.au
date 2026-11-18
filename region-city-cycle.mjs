// Progressive enhancement for one overview photo. No timers, scroll listeners,
// canvas redraws, or changes to the hero's layout / accessibility text.
const root = document.querySelector('.region-v2-content.page-hub');
if (root) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const period = 24_000;
  let media, night, twilight, visible = false, ready = false;
  let revision = 0, elapsed = 0, runningSince = null, loadingRevision = null;

  function freezeClock() {
    if (runningSince !== null) elapsed = (elapsed + performance.now() - runningSince) % period;
    runningSince = null;
  }
  function update() {
    freezeClock();
    if (!media) return;
    const running = ready && visible && !document.hidden && !motion.matches;
    media.toggleAttribute('data-city-running', running);
    // Restore a single shared phase when a locale remount creates fresh layers.
    for (const layer of [night, twilight]) {
      for (const animation of layer?.getAnimations() || []) {
        if (animation.animationName?.startsWith('city-')) animation.currentTime = elapsed;
      }
    }
    if (running) runningSince = performance.now();
  }
  const visibility = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.target === media) {
      visible = entry.isIntersecting;
      update();
    }
  }, {threshold: 0});

  async function loadNight(token) {
    if (!media || motion.matches || ready || night || loadingRevision === token) return;
    loadingRevision = token;
    try {
      const target = media;
      const day = target.querySelector('.hero__image');
      // The existing high-priority daytime image gets the first network/decode slot.
      try { await day.decode(); } catch { return; }
      if (token !== revision || motion.matches || !target.isConnected) return;
      const incoming = new Image();
      incoming.alt = '';
      incoming.setAttribute('aria-hidden', 'true');
      incoming.className = 'city-cycle__night';
      incoming.decoding = 'async';
      incoming.fetchPriority = 'low';
      incoming.width = 1774;
      incoming.height = 887;
      incoming.style.objectPosition = getComputedStyle(day).objectPosition;
      night = incoming;
      incoming.src = '/assets/region-reference-v3/overview-city-night.webp';
      try { await incoming.decode(); } catch {
        if (token === revision) night = null;
        return; // A failed optional image leaves the original fully readable.
      }
      if (token !== revision || !target.isConnected) return;
      twilight = document.createElement('span');
      twilight.className = 'city-cycle__twilight';
      twilight.setAttribute('aria-hidden', 'true');
      target.append(incoming, twilight);
      ready = true;
      target.setAttribute('data-city-ready', '');
      update();
    } finally {
      if (loadingRevision === token) loadingRevision = null;
    }
  }
  function mount() {
    freezeClock();
    if (media) visibility.unobserve(media);
    revision++;
    media = root.querySelector('.hero--hub .hero__media');
    night = twilight = null;
    ready = visible = false;
    if (!media) return;
    visibility.observe(media);
    void loadNight(revision);
  }
  // Observe only replacement of the locale root, not descendants or our layers.
  new MutationObserver(mount).observe(root, {childList: true});
  document.addEventListener('visibilitychange', update);
  motion.addEventListener('change', () => {
    update();
    void loadNight(revision);
  });
  mount();
}
