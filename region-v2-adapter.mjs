const main=document.querySelector('.region-v2-content');
const variants=JSON.parse(document.querySelector('#region-v2-locales').textContent);
let current=null;
async function mount(){
 const lang=document.documentElement.lang.startsWith('en')?'en':'zh';
 if(current===lang)return;
 current=lang;
 const template=document.createElement('template');template.innerHTML=variants[lang];
 main.replaceChildren(template.content.cloneNode(true));
 main.dataset.lang=lang;main.classList.add('js');
 // Package interaction module initialises only this content root. No contact
 // demo markup or submit handler is mounted by a region page.
 const module=await import('./vendor/ellis-regions-v2/src/app-integration.mjs');
 if(current===lang){module.disposePage();module.initialisePage(main);}
}
mount();
new MutationObserver(mount).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});

// A single delegated photo transition for tab-led scenes. Older async decodes
// cannot overwrite a newer choice, and language remounts leave no old listeners.
main.addEventListener('ellis:scenechange',async event=>{
 const wrapper=event.target.closest('[data-scene-views]');if(!wrapper)return;
 const index=String(event.detail.index),src=JSON.parse(wrapper.dataset.sceneViews)[Number(index)];
 const image=wrapper.querySelector('.rr-scene-photo>img');if(!image||!src||image.getAttribute('src')===src)return;
 const incoming=new Image();incoming.src=src;
 try{await incoming.decode();}catch{return;}
 if(!image.isConnected||wrapper.getAttribute('data-active-scene')!==index)return;
 image.getAnimations().forEach(animation=>animation.cancel());image.src=src;
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches)image.animate([{opacity:.75,transform:'scale(1.015)'},{opacity:1,transform:'scale(1)'}],{duration:220,easing:'ease-out'});
});
