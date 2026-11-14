/* Search and categories work with the original bilingual FAQ content. */
(() => {
 const root=document.querySelector('.fq-index');if(!root)return;
 const search=root.querySelector('#fq-search-input'),form=root.querySelector('.fq-search');
 const clear=root.querySelector('.fq-search-clear'),items=[...root.querySelectorAll('.fq-question')];
 const buttons=[...root.querySelectorAll('[data-fq-category]')],status=root.querySelector('[data-fq-count]');
 const empty=root.querySelector('.fq-empty');
 let category='all';
 const en=()=>document.documentElement.lang==='en';
 const normal=value=>value.normalize('NFKC').toLocaleLowerCase().replace(/[\s,，.。!?？!·&/]+/g,' ').trim();
 function update(options={}){
  const query=normal(search.value),terms=query.split(' ').filter(Boolean);
  const visible=items.filter(item=>{
   const text=normal(item.dataset.fqSearch);
   const match=(category==='all'||item.dataset.fqGroup===category)&&terms.every(term=>text.includes(term));
   item.hidden=!match;return match;
  });
  // Native toggle events are queued: close filtered answers synchronously so
  // rapid category/search changes cannot close the final visible answer later.
  items.forEach(item=>{if(item.hidden)item.open=false;});
  clear.hidden=!search.value;empty.hidden=visible.length>0;
  status.textContent=en()?`${visible.length} ${visible.length===1?'question':'questions'}`:`${visible.length} 个问题`;
  search.placeholder=search.dataset[en()?'searchPlaceholderEn':'searchPlaceholderZh'];
  search.setAttribute('aria-label',en()?'Search frequently asked questions':'搜索常见问题');
  root.querySelector('.fq-categories').setAttribute('aria-label',en()?'Question categories':'问题分类');
  buttons.forEach(button=>{const active=button.dataset.fqCategory===category;button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active));});
  if(options.reveal&&visible.length&&!visible.some(item=>item.open))visible[0].open=true;
 }
 form.addEventListener('submit',event=>{event.preventDefault();update({reveal:true});});
 search.addEventListener('input',()=>update({reveal:true}));
 clear.addEventListener('click',()=>{search.value='';update({reveal:true});search.focus();});
 buttons.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.fqCategory;update({reveal:true});}));
 root.querySelector('.fq-reset').addEventListener('click',()=>{category='all';search.value='';update({reveal:true});search.focus();});
 items.forEach(item=>item.addEventListener('toggle',()=>{
  if(item.open)items.forEach(other=>{if(other!==item&&other.open)other.open=false;});
 }));
 document.querySelector('#language-switch')?.addEventListener('click',()=>queueMicrotask(()=>update()));
 update();
})();
