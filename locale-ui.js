/* Shared localized attributes. The existing language switch is intentionally
   untouched; it retains its approved labels and click behavior. */
(() => {
 const language=()=>document.documentElement.lang.startsWith('en')?'en':'zh';
 const pageMeta=JSON.parse(document.getElementById('page-meta')?.textContent||'{}');
 const syncMenu=()=>{
  const menu=document.getElementById('menu-toggle');if(!menu)return;
  const open=menu.getAttribute('aria-expanded')==='true';
  menu.setAttribute('aria-label',language()==='en'?(open?'Close menu':'Open menu'):(open?'关闭菜单':'打开菜单'));
 };
 const syncDiscovery=lang=>{
  const alternateGraph=document.getElementById('ellis-discovery-alternate');
  const activeGraph=document.querySelector('script[data-ellis-discovery][type="application/ld+json"]');
  if(!activeGraph||alternateGraph?.dataset.lang!==lang)return;
  const previousGraph=activeGraph.textContent;
  activeGraph.textContent=alternateGraph.textContent;
  alternateGraph.textContent=previousGraph;
  alternateGraph.dataset.lang=lang==='en'?'zh':'en';
 };
 const syncUrl=lang=>{
  const url=new URL(location.href);
  url.searchParams.set('lang',lang);
  if(url.href!==location.href)history.replaceState(history.state,'',url);
 };
 const apply=()=>{
  const lang=language();
  const suffix=lang==='en'?'En':'Zh';
  if(pageMeta['title'+suffix])document.title=pageMeta['title'+suffix];
  const description=document.querySelector('meta[name="description"]');
  if(description&&pageMeta['description'+suffix])description.content=pageMeta['description'+suffix];
  const canonical=document.querySelector('link[rel="canonical"]');
  const alternate=document.querySelector(lang==='en'?'link[hreflang="en-AU"]':'link[hreflang="zh-CN"]');
  if(canonical&&alternate&&canonical.href!==alternate.href)canonical.href=alternate.href;
  syncDiscovery(lang);
  for(const attr of ['aria-label','alt','title'])for(const node of document.querySelectorAll(`[data-${attr}-zh][data-${attr}-en]`))node.setAttribute(attr,node.getAttribute(`data-${attr}-${lang}`));
  syncMenu();
 };
 window.EllisLocaleUI={apply,syncMenu,syncUrl};
 apply();
})();
