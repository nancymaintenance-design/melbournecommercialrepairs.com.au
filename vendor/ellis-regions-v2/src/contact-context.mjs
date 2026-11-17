/**
 * Production-safe contact prefill adapter.
 * This module does not listen to submit, send requests or store visitor details.
 * Call once when the existing contact form mounts. Values remain editable.
 */
import { createRegionLinks, SERVICE_CATALOG } from './region-links.mjs';

export { SERVICE_CATALOG };

export function readContactContext(search, { data, lang } = {}) {
  return createRegionLinks(data).readContactContext(search, lang);
}

export function hydrateContactContext(root, {
  data,
  search = globalThis.location?.search || '',
  lang,
  overwrite = false,
} = {}) {
  const context = readContactContext(search, { data, lang });
  const form = root?.matches?.('#contact-enquiry-form, [data-contact-form]')
    ? root
    : root?.querySelector?.('#contact-enquiry-form, [data-contact-form]');
  if (!form) return Object.freeze({ context, formFound: false, applied: [] });
  const applied = [];
  for (const name of ['area', 'service']) {
    const control = form.querySelector(`[name="${name}"]`);
    const value = context[name];
    if (!control || !value || !overwrite && control.value) continue;
    // A select only accepts a supplied option. No unknown URL value is inserted.
    if (control.options && !Array.from(control.options).some((option) => option.value === value)) continue;
    control.value = value;
    const EventType = control.ownerDocument?.defaultView?.Event || globalThis.Event;
    if (EventType) {
      control.dispatchEvent(new EventType('input', { bubbles: true }));
      control.dispatchEvent(new EventType('change', { bubbles: true }));
    }
    applied.push(name);
  }
  for (const label of form.querySelectorAll('[data-contact-area-label]')) {
    if (context.areaName) label.textContent = context.areaName;
  }
  for (const label of form.querySelectorAll('[data-contact-service-label]')) {
    if (context.serviceName) label.textContent = context.serviceName;
  }
  return Object.freeze({ context, formFound: true, applied: Object.freeze(applied) });
}

export function validateEnquiry(values, lang = 'en') {
  const zh = lang === 'zh';
  const errors = {};
  if (!String(values.name || '').trim()) errors.name = zh ? '请填写您的姓名。' : 'Enter your name.';
  const email = String(values.email || '').trim();
  if (!email) errors.email = zh ? '请填写电子邮箱。' : 'Enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = zh ? '请填写有效的电子邮箱，例如 name@example.com。' : 'Enter a valid email address, such as name@example.com.';
  }
  if (!String(values.message || '').trim()) {
    errors.message = zh ? '请简要说明需要处理的内容。' : 'Briefly describe the work needed.';
  }
  return errors;
}

/** Creates a visitor-controlled draft link; it never sends a message. */
export function createEmailDraft(values, { recipient, lang = 'en' } = {}) {
  if (!recipient || !/^[^\s@?&]+@[^\s@?&]+\.[^\s@?&]+$/.test(recipient)) {
    throw new TypeError('Expected the configured business email address');
  }
  const zh = lang === 'zh';
  const clean = (value) => String(value || '').trim();
  const subject = zh ? 'Ellis 商业物业项目咨询' : 'Ellis commercial property enquiry';
  const lines = [
    `${zh ? '姓名' : 'Name'}: ${clean(values.name)}`,
    `${zh ? '电子邮箱' : 'Email'}: ${clean(values.email)}`,
    `${zh ? '联系电话' : 'Phone'}: ${clean(values.phone)}`,
    `${zh ? '服务地区' : 'Region'}: ${clean(values.areaName)}`,
    `${zh ? '服务内容' : 'Service'}: ${clean(values.serviceName)}`,
    '',
    zh ? '项目需求：' : 'Project details:',
    clean(values.message),
  ];
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
}
