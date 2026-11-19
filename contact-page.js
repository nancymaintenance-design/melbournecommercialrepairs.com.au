/* Contact enquiries: send to the same-origin server API; credentials stay on the server. */
(() => {
  'use strict';
  const form = document.getElementById('contact-enquiry-form');
  if (!form || form.dataset.contactMounted) return;
  form.dataset.contactMounted = 'true';
  // Own validation copy follows the page language rather than the browser UI.
  form.noValidate = true;
  document.getElementById('contact-draft-result')?.remove();
  document.getElementById('contact-draft-ready-link')?.remove();
  let formStatus = document.getElementById('contact-form-status');
  if (!formStatus) { formStatus = document.createElement('p'); formStatus.id = 'contact-form-status'; form.append(formStatus); }
  formStatus.setAttribute('role', 'status'); formStatus.setAttribute('aria-live', 'polite');
  const statusContainer = formStatus.closest('.contact-preview-note') || formStatus;
  Object.assign(statusContainer.style, { position: 'static', margin: '12px 14px', color: 'inherit' });
  const language = () => document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'zh';
  const tr = (zh, en) => language() === 'en' ? en : zh;
  const photos = form.elements.namedItem('photos');
  const photoList = document.getElementById('contact-photo-list');
  let selectedPhotos = photos instanceof HTMLInputElement ? [...photos.files] : [];
  let sending = false;
  let outcome = '';
  let requestId = crypto.randomUUID();
  let lastLanguage = '';
  let preparedPhotos = null;
  const messages = {
    sending: ['正在发送，请稍候…', 'Sending your enquiry…'],
    sent: ['项目需求已提交。Ellis 将通过您提供的联系方式回复。', 'Thanks for your enquiry. We’ll get back to you using the contact details you provided.'],
    failed: ['暂未确认发送成功，内容和照片已保留。请重试，或致电 ellis 0450666876。', 'Sending could not be confirmed. Your details and photos are kept here. Please retry or call ellis on 0450666876.'],
    limit: ['最多添加 5 张照片。请移除多余照片后重试。', 'Please attach up to 5 photos. Remove extra photos and try again.'],
    photo: ['有照片无法读取或压缩，请改用 JPG、PNG 或 WebP，或移除该照片后重试。', 'A photo could not be read or resized. Use JPG, PNG or WebP, or remove that photo and retry.'],
    rate: ['提交较频繁，请 10 分钟后重试，或致电 ellis 0450666876。', 'Too many attempts. Please try again in 10 minutes or call ellis on 0450666876.'],
    fields: ['请检查必填项目与邮箱后再提交。', 'Please check the required fields and email address.']
  };
  const showStatus = value => {
    outcome = value; statusContainer.hidden = !value;
    formStatus.textContent = value ? tr(...messages[value]) : '';
  };
  const changed = () => { if (sending) return; requestId = crypto.randomUUID(); showStatus(''); for(const control of form.querySelectorAll('[aria-invalid]'))if(control.validity.valid){control.removeAttribute('aria-invalid');control.removeAttribute('aria-describedby');} };
  const renderPhotoList = () => {
    if (!photoList) return;
    const fragment = document.createDocumentFragment();
    selectedPhotos.forEach((file, index) => {
      const item = document.createElement('li');
      const filename = document.createElement('span'); filename.textContent = file.name;
      const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = '×'; remove.disabled = sending;
      remove.setAttribute('aria-label', tr('移除照片：', 'Remove photo: ') + file.name);
      remove.addEventListener('click', () => {
        selectedPhotos.splice(index, 1); preparedPhotos = null;
        if (photos instanceof HTMLInputElement) {
          if (typeof DataTransfer === 'function') { const transfer = new DataTransfer(); selectedPhotos.forEach(file => transfer.items.add(file)); photos.files = transfer.files; }
          else photos.value = '';
        }
        renderPhotoList(); changed();
      });
      item.append(filename, remove); fragment.append(item);
    });
    photoList.replaceChildren(fragment); photoList.hidden = selectedPhotos.length === 0;
  };
  // Re-encode images without metadata; cap each at 580 kB, with at most five attachments.
  async function preparePhoto(file) {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 25000000 || !file.size) throw new Error('photo');
    const url = URL.createObjectURL(file); const image = new Image();
    try {
      image.src = url; await image.decode();
      let scale = Math.min(1, 1800 / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = document.createElement('canvas'); const context = canvas.getContext('2d');
      if (!context || !image.naturalWidth || !image.naturalHeight) throw new Error('photo');
      for (let attempt = 0; attempt < 6; attempt++) {
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale)); canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        context.fillStyle = '#fff'; context.fillRect(0, 0, canvas.width, canvas.height); context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const content = canvas.toDataURL('image/jpeg', Math.max(0.5, 0.85 - attempt * 0.07)).split(',')[1];
        if (content && content.length * 0.75 <= 580000) return { filename: `${file.name.replace(/\.[^.]*$/, '').slice(0, 100)}.jpg`, content };
        scale *= 0.75;
      }
      throw new Error('photo');
    } finally { URL.revokeObjectURL(url); }
  }
  if (!form.elements.namedItem('website')) {
    const trap = document.createElement('input'); trap.name = 'website'; trap.type = 'text'; trap.tabIndex = -1; trap.autocomplete = 'off'; trap.setAttribute('aria-hidden', 'true'); trap.style.display = 'none'; form.append(trap);
  }
  const syncLanguage = () => {
    const next = language(); if (next === lastLanguage) return; lastLanguage = next;
    form.querySelectorAll('[data-placeholder-zh][data-placeholder-en]').forEach(control => { control.placeholder = control.getAttribute(`data-placeholder-${next}`); });
    form.querySelectorAll('select option').forEach(option => { if (option.dataset[next]) option.textContent = option.dataset[next]; });
    if (photos) photos.setAttribute('aria-label', tr('添加现场照片', 'Add site photos'));
    renderPhotoList(); showStatus(outcome);
  };
  form.addEventListener('submit', async event => {
    event.preventDefault(); if (sending) return;
    if(!form.checkValidity()){
      showStatus('fields');
      const invalid=[...form.elements].filter(control=>control.willValidate&&!control.validity.valid);
      invalid.forEach(control=>{control.setAttribute('aria-invalid','true');control.setAttribute('aria-describedby',formStatus.id);});
      invalid[0]?.focus();return;
    }
    if (selectedPhotos.length > 5) { showStatus('limit'); return; }
    const values = Object.fromEntries(new FormData(form)); delete values.photos;
    sending = true; showStatus('sending'); form.setAttribute('aria-busy', 'true');
    const controls = [...form.elements].filter(control => !control.disabled);
    controls.forEach(control => { control.disabled = true; }); renderPhotoList();
    try {
      if (!preparedPhotos) {
        const converted = [];
        for (const file of selectedPhotos) converted.push(await preparePhoto(file));
        preparedPhotos = converted;
      }
      const response = await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...values, requestId, photos: preparedPhotos }), signal: AbortSignal.timeout(25000) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.ok !== true) {
        showStatus(response.status === 429 ? 'rate' : response.status === 400 ? 'fields' : 'failed'); return;
      }
      showStatus('sent');
    } catch (error) {
      if (!preparedPhotos) { preparedPhotos = null; showStatus('photo'); }
      else showStatus('failed');
    } finally {
      sending = false; controls.forEach(control => { control.disabled = false; }); form.removeAttribute('aria-busy'); renderPhotoList();
    }
  });
  form.addEventListener('input', changed); form.addEventListener('change', changed);
  photos?.addEventListener('change', () => { selectedPhotos = [...photos.files]; preparedPhotos = null; renderPhotoList(); changed(); });
  document.getElementById('contact-start-enquiry')?.addEventListener('click', () => form.elements.namedItem('name')?.focus({ preventScroll: true }));
  document.getElementById('language-switch')?.addEventListener('click', () => queueMicrotask(syncLanguage));
  new MutationObserver(syncLanguage).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  showStatus(''); syncLanguage();
})();
