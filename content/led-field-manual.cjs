const topicVisuals = require('./technical-field-visuals.cjs');
const editorialChapter = require('./commercial-article-chapter.cjs');
const icons = ['01','02','03','04','05'];
const technicalSteps = [
 ['mechanism',['成因','Cause'],['从现象追溯成因','Fault mechanism']],
 ['evidence',['诊断','Diagnosis'],['先看分布，再核对证据','Map the pattern, then check the evidence']],
 ['methods',['方法','Methods'],['维修方法与适用条件','Repair options and suitability']],
 ['verification',['验收','Verification'],['验收与记录','Verification and records']],
 ['questions',['问答','Q&A'],['技术问答','Technical questions']]
];
const ledDiagnosis = [
 {key:'dim', action:['低亮度才出现','At low dim levels'], marker:['调光状态','Dimming state']},
 {key:'single', action:['单灯预热后出现','One fitting after warm-up'], marker:['单灯位置','Single fitting']},
 {key:'group', action:['整组同时出现','Group affected together'], marker:['灯组范围','Group extent']}
];
const fields = [['观察现象','Observation'],['待区分机理','Possible mechanism'],['核对证据','What to check']];
const prompts = [
 [['灯具分布','Fixture pattern'],['单灯 / 灯组','Single fitting / group']],
 [['调光状态','Dimming state'],['低亮度 / 常用档位','Low level / usual setting']],
 [['发生时刻','Timing'],['启动 / 预热后','Start-up / after warm-up']]
];
const record = [
 [['运行状态','Operating state'],['启动到稳定运行','Start-up through steady operation']],
 [['调光范围','Dimming range'],['实际使用档位与触发条件','Levels used and triggering conditions']],
 [['留档内容','Records to keep'],['配置、测试条件与复现情况','Configuration, test conditions and recurrence']]
];
const photo = name => '/assets/news-technical/led-manual/' + name + '.webp';
const assets = '<link rel="stylesheet" href="/led-field-manual.css"><script src="/led-field-manual.js" defer></script>';

