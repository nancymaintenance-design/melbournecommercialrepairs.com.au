import { icon } from './icons.mjs';
import { getVisual } from './visuals.mjs';
import { SERVICE_CATALOG } from './region-links.mjs';

/** Dependency-free server rendering. All meaningful copy and destinations are HTML. */
export const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const e = escapeHtml;
const text = (lang, zh, en) => lang === 'zh' ? zh : en;
const cleanPath = pathname => `/${String(pathname || '/').split('?')[0].replace(/^\/+|\/+$/g, '')}/`.replace(/^\/\/$/, '/');
const language = value => value === 'en' ? 'en' : 'zh';
const variants = {
  'cbd-inner-melbourne':'cutaway',
  'eastern-suburbs':'zoned',
  'south-east-melbourne':'layers',
  'western-suburbs':'panorama',
  'northern-suburbs':'workorders',
  'north-east-melbourne':'courtyard',
  'north-west-melbourne':'dual',
  'bayside-southern-suburbs':'detail',
  'casey-cardinia':'stages',
  'frankston-mornington-peninsula':'connected',
};
const serviceCatalog = SERVICE_CATALOG.map(service => [service.slug, service.names.zh, service.names.en]);
const shortServiceLabels = {
 'building-maintenance':['建筑维修','Building'], 'roofing-waterproofing':['屋面防水','Roofing'],
 'electrical-lighting':['商业电气','Electrical'], 'plumbing-drainage-gas':['水管排水','Plumbing'],
 'hvac-building-systems':['空调设备','HVAC'], 'fire-security-access':['消防安防','Fire & access'],
 'landscaping-irrigation':['园林环境','Landscaping'], 'signage-wayfinding':['标识导视','Signage'],
 'facade-high-access-cleaning':['外立面清洁','Facades'], 'cleaning-waste-hygiene':['清洁卫生','Cleaning'],
 'car-parks-external-works':['停车场','Car parks'], 'fit-outs-make-good':['商业翻新','Fit-outs'],
};
const shortService = (c,slug) => shortServiceLabels[slug]?.[c.lang==='zh'?0:1] || slug;
const socialLinks = [
  ['instagram','Instagram','查看动态','Updates','https://www.instagram.com/elliservices_group/'],
  ['facebook','Facebook','关注我们','Follow Ellis','https://www.facebook.com/p/Ellis-Services-Group-100082926022259/'],
  ['google','Google Reviews','查看客户评价','Read customer reviews','https://maps.app.goo.gl/FtP6ee7x1Ra4KX4z8'],
  ['linkedin','LinkedIn','公司主页','Company profile','https://www.linkedin.com/in/ellis-services-group-091541266/'],
];

export function resolvePage(data, pathname) {
  const route = cleanPath(pathname);
  if (route === '/' || route === data.hub.route) return {kind:'hub',route:data.hub.route,page:data.hub};
  const region = data.regions.find(item => item.route === route);
  if (region) return {kind:'region',route:region.route,page:region};
  if (route === '/contact/') return {kind:'contact',route,page:null};
  return null;
}

function makeContext(options) {
  const lang = language(options.lang);
  const siteOrigin = (options.siteOrigin || 'https://melbournecommercialrepairscomau.vercel.app').replace(/\/$/, '');
  const local = resolvePage(options.data, options.pathname) || {kind:'not-found',route:cleanPath(options.pathname),page:null};
  const assetBase = (options.assetBase || '/assets').replace(/\/$/, '');
  const href = (path, extra = {}) => {
    const q = new URLSearchParams({lang,...extra});
    return `${path}?${q}`;
  };
  const service = slug => `${siteOrigin}${href(`/services/${slug}/`)}`;
  const regionHref = region => href(region.route);
  const external = path => `${siteOrigin}${href(path)}`;
  const contact = (region, serviceSlug) => {
    const area = region ? (region.areaParam || region.route.split('/').filter(Boolean).at(-1)) : '';
    const params = {...(area ? {area}:{}),...(serviceSlug ? {service:serviceSlug}:{})};
    return `${options.contactLocal === false ? siteOrigin : ''}${href('/contact/',params)}#contact-enquiry-form`;
  };
  return {...options,lang,siteOrigin,assetBase,local,href,service,regionHref,external,contact, t:(zh,en)=>text(lang,zh,en)};
}

