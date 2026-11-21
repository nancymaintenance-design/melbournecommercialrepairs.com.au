const cover = slug => '/assets/news-magazine/' + slug + '-v1.webp';
const scene = name => '/assets/service-reference-v1/' + name + '.webp';

module.exports = [
 {
  slug:'maintenance-plan',category:'building',colour:'lime',image:cover('maintenance-plan'),
  title:['我们怎样制定商业物业维护计划','How we plan commercial property maintenance'],
  summary:['我们按区域和设备梳理维修事项，再根据故障后果、运行状况和进场条件，区分即时维修、例行保养与计划更新。','We map maintenance work by area and asset, then use the consequences of failure, asset condition and site access to separate immediate repairs, routine servicing and planned renewal.'],
  keywords:[['设备台账','Asset register'],['故障影响','Impact of failure'],['计划维护','Planned maintenance']],
  mechanism:[
   ['同样是门关不严，一扇备用库房门和一处繁忙的公共出入口，影响可能完全不同。我们把物业分成屋面、楼宇设备、室内共用区域及室外场地，再把空调、水电、门禁、照明、园林和清洁等事项落实到位置或设备编号。这样可以看清哪些区域共用一套系统，哪一项故障会影响营业，以及是否有可用的替代设施。','A door that will not close has different consequences in a spare storeroom and at a busy public entrance. We map roofs, building systems, shared interiors and outdoor areas, then assign work on air conditioning, plumbing, electrical, access, lighting, grounds and cleaning to a location or asset ID. This shows which areas share a system, what a failure would interrupt and whether a backup is available.'],
   ['我们把故障后果与设备状况分开记录。使用年限有助于安排更新预算，报修频率、现场状态和维护记录则有助于判断眼下的风险。同一设备重复报修时，我们核对是否总发生在同一部位、负荷或时段，再安排检查。优先级还要结合能否继续使用、维修是否需要停运，以及哪些工种可以在同一进场窗口完成。','We record the consequences of failure separately from asset condition. Age helps with renewal budgeting, while fault frequency, observed condition and maintenance records help us assess what needs attention now. For repeat faults, we look for a common location, load or time of day before booking the investigation. Priorities also reflect whether the area can stay in use, what needs a shutdown and which trades can share the same access window.']
  ],
  evidence:[
   [['关键区域功能中断','Loss of function in a critical area'],['单点故障或共用系统失效','An isolated fault or a shared system failure'],['我们记录影响范围、替代设施和恢复所需工种，先安排必要的现场管控和维修。','We confirm the extent, available alternatives and trades needed, then arrange site controls and repairs where required.']],
   [['同一设备反复报修','Repeat call-outs for the same asset'],['同一故障反复出现，或多个部件有共同原因','A recurring local fault or a cause shared by several components'],['我们按设备编号核对旧工单、实际处理范围和复发条件，再安排有针对性的排查。','We match work orders, the repairs carried out and the conditions at recurrence to the asset ID before arranging a targeted investigation.']],
   [['多处部件逐步磨损','Gradual wear across several locations'],['长期使用、环境暴露或保养不足','Wear in service, exposure or insufficient servicing'],['我们按区域比较现场状态、运行要求和维护记录，划分例行保养与分批更新。','We compare condition, operating needs and servicing records by zone to separate routine servicing from phased renewal.']]
  ],
  judgement:{heading:['按故障影响安排先后','Set priorities by the impact of failure'],body:[
   ['我们先确定哪些事项会直接影响人员安全、物业通行或关键运营，再明确应急安排和后续修复。可以继续使用的项目，则结合劣化趋势和下一次进场机会排期。我们在工单上注明当时的判断依据，物业团队就能看懂为什么某项工作提前、某项安排到下一阶段。','We first identify issues that affect safety, access or critical operations and agree on the immediate response and follow-up repair. For assets that can stay in use, we consider how their condition is changing and when we can next access them. We record the reason for each decision so the property team can see why one job goes ahead while another is scheduled for later.']
  ]},
  methods:[
   [['按周期保养','Schedule routine servicing'],['我们依据设备资料、使用情况和适用要求制订保养计划。涉及既定检查或保养周期的项目按要求安排；现场状态和故障记录则用于补充巡查内容与频率。','We set the servicing programme using equipment information, usage and applicable requirements. We keep required inspection or service intervals and use condition and fault history to plan additional checks.']],
   [['按状态维修或更新','Plan repairs or renewal around condition'],['我们在受损位置和影响范围查清后安排维修。若多处部件劣化、配件难以取得或停运影响较大，就把分批更新与局部维修一起比较，并注明每阶段范围、负责人和进场时间。','Once we know the defect location and extent, we plan the repair. If components are deteriorating across several zones, parts are hard to obtain or downtime is significant, we compare local repairs with staged renewal and record the scope, contact and access window for each stage.']]
  ],
  verification:[
   ['我们把施工前后照片、设备型号、工单、实际处理范围和功能复查结果归到同一设备或区域。交付时列明已处理项目和仍需跟进的事项，为后者明确责任人及复查时间。下一轮保养就能对照同一位置的变化。','We file before-and-after photos, equipment details, work orders, actual scope and functional checks against the same asset or area. At handover we list completed work and outstanding items, with an owner and review date for each follow-up. The next service visit can then compare like-for-like conditions.']
  ],
  faq:[
   [['设备年限到了，就要更换吗？','Does an asset need replacing once it reaches its expected life?'],['我们把年限作为预算参考，再看实际状态、故障记录、配件供应和停机影响，确定继续保养、局部维修还是计划更换。','We use age for budget planning and consider actual condition, fault history, parts availability and downtime before deciding whether to service, repair or replace the asset.']],
   [['多个工种可以约在同一次进场吗？','Can several trades use the same access window?'],['可以统筹。我们先核对停运、进场和工序之间的依赖关系，再合并能并行的工作，把需要分步进行的工作按顺序安排。','Yes, where the work allows it. We confirm shutdown, access and sequencing requirements, then group tasks that can run in parallel and schedule the rest in the required order.']]
  ],
  primary:'building-maintenance',
  related:['recurring-faults-maintenance','uneven-hvac-zones'],
  visuals:{
   titleAccent:['商业物业维护计划','commercial property maintenance'],
   panel:['从现场状况排定维护顺序','Turn site condition into a maintenance plan'],
   guide:[[['物业区域','Property zones'],['楼宇 / 共用区域 / 室外','Building / common areas / grounds']],[['故障影响','Failure impact'],['通行 / 运营 / 替代设施','Access / operations / alternatives']],[['维护记录','Maintenance history'],['工单 / 进场 / 复查','Work orders / access / rechecks']]],
   aside:['优先级取决于故障会影响什么，以及现场状况如何变化。','Priority follows the impact of failure and how the condition is changing.'],
   scenes:[[ ['关键区域中断','Critical area out of service'],scene('hero-building-maintenance')],[['同一设备再报修','Repeat fault on the same asset'],scene('gallery-building-maintenance-before')],[['按区域比较磨损','Compare wear by area'],cover('maintenance-plan')]],
   methods:[scene('gallery-building-maintenance-after'),scene('hero-building-maintenance')],
   record:[[['资产与位置','Asset and location'],['设备编号、物业区域与影响范围','Asset ID, property zone and extent']],[['施工记录','Work record'],['实际范围、前后照片和功能检查','Actual scope, photos and functional checks']],[['后续安排','Follow-up'],['待处理事项、负责人及复查时间','Open items, owner and review date']]]
  }
 },
 {
  slug:'facade-cleaning',category:'signage',colour:'pink',image:cover('facade-cleaning'),
  title:['我们怎样安排外立面和高处清洁','How we plan façade and high-access cleaning'],
  summary:['我们按玻璃、金属、石材和涂饰面划分清洁区域，用小范围试清确定方法，并结合出入口、营业和天气安排高处作业。','We plan cleaning by surface, from glazing and metal to stone and coated panels. Trial patches inform the method, and we schedule high-access work around building entry, trading hours and weather.'],
  keywords:[['外立面分区','Façade zones'],['小范围试清','Trial cleaning patch'],['高处进场','High-access planning']],
  mechanism:[
   ['雨棚和深窗台下方较少受雨水冲刷，灰尘容易堆积。雨水流过压顶、窗框或接缝时，又可能把污物带到下方，形成一条条水痕。我们按朝向、高度、材料及上下游构造记录污痕分布，比较同一表面受雨部位和遮蔽部位的差异，再决定哪些区可以一起施工。','Sheltered areas beneath awnings and deep sills get less rinsing from rain and can collect dust. Run-off from caps, frames and joints can also carry dirt down the face and leave streaks. We map marks by exposure, height and material, compare sheltered and exposed sections of the same surface and then decide which zones can be cleaned together.'],
   ['玻璃、涂饰金属、天然石材和老化接缝对清洁剂、摩擦和用水方式的反应不同。划痕、腐蚀、涂层粉化及密封胶损坏也可能看起来像污迹。我们把疑似材料损伤单独记录，先做代表性试清，待表面干燥后再比较色差、光泽和残留。试清结果用来定施工方法，也用来确认应另行评估的修补范围。','Glass, coated metal, natural stone and weathered joints respond differently to cleaning products, abrasion and water. Scratches, corrosion, chalking coatings and damaged sealant can resemble dirt. We record suspected damage separately, trial the proposed clean on a representative patch and check colour, sheen and residue once it dries. The trial informs the cleaning method and flags any repairs that need separate assessment.']
  ],
  evidence:[
   [['雨棚下方大片积灰','Broad soiling under an awning'],['遮蔽区粉尘沉积','Dust build-up in sheltered areas'],['我们对照同材质的迎雨面与遮蔽面，在代表性位置试清并记录干燥后的效果。','We compare exposed and sheltered areas of the same material, trial a representative patch and record the result once dry.']],
   [['窗框或接缝下方形成条痕','Streaks below frames or joints'],['径流带污，或上方构造持续产生残留','Run-off carries dirt down or residue continues to form above'],['我们记录条痕起点及上方窗台、接缝的状况，再安排清洁与必要的进一步检查。','We mark where the streak starts and check the sill and joint above it before scheduling the clean and any further investigation.']],
   [['试清后仍有斑块或失光','Discolouration or dullness remains after the trial'],['可能涉及涂层、玻璃或石材表层损伤','Possible deterioration of the coating, glass or stone surface'],['我们记录试清边界和残留范围，确认是否需要材料评估再决定下一步。','We record the trial limits and the remaining marks, then decide whether the surface needs specialist assessment.']]
  ],
  judgement:{heading:['以表面干燥后的效果确认清洁范围','Agree on the finish once the trial is dry'],body:[
   ['刚清完时，湿面可能暂时掩盖擦痕或改变光泽。我们在可比光线和观察角度下核对试清区与相邻区域，把能去掉的污垢、清洁后仍可见的损伤，以及需要查明来源的重复污痕分开记录。这样各方在整面施工前就能明确可交付的效果。','A wet surface can temporarily hide scratches or change the sheen. We compare the dry trial and adjoining surface under similar lighting and viewing angles, recording removable dirt, damage that remains and recurring marks that need investigation. This gives everyone a clear finish to work to before cleaning the whole elevation.']
  ]},
  methods:[
   [['按材质试清，再分区施工','Trial the method and clean by material'],['我们根据材料与饰面状态选择相容的做法。玻璃、雨棚、标识及接缝附近分开确认试清条件。遇到旧涂层、老化接缝或敏感石材时，我们先确认表面能承受的处理方式，再确定整区范围。','We choose methods to suit the material and finish. We confirm trial conditions separately for glazing, awnings, signs and adjacent joints. For aged coatings, weathered joints or sensitive stone, we establish what the surface can tolerate before agreeing on the full scope.']],
   [['结合营业和通行分阶段安排','Stage access around trading and pedestrian routes'],['我们安排具备相应资质的人员评估作业高度和高处进场条件，并把行人和车辆动线、入口使用、营业时间、租户活动、天气与清洗废水去向纳入施工安排。每个区域开工前，我们都会确认隔离范围、现场联系人和交还检查项目。','We arrange for suitably qualified people to assess the height and access conditions. We plan for pedestrian and vehicle movements, building entry, trading hours, tenant activity, weather and wash-water management. Before starting each zone, we agree on the exclusion area, site contact and handover checks.']]
  ],
  verification:[
   ['交付记录包括作业立面及楼层、试清方法、同视角前后照片、完成范围和仍需处理的部位。我们在表面干燥后复查污痕、残留及外观，确认公共通道具备交还条件；疑似渗漏、涂饰损伤或构件松动另列待处理事项。','We record the elevation and levels, trial method, matching before-and-after photos, completed areas and any outstanding issues. Once dry, we check streaks, residue and finish and confirm public access can be handed back. Suspected leaks, coating damage or loose elements are recorded separately for follow-up.']
  ],
  faq:[
   [['窗框下面的水痕洗完还会回来吗？','Can streaks return beneath a frame after cleaning?'],['有可能。我们检查条痕起点、上方表面和排水情况，再区分定期清洁能处理的沉积，以及需另行修复的构造问题。','They can. We check where the mark begins and look at the surfaces and drainage above it to distinguish deposits that routine cleaning can manage from a detail that needs repair.']],
   [['同一栋楼能用同一种清洁方法吗？','Can we use one method across the whole building?'],['我们按材质和状态划分作业面。对试清表现一致的区域采用相同方法，接缝、老旧涂层及敏感石材由我们单独评估。','We group surfaces by material and condition. Areas that respond the same way in a trial can share a method. We assess joints, older coatings and sensitive stone separately.']]
  ],
  primary:'facade-high-access-cleaning',
  related:['facade-fixing-galvanic-corrosion','window-wall-water-ingress'],
  visuals:{
   titleAccent:['外立面和高处清洁','façade and high-access cleaning'],
   panel:['沿立面分区，查清污痕来源','Map the façade and trace the marks'],
   guide:[[['材料','Materials'],['玻璃 / 金属 / 石材与涂层','Glass / metal / stone and coatings']],[['暴露条件','Exposure'],['迎雨面 / 遮蔽面 / 径流','Rain-washed / sheltered / run-off']],[['进场条件','Access'],['入口 / 行人 / 营业','Entry / pedestrians / trading']]],
   aside:['我们等试清区干燥后再对照残留和饰面变化。','We check the dry trial patch for residue and changes to the finish.'],
   scenes:[[ ['雨棚下方积灰','Soiling under an awning'],scene('hero-facade-high-access-cleaning')],[['窗框下方条痕','Streaks below frames'],scene('gallery-facade-high-access-cleaning-before')],[['试清后复查','Review the dry trial'],scene('gallery-facade-high-access-cleaning-after')]],
   methods:[scene('gallery-facade-high-access-cleaning-after'),cover('facade-cleaning')],
   record:[[['作业位置','Work area'],['立面、楼层和公共通道','Elevation, levels and public access']],[['试清与照片','Trial and photos'],['试清方法、干燥效果和同视角照片','Trial method, dry finish and matched photos']],[['交还','Handover'],['完成范围和需跟进的位置','Completed areas and locations for follow-up']]]
  }
 },
 {
  slug:'signage-make-good',category:'interiors',colour:'orange',image:cover('signage-make-good'),
  title:['我们怎样统筹换租时的标识更新与退租恢复','How we coordinate signage and make good between tenancies'],
  summary:['我们按物业方确认的交还范围，梳理旧标识、基层和供电条件，把拆除、修补、新标识及最终交接排在同一份清单上。','We work from the agreed handover scope, checking existing signs, substrates and power so removal, repairs, new signage and final handover can be coordinated on one schedule.'],
  keywords:[['店面交还','Shopfront handover'],['标识固定与供电','Sign fixings and supply'],['保留与拆除','Retention and removal']],
  mechanism:[
   ['店面换租时，招牌、支架、饰面和照明往往共用同一段立面或供电线路。拆除旧标识可能露出孔洞、掉漆、色差和损伤的基层；配有照明的标识还涉及原有电源及控制。我们按入口、橱窗、招牌带和室内导视划区，把准备保留的部件、固定位置、饰面和供电一起查清。','At a change of tenancy, signs, brackets, finishes and lighting can share the same section of façade or electrical circuit. Removing a sign can reveal holes, paint damage, colour differences or deterioration behind it. An illuminated sign also has a supply and controls to account for. We divide the work into entrances, display windows, sign bands and internal wayfinding, then record retained parts, fixings, finishes and power together.'],
   ['能够重复使用的构件通常更容易从相邻饰面中独立拆装。粘结在饰面上的面板、穿过多层构造的固定件或找不到记录的旧配线，会增加拆除与修补之间的衔接工作。我们先查确认的交还要求，再复核新标识的位置、尺寸、重量和维护进场需求，判断哪些构件适合保留、哪些需要拆除或重新设计固定。','Components that can be separated from adjacent finishes are generally easier to reuse. Bonded panels, fixings through multiple layers and undocumented wiring can make removal and reinstatement harder to coordinate. We start with the agreed handover requirements, then confirm the new sign’s position, dimensions, weight and maintenance access before deciding what can stay and what needs removal or revised fixings.']
  ],
  evidence:[
   [['计划保留原有面板或支架','Existing panel or bracket proposed for retention'],['构件的承托和安装适配性','Support and compatibility of the existing component'],['我们核对构件状态、固定位置、基层和新标识要求，记录保留范围。','We check the component’s condition, fixing locations, substrate and sign requirements and record what will be retained.']],
   [['拆下旧招牌后露出孔洞、色差或破损','Holes, colour differences or damage exposed after removal'],['旧固定件、饰面老化或基层损伤','Previous fixings, weathered finishes or substrate damage'],['我们按立面位置标出需修补的部位，核对基层及饰面范围，必要时确认样板。','We mark defects by elevation, assess the substrate and extent of finish work, and agree on a sample where needed.']],
   [['旧发光标识与新点位不重合','Existing illuminated sign and new location differ'],['旧供电或控制位置与新布局不匹配','Existing power or control positions do not suit the new layout'],['我们协调电工核对原回路和新点位，和标识、修补及涂装工序一起排期。','We arrange for an electrician to confirm the existing circuit and new location, then coordinate the work with signage, patching and painting.']]
  ],
  judgement:{heading:['先确认交还范围，再定拆除深度','Confirm the handover scope before removal'],body:[
   ['我们将物业方确认的范围落实到图示和位置清单，明确每项是保留、拆除、恢复还是新增，并标记需要书面确认的工作。旧招牌拆下后若发现原先看不到的损伤，我们先记录现场状态、核对范围及后续工序，再确认如何处理。','We translate the agreed handover scope into a location plan and schedule, marking each item to retain, remove, reinstate or add, and identifying work requiring written approval. If removal exposes concealed damage, we record what we find, check its impact on scope and sequencing and agree on the next step.']
  ]},
  methods:[
   [['保留可用构件，局部更新','Retain suitable components and update locally'],['物业方同意保留且构件状态、固定和新标识相容时，我们安排局部更换、饰面修整与导视更新，并先确认店面效果和进出通道。','Where retention is agreed and the components, fixings and new sign are compatible, we arrange local replacement, finish repairs and wayfinding updates. We confirm the shopfront finish and access beforehand.']],
   [['分工序拆除、恢复并交接','Sequence removal, reinstatement and handover'],['我们先协调相关工种确认供电与拆除范围，再检查露出的基层，安排修补、涂装和后续安装。清运、清洁及功能检查列入同一计划，并为相邻租户及公共通道安排施工时段。','We coordinate the trades to confirm the supply and removal scope before checking the exposed substrate and scheduling patching, painting and installation. Waste removal, cleaning and functional checks go on the same programme, with work staged around adjoining tenants and public access.']]
  ],
  verification:[
   ['我们按店面及室内区域核对保留、拆除、修补和新增项目，记录旧孔位处理情况、饰面衔接、标识位置和需要验收的功能。交接清单附现场照片、相关工种检查记录及待跟进事项，说明由谁负责、何时复查。','We check retained, removed, repaired and new items by shopfront and interior zone. We record how old fixing holes were treated, how finishes join, sign positions and the functions checked. The handover list includes photos, relevant trade records and each remaining item with an owner and a review date.']
  ],
  faq:[
   [['新招牌能直接沿用旧孔位吗？','Can the new sign use the old fixing holes?'],['我们先核对新标识的重量和固定要求，再确认旧孔位的基层和固定状态。条件匹配且范围确认后，才安排沿用。','We check the new sign’s weight and fixing requirements against the substrate and the condition of the old fixing points. We reuse them once their suitability and the scope are confirmed.']],
   [['拆招牌和重新刷漆可以一起报价吗？','Can sign removal and repainting be quoted together?'],['可以。我们把拆除、基层修补、涂装和电气工作分别列明，说明可确认的范围，并把拆开后可能新增的修补内容单列确认。','Yes. We set out removal, patching, painting and electrical work as separate items within the same quote. If removal reveals extra repairs, we confirm them separately.']]
  ],
  primary:'fit-outs-make-good',secondary:'signage-wayfinding',
  related:['external-sign-fixings','facade-fixing-galvanic-corrosion'],
  visuals:{
   titleAccent:['标识更新与退租恢复','signage and make good between tenancies'],
   panel:['沿着店面确认保留、拆除和修补','Map what stays, comes out and needs repair'],
   guide:[[['交还范围','Handover scope'],['保留 / 拆除 / 恢复 / 新增','Retain / remove / reinstate / add']],[['基层与固定','Substrate and fixings'],['支架 / 孔位 / 饰面','Brackets / fixings / finishes']],[['配套工种','Trade coordination'],['电气 / 涂装 / 标识','Electrical / painting / signage']]],
   aside:['我们先记录要保留的构件和固定位置，再协调相关工种。','We record what will stay and how it is fixed before scheduling the related trades.'],
   scenes:[[ ['核对原有固定','Check existing fixings'],scene('problem-signage-fixing')],[['划定饰面修补范围','Map finish repairs'],scene('gallery-fit-outs-make-good-work')],[['协调新布局与供电','Coordinate layout and supply'],cover('signage-make-good')]],
   methods:[scene('gallery-fit-outs-make-good-existing'),scene('gallery-fit-outs-make-good-complete')],
   record:[[['范围清单','Scope schedule'],['保留、拆除、修补及新增项目','Retained, removed, repaired and new items']],[['饰面与功能','Finish and function'],['孔位、饰面衔接、标识位置与工种记录','Fixing points, finishes, sign locations and trade records']],[['最终交还','Final handover'],['现场照片、待跟进事项与责任人','Site photos, follow-up items and owners']]]
  }
 }
];
