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