function asset(c, path) {
  if (!path) return `${c.assetBase}/architecture.webp`;
  return path.startsWith('/assets/') ? `${c.assetBase}/${path.slice(8)}` : path;
}
function visual(c, slug) {
  const v = getVisual(slug) || {};
  const fallback = {src:'/assets/architecture.webp',altZh:'商业建筑维护场景示意',altEn:'Illustrative commercial maintenance scene',width:1536,height:1024};
  const media = value => typeof value === 'string' ? {...fallback,src:value} : {...fallback,...(value || {})};
  return {...v,hero:media(v.hero),scene:media(v.scene || v.hero),card:media(v.card || v.hero),preview:media(v.preview || v.scene || v.hero),details:(v.details || []).map(media),hotspotPositions:v.hotspotPositions || [{x:28,y:38},{x:65,y:25},{x:73,y:72}]};
}
function picture(c, img, {className='',priority=false,loading='lazy',alt} = {}) {
  const title = alt ?? (c.lang === 'zh' ? img.altZh : img.altEn) ?? '';
  return `<img class="${e(className)}" src="${e(asset(c,img.src))}" alt="${e(title)}" width="${Number(img.width)||1536}" height="${Number(img.height)||1024}" loading="${priority?'eager':loading}" decoding="async"${img.position?` style="object-position:${e(img.position)}"`:""}${priority?' fetchpriority="high"':''}>`;
}
function action(label, href, variant='primary', extra='') {
  return `<a class="button button--${e(variant)}" href="${e(href)}" ${extra}><span>${e(label)}</span>${icon('arrow')}</a>`;
}
function sectionHeading(number,kicker,title,extra='') {
  return `<div class="section-heading"><div><p class="section-kicker"><span>${e(number)}</span> / ${e(kicker)}</p><h2>${e(title)}</h2></div>${extra}</div>`;
}
function brand(c) {
  return `<a class="brand" href="${e(c.external('/'))}" aria-label="Ellis Services Group ${c.t('首页','home')}"><img src="${c.assetBase}/ellis-services.png" alt="" width="512" height="512"><span class="brand__wordmark">ELLIS<span>SERVICES GROUP</span></span></a>`;
}
function header(c) {
  const nav = [
    ['/', '首页','Home'],['/services/','服务内容','Services'],['/sectors/','商业种类','Sectors'],
    ['/areas/melbourne/','地区','Areas'],['/insights/','新闻','Insights'],['/faq/','FAQ','FAQ'],
    ['/about/','关于我们','About'],['/contact/','联系我们','Contact'],
  ];
  const active = c.local.kind === 'contact' ? '/contact/' : '/areas/melbourne/';
  const navLinks = nav.map(([path,zh,en])=>{
    const url = path === '/areas/melbourne/' ? c.href(path) : path === '/contact/' ? c.contact() : c.external(path);
    return `<a href="${e(url)}"${path===active?' aria-current="page"':''} class="${path==='/contact/'?'nav-contact':''}">${c.t(zh,en)}</a>`;
  }).join('');
  const params = new URLSearchParams(c.search || '');
  const langHref = lang => {
    const p = new URLSearchParams({lang});
    for (const k of ['area','service']) if (params.has(k)) p.set(k,params.get(k));
    return `${c.local.route}?${p}`;
  };
  return `<a class="skip-link" href="#main">${c.t('跳到主要内容','Skip to content')}</a><header class="site-header" id="page-top">
    ${brand(c)}<nav class="desktop-nav" aria-label="${c.t('主导航','Main navigation')}">${navLinks}</nav>
    <div class="header-tools"><div class="language-switch" aria-label="${c.t('语言','Language')}"><a href="${e(langHref('zh'))}" lang="zh-Hans"${c.lang==='zh'?' aria-current="true"':''}>中</a><span aria-hidden="true">/</span><a href="${e(langHref('en'))}" lang="en"${c.lang==='en'?' aria-current="true"':''}>EN</a></div><button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-nav" aria-label="${c.t('打开导航','Open navigation')}">${icon('menu')}</button></div>
    <nav class="mobile-nav" id="mobile-nav" data-mobile-nav aria-label="${c.t('移动端导航','Mobile navigation')}">${navLinks}</nav>
  </header>`;
}
function breadcrumbs(c, region) {
  return `<nav class="breadcrumbs" aria-label="${c.t('页面位置','Breadcrumb')}"><ol><li><a href="${e(c.external('/'))}">${c.t('首页','Home')}</a></li><li>${region?`<a href="${e(c.href(c.data.hub.route))}">${c.t('墨尔本服务地区','Melbourne service areas')}</a>`:`<span aria-current="page">${c.t('墨尔本服务地区','Melbourne service areas')}</span>`}</li>${region?`<li><span aria-current="page">${e(c.lang==='zh'?region.nameZh:region.nameEn)}</span></li>`:''}</ol></nav>`;
}
function insurance(c, className='') {
  return `<span class="insurance ${className}">${icon('shield')}<span>${e(c.data.business.insurance.labelEn)}</span></span>`;
}
export function heroHeading(c, heading, region, breakBefore) {
  if (!region) {
    const start = breakBefore ? heading.indexOf(breakBefore) : -1;
    return start>0?`<span class="h1-phrase">${e(heading.slice(0,start))}</span><span class="h1-phrase">${e(heading.slice(start))}</span>`:e(heading);
  }
  if (c.lang !== 'zh') return e(heading);
  const splitAt = heading.indexOf('商业');
  if (splitAt <= 0) return e(heading);
  return `<span class="h1-phrase">${e(heading.slice(0, splitAt))}</span><span class="h1-phrase">${e(heading.slice(splitAt))}</span>`;
}
function hero(c, region) {
  const page = region || c.data.hub;
  const copy = page.locales[c.lang];
  const v = visual(c,region?.slug || 'melbourne');
  return `<section class="hero ${region?'hero--region':'hero--hub'}" aria-labelledby="page-heading">
    <div class="hero__inner content-width">${breadcrumbs(c,region)}<div class="hero__grid"><div class="hero__copy">${region?`<p class="eyebrow">ELLIS / MELBOURNE <span>/ ${region.number}</span></p>`:''}<h1 id="page-heading">${heroHeading(c,copy.h1,region,copy.h1BreakBefore)}</h1><p class="hero__lead">${e(copy.heroLead)}</p><div class="hero__actions">${action(c.t(region?'查看相关服务':'查看服务',region?'Explore relevant services':'View services'),region?'#services':'#regions')}${region?`<a class="text-link text-link--light" href="${e(c.contact(region))}">${c.t('咨询本区项目','Discuss your project')}${icon('arrow')}</a>`:insurance(c)}</div>${region?insurance(c):''}</div>
    <div class="hero__media" data-tilt><div class="hero__ribbon" data-motion-decoration aria-hidden="true"></div>${picture(c,v.hero,{priority:true,className:'hero__image'})}<span class="hero__media-label">${c.t(region?'商业物业 · 场景示意':'MELBOURNE / VICTORIA',region?'COMMERCIAL PROPERTY / ILLUSTRATION':'MELBOURNE / VICTORIA')}</span><span class="hero__coordinate" aria-hidden="true">${region?region.number:'MEL'}</span></div></div></div>
  </section>`;
}
function serviceRail(c, region) {
  const slugs = region ? region.priorityServices.map(s=>s.slug) : serviceCatalog.map(s=>s[0]);
  const all = `<a class="service-rail__all" href="${e(c.external('/services/'))}">${c.t('服务总览','All services')}${icon('right')}</a>`;
  return `<nav class="service-rail content-width${region?'':' service-rail--hub'}" aria-label="${c.t('相关服务快速入口','Quick service links')}">${region?'':all}${slugs.map(slug=>{const s=serviceCatalog.find(x=>x[0]===slug);return `<a href="${e(c.service(slug))}">${e(region?s[c.lang==='zh'?1:2]:shortService(c,slug))}${icon('arrow')}</a>`;}).join('')}${region?all:''}</nav>`;
}

