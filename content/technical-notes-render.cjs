const {articles,categories,serviceArt} = require('./technical-notes.cjs');
const {services,serviceSlugs} = require('./site-data.cjs');
const {origin} = require('./search-config.cjs');
const {name:publisher} = require('../business.json');

const esc = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const flat = value => value.replaceAll('\n',' ');
const copy = pair => `data-zh="${esc(pair[0])}" data-en="${esc(pair[1])}"`;
const text = (tag, pair, cls='') => `<${tag}${cls?' class="'+cls+'"':''} ${copy(pair)}>${esc(pair[0])}</${tag}>`;
const paragraphs = pairs => pairs.map(pair=>text('p',pair)).join('');
const label = (zh,en) => `aria-label="${esc(zh)}" data-aria-label-en="${esc(en)}" data-aria-label-zh="${esc(zh)}"`;
const arrow = (symbol='↗') => `<span aria-hidden="true">${symbol}</span>`;
const link = (href,pair,cls='',symbol='↗') => `<a class="${cls}" href="${href}"${href.startsWith('/')?' data-local-page':''}>${text('span',pair)}${symbol?arrow(symbol):''}</a>`;
const image = (src, eager=false, alt) => `<img src="${src}" alt="${alt?esc(alt[0]):''}"${alt?` data-alt-zh="${esc(alt[0])}" data-alt-en="${esc(alt[1])}"`:''} decoding="async"${eager?' fetchpriority="high"':' loading="lazy"'}>`;
const h1 = (title,id) => `<h1 id="${id}">${title[0].split('\n').map((part,index)=>text('span',[part,title[1].split('\n')[index]],index?'tn-accent':'')).join('\n')}</h1>`;
const brand = '<p class="tn-kicker"><i aria-hidden="true"></i>ELLIS / TECHNICAL NOTES</p>';
const articleBySlug = Object.fromEntries(articles.map(article=>[article.slug,article]));
const serviceName = slug => {
 const i = serviceSlugs.indexOf(slug);
 return [services[i].zh,services[i].en];
};
const serviceUrl = slug => '/services/' + slug + '/';
const filters = {
 all:['全部','All'], building:['建筑日修','Building repairs'], envelope:['屋顶防水','Roofing & waterproofing'],
 electrical:['电气照明','Electrical & lighting'], plumbing:['水管排水','Plumbing & drainage'], hvac:['空调设备','HVAC & plant'],
 fire:['消防门禁','Fire & access'], landscape:['园林灌溉','Landscaping & irrigation'], signage:['标识立面','Signs & façades'],
 interiors:['装饰隔断','Interiors & partitions'], floors:['地面墙面','Floor & wall systems'], doors:['门窗五金','Doors & hardware'],
 urgent:['紧急抢修','Urgent repairs']
};
const servicesToArticles = Object.fromEntries(serviceSlugs.map(slug=>[slug,articles
 .filter(a=>a.primary===slug || a.secondary===slug)
 .sort((a,b)=>Number(b.primary===slug)-Number(a.primary===slug))
 .slice(0,2)]));

function card(article, featured=false) {
 return `<article class="tn-card tn-colour-${article.colour}${featured?' tn-feature':''}" data-tn-category="${article.category}" data-tn-reveal>
  <div class="tn-card-art">${image(article.image)}</div>
  <div class="tn-card-copy">${text('p',featured?categories[article.category].slice(0,2):filters[article.category],'tn-tag')}
  ${text('h2',article.title)}${text('p',article.summary,'tn-card-summary')}
  ${link(article.route,['阅读全文','Read article'],'tn-button tn-card-link')}</div>
 </article>`;
}

function ending(article) {
 return `<div class="tn-ending"><div class="tn-wrap"><div class="tn-end-card">
  <div>${text('h2',article?['继续查阅相关技术主题','Keep exploring technical topics']:['从技术问题，\n找到对应服务范围。','From a technical fault\nto the right service.'])}
  <div class="tn-end-links">${link(article?'/insights/':'/services/',article?['返回文章目录','Back to article library']:['查看全部服务','Explore all services'],'tn-button',article?'↑':'↗')}
  ${link(article?serviceUrl(article.primary):'#technical-library',article?['查看服务范围','View service scope']:['返回文章目录','Back to article library'],'tn-text-link',article?'→':'↑')}</div></div>
  <span class="tn-end-arrow" aria-hidden="true"></span>
 </div></div></div>`;
}

