/* Reference-specific professional compositions. UI labels remain editable DOM. */
const iconRoot='/assets/sector-selector/icons/';
const icon=(name,cls='')=>`<img class="su-craft-icon ${cls}" src="${iconRoot+name}.svg" width="28" height="28" alt="">`;
const annotations={
 roof:[['屋面层','Roof sheeting',12,24],['保温层','Insulation',12,57],['基层与结构','Deck & structure',18,82],['泛水收口','Flashing junction',69,14],['排水槽与落水管','Gutter & downpipe',72,73]],
 lighting:[['办公与接待','Office & reception',16,62],['通道与公共区域','Circulation',48,78],['仓储与作业区','Warehouse work area',78,30]],
 systems:[['器具排水连接','Fixture connection',25,25],['地面排水路径','Floor drainage',66,75]],
 hvac:[['设备与过滤','Equipment & filters',18,38],['送回风路径','Supply & return air',54,20],['冷凝水连接','Condensate connection',70,78]],
 security:[['入口部件','Entry hardware',24,69],['天花设备','Ceiling equipment',76,17]],
 landscape:[['草坪','Lawn',13,23],['灌木与花坛','Shrubs & planting',52,15],['铺装边界','Paved edge',84,27]],
 parking:[['施工区 · 分区作业','Work zone',47,50],['车辆通行路线','Vehicle route',28,82],['行人通行','Pedestrian route',83,38]]
};
const itemIcons={roof:['house-line','house-line','drop','stack'],lighting:['desktop','path','cube'],systems:['drop','drop','gear','flame'],hvac:['wind','drop','desktop'],security:['flame','security-camera','credit-card'],landscape:['tree','plant','gear'],wayfinding:['storefront','door-open','path'],facade:['buildings','buildings','house-line'],matrix:['armchair','desktop','toilet','trash'],parking:['road-horizon','house-line','drop'],stages:['shield-check','wrench','stack']};
const facadeScope=[
 [['玻璃面、窗框及密封周边。','Glass surfaces, window frames and seal edges.'],['框体饰面与相邻外墙。','Frame finishes and adjacent exterior walls.'],['玻璃幕墙、落地窗、采光立面。','Curtain walls, full-height windows and glazed facades.']],
 [['金属板面、涂层与接缝。','Metal panels, coatings and joints.'],['先核对饰面状态与样区效果。','Check finish condition and the sample area first.'],['金属幕墙、板材与收边。','Metal facades, panels and edge trims.']],
 [['砖石表面与局部污渍。','Brick and stone surfaces and localised stains.'],['区分清洁和需要修复的部位。','Separate cleanable areas from surfaces needing repair.'],['砖墙、石材及外墙表面。','Brick walls, stonework and exterior surfaces.']]
];
exports.render=function(s,en,a,{dual,image,heading,control,panel}){
 const m=s.specialistModule,em=en.specialistModule,mode=a.mode;
 const intro=`<div class="su-craft-intro">${heading('02',m.title,em.title)}${m.intro?dual('p',m.intro,em.intro):''}</div>`;
 const selected=mode==='systems'?1:['security','landscape'].includes(mode)?2:0;
 const tabs=(opts={})=>`<div class="su-tabs su-craft-tabs" role="tablist" aria-label="Service systems" data-aria-label-zh="专业方案" data-aria-label-en="Service systems">${m.items.map((x,i)=>{
  let b=control('specialist',i,x.title,em.items[i].title,i===selected);
  b=b.replace(/<span class="su-node">[\s\S]*?<\/span>/,opts.thumb?image((a.options||a.problems)[i],x.title,em.items[i].title,{cls:'su-craft-thumb'}):icon(itemIcons[mode]?.[i]||'gear'));
  if(opts.body)b=b.replace('</button>',dual('span',x.body,em.items[i].body,'su-craft-tab-copy')+'</button>');
  if(mode==='facade')b=b.replace('<button ',image(a.materials[i],x.title,em.items[i].title,{cls:'su-craft-material'})+'<button ');
  return mode==='facade'?`<div class="su-craft-material-choice">${b}</div>`:b;
 }).join('')}</div>`;
 const labels=(which=mode)=>`<div class="su-craft-annotations">${(annotations[which]||[]).map(([z,e,x,y],i)=>`<span class="su-craft-label su-craft-label-${i}" style="--label-x:${x}%;--label-y:${y}%">${dual('span',z,e)}</span>`).join('')}</div>`;
 const visual=(src,z,e,annotate=true)=>`<div class="su-craft-visual">${image(src,z,e)}${annotate?labels():''}</div>`;
 const itemList=(active=-1)=>`<ul class="su-craft-checklist">${m.items.map((x,i)=>`<li${i===active?' class="is-current"':''}>${icon('check-circle')}${dual('strong',x.title,em.items[i].title)}${dual('p',x.body,em.items[i].body)}</li>`).join('')}</ul>`;
 const note=i=>`<aside class="su-craft-note">${dual('h3',m.items[i].title,em.items[i].title)}${dual('p',m.items[i].body,em.items[i].body)}</aside>`;
 const states=render=>`<div class="su-craft-panels">${m.items.map((x,i)=>panel('specialist',i,render(i),i===selected)).join('')}</div>`;
 const withIntro=extra=>intro.slice(0,-6)+extra+'</div>';
 let inner='';
 if(mode==='materials'){
  inner=`${intro}<div class="su-craft-material-cards">${m.items.map((x,i)=>`<article><div>${dual('h3',x.title,em.items[i].title)}${dual('p',x.body,em.items[i].body)}</div>${image(a.materials[i],x.title,em.items[i].title)}</article>`).join('')}</div>`;
 }else if(mode==='roof'){
  inner=`${intro}<div class="su-craft-roof-layout">${states(i=>`<div class="su-craft-roof-state" data-zone="${[0,3,4,1][i]}">${visual(a.specialist,m.title,em.title)}${note(i)}</div>`)}${tabs({thumb:true,body:true})}</div>`;
 }else if(mode==='systems'){
  inner=`${intro}<div class="su-craft-system-layout">${tabs({thumb:true,body:true})}${states(i=>`<div class="su-craft-system-diagram">${dual('h3',m.items[i].title+' · 系统范围',em.items[i].title+' · system scope')}${visual(i===1?a.specialist:a.problems[i],m.items[i].title,em.items[i].title,i===1)}${dual('p',m.items[i].body,em.items[i].body)}</div>`)}</div>`;
 }else if(mode==='lighting'){
  inner=`${intro}<div class="su-craft-model-layout">${states(i=>`<div class="su-craft-model-state" data-zone="${i}">${visual(a.specialist,m.title,em.title)}<aside class="su-craft-note"><h3>${dual('span',m.items[i].title,em.items[i].title)}</h3>${dual('p',m.items[i].body,em.items[i].body)}${icon('lightbulb','su-note-mark')}</aside></div>`)}${tabs()}</div>`;
 }else if(mode==='hvac'){
  const scope=m.items.map((x,i)=>`<div data-specialist-scope="${i}"${i===selected?'':' hidden'}>${note(i)}</div>`).join('');
  inner=`${withIntro(scope)}<div class="su-craft-wide-layout">${tabs()}${states(i=>`<div class="su-craft-wide-state" data-zone="${i}">${visual(a.specialist,m.title,em.title)}</div>`)}</div>`;
 }else if(mode==='landscape'){
  inner=`${intro}<div class="su-craft-wide-layout">${tabs({body:true})}${states(i=>`<div class="su-craft-wide-state" data-zone="${i}">${visual(a.specialist,m.title,em.title)}</div>`)}</div>`;
 }else if(mode==='security'){
  inner=`${intro}<div class="su-craft-entry-layout">${tabs()}${states(i=>`<div class="su-craft-entry-state" data-zone="${[1,1,0][i]}">${visual(a.specialist,m.title,em.title)}<aside class="su-craft-note">${dual('h3','工作范围','Work scope')}${itemList(i)}</aside></div>`)}</div>`;
 }else if(mode==='wayfinding'){
  inner=`${intro}<div class="su-craft-wayfinding-layout">${states(i=>`<div class="su-craft-wayfinding-picture" data-zone="${i}">${visual(a.specialist,m.title,em.title,false)}${icon('arrow-right','su-path-arrow su-path-arrow-1')}${icon('arrow-right','su-path-arrow su-path-arrow-2')}<span class="su-craft-route-label">${dual('span',m.items[i].title,em.items[i].title)}</span></div>`)}${tabs({body:true})}</div><div class="su-craft-day-preview"><div class="su-tabs" role="tablist" aria-label="Sign illumination" data-aria-label-zh="标识日夜预览" data-aria-label-en="Sign illumination">${[['日景','Day'],['夜景','Night']].map(([z,e],i)=>control('sign-time',i,z,e,i===0).replace(/<span class="su-node">[\s\S]*?<\/span>/,icon(i?'moon':'sun'))).join('')}</div>${[0,1].map(i=>panel('sign-time',i,image(a.gallery[i],i?'夜间标识示意':'日间标识示意',i?'Night signage illustration':'Day signage illustration'),i===0)).join('')}</div>`;
 }else if(mode==='facade'){
  inner=`${intro}<div class="su-craft-facade-layout">${tabs()}${states(i=>`<aside class="su-craft-note">${dual('h3',m.items[i].title,em.items[i].title)}${dual('p',m.items[i].body,em.items[i].body)}<ul class="su-craft-checklist">${[['清洁范围','Cleaning scope'],['保护重点','Protection'],['适用场景','Applications']].map(([z,e],j)=>`<li>${icon('check-circle')}${dual('strong',z,e)}${dual('p',...facadeScope[i][j])}</li>`).join('')}</ul></aside>`)}</div>`;
 }else if(mode==='matrix'){
  const areas=[['公共区域','Shared areas',53,60],['办公区域','Office spaces',20,47],['卫生间','Washrooms',80,24],['垃圾收集点','Bin storage',87,62]];
  const areaTabs=`<div class="su-tabs su-craft-tabs" role="tablist" aria-label="Cleaning areas" data-aria-label-zh="清洁区域" data-aria-label-en="Cleaning areas">${areas.map(([z,e],i)=>control('specialist',i,z,e,i===0).replace(/<span class="su-node">[\s\S]*?<\/span>/,icon(itemIcons.matrix[i]))).join('')}</div>`;
  inner=`${withIntro(areaTabs)}<div class="su-craft-cleaning-layout"><div class="su-craft-panels">${areas.map(([z,e,x,y],i)=>panel('specialist',i,`<div class="su-craft-floorplan" data-area="${i}">${visual(a.specialist,z,e,false)}<span class="su-craft-area-tag" style="--area-x:${x}%;--area-y:${y}%">${dual('span',z+' · 当前范围',e+' · selected area')}</span></div>`,i===0)).join('')}</div><aside class="su-craft-note">${itemList()}</aside></div>`;
 }else if(mode==='parking'){
  inner=`${withIntro(`<aside class="su-craft-note">${dual('h3','施工范围（示意）','Illustrative scope')}${itemList()}</aside>`)}<div class="su-craft-parking-layout">${states(i=>`<div class="su-craft-parking-state" data-zone="${i}">${visual(a.specialist,m.title,em.title)}</div>`)}${tabs({thumb:true,body:true})}</div>`;
 }else if(mode==='stages'){
  const stageNames=[['现状','Existing'],['施工','In progress'],['恢复','Reinstated']];
  inner=`${intro}<div class="su-craft-stage-layout"><div class="su-tabs su-craft-tabs" role="tablist" aria-label="Space stages" data-aria-label-zh="空间阶段" data-aria-label-en="Space stages">${stageNames.map(([z,e],i)=>control('specialist',i,z,e,i===0)).join('')}</div>${states(i=>`<div class="su-craft-stage-scene">${visual(a.gallery[i],stageNames[i][0],stageNames[i][1],false)}<button type="button" class="su-stage-arrow su-stage-previous" data-specialist-step="-1" aria-label="Previous stage" data-aria-label-zh="上一阶段" data-aria-label-en="Previous stage">${icon('arrow-right')}</button><button type="button" class="su-stage-arrow su-stage-next" data-specialist-step="1" aria-label="Next stage" data-aria-label-zh="下一阶段" data-aria-label-en="Next stage">${icon('arrow-right')}</button></div>`)}<div class="su-craft-paper-notes">${m.items.map((x,i)=>`<article data-specialist-note="${i}" class="${i===0?'is-current':''}">${icon(itemIcons.stages[i])}<div>${dual('h3',x.title,em.items[i].title)}${dual('p',x.body,em.items[i].body)}</div></article>`).join('')}</div></div>`;
 }
 if(mode==='wayfinding'){
  const start=inner.indexOf('<div class="su-craft-day-preview">');
  const preview=inner.slice(start);inner=inner.slice(0,start).replace(intro,withIntro(preview));
 }
 return `<section id="solutions" class="su-specialist su-crafted su-crafted-${mode}" data-su-reveal>${inner}</section>`;
};
