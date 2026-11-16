/* Sector overview only. Supplied controller and data remain unchanged. */
(function(global){
 'use strict';
 const host=document.querySelector('[data-sector-kit]');if(!host||global.EllisSectorPage)return;
 const routes={sectorsIndex:'/sectors/',sectors:{office:'/sectors/offices/',retail:'/sectors/retail-shopping-centres/',hospitality:'/sectors/hospitality/',warehouse:'/sectors/warehouses-logistics/',industrial:'/sectors/industrial-business-parks/',medical:'/sectors/medical-health/',education:'/sectors/education-community/','shared-property':'/sectors/commercial-common-areas/'},services:{'building-repairs':'/services/building-maintenance/',hvac:'/services/hvac-building-systems/','electrical-lighting':'/services/electrical-lighting/','plumbing-drainage':'/services/plumbing-drainage-gas/','roofing-waterproofing':'/services/roofing-waterproofing/',landscaping:'/services/landscaping-irrigation/',signage:'/services/signage-wayfinding/','high-access-cleaning':'/services/facade-high-access-cleaning/','industrial-doors':'/services/fire-security-access/','concrete-line-marking':'/services/car-parks-external-works/','interior-fitout':'/services/fit-outs-make-good/','planned-maintenance':'/services/building-maintenance/'}};
 const points=[{x:.26,y:.13},{x:.63,y:.13},{x:.20,y:.39},{x:.76,y:.55},{x:.90,y:.23},{x:.18,y:.66},{x:.43,y:.69},{x:.53,y:.37}];
 const sectors=global.ELLIS_SECTORS.map((sector,i)=>Object.assign({},sector,{point:points[i],imagePosition:points[i]}));
 function resolveHref({kind,key,lang,sector}){
  let path=kind==='all-sectors'?routes.sectorsIndex:kind==='sector'?routes.sectors[key]:routes.services[key];
  if(kind==='service'&&key==='planned-maintenance'&&sector?.key==='industrial')path=routes.services.hvac;
  if(!path)return undefined;
  const url=new URL(path,location.origin);url.searchParams.set('lang',lang==='en'?'en':'zh');return url.href;
 }
 const query=new URLSearchParams(location.search),selected=query.get('sector'),language=()=>document.documentElement.lang.startsWith('en')?'en':'zh';
 const api=global.EllisSectorExplorer.mount(host,{sceneSrc:'/assets/sectors/sector-campus-v1.png',sceneAlt:{zh:'八类商业物业组成的原有立体园区',en:'The existing three-dimensional campus of eight commercial property types'},sectors,language:language(),selectedId:sectors.some(s=>s.id===selected)?selected:'04',initiallyOpen:false,resolveHref});
 const observer=new MutationObserver(()=>api.setLanguage(language()));observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 function destroy(){observer.disconnect();api.destroy();}
 global.EllisSectorPage=Object.freeze({select:api.select,setLanguage:api.setLanguage,close:api.close,getState:api.getState,destroy,resolveHref,routes,points});
 addEventListener('pagehide',event=>{if(!event.persisted)destroy();});
})(window);

