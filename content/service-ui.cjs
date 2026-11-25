const pack=require('./service-pages.json');
const english=require('./service-pages.en.json');
const assets=require('./service-ui-assets.cjs')(pack.services);
const esc=x=>String(x??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const dual=(tag,z,e,cls='')=>`<${tag}${cls?` class="${cls}"`:''} data-zh="${esc(z)}" data-en="${esc(e)}">${esc(z)}</${tag}>`;
const image=(src,z,e,{hero=false,cls=''}={})=>`<img class="${cls}" src="${src}" width="1200" height="750" alt="${esc(z)}" data-alt-zh="${esc(z)}" data-alt-en="${esc(e)}" decoding="async" ${hero?'fetchpriority="high"':'loading="lazy"'}>`;
const control=(scope,i,z,e,selected=false)=>`<button type="button" role="tab" id="${scope}-tab-${i}" aria-controls="${scope}-panel-${i}" aria-selected="${selected}" tabindex="${selected?'0':'-1'}" data-select="${scope}" data-index="${i}"><span class="su-node">${String(i+1).padStart(2,'0')}</span>${dual('span',z,e)}<span aria-hidden="true">↗</span></button>`;
const cta=(s,z='咨询维修项目',en='Discuss your project')=>`<a class="su-button" data-service-enquiry href="/contact/?service=${s.slug}">${dual('span',z,en)}<span aria-hidden="true">↗</span></a>`;
const heading=(n,z,e)=>`<header class="su-section-heading"><p class="su-eyebrow">${n} / ELLIS MELBOURNE</p>${dual('h2',z,e)}</header>`;
const panel=(scope,i,html,selected=false)=>`<div class="su-state" id="${scope}-panel-${i}" role="tabpanel" tabindex="${selected?'0':'-1'}" aria-labelledby="${scope}-tab-${i}"${selected?'':' hidden'}>${html}</div>`;
const serviceHeadingFirstLines = {
 'building-maintenance': '墨尔本商业建筑维护',
 'roofing-waterproofing': '墨尔本商业屋顶',
 'electrical-lighting': '墨尔本商业电气维修',
 'plumbing-drainage-gas': '墨尔本商业水管、',
 'hvac-building-systems': '墨尔本商业空调维修',
 'fire-security-access': '墨尔本商业消防、',
 'landscaping-irrigation': '墨尔本商业园林绿化',
 'signage-wayfinding': '墨尔本商业广告标识',
 'facade-high-access-cleaning': '墨尔本商业外立面',
 'cleaning-waste-hygiene': '墨尔本商业清洁',
 'car-parks-external-works': '墨尔本商业停车场',
 'fit-outs-make-good': '墨尔本商业翻新',
};
const heroLabels=[
 [['门与五金','Doors & hardware'],['墙面与吊顶','Walls & ceilings'],['固定木作','Fixed joinery']],
 [['屋面与固定点','Roof & fixings'],['排水槽与落水管','Gutters & downpipes'],['泛水与收口','Flashing & junctions']],
 [['办公照明','Office lighting'],['公共区域','Shared areas'],['配电与用电','Power & distribution']],
 [['给水设施','Water supply'],['排水路径','Drainage'],['热水与燃气','Hot water & gas']],
 [['屋顶设备','Rooftop equipment'],['送回风系统','Supply & return air'],['冷凝水排水','Condensate drainage'],['控制与分区','Controls & zoning']],
 [['消防设备','Fire equipment'],['安防与对讲','Security & intercom'],['门禁与通行','Access & entry']],
 [['草坪与绿化','Lawns & planting'],['灌溉管线','Irrigation lines'],['硬质边界','Landscape edges']],
 [['外立面品牌','Facade branding'],['入口识别','Entry identification'],['场地导向','Site wayfinding']],
 [['玻璃与窗框','Glass & frames'],['外墙饰面','Facade surfaces'],['高处接近','High-level access']],
 [['公共区域','Shared areas'],['办公空间','Office spaces'],['环境维护','Site hygiene']],
 [['车辆动线','Vehicle routes'],['施工分区','Work zones'],['行人通行','Pedestrian access']],
 [['保留区域','Retained areas'],['施工范围','Work scope'],['恢复交接','Reinstatement']]
];
function specialist(s,en,a){return require('./service-ui-details.cjs').render(s,en,a,{dual,image,heading,control,panel});}

function gallery(s,en,a){
 const type=a.mode,compare=['materials','landscape','facade','parking'].includes(type),stack=type==='lighting',day=type==='wayfinding';
 const captions=s.gallery.shots.map((z,i)=>[z,en.gallery.shots[i]]);
 if(compare){captions[0]=['处理前：同角度现场示意','Before: same angle'];captions[1]=['处理后：同角度现场示意','After: same angle'];}
 if(type==='materials'){captions[2]=['墙面修补细节','Wall repair detail'];captions[3]=['固定柜体与收口','Fixed joinery and junctions'];}
 if(type==='lighting'){captions[2]=['商业照明检查','Commercial lighting inspection'];captions[3]=['配电与用电检查','Distribution and power inspection'];}
 if(day){captions[0]=['日间标识效果示意','Daytime signage illustration'];captions[1]=['夜间发光效果示意','Illuminated signage at night'];captions[2]=['门头标识细节','Shopfront signage detail'];captions[3]=['品牌标识与安装位置','Brand signage and fixing location'];}
 if(type==='stages'){[['原状空间','Existing space'],['施工阶段','Work in progress'],['恢复完成','Reinstated space']].forEach((x,i)=>captions[i]=x);}
 const pic=(i,cls='')=>image(a.gallery[i],captions[i][0],captions[i][1],{cls});
 const record=`<aside class="su-record">${dual('h3','完工交接记录','Handover records')}<ul>${s.handover.map((x,i)=>`<li>${dual('span',x,en.handover[i])}</li>`).join('')}</ul></aside>`;
 let content;
 if(compare) content=`<div class="su-gallery-layout"><div class="su-comparison" style="--split:50%">${pic(1,'su-after')}<div class="su-before">${pic(0)}</div><div class="su-comparison-labels">${dual('span','处理前 · 示意','Before · illustration')}${dual('span','处理后 · 示意','After · illustration')}</div><input type="range" min="0" max="100" value="50" aria-label="Compare before and after" data-aria-label-zh="拖动对比处理前后" data-aria-label-en="Compare before and after"><span class="su-comparison-handle" aria-hidden="true">↔</span></div>${record}<div class="su-film">${[2,3].map(i=>`<figure>${pic(i)}${dual('figcaption',...captions[i])}</figure>`).join('')}</div></div>`;
 else if(stack)content=`<div class="su-gallery-layout su-gallery-stacked"><div class="su-stack-pictures">${[0,1].map(i=>`<figure>${pic(i)}${dual('figcaption',i?'完成后的灯位与空间（示意）':'现场原状（示意）',i?'Updated lighting and space · illustration':'Existing lighting · illustration')}</figure>`).join('')}</div>${record}<div class="su-film">${[2,3].map(i=>`<figure>${pic(i)}${dual('figcaption',s.gallery.shots[i],en.gallery.shots[i])}</figure>`).join('')}</div></div>`;
 else if(type==='stages'){
  const labels=[['现状','Existing'],['施工','In progress'],['恢复','Reinstated']];
  content=`<div class="su-stage-film"><div class="su-stage-strip" role="group" aria-label="Project stages" data-aria-label-zh="项目阶段" data-aria-label-en="Project stages">${labels.map(([z,e],i)=>`<button type="button" data-stage-card="${i}" aria-pressed="${i===0}">${pic(i)}${dual('span',z,e)}</button>`).join('')}</div>${record}</div>`;
 }
 else if(type==='systems'){
  const scopeLabels=[['维修范围','Work scope'],['施工记录','Work records'],['交付事项','Handover']];
  const recordIcons=['wrench','clipboard-text','check-circle'];
  const records=`<aside class="su-record pg-record">${dual('h3','项目范围记录','Work record')}<dl>${scopeLabels.map(([z,e],i)=>`<div><dt><img src="/assets/sector-selector/icons/${recordIcons[i]}.svg" width="26" height="26" alt="" aria-hidden="true">${dual('span',z,e)}</dt>${dual('dd',s.handover[i],en.handover[i])}</div>`).join('')}</dl></aside>`;
  content=`<div class="su-plumbing-film pg-film"><div class="pg-frames">${s.gallery.shots.map((z,i)=>`<figure><div class="pg-photo">${pic(i)}</div><figcaption>${dual('strong',String(i+1).padStart(2,'0')+' / '+z.split('：')[0],String(i+1).padStart(2,'0')+' / '+en.gallery.shots[i].split(':')[0],'pg-phase')}${dual('span',z.split('：').slice(1).join('：'),en.gallery.shots[i].split(':').slice(1).join(':').trim())}</figcaption>${i<3?'<span class="pg-join" aria-hidden="true"><img src="/assets/sector-selector/icons/arrow-right.svg" width="22" height="22" alt=""></span>':''}</figure>`).join('')}</div>${records}</div>`;
 }
 else if(type==='hvac'){
  const phases=[['设备检查','Equipment inspection'],['维护过程','Maintenance'],['运行检查','Operation checks']];
  content=`<div class="su-hvac-gallery"><div class="su-tabs su-hvac-gallery-tabs" role="tablist" aria-label="Maintenance phases" data-aria-label-zh="维护阶段" data-aria-label-en="Maintenance phases">${phases.map(([z,e],i)=>control('gallery',i,z,e,i===0)).join('')}</div><div class="su-hvac-gallery-panels">${phases.map(([z,e],i)=>panel('gallery',i,`<div class="su-hvac-photo-film">${[i,(i+1)%4,(i+2)%4].map((n,j)=>`<figure class="${j===0?'is-featured':''}">${pic(n)}${dual('figcaption',...captions[n])}</figure>`).join('')}</div>`,i===0)).join('')}</div>${record}</div>`;
 }
 else if(type==='matrix'&&a.cleaningPair){
  const labels=[['公共区域','Shared areas'],['卫生间','Washrooms'],['垃圾收集点','Bin storage']];
  content=`<div class="su-cleaning-gallery-layout"><div class="su-tabs su-cleaning-gallery-tabs" role="tablist" aria-label="Cleaning records" data-aria-label-zh="清洁记录" data-aria-label-en="Cleaning records">${labels.map(([z,e],i)=>control('gallery',i,z,e,i===0)).join('')}</div><div class="su-cleaning-gallery-panels">${labels.map(([z,e],i)=>panel('gallery',i,i===0?`<div class="su-comparison" style="--split:50%">${image(a.cleaningPair[1],'公共区域清洁后示意','Shared area after cleaning illustration',{cls:'su-after'})}<div class="su-before">${image(a.cleaningPair[0],'公共区域清洁前示意','Shared area before cleaning illustration')}</div><div class="su-comparison-labels">${dual('span','处理前 · 示意','Before · illustration')}${dual('span','处理后 · 示意','After · illustration')}</div><input type="range" min="0" max="100" value="50" aria-label="Compare cleaning results" data-aria-label-zh="对比清洁前后" data-aria-label-en="Compare cleaning results"><span class="su-comparison-handle" aria-hidden="true">↔</span></div>`:`<figure>${pic(i===1?2:3)}${dual('figcaption',z+' · 现场示意',e+' · site illustration')}</figure>`,i===0)).join('')}</div><div class="su-film">${[1,2,3].map(i=>`<figure>${pic(i)}${dual('figcaption',...captions[i])}</figure>`).join('')}</div></div>`;
 }
 else {
  const n=day?2:type==='stages'?3:4;
  const labels=day?[['日景','Day'],['夜景','Night']]:type==='stages'?[['现状','Existing'],['施工','In progress'],['恢复','Reinstated']]:s.gallery.shots.slice(0,n).map((x,i)=>[x,en.gallery.shots[i]]);
  const film=day?[2,3].map(i=>`<figure>${pic(i)}${dual('figcaption',...captions[i])}</figure>`).join(''):s.gallery.shots.slice(1).map((x,j)=>`<button type="button" data-gallery-jump="${j+1}">${pic(j+1)}${dual('span',...captions[j+1])}</button>`).join('');
  content=`<div class="su-gallery-tabs su-tabs" role="tablist" aria-label="Gallery" data-aria-label-zh="图库视角" data-aria-label-en="Gallery views">${labels.map(([z,e],i)=>control('gallery',i,z,e,i===0)).join('')}</div><div class="su-gallery-layout su-gallery-${type}"><div class="su-gallery-stage">${labels.map(([z,e],i)=>panel('gallery',i,`<figure>${pic(i)}${dual('figcaption',z,e)}</figure>`,i===0)).join('')}</div>${record}<div class="su-film">${film}</div></div>`;
 }
 const intro=heading('04',s.gallery.title,en.gallery.title)+dual('p',s.gallery.label,en.gallery.label,'su-illustration-label');
 return `<section class="su-gallery su-gallery-kind-${type}" id="gallery" data-su-reveal>${type==='systems'?'<div class="pg-heading">'+intro+'</div>':intro}${content}</section>`;
}
exports.section=function(index,topic,records){
 const s=pack.services[index],en=english[index],a=assets[s.slug];if(!en)throw Error('Missing service English '+s.slug);
 const defaultIndex=s.problems.findIndex(p=>p.id===s.defaultProblemId);
 const firstLine = serviceHeadingFirstLines[s.slug];
 const chineseHeading = firstLine && s.ChineseH1.startsWith(firstLine) && s.ChineseH1.length > firstLine.length
  ? firstLine + '\n' + s.ChineseH1.slice(firstLine.length)
  : s.ChineseH1;
 const hero=`<section class="su-hero"><div class="su-hero-inner"><div class="su-hero-copy"><p class="su-eyebrow">ELLIS / MELBOURNE / ${s.number}</p>${dual('h1',chineseHeading,s.EnglishH1)}${dual('p',s.heroCopy,en.heroCopy,'su-hero-intro')}<div class="su-hero-actions">${cta(s)}<a href="#problems" class="su-text-link">${dual('span','查看维修范围 ↓','Explore the scope ↓')}</a></div><div class="su-insurance"><img src="/assets/sector-selector/icons/shield-check.svg" width="22" height="22" alt=""><span>$20M Public Liability Insurance</span></div></div><div class="su-hero-visual" data-su-float>${image(a.hero,s.title+'专业场景示意',en.title+' service illustration',{hero:true})}<div class="su-hero-hotspots">${heroLabels[index].map(([z,e],i)=>`<a class="su-hero-spot su-hero-spot-${i}" href="#solutions">${dual('span',z,e)}<i aria-hidden="true"></i></a>`).join('')}</div></div></div></section>`;
 const nav=`<nav class="su-section-nav" aria-label="Service page sections" data-aria-label-zh="服务页目录" data-aria-label-en="Service page sections">${[['problems','现场问题','Site issues'],['solutions','维修方案','Our approach'],['workflow','施工流程','Work sequence'],['gallery','维修场景','Gallery'],['questions','项目问答','Questions']].map(([id,z,e])=>`<a href="#${id}">${dual('span',z,e)}</a>`).join('')}</nav>`;
 const problems=`<section id="problems" class="su-problems" data-su-reveal>${heading('01','哪里出了问题，先看清楚。','What needs attention?')}<div class="su-problem-layout"><div class="su-tabs su-problem-tabs" role="tablist" aria-label="Site issues" data-aria-label-zh="选择现场问题" data-aria-label-en="Choose a site issue">${s.problems.map((p,i)=>control('problem',i,p.label,en.problems[i].label,i===defaultIndex)).join('')}</div><div class="su-problem-states">${s.problems.map((p,i)=>panel('problem',i,`<div class="su-problem-picture">${image(a.problems[i],p.label,en.problems[i].label)}${dual('span','场景示意','Illustrative scene','su-image-label')}</div><div class="su-solution">${dual('h3',p.solution.heading,en.problems[i].solution.heading)}<dl>${[['inspection','现场检查','Site inspection','magnifying-glass'],['method','处理方案','Our approach','wrench'],['check','完成检查','Completion check','check-circle']].map(([key,z,e,icon])=>`<div><dt><img src="/assets/sector-selector/icons/${icon}.svg" width="27" height="27" alt="">${dual('span',z,e)}</dt><dd>${dual('p',p.solution[key],en.problems[i].solution[key])}</dd></div>`).join('')}</dl>${cta(s,'咨询这项维修','Discuss this repair')}</div>`,i===defaultIndex)).join('')}</div></div></section>`;
 const workflow=`<section id="workflow" class="su-workflow" data-su-reveal>${heading('03','施工流程：从检查到交付，步骤清楚。','How we carry out the work')}<ol>${s.workflow.map((x,i)=>`<li><span class="su-node">0${i+1}</span><div>${dual('h3',x.title,en.workflow[i].title)}${dual('p',x.body,en.workflow[i].body)}</div>${image(i===3?'/assets/region-reference-v3/clipboard.webp':a.problems[i],x.title,en.workflow[i].title)}</li>`).join('')}</ol></section>`;
 const handover=`<section class="su-handover" data-su-reveal><div>${dual('h2','维修完成，资料也交清。','Work complete. Records clear.')}${dual('p','我们交付完工记录，便于您后续使用和维护。','We hand over a record of the completed work to help you plan ongoing maintenance.')}</div><ul>${s.handover.map((x,i)=>`<li>${dual('span',x,en.handover[i])}</li>`).join('')}</ul><img src="/assets/region-reference-v3/clipboard.webp" width="200" height="170" alt="" loading="lazy"></section>`;
 const faq=`<section id="questions" class="su-faq" data-su-reveal><div>${dual('h2','施工前，先把问题说清楚。','Clear answers before work begins.')}${dual('p','我们结合现场情况确认施工范围与进场安排。','We confirm the scope and site access arrangements with you.')}${cta(s,'提交项目需求','Share your project')}</div><div>${s.faq.map((x,i)=>`<details${i===0?' open':''}><summary>${dual('span',x.question,en.faq[i].question)}<span class="su-faq-symbol" aria-hidden="true">+</span></summary>${dual('p',x.answer,en.faq[i].answer)}</details>`).join('')}</div></section>`;
 const byId=Object.fromEntries(records.map(x=>[x.id,x]));
 const related=`<section class="su-related" data-su-reveal>${dual('h2','相关服务与商业场景','Related services and property types')}<div>${[...topic.related,...(topic.sectors||[])].map(id=>{const r=byId[id];return `<a href="/${r.route}/">${dual('span',r.label[0],r.label[1])}<span aria-hidden="true">↗</span></a>`}).join('')}</div></section>`;
 const compact=`<section class="su-contact" data-su-reveal><div>${dual('h2','把现场需求告诉我们。','Tell us what your site needs.')}${dual('p',s.title+'，从明确现场范围开始。',en.title+' starts with a clear site scope.')}</div>${cta(s,'填写项目需求','Share your project requirements')}</section>`;
 return `<div class="service-ui su-page-${a.mode}" data-service-reference="${s.slug}">${hero}${nav}<div class="su-content">${problems}${specialist(s,en,a)}${workflow}${gallery(s,en,a)}${handover}${faq}${related}${compact}</div></div>`;
};
exports.pack=pack;exports.assets=assets;
