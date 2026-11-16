(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.EllisPropertySelector=api;})(typeof window!=='undefined'?window:this,function(){
 const e=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
 const names=['office','retail','hospitality','warehouse','industrial','medical','education','common'];
 const foregrounds=['office','plant','plant','industrial','industrial','plant','plant','plant'];
 const labels=[['空调','照明','公共区域'],['店面','照明','公共设施'],['通风','水管','环境维护'],['屋顶','装卸区','通道'],['设备','管线','场地'],['空调','室内设施','公共区域'],['照明','设施','场地'],['共享设施','外立面','公共区域']];
 const labelsEn=[['HVAC','Lighting','Common areas'],['Shopfronts','Lighting','Shared facilities'],['Ventilation','Plumbing','Site care'],['Roof','Loading areas','Access routes'],['Equipment','Pipework','Grounds'],['HVAC','Interior fittings','Common areas'],['Lighting','Facilities','Grounds'],['Shared systems','Façade','Common areas']];
 const locations=[[[39,16],[77,20],[68,71]],[[35,19],[74,17],[63,72]],[[31,18],[70,37],[67,70]],[[39,13],[72,61],[57,77]],[[30,15],[75,25],[63,76]],[[36,15],[72,40],[61,76]],[[34,16],[73,25],[62,75]],[[36,15],[74,28],[64,75]]];
 const image=i=>'/assets/sector-selector/'+names[i]+'-interior-v1.webp';
 const foreground=i=>'/assets/sector-selector/'+foregrounds[i]+'-foreground-v1.webp';

 const officeServices=[
  {slug:'hvac-building-systems',icon:'wind',zh:'空调与通风维护',en:'HVAC & ventilation',descZh:'空调保养、通风检查与设备维修。',descEn:'We maintain air conditioning, check ventilation and repair equipment.',ctaZh:'查看空调维护服务',ctaEn:'View HVAC services'},
  {slug:'electrical-lighting',icon:'lightbulb',zh:'商业电气与照明',en:'Electrical & lighting',descZh:'检查办公照明、配电与线路，按现场情况安排维修。',descEn:'We check office lighting, distribution and wiring, then arrange the work around site conditions.',ctaZh:'查看电气照明服务',ctaEn:'View electrical services'},
  {slug:'building-maintenance',icon:'buildings',zh:'楼宇与公共区域维修',en:'Building & common areas',descZh:'检查门窗、墙面与公共设施，明确维修范围和进场安排。',descEn:'We inspect doors, walls and shared facilities, then define repairs and site access.',ctaZh:'查看楼宇维修服务',ctaEn:'View building repairs'}
 ];
 const sectorHotspotServices=[officeServices,
[
  {
    "slug": "signage-wayfinding",
    "icon": "storefront",
    "zh": "店面与标识更新",
    "descZh": "检查招牌、导视与店面安装位置，衔接更新与修复。",
    "ctaZh": "查看标识更新服务",
    "en": "Shopfronts & signage",
    "ctaEn": "View signage services",
    "descEn": "We inspect signs, wayfinding and shopfront fittings, coordinating updates and repairs."
  },
  {
    "slug": "electrical-lighting",
    "icon": "lightbulb",
    "zh": "零售空间照明维护",
    "descZh": "检查商铺和公共通道灯具、照明线路，结合营业时间安排施工。",
    "ctaZh": "查看电气照明服务",
    "en": "Retail lighting maintenance",
    "ctaEn": "View electrical services",
    "descEn": "We check retail and corridor lighting and wiring, scheduling work around trading hours."
  },
  {
    "slug": "building-maintenance",
    "icon": "buildings",
    "zh": "商场公共设施维修",
    "descZh": "检查商场门窗、墙面和公共设施，协调租户通道与作业区域。",
    "ctaZh": "查看楼宇维修服务",
    "en": "Shared retail facilities",
    "ctaEn": "View building repairs",
    "descEn": "We inspect shopping-centre doors, windows, walls and shared facilities, coordinating tenant access and work areas."
  }
],
[
  {
    "slug": "hvac-building-systems",
    "icon": "wind",
    "zh": "餐饮与酒店通风维护",
    "descZh": "检查厨房、用餐区与客房相关的通风和空调设备，结合营业安排维护。",
    "ctaZh": "查看空调通风服务",
    "en": "Hospitality HVAC & ventilation",
    "ctaEn": "View HVAC services",
    "descEn": "We check kitchen, dining-area and guestroom ventilation and air conditioning, arranging maintenance around trading hours."
  },
  {
    "slug": "plumbing-drainage-gas",
    "icon": "drop",
    "zh": "供排水与热水维护",
    "descZh": "检查用水点、排水和热水设施，按厨房与客房使用安排作业。",
    "ctaZh": "查看水管排水服务",
    "en": "Plumbing & hot water",
    "ctaEn": "View plumbing services",
    "descEn": "We check water points, drainage and hot water systems, planning work around kitchen and guestroom use."
  },
  {
    "slug": "cleaning-waste-hygiene",
    "icon": "broom",
    "zh": "营业空间清洁维护",
    "descZh": "围绕用餐区、公共区域与后场清洁，明确范围和作业时段。",
    "ctaZh": "查看商业清洁服务",
    "en": "Hospitality cleaning",
    "ctaEn": "View cleaning services",
    "descEn": "We define cleaning areas and work times for dining spaces, shared areas and back-of-house facilities."
  }
],
[
  {
    "slug": "roofing-waterproofing",
    "icon": "house-line",
    "zh": "仓库屋面与排水维修",
    "descZh": "检查仓库屋面、天沟和落水口，按装卸与库存区域安排维修。",
    "ctaZh": "查看屋顶防水服务",
    "en": "Warehouse roofing & drainage",
    "ctaEn": "View roofing services",
    "descEn": "We inspect warehouse roofs, gutters and outlets, planning repairs around loading areas and stored goods."
  },
  {
    "slug": "building-maintenance",
    "icon": "buildings",
    "zh": "工业门与装卸区维修",
    "descZh": "检查工业门、装卸口和相邻建筑设施，结合车辆进出确定作业范围。",
    "ctaZh": "查看楼宇维修服务",
    "en": "Loading areas & industrial doors",
    "ctaEn": "View building repairs",
    "descEn": "We inspect industrial doors, loading bays and adjoining building fittings, defining repairs around vehicle movements."
  },
  {
    "slug": "car-parks-external-works",
    "icon": "road-horizon",
    "zh": "物流通道与地面维修",
    "descZh": "检查车辆通道、地面和划线，结合货车路线安排维修。",
    "ctaZh": "查看室外工程服务",
    "en": "Loading routes & surfaces",
    "ctaEn": "View external works",
    "descEn": "We check vehicle lanes, external surfaces and line marking, planning repairs around truck routes."
  }
],
[
  {
    "slug": "hvac-building-systems",
    "icon": "gear",
    "zh": "厂房楼宇设备维护",
    "descZh": "检查厂房通风、空调与楼宇设备，结合生产区域和停机条件安排维护。",
    "ctaZh": "查看楼宇设备服务",
    "en": "Industrial building systems",
    "ctaEn": "View building systems",
    "descEn": "We check factory ventilation, air conditioning and building equipment, planning maintenance around production areas and shutdown arrangements."
  },
  {
    "slug": "plumbing-drainage-gas",
    "icon": "drop",
    "zh": "供排水管线维护",
    "descZh": "检查供水、排水和管线连接，明确隔离范围与现场作业安排。",
    "ctaZh": "查看水管排水服务",
    "en": "Water & drainage pipework",
    "ctaEn": "View plumbing services",
    "descEn": "We inspect water supply, drainage and pipe connections, defining isolation areas and site arrangements."
  },
  {
    "slug": "car-parks-external-works",
    "icon": "road-horizon",
    "zh": "园区场地与室外维修",
    "descZh": "检查园区道路、围栏与室外地面，结合车辆通道明确维修范围。",
    "ctaZh": "查看室外工程服务",
    "en": "Industrial grounds & access",
    "ctaEn": "View external works",
    "descEn": "We inspect industrial-estate roads, fences and external surfaces, defining repairs around vehicle access."
  }
],
[
  {
    "slug": "hvac-building-systems",
    "icon": "wind",
    "zh": "诊疗空间空调维护",
    "descZh": "检查诊疗空间空调、送回风与控制设备，结合房间使用安排维护。",
    "ctaZh": "查看空调维护服务",
    "en": "Healthcare HVAC maintenance",
    "ctaEn": "View HVAC services",
    "descEn": "We check air conditioning, supply and return air, and controls in treatment spaces, planning maintenance around room use."
  },
  {
    "slug": "building-maintenance",
    "icon": "buildings",
    "zh": "室内设施与日常维修",
    "descZh": "检查门窗、墙面与室内设施，按场所使用和进入要求安排维修。",
    "ctaZh": "查看楼宇维修服务",
    "en": "Interior fittings & repairs",
    "ctaEn": "View building repairs",
    "descEn": "We inspect doors, windows, walls and interior fittings, planning repairs around room use and access requirements."
  },
  {
    "slug": "cleaning-waste-hygiene",
    "icon": "broom",
    "zh": "候诊与公共区域清洁",
    "descZh": "围绕候诊区、走廊和公共区域安排清洁，明确现场范围与作业时段。",
    "ctaZh": "查看商业清洁服务",
    "en": "Waiting & shared-area cleaning",
    "ctaEn": "View cleaning services",
    "descEn": "We plan cleaning for waiting areas, corridors and shared spaces, agreeing the scope and work times."
  }
],
[
  {
    "slug": "electrical-lighting",
    "icon": "lightbulb",
    "zh": "教学与活动空间照明",
    "descZh": "检查教室、活动室与公共通道照明，结合课程和开放时间安排作业。",
    "ctaZh": "查看电气照明服务",
    "en": "Learning-space lighting",
    "ctaEn": "View electrical services",
    "descEn": "We inspect classroom, activity-room and corridor lighting, scheduling work around classes and opening hours."
  },
  {
    "slug": "building-maintenance",
    "icon": "buildings",
    "zh": "教育与社区设施维修",
    "descZh": "检查门窗、墙面与共用设施，按活动安排划定维修区域。",
    "ctaZh": "查看楼宇维修服务",
    "en": "Education & community repairs",
    "ctaEn": "View building repairs",
    "descEn": "We inspect doors, windows, walls and shared facilities, defining repair areas around scheduled activities."
  },
  {
    "slug": "landscaping-irrigation",
    "icon": "tree",
    "zh": "绿化与灌溉维护",
    "descZh": "检查绿地、植栽与灌溉设施，结合学生和访客通行安排养护。",
    "ctaZh": "查看园林灌溉服务",
    "en": "Landscaping & irrigation",
    "ctaEn": "View landscaping services",
    "descEn": "We inspect lawns, planting and irrigation, planning grounds maintenance around students and visitor access."
  }
],
[
  {
    "slug": "fire-security-access",
    "icon": "shield-check",
    "zh": "消防、安防与门禁维护",
    "descZh": "检查共用区域消防设施、监控和门禁，明确工作范围与进入条件。",
    "ctaZh": "查看消防安防服务",
    "en": "Fire, security & access",
    "ctaEn": "View fire & security services",
    "descEn": "We inspect shared fire safety facilities, CCTV and access controls, defining the work scope and entry arrangements."
  },
  {
    "slug": "facade-high-access-cleaning",
    "icon": "buildings",
    "zh": "外立面与高空清洁",
    "descZh": "检查玻璃与外墙清洁范围，明确高空进入方式和周边通行安排。",
    "ctaZh": "查看外立面清洁服务",
    "en": "Façade & high-access cleaning",
    "ctaEn": "View façade cleaning",
    "descEn": "We define glass and façade cleaning areas, access arrangements and nearby pedestrian and vehicle routes."
  },
  {
    "slug": "cleaning-waste-hygiene",
    "icon": "broom",
    "zh": "楼宇公共区域清洁",
    "descZh": "围绕楼宇大堂、走廊与共用区域安排清洁，明确作业范围与使用时段。",
    "ctaZh": "查看商业清洁服务",
    "en": "Commercial common-area cleaning",
    "ctaEn": "View cleaning services",
    "descEn": "We plan cleaning for building lobbies, corridors and shared areas, agreeing the scope and work times."
  }
]
 ];
 function officePopover(){return '<div id="ps-office-popover" class="ps-office-popover" role="dialog" aria-modal="false" aria-labelledby="ps-office-title" hidden><div class="ps-office-heading"><img class="ps-office-icon" alt="" width="28" height="28"><strong id="ps-office-title"></strong><button type="button" class="ps-office-close" aria-label="关闭服务卡片">×</button></div><div class="ps-office-body"><p></p><a class="ps-office-link"><span></span><span aria-hidden="true">↗</span></a></div></div>';}
 function placeOfficePopover(anchor,bounds,size,viewport,avoid=[]){
  const leftEdge=Math.max(10,bounds.left+8),rightEdge=Math.min(viewport.width-10,bounds.right-8);
  const topInset=viewport.top||12,maxLeft=Math.max(leftEdge,rightEdge-size.width),maxTop=Math.max(topInset,viewport.height-size.height-12);
  const overlap=(c,r,pad=0)=>Math.max(0,Math.min(c.left+size.width,r.right+pad)-Math.max(c.left,r.left-pad))*Math.max(0,Math.min(c.top+size.height,r.bottom+pad)-Math.max(c.top,r.top-pad));
  const active={left:anchor.left,right:anchor.right??anchor.left+1,top:anchor.top,bottom:anchor.bottom};
  const candidates=[
   {left:anchor.left-24,top:anchor.bottom+10,direction:'below'},
   {left:anchor.left-24,top:anchor.top-size.height-10,direction:'above'},
   {left:active.right+12,top:anchor.top,direction:'right'},
   {left:anchor.left-size.width-12,top:anchor.top,direction:'left'}
  ].map((c,i)=>{const adjusted={...c,left:Math.max(leftEdge,Math.min(c.left,maxLeft)),top:Math.max(topInset,Math.min(c.top,maxTop))};return{...adjusted,score:overlap(adjusted,active,5)*100+avoid.reduce((sum,r)=>sum+overlap(adjusted,r,3),0)*10+i*.1};});
  candidates.sort((a,b)=>a.score-b.score);const {left,top,direction}=candidates[0];return{left,top,direction};
 }
 function bindServiceHotspots(state){
  const {node}=state,note=node.querySelector('.ps-office-popover'),buttons=[...node.querySelectorAll('[data-ps-hotspot]')];
  let active=-1,pinned=false,closeTimer=0;
  const cancelClose=()=>{clearTimeout(closeTimer);closeTimer=0;};
  state.closePopover=(restoreFocus=false)=>{cancelClose();const previous=active;active=-1;pinned=false;note.hidden=true;buttons.forEach(b=>b.setAttribute('aria-expanded','false'));if(restoreFocus&&previous>=0)buttons[previous].focus();};
  state.positionPopover=()=>{
   if(active<0||note.hidden)return;
   const bounds=node.getBoundingClientRect(),anchor=buttons[active].getBoundingClientRect();
   note.style.width=Math.min(310,node.clientWidth-20,window.innerWidth-24)+'px';
   const size={width:note.offsetWidth,height:note.offsetHeight},header=document.querySelector('.site-header'),top=Math.max(12,(header?.getBoundingClientRect().bottom||0)+8),avoid=buttons.filter((_,i)=>i!==active).map(b=>b.getBoundingClientRect()),pos=placeOfficePopover(anchor,bounds,size,{width:innerWidth,height:innerHeight,top},avoid);
   note.style.left=(pos.left-bounds.left-node.clientLeft)+'px';note.style.top=(pos.top-bounds.top-node.clientTop)+'px';note.dataset.direction=pos.direction;
  };
  const open=(i,pin=false)=>{
   cancelClose();active=i;pinned=pin;const service=sectorHotspotServices[state.index][i],en=state.language==='en';
   buttons.forEach((b,k)=>b.setAttribute('aria-expanded',String(k===i)));
   note.querySelector('strong').textContent=service[en?'en':'zh'];note.querySelector('p').textContent=service[en?'descEn':'descZh'];
   const link=note.querySelector('a');link.href='/services/'+service.slug+'/?lang='+state.language;link.querySelector('span').textContent=service[en?'ctaEn':'ctaZh'];
   note.querySelector('.ps-office-icon').src='/assets/sector-selector/icons/'+service.icon+'.svg';
   note.querySelector('button').setAttribute('aria-label',en?'Close service details':'关闭服务卡片');
   note.hidden=false;state.positionPopover();
  };
  const scheduleClose=()=>{cancelClose();if(!pinned)closeTimer=setTimeout(()=>{if(!note.matches(':hover')&&!note.contains(document.activeElement))state.closePopover();},260);};
  buttons.forEach((button,i)=>{
   button.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'&&(!pinned||active===i))open(i,pinned&&active===i);});
   button.addEventListener('pointerleave',()=>{scheduleClose();});
   button.addEventListener('click',()=>{if(active===i&&pinned)state.closePopover();else open(i,true);});
  });
  note.addEventListener('pointerenter',cancelClose);note.addEventListener('pointerleave',scheduleClose);note.addEventListener('focusin',cancelClose);
  note.addEventListener('focusout',event=>{if(!note.contains(event.relatedTarget)&&!buttons.includes(event.relatedTarget))scheduleClose();});
  note.querySelector('button').addEventListener('click',()=>state.closePopover(true));
  node.addEventListener('keydown',event=>{if(event.key==='Escape'&&active>=0){event.preventDefault();state.closePopover(true);}});
  document.addEventListener('pointerdown',event=>{if(active>=0&&!note.contains(event.target)&&!buttons.some(b=>b.contains(event.target)))state.closePopover();});
  window.addEventListener('scroll',()=>{if(active>=0)state.positionPopover();},{passive:true});
 }


 function tabs(data,lang='zh',active=0){return `<span class="ps-selection-bar" aria-hidden="true"></span><span class="ps-position-dot" aria-hidden="true"></span>`+data.map((s,i)=>`<button type="button" role="tab" id="sector-tab-${i}" aria-controls="sector-detail" aria-selected="${i===active}" tabindex="${i===active?'0':'-1'}" class="ps-index-item" data-sector="${i}"><span class="ps-index-number">${String(i+1).padStart(2,'0')}</span><span>${e(s[lang])}</span><span class="ps-index-arrow" aria-hidden="true">↗</span></button>`).join('');}
 function panel(data,slugs,lang='zh',active=0){const s=data[active];return `<div class="ps-frame-back" aria-hidden="true"></div><div class="ps-visual"><div class="ps-photo-window">${data.map((_,i)=>`<div class="ps-scene${i===active?' is-current':''}" data-ps-scene="${i}" aria-hidden="true" style="opacity:${i===active?1:0}"><img src="${image(i)}" alt="" width="1774" height="887" loading="lazy" decoding="async"></div>`).join('')}<span class="ps-orange-sweep" aria-hidden="true"></span></div><div class="ps-foreground" aria-hidden="true">${['office','plant','industrial'].map(name=>`<div class="ps-front" data-ps-front="${name}" style="opacity:${name===foregrounds[active]?1:0}"><img src="/assets/sector-selector/${name}-foreground-v1.webp" alt="" width="1774" height="887" loading="lazy" decoding="async"></div>`).join('')}</div><div class="ps-hotspots">${labels[active].map((label,i)=>`<button type="button" class="ps-hotspot" data-ps-hotspot="${i}" style="--hot-x:${locations[active][i][0]}%;--hot-y:${locations[active][i][1]}%" aria-expanded="false" aria-controls="ps-office-popover" aria-haspopup="dialog"><i aria-hidden="true"></i><span><span class="ps-hotspot-text">${lang==='zh'?label:labelsEn[active][i]}</span><b class="ps-hotspot-plus" aria-hidden="true">+</b></span></button>`).join('')}</div><span class="ps-scene-code" aria-hidden="true">${names[active].toUpperCase()} / ${String(active+1).padStart(2,'0')}</span></div>${officePopover()}<div class="ps-details-content"><div class="ps-name-tags"><h3>${e(s[lang])}</h3><div class="ps-maintenance-tags">${s[lang==='zh'?'tagsZh':'tagsEn'].map(tag=>`<span>${e(tag)}</span>`).join('')}</div></div><p class="ps-description">${e(s[lang==='zh'?'descZh':'descEn'])}</p><a class="ps-detail-link" href="/sectors/${slugs[active]}/?lang=${lang}">${lang==='zh'?'查看维护详情 ↗':'View maintenance details ↗'}</a></div>`;}
 function markup(data,slugs){return `<div class="sector-layout" id="property-selector" data-property-selector><span class="ps-connector" aria-hidden="true"><i></i><b></b></span><div id="sector-options" role="tablist" aria-label="商业物业种类" aria-orientation="vertical">${tabs(data)}</div><div id="sector-detail" class="ps-detail" role="tabpanel" aria-labelledby="sector-tab-0">${panel(data,slugs)}</div></div>`;}
 const controllers=new WeakMap();
 function update({panel:node,data,slugs,language,index}){
  const owner=node.closest('[data-property-selector]');let state=controllers.get(node);
  if(!state){
   if(!node.querySelector('.ps-scene'))node.innerHTML=panel(data,slugs,language,index);
   state={owner,node,index:-1,language,sequence:0,animations:[],frame:0,data,slugs,reduce:matchMedia('(prefers-reduced-motion: reduce)')};controllers.set(node,state);owner.dataset.psMounted='1';
   state.measure=()=>{state.frame=0;const chosen=owner.querySelector('[data-sector][aria-selected="true"]'),list=owner.querySelector('#sector-options');if(!chosen)return;const a=chosen.getBoundingClientRect(),b=list.getBoundingClientRect(),r=owner.getBoundingClientRect(),scene=node.querySelector('.ps-visual').getBoundingClientRect();owner.style.setProperty('--ps-selected-top',(chosen.offsetTop)+'px');owner.style.setProperty('--ps-selected-height',a.height+'px');owner.style.setProperty('--ps-dot-y',(chosen.offsetTop+a.height/2)+'px');const y1=a.top+a.height/2-r.top,y2=scene.top+Math.min(scene.height*.35,125)-r.top;owner.style.setProperty('--ps-wire-left',(b.right-r.left)+'px');owner.style.setProperty('--ps-wire-width',Math.max(0,scene.left-b.right+12)+'px');owner.style.setProperty('--ps-wire-top',Math.min(y1,y2)+'px');owner.style.setProperty('--ps-wire-height',Math.max(10,Math.abs(y2-y1))+'px');owner.style.setProperty('--ps-wire-flip',y1>y2?-1:1);state.positionPopover?.();};
   state.schedule=()=>{if(!state.frame)state.frame=requestAnimationFrame(state.measure)};
   state.observer=new ResizeObserver(state.schedule);state.observer.observe(owner);state.observer.observe(node);state.reduce.addEventListener('change',()=>{state.animations.forEach(a=>a.cancel());state.animations=[];node.querySelectorAll('[data-ps-scene],[data-ps-front]').forEach(s=>{s.style.opacity=(s.hasAttribute('data-ps-scene')?Number(s.dataset.psScene)===state.index:s.dataset.psFront===foregrounds[state.index])?'1':'0'});node.dataset.psSettled=String(state.index);state.schedule()});
   node.querySelector('.ps-visual').addEventListener('pointermove',event=>{if(state.reduce.matches||!matchMedia('(pointer:fine)').matches)return;const r=event.currentTarget.getBoundingClientRect();owner.style.setProperty('--ps-pan-x',((event.clientX-r.left)/r.width-.5)*10+'px');owner.style.setProperty('--ps-pan-y',((event.clientY-r.top)/r.height-.5)*6+'px')});node.addEventListener('pointerleave',()=>{owner.style.setProperty('--ps-pan-x','0px');owner.style.setProperty('--ps-pan-y','0px')});
   bindServiceHotspots(state);
  }
  state.closePopover();const changed=state.index!==index,first=state.index<0;state.language=language;state.index=index;const s=data[index];node.setAttribute('aria-labelledby','sector-tab-'+index);node.dataset.psActive=String(index);node.querySelector('h3').textContent=s[language];node.querySelector('.ps-description').textContent=s[language==='zh'?'descZh':'descEn'];node.querySelectorAll('.ps-maintenance-tags>span').forEach((tag,i)=>tag.textContent=s[language==='zh'?'tagsZh':'tagsEn'][i]);const link=node.querySelector('.ps-detail-link');link.href='/sectors/'+slugs[index]+'/?lang='+language;link.textContent=language==='zh'?'查看维护详情 ↗':'View maintenance details ↗';node.querySelector('.ps-scene-code').textContent=names[index].toUpperCase()+' / '+String(index+1).padStart(2,'0');
  node.querySelectorAll('[data-ps-hotspot]').forEach((button,i)=>{button.querySelector('.ps-hotspot-text').textContent=language==='zh'?labels[index][i]:labelsEn[index][i];button.style.setProperty('--hot-x',locations[index][i][0]+'%');button.style.setProperty('--hot-y',locations[index][i][1]+'%');button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls','ps-office-popover')});
  if(changed){
   const sequence=++state.sequence,layers=[...node.querySelectorAll('[data-ps-scene],[data-ps-front]')],starts=layers.map(layer=>Number(getComputedStyle(layer).opacity));
   state.animations.forEach(a=>a.cancel());state.animations=[];
   layers.forEach((layer,i)=>{
    const scene=layer.hasAttribute('data-ps-scene'),target=(scene?Number(layer.dataset.psScene)===index:layer.dataset.psFront===foregrounds[index])?1:0;
    layer.classList.toggle('is-current',!!target);layer.style.opacity=String(target);
    if(first||state.reduce.matches||(!target&&starts[i]<.01))return;
    const frames=scene?[{opacity:starts[i],clipPath:target?'inset(4% 7% 4% 7% round 70px)':'inset(0 round 38px)'},{opacity:target,clipPath:'inset(0 round 38px)'}]:[{opacity:starts[i],transform:'translateX('+ (target?8:0)+'px)'},{opacity:target,transform:'translateX('+ (target?0:-6)+'px)'}];
    const animation=layer.animate(frames,{duration:520,easing:'cubic-bezier(.2,.7,.25,1)'});state.animations.push(animation);
    animation.onfinish=()=>{if(sequence===state.sequence){state.animations=state.animations.filter(item=>item!==animation);if(!state.animations.length)node.dataset.psSettled=String(index)}};
   });
   if(first||state.reduce.matches)node.dataset.psSettled=String(index);
  }
  state.schedule();
 }
 return{markup,tabs,update,officeServices,sectorHotspotServices,placeOfficePopover,images:names.map((_,i)=>image(i))};
});
