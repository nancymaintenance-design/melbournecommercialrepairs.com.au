const authored={...require('./services.cjs'),...require('./sectors.cjs')};
const business=require('../business.json');
const blueprint=require('./blueprint-structure.json');
const {serviceNotes}=require('./technical-notes-render.cjs');
const sectorDetail=require('./sector-detail-flow.cjs');
const sectionLinks={S01:[[],[],['S12'],['S02']],S02:[['S04'],[],['S01'],['S09']],S03:[[],['S12'],[],['S06']],S04:[['S01'],['S02'],[],['S05']],S05:[[],['S03','S04'],[],['S06']],S06:[['S03'],[],['S01'],['S05']],S07:[['S11'],[],['S04'],['S08']],S08:[['S01'],['S03'],[],['S12']],S09:[[],['S02'],[],['S10']],S10:[[],[],[],['S09','S12']],S11:[[],['S04'],[],['S03','S10']],S12:[['S01'],['S03'],['S10'],['S08']],I01:[['S01'],['S03','S05'],['S04'],['S10','S12']],I02:[['S01'],['S02','S04'],['S08','S11'],['S12']],I03:[['S04','S05'],['S03'],['S01'],['S10','S12']],I04:[['S02','S04'],['S11'],['S03'],['S12','S01']],I05:[['S01','S02'],['S11'],['S03','S05'],['S07']],I06:[['S01'],['S03','S04','S05'],[],['S07']],I07:[['S01','S03','S04'],['S07','S11'],['S12'],[]],I08:[['S01','S02'],['S06','S07','S11'],[],['S09']]};
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const dual=(tag,zh,en,cls='')=>`<${tag}${cls?` class="${cls}"`:''} data-zh="${esc(zh)}" data-en="${esc(en)}">${esc(zh)}</${tag}>`;
const json=x=>JSON.stringify(x).replace(/</g,'\\u003c');
sectionLinks.S02[0]=['S04','S11'];
sectionLinks.S04[1]=['S02','S11'];
sectionLinks.I02[0]=['S01','S03','S05'];
sectionLinks.I08[0]=['S01','S02','S03','S04'];
module.exports=function renderTopics(page,data,serviceSlugs,sectorSlugs){
 const records=Object.entries(authored).map(([id,x])=>{
  const isService=id.startsWith('S'),index=Number(id.slice(1))-1,item=(isService?data.services:data.sectors)[index],route=(isService?'services/':'sectors/')+(isService?serviceSlugs:sectorSlugs)[index];
  const plan=blueprint[id];if(!plan||x.sections.length!==4||x.faqs.length<3||x.faqs.length>5)throw Error('Incomplete topic '+id);
  return {...x,id,route,isService,index,label:[item.zh,item.en],h1En:plan.h1En,sections:x.sections.map(([h2Zh,zh,en],i)=>({h2Zh,h2En:x.h2En?.[i]||plan.h2En[i],zh,en,subsections:(x.subsections?.[i]||[]).map(([h3Zh,h3En,zh,en])=>({h3Zh,h3En,zh,en}))})),faqs:x.faqs.map(([i,qZh,zh,en,qEn])=>({qZh,qEn:qEn||plan.faqEn[i],zh,en}))};
 });
 const byId=Object.fromEntries(records.map(x=>[x.id,x]));
 function links(ids,cls='detail-links'){return `<div class="${cls}">${ids.map(id=>{const x=byId[id];if(!x)throw Error('Unknown link '+id);return `<a href="/${x.route}/" data-local-page><span class="micro-label">${id}</span>${dual('h3',...x.label)}${dual('p',...x.intro)}<span class="related-arrow" aria-hidden="true">↗</span></a>`}).join('')}</div>`;}
 for(const x of records){
  if(x.isService){
   const serviceUI=require('./service-ui.cjs'),s=serviceUI.pack.services[x.index],en=require('./service-pages.en.json')[x.index];
   const schema={'@context':'https://schema.org','@type':'Service',name:s.EnglishH1,serviceType:en.title,description:en.heroCopy,provider:{'@id':'/#ellis-organization'},areaServed:{'@type':'City',name:'Melbourne'}};
   const notes=serviceNotes(s.slug);
   page(x.route,s.ChineseH1,s.EnglishH1,serviceUI.section(x.index,x,records)+notes,'',{topic:x,serviceReference:true,titleZh:s.ChineseH1+' | Ellis Services Group',titleEn:s.EnglishH1+' | Ellis Services Group',descriptionZh:s.heroCopy,descriptionEn:en.heroCopy,extraHead:`${notes?'<link rel="stylesheet" href="/technical-notes.css">':''}${s.slug==='plumbing-drainage-gas'?'<link rel="stylesheet" href="/plumbing-gallery.css">':''}<script src="/service-reference.js" defer></script><script type="application/ld+json">${json(schema)}</script>`});
   continue;
  }
  const faq=`<section class="topic-faq" id="questions" data-entrance>${dual('p','项目常见问题','PROJECT QUESTIONS','eyebrow')}${dual('h2',x.label[0]+'常见问题',x.label[1]+' FAQs')}<div class="topic-faq-list">${x.faqs.map(f=>`<details><summary>${dual('span',f.qZh,f.qEn)}<span class="faq-symbol" aria-hidden="true">+</span></summary>${dual('p',f.zh,f.en)}</details>`).join('')}</div></section>`;
  const ctaCopy=x.cta||{title:['把现场需求告诉我们','Tell us what your site needs'],intro:['告诉我们物业地址和需要处理的问题。我们会与您确认进场要求及施工安排。','Tell us where the property is and what needs fixing. We’ll confirm site access and plan the work with you.'],button:['开始项目咨询 ↗','Discuss your project ↗']};
  const cta=`<div class="topic-cta" data-entrance><div>${dual('h2',...ctaCopy.title)}${dual('p',...ctaCopy.intro)}</div><div><a class="button button-dark" href="/?${x.isService?'service='+x.index:'region=Melbourne'}#contact" data-local-page data-zh="${esc(ctaCopy.button[0])}" data-en="${esc(ctaCopy.button[1])}">${esc(ctaCopy.button[0])}</a><a class="topic-phone" href="${esc(business.telephoneHref)}">${esc(business.telephoneDisplay)} ↗</a></div></div>`;
  const related=`<section class="topic-related">${dual('h2',x.isService?'相关维护服务':'本场景对应服务',x.isService?'Related maintenance services':'Services for this property')}${links(x.related)}${x.sectors?dual('h2','相关商业场景','Relevant commercial properties')+links(x.sectors,'detail-links sector-context-links'):''}<p class="topic-directory-links"><a href="/services/" data-local-page data-zh="查看全部 12 类服务 ↗" data-en="Explore all 12 services ↗">查看全部 12 类服务 ↗</a><a href="/sectors/" data-local-page data-zh="查看全部 8 类商业场景 ↗" data-en="Explore all 8 property types ↗">查看全部 8 类商业场景 ↗</a></p></section>`;
  const titleZh=x.label[0]+'｜墨尔本｜Ellis Services Group',titleEn=x.keyword.replace(/\b\w/g,c=>c.toUpperCase()).replace(/\bHvac\b/g,'HVAC')+' | Ellis Services Group';
  const descriptionZh=x.intro[0],descriptionEn=x.intro[1].split(/(?<=\.) /)[0];
  const schema={'@context':'https://schema.org','@graph':[
   {'@type':x.isService?'Service':'WebPage','@id':'/'+x.route+'/#topic',name:x.h1En,description:descriptionEn,...(x.isService?{serviceType:x.label[1],provider:{'@id':'/#ellis-organization'},areaServed:{'@type':'City',name:'Melbourne'}}:{about:{'@id':'/#ellis-organization'}})},
   {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:'/'},{'@type':'ListItem',position:2,name:x.isService?'Services':'Property sectors',item:x.isService?'/services/':'/sectors/'},{'@type':'ListItem',position:3,name:x.h1En,item:'/'+x.route+'/'}]}
  ]};
  const serviceLinks=(i,cls)=>{const items=(sectionLinks[x.id]?.[i]||[]).map(id=>`<a href="/${byId[id].route}/" data-local-page data-zh="${esc(byId[id].label[0])} ↗" data-en="${esc(byId[id].label[1])} ↗">${esc(byId[id].label[0])} ↗</a>`).join('');return items?`<div class="${cls}">${items}</div>`:'';};
  const body=sectorDetail(x,serviceLinks);
  const flowAssets='<link rel="stylesheet" href="/sector-detail-flow.css"><script src="/sector-detail-flow.js" defer></script>';
  page(x.route,x.h1Zh,x.h1En,body+faq+cta,related,{topic:x,intro:x.intro,titleZh,titleEn,descriptionZh,descriptionEn,extraHead:`${flowAssets}<script type="application/ld+json">${json(schema)}</script>`});
 }
 return records.map(x=>({...x,sectionLinks:sectionLinks[x.id]}));
};
