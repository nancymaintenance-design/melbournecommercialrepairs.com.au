import { hydrateContactContext, validateEnquiry, createEmailDraft } from './contact-context.mjs';

const integrationObservers=[]; export function disposePage(){integrationObservers.splice(0).forEach(observer=>observer.disconnect());}
const hasDOM = typeof document !== 'undefined';
const reducedMotion = () => globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

/** Progressive disclosure: all complete content is available before this runs. */
export function initialiseSelectionGroup(wrapper, {
  triggerAttribute,
  panelAttribute,
  stateAttribute,
  eventName,
} = {}) {
  const triggers = Array.from(wrapper.querySelectorAll(`[${triggerAttribute}]`));
  const panels = Array.from(wrapper.querySelectorAll(`[${panelAttribute}]`));
  const choices = new Set(panels.map((panel) => panel.getAttribute(panelAttribute)));
  if (!triggers.length || !panels.length) return null;
  let current = triggers.find((trigger) => trigger.getAttribute('aria-pressed') === 'true')?.getAttribute(triggerAttribute);
  if (!choices.has(current)) current = panels[0].getAttribute(panelAttribute);

  const select = (value, animate = true) => {
    if (!choices.has(value)) return false;
    const changed = current !== value;
    current = value;
    wrapper.setAttribute(stateAttribute, value);
    for (const trigger of triggers) {
      const selected = trigger.getAttribute(triggerAttribute) === value;
      trigger.setAttribute('aria-pressed', String(selected));
      trigger.classList.toggle('is-active', selected);
    }
    for (const panel of panels) {
      const selected = panel.getAttribute(panelAttribute) === value;
      panel.hidden = !selected;
      panel.classList.toggle('is-active', selected);
      if (selected && changed && animate && !reducedMotion() && panel.animate) {
        panel.getAnimations?.().forEach((animation) => animation.cancel());
        panel.animate([
          { opacity: 0.75, transform: 'translateY(8px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ], { duration: 190, easing: 'cubic-bezier(.2,.7,.3,1)' });
      }
    }
    if (changed && eventName) {
      const CustomEventType = wrapper.ownerDocument.defaultView.CustomEvent;
      wrapper.dispatchEvent(new CustomEventType(eventName, {
        bubbles: true,
        detail: { index: value, region: wrapper.dataset.region || value },
      }));
    }
    return true;
  };
  select(current, false);
  wrapper.classList.add('is-enhanced');
  wrapper.addEventListener('click', (event) => {
    const trigger = event.target.closest(`[${triggerAttribute}]`);
    if (!trigger || !wrapper.contains(trigger)) return;
    select(trigger.getAttribute(triggerAttribute));
  });

  // Buttons retain native Tab/Space/Enter behavior; arrows are an added convenience.
  wrapper.addEventListener('keydown', (event) => {
    const trigger = event.target.closest(`[${triggerAttribute}]`);
    if (!trigger || !wrapper.contains(trigger) || event.ctrlKey || event.metaKey || event.altKey || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const group = trigger.closest('[data-choice-group], .scene-selector, .region-preview-controls') || trigger.parentElement;
    const peers = Array.from(group.querySelectorAll(`[${triggerAttribute}]`));
    if (peers.length < 2 || !peers.includes(trigger)) return;
    event.preventDefault();
    const at = peers.indexOf(trigger);
    const next = event.key === 'Home' ? 0
      : event.key === 'End' ? peers.length - 1
        : (at + (event.key === 'ArrowRight' ? 1 : -1) + peers.length) % peers.length;
    peers[next].focus();
    select(peers[next].getAttribute(triggerAttribute));
  });
  return Object.freeze({ select, get current() { return current; } });
}

function initialiseMenu(root) {
  const toggle = root.querySelector('[data-menu-toggle]');
  const menu = root.querySelector('[data-mobile-nav]');
  if (!toggle || !menu) return;
  const close = (restore = false) => {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    if (restore) toggle.focus();
  };
  close();
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    menu.hidden = expanded;
    toggle.setAttribute('aria-expanded', String(!expanded));
  });
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) close();
  });
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) {
      event.preventDefault();
      close(true);
    }
  });
  root.addEventListener('click', (event) => {
    if (!menu.hidden && !menu.contains(event.target) && !toggle.contains(event.target)) close();
  });
  globalThis.matchMedia?.('(min-width: 961px)').addEventListener?.('change', (event) => {
    if (event.matches) close();
  });
}