function detail(article, ui) {
 const {text,paragraphs,label,link,image,h1,brand,publisher,esc,copy,serviceName,serviceArt,category,related,followUp}=ui;
 const topic = article.visuals || topicVisuals[article.slug];
 const editorial = article.editorial;
 const isFieldTopic = Boolean(topic || editorial);
 const steps = editorial
  ? [...editorial.map(({short,heading},index) => [technicalSteps[index][0],short,heading]),technicalSteps[4]]
  : technicalSteps;
 const diagnosis = topic ? topic.scenes.map(([action,src],index)=>({key:'case-'+(index+1),action,src})) : ledDiagnosis;
 const initial = topic ? 0 : 1;
 const pageTitle = topic?.titleAccent
  ? article.title.map((title,index)=>{
   const start = title.lastIndexOf(topic.titleAccent[index]);
   return start > 0 ? title.slice(0,start).trimEnd()+'\n'+title.slice(start) : title;
  })
  : article.title;
 const service = '/services/' + article.primary + '/';
 const serviceTitle = isFieldTopic ? serviceName(article.primary) : ['商业电气与照明','Commercial electrical and lighting'];
 const byline = `<p class="led-byline"><strong>${esc(publisher)}</strong> · ${text('span',editorial?['商业维护指南','Commercial maintenance guide']:['技术综述','Technical review'])}</p>`;
 const date = article.publishedOn ? ['zh-CN','en-AU'].map(locale=>new Intl.DateTimeFormat(locale,{
  dateStyle:'long',timeZone:'UTC'
 }).format(new Date(article.publishedOn))) : null;

 function title(index) {
  const [id,,words]=steps[index];
  const heading = topic && !editorial && id==='evidence'
   ? topic.panel || ['我们如何查明故障','How we investigate the fault']
   : words;
  return `<h2 id="tn-h-${id}" class="led-chapter-title"><span class="led-chapter-number" aria-hidden="true">${icons[index]}</span>${text('span',heading)}</h2>`;
 }
 function chapter(index,content) {
  const [id]=steps[index];
  return `<section id="tn-${id}" class="led-chapter" tabindex="-1" aria-labelledby="tn-h-${id}">${content}</section>`;
 }
 function scene(key, variant='diagnosis') {
  return `<figure class="led-scene led-scene-${variant}" data-led-scene="${key}">
   ${image(photo('lighting-room'))}
   <i class="led-scene-outline" aria-hidden="true"></i>
   <div class="led-scene-tags" aria-hidden="true">${diagnosis.map(({key,marker})=>text('span',marker,'led-marker led-marker-'+key)).join('')}</div>
   <figcaption>${text('span',['灯具分布示意','Fixture layout illustration'])}</figcaption>
  </figure>`;
 }
 function topicBoard() {
  return `<figure class="led-scene led-scene-diagnosis field-topic-board" data-led-scene="${diagnosis[initial].key}">
   ${diagnosis.map(({key,action,src},index)=>`<div class="field-topic-frame" data-field-scene="${key}"${index===initial?'':' hidden'}>
    ${image(src)}
    <p class="field-topic-marker"><b aria-hidden="true">${icons[index]}</b>${text('span',action)}</p>
   </div>`).join('')}
   <figcaption>${text('span',['检查场景示意','Illustrative inspection scene'])}</figcaption>
  </figure>`;
 }
 const chaptersBar = `<div class="led-chapters led-wrap" data-led-chapters>
  <nav ${label('本文章节','Article sections')}>
   <button type="button" class="led-chapters-toggle" aria-controls="led-chapter-links" aria-expanded="false" hidden>
    ${text('strong',['本文章节','Sections'])}<span aria-hidden="true">/</span>
    <span class="led-current">${steps.map(([,short],index)=>`<span data-led-current="${index}"${index?' hidden':''}><b>${icons[index]}</b> ${text('span',short)}</span>`).join('')}</span>
    <i aria-hidden="true"></i>
   </button>
   <ol id="led-chapter-links">${steps.map(([id,short],index)=>`<li><a href="#tn-${id}"><b>${icons[index]}</b> ${text('span',short)}</a></li>`).join('')}</ol>
   <span class="led-progress" aria-hidden="true"><i></i></span>
  </nav>
 </div>`;
 function technicalChapters() {
  const mechanism = `<div class="led-mechanism-head">${title(0)}${text('p',topic?.aside || ['我们会把视频条纹与现场观察、实测结果一起核对。','We compare video banding with what we observe and measure on site.'],'led-aside')}</div>
   <div class="led-mechanism-copy">${paragraphs(article.mechanism)}</div>
   <ul class="led-keywords">${article.keywords.map(key=>text('li',key)).join('')}</ul>
   <p class="led-context">${text('span',['延伸阅读','Further reading'])} ${link(related[0].route,related[0].title.map(s=>s.replaceAll('\n',' ')))}</p>`;

  const controls = `<fieldset class="led-diagnosis-controls" hidden>
   ${text('legend',['选择出现状态','Choose a symptom pattern'],'led-sr-only')}
   ${diagnosis.map(({key,action},index)=>`<label><input name="led-diagnosis" type="radio" value="${key}"${index===initial?' checked':''}><span>${text('span',action)}<i aria-hidden="true">✓</i></span></label>`).join('')}
  </fieldset>`;

  const descriptions = `<div class="led-scene-copy" aria-live="polite" aria-atomic="true">
   ${article.evidence.map(([condition,cause,check],index)=>`<div data-led-status="${diagnosis[index].key}"${index===initial?'':' hidden'}>${text('h3',condition)}${text('p',cause)}${text('strong',fields[2])}${text('p',check)}</div>`).join('')}
  </div>`;
  const evidence = `<div class="led-evidence-panel">
   <div class="led-evidence-head">${title(1)}${controls}</div>
   <div class="led-evidence-grid">${topic ? topicBoard() : scene('single')}${descriptions}</div>
  </div>
  <div class="led-evidence-table">
   ${text('h3',['现象与诊断依据','Observation and diagnostic evidence'])}
   <div class="led-table-wrap"><table role="table" ${label('现象、机理与证据','Observations, mechanisms and checks')}>
   <thead role="rowgroup"><tr role="row">${fields.map(field=>`<th role="columnheader" scope="col" ${copy(field)}>${esc(field[0])}</th>`).join('')}</tr></thead>
   <tbody role="rowgroup">${article.evidence.map(([condition,...cells],index)=>`<tr role="row" data-led-row="${diagnosis[index].key}">
    <th role="rowheader" scope="row">${text('span',condition,'led-row-tag')}</th>
    ${cells.map((cell,j)=>`<td role="cell">${text('b',fields[j+1],'led-mobile-label')}${text('span',cell)}</td>`).join('')}
   </tr>`).join('')}</tbody></table></div>
   <div class="tn-diagnostic-note led-judgement">${text('h3',article.judgement.heading)}${paragraphs(article.judgement.body)}</div>
  </div>`;

  const methodArt = `<figure class="led-method-parts">${image(photo('driver-dimmer'))}
   <figcaption><span>${text('span',['驱动器','Driver'])}</span><span>${text('span',['调光状态','Dimming control'])}</span></figcaption>
  </figure>`;
  const methodVisual = index => topic
   ? `<figure class="led-scene led-scene-method field-topic-method">${image(topic.methods[index])}
     <figcaption>${text('span',['方法场景示意','Illustrative repair scene'])}</figcaption></figure>`
   : index ? scene('single','method') : methodArt;
  const methods = `${title(2)}<dl class="led-methods">
   ${article.methods.map(([name,body],index)=>`<div>${text('dt',name)}<dd>${text('p',body)}${methodVisual(index)}</dd></div>`).join('')}
  </dl>`;
  const recordRows = topic?.record || record;
  const verification = `${title(3)}<div class="led-record-panel">
   ${text('p',['验收记录项目','What we record at handover'],'led-record-label')}
   <dl>${recordRows.map(([key,value])=>`<div>${text('dt',key)}${text('dd',value)}</div>`).join('')}</dl>
   ${paragraphs(article.verification)}
   ${followUp?'<p class="led-context">'+text('span',['维护预算与进场协调','Maintenance budgets and access'])+' '+link(followUp.route,followUp.title.map(s=>s.replaceAll('\n',' ')))+'</p>':''}
   <p class="led-context">${text('span',['对应服务','Related service'])} ${link(service,serviceName(article.primary))}</p>
  </div>`;
  return [mechanism,evidence,methods,verification].map((body,index)=>chapter(index,body)).join('');
 }
 const questions = `${title(4)}<dl class="led-questions">
  ${article.faq.map(([q,a])=>`<div><dt><span aria-hidden="true">Q</span>${text('strong',q)}</dt><dd><span aria-hidden="true">A</span>${text('span',a)}</dd></div>`).join('')}
 </dl>`;

 const tail = `<div class="led-wrap led-tail">
  <section class="led-service" aria-labelledby="led-service-heading">
   <div>${text('p',['相关维修服务','Related maintenance service'])}
    <h2 id="led-service-heading">${text('span',serviceTitle)}</h2>
    ${link(service,isFieldTopic?['查看服务范围','Explore the service']:['查看电气与照明服务','Explore electrical and lighting services'],'tn-button')}${article.secondary?`
    ${link('/services/'+article.secondary+'/',serviceName(article.secondary),'field-topic-secondary')}`:''}
   </div>
   ${image(serviceArt('hero-'+article.primary))}
  </section>
  <section class="tn-related led-related" aria-labelledby="tn-related-title">
   <h2 id="tn-related-title">${text('span',['延伸阅读','Further reading'])}</h2>
   <div class="led-related-grid">${related.map(note=>`<article>${image(note.image)}<div>
    ${text('h3',note.title.map(s=>s.replaceAll('\n',' ')))}
    ${link(note.route,['继续阅读','Keep reading'])}
   </div></article>`).join('')}
   </div>
  </section>
  <nav class="led-tail-nav" ${label('文章导航','Article navigation')}>
   ${link('/insights/',['返回技术文章','Back to technical notes'],'','←')}
   ${link('#led-top',['回到文章顶部','Back to article top'],'','↑')}
  </nav>
 </div>`;
 const heroArt = isFieldTopic ? `<figure class="led-exploded field-topic-hero-art" data-tn-parallax>
    <div class="field-topic-hero-media">${image(article.image,true)}</div>
    <figcaption>
     <ul>${article.keywords.map(key=>text('li',key)).join('')}</ul>
     ${text('span',editorial?['商业维护场景示意','Commercial maintenance illustration']:['技术主题示意','Technical illustration'])}
    </figcaption>
   </figure>` : `<figure class="led-exploded" data-tn-parallax>
    <div class="led-exploded-art">${image(photo('exploded'),true)}
     <ul>${[['灯具外壳','Fitting housing'],['驱动器','Driver'],['LED 光源','LED light source']].map(name=>text('li',name)).join('')}</ul>
    </div>
    <figcaption>${text('span',['结构示意，非接线图','Assembly illustration, not a wiring diagram'])}</figcaption>
   </figure>`;
 return `<article class="tn tn-detail led-manual${isFieldTopic?' field-topic':''}" id="led-top">
 <header class="tn-hero led-hero" aria-labelledby="tn-article-title">
  <div class="led-wrap led-hero-grid">
   <div class="tn-hero-copy">
    <nav class="tn-crumb" ${label('当前位置','Breadcrumb')}>${link('/',['首页','Home'],'','')}<span aria-hidden="true">/</span>${link('/insights/',['技术文章','Technical notes'],'','')}<span aria-hidden="true">/</span>${text('span',isFieldTopic?category:['电气与照明','Electrical and lighting'])}</nav>
    ${brand}${h1(pageTitle,'tn-article-title')}${text('p',article.summary,'led-lead')}${byline}${date?`
    <time class="led-date" datetime="${article.publishedOn}" ${copy(date)}>${esc(date[0])}</time>`:''}
   </div>
   ${heroArt}
  </div>
 </header>
 ${chaptersBar}
 <div class="led-wrap led-reading">
  ${editorial ? editorial.map(({blocks},index)=>chapter(index,editorialChapter(index,title(index),blocks,ui))).join('') :
   `<dl class="led-intro" ${label('诊断导读','Diagnostic guide')}>${(topic?.guide || prompts).map(([key,value])=>`<div>${text('dt',key)}${text('dd',value)}</div>`).join('')}</dl>${technicalChapters()}`}
  ${chapter(4,questions)}
 </div>
 ${tail}
 </article>`;
}

module.exports = {detail,assets};
