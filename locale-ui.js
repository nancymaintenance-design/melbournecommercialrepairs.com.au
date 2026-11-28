/* Keep bilingual links, metadata and accessibility labels in sync. */
(() => {
 const businessKeys=['service','area','topic'];
 function localizeUrl(url,lang){
  const params=url.searchParams;
  const ordered=new URLSearchParams({lang});
  for(const key of businessKeys)for(const value of params.getAll(key))ordered.append(key,value);
  for(const [key,value] of params)if(key!=='lang'&&!businessKeys.includes(key))ordered.append(key,value);
  url.search=ordered.toString();
  return url;
 }
 if(typeof module!=='undefined'&&module.exports){module.exports={localizeUrl};return;}
 const language=()=>document.documentElement.lang.startsWith('en')?'en':'zh';
 const pageMeta=JSON.parse(document.getElementById('page-meta')?.textContent||'{}');
 const urlLanguage=()=>new URLSearchParams(location.search).getAll('lang').findLast(value=>value==='en'||value==='zh')||'en';
 const isLanguageClick=event=>!event.defaultPrevented&&event.button===0&&!event.altKey&&!event.ctrlKey&&!event.metaKey&&!event.shiftKey;
 const urlFor=lang=>{
  const url=new URL(location.href);
  if(pageMeta.route)url.pathname=pageMeta.route;
  return localizeUrl(url,lang);
 };
 const syncSwitch=()=>{
  const link=document.querySelector('a[data-language-switch]');
  if(!link)return;
  const next=language()==='en'?'zh':'en';
  const url=urlFor(next);
  link.href=url.pathname+url.search+url.hash;
  link.hreflang=next==='en'?'en-AU':'zh-CN';
 };
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
  const url=urlFor(lang);
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
  syncSwitch();
  for(const attr of ['aria-label','alt','title'])for(const node of document.querySelectorAll(`[data-${attr}-zh][data-${attr}-en]`))node.setAttribute(attr,node.getAttribute(`data-${attr}-${lang}`));
  syncMenu();
 };
 window.EllisLocaleUI={apply,localizeUrl,syncMenu,syncUrl,syncSwitch,urlLanguage,isLanguageClick};
 window.addEventListener('hashchange',syncSwitch);
 document.querySelector('a[data-language-switch]')?.addEventListener('keydown',event=>{
  if(event.key!==' '||event.altKey||event.ctrlKey||event.metaKey||event.shiftKey)return;
  event.preventDefault();
  if(!event.repeat)event.currentTarget.click();
 });
 apply();
})();
