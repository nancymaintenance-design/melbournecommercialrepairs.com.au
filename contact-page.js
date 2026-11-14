/* Contact page only: create a local enquiry draft, without sending data. */
(() => {
  'use strict';
  const form = document.getElementById('contact-enquiry-form');
  if (!form || form.dataset.contactMounted) return;
  form.dataset.contactMounted = 'true';
  const result = document.getElementById('contact-draft-result');
  const draft = document.getElementById('contact-draft-text');
  const copy = document.getElementById('contact-copy-draft');
  const status = document.getElementById('contact-copy-status');
  const formStatus = document.getElementById('contact-form-status');
  const readyLink = document.getElementById('contact-draft-ready-link');
  if (!result || !draft) return;

  const language = () => document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'zh';
  const tr = (zh, en) => language() === 'en' ? en : zh;
  const service = form.elements.namedItem('service');
  const region = form.elements.namedItem('region');
  const sector = form.elements.namedItem('sector');
  const photos = form.elements.namedItem('photos');
  const photoList = document.getElementById('contact-photo-list');
  let selectedPhotos = photos instanceof HTMLInputElement ? [...photos.files] : [];
  // The renderer owns the complete service catalogue and its translations.
  const serviceOptions = service instanceof HTMLSelectElement ? [...service.options] : [];
  const services = Object.fromEntries(serviceOptions
    .filter(node => /^(?:[0-9]|1[01])$/.test(node.value))
    .map(node => [node.value, { zh: node.dataset.zh, en: node.dataset.en }]));
  if (service instanceof HTMLSelectElement) service.required = true;
  if (region instanceof HTMLSelectElement) region.required = true;
  for (const name of ['name', 'email', 'details']) {
    const control = form.elements.namedItem(name);
    if (control) control.required = true;
  }
  const email = form.elements.namedItem('email');
  if (email instanceof HTMLInputElement) email.type = 'email';

  let draftReady = false;
  let lastLanguage = '';
  const setStatus = text => { if (status) status.textContent = text; };
  const syncFormStatus = () => {
    if(formStatus) formStatus.textContent = draftReady
      ? tr('草稿已生成，尚未发送。 ', 'Draft ready. It has not been sent. ')
      : '';
    if(formStatus?.parentElement) formStatus.parentElement.hidden = !draftReady;
    if(readyLink) readyLink.hidden = !draftReady;
  };
  const renderPhotoList = () => {
    if (!photoList) return;
    const fragment = document.createDocumentFragment();
    selectedPhotos.forEach((file, index) => {
      const item = document.createElement('li');
      const filename = document.createElement('span');
      filename.textContent = file.name;
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = '×';
      remove.setAttribute('aria-label', tr('移除照片：', 'Remove photo: ') + file.name);
      remove.addEventListener('click', () => {
        selectedPhotos.splice(index, 1);
        if (photos instanceof HTMLInputElement) {
          if (typeof DataTransfer === 'function') {
            const transfer = new DataTransfer();
            selectedPhotos.forEach(selected => transfer.items.add(selected));
            photos.files = transfer.files;
          } else photos.value = '';
        }
        renderPhotoList();
        hideDraft();
      });
      item.append(filename, remove);
      fragment.append(item);
    });
    photoList.replaceChildren(fragment);
    photoList.hidden = selectedPhotos.length === 0;
  };
  const createDraft = () => {
    const values = Object.fromEntries(new FormData(form));
    const selectedOption = service instanceof HTMLSelectElement ? service.selectedOptions[0] : null;
    const chosen = services[values.service]?.[language()]
      || selectedOption?.dataset[language()] || selectedOption?.textContent || '';
    const selectedSector = sector instanceof HTMLSelectElement ? sector.selectedOptions[0] : null;
    const chosenSector = values.sector
      ? selectedSector?.dataset[language()] || selectedSector?.textContent || ''
      : tr('待确认', 'To be confirmed');
    draft.value = [
      tr('Ellis Services Group — 项目咨询草稿', 'Ellis Services Group — Enquiry Draft'),
      '',
      `${tr('姓名', 'Name')}: ${values.name || ''}`,
      `${tr('联系电话', 'Phone number')}: ${values.phone || tr('待补充', 'To be confirmed')}`,
      `${tr('邮箱', 'Email')}: ${values.email || ''}`,
      `${tr('地区', 'Region')}: Melbourne`,
      `${tr('服务', 'Service')}: ${chosen}`,
      `${tr('商业物业类型', 'Property type')}: ${chosenSector}`,
      `${tr('物业地址 / 所在区域', 'Property address / location')}: ${values.address || tr('待补充', 'To be confirmed')}`,
      '',
      `${tr('项目需求', 'Project details')}:`,
      values.details || '',
      '',
      `${tr('现场照片（仅文件名，未上传）', 'Site photos (filenames only; not uploaded)')}: ${selectedPhotos.length ? selectedPhotos.map(file => file.name).join(', ') : tr('未选择照片', 'No photos selected')}`,
      '',
      tr('此为 UI 预览草稿，尚未发送。', 'UI preview draft. This enquiry has not been sent.')
    ].join('\n');
  };
  const syncLanguage = () => {
    const next = language();
    if (next === lastLanguage) return;
    lastLanguage = next;
    form.querySelectorAll('[data-placeholder-zh][data-placeholder-en]').forEach(control => {
      control.placeholder = control.getAttribute(`data-placeholder-${next}`);
    });
    for (const select of [service, region, sector]) {
      if (select instanceof HTMLSelectElement) {
        [...select.options].forEach(node => {
          if (node.dataset[next]) node.textContent = node.dataset[next];
        });
      }
    }
    draft.setAttribute('aria-label', tr('咨询草稿', 'Enquiry draft'));
    if (photos) photos.setAttribute('aria-label', tr('添加现场照片', 'Add site photos'));
    renderPhotoList();
    setStatus('');
    if (draftReady && !result.hidden) createDraft();
    syncFormStatus();
  };
  const hideDraft = () => {
    result.hidden = true;
    draftReady = false;
    setStatus('');
    syncFormStatus();
  };

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    createDraft();
    draftReady = true;
    result.hidden = false;
    setStatus('');
    syncFormStatus();
  });
  form.addEventListener('input', hideDraft);
  form.addEventListener('change', hideDraft);
  photos?.addEventListener('change', () => {
    selectedPhotos = [...photos.files];
    renderPhotoList();
    hideDraft();
  });
  document.getElementById('contact-start-enquiry')?.addEventListener('click', () => {
    form.elements.namedItem('name')?.focus({ preventScroll: true });
  });
  copy?.addEventListener('click', async event => {
    event.preventDefault();
    if (!draftReady || result.hidden) return;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(draft.value);
      if (draftReady && !result.hidden) setStatus(tr('已复制。草稿尚未发送。', 'Copied. The draft has not been sent.'));
    } catch {
      if (!draftReady || result.hidden) return;
      draft.focus({ preventScroll: true });
      draft.select();
      setStatus(tr('草稿已选中，请使用系统复制功能。', 'The draft is selected. Use your device’s copy command.'));
    }
  });
  document.getElementById('language-switch')?.addEventListener('click', () => queueMicrotask(syncLanguage));
  new MutationObserver(syncLanguage).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  hideDraft();
  syncLanguage();
})();
