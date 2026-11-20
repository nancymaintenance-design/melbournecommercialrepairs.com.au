(() => {
  const flow = document.querySelector('.sector-flow');
  const header = document.querySelector('.site-header');
  const root = document.documentElement;
  const nav = flow.querySelector('.sector-flow-nav');
  const links = [...nav.querySelectorAll('a')];
  const chapters = links.map(link => document.getElementById(link.hash.slice(1)));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const parallax = matchMedia('(min-width: 761px) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  const hall = flow.querySelector('.sector-flow-chapter-4 [data-flow-art]');
  let current = 0;
  let pending = false;
  let stickyTop = 0;

  function measure() {
    stickyTop = Math.ceil(header.getBoundingClientRect().bottom) + 8;
    const documentPadding = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
    const offset = stickyTop + nav.offsetHeight + 12 - documentPadding;
    flow.style.setProperty('--sector-anchor-offset', Math.max(0, offset) + 'px');
    nav.style.top = stickyTop + 'px';
    scheduleUpdate();
  }

  function update() {
    pending = false;
    const cutoff = stickyTop + nav.offsetHeight + 18;
    let active = 0;
    for (const [index, chapter] of chapters.entries()) {
      if (chapter.getBoundingClientRect().top <= cutoff) active = index;
    }
    if (active !== current) {
      links[current].removeAttribute('aria-current');
      links[active].setAttribute('aria-current', 'location');
      current = active;
      const link = links[current].getBoundingClientRect();
      const rail = nav.getBoundingClientRect();
      if (link.left < rail.left || link.right > rail.right) {
        nav.scrollTo({
          left: nav.scrollLeft + link.left - rail.left - 8,
          behavior: reduced.matches ? 'instant' : 'smooth'
        });
      }
    }
    if (hall) {
      const bounds = hall.getBoundingClientRect();
      const isVisible = bounds.bottom > 0 && bounds.top < innerHeight;
      const shift = Math.max(-9, Math.min(9, (innerHeight / 2 - bounds.top - bounds.height / 2) * .018));
      if (isVisible || !parallax.matches) hall.style.setProperty('--scene-shift', parallax.matches ? shift + 'px' : '0px');
    }
  }

  function scheduleUpdate() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(update);
  }

  measure();
  const resize = new ResizeObserver(measure);
  resize.observe(header);
  resize.observe(nav);
  window.addEventListener('resize', measure, {passive: true});
  window.addEventListener('scroll', scheduleUpdate, {passive: true});
  parallax.addEventListener('change', scheduleUpdate);

  if (window.IntersectionObserver) {
    const reveal = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in-view');
        reveal.unobserve(entry.target);
      }
    }, {threshold: .18});
    for (const chapter of chapters) reveal.observe(chapter);
    for (const step of flow.querySelectorAll('[data-flow-step]')) reveal.observe(step);
  }

  for (const scene of flow.querySelectorAll('[data-flow-art]')) {
    const buttons = [...scene.querySelectorAll('[data-scene-label]')];
    const pins = [...scene.querySelectorAll('[data-scene-pin]')];
    for (const button of buttons) {
      button.disabled = false;
      button.addEventListener('click', () => {
        const open = button.getAttribute('aria-expanded') === 'false';
        for (const [index, item] of buttons.entries()) {
          const show = item === button && open;
          item.setAttribute('aria-expanded', String(show));
          document.getElementById(item.getAttribute('aria-controls')).hidden = !show;
          pins[index].classList.toggle('is-selected', show);
        }
      });
    }
  }
})();