function initialiseMotion(root) {
  if (reducedMotion()) return;
  if ('IntersectionObserver' in globalThis) {
    const reveal = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target;
        element.classList.add('is-revealed');
        // No opacity:0 CSS gate: content is never blank while waiting for JS.
        if (element.animate) element.animate([
          { opacity: 0.82, transform: 'translateY(18px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ], { duration: 380, easing: 'cubic-bezier(.2,.7,.3,1)' });
        observer.unobserve(element);
      }
    }, { threshold: 0.08 });
    integrationObservers.push(reveal);root.querySelectorAll('[data-reveal]').forEach((element) => reveal.observe(element));

    const ornaments = new IntersectionObserver((entries) => {
      for (const entry of entries) entry.target.setAttribute('data-in-view', String(entry.isIntersecting));
    }, { rootMargin: '60px' });
    integrationObservers.push(ornaments);root.querySelectorAll('[data-motion-decoration]').forEach((element) => ornaments.observe(element));
  }
  if (!globalThis.matchMedia?.('(hover: hover) and (pointer: fine)').matches) return;
  root.querySelectorAll('[data-tilt]').forEach((element) => {
    let frame = 0;
    let lastPoint;
    element.addEventListener('pointermove', (event) => {
      if (reducedMotion()) return;
      lastPoint = { x: event.clientX, y: event.clientY };
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!lastPoint) return;
        const rect = element.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const x = Math.max(-0.5, Math.min(0.5, (lastPoint.x - rect.left) / rect.width - 0.5));
        const y = Math.max(-0.5, Math.min(0.5, (lastPoint.y - rect.top) / rect.height - 0.5));
        element.style.setProperty('--tilt-x', `${(-y * 3).toFixed(2)}deg`);
        element.style.setProperty('--tilt-y', `${(x * 3).toFixed(2)}deg`);
      });
    });
    const reset = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      lastPoint = null;
      element.style.setProperty('--tilt-x', '0deg');
      element.style.setProperty('--tilt-y', '0deg');
    };
    element.addEventListener('pointerleave', reset);
    element.addEventListener('pointercancel', reset);
  });
}

function clearFieldErrors(form) {
  form.querySelectorAll('[data-ellis-field-error]').forEach((error) => {
    const field = form.querySelector(`[aria-describedby~="${error.id}"]`);
    if (field) {
      const remaining = (field.getAttribute('aria-describedby') || '').split(/\s+/).filter((id) => id && id !== error.id);
      if (remaining.length) field.setAttribute('aria-describedby', remaining.join(' '));
      else field.removeAttribute('aria-describedby');
      field.removeAttribute('aria-invalid');
    }
    error.remove();
  });
}

function showFieldErrors(form, errors) {
  let first;
  for (const [name, message] of Object.entries(errors)) {
    const field = form.querySelector(`[name="${name}"]`);
    if (!field) continue;
    const error = form.ownerDocument.createElement('p');
    error.id = `ellis-enquiry-${name}-error`;
    error.className = 'field-error';
    error.setAttribute('data-ellis-field-error', '');
    error.textContent = message;
    field.insertAdjacentElement('afterend', error);
    field.setAttribute('aria-invalid', 'true');
    const descriptions = new Set((field.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean));
    descriptions.add(error.id);
    field.setAttribute('aria-describedby', [...descriptions].join(' '));
    first ||= field;
  }
  first?.focus();
}

