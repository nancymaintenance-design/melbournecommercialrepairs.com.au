/* Build real, source-backed detail pages without adding a framework. */
const fs=require('fs'),path=require('path'),vm=require('vm');
const versionAssets=require('./content/asset-versions.cjs');
const root=__dirname,app=fs.readFileSync(path.join(root,'app.js'),'utf8');
const data=vm.runInNewContext(app.slice(app.indexOf('  const services ='),app.indexOf('  function renderServices()'))+';({services,sectors,articles,faqs})');
const serviceSlugs=['building-maintenance','roofing-waterproofing','electrical-lighting','plumbing-drainage-gas','hvac-building-systems','fire-security-access','landscaping-irrigation','signage-wayfinding','facade-high-access-cleaning','cleaning-waste-hygiene','car-parks-external-works','fit-outs-make-good'];
const sectorSlugs=['offices','retail-shopping-centres','hospitality','warehouses-logistics','industrial-business-parks','medical-health','education-community','commercial-common-areas'];
const articleSlugs=['maintenance-plan','facade-cleaning','signage-make-good'];
const areaRegions=require('./content/area-data.cjs');
const areaTheatre=require('./content/area-theatre.cjs');
const areaDetail=require('./content/area-detail.cjs');
const e=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const dual=(tag,zh,en,cls='')=>`<${tag}${cls?` class="${cls}"`:''} data-zh="${e(zh)}" data-en="${e(en)}">${e(zh)}</${tag}>`;
const business=require('./business.json');
const external=(url,zh,en,cls='text-link')=>`<a class="${cls}" href="${e(url)}" target="_blank" rel="noopener noreferrer" data-zh="${e(zh)}" data-en="${e(en)}">${e(zh)}</a>`;
const registration=`<div class="business-registration"><p class="micro-label">COMPANY REGISTRATION</p><h3>${business.legalName}</h3><dl class="registration-grid">${[
 ['澳大利亚商业号码','Australian Business Number',business.abn],['公司号码','Australian Company Number',business.acn],['登记类型','Entity type',dual('span','澳大利亚私人公司',business.entityType)],['ABN 状态','ABN status',dual('span','有效 · 自 2020 年 11 月 11 日起','Active since 11 November 2020')],['GST 登记','GST registration',dual('span','自 2020 年 11 月 11 日起登记','Registered since 11 November 2020')],['主要经营登记地区','Main business location',business.registeredRegion]
 ].map(([zh,en,value])=>`<div>${dual('dt',zh,en)}<dd>${value}</dd></div>`).join('')}</dl>${external(business.registerUrl,'在 ABN Lookup 核验登记 ↗','Verify registration on ABN Lookup ↗')}<p class="registration-date" data-zh="登记信息核对于 2026 年 11 月 13 日" data-en="Registration checked on 13 November 2026">登记信息核对于 2026 年 11 月 13 日</p></div>`;
