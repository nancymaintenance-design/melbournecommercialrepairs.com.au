/* Independent editorial interactions; copy and links stay in real HTML. */
(() => {
  const module = document.querySelector('[data-ie-module]');
  if (!module || module.dataset.ieMounted) return;
  module.dataset.ieMounted = 'true';
  const cards = [...module.querySelectorAll('[data-ie-card]')];
  const buttons = [...module.querySelectorAll('[data-ie-filter]')];
  const shelf = module.querySelector('[data-ie-shelf]');
  const status = module.querySelector('[data-ie-status]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(pointer:fine)');
  let active = 'all', frame = 0;
  const updateStatus = () => {
    const count = cards.filter(card => !card.hidden).length;
    status.textContent = active === 'all' ? '' : document.documentElement.lang === 'en' ? `${count} insight` : `${count} 篇资讯`;
    module.querySelector('[data-ie-filters]').setAttribute('aria-label', document.documentElement.lang === 'en' ? 'Article categories' : '资讯分类');
  };
  buttons.forEach(button => button.addEventListener('click', () => {
    active = button.dataset.ieFilter;
    buttons.forEach(item => { const selected = item === button; item.classList.toggle('is-active', selected); item.setAttribute('aria-pressed', String(selected)); });
    cards.forEach(card => { card.hidden = active !== 'all' && card.dataset.ieTopic !== active; });
    shelf.classList.toggle('is-filtered', active !== 'all');
    updateStatus();
  }));
  document.querySelector('#language-switch')?.addEventListener('click', () => queueMicrotask(updateStatus));
  cards.forEach(card => {
    card.addEventListener('pointermove', event => {
      if (reduced.matches || !finePointer.matches) return;
      const bounds = card.getBoundingClientRect();
      card.style.setProperty('--ie-x', `${((event.clientX - bounds.left) / bounds.width - .5) * -9}px`);
      card.style.setProperty('--ie-y', `${((event.clientY - bounds.top) / bounds.height - .5) * -7}px`);
    });
    card.addEventListener('pointerleave', () => { card.style.setProperty('--ie-x', '0px'); card.style.setProperty('--ie-y', '0px'); });
  });
  const updateScroll = () => {
    frame = 0;
    if (reduced.matches) return;
    const bounds = shelf.getBoundingClientRect();
    if (bounds.top > innerHeight || bounds.bottom < 0) return;
    const shift = Math.max(-7, Math.min(7, (innerHeight / 2 - bounds.top - bounds.height / 2) * .018));
    cards.forEach((card, index) => card.style.setProperty('--ie-scroll', `${shift * (index === 0 ? 1 : .6)}px`));
  };
  const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateScroll); };
  addEventListener('scroll', onScroll, {passive:true});
  reduced.addEventListener('change', () => {
    document.body.classList.toggle('ie-motion-ready', !reduced.matches);
    if (reduced.matches) cards.forEach(card => { card.style.setProperty('--ie-x', '0px'); card.style.setProperty('--ie-y', '0px'); card.style.setProperty('--ie-scroll', '0px'); });
    else onScroll();
  });
  document.body.classList.toggle('ie-motion-ready', !reduced.matches);
  updateStatus();
  onScroll();
})();