function serviceCards(c, region) {
  const copy=region.locales[c.lang];
  return `<section id="services" class="services-section content-width" aria-labelledby="services-heading"><div class="section-heading"><div><p class="section-kicker">02 / ${c.t('从工作内容开始','RELEVANT SERVICES')}</p><h2 id="services-heading">${e(copy.sectionHeadings.services)}</h2></div><a class="text-link" href="${e(c.external('/services/'))}">${c.t('全部 12 大服务','All 12 services')}${icon('arrow')}</a></div><div class="service-grid">${region.priorityServices.map((s,i)=>`<a class="service-card" href="${e(c.service(s.slug))}" data-reveal><span class="service-card__top"><span class="service-card__number">0${i+1}</span>${icon(i===0?'building':i===1?'layers':i===2?'wrench':'arrow')}</span><h3>${e(c.lang==='zh'?s.anchorZh:s.anchorEn)}</h3><p>${e(c.lang==='zh'?s.contextZh:s.contextEn)}</p><span class="service-card__link">${c.t('查看服务范围与方法','Explore scope and approach')}${icon('arrow')}</span></a>`).join('')}</div></section>`;
}
function scenePanel(c, region, scene, index) {
  return `<article class="scene-panel${index===0?' is-active':''}" id="scene-panel-${index}" data-scene-panel="${index}" aria-labelledby="scene-title-${index}"><div class="scene-panel__heading"><span class="scene-panel__number">0${index+1}</span><h3 id="scene-title-${index}">${e(scene.title)}</h3></div><dl class="scene-steps"><div><dt><span>01</span>${c.t('现场问题','The issue')}</dt><dd>${e(scene.problem)}</dd></div><div><dt><span>02</span>${c.t('处理方法','Our approach')}</dt><dd>${e(scene.approach)}</dd></div><div><dt><span>03</span>${c.t('交接内容','At handover')}</dt><dd>${e(scene.handover)}</dd></div></dl><div class="scene-panel__links">${scene.serviceSlugs.map(slug=>{const s=region.priorityServices.find(x=>x.slug===slug);const fallback=serviceCatalog.find(x=>x[0]===slug);return `<a href="${e(c.service(slug))}">${e(s?(c.lang==='zh'?s.anchorZh:s.anchorEn):fallback?.[c.lang==='zh'?1:2] || slug)}${icon('arrow')}</a>`;}).join('')}</div>${action(c.t('咨询这个维修项目','Discuss this maintenance task'),c.contact(region,scene.serviceSlugs[0]),'lime')}</article>`;
}
function sceneSection(c, region) {
  const copy=region.locales[c.lang],v=visual(c,region.slug),variant=variants[region.slug];
  const scenes=copy.scenarios;
  const positions=v.hotspotPositions;
  const selectors=scenes.map((s,i)=>`<button class="scene-select${i===0?' is-active':''}" type="button" data-scene-select="${i}" aria-pressed="${i===0?'true':'false'}" aria-controls="scene-panel-${i}"><span class="scene-select__number">0${i+1}</span><span>${e(s.title)}</span>${icon('arrow')}</button>`).join('');
  const hotspots=scenes.map((s,i)=>`<button class="scene-hotspot${i===0?' is-active':''}" type="button" data-scene-select="${i}" aria-controls="scene-panel-${i}" aria-pressed="${i===0?'true':'false'}" style="--hotspot-x:${positions[i]?.x??(25+i*24)}%;--hotspot-y:${positions[i]?.y??(35+i*14)}%" aria-label="${e(c.t('展开：','Explore: ')+s.title)}"><span>0${i+1}</span><span class="scene-hotspot__label">${e(s.title)}</span></button>`).join('');
  const detailImage=v.details[0] || v.scene;
  const secondImage=v.details[1] || v.hero;
  const detailWindow=['dual','detail','connected'].includes(variant)?`<figure class="scene-inset scene-inset--${variant}">${picture(c,detailImage,{className:'scene-inset__image'})}<figcaption>${e(scenes[variant==='dual'?2:1].title)}</figcaption></figure>`:'';
  const workCards=['workorders','stages'].includes(variant)?`<div class="scene-workorders">${scenes.map((s,i)=>`<button class="scene-workorder${i===0?' is-active':''}" type="button" data-scene-select="${i}" aria-pressed="${i===0?'true':'false'}" aria-controls="scene-panel-${i}">${picture(c,v.details[i] || (i===0?v.scene:i===1?detailImage:secondImage),{className:'scene-workorder__image'})}<span class="scene-workorder__body"><span class="scene-select__number">0${i+1}</span><strong>${e(s.title)}</strong>${icon('arrow')}</span></button>`).join('')}</div>`:'';
  return `<section class="scene-section content-width" id="scenarios" aria-labelledby="scene-heading"><div class="section-heading"><div><p class="section-kicker">01 / ${c.t('从现场找到答案','SCENES & SOLUTIONS')}</p><h2 id="scene-heading">${e(copy.sectionHeadings.scenarios)}</h2></div><p class="section-heading__note">${c.t('选择一个编号，展开对应的处理方法。','Choose a number to explore the approach.')}</p></div><div class="scene-explorer layout-${variant}" data-scenario-explorer data-region="${e(region.areaParam)}" data-active-scene="0">${workCards}<div class="scene-stage" data-scene-media style="--scene-ratio:${v.scene.width} / ${v.scene.height}">${picture(c,v.scene,{className:'scene-stage__image'})}<div class="scene-stage__route" aria-hidden="true"></div>${hotspots}<span class="scene-stage__label">${c.t('维护场景示意','MAINTENANCE SCENE · ILLUSTRATION')}</span>${detailWindow}<span class="scene-stage__index" aria-hidden="true">${region.number}</span></div><div class="scene-side"><div class="scene-selector" aria-label="${c.t('选择维修场景','Choose a maintenance scene')}">${selectors}</div><div class="scene-panels">${scenes.map((s,i)=>scenePanel(c,region,s,i)).join('')}</div></div></div></section>`;
}
function localContext(c, region) {
  const copy=region.locales[c.lang];
  return `<section class="local-context content-width" aria-labelledby="local-heading"><div class="local-context__label"><span class="outlined-number" aria-hidden="true">${region.number}</span><p class="section-kicker">${c.t('物业与现场','PROPERTY & PLACE')}</p><h2 id="local-heading">${e(c.lang==='zh'?region.nameZh:region.nameEn)}<br><span>${c.t('如何安排维护','Planning the work')}</span></h2></div><div class="local-context__copy"><p>${e(copy.localIntro)}</p><a class="text-link" href="${e(c.contact(region))}">${c.t('告诉我们现场情况','Tell us about your property')}${icon('arrow')}</a></div></section>`;
}
function planning(c, page, hub=false) {
  const copy=page.locales[c.lang];
  return `<section class="planning-section content-width" aria-labelledby="planning-heading"><div class="section-heading"><div><p class="section-kicker">${hub?'03':'03'} / ${c.t('让安排更清楚','BEFORE WE ARRIVE')}</p><h2 id="planning-heading">${e(copy.sectionHeadings.planning)}</h2></div>${icon('starburst','planning-star')}</div><div class="planning-band">${copy.planning.map((s,i)=>`<article class="planning-step"><span class="planning-step__number">0${i+1}</span><div><h3>${e(s.title)}</h3><p>${e(s.body)}</p></div></article>`).join('')}</div></section>`;
}
function coverage(c, region) {
  const copy=region.locales[c.lang];
  return `<section class="coverage-strip content-width" aria-label="${c.t('服务覆盖范围','Coverage')}"><details class="coverage-details"><summary><span>${icon('pin')}<strong>${e(copy.sectionHeadings.coverage)}</strong></span>${icon('plus')}</summary><div class="coverage-details__body"><p>${c.t('以下地名用于查找所属服务大区；项目安排按物业地址和工作范围确认。','These places help you find a service region. Project arrangements are confirmed against the address and scope.')}</p><ul class="coverage-list">${region.coverageSuburbs.map(n=>`<li>${e(n)}</li>`).join('')}</ul></div></details><a class="coverage-strip__hub" href="${e(c.href(c.data.hub.route))}">${c.t('查看全部 10 个大区','Explore all 10 regions')}${icon('arrow')}</a></section>`;
}
function faq(c, region) {
  const copy=region.locales[c.lang];
  return `<section class="faq-section content-width" aria-labelledby="faq-heading"><div class="faq-intro"><p class="section-kicker">04 / ${c.t('把疑问说清楚','USEFUL ANSWERS')}</p><h2 id="faq-heading">${e(copy.sectionHeadings.faq)}</h2><p>${c.t('围绕本区物业、现场条件与工作安排。','Practical answers about the property, access and work arrangements.')}</p><span class="faq-arrow" aria-hidden="true">↳</span><a class="text-link" href="${e(c.external('/faq/'))}">${c.t('查看全部常见问题','View all FAQs')}${icon('arrow')}</a></div><div class="faq-list">${copy.faq.map((f,i)=>`<details class="faq-item"${i===0?' open':''}><summary><span class="faq-item__number">0${i+1}</span><h3>${e(f.question)}</h3>${icon('plus')}</summary><div class="faq-item__answer"><p>${e(f.answer)}</p></div></details>`).join('')}</div></section>`;
}
function related(c,region) {
  return `<section class="related-regions content-width" aria-labelledby="related-heading"><div class="related-regions__title"><p class="section-kicker">${c.t('继续探索','NEARBY REGIONS')}</p><h2 id="related-heading">${e(region.locales[c.lang].sectionHeadings.related)}</h2></div><div class="related-regions__links">${region.relatedRegions.map(r=>`<a href="${e(c.regionHref(r))}"><span>${e(c.lang==='zh'?r.nameZh:r.nameEn)}</span>${icon('arrow')}</a>`).join('')}</div></section>`;
}
function footerBridge(c,region) {
  const copy=(region || c.data.hub).locales[c.lang];
  const cta=copy.cta;
  return `<div class="footer-bridge"><div class="bridge-cta content-width"><div><span class="bridge-cta__eyebrow">ELLIS / ${c.t('下一步','YOUR NEXT STEP')}</span><h2>${e(cta.title)}</h2><p>${e(cta.body)}</p></div>${action(cta.label || cta.primaryLabel,c.contact(region),'orange')}</div><div class="footer-bridge__curve" aria-hidden="true"></div></div>`;
}
function footer(c) {
  const business=c.data.business;
  const compact=c.local.kind==='hub';
  const exploration=[['/services/','服务内容','Services'],['/sectors/','商业种类','Sectors'],['/areas/melbourne/','服务地区','Service areas'],['/about/','关于我们','About Ellis'],['/insights/','新闻与资讯','Insights']];
  const services=['building-maintenance','hvac-building-systems','electrical-lighting','plumbing-drainage-gas','landscaping-irrigation'];
  const contactDetails=`<a class="footer-address" href="https://maps.app.goo.gl/FtP6ee7x1Ra4KX4z8" target="_blank" rel="noopener noreferrer">${icon('pin')}<span>${e(business.address.display)}</span></a><div class="footer-contact"><a href="${e(business.phoneHref)}">Ellie · ${e(business.phoneDisplay)}</a><a href="${e(business.emailHref)}">${e(business.email)}</a><span>${e(c.lang==='zh'?business.openingHours.displayZh:business.openingHours.displayEn)}</span></div>`;
  return `<footer class="site-footer${compact?' site-footer--compact':''}"><div class="content-width"><div class="footer-grid"><section class="footer-brand">${brand(c)}<h2>${c.t('墨尔本商业物业维修与维护','Commercial property maintenance in Melbourne')}</h2><p>${c.t('建筑、设备与室外场地，统筹安排。','Building, equipment and external areas, planned together.')}</p>${insurance(c)}${compact?`<details class="footer-company-details"><summary>${c.t('联系与公司信息','Contact & company information')}${icon('plus')}</summary><div>${contactDetails}</div></details>`:contactDetails}</section><nav class="footer-nav" aria-label="${c.t('探索 Ellis','Explore Ellis')}"><h3>${c.t('探索 ELLIS','Explore ELLIS')}</h3>${exploration.map(([path,zh,en])=>`<a href="${e(path===c.data.hub.route?c.href(path):c.external(path))}">${c.t(zh,en)}</a>`).join('')}</nav><nav class="footer-nav" aria-label="${c.t('服务入口','Service links')}"><h3>${c.t('服务入口','Our services')}</h3>${services.map(slug=>{const s=serviceCatalog.find(x=>x[0]===slug);return `<a href="${e(c.service(slug))}">${e(s[c.lang==='zh'?1:2])}</a>`;}).join('')}</nav><nav class="footer-nav" aria-label="${c.t('项目与支持','Project support')}"><h3>${c.t('项目与支持','Project support')}</h3><a href="${e(c.contact())}">${c.t('项目咨询','Project enquiry')} ↗</a><a href="${e(c.external('/faq/'))}">${c.t('常见问题','FAQs')}</a><a href="${e(c.external('/privacy/'))}">${c.t('隐私说明','Privacy')}</a><a href="#page-top">${c.t('返回顶部','Back to top')} ↑</a></nav></div><div class="footer-social"><div class="footer-social-title"><h3>${c.t('在这里找到 ELLIS','Find ELLIS here')}</h3><span></span></div><div class="social-grid">${socialLinks.map(([id,title,zh,en,url])=>`<a class="social-card social-card--${id}" href="${url}" target="_blank" rel="noopener noreferrer">${icon(id)}<span><strong>${title}</strong><small>${c.t(zh,en)}</small></span>${icon('arrow')}</a>`).join('')}</div></div><div class="footer-bottom"><p>© ${new Date().getUTCFullYear()} Ellis Services Group</p><p>ELLIS SERVICES GROUP PTY LTD · <a href="https://abr.business.gov.au/ABN/View?id=96645821745" target="_blank" rel="noopener noreferrer">ABN 96 645 821 745 ↗</a></p><a class="back-top" href="#page-top" aria-label="${c.t('返回顶部','Back to top')}">↑</a></div></div></footer>`;
}