const mapSection=require('./content/home-location.cjs').section(business);
const organizationSchema=`<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'Organization','@id':'/#ellis-organization',name:business.name,legalName:business.legalName,taxID:business.abn,identifier:[{'@type':'PropertyValue',propertyID:'ABN',value:business.abn},{'@type':'PropertyValue',propertyID:'ACN',value:business.acn}],address:{'@type':'PostalAddress',addressRegion:'VIC',streetAddress:'459 Collins St',addressLocality:'Melbourne',postalCode:'3004',addressCountry:'AU'},telephone:business.telephone,areaServed:{'@type':'City',name:'Melbourne'},sameAs:[business.registerUrl,business.mapsUrl]})}</script>`;
let home=fs.readFileSync(path.join(root,'index.html'),'utf8');
home=require('./navigation.cjs').rewrite(home);
home=home.replace(/<link\b[^>]*href="\/?navigation-refinement\.css(?:\?[^\"]*)?"[^>]*>/g,'').replace('</head>','<link rel="stylesheet" href="/navigation-refinement.css"></head>');
home=home.replace(/(<a[^>]*class="brand"[^>]*href=")#[^"]*/,'$1/').replace(/(<a href=")#home(" class="brand")/,'$1/$2');
let footer=fs.readFileSync(path.join(root,'footer.html'),'utf8');
footer=footer.replace(/<div class="footer-registration">[\s\S]*?<\/div>/,'');
footer=footer.replace(/(<p class="footer-location">)/,`<div class="footer-registration"><span>${business.legalName}</span>${external(business.registerUrl,'ABN '+business.abn+' ↗','ABN '+business.abn+' ↗')}</div>$1`);
footer=footer.replace(/<p class="footer-map-contact">[\s\S]*?<\/p>/,'');
footer=footer.replace('<p class="footer-location">',`<p class="footer-map-contact"><a href="${business.telephoneHref}">${business.telephoneDisplay}</a><a href="${business.mapsUrl}" target="_blank" rel="noopener noreferrer">459 Collins St, Melbourne VIC 3004 ↗</a></p><p class="footer-location">`);
footer=footer.replace('href="/#about"','href="/about/" data-local-page');
footer=footer.replaceAll('href="/#faq"','href="/faq/"').replaceAll('href="/#contact"','href="/contact/"');
fs.writeFileSync(path.join(root,'footer.html'),footer);
home=home.replace(/<section id="about"[\s\S]*?<\/section>/,require('./home-about-brand.js').section(business,registration));
if(!home.includes('home-about-brand.js'))home=home.replace(/<script src="app\.js(?:\?[^\"]*)?"/,match=>'<link rel="stylesheet" href="home-about-brand.css"><script src="home-about-brand.js" defer></script>'+match);
home=home.replace(/\s*<section id="location"[\s\S]*?<\/section>/,'');
home=home.replace(/\s*<section id="contact"[\s\S]*?<\/section>/,'');
home=home.replace('</main>',mapSection+'\n'+require('./content/home-contact.cjs').section()+'\n</main>');
home=home.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g,'').replace('</head>',organizationSchema+'\n</head>');
home=home.replace(/<!-- home-locales:start -->[\s\S]*?<!-- home-locales:end -->/,'').replace('</head>','<!-- home-locales:start --><link rel="canonical" href="/?lang=zh"><link rel="alternate" hreflang="zh-CN" href="/?lang=zh"><link rel="alternate" hreflang="en-AU" href="/?lang=en"><link rel="alternate" hreflang="x-default" href="/?lang=zh"><!-- home-locales:end --></head>');
home=home.replace(/<a class="sector-directory-link\b[^\"]*"[\s\S]*?<\/a>/g,'').replace(/<div class="sector-layout"/, '<a class="sector-directory-link text-link" href="/sectors/" data-local-page data-zh="查看全部 8 类物业维护详情 ↗" data-en="Explore all 8 property maintenance pages ↗">查看全部 8 类物业维护详情 ↗</a><div class="sector-layout"');
home=home.replace(/<footer[\s\S]*?<\/footer>/,footer.trim());
const header=home.match(/  <header[\s\S]*?<\/header>/)[0].replace(/href="#/g,'href="/#').replace(/src="assets\//g,'src="/assets/');
const cards=(items,base,slugs)=>`<div class="detail-links">${items.map((x,i)=>`<a href="/${base}/${slugs[i]}/" data-local-page>${dual('h3',x.zh,x.en)}${dual('p',x.subZh||x.descZh||x.catZh,x.subEn||x.descEn||x.catEn)}<span aria-hidden="true">↗</span></a>`).join('')}</div>`;
function page(route,zh,en,content,related='',options={}){
 const areaOverview=route==='areas/melbourne',areaRegion=options.areaRegion===true;
 const compactPages={insights:['insights-editorial','insights-editorial-page'],faq:['faq-index','faq-index-page'],about:['about-profile','about-profile-page']};
 const compactPage=compactPages[route];
 if(compactPage){content='';related='';}
 if(route==='privacy')content+=dual('h2','Google 地图','Google Maps')+dual('p','首页嵌入 Google 地图。加载地图时，浏览器会连接 Google，其隐私政策适用于地图服务。你也可以通过地图链接直接打开商家位置。','The homepage embeds Google Maps. Loading the map connects your browser to Google, whose privacy policy applies to the map service. You can also open our business location using the map link.')+external('https://policies.google.com/privacy','Google 隐私政策 ↗','Google privacy policy ↗');
 const metadata={route:'/'+route+'/',titleZh:options.titleZh||zh+' | Ellis Services Group Melbourne',titleEn:options.titleEn||en+' | Ellis Services Group Melbourne',descriptionZh:options.descriptionZh||zh+'。Ellis Services Group 为墨尔本商业物业统筹维修与维护项目。',descriptionEn:options.descriptionEn||en+'. We coordinate commercial property repairs and maintenance in Melbourne.'};
 const topic=options.topic;
 const pageFooter=route==='contact'?footer.replaceAll('459 Collins St, Melbourne VIC 3004','459 Collins Street, Melbourne VIC 3000'):footer;
 const pageOrganizationSchema=route==='contact'?organizationSchema.replace('"postalCode":"3004"','"postalCode":"3000"').replace('"telephone":'+JSON.stringify(business.telephone),'"telephone":'+JSON.stringify(business.telephone)+',"email":"elliservices.group@gmail.com"'):organizationSchema;
 const heading=compactPage?(route==='insights'?require('./content/insights-editorial.cjs').section(data.articles,articleSlugs):route==='faq'?require('./content/faq-index.cjs').section(data.faqs,data.services,serviceSlugs):require('./content/about-profile.cjs').section(business,registration)):areaOverview?areaTheatre.section({home:false}):areaRegion?'':route==='contact'?require('./content/contact-page.cjs').section(data.services,data.sectors):route==='services'?require('./content/service-directory.cjs').section(data.services,serviceSlugs,zh,en):route==='sectors'?require('./content/sector-explorer.cjs').section(data.sectors,sectorSlugs,zh,en):require('./content/design-shell.cjs').heading(route,zh,en,options);
 const localeHead=`<link rel="canonical" href="/${route}/?lang=zh"><link rel="alternate" hreflang="zh-CN" href="/${route}/?lang=zh"><link rel="alternate" hreflang="en-AU" href="/${route}/?lang=en"><link rel="alternate" hreflang="x-default" href="/${route}/?lang=zh"><script type="application/json" id="page-meta">${JSON.stringify(metadata).replace(/</g,'\\u003c')}</script>${options.extraHead||''}`;
 const html=`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${e(metadata.titleZh)}</title><meta name="description" content="${e(metadata.descriptionZh)}">${localeHead}<link rel="icon" href="/assets/ellis-services-logo.png"><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/lower.css"><link rel="stylesheet" href="/cinematic.css"><link rel="stylesheet" href="/continuous.css"><link rel="stylesheet" href="/designer.css?v=20261114-13"><script src="/detail.js" defer></script><script src="/designer-motion.js?v=20261114-13" defer></script></head><body class="cinematic-v2 detail-page${topic?' content-detail':''}${route==='contact'?' contact-page':''}${areaOverview?' area-overview-page':areaRegion?' area-region-page':''}"><a class="skip-link" href="#main">Skip to content</a>${header}<main id="main" class="detail-main"><nav class="breadcrumbs"><a href="/" data-zh="首页" data-en="Home">首页</a><span aria-hidden="true"> / </span>${topic?`<a href="/${topic.isService?'services':'sectors'}/" data-local-page data-zh="${topic.isService?'服务目录':'商业场景'}" data-en="${topic.isService?'Services':'Property sectors'}">${topic.isService?'服务目录':'商业场景'}</a><span aria-hidden="true"> / </span>`:''}<span data-zh="${e(zh)}" data-en="${e(en)}">${e(zh)}</span></nav>${heading}${content}${related}</main>${pageFooter}</body></html>`;
 const areaAssets=areaOverview||areaRegion?'<link rel="stylesheet" href="/area-theatre.css">'+(areaOverview?'<script src="/area-theatre.js" defer></script>':''):'';
 const customContent=['services','sectors'].includes(route)||areaOverview||areaRegion||!!compactPage;
 const compactAssets=compactPage?`<link rel="stylesheet" href="/compact-index-shell.css"><link rel="stylesheet" href="/${compactPage[0]}.css"><script src="/${compactPage[0]}.js" defer></script>`:'';
 const finalHtml=html.replace('</head>',`<link rel="stylesheet" href="/inner-flow.css">${route==='services'?'<link rel="stylesheet" href="/service-directory.css"><script src="/service-directory.js" defer></script>':route==='sectors'?'<link rel="stylesheet" href="/sector-explorer.css"><script src="/sector-explorer.js" defer></script>':''}`+areaAssets+compactAssets+'<link rel="stylesheet" href="/navigation-refinement.css"><link rel="stylesheet" href="/readability-refinement.css">'+pageOrganizationSchema+'</head>').replace('class="cinematic-v2 detail-page','class="cinematic-v2 designer-detail detail-page'+(compactPage?' '+compactPage[1]:'')).replace('<main id="main"',require('./content/design-shell.cjs').rail+'<main id="main"').replace(heading+content,heading+(customContent?content:'<div id="page-content" class="designer-page-content">'+content+'</div>'));
 const dest=path.join(root,route,'index.html');fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,versionAssets(finalHtml,root));
}
const topicRecords=require('./content/render-topics.cjs')(page,data,serviceSlugs,sectorSlugs);
page('services','墨尔本商业维护服务','Commercial maintenance services in Melbourne','');
page('sectors','我们服务的商业物业','Commercial properties we maintain','');
page('about','关于 Ellis Services Group','About Ellis Services Group',dual('p','Ellis Services Group 为墨尔本商业物业统筹建筑维修、楼宇设备与室外场地维护。从单项维修到持续维护，我们结合现场需求，明确工作范围及工种安排。','Ellis Services Group coordinates building repairs, building systems and grounds maintenance for commercial properties in Melbourne. From one-off repairs to ongoing maintenance, we define the scope and coordinate the trades around your site.','detail-lead')+registration+dual('h2','服务墨尔本商业物业','Supporting Melbourne commercial properties')+dual('p','我们的服务面向墨尔本。主要经营登记地区为 VIC 3030；该公开记录未列出街道地址。','Our services are for Melbourne. The public register lists VIC 3030 as the main business location and does not publish a street address.')+external(business.mapsUrl,'查看商家地图 ↗','View business map ↗'),dual('h2','了解我们的服务','Explore our services')+cards(data.services.slice(0,3),'services',serviceSlugs.slice(0,3)));
data.articles.forEach((x,i)=>page('insights/'+articleSlugs[i],x.zh,x.en,x.bodyZh.map(([h,t],j)=>dual('h2',h,x.bodyEn[j][0])+dual('p',t,x.bodyEn[j][1])).join(''),dual('h2','从资讯到具体服务','Explore the relevant services')+cards([data.services[x.icon],data.services[0]],'services',[serviceSlugs[x.icon],serviceSlugs[0]])));
page('insights','商业物业维护资讯','Commercial property maintenance insights',cards(data.articles,'insights',articleSlugs));
page('areas/melbourne','墨尔本服务地区','Service area: Melbourne','');
areaRegions.forEach(region=>{
 const locationEn=/Melbourne/i.test(region.en)?region.en:region.en+', Melbourne';
 page(region.route.replace(/^\/+|\/+$/g,''),region.zh+'商业物业维护',region.en+': commercial property maintenance',areaDetail.section(region,areaRegions,{heading:true}),'',{
  areaRegion:true,
  titleZh:'墨尔本'+region.zh+'商业物业维护 | Ellis Services Group',
  titleEn:locationEn+' Commercial Property Maintenance | Ellis Services Group',
  descriptionZh:'我们为墨尔本'+region.zh+'商业物业安排建筑、设备与场地维护，确认现场进入条件、作业时段、工种范围和完工记录。',
  descriptionEn:'We coordinate commercial property maintenance in '+locationEn+', confirming site access, work periods, trade scope and completion records.'
 });
});
page('privacy','隐私说明','Privacy information',dual('h2','咨询草稿','Enquiry drafts')+dual('p','当前页面是本地设计预览。姓名、邮箱、地址和项目描述只用于在当前浏览器页面生成咨询草稿，表单没有向公司发送信息的接收接口。关闭页面后不会由本预览保存这些输入。','This is a local design preview. Name, email, address and project details are used to create an enquiry draft in the current browser page. The form has no receiving endpoint that sends this information to the company. This preview does not retain these inputs after the page is closed.')+dual('h2','启用正式接收前','Before live enquiries are enabled')+dual('p','如后续接入正式询盘服务，须先公布接收信息、用途及相关隐私安排。本页不要求提供支付资料或身份证明。','Before a live enquiry service is connected, its receiving details, purposes and privacy arrangements must be stated. This page does not request payment details or identity documents.'));
page('faq','商业物业维护常见问题','Commercial Property Maintenance FAQs',`<section class="topic-faq" data-entrance>${dual('h2','先了解，再安排现场','Understand the work. Plan the visit.')}<div class="topic-faq-list">${data.faqs.map(f=>`<details><summary>${dual('span',f[0],f[1])}<span class="faq-symbol" aria-hidden="true">+</span></summary>${dual('p',f[2],f[3])}</details>`).join('')}</div></section>`,dual('h2','按具体任务了解服务','Explore the work by service')+cards(data.services,'services',serviceSlugs),{intro:['单次维修、长期维护与多工种工程。从你关心的问题开始，找到具体的服务范围。','One-off repairs, ongoing care and multi-trade work. Start with your questions and explore the scope for your property.']});
page('contact','聊聊你的墨尔本项目','Let’s Talk About Your Melbourne Property','','',{extraHead:'<link rel="stylesheet" href="/contact-page.css"><script src="/contact-page.js" defer></script>'});
// Provide the same real links in the initial HTML, including without JavaScript.
home=home.replace(/<div class="service-grid" id="service-grid">[\s\S]*?<\/div>\s*<div class="service-bottom">/,`<div class="service-grid" id="service-grid">${data.services.map((x,i)=>`<a class="service-card" href="/services/${serviceSlugs[i]}/" data-local-page data-service="${i}"><div class="service-card-top"><span>${String(i+1).padStart(2,'0')} / 12</span></div><h3>${e(x.zh)}</h3><p>${e(x.subZh)}</p><span class="service-card-arrow">↗</span></a>`).join('')}</div><div class="service-bottom">`);
home=home.replace(/<section id="news"[\s\S]*?<\/section>/,require('./home-news-magazine.js').section(data.articles,articleSlugs));
if(!home.includes('home-news-magazine.js'))home=home.replace(/<script src="app\.js(?:\?[^\"]*)?"/,match=>'<link rel="stylesheet" href="home-news-magazine.css"><script src="home-news-magazine.js" defer></script>'+match);
const ribbonCycle=data.services.map(x=>`<b data-zh="${e(x.zh)}" data-en="${e(x.en)}">${e(x.zh)}</b><i>·</i>`).join('');
home=home.replace(/<div class="service-ribbon"[^>]*>[\s\S]*?<\/div><\/div>/,`<div class="service-ribbon" aria-hidden="true"><div class="ribbon-track"><span class="ribbon-group">${ribbonCycle}</span><span class="ribbon-group">${ribbonCycle}</span></div></div>`);
home=home.replace(/(<div[^>]*id="faq-list"[^>]*>)[\s\S]*?(<\/div>\s*<\/section>)/,`$1${data.faqs.map((f,i)=>`<details data-index="${i}"${i===0?' open':''}><summary>${dual('span',f[0],f[1])}</summary>${dual('p',f[2],f[3])}</details>`).join('')}$2`);
home=home.replace(/<section id="services"[\s\S]*?<\/section>/,require('./service-showcase.js').section(data.services,serviceSlugs));
if(!home.includes('service-showcase.css'))home=home.replace(/<script src="app\.js(?:\?[^\"]*)?"/, '<link rel="stylesheet" href="service-showcase.css"><script src="service-showcase.js" defer></script><script src="app.js"');
const selectorStart=home.search(/<div class="sector-layout"(?:\s|>)/);
if(selectorStart>=0){const tags=/<\/?div\b[^>]*>/g;tags.lastIndex=selectorStart;let depth=0,tag,selectorEnd;while((tag=tags.exec(home))){depth+=tag[0].startsWith('</')?-1:1;if(!depth){selectorEnd=tags.lastIndex;break}}if(!selectorEnd)throw new Error('Property selector wrapper is incomplete');home=home.slice(0,selectorStart)+require('./home-sector-selector.js').markup(data.sectors,sectorSlugs)+home.slice(selectorEnd);}
if(!home.includes('home-sector-selector.js'))home=home.replace(/<script src="app\.js(?:\?[^\"]*)?"/,match=>'<link rel="stylesheet" href="home-sector-selector.css"><script src="home-sector-selector.js" defer></script>'+match);
const areaStart=home.search(/<section\b[^>]*\bid="areas"/);
if(areaStart<0)throw new Error('Homepage area section is missing');
const areaTags=/<\/?section\b[^>]*>/g;areaTags.lastIndex=areaStart;
let areaDepth=0,areaTag,areaEnd;
while((areaTag=areaTags.exec(home))){areaDepth+=areaTag[0].startsWith('</')?-1:1;if(!areaDepth){areaEnd=areaTags.lastIndex;break}}
if(!areaEnd)throw new Error('Homepage area section is incomplete');
home=home.slice(0,areaStart)+areaTheatre.section({home:true})+home.slice(areaEnd);
if(!home.includes('area-theatre.css'))home=home.replace('</head>','<link rel="stylesheet" href="area-theatre.css"></head>');
if(!home.includes('area-theatre.js'))home=home.replace('</head>','<script src="area-theatre.js" defer></script></head>');
home=home.replace(/<link\b[^>]*href="\/?(?:home-location|navigation-refinement|readability-refinement)\.css(?:\?[^\"]*)?"[^>]*>/g,'').replace('</head>','<link rel="stylesheet" href="/navigation-refinement.css"><link rel="stylesheet" href="/readability-refinement.css"></head>');
fs.writeFileSync(path.join(root,'index.html'),versionAssets(home,root));
console.log('Built 41 detail/index pages and linked homepage.');