function library() {
 const initialLimit = 5;
 const [featured,...regular] = articles;
 const controls = Object.entries(filters).map(([key,name])=>{
  const count = key==='all'?articles.length:articles.filter(a=>a.category===key).length;
  return `<button type="button" data-tn-filter="${key}" aria-pressed="${key==='all'}" aria-controls="tn-article-results">${text('span',name)} <b>${count}</b></button>`;
 }).join('');
 return `<div class="tn tn-library" data-tn-library data-tn-limit="${initialLimit}">
  <section class="tn-hero tn-hero-library" aria-labelledby="tn-library-title">
   <div class="tn-wrap tn-hero-grid"><div class="tn-hero-copy">${brand}
    ${h1(['墨尔本商业维护\n技术研究与实务','Melbourne commercial maintenance\nResearch & practice'],'tn-library-title')}
    ${text('p',['故障机理 · 诊断依据 · 维修方法 · 验收记录','Fault mechanisms · Diagnosis · Repair options · Verification'],'tn-lead')}
    ${link('#technical-library',['查阅技术文章','Browse technical notes'],'tn-button tn-hero-button','↓')}
   </div><div class="tn-hero-art" data-tn-parallax>${image('/assets/news-technical/library-hero.webp',true)}</div></div>
  </section>
  <div id="technical-library" class="tn-wrap tn-list">
   <div class="tn-filters" role="group" ${label('按服务筛选技术文章','Filter technical notes by service')} hidden>${controls}</div>
   <p class="tn-count" role="status" aria-live="polite" aria-atomic="true">${text('span',[`已显示 ${articles.length} / ${articles.length} 篇`,`Showing ${articles.length} of ${articles.length} articles`])}</p>
   <div id="tn-article-results">
    ${card(featured,true)}
    <div class="tn-card-grid tn-current">${regular.slice(0,initialLimit-1).map(a=>card(a)).join('')}</div>
    <div id="tn-more-articles" class="tn-more"><div class="tn-card-grid">${regular.slice(initialLimit-1).map(a=>card(a)).join('')}</div></div>
    <div class="tn-empty" hidden>${text('p',['这个分类暂无技术文章。','There are no technical notes in this category.'])}<button type="button" class="tn-button" data-tn-reset>${text('span',['查看全部','Show all articles'])}</button></div>
   </div>
   <div class="tn-disclosure" hidden>
    <p class="tn-disclosure-copy"></p>
    <button type="button" class="tn-button" data-tn-more aria-controls="tn-more-articles" aria-expanded="false"><span data-tn-more-label></span><span aria-hidden="true" data-tn-more-arrow>↓</span></button>
   </div>
   <section class="tn-services">${text('h2',['按专业系统继续查阅','Explore by building system'],'tn-section-heading')}
    <a href="/services/" class="tn-services-band" data-local-page>
     <span>${text('strong',[`查看 ${serviceSlugs.length} 项\n商业维修服务`,`Explore all ${serviceSlugs.length}\ncommercial maintenance services`])}${arrow()}</span>
     <span class="tn-services-art" aria-hidden="true">${['hero-building-maintenance','specialist-roofing-waterproofing','specialist-hvac-wide-v2','hero-electrical-lighting'].map(src=>image(serviceArt(src))).join('')}</span>
    </a>
   </section>
  </div>${ending()}
 </div>`;
}