const hubPropertyTypes = {
  'cbd-inner-melbourne':['办公楼、商铺与公共区域维护','Offices, shops & shared spaces'],
  'eastern-suburbs':['门店、办公室与营业空间','Shops, offices & trading areas'],
  'south-east-melbourne':['厂房、办公与工业场地','Factories, offices & industrial premises'],
  'western-suburbs':['仓库、装卸通道与园区公区','Warehouses, loading routes & shared estates'],
  'northern-suburbs':['商铺、车间与外部环境','Shops, workshops & external areas'],
  'north-east-melbourne':['接待空间、社区与商业物业','Reception, community & commercial spaces'],
  'north-west-melbourne':['仓库、装卸区与展厅','Warehouses, loading areas & showrooms'],
  'bayside-southern-suburbs':['临街店面、屋面与室外场地','Shopfronts, roofs & external areas'],
  'casey-cardinia':['商铺交接、办公楼与商业园区','Tenancy handovers, offices & business parks'],
  'frankston-mornington-peninsula':['餐饮接待、工业物业与庭院','Hospitality, industrial premises & courtyards'],
};
const hubRegionLabels = {
  'cbd-inner':['市中心及内城','CBD & Inner Melbourne'],
  eastern:['东区','Eastern Melbourne'],
  'south-east':['东南区','South Eastern Melbourne'],
  western:['西区','Western Melbourne'],
  northern:['北区','Northern Melbourne'],
  'north-east':['东北区','North Eastern Melbourne'],
  'north-west':['西北区','North Western Melbourne'],
  'bayside-southern':['Bayside 及南部','Bayside & Southern Melbourne'],
  'casey-cardinia':['Casey 与 Cardinia','Casey & Cardinia'],
  'frankston-mornington-peninsula':['Frankston 与 Mornington Peninsula','Frankston & Mornington Peninsula'],
};
const hubServiceIcons={'building-maintenance':'building','hvac-building-systems':'fan','electrical-lighting':'bolt','plumbing-drainage-gas':'droplet','facade-high-access-cleaning':'sparkles'};
function hubRegionPreview(c) {
  return `<section class="regions-section content-width" id="regions" aria-labelledby="regions-heading" data-region-preview><div class="section-heading"><h2 id="regions-heading">${e(c.data.hub.locales[c.lang].sectionHeadings.regions)}</h2></div><div class="area-grid" data-choice-group>${c.data.regions.map((r,i)=>{
    const v=visual(c,r.slug);
    const labels=hubRegionLabels[r.areaParam]||[r.nameZh,r.nameEn];
    const primary=labels[c.lang==='zh'?0:1];
    const secondary=c.lang==='zh'?labels[1]:'Commercial property services';
    const primaryMarkup=r.areaParam==='frankston-mornington-peninsula'&&c.lang==='zh'?'Frankston 与<br><span>Mornington Peninsula</span>':e(primary);
    return `<article class="area-card${i===0?' is-active':''}" data-region-card="${e(r.areaParam)}"><button class="area-card__select area-card__preview${i===0?' is-active':''}" type="button" data-region-preview-select="${e(r.areaParam)}" aria-controls="preview-${e(r.areaParam)}" aria-pressed="${i===0?'true':'false'}" aria-label="${e(c.t('预览：','Preview: ')+primary)}"><span class="area-card__image">${picture(c,v.card)}</span><span class="area-card__body"><strong class="area-card__title">${primaryMarkup}</strong><span class="area-card__subtitle" lang="en">${e(secondary)}</span></span></button><a class="area-card__link" href="${e(c.regionHref(r))}" aria-label="${e(c.t('查看','Explore ')+primary+c.t('维护服务',' maintenance services'))}">${icon('arrow')}</a></article>`;
  }).join('')}</div><div class="region-preview">${c.data.regions.map((r,i)=>{
    const v=visual(c,r.slug);
    const serviceIndexes=r.slug==='cbd-inner-melbourne'?[0,1,3]:[0,1,2];
    const featured=serviceIndexes.map(index=>r.priorityServices[index]);
    const subtitle=hubPropertyTypes[r.slug]?.[c.lang==='zh'?0:1] || r.nameEn;
    return `<article class="region-preview__panel${i===0?' is-active':''}" id="preview-${e(r.areaParam)}" data-region-preview-panel="${e(r.areaParam)}"><div class="region-preview__media">${picture(c,v.preview)}<span class="region-preview__scene-label">${c.t('场景示意','SCENE ILLUSTRATION')}</span></div><div class="region-preview__copy"><h3>${e(c.lang==='zh'?r.nameZh:r.nameEn)}</h3><p class="region-preview__subtitle">${e(subtitle)}</p><ul class="region-preview__services">${featured.map((service,j)=>`<li><a href="${e(c.service(service.slug))}">${icon(hubServiceIcons[service.slug]||'wrench')}<span>${e(shortService(c,service.slug))}</span>${icon('arrow')}</a></li>`).join('')}</ul>${action(c.t('进入地区详情','Explore the region'),c.regionHref(r),'blue')}</div></article>`;
  }).join('')}</div></section>`;
}
function hubServices(c) {
  const copy=c.data.hub.locales[c.lang];
  const slugs=['building-maintenance','hvac-building-systems','electrical-lighting','plumbing-drainage-gas'];
  return `<section class="hub-services hub-service-strip content-width" id="services" aria-labelledby="hub-services-heading"><a class="hub-service-strip__heading" href="${e(c.external('/services/'))}" aria-label="${e(copy.allServicesLabel)}"><h2 id="hub-services-heading">${e(copy.sectionHeadings.services)}</h2></a><div class="hub-service-strip__links">${slugs.map((slug,index)=>{const service=serviceCatalog.find(s=>s[0]===slug);return `<a href="${e(c.service(slug))}">${icon(hubServiceIcons[slug]||'wrench')}<span>${e(shortService(c,slug))}</span>${icon('arrow')}</a>`;}).join('')}</div></section>`;
}
function hubEnquiryBand(c) {
  const copy=c.data.hub.locales[c.lang];
  return `<section class="hub-enquiry-band content-width" aria-labelledby="hub-enquiry-heading"><a class="hub-enquiry-band__lead" href="${e(c.contact())}"><span class="hub-enquiry-band__icon" aria-hidden="true">${icon('check')}</span><div class="hub-enquiry-band__copy"><h2 id="hub-enquiry-heading">${e(copy.cta.title)}</h2><p>${e(copy.cta.body)}</p></div></a><ul class="hub-enquiry-band__checks">${copy.planning.map(step=>`<li>${icon('check')}<span>${e(step.title)}</span></li>`).join('')}</ul><a class="hub-enquiry-band__action" href="${e(c.contact())}" aria-label="${e(copy.cta.primaryLabel)}"><span class="enquiry-clipboard" aria-hidden="true"><i></i><i></i><i></i></span><span class="enquiry-action-label">${c.t('项目咨询','Enquire')} ↗</span></a></section>`;
}
function hubCoverage(c) {
  const copy=c.data.hub.locales[c.lang];
  return `<section class="hub-coverage content-width" aria-label="${c.t('服务覆盖范围','Service coverage')}"><details class="hub-coverage__details"><summary><strong>${c.t('我们的覆盖范围','Our service coverage')}</strong>${icon('down')}<span>${e(copy.coverageNote)}</span></summary><div class="hub-coverage__body"><p class="hub-coverage__intro">${e(copy.intro)}</p><section class="hub-planning-detail" aria-labelledby="hub-planning-heading"><h2 id="hub-planning-heading">${e(copy.sectionHeadings.planning)}</h2><ol>${copy.planning.map(step=>`<li><h3>${e(step.title)}</h3><p>${e(step.body)}</p></li>`).join('')}</ol></section><div class="hub-coverage__regions">${c.data.regions.map(r=>`<details class="hub-region-details"><summary><span>${e(c.lang==='zh'?r.nameZh:r.nameEn)}</span>${icon('plus')}</summary><div><p>${e(r.locales[c.lang].heroLead)}</p><ul class="hub-region-details__services">${r.priorityServices.map(service=>`<li><a href="${e(c.service(service.slug))}">${e(c.lang==='zh'?service.anchorZh:service.anchorEn)}${icon('arrow')}</a><span>${e(c.lang==='zh'?service.contextZh:service.contextEn)}</span></li>`).join('')}</ul><ul class="coverage-list">${r.coverageSuburbs.map(place=>`<li>${e(place)}</li>`).join('')}</ul><a class="text-link" href="${e(c.regionHref(r))}">${c.t('进入地区详情','Explore the region')}${icon('arrow')}</a></div></details>`).join('')}</div></div></details></section>`;
}
function renderHub(c, includeCoverage) {
  return `${hero(c)}${serviceRail(c)}${hubRegionPreview(c)}${hubServices(c)}${hubEnquiryBand(c)}${includeCoverage ? hubCoverage(c) : ''}<div class="hub-footer-transition" aria-hidden="true"></div>`;
}

