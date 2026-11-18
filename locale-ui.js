/* Shared localized attributes. The existing language switch is intentionally
   untouched; it retains its approved labels and click behavior. */
(() => {
 const language=()=>document.documentElement.lang.startsWith('en')?'en':'zh';
 const syncMenu=()=>{
  const menu=document.getElementById('menu-toggle');if(!menu)return;
  const open=menu.getAttribute('aria-expanded')==='true';
  menu.setAttribute('aria-label',language()==='en'?(open?'Close menu':'Open menu'):(open?'关闭菜单':'打开菜单'));
 };
 const apply=()=>{
  const lang=language();
  for(const attr of ['aria-label','alt','title'])for(const node of document.querySelectorAll(`[data-${attr}-zh][data-${attr}-en]`))node.setAttribute(attr,node.getAttribute(`data-${attr}-${lang}`));
  syncMenu();
 };
 window.EllisLocaleUI={apply,syncMenu};
 apply();
})();
