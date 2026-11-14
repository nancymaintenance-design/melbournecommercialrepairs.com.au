/* Ellis Services Group — bilingual, self-contained concept website. */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  let language = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'zh';
  let activeSector = 0;
  let exploded = false;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduceMotion.matches;
  let currentView = 'all';
  let scene;
  const tr = (zh, en) => language === 'zh' ? zh : en;
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const iconPaths = [
    '<path d="M7 43V12l19-6v37M26 15h15v28M3 43h43M12 16h7m-7 7h7m-7 7h7m-7 7h7M31 22h5m-5 7h5m-5 7h5"/>',
    '<path d="M3 24 24 7l21 17M9 22v20h30V22M18 42V28h12v14M29 12V6h7v12"/><path d="M5 33 2 38m42-8 2 5"/>',
    '<path d="M26 4 10 27h12l-2 17 18-25H26zM6 10l3 3m30 24 3 3M5 25h5m29-15 3-3"/>',
    '<path d="M7 8h12v10h13V8h10v23H19v11H7zM5 14h16m9 0h14M5 36h16"/><circle cx="25" cy="25" r="4"/>',
    '<rect x="5" y="12" width="38" height="27" rx="1"/><circle cx="20" cy="25" r="9"/><path d="M20 16v18m-9-9h18m-15-6 12 12m0-12L14 31m21-13v14M11 39v4m26-4v4"/>',
    '<path d="M24 5 40 11v12c0 10-16 20-16 20S8 33 8 23V11zM17 23l5 5 10-12"/>',
    '<path d="M15 33c-13 0-10-12-5-14-3-10 13-17 18-7 10-2 17 15 3 20M24 21v22m-7 0h14m-7-14-7-5m7 2 6-6M4 43h40"/>',
    '<path d="M24 5v39M7 10h28l8 7-8 7H7zM24 31H10l-6 6 6 6h14"/><path d="M13 17h18"/>',
    '<rect x="8" y="5" width="31" height="38"/><path d="M8 18h31M8 31h31M23 5v38M4 12l10-8M27 36l15-15M31 42l13-13"/>',
    '<path d="m33 5-14 24M14 25l13 7-7 11H4zM10 31l9 5M35 24v10m-5-5h10M9 8v8m-4-4h8"/>',
    '<path d="M4 42h40M11 42l8-36m18 36L29 6M24 10v6m0 7v6m0 7v6"/><path d="M3 19h9V7H3v12m0-6h5"/>',
    '<path d="m5 39 25-25M27 8l7-4 10 10-4 7M6 32l10 10M7 43l-3-3 3-9 9 9zM24 39h19V25M30 39v-8h13"/>'
  ];
  const icon = (index, className = 'service-icon') => `<svg class="${className}" viewBox="0 0 48 48" aria-hidden="true">${iconPaths[index % iconPaths.length]}</svg>`;
  const services = [
    {zh:'建筑主体与日常维修',en:'Building & General Maintenance',subZh:'墙体 · 门窗 · 地面 · 木工',subEn:'Walls · Doors · Floors · Carpentry',introZh:'从楼宇主体到室内细节，统筹日常维修与建筑修复工作。',introEn:'Coordinated building repairs and everyday maintenance, from the structure to the interior details.',itemsZh:['墙体、天花及隔墙修补','门窗、五金、锁具与木工维修','地砖、地毯及地面修复','砌体、混凝土及建筑缺陷修复','油漆、涂层与公共区域维护'],itemsEn:['Wall, ceiling and partition repairs','Doors, windows, hardware, locks and carpentry','Tiling, carpet and floor repairs','Masonry, concrete and building defect repairs','Painting, coatings and common-area maintenance']},
    {zh:'屋顶、防水与建筑修复',en:'Roofing, Waterproofing & Remedial Works',subZh:'屋面 · 排水槽 · 防水 · 渗漏',subEn:'Roofing · Gutters · Waterproofing',introZh:'围绕屋顶与建筑围护，处理渗漏、破损和长期维护需求。',introEn:'Care for roofs and the building envelope, with repairs for leaks, damage and ongoing maintenance needs.',itemsZh:['商业屋面维修与更换','天沟、落水管与屋面排水维护','渗漏排查与防水工程','密封胶、接缝与伸缩缝修复','外墙、混凝土及建筑修复工程'],itemsEn:['Commercial roof repairs and replacement','Gutter, downpipe and roof drainage maintenance','Leak investigation and waterproofing','Sealants, joints and expansion-joint repairs','Façade, concrete and remedial building works']},
    {zh:'商业电气与照明',en:'Electrical & Lighting',subZh:'配电 · 灯具 · 线路 · 电力',subEn:'Power · Lighting · Wiring',introZh:'为商业空间的用电、照明与设备接入安排对应电气服务。',introEn:'Electrical services for commercial power, lighting and equipment connections.',itemsZh:['线路、配电及用电故障检修','室内、室外与停车场照明','LED 灯具更新与照明改造','设备电源及插座配置','电气检查、测试与维护安排'],itemsEn:['Fault finding, wiring and distribution works','Interior, exterior and car park lighting','LED upgrades and lighting improvements','Equipment power and outlet installation','Electrical inspection, testing and maintenance arrangements']},
    {zh:'水管、排水与燃气',en:'Plumbing, Drainage & Gas',subZh:'供水 · 排污 · 热水 · 燃气',subEn:'Water · Drainage · Hot Water · Gas',introZh:'照顾商业物业的供排水、热水及相关管线系统。',introEn:'Support for commercial water supply, drainage, hot water and associated pipework.',itemsZh:['漏水检修、管道维修与更换','堵塞处理及排水系统维护','卫生间、厨房及洁具维修','商业热水设备维护与更新','燃气及相关设备管线服务'],itemsEn:['Leak repairs and pipe maintenance or replacement','Blocked drains and drainage-system maintenance','Bathroom, kitchen and fixture repairs','Commercial hot water servicing and upgrades','Gas and associated equipment pipework services']},
    {zh:'空调与楼宇设备系统',en:'HVAC & Building Systems',subZh:'空调 · 通风 · 制冷 · 设备',subEn:'Air Conditioning · Ventilation · Plant',introZh:'将商业空调、通风、制冷与楼宇设备维护纳入统一工作安排。',introEn:'Coordinated servicing for commercial air conditioning, ventilation, refrigeration and building equipment.',itemsZh:['商用空调保养、维修与更换','通风、排风及风管系统维护','商业制冷及相关设备服务','水泵、电机与机械设备维护','楼宇设备巡检与维护计划','电梯、货梯及扶梯专业维护协调'],itemsEn:['Commercial air conditioning servicing, repairs and replacement','Ventilation, exhaust and duct-system maintenance','Commercial refrigeration and associated equipment','Pumps, motors and mechanical equipment','Building plant inspections and maintenance planning','Specialist lift, goods-lift and escalator maintenance coordination']},
    {zh:'消防、安防与门禁',en:'Fire, Security & Access',subZh:'消防 · 监控 · 自动门 · 门禁',subEn:'Fire · CCTV · Doors · Access',introZh:'统筹商业场地的消防、安防、门禁及出入设施相关专业服务。',introEn:'Coordination of specialist fire, security, access and site-entry services.',itemsZh:['消防设备检查与维护安排','监控、报警与门禁系统','自动门、卷帘门及工业门','闸机、道闸及车辆出入设施','装卸平台及相关设施维护'],itemsEn:['Fire equipment inspection and maintenance coordination','CCTV, alarms and access-control systems','Automatic, roller and industrial doors','Gates, barriers and vehicle-access equipment','Loading docks and associated facility maintenance']},
    {zh:'商业园林绿化与灌溉',en:'Landscaping, Grounds & Irrigation',subZh:'草坪 · 植栽 · 灌溉 · 场地',subEn:'Lawns · Planting · Irrigation',introZh:'从日常绿化维护到景观更新，让商业场地的室外空间有序运作。',introEn:'From regular grounds care to landscape improvements for commercial outdoor spaces.',itemsZh:['草坪修剪、除草及绿地养护','绿篱、灌木与花坛维护','树木修剪及专业树木服务安排','景观种植、覆盖物与绿化更新','景观施工、铺装与硬质景观工程','灌溉系统检修及维护'],itemsEn:['Mowing, weed control and grounds maintenance','Hedge, shrub and garden-bed care','Tree pruning and specialist tree-service coordination','Landscape planting, mulching and improvements','Landscape construction, paving and hardscaping','Irrigation-system repairs and maintenance']},
    {zh:'广告标识与导视',en:'Signage & Wayfinding',subZh:'店招 · 灯箱 · 导视 · 品牌',subEn:'Shopfronts · Illuminated Signs · Wayfinding',introZh:'将品牌展示、店面招牌与场地导视纳入物业维护与更新。',introEn:'Signage services for brand presence, shopfront identification and site wayfinding.',itemsZh:['商业招牌与品牌标识制作安装','灯箱、发光字及照明标识维护','楼宇、园区与停车场导视','玻璃贴膜、墙面图文与标识更新','旧标识拆除与安装位置修复'],itemsEn:['Commercial sign and brand signage fabrication and installation','Lightboxes, illuminated lettering and sign maintenance','Building, business-park and car park wayfinding','Window graphics, wall graphics and signage refreshes','Old-sign removal and surface reinstatement']},
    {zh:'外立面与高空清洁',en:'Façade & High-Access Cleaning',subZh:'玻璃 · 外墙 · 高空 · 清洗',subEn:'Façades · Windows · High Access',introZh:'结合楼宇高度、材质与现场条件，安排外墙和高处区域清洁。',introEn:'Façade and high-access cleaning planned around building height, materials and site conditions.',itemsZh:['商业楼宇外墙与玻璃清洁','高空外立面及难到达区域清洗','高压清洗与表面清洁','雨棚、采光顶及标识表面清洁','按场地条件安排对应高空作业资源'],itemsEn:['Commercial façade and window cleaning','High-access and difficult-to-reach areas','Pressure washing and surface cleaning','Canopies, skylights and signage surfaces','Access arrangements suited to the site']},
    {zh:'商业清洁与环境维护',en:'Cleaning, Waste & Hygiene',subZh:'日常清洁 · 深度清洁 · 环境',subEn:'Cleaning · Hygiene · Site Care',introZh:'覆盖商业空间的日常清洁、专项清洁与场地环境维护。',introEn:'Routine cleaning, specialist cleans and environmental care for commercial spaces.',itemsZh:['办公室、零售及公共区域清洁','地毯、地面及卫生间深度清洁','施工后及交付前清洁','垃圾区域清洁与废弃物清运安排','消杀、虫害及专项环境服务安排'],itemsEn:['Office, retail and common-area cleaning','Carpet, floor and bathroom deep cleaning','Post-construction and pre-handover cleans','Bin-area cleaning and waste-removal coordination','Hygiene, pest and specialist environmental-service coordination']},
    {zh:'停车场与室外工程',en:'Car Parks & External Works',subZh:'地坪 · 划线 · 围栏 · 道路',subEn:'Paving · Line Marking · Fencing',introZh:'照顾建筑周边的道路、停车、步行与场地设施。',introEn:'Maintenance and improvements for access roads, parking, pedestrian areas and external facilities.',itemsZh:['停车场修补、铺装与地坪维护','车位、通道及安全区域划线','路缘、步道、坡道与排水设施','围栏、护栏、防撞柱与挡车器','室外设施及场地小型土建工程'],itemsEn:['Car park repairs, paving and surface maintenance','Bay, walkway and safety-area line marking','Kerbs, paths, ramps and external drainage','Fences, barriers, bollards and wheel stops','Outdoor facilities and minor civil works']},
    {zh:'商业翻新与退租恢复',en:'Fit-outs, Refurbishments & Make Good',subZh:'装修 · 改造 · 翻新 · 退租恢复',subEn:'Fit-outs · Upgrades · Make Good',introZh:'围绕租户更替、空间调整与物业更新，协调多工种施工。',introEn:'Coordinated multi-trade works for tenancy changes, space adjustments and property upgrades.',itemsZh:['办公室、商铺及商业空间翻新','隔墙、天花、地面与饰面工程','设备调整及配套水电改造','租赁结束后的 make good 恢复','拆除、清运、修复与交付整理'],itemsEn:['Office, retail and commercial-space refurbishments','Partitions, ceilings, floors and finishes','Equipment changes and associated services','End-of-lease make-good works','Strip-out, removal, reinstatement and handover preparation']}
  ];
  const sectors = [
    {zh:'办公室与写字楼',en:'Offices & Workplaces',descZh:'围绕办公环境、公共区域与楼宇设备安排维护，让维修与日常办公节奏相互衔接。',descEn:'Care for workspaces, shared areas and building systems, with work planned around the rhythm of the office.',tagsZh:['楼宇维修','空调与照明','清洁与环境'],tagsEn:['Building maintenance','HVAC & lighting','Cleaning & hygiene'],icon:0},
    {zh:'零售与购物中心',en:'Retail & Shopping Centres',descZh:'从店面形象到公共设施，统筹商场与零售空间的维修、更新和定期维护。',descEn:'From shopfront presentation to common facilities, coordinated repairs, upgrades and maintenance for retail spaces.',tagsZh:['店面与标识','公共设施','定期维护'],tagsEn:['Shopfronts & signage','Shared facilities','Ongoing maintenance'],icon:7},
    {zh:'餐饮与酒店',en:'Hospitality & Accommodation',descZh:'结合营业时段与场地用途，安排设备、排水、通风及室内外环境工作。',descEn:'Equipment, drainage, ventilation and property care organised around the site’s use and operating hours.',tagsZh:['通风与制冷','水管与排水','环境维护'],tagsEn:['Ventilation & refrigeration','Plumbing & drainage','Site hygiene'],icon:4},
    {zh:'仓库与物流',en:'Warehouses & Logistics',descZh:'照顾仓库楼宇、装卸区、工业门与场地通道，按现场运营需求组织工作。',descEn:'Care for warehouse buildings, loading areas, industrial doors and access routes, planned around site operations.',tagsZh:['工业门与装卸区','屋顶维修','地坪与划线'],tagsEn:['Doors & loading areas','Roof repairs','Floors & line marking'],icon:10},
    {zh:'工厂与工业园区',en:'Industrial & Business Parks',descZh:'将建筑、设备与室外区域纳入维护安排，协调园区内不同工作区域。',descEn:'Coordinated building, equipment and external-area maintenance across the different spaces in an industrial site.',tagsZh:['设备系统','园区设施','多工种工程'],tagsEn:['Building systems','Site facilities','Multi-trade projects'],icon:4},
    {zh:'医疗与健康场所',en:'Medical & Health Facilities',descZh:'根据现场使用条件和运营安排，组织诊所与健康服务场所的物业维修工作。',descEn:'Property repairs for clinics and health-service spaces, arranged around their site requirements and operations.',tagsZh:['室内维修','空调与水电','专项清洁'],tagsEn:['Interior repairs','HVAC & services','Specialist cleaning'],icon:5},
    {zh:'教育与社区设施',en:'Education & Community',descZh:'围绕教室、活动空间、公共区域与室外场地，组织设施维护与环境更新。',descEn:'Facility care and improvements for learning spaces, activity areas, communal facilities and outdoor grounds.',tagsZh:['设施维修','绿化与场地','照明与标识'],tagsEn:['Facility repairs','Grounds & landscaping','Lighting & signage'],icon:6},
    {zh:'商业公共物业',en:'Commercial Common Areas',descZh:'为物业经理与业主提供公共区域、共享设施和楼宇外部的维护支持。',descEn:'Maintenance support for property managers and owners across common areas, shared facilities and building exteriors.',tagsZh:['公共区域','外立面清洁','维护计划'],tagsEn:['Common areas','Façade cleaning','Maintenance plans'],icon:8}
  ];
  const faqs = [
    ['你们服务哪些商业物业？','What types of commercial properties do you service?','我们为办公室、商铺、餐厅、购物中心、仓库、厂房及商业楼宇公共区域提供服务。我们根据物业用途、现场设备和施工范围安排相应工作。','We service offices, shops, restaurants, shopping centres, warehouses, industrial properties and shared areas in commercial buildings. We organise the work around the property’s use, equipment and site requirements.'],
    ['一个项目涉及多个工种，可以一起安排吗？','Can you coordinate several trades for one project?','可以。我们可以统筹建筑维修、空调、水电、设备、园林、标识和清洁等工作，并根据现场情况安排施工顺序。','Yes. We can coordinate building repairs, HVAC, electrical, plumbing, equipment, landscaping, signage and cleaning, with the work sequenced around the site and project scope.'],
    ['你们接受单次维修还是长期维护？','Do you offer one-off repairs and ongoing maintenance?','两种都接受。我们承接单次维修、翻新及设备更新，也可根据物业需求制定持续维护安排。','Both. We undertake one-off repairs, refurbishments and equipment upgrades, and can arrange ongoing maintenance to suit the property.'],
    ['你们在哪些地区提供服务？','Which areas do you service?','我们为墨尔本商业物业提供维修与维护服务。提供物业地址后，我们会确认具体现场安排。','We provide commercial property maintenance and repairs in Melbourne. Send us the property address and we’ll confirm the site arrangements.'],
    ['如何开始项目咨询？','How do I start an enquiry?','准备物业地址、需要处理的项目及联系方式即可。现场照片、图纸或维修清单也能帮助明确范围。本页为设计预览，表单可生成咨询草稿，暂不发送信息。','Start with the property address, a description of the work and your contact details. Photos, plans or a maintenance list can help define the scope. This page is a design preview: the form creates an enquiry draft but does not send it.']
  ];
  const articles = [
    {zh:'商业物业维护计划应覆盖哪些项目？',en:'What should a commercial property maintenance plan cover?',catZh:'物业维护',catEn:'PROPERTY CARE',icon:0,bodyZh:[['从物业清单开始','先列出建筑、设备、室外场地和公共区域，再对应各区域的维护需求。把屋面、空调、水电、门禁、照明、绿化和清洁放在同一份清单里，更容易发现遗漏。'],['把工作分成三类','将临时维修、定期维护与计划更新分开记录，写明范围、负责人及建议安排时间。具体维护频率应结合设备资料、现场状况和适用要求确定。'],['让现场信息跟着项目走','保留现场照片、维修记录、设备信息和完成情况，便于后续人员了解发生过什么、已经处理什么，以及下一步需要关注什么。']],bodyEn:[['Start with the property inventory','List the building, its equipment, outdoor grounds and shared areas. Map the care needed for roofs, HVAC, electrical, plumbing, access systems, lighting, landscaping and cleaning in one place.'],['Separate the kinds of work','Record reactive repairs, routine maintenance and planned upgrades with a clear scope, contact and proposed timing. Set maintenance frequencies using equipment information, site conditions and applicable requirements.'],['Keep the site information together','Keep photographs, repair records, equipment details and completion notes together so the next person can understand what happened, what was addressed and what needs attention.']]},
    {zh:'外墙与高空清洁，如何安排更顺畅？',en:'Planning façade and high-access cleaning for your property',catZh:'外立面与环境',catEn:'FAÇADE & EXTERIOR',icon:8,bodyZh:[['明确需要清洁的范围','从玻璃、幕墙、雨棚、标识到高处细部，先记录位置、材质与现状。不同区域可能需要不同的现场安排。'],['从现场条件讨论作业方式','提供楼宇高度、出入口、周边人流与可用作业区域等信息，由对应专业人员评估接近方式、现场措施与施工安排。'],['提前协调物业运营','将营业时段、租户活动、车辆进出和天气条件纳入讨论，并明确哪些区域需要分段完成、何时检查交付效果。']],bodyEn:[['Define the cleaning scope','Record the location, materials and condition of windows, façades, canopies, signage and other high areas. Different parts of the building may need different arrangements.'],['Discuss access around the actual site','Provide building height, entry points, pedestrian activity and available work areas. Relevant specialists can then assess access, site measures and the work plan.'],['Coordinate with property operations','Discuss opening hours, tenant activity, vehicle access and weather conditions. Agree which areas need staged work and how completed areas will be reviewed.']]},
    {zh:'商铺换租，标识更新与场地修复如何衔接？',en:'Coordinating signage and make-good works between tenancies',catZh:'商业空间更新',catEn:'TENANCY CHANGES',icon:7,bodyZh:[['先确认交付范围','将现有状态、约定恢复范围与新用途放在一起核对，记录哪些内容保留、拆除、修复或新增，避免不同工种对范围理解不一致。'],['把标识与基础工作一起安排','旧标识移除可能涉及表面修补、涂装和电气工作。新标识的安装位置也需要与店面、照明及导视设计共同确认。'],['形成一份交接清单','把相关施工、清运、清洁及最终检查放在同一份安排中。对需要进一步确认的范围及时记录，完成后保留交付信息。']],bodyEn:[['Confirm the handover scope','Review the existing condition, agreed reinstatement scope and intended use together. Record what stays, what is removed, what needs repair and what will be added.'],['Plan signage with the supporting work','Removing old signage may involve surface repairs, painting and electrical work. Confirm the new location alongside shopfront, lighting and wayfinding plans.'],['Use one handover checklist','Bring the works, waste removal, cleaning and final checks into one plan. Record items that need further confirmation and retain the handover details when the work is complete.']]}
  ];

  const serviceSlugs=['building-maintenance','roofing-waterproofing','electrical-lighting','plumbing-drainage-gas','hvac-building-systems','fire-security-access','landscaping-irrigation','signage-wayfinding','facade-high-access-cleaning','cleaning-waste-hygiene','car-parks-external-works','fit-outs-make-good'];
  const sectorSlugs=['offices','retail-shopping-centres','hospitality','warehouses-logistics','industrial-business-parks','medical-health','education-community','commercial-common-areas'];
  const articleSlugs=['maintenance-plan','facade-cleaning','signage-make-good'];
  function renderRibbon(){
    const track=$('.ribbon-track');if(!track)return;
    const cycle=services.map(service=>`<b data-zh="${esc(service.zh)}" data-en="${esc(service.en)}">${esc(service[language])}</b><i>·</i>`).join('');
    track.innerHTML=`<span class="ribbon-group">${cycle}</span>`;
    const group=track.firstElementChild;
    // Fill even unusually wide windows; the second group must match exactly.
    for(let repeat=0;group.getBoundingClientRect().width<window.innerWidth+100&&repeat<8;repeat++)group.insertAdjacentHTML('beforeend',cycle);
    track.appendChild(group.cloneNode(true));
  }
  function renderServices() {
    const grid=$('#service-grid');
    if(!grid.querySelector('.showcase-card')) grid.innerHTML=window.EllisServiceShowcase.cards(services,serviceSlugs);
    grid.querySelectorAll('[data-service]').forEach(card=>{const index=Number(card.dataset.service);card.href='/services/'+serviceSlugs[index]+'/?lang='+language;card.setAttribute('aria-label',tr('查看','Explore ')+services[index][language]);});

    const previousValue = $('#quote-service').value;
    $('#quote-service').innerHTML = `<option value="">${tr('选择服务类型','Select a service')}</option><option value="multi">${tr('多项服务 / 综合维护','Multiple services / General maintenance')}</option>` + services.map((service,index) => `<option value="${index}">${service[language]}</option>`).join('');
    $('#quote-service').value = previousValue;
  }
  function renderSectors() {
    renderSectorFilm();
    $('#sector-options').innerHTML = window.EllisPropertySelector.tabs(sectors,language,activeSector);
    $$('[data-sector]').forEach(button => {
      button.addEventListener('click',() => selectSector(Number(button.dataset.sector)));
      button.addEventListener('keydown',event => {
        let next = activeSector;
        if (['ArrowRight','ArrowDown'].includes(event.key)) next = (activeSector+1) % sectors.length;
        else if (['ArrowLeft','ArrowUp'].includes(event.key)) next = (activeSector+sectors.length-1) % sectors.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = sectors.length-1;
        else return;
        event.preventDefault(); selectSector(next); $(`#sector-tab-${next}`).focus();
      });
    });
    renderSectorDetail();
  }
  function selectSector(index) {
    activeSector = index;
    $$('[data-sector]').forEach((button,i) => {button.setAttribute('aria-selected',String(i === index));button.tabIndex = i === index ? 0 : -1;});
    renderSectorDetail();
  }
  function renderSectorFilm() {
    const track = $('#sector-film-track');
    if(!track)return;
    const codes=['OFFICE','RETAIL','LOGISTICS','BUSINESS PARK'];
    const showcase=[0,1,3,4];
    const art=[
      '<img class="sector-card-image" src="assets/ellis-architecture.webp" alt="" width="1536" height="1024" loading="lazy">',
      `<img class="sector-card-image sector-scene-image" src="assets/sectors/retail-shopping-centre.webp" alt="${tr('零售与购物中心概念场景','Retail and shopping centre concept illustration')}" width="1536" height="1024" loading="lazy" decoding="async">`,
      `<img class="sector-card-image sector-scene-image" src="assets/sectors/warehouse-logistics.webp" alt="${tr('仓库与物流中心概念场景','Warehouse and logistics centre concept illustration')}" width="1536" height="1024" loading="lazy" decoding="async">`,
      `<img class="sector-card-image sector-scene-image" src="assets/sectors/manufacturing-campus.webp" alt="${tr('制造工厂与工业园区概念场景','Manufacturing and industrial campus concept illustration')}" width="1536" height="1024" loading="lazy" decoding="async">`
    ];
    track.innerHTML=showcase.map((sectorIndex,i)=>{
      const sector=sectors[sectorIndex];
      return `<button class="sector-film-card" data-sector-card="${sectorIndex}" aria-label="${esc(tr('查看','Explore ')+sector[language])}"><div class="sector-card-copy"><span class="sector-card-type">ELLIS / ${codes[i]}</span><h3>${sector[language]}</h3><p>${tr(sector.descZh,sector.descEn)}</p><div class="sector-tags">${tr(sector.tagsZh,sector.tagsEn).slice(0,2).map(tag=>`<span>${tag}</span>`).join('')}</div><span class="sector-card-link"><span>${tr('查看对应服务','EXPLORE THE SERVICES')}</span><span aria-hidden="true">↗</span></span></div><div class="sector-card-visual">${art[i]}<span class="sector-card-code" aria-hidden="true">${codes[i]}</span></div></button>`;
    }).join('');
    $$('[data-sector-card]').forEach(button=>button.addEventListener('click',()=>{selectSector(Number(button.dataset.sectorCard));$('.sector-selection').scrollIntoView({behavior:reduceMotion.matches?'instant':'smooth',block:'start'});}));
  }
  function renderSectorDetail() {
    window.EllisPropertySelector.update({panel:$('#sector-detail'),data:sectors,slugs:sectorSlugs,language,index:activeSector});
  }
  function renderNews() {
    window.EllisNewsMagazine.update({node:$('#news'),data:articles,slugs:articleSlugs,language});
  }
  function renderFaq() {
    const openItems = $$('details[open]', $('#faq-list')).map(el=>el.dataset.index);
    $('#faq-list').innerHTML = faqs.map((faq,index)=>`<details data-index="${index}"${openItems.includes(String(index)) ? ' open' : ''}><summary>${tr(faq[0],faq[1])}</summary><p>${tr(faq[2],faq[3])}</p></details>`).join('');
  }
  function applyLanguage() {
    const story=document.querySelector('#home');
    const pin=story.querySelector('.care-pin');
    const header=document.querySelector('.site-header').offsetHeight;
    const y=window.scrollY;
    const inStory=!document.body.classList.contains('motion-reduced') && y < story.offsetTop+story.offsetHeight-pin.offsetHeight;
    const progress=Math.max(0,(y-story.offsetTop+header)/Math.max(1,story.offsetHeight-pin.offsetHeight));
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    const canonical=document.querySelector('link[rel="canonical"]');if(canonical)canonical.href=new URL('/?lang='+language,location.origin).href;
    const mapFrame=document.querySelector('#location iframe');
    if(mapFrame){
      mapFrame.title=tr('Ellis 商家地图 — 墨尔本 Collins Street 459 号','Ellis business map — 459 Collins St, Melbourne');
      const mapUrl=new URL(mapFrame.src),mapLanguage=language==='zh'?'zh-CN':'en';
      if(mapUrl.searchParams.get('hl')!==mapLanguage){mapUrl.searchParams.set('hl',mapLanguage);mapFrame.src=mapUrl.href;}
    }
    document.title = tr('墨尔本商业物业维护与维修 | Ellis Services Group','Commercial Property Maintenance & Repairs in Melbourne | Ellis Services Group');
    document.querySelector('meta[name="description"]')?.setAttribute('content',tr('Ellis Services Group 为墨尔本商业物业提供建筑维修、空调水电、园林绿化、广告标识及外立面高空清洁。','Ellis Services Group coordinates commercial property maintenance in Melbourne: building repairs, HVAC, electrical, plumbing, landscaping, signage and high-access cleaning.'));
    $$('[data-zh][data-en]').forEach(el=>{el.textContent = el.getAttribute(`data-${language}`).replace(/\\n/g,'\n');});
    $$('[data-placeholder-zh]').forEach(el=>{el.placeholder = el.getAttribute(`data-placeholder-${language}`);});
    $('.lang-zh').classList.toggle('active',language==='zh');
    $('.lang-en').classList.toggle('active',language==='en');
    $('#language-switch').setAttribute('aria-label',tr('Switch to English','切换到中文'));
    $('#draft-result').hidden=true;
    $('#main-nav').setAttribute('aria-label',tr('主导航','Main navigation'));
    $('#menu-toggle').setAttribute('aria-label',$('#menu-toggle').getAttribute('aria-expanded')==='true'?tr('关闭菜单','Close menu'):tr('打开菜单','Open menu'));

    $('#sector-options').setAttribute('aria-label',tr('商业物业种类','Commercial property sectors'));
    $$('[data-close]').forEach(button=>button.setAttribute('aria-label',tr('关闭','Close')));
    $('#draft-text').setAttribute('aria-label',tr('咨询草稿','Enquiry draft'));
    const selectedService=$('#quote-service').value;
    renderServices(); renderRibbon(); $('#quote-service').value=selectedService; renderSectors(); renderNews(); renderFaq(); updateMotionControls();
    $$('.section-heading h2,.section-heading .heading-aside,.faq-intro,.about-copy,.contact-main h2,.footer-wordmark').forEach(el=>el.setAttribute('data-reveal',''));
    $$('.city-illustration').forEach(el=>el.setAttribute('data-parallax','25'));
    $$('.news-art svg').forEach(el=>el.setAttribute('data-parallax','16'));
    $('.about-e')?.setAttribute('data-parallax','24');
    $('.contact-star')?.setAttribute('data-parallax','-30');
    if(inStory){
      const behavior=document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior='auto';
      window.scrollTo(0,story.offsetTop-header+(story.offsetHeight-pin.offsetHeight)*progress);
      document.documentElement.style.scrollBehavior=behavior;
    }
    $$('a[href^="/"]').forEach(a=>{const u=new URL(a.href);u.searchParams.set('lang',language);a.href=u.pathname+u.search+u.hash;});
    document.dispatchEvent(new CustomEvent('ellislanguagechange'));
  }

  const dialogTriggers = new WeakMap();
  function openDialog(dialog) {
    if(dialog.open) return;
    dialogTriggers.set(dialog, document.activeElement);
    const heading=$('h2',dialog);
    if(heading){heading.id=dialog.id+'-title';dialog.setAttribute('aria-labelledby',heading.id);}
    dialog.showModal();
    document.body.classList.add('modal-open');
    dialog.scrollTop = 0;
  }
  function closeDialog(dialog) { dialog.close(); }
  $$('dialog').forEach(dialog => {
    $('[data-close]',dialog).addEventListener('click',()=>closeDialog(dialog));
    dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog(dialog);}});
    dialog.addEventListener('close',()=>{if(!$$('dialog[open]').length){document.body.classList.remove('modal-open');const trigger=dialogTriggers.get(dialog);if(trigger?.isConnected)trigger.focus({preventScroll:true});}});
  });
  function openService(index) {
    const service=services[index];
    $('#dialog-body').innerHTML=`<p class="dialog-index">${String(index+1).padStart(2,'0')} / 12 — ${tr('服务内容','OUR SERVICES')}</p><h2>${service[language]}</h2><p>${tr(service.introZh,service.introEn)}</p><h3>${tr('我们可以为你安排','How we can help')}</h3><ul>${tr(service.itemsZh,service.itemsEn).map(item=>`<li>${item}</li>`).join('')}</ul><button class="button button-blue" id="service-enquire"><span>${tr('咨询这项服务','ENQUIRE ABOUT THIS SERVICE')}</span><span>↗</span></button>`;
    $('#service-enquire').addEventListener('click',()=>{$('#content-dialog').close();openQuote({service:String(index)});});
    openDialog($('#content-dialog'));
  }
  function openArticle(index) {
    const article=articles[index];
    $('#dialog-body').innerHTML=`<p class="dialog-index">${tr(article.catZh,article.catEn)} / ELLIS FIELD NOTES</p><h2>${article[language]}</h2>${tr(article.bodyZh,article.bodyEn).map(([heading,body])=>`<h3>${heading}</h3><p>${body}</p>`).join('')}`;
    openDialog($('#content-dialog'));
  }
  function openQuote(options={}) {
    if(options.region || options.service!==undefined) $('#draft-result').hidden=true;
    if(options.region) $('#quote-form').elements.region.value=options.region;
    if(options.service!==undefined) $('#quote-service').value=options.service;
    openDialog($('#quote-dialog'));
  }
  $$('[data-quote]').forEach(button=>button.addEventListener('click',()=>openQuote()));
  $$('[data-region]').forEach(button=>button.addEventListener('click',()=>openQuote({region:button.dataset.region})));
  $('#quote-form').addEventListener('submit',event=>{
    event.preventDefault();
    const values=Object.fromEntries(new FormData(event.currentTarget));
    const chosenService=values.service==='multi'?tr('多项服务 / 综合维护','Multiple services / General maintenance'):services[Number(values.service)]?.[language];
    const text=[tr('Ellis Services Group — 项目咨询草稿','Ellis Services Group — Enquiry Draft'),' ',`${tr('姓名','Name')}: ${values.name}`,`${tr('邮箱','Email')}: ${values.email}`,`${tr('地区','Region')}: ${values.region}`,`${tr('服务','Service')}: ${chosenService}`,`${tr('物业地址','Property address')}: ${values.address||tr('待补充','To be confirmed')}`,'',`${tr('项目需求','Project details')}:`,values.details,'',tr('此为 UI 预览草稿，尚未发送。','UI preview draft. This enquiry has not been sent.')].join('\n');
    $('#draft-text').value=text; $('#draft-result').hidden=false; $('#copy-status').textContent='';
    $('#draft-result').scrollIntoView({behavior:reduceMotion.matches?'instant':'smooth',block:'nearest'});
  });
  $('#copy-draft').addEventListener('click',async()=>{
    try {await navigator.clipboard.writeText($('#draft-text').value);$('#copy-status').textContent=tr('已复制。草稿尚未发送。','Copied. The draft has not been sent.');}
    catch {$('#draft-text').focus();$('#draft-text').select();$('#copy-status').textContent=tr('草稿已选中，请使用系统复制功能。','The draft is selected. Use your device’s copy command.');}
  });
  $('#quote-form').addEventListener('input',()=>{if(!$('#draft-result').hidden)$('#draft-result').hidden=true;});

  function updateMotionControls() {}
  $('#language-switch').addEventListener('click',()=>{language=language==='zh'?'en':'zh';applyLanguage();});
  $('#menu-toggle').addEventListener('click',()=>{
    const open=$('#menu-toggle').getAttribute('aria-expanded')!=='true';
    $('#main-nav').classList.toggle('is-open',open);$('#menu-toggle').setAttribute('aria-expanded',String(open));
    $('#menu-toggle').setAttribute('aria-label',open?tr('关闭菜单','Close menu'):tr('打开菜单','Open menu'));
  });
  $$('#main-nav a').forEach(link=>link.addEventListener('click',()=>{$('#main-nav').classList.remove('is-open');$('#menu-toggle').setAttribute('aria-expanded','false');$('#menu-toggle').setAttribute('aria-label',tr('打开菜单','Open menu'));}));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&$('#main-nav').classList.contains('is-open')){$('#main-nav').classList.remove('is-open');$('#menu-toggle').setAttribute('aria-expanded','false');$('#menu-toggle').setAttribute('aria-label',tr('打开菜单','Open menu'));$('#menu-toggle').focus();}});
  let scrollQueued=false;
  function onScroll(){if(scrollQueued)return;scrollQueued=true;requestAnimationFrame(()=>{scrollQueued=false;const top=window.scrollY;scene?.setScroll(Math.min(1,top/Math.max(1,$('#home').offsetHeight)));const ids=['home','services','sectors','areas','news','faq','about','contact'];let active='home';for(const id of ids){if(document.getElementById(id).getBoundingClientRect().top<155)active=id;}$$('#main-nav a').forEach(link=>{const isActive=new URL(link.href).pathname==='/';link.classList.toggle('active',isActive);if(isActive)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});});}
  window.addEventListener('scroll',onScroll,{passive:true});
  $('#year').textContent=String(new Date().getFullYear());
  let ribbonResize=0;
  window.addEventListener('resize',()=>{clearTimeout(ribbonResize);ribbonResize=setTimeout(renderRibbon,120)});
  document.fonts?.ready.then(renderRibbon);
  applyLanguage();onScroll();
  const enquiry=new URLSearchParams(location.search);
  if(enquiry.has('service')||enquiry.get('region')==='Melbourne') openQuote({region:'Melbourne',service:enquiry.get('service')??undefined});
})();
