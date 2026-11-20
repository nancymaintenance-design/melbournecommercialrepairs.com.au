import {readContactContext,SERVICE_CATALOG} from './vendor/ellis-regions-v2/src/contact-context.mjs';
const form=document.querySelector('#contact-enquiry-form');
if(form){
 const data=await (await fetch('/vendor/ellis-regions-v2/data/region-pages.json')).json();
 const lang=()=>document.documentElement.lang.startsWith('en')?'en':'zh';
 const context=readContactContext(location.search,{data,lang:lang()});
 const address=form.elements.namedItem('address'),service=form.elements.namedItem('service');
 let area=form.elements.namedItem('area');
 if(!area){area=document.createElement('input');area.type='hidden';area.name='area';form.append(area);}
 if(context.area&&!area.value)area.value=context.area;
 let selectedArea=data.regions.find(region=>region.areaParam===context.area);
 let generatedAddress='';
 if(context.areaName&&address&&!address.value){address.value=context.areaName;generatedAddress=address.value;}
 if(context.service&&service&&!service.value&&form.dataset.servicePrefillReady!=='true'){
  // Existing contact form deliberately retains its numeric service contract.
  const index=SERVICE_CATALOG.findIndex(item=>item.slug===context.service);
  if(index>=0&&[...service.options].some(option=>option.value===String(index)))service.value=String(index);
 }
 if(address){
  const list=document.createElement('datalist');list.id='region-contact-options';
  const refresh=()=>{
   list.replaceChildren(...data.regions.map(region=>{const option=document.createElement('option');option.value=lang()==='zh'?region.nameZh:region.nameEn;return option;}));
   // Translate only our generated region label; never replace a typed address.
   if(selectedArea&&generatedAddress&&address.value===generatedAddress){address.value=lang()==='zh'?selectedArea.nameZh:selectedArea.nameEn;generatedAddress=address.value;}
  };
  refresh();form.append(list);address.setAttribute('list',list.id);
  address.addEventListener('input',()=>{const match=data.regions.find(region=>[region.nameZh,region.nameEn].includes(address.value));area.value=match?.areaParam||'';selectedArea=match;generatedAddress=match?address.value:'';});
  new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 }
}