function renderRegion(c,region) {
  return `${hero(c,region)}${serviceRail(c,region)}${sceneSection(c,region)}${serviceCards(c,region)}${localContext(c,region)}${planning(c,region)}${coverage(c,region)}${faq(c,region)}${related(c,region)}${footerBridge(c,region)}`;
}
function contactPage(c) {
  const business=c.data.business;
  const q=new URLSearchParams(c.search || '');
  const selectedRegion=c.data.regions.find(r=>r.areaParam===q.get('area'));
  const selectedService=serviceCatalog.find(s=>s[0]===q.get('service'));
  return `<section class="contact-section"><div class="content-width"><nav class="breadcrumbs" aria-label="${c.t('页面位置','Breadcrumb')}"><ol><li><a href="${e(c.href(c.data.hub.route))}">${c.t('墨尔本服务地区','Melbourne service areas')}</a></li><li><span aria-current="page">${c.t('项目咨询','Project enquiry')}</span></li></ol></nav><div class="contact-layout"><div class="contact-copy"><p class="eyebrow">ELLIS / MELBOURNE</p><h1 id="page-heading">${c.t('把项目需求，<br>交给我们。','Let’s plan<br>your project.')}</h1><p class="contact-copy__lead">${c.t('告诉我们物业在哪里、需要处理什么，以及可进入的时间。','Tell us where the property is, what needs attention and when the site can be accessed.')}</p><div class="contact-details"><div>${icon('phone')}<span><small>${c.t('联系 Ellie','Speak with Ellie')}</small><a href="${e(business.phoneHref)}">${e(business.phoneDisplay)}</a></span></div><div>${icon('email')}<span><small>${c.t('发送项目资料','Send project information')}</small><a href="${e(business.emailHref)}">${e(business.email)}</a></span></div><div>${icon('pin')}<span><small>${c.t('联系地址','Address')}</small>${e(business.address.display)}</span></div><div>${icon('clock')}<span><small>${c.t('营业时间','Opening hours')}</small>${e(c.lang==='zh'?business.openingHours.displayZh:business.openingHours.displayEn)}</span></div></div>${insurance(c)}<svg class="contact-arrow" viewBox="0 0 240 150" fill="none" aria-hidden="true"><defs><linearGradient id="enquiry-ribbon" x1="40" y1="40" x2="230" y2="110" gradientUnits="userSpaceOnUse"><stop stop-color="#FFAA4A"/><stop offset=".55" stop-color="#FF5A08"/><stop offset="1" stop-color="#ED4000"/></linearGradient></defs><path d="M15 22C12 103 89 123 172 100L164 133L234 72L147 55L166 83C99 102 47 83 48 22Z" fill="#FB43BF" transform="translate(0 7)"/><path d="M15 22C12 103 89 123 172 100L164 133L234 72L147 55L166 83C99 102 47 83 48 22Z" fill="url(#enquiry-ribbon)"/><path d="M17 23C14 105 92 118 171 97L168 115" stroke="#FFD388" stroke-width="2"/></svg></div><div class="contact-card"><p class="section-kicker">PROJECT ENQUIRY</p><h2>${c.t('告诉我们项目需求','Tell us about the work')}</h2><p class="contact-card__intro">${c.t('已带入你的地区与服务选择，你可以继续修改。','Your area and service selection can be adjusted below.')}</p><form id="contact-enquiry-form" data-contact-form data-mail-draft="true" action="${e(business.emailHref)}" method="post" enctype="text/plain" novalidate><div class="contact-form-grid"><div class="form-field"><label for="enquiry-name">${c.t('联系人姓名','Your name')} <span aria-hidden="true">*</span></label><input id="enquiry-name" name="name" autocomplete="name" required></div><div class="form-field"><label for="enquiry-phone">${c.t('联系电话','Phone')}</label><input id="enquiry-phone" name="phone" autocomplete="tel" type="tel"></div><div class="form-field"><label for="enquiry-email">${c.t('电子邮箱','Email')} <span aria-hidden="true">*</span></label><input id="enquiry-email" name="email" autocomplete="email" type="email" required></div><div class="form-field"><label for="enquiry-area">${c.t('物业所在地区','Property region')}</label><select id="enquiry-area" name="area"><option value="">${c.t('请选择地区','Select a region')}</option>${c.data.regions.map(r=>`<option value="${e(r.areaParam)}"${selectedRegion===r?' selected':''}>${e(c.lang==='zh'?r.nameZh:r.nameEn)}</option>`).join('')}</select></div><div class="form-field form-field--full"><label for="enquiry-service">${c.t('需要的服务','Service required')}</label><select id="enquiry-service" name="service"><option value="">${c.t('请选择服务','Select a service')}</option>${serviceCatalog.map(s=>`<option value="${s[0]}"${selectedService===s?' selected':''}>${e(s[c.lang==='zh'?1:2])}</option>`).join('')}</select></div><div class="form-field form-field--full"><label for="enquiry-message">${c.t('项目需求','Project details')} <span aria-hidden="true">*</span></label><textarea id="enquiry-message" name="message" rows="5" required placeholder="${c.t('物业地址、需要维修的部位、现场条件与希望安排的时间。','Property address, work needed, site conditions and preferred timing.')}"></textarea></div></div><p class="form-note">${c.t('点击后会在你的邮件应用中生成咨询草稿。请检查内容，并在邮件应用中确认发送。','This opens an enquiry draft in your email app. Review the details and send it from there.')}</p><div data-form-status class="form-status" role="status" aria-live="polite"></div><button class="button button--lime form-submit" type="submit"><span>${c.t('打开项目咨询邮件','Open enquiry email draft')}</span>${icon('arrow')}</button></form></div></div></div></section><div class="footer-bridge footer-bridge--quiet"><span aria-hidden="true"></span></div>`;
}
function notFound(c) {
  return `<section class="not-found content-width"><p class="eyebrow">ELLIS / 404</p><h1>${c.t('这个页面暂时找不到。','We can’t find that page.')}</h1><p>${c.t('从地区总览继续寻找你的商业物业维护入口。','Explore the service-area overview to find the right place to start.')}</p>${action(c.t('返回墨尔本服务地区','View Melbourne service areas'),c.href(c.data.hub.route),'lime')}</section><div class="footer-bridge footer-bridge--quiet"></div>`;
}