const chapters = [
 ['mechanism','从现象追溯成因','Fault mechanism','故障机理','Mechanism'],
 ['evidence','现象与诊断依据','Observation and diagnostic evidence','诊断证据','Evidence'],
 ['methods','维修方法与适用条件','Repair options and suitability','方法选择','Repair options'],
 ['verification','验收与记录','Verification and records','验收记录','Verification'],
 ['questions','技术问答','Technical questions','技术问答','Questions']
];
function chapter(index,body) {
 const [id,zh,en] = chapters[index];
 return `<section class="tn-chapter" id="tn-${id}" aria-labelledby="tn-h-${id}"><h2 id="tn-h-${id}" class="tn-section-heading"><span class="tn-number" aria-hidden="true">0${index+1} /</span>${text('span',[zh,en])}</h2><div class="tn-chapter-body">${body}</div></section>`;
}
function linkedService(slug, colour, picture) {
 return `<a class="tn-linked-service tn-colour-${colour}" href="${serviceUrl(slug)}" data-local-page>
  ${image(picture || serviceArt('hero-'+slug))}<span>${text('strong',serviceName(slug))}${arrow()}</span></a>`;
}
function detail(article) {
 const relatedNote = articleBySlug[article.related[0]];
 const dateText = article.publishedOn && ['zh-CN','en-AU'].map(locale=>
  new Intl.DateTimeFormat(locale,{dateStyle:'long',timeZone:'UTC'}).format(new Date(article.publishedOn)));
 const date = article.publishedOn
  ? `<time class="tn-date" datetime="${article.publishedOn}" ${copy(dateText)}>${esc(dateText[0])}</time>`
  : text('span',['待发布','Awaiting publication'],'tn-date');
 const intro = `<section class="tn-summary" aria-labelledby="tn-summary-title"><div class="tn-summary-copy"><h2 id="tn-summary-title" class="tn-section-heading">${text('span',['摘要','Summary'])}</h2>
  ${text('p',article.summary)}<ul class="tn-keywords">${article.keywords.map(key=>text('li',key)).join('')}</ul>
  <p class="tn-byline"><b>${esc(publisher)}</b> · ${text('span',['技术综述','Technical review'])}</p></div><div class="tn-summary-art" aria-hidden="true">${image(article.image)}</div></section>`;
 const evidence = `<div class="tn-table"><table><thead><tr>${[['观察现象','Observation'],['待区分机理','Possible mechanism'],['核对证据','What to check']].map(name=>`<th scope="col" ${copy(name)}>${esc(name[0])}</th>`).join('')}</tr></thead><tbody>
 ${article.evidence.map(([finding,cause,check])=>`<tr><th scope="row" ${copy(finding)}>${esc(finding[0])}</th>${text('td',cause)}${text('td',check)}</tr>`).join('')}</tbody></table></div>`;
 const options = `<dl class="tn-method-list">${article.methods.map(([name,desc])=>`<div>${text('dt',name)}${text('dd',desc)}</div>`).join('')}</dl>`;
 const questions = `<dl class="tn-question-list">${article.faq.map(([question,answer])=>`<div>${text('dt',question)}${text('dd',answer)}</div>`).join('')}</dl>`;
 const nav = `<aside class="tn-toc"><nav aria-labelledby="tn-contents-heading"><h2 id="tn-contents-heading">${text('span',['本文目录','On this page'])}</h2><ol>
 ${chapters.map(([id,,,zh,en])=>`<li>${link('#tn-'+id,[zh,en],'','')}</li>`).join('')}</ol></nav></aside>`;
 const related = `<section class="tn-related" aria-labelledby="tn-related-title"><h2 class="tn-section-heading" id="tn-related-title">${text('span',['相关技术主题与服务','Related technical notes and services'])}</h2>
  <div class="tn-related-grid">${article.related.map((slug,i)=>{
   const next=articleBySlug[slug];
   return `<article class="tn-related-card tn-colour-${i?'pink':'blue'}">${image(next.image)}<div>${text('h3',next.title)}${link(next.route,['继续阅读','Keep reading'],'tn-button')}</div></article>`;
  }).join('')}
  ${linkedService(article.primary,'lime')}${article.secondary?'\n  '+linkedService(article.secondary,'orange',article.slug==='window-wall-water-ingress'?'/assets/region-reference-v3/detail-door.webp':null):''}
  </div></section>`;
 return `<article class="tn tn-detail">
  <header class="tn-hero tn-article-hero" aria-labelledby="tn-article-title">
   <div class="tn-wrap tn-hero-grid"><div class="tn-hero-copy">
   <nav class="tn-crumb" ${label('当前位置','Breadcrumb')}>${link('/',['首页','Home'],'','')}<span aria-hidden="true">/</span>${link('/insights/',['技术文章','Technical notes'],'','')}<span aria-hidden="true">/</span>${text('span',filters[article.category])}</nav>
   ${brand}${h1(article.title,'tn-article-title')}${text('p',article.summary,'tn-lead')}
   <div class="tn-meta">${text('span',categories[article.category].slice(0,2),'tn-tag')}${date}</div>
   </div><figure class="tn-hero-art" data-tn-parallax>${image(article.image,true,article.heroAlt)}</figure></div>
  </header>
  <div class="tn-reading-stage"><div class="tn-wrap tn-reading"><div class="tn-main-copy">
   ${intro}
   ${chapter(0,paragraphs(article.mechanism)+`<ul class="tn-mechanism-tags">${article.keywords.map(key=>text('li',key)).join('')}</ul>
   <p class="tn-context-link">${text('span',['延伸阅读','Further reading'])} ${link(relatedNote.route,relatedNote.title.map(flat),'tn-text-link')}</p>`)}
   ${chapter(1,evidence+`<div class="tn-diagnostic-note">${text('h3',article.judgement.heading)}${paragraphs(article.judgement.body)}</div>`)}
   ${chapter(2,options)}
   ${chapter(3,paragraphs(article.verification)+`<p class="tn-context-link">${text('span',['对应服务','Related service'])} ${link(serviceUrl(article.primary),serviceName(article.primary),'tn-text-link')}</p>`)}
   ${chapter(4,questions)}
  </div>${nav}</div></div>
  <div class="tn-wrap">${related}</div>${ending(article)}
 </article>`;
}

function serviceNotes(slug) {
 const entries=servicesToArticles[slug];
 if(!entries?.length)return '';
 return `<section class="tn-service-notes" aria-labelledby="tn-service-notes-heading"><h2 id="tn-service-notes-heading">${text('span',['相关技术文章','Related technical notes'])}</h2><ul>
 ${entries.map(article=>`<li>${link(article.route,article.title.map(flat))}</li>`).join('')}</ul></section>`;
}

function schema(article) {
 const url=origin+article.route+'?lang=zh';
 return {'@context':'https://schema.org','@type':'Article','@id':url+'#article',url,mainEntityOfPage:url,inLanguage:'zh-CN',
  headline:flat(article.title[0]),description:article.summary[0],image:[origin+article.image],
  author:{'@type':'Organization','@id':origin+'/#ellis-organization',name:publisher},publisher:{'@id':origin+'/#ellis-organization'},
  ...(article.publishedOn?{datePublished:article.publishedOn}:{})};
}
const assets='<link rel="stylesheet" href="/technical-notes.css"><script src="/technical-notes.js" defer></script>';
module.exports = {articles,library,detail,serviceNotes,schema,assets};
