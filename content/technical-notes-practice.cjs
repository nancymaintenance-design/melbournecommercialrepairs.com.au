const service = name => '/assets/service-reference-v1/' + name + '.webp';
const region = name => '/assets/region-reference-v3/detail-' + name + '.webp';

module.exports = [
 {
  slug:'recurring-faults-maintenance',category:'building',image:'/assets/news-magazine/maintenance-plan-v1.webp',colour:'blue',
  title:['反复故障与计划维护','Recurring faults and planned maintenance'],
  summary:['同一构件反复报修时，我们用工单和现场记录区分耗损、运行条件变化与未处理的上游问题。','When a component keeps turning up in call-outs, we use work orders and site records to separate wear, changed operating conditions and unresolved upstream defects.'],
  keywords:[['故障模式','Failure modes'],['资产记录','Asset history'],['计划维护','Planned maintenance']],
  mechanism:[
   ["一张工单通常只有一个故障描述。同一地点三次报修，既可能是同一缺陷没有解决，也可能是不同构件在相同条件下失效。我们按资产和位置归档，再区分看见的现象、构件失去的功能，以及能解释复发的物理原因。反复出现的潮斑和吊顶板松动，可以来自同一条水路，也可能来自独立问题。","A work order usually begins with one symptom. Three call-outs to the same spot can mean one unresolved fault or different components failing under the same conditions. We group records by asset and location, then separate the visible symptom, the function lost and the physical cause that could explain recurrence. Repeated staining and loose ceiling tiles could share a water path or be separate defects."],
   ["按可靠性安排维护，要先看失效的后果，再判断有没有可观察的先兆。若开门次数增加时五金间隙逐渐变大，定期查看就可能早于功能失效。若故障没有可识别先兆，增加同一种巡检任务的次数，未必能降低风险。","Reliability-based maintenance starts with the consequence of failure and asks whether there is an observable warning. If hardware play increases with use, periodic checks may catch it before the door stops working. If the fault has no identifiable warning, doing the same inspection more often may offer little benefit."]
  ],
  evidence:[
   [['同一部位反复报修','Repeated tickets at one location'],['原因持续或维修范围不完整','Persistent cause or incomplete scope'],['我们核对资产编号、历史照片及已做工作。','We check asset ID, dated photos and work already done.']],
   [['多处在同一时段出现','Several locations fail together'],['共同条件触发','Shared operating trigger'],['我们对照天气、清洁、营业或设备运行时间。','We compare weather, cleaning, trading or plant schedules.']],
   [['磨耗随使用次数增长','Wear tracks use'],['可列入计划检查','Candidate for planned checks'],['我们记录使用频度、间隙变化及更换史。','We log usage, changing tolerances and replacements.']]
  ],
  methods:[
   [['处理由证据定位的故障','Address the identified cause'],['关键部位失败或已出现连带损伤时，先控制影响，并按证据定义修复范围。','For a critical failure or secondary damage, contain the impact and define the scope from the evidence.']],
   [['建立有触发条件的维护计划','Create a condition-based schedule'],['用使用强度和故障后果确定巡检顺序，列明达到何种状态需重新报修。','We prioritise inspection by use and consequence, with clear triggers for reopening a work order.']]
  ],
  judgement:{
   heading:["把维修次数与故障后果分开","Separate call-out frequency from consequence"],
   body:[
    ["我们把复发间隔、故障后果和能观察到的先兆一起记录。低影响问题有明确磨损趋势时，可以制定有触发条件的检查。影响通行、安全或生产的故障需要优先厘清原因，即使是第一次发生。我们在巡检工单中写清检查和记录的项目，以及需要升级处理的条件。","We record recurrence intervals, consequences and any warning signs together. A low-impact fault with a clear wear trend may suit a scheduled check with a defined trigger. A fault that affects access, safety or operations deserves early investigation even on its first occurrence. We set out what to inspect and record, and when to escalate the issue."]
   ]
  },
  verification:[
   ["完成工单时注明恢复的功能、验证条件和仍待处理的上游问题，连到同一资产的历史记录。若原工况还没出现，我们记录下一次观察的时点与负责人。这样复发时可以判断究竟是修复失效，还是原先未覆盖的工况再次出现。","We close the work order with the function restored, the conditions checked and any unresolved upstream issue, linked to the asset history. If the original conditions have not returned, we record when to check next and who will do it. A recurrence can then be traced to either a failed repair or an operating condition the earlier scope did not cover."]
  ],
  faq:[
   [['维修次数多就该全部换新吗？','Do repeat repairs justify wholesale replacement?'],['我们先比较故障原因、部件状态、运行风险和更换条件，再建议继续维修还是更换。','We weigh up the cause, condition, operational risk and replacement options before recommending repair or replacement.']],
   [['何时缩短巡检间隔？','When should inspections be more frequent?'],['复发周期缩短或故障后果加重时，重新评估频率和任务内容。','Reassess frequency and scope when faults recur sooner or have greater consequences.']]
  ],
  related:['window-wall-water-ingress','doors-hardware-latching']
 },
 {
  slug:'fire-door-latching-and-access',category:'fire',image:service('hero-fire-security-access'),colour:'orange',
  title:['防火门关不严：锁闭、压差与门禁','Fire doors that fail to latch'],
  summary:['防火门偶尔无法锁闭也值得记录。我们将门扇运行、压差与门禁状态分开核对，保护原门组功能。','An intermittent failure to latch is worth recording. We look separately at door movement, pressure and access-control state to protect the doorset’s intended functions.'],
  keywords:[['自闭与锁闭','Self-closing and latching'],['门组记录','Doorset records'],['门禁状态','Access-control state']],
  mechanism:[
   ["防火门最后一段关闭行程需要克服密封、铰链、锁舌和空气压差共同形成的阻力。压差作用在门扇上，会改变开启和闭合所需的力，影响方向也随气流与门开启方向而变。若门只在排风、楼梯间加压或邻门状态变化时无法锁闭，我们将这些运行状态与机械阻力分开记录。","A fire door must overcome seal, hinge and latch resistance and the pressure difference across the leaf during its final swing. Air pressure can alter the force needed to open or close it, and the effect depends on airflow and the direction of swing. If latching fails only when exhaust runs, a stair is pressurised or a nearby door changes state, we log those conditions separately from mechanical resistance."],
   ["门禁显示释放、锁具实际动作，以及门扇完成自闭并锁闭是不同的事件。我们先核对既有门组和物业的安全措施记录，再由有相应资质的人员确认关联装置及运行状态。修好读卡响应，不能独立证明门组已经恢复。","A release shown in the access log, the actual lock response and the door self-closing and latching are separate events. We check the doorset and the building’s safety measure records first, then arrange for suitably qualified people to assess the associated devices and operating conditions. A responding card reader is only one part of the result."]
  ],
  evidence:[
   [['最后一段碰锁不上','Stops short of latching'],['阻力、偏位或压差','Resistance, alignment or pressure'],['我们记录闭门位置、天气和暖通运行状态。','We record the stopping position, weather and HVAC state.']],
   [['仅读卡后间歇异常','Intermittent fault after access is granted'],['门禁逻辑或锁具反馈','Access logic or lock feedback'],['我们安排合适人员核对门状态、事件日志和门组文件。','We arrange for a specialist to check door status, event logs and certification records.']],
   [['门扇下垂或有擦痕','Door drags or shows rub marks'],['门铰或门框几何改变','Hinge or frame geometry'],['我们对照受力位置、边缝与可见损伤。','We compare contact positions, gaps and visible damage.']]
  ],
  methods:[
   [['检修门组五金','Assess doorset hardware'],['我们安排适合的专业人员选用与门组相容的构件，保留原安全功能与认证条件。','We arrange for a competent specialist to select compatible components and preserve the existing safety function and certification conditions.']],
   [['联合检查门禁与设备状态','Coordinate access and plant checks'],['如果故障与门禁状态或压差相关，我们安排门禁、消防与楼宇设备人员联合核对。','Where the fault follows access states or pressure, coordinate checks across access control, fire safety and building services.']]
  ],
  judgement:{
   heading:["用出现故障的运行状态核对门组","Use the operating state that produced the fault"],
   body:[
    ["我们先保留门编号、停住的位置、门禁事件时间和有无压差变化的记录。出现擦痕或下垂，先复核接触和几何；症状只在楼宇设备特定状态出现时，再协调专业人员查该状态。单独加大闭门力可能影响开启并掩盖其他原因。","We record the door ID, where the leaf stops, the timing of access events and any change in pressure. Rub marks or sag point to contact and geometry checks. Symptoms tied to a specific plant state warrant a coordinated check of that state. Increasing the closer force alone may affect opening and disguise the underlying fault."]
   ]
  },
  verification:[
   ["我们安排相关专业人员根据该建筑的安全措施文件核验自闭、锁闭及适用的关联功能，保存门组标识、复核状态、已处理部件和检查人。只覆盖普通运行的测试，需要明确注明其他状态是否已由相应专业人员复核。","We arrange for the relevant specialists to verify self-closing, latching and applicable associated functions against the building’s safety measure documentation. We keep the doorset ID, the conditions checked, work performed and who checked it. If the check covered normal operation only, we identify which other states were verified separately."]
  ],
  faq:[
   [['可以暂时把防火门撑开吗？','Can a fire door be wedged open temporarily?'],['保留门组安全功能，尽快报物业管理方安排处理。','Preserve the safety function and report the problem promptly to building management.']],
   [['更换门禁读头能解决关门问题吗？','Will replacing the card reader fix closing?'],['我们分别检查读卡、锁具状态和门扇机械运行，再确定修复范围。','We check the reader, lock state and mechanical door movement separately before confirming the repair scope.']]
  ],
  related:['doors-hardware-latching','uneven-hvac-zones']
 },
 {
  slug:'irrigation-uneven-coverage',category:'landscape',image:service('problem-garden-sprinkler'),colour:'lime',
  title:['灌溉覆盖不均：压力、布点与径流','Uneven irrigation coverage and runoff'],
  summary:['相邻植床同时出现积水和干斑时，我们分别看喷洒分布、分区压力与土壤入渗。','Where adjoining beds are wet and dry at the same time, we look separately at spray distribution, zone pressure and how quickly water soaks in.'],
  keywords:[['喷洒均匀度','Distribution uniformity'],['动态压力','Running pressure'],['硬质路面径流','Hardstand runoff']],
  mechanism:[
   ["一块草地的平均洒水量可以合适，实际覆盖却不均。干区和湿区同时出现，常见原因是喷头间重叠不足、喷嘴不匹配、分区运行时压力不同，或水在坡面和密实基层上来不及下渗。我们分别观察落水分布与落地后的去向。","Average application can look adequate while parts of a landscape receive very different amounts. Dry and wet spots can occur together when throws do not overlap, nozzles are mismatched, pressure varies across a running zone or water cannot soak in quickly on a slope or compacted soil. We observe where water lands and where it goes after it lands."],
   ["集水分布能帮助区分平均给水量和均匀度。我们对照同一分区、同一次运行中集水量最低四分之一的平均值和整体平均值，判断平均水量是否掩盖了局部低水量。该比较反映采样时的覆盖情况，不能单独说明根区实际湿润程度。","Catch measurements help distinguish the quantity applied from how evenly it was spread. We compare the average of the lowest quarter of catch measurements with the overall average for the same zone and run. This shows whether the overall number is hiding a poorly watered area. It describes distribution during the check, with root-zone wetting still to be assessed separately."]
  ],
  evidence:[
   [['分区末端干斑','Dry spots at the end of a zone'],['末端流量或压力不足','Reduced delivery at the zone end'],['我们比较运行时各喷头状态和同条件量测。','We compare head behaviour and readings under the same operating conditions.']],
   [['边缘经常溢到步道','Water repeatedly reaches the path'],['喷角偏移或入渗受限','Overspray or limited infiltration'],['看水最先出现的位置及喷头朝向。','We observe where water first appears and where heads are aimed.']],
   [['地面湿而叶片萎蔫','Wet ground with wilting plants'],['根区排水或供水深度异常','Root-zone drainage or wetting depth'],['我们对照根区、坡度和阴阳面。','We compare root zones, grade and sun exposure.']]
  ],
  methods:[
   [['修复分布后重新量测','Correct distribution and measure again'],['这种做法适用于喷头受损、遮挡或喷嘴不匹配。用集水容器比较修前修后分布。','We use for damaged, obstructed or mismatched heads. We compare distribution before and after with catch containers.']],
   [['优化分区和运行时长','Adjust zones and run times'],['我们先校核覆盖，再比较分段灌溉、分区或土壤处理。避开高客流期及通行面。','Once coverage is understood, we compare split run cycles, rezoning and soil improvement. We keep watering off circulation routes and away from peak pedestrian use.']]
  ],
  judgement:{
   heading:["出现干斑时，先确定水有没有到达","Check whether water reaches the dry patch"],
   body:[
    ["如果集水偏少的位置和干斑重合，我们先查喷头遮挡、喷嘴及运行压力。若集水和邻区相近，地面却很快流向通道或植株仍不正常，就把检查转向坡向、土壤与根区。直接延长整个分区会给本来已过湿的位置再加水。","Where low catches line up with the dry patch, we check obstructions, nozzles and running pressure first. If catches match neighbouring areas but water reaches the path or plants still struggle, we look at falls, soil and root conditions. Lengthening the whole run adds more water to areas that may already be too wet."]
   ]
  },
  verification:[
   ["在可比的运行时长、分区和风况下复测，并保留集水布局、干区、积水与径流位置。通行区域另行观察，核对喷洒是否越过植床边界，以及停水后是否仍有水流到步道。","We retest with comparable run duration, zones and wind and keep the catch layout and the locations of dry spots, ponding and runoff. We observe circulation routes separately to see whether spray crosses the bed edge or runoff still reaches the path after the zone stops."]
  ],
  faq:[
   [['出现干斑就延长整个分区吗？','Should we simply run the zone for longer?'],['我们先对照干湿分布，再调整灌溉安排。延长运行可能让原有湿区积水更多。','We compare wet and dry areas before changing the watering schedule. A longer run can make existing wet spots worse.']],
   [['集水测试一次就够吗？','Is a single catch test sufficient?'],['我们记录测试工况，并在可比条件下复测，确认调整带来的变化。','We record the test conditions and repeat the test under comparable conditions to check the change.']]
  ],
  related:['recurring-drain-blockages','commercial-water-ingress'],secondary:'car-parks-external-works'
 },
 {
  slug:'external-sign-fixings',category:'signage',image:service('problem-signage-fixing'),colour:'pink',
  title:['外部标识松动：连接、基层与水路径','Loose external signs: Fixings and substrates'],
  summary:['我们把标识面板、支托、连接件及实际承力基层分别检查，同时留意进水路径与坠落风险。','We look separately at the sign face, bracket, fixing and loadbearing substrate, with particular attention to water paths and falling-object risk.'],
  keywords:[['连接构造','Fixing details'],['承力基层','Structural substrate'],['立面穿孔','Façade penetrations']],
  mechanism:[
   ["外部标识受力要从面板顺着支架、连接件追到承力基层。风向变化会改变受力，突出的边缘处也可能承受与面板中部不同的局部作用。面板一角开始抖动，既可能是面板与支架接头松动，也可能是支架或基层在移动。我们先确定动的是哪一层。","The load from an external sign travels through its face, brackets and fixings into the backing structure. Wind direction changes the action, and loads near exposed edges can differ from those on the centre of the face. Movement at one corner may come from a loose face connection or from the bracket or substrate itself. We establish which part of the assembly is moving first."],
   ["锈迹和湿痕还需要沿穿孔看水从哪边来。外部补胶可以属于防水处理，却不能补回因腐蚀而失效的连接。高位、屋顶或转角位置的受风条件各异，论文试件的压力或系数不直接用于既有标识选锚栓。","Trace staining at penetrations to see where water may be entering. A seal can be part of a weatherproofing repair, while a corroded connection needs its own structural assessment. Signs at height, on a roof or near a corner have different exposure. Values from a wind-tunnel model are not a fixing schedule for an existing sign."]
  ],
  evidence:[
   [['面板随风抖动','Face moves in wind'],['面板连接或支架松动','Loose face connection or bracket'],['我们记录移动位置和范围；我们限制下方通行。','We note where it moves and keep people clear below.']],
   [['孔位有锈迹或潮痕','Rust staining or moisture at fixing'],['受潮、腐蚀或穿孔密封失效','Moisture, corrosion or a failed penetration seal'],['我们核对材料、遮挡和泛水构造。','We check materials, shielding and flashing details.']],
   [['饰面开裂而标识偏转','Facing cracks as the sign rotates'],['基层或连接变形','Substrate or connection movement'],['我们查原安装记录，必要时由结构专业人员检查。','We check installation records and seek structural assessment where required.']]
  ],
  methods:[
   [['修复经核实的连接','Repair a verified connection'],['我们确认承力基层、既有荷载和连接适用性后，再选用相容修复方案。','We select a compatible repair once the loadbearing substrate, loads and fixing suitability are understood.']],
   [['重做承力与防水细节','Rework support and weatherproofing'],['基层受损、载荷变化或连接资料缺失时，安排设计核对，不依靠外部封胶来承担荷载。','If backing is damaged, loads have changed or the fixings are undocumented, we obtain design input. A weather seal does not carry the sign load.']]
  ],
  judgement:{
   heading:["什么时候要暂停通行并扩大检查","When to restrict access and widen the inspection"],
   body:[
    ["出现活动构件或疑似坠落风险时先限制下方通行。随后核对原构造、受力件、背板和可见腐蚀。如果基层不明，或标识面积和外挑尺寸已有变化，我们会安排专业评估，再确定维修方案。","Where a loose component could fall, we keep people clear below. We then check the original construction, loadbearing parts, backing and visible corrosion. If the backing is unclear or the size or projection has changed, we arrange a specialist assessment before specifying the repair."]
   ]
  },
  verification:[
   ["交接记录标识位置、受检连接和明确的基层类型，并拍下收口封闭前的可见细节。我们分别记录结构稳定性与防水处理的检查结果。若碰撞、风暴后需复核，标明复查部位和触发条件。","We record the location, fixings checked and confirmed backing at handover, with photos of visible details before they are covered. We keep structural and weatherproofing checks separate. We identify which areas should be reinspected after an impact or storm and what triggers that visit."]
  ],
  faq:[
   [['可以重新拧紧后继续营业吗？','Is tightening enough to keep the area open?'],['若有坠落风险，先隔离影响区域并让适合的人员核实连接与基层。','Where there is a falling-object risk, limit access and have the connection and substrate assessed.']],
   [['补密封能解决松动吗？','Will resealing cure the movement?'],['密封管水，固定件传力。我们按各自的失效机制处理。','Seals manage weather exposure and fixings transfer load. Each needs its own assessment.']]
  ],
  related:['window-wall-water-ingress','recurring-faults-maintenance'],secondary:'facade-high-access-cleaning'
 },
 {
  slug:'partition-head-movement',category:'interiors',image:service('specialist-building-partition'),colour:'orange',
  title:['隔断接缝反复开裂：位移与收口','Repeated partition cracks: Movement and joints'],
  summary:['我们对照裂纹位置、隔断端部和上方结构，判断重新嵌缝是否足够，还是需要恢复系统允许的位移。','We compare crack locations, wall ends and the structure above to decide whether a joint finish is sufficient or the assembly needs its movement allowance restored.'],
  keywords:[['挠度头节点','Deflection head'],['控制缝','Control joint'],['隔断性能','Partition performance']],
  mechanism:[
   ["隔断顶部出现横裂，可能是面层接缝缺陷，也可能是上方楼板的位移通过顶部节点传到石膏板。门洞角部斜裂则应同时核对门框变形、板缝位置和受力。我们先画出裂缝的位置和走向，比较是否集中在同类节点。","A horizontal crack at a partition head can be a joint finish defect or slab movement transferring through the head detail into the plasterboard. A diagonal opening crack also warrants a look at frame movement, board joints and load at the opening. We map the location and direction and check whether cracks cluster around the same detail."],
   ["允许竖向位移的顶部节点应在保持墙体需要的侧向约束时，给楼板相对位移留出空间。某些系统中，固定件或硬质收口若跨接了活动部位，会把允许的移动传给面层。实际做法取决于墙体系统、设计位移和防火、隔声性能。","A deflection head allows relative vertical movement while maintaining the partition’s required lateral support. In some systems a fixing or rigid finish that bridges the moving parts transfers that movement into the lining. The correct detail depends on the installed system, expected movement and fire or acoustic requirements."]
  ],
  evidence:[
   [['裂纹沿墙顶连续','Continuous crack at the wall head'],['顶部活动受限','Restrained head movement'],['我们查系统图纸与隐蔽层的可接近范围。','We review system drawings and accessible parts of the head detail.']],
   [['门洞角部斜裂','Diagonal crack at a door corner'],['开口应力或接板位置','Opening stress or joint location'],['我们记录裂纹走向并核对门框活动。','We map the crack and check movement at the frame.']],
   [['同一补缝随季节重新开裂','Repaired joint cracks seasonally'],['整体反复位移或湿度变化','Cyclical movement or moisture'],['我们对照维修照片和发生条件。','We compare prior repair photos and occurrence conditions.']]
  ],
  methods:[
   [['恢复局部板缝收口','Restore the local joint finish'],['缺陷仅在面层且基层稳定时，使用与原系统相容的材料和做法。','Where the defect is limited to the finish and the base is stable, we reinstate it with materials compatible with the system.']],
   [['修复系统位移节点','Reinstate a movement detail'],['若实际位移持续，我们先厘清控制缝或顶部做法，并保留对应的防火和隔声要求。','Where movement continues, we establish the required control joint or head detail while preserving any fire and acoustic requirements.']]
  ],
  judgement:{
   heading:["修饰面前先找出被限制的位移","Find any restraint before repairing the finish"],
   body:[
    ["若裂缝跨多个房间沿同一结构线反复出现，优先调取原节点图并评估上方结构与隔断连接。局部门角斜裂且门扇也擦碰时，先记录门框位置、碰擦点和裂缝变化。我们确认基层稳定后，局部嵌缝才有更明确的适用条件。","Where cracks return along one structural line across several rooms, we check the original detail and the connection between the structure and partition. For a local door-corner crack accompanied by rubbing, we record the frame position, contact point and how the crack changes. A local joint repair is better supported once the backing is confirmed stable."]
   ]
  },
  verification:[
   ["在封闭节点前记录可见构造、修复材料、连接部位及需要保留的性能要求。我们对照原来能触发裂缝的使用或环境条件复查。如果牵涉评级隔断，我们保留所用系统的文件和复核记录供物业交接。","Before closing up, we record the visible detail, materials, connections and performance requirements that must be retained. We recheck under the operating or environmental conditions that triggered the cracking. For a rated partition, we retain the system documentation and verification record for building management."]
  ],
  faq:[
   [['加厚腻子能解决反复开裂吗？','Will a thicker coat of compound stop the crack?'],['若位移持续，先处理构造原因。','Where movement continues, address the underlying detail first.']],
   [['所有顶部接缝做法都一样吗？','Are all wall head details the same?'],['节点取决于隔断系统、楼板位移和应达到的性能。','Head details depend on the wall system, slab movement and required performance.']]
  ],
  related:['doors-hardware-latching','uneven-hvac-zones']
 },
 {
  slug:'resilient-floor-moisture',category:'floors',image:'/assets/news-technical/resilient-floor.webp',colour:'pink',
  title:['地板起翘与基层状态','Lifted vinyl and the condition of the substrate'],
  summary:['起翘或气泡背后可能是基层湿度、污染、胶层失黏或尺寸变化。我们先判断失效发生在哪一层。','Bubbles or lifted edges may reflect moisture, contamination, loss of bond or movement. We first identify the layer where the installation has failed.'],
  keywords:[['弹性地材','Resilient flooring'],['基层湿度','Substrate moisture'],['胶层转移','Adhesive transfer']],
  mechanism:[
   ["鼓泡、开缝或边缘翘起，可能发生在地材与胶之间、胶层内部，或找平层与混凝土之间。我们看失效两面的胶层转移、松动边界与潮湿分布。残余水分或持续进水都要查，但日晒、基层粉尘、旧胶和不合适的铺装开放时间也能造成类似外观。","Bubbles, open joints and raised edges can come from failure at the covering–adhesive interface, within the adhesive or between the levelling layer and concrete. We look at adhesive transfer on both sides of the failure, how far the lifting extends and where moisture is present. Residual slab moisture and active leaks warrant checks, alongside sunlight, dust, old adhesive and installation timing."],
   ["实验研究表明，潮湿且呈碱性的混凝土环境可促成某些黏结地材系统的化学分解，材料组合影响结果。现场一个水分读数不能证明已经发生这类反应。我们把湿度、胶层状态与地材系统要求结合起来，才决定能否局部复铺。","Experimental work has found that damp, alkaline concrete can contribute to chemical breakdown in some bonded flooring systems. The combination of materials affects the result. A single moisture reading does not establish that reaction on site. We consider moisture, the failed bond and the flooring system requirements before deciding whether local replacement is suitable."]
  ],
  evidence:[
   [['从外墙边缘成片鼓起','Blisters extend from a perimeter'],['渗漏、湿度或局部暴露','Leak, moisture or local exposure'],['我们记录降雨、清洗及湿度分布。','We record rain, cleaning and moisture patterns.']],
   [['在日晒窗带起翘','Lifts along a sun-exposed strip'],['温度和尺寸变化','Temperature and dimensional movement'],['我们对照受热范围、接缝与地材约束。','We compare heating extent, seams and restrained edges.']],
   [['胶层与地板脱开','Adhesive separates from the covering'],['界面污染或粘接条件不符','Contamination or unsuitable bonding conditions'],['我们保留破坏两面的照片并核对安装记录。','We photograph both surfaces and check installation records.']]
  ],
  methods:[
   [['局部重铺前验证基层','Verify the substrate for local replacement'],['这种做法适用于原因范围明确且测试符合所用地材系统的情况。我们先处理障碍、验证基层再更换。','We use for an isolated cause where tests meet the selected floor system’s limits. We address the defect and verify the substrate before replacement.']],
   [['恢复整个受影响系统','Restore the affected floor system'],['发现持续进水、广泛粘接失效或基层损伤时，先处理来源并决定干燥或重做范围。','Where water is active or bond or slab condition is affected more widely, we address the source before deciding the drying or replacement area.']]
  ],
  judgement:{
   heading:["局部补贴前查两面胶层和水分来源","Check both sides of the bond and the moisture source"],
   body:[
    ["外墙边的湿区与进水时间吻合时，我们先检查建筑围护和用水来源。损坏只出现在强日晒区时，我们也检查温度、接缝及安装条件。我们按选用地面系统的要求检测基层，并与使用同种材料的相邻区域对照。手持仪表的筛查用于定位疑点，基层能否铺设由规定的检测结果确认。","Where moisture along an outside wall follows an ingress event, we check the envelope or water source first. If damage follows a sun-exposed strip, we check temperature, joints and installation conditions as well. We test the substrate by the method specified for the selected system and compare like areas. A handheld screening reading alone does not clear a slab for installation."]
   ]
  },
  verification:[
   ["我们归档测点图、适用测试方法、现场条件、结果及所用系统的接受标准。交接写明已解决的水分来源、换铺边界、养护条件，以及哪些部位需要复检。","We file the test locations, applicable method, site conditions, results and the acceptance criteria for the selected system. We record the moisture source addressed, replacement limits, curing conditions and any areas to recheck."]
  ],
  faq:[
   [['表面干燥代表基层合格吗？','Does a dry surface show that the substrate is ready?'],['我们按地面系统要求选择检测方法并比对读数，重点核查新基层和曾经进水的位置。','We use the method required by the floor system and compare readings, paying particular attention to new slabs and areas with a history of water ingress.']],
   [['同样的胶能直接补贴吗？','Can we simply reuse the same adhesive?'],['我们先找出脱粘发生在哪一层，再核查胶黏剂与地材及基层是否相容。','We identify where the bond failed, then check whether the adhesive is compatible with the flooring and substrate.']]
  ],
  related:['window-wall-water-ingress','commercial-water-ingress']
 },
 {
  slug:'doors-hardware-latching',category:'doors',image:region('door'),colour:'lime',
  title:['门扇擦碰与锁舌偏位：先查几何关系','Doors that rub or miss the strike'],
  summary:['门关不上时，我们先看门扇、五金、门框和门槛的接触顺序，再选择调整、修复或更换。','When a door fails to shut, we observe contact through the leaf, hardware, frame and threshold before choosing adjustment, repair or replacement.'],
  keywords:[['门扇下垂','Leaf sag'],['锁舌与扣板','Latch and strike'],['间隙测量','Gap measurement']],
  mechanism:[
   ["开门费力和关不上是两种不同的表现，原因又可能重叠。一块垫子、压得太紧的密封条、门铰松动或门框变化，都可能在行程不同位置造成阻力。我们先观察什么时候第一次接触，再查锁舌是否居中进入扣板。","A door that is hard to open and one that will not latch present different symptoms, though the causes can overlap. A mat, tight seal, loose hinge or a moving frame can add resistance at different points in the swing. We observe where it first makes contact, then check whether the latch enters the strike centrally."],
   ["闭门器能提供动作，但不能纠正门扇下垂或门框失方。门关闭后再打开所需的力也受压差、密封与配件影响。公共通行门还要兼顾使用者能否操作。对防火、疏散、门禁或无障碍门组，调整前应核对适用要求和原配置。","A closer drives the swing but cannot correct leaf sag or a frame that has gone out of square. Pressure, seals and hardware can affect the effort needed to open it again. A public access door also has to remain usable. For fire, egress, controlled-access or accessible doorsets, establish the applicable requirements and existing configuration before making changes."]
  ],
  evidence:[
   [['门扇上边与框擦碰','Leaf rubs at the top of the frame'],['框或铰链偏移','Frame or hinge movement'],['我们核对擦痕、边缝和连接状态。','We compare rub marks, gaps and the condition of fixings.']],
   [['推到位仍不能锁闭','Leaf reaches the frame without latching'],['扣板偏位、阻力或闭门器行程异常','Strike alignment, resistance or closer travel'],['我们检查锁舌轨迹与可见接触。','We check the latch path and visible contact points.']],
   [['雨天才出现擦碰','Binds only after rain'],['受潮、温度或门槛变化','Moisture, temperature or threshold movement'],['我们对照天气、湿区与门槛净空。','We compare weather, wet areas and threshold clearance.']]
  ],
  methods:[
   [['校正有证据支持的部位','Correct the misaligned component'],['连接完好且偏位可定位时，按门组配置调整；避免扩大锁孔来掩盖门扇下垂。','With sound fixings and a clear point of misalignment, adjust within the doorset configuration. Enlarging the strike opening can hide rather than resolve leaf sag.']],
   [['处理基层与专用门组','Address damage and specialist doorsets'],['遇基层松动、反复受潮或专用安全门组，先核对原构造及性能要求，再确定更换或修复范围。','For damaged backing, repeated moisture or a specialist safety doorset, we check its construction and performance requirements before setting the repair scope.']]
  ],
  judgement:{
   heading:["先定位第一个接触点，再决定调哪一个部件","Find the first point of contact before adjusting hardware"],
   body:[
    ["我们比较门扇顶部、侧边和门槛间隙，并记录故障当时的开角。擦痕和锁舌轨迹都偏离时，先查门铰与门框。回到门框但最后没有锁闭时，再区分密封阻力、扣板位置和闭门器状态。单纯扩大扣板开口会掩盖仍在发展的位移。","We compare the top, side and threshold gaps and note the angle where the fault appears. If both rub marks and the latch path have shifted, we check the hinges and frame first. If the leaf reaches the frame but fails to latch, we separate seal resistance, strike position and closer behaviour. Enlarging the strike opening can disguise movement that is still developing."]
   ]
  },
  verification:[
   ["我们复核几个代表性开角下的闭合和锁闭，记录操作、通行和门扇间隙。若故障随天气、通风或相邻门状态变化，交接说明已复核的状态。专用门组由适合的人员按其功能与适用要求另行检查。","We recheck closing and latching from several representative angles and record operation, passage and gaps. If the fault changes with weather, ventilation or nearby doors, we document the states actually checked. We arrange specialist checks for dedicated doorsets against the applicable requirements."]
  ],
  faq:[
   [['调大闭门器力度是否更好？','Is more closer force better?'],['阻力来源未明确时可能遮住故障，还可能影响通行和开启。','Extra force can conceal the source of resistance and affect opening effort and access.']],
   [['能同时移动扣板和调铰链吗？','Can we adjust the strike and hinges together?'],['我们先记录初始状态和接触点，每调整一项就复查一次，确认哪项调整恢复了功能。','We record the starting condition and contact point, then check the door after each adjustment to identify which change restored operation.']]
  ],
  related:['fire-door-latching-and-access','partition-head-movement']
 }
];
