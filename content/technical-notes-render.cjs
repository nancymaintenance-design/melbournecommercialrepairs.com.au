const {articles,libraryArticles,categories,serviceArt} = require('./technical-notes.cjs');
const {services,serviceSlugs} = require('./site-data.cjs');
const {origin} = require('./search-config.cjs');
const {name:publisher} = require('../business.json');
const fieldManual = require('./led-field-manual.cjs');

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
const filters = {
 all:['全部','All'], building:['建筑日修','Building repairs'], envelope:['屋顶防水','Roofing & waterproofing'],
 electrical:['电气照明','Electrical & lighting'], plumbing:['水管排水','Plumbing & drainage'], hvac:['空调设备','HVAC & plant'],
 fire:['消防门禁','Fire & access'], landscape:['园林灌溉','Landscaping & irrigation'], signage:['标识立面','Signs & façades'],
 interiors:['装饰隔断','Interiors & partitions'], floors:['地面墙面','Floor & wall systems'], doors:['门窗五金','Doors & hardware'],
 urgent:['紧急抢修','Urgent repairs']
};
const servicesToArticles = Object.fromEntries(serviceSlugs.map(slug=>[slug,libraryArticles
 .filter(a=>a.primary===slug || a.secondary===slug)
 .sort((a,b)=>Number(b.primary===slug)-Number(a.primary===slug))]));

const stageImage = (src, eager=false) => eager
 ? `<img src="${src}" width="1425" height="950" alt="" decoding="async" fetchpriority="high">`
 : `<img src="${src}" width="1000" height="580" alt="" decoding="async" loading="lazy">`;

function card(article, featured=false) {
 return `<article class="tn-card tn-colour-${article.colour}${featured?' tn-feature':''}" id="tn-card-${article.slug}" data-tn-category="${article.category}">
  <div class="tn-card-art">${stageImage(article.image)}</div>
  <div class="tn-card-copy">${text('p',featured?categories[article.category].slice(0,2):filters[article.category],'tn-tag')}
  ${text('h2',article.title)}${text('p',article.summary,'tn-card-summary')}
  ${link(article.route,['阅读全文','Read article'],'tn-button tn-card-link')}</div>
 </article>`;
}

function libraryEnding() {
 return `<div class="tn-ending"><div class="tn-wrap"><div class="tn-end-card">
  <div>${text('h2',['从技术问题，到维修安排。','From a technical fault to planning repairs.'])}
  <div class="tn-end-links">${link('/contact/',['联系我们','Contact us'],'tn-button tn-stage-contact')}${link('/services/',['查看全部服务','Explore all services'],'tn-button')}
  ${link('#technical-library',['返回文章目录','Back to article library'],'tn-text-link','↑')}</div></div>
  <span class="tn-end-arrow" aria-hidden="true"></span>
 </div></div></div>`;
}

function library() {
 const controls = Object.entries(filters).map(([key,name])=>{
  const count = key==='all'?libraryArticles.length:libraryArticles.filter(a=>a.category===key).length;
  return `<button type="button" data-tn-filter="${key}" aria-pressed="${key==='all'}" aria-controls="tn-article-results">${text('span',name)} <b>${count}</b></button>`;
 }).join('');
 return `<div class="tn tn-library tn-stage-library" data-tn-stage-library>
  <section class="tn-hero tn-hero-library" aria-labelledby="tn-library-title">
   <div class="tn-wrap tn-hero-grid"><div class="tn-hero-copy">${brand}
    ${h1(['墨尔本商业维护\n技术研究与实务','Melbourne commercial maintenance\nResearch & practice'],'tn-library-title')}
    ${text('p',['故障机理 · 诊断依据 · 维修方法 · 验收记录','Fault mechanisms · Diagnosis · Repair options · Verification'],'tn-lead')}
    ${link('#technical-library',['查阅技术文章','Browse technical notes'],'tn-button tn-hero-button','↓')}
   </div><div class="tn-hero-art" data-tn-parallax>${stageImage('/assets/news-technical/index-cutaway.webp',true)}</div></div>
  </section>
  <div id="technical-library" class="tn-wrap tn-list">
   <div class="tn-filters" role="group" ${label('按服务筛选技术文章','Filter technical notes by service')} hidden>${controls}</div>
   <div class="tn-stage-heading">
    ${text('h2',['全部技术文章','All technical articles'],'tn-stage-title tn-section-heading')}
    <p class="tn-count" role="status" aria-live="polite" aria-atomic="true">${text('span',[`共 ${libraryArticles.length} 篇`,`${libraryArticles.length} articles`])}</p>
   </div>
   <section class="tn-rail tn-stage" data-tn-view="all" ${label('技术文章轮播','Technical articles carousel')}>
    <div class="tn-stage-scene">
     <span class="tn-stage-word" aria-hidden="true">INSIGHTS</span>
     <div id="tn-article-results" class="tn-rail-scroll" tabindex="0" role="group" ${label('技术文章','Technical articles')}>
      ${libraryArticles.map((article,index)=>card(article,index===0)).join('')}
     </div>
    </div>
    <div class="tn-rail-controls" hidden>
     <button type="button" data-tn-step="-1" aria-controls="tn-article-results" ${label('上一篇文章','Previous article')}>${arrow('←')}</button>
     <div class="tn-rail-progress">
      <input type="range" min="1" max="${libraryArticles.length}" step="1" value="1" aria-controls="tn-article-results" ${label('选择文章序号','Choose an article by position')}>
      <div class="tn-stage-progress-caption">
       ${text('span',['左右滑动，查阅全部文章','Swipe to browse all articles'],'tn-stage-hint')}
       <p class="tn-rail-position" data-tn-position aria-hidden="true"></p>
      </div>
     </div>
     <button type="button" data-tn-step="1" aria-controls="tn-article-results" ${label('下一篇文章','Next article')}>${arrow('→')}</button>
     <span class="tn-stage-sr" data-tn-announcement role="status" aria-live="polite" aria-atomic="true"></span>
    </div>
   </section>
   <div class="tn-empty" hidden>${text('p',['这个分类暂无技术文章。','There are no technical notes in this category.'])}<button type="button" class="tn-button" data-tn-reset>${text('span',['查看全部','Show all articles'])}</button></div>
   <section class="tn-services">${text('h2',['按专业系统继续查阅','Explore by building system'],'tn-section-heading')}
    <a href="/services/" class="tn-services-band" data-local-page>
     <span>${text('strong',[`查看 ${serviceSlugs.length} 项\n商业维修服务`,`Explore all ${serviceSlugs.length}\ncommercial maintenance services`])}${arrow()}</span>
     <span class="tn-services-art" aria-hidden="true">${['hero-building-maintenance','specialist-roofing-waterproofing','specialist-hvac-wide-v2','hero-electrical-lighting'].map(src=>stageImage(serviceArt(src))).join('')}</span>
    </a>
   </section>
  </div>${libraryEnding()}
 </div>`;
}

function detail(article) {
 return fieldManual.detail(article,{
  text,paragraphs,label,link,image,h1,brand,publisher,esc,copy,serviceName,serviceArt,
  category:filters[article.category],related:article.related.map(slug=>articleBySlug[slug])
 });
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
module.exports = {articles,libraryArticles,library,detail,detailAssets:fieldManual.assets,serviceNotes,schema,assets};