export function renderMain(options) {
  const c=makeContext(options);
  const body=c.local.kind==='hub'?renderHub(c,options.includeHubCoverage??true):c.local.kind==='region'?renderRegion(c,c.local.page):c.local.kind==='contact'?contactPage(c):notFound(c);
  return body;
}
export function renderBody(options) {
  const c=makeContext(options);
  return `${header(c)}<main id="main" tabindex="-1">${renderMain(options)}</main>${footer(c)}`;
}
function metadata(c) {
  if (c.local.page) return c.local.page.locales[c.lang];
  if (c.local.kind==='contact') return {metaTitle:c.t('项目咨询 | Ellis Services Group','Project enquiry | Ellis Services Group'),metaDescription:c.t('联系 Ellie，讨论墨尔本商业物业的维修与维护需求。','Contact Ellie to discuss your Melbourne commercial maintenance requirements.')};
  return {metaTitle:c.t('页面未找到 | Ellis','Page not found | Ellis'),metaDescription:''};
}
function pageData(c) {
  return {
    regions:c.data.regions.map(r=>({slug:r.slug,route:r.route,areaParam:r.areaParam,nameZh:r.nameZh,nameEn:r.nameEn,priorityServices:r.priorityServices.map(s=>({slug:s.slug,route:s.route,anchorZh:s.anchorZh,anchorEn:s.anchorEn}))})),
    business:c.data.business,contactPath:c.data.contactPath,contactFormId:c.data.contactFormId,
  };
}
function structuredData(c) {
  const page=c.local.page;
  if (!page || c.preview) return '';
  const title=page.locales[c.lang].h1;
  const url=`${c.siteOrigin}${c.href(c.local.route)}`;
  const trail=[{name:c.t('首页','Home'),item:`${c.siteOrigin}${c.href('/')}`},{name:c.t('墨尔本服务地区','Melbourne service areas'),item:`${c.siteOrigin}${c.href(c.data.hub.route)}`}];
  if(c.local.kind==='region') trail.push({name:c.lang==='zh'?page.nameZh:page.nameEn,item:url});
  return `<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':[{'@type':'WebPage','@id':url,url,name:title,inLanguage:c.lang==='zh'?'zh-Hans':'en-AU',description:page.locales[c.lang].metaDescription},{'@type':'BreadcrumbList',itemListElement:trail.map((item,i)=>({'@type':'ListItem',position:i+1,...item}))}]}).replace(/</g,'\\u003c')}</script>`;
}
export function renderPage(options) {
  const c=makeContext(options),meta=metadata(c);
  const canonical=`${c.siteOrigin}${c.href(c.local.route)}`;
  const bodyClass=c.local.kind==='region'?`page-region theme-${c.local.page.designFamily} region-${c.local.page.areaParam}`:`page-${c.local.kind}`;
  const json=JSON.stringify(pageData(c)).replace(/</g,'\\u003c');
  const version = e(options.assetVersion || "1.0.0");
  return `<!doctype html><html lang="${c.lang==='zh'?'zh-Hans':'en-AU'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#1424FF"><title>${e(meta.metaTitle)}</title><meta name="description" content="${e(meta.metaDescription)}">${c.preview||c.local.kind==='contact'||c.local.kind==='not-found'?'<meta name="robots" content="noindex,follow">':`<link rel="canonical" href="${e(canonical)}"><link rel="alternate" hreflang="zh-Hans" href="${e(`${c.siteOrigin}${c.local.route}?lang=zh`)}"><link rel="alternate" hreflang="en-AU" href="${e(`${c.siteOrigin}${c.local.route}?lang=en`)}">`}<link rel="icon" href="${c.assetBase}/ellis-services.png" type="image/png"><link rel="stylesheet" href="${c.assetBase}/styles.css?v=${version}">${structuredData(c)}</head><body class="${e(bodyClass)}" data-lang="${c.lang}" data-current-path="${e(c.local.route)}">${renderBody(options)}<script id="ellis-page-data" type="application/json">${json}</script><script type="module" src="${c.assetBase}/app.mjs?v=${version}"></script></body></html>`;
}