function initialiseMailDraft(form, { data, lang }) {
  // Explicit demo opt-in. The integration adapter never overrides production transport.
  if (!form.hasAttribute('data-mail-draft')) return;
  form.noValidate = true;
  const zh = lang === 'zh';
  let status = form.querySelector('[data-form-status]');
  if (!status) {
    status = form.ownerDocument.createElement('div');
    status.className = 'form-status';
    status.setAttribute('data-form-status', '');
    form.append(status);
  }
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearFieldErrors(form);
    const values = Object.fromEntries(new FormData(form));
    const errors = validateEnquiry(values, lang);
    status.hidden = false;
    status.classList.toggle('is-error', Object.keys(errors).length > 0);
    if (Object.keys(errors).length) {
      showFieldErrors(form, errors);
      status.textContent = zh ? '请补充标出的内容后再打开邮件草稿。' : 'Complete the highlighted fields to open your email draft.';
      return;
    }
    const area = form.querySelector('[name="area"]');
    const service = form.querySelector('[name="service"]');
    values.areaName = area?.value ? area.selectedOptions?.[0]?.textContent || area.value : '';
    values.serviceName = service?.value ? service.selectedOptions?.[0]?.textContent || service.value : '';
    const href = createEmailDraft(values, { recipient: data.business.email, lang });
    status.replaceChildren();
    const message = form.ownerDocument.createElement('p');
    message.textContent = zh
      ? '邮件草稿已准备好。请在邮件应用中确认并发送；此页面没有发送任何信息。'
      : 'Your draft is ready. Review and send it in your email app; this page has not sent a message.';
    const link = form.ownerDocument.createElement('a');
    link.href = href;
    link.className = 'text-link';
    link.textContent = zh ? '再次打开邮件草稿 ↗' : 'Open the email draft again ↗';
    status.append(message, link);
    // A visitor-initiated mailto opens their own composer. It is not a send API.
    link.click();
  });
}

export function initialisePage(root = document) {
  root.documentElement?.classList.add('js');
  root.querySelectorAll('[data-scenario-explorer]').forEach((wrapper) => initialiseSelectionGroup(wrapper, {
    triggerAttribute: 'data-scene-select',
    panelAttribute: 'data-scene-panel',
    stateAttribute: 'data-active-scene',
    eventName: 'ellis:scenechange',
  }));
  root.querySelectorAll('[data-region-preview]').forEach((wrapper) => {
    initialiseSelectionGroup(wrapper, {
      triggerAttribute: 'data-region-preview-select',
      panelAttribute: 'data-region-preview-panel',
      stateAttribute: 'data-active-region',
      eventName: 'ellis:regionchange',
    });
    wrapper.addEventListener('ellis:regionchange', (event) => {
      wrapper.querySelectorAll('[data-region-card]').forEach((card) => {
        card.classList.toggle('is-active', card.dataset.regionCard === event.detail.region);
      });
    });
    wrapper.addEventListener('click', (event) => {
      if (!event.target.closest('[data-region-preview-select]')) return;
      // Selecting a regional card brings its expanded preview into view.
      // Scenario hot spots do not scroll or move the visitor's focus.
      wrapper.querySelector('.region-preview')?.scrollIntoView({
        behavior: reducedMotion() ? 'auto' : 'smooth', block: 'nearest',
      });
    });
  });
  initialiseMenu(root);
  initialiseMotion(root);
  const script = root.querySelector('#ellis-page-data');
  if (!script) return;
  let data;
  try { data = JSON.parse(script.textContent); } catch { return; }
  const lang = root.body?.dataset.lang === 'zh' ? 'zh' : 'en';
  const form = root.querySelector('#contact-enquiry-form');
  if (!form) return;
  hydrateContactContext(form, { data, lang });
  initialiseMailDraft(form, { data, lang });
}
