const {serviceSlugs} = require('./site-data.cjs');
const serviceArt = name => '/assets/service-reference-v1/' + name + '.webp';
const noteArt = name => '/assets/news-technical/' + name + '.webp';

const categories = {
 building: ['建筑主体与日常维修','Building repairs','building-maintenance'],
 envelope: ['屋顶、防水与建筑修复','Roofing & waterproofing','roofing-waterproofing'],
 electrical: ['商业电气与照明','Electrical & lighting','electrical-lighting'],
 plumbing: ['水管、排水与燃气','Plumbing & drainage','plumbing-drainage-gas'],
 hvac: ['空调与楼宇设备系统','HVAC & building systems','hvac-building-systems'],
 fire: ['消防、安防与门禁','Fire & access','fire-security-access'],
 landscape: ['商业园林绿化与灌溉','Landscaping & irrigation','landscaping-irrigation'],
 signage: ['广告标识与外立面','Signs & façades','signage-wayfinding'],
 interiors: ['室内装饰与隔断','Interiors & partitions','fit-outs-make-good'],
 floors: ['地面与墙面系统','Floor & wall systems','fit-outs-make-good'],
 doors: ['门窗与五金','Doors, windows & hardware','building-maintenance'],
 urgent: ['紧急抢修','Urgent repairs','plumbing-drainage-gas']
};

const articles = [
 {
  slug:'window-wall-water-ingress', category:'envelope', image:noteArt('window-sill'), colour:'orange',
  heroAlt:['窗墙接缝剖面示意，积水沿窗台排水槽排向室外。','Illustrative window–wall section with water draining outwards through the sill channel.'],
  title:['窗墙接缝渗漏：\n水路径与排水构造','Window–wall leaks:\nTracing the drainage path'],
  summary:['窗边水痕只能说明水从哪里显现。我们把降雨条件、窗墙接口与内部排水连起来，找出值得验证的入水路径。','A stain by a window shows where water surfaced. We match rain exposure, the window–wall junction and internal drainage to identify a path worth testing.'],
  keywords:[['表面密封','Face seal'],['窗墙接口','Window–wall junction'],['内部排水','Internal drainage']],
  mechanism:[
   ["窗边积水先要区分三个位置：雨水进入外层的位置、它在构造中移动的路线，以及最后出现水痕的位置。风压能把水推入很窄的缝隙。水随后可以沿窗框槽、窗台泛水或立面空腔移动，最后从低处接缝或内衬板渗出。我们沿这三个位置查找证据，避免把水痕直接当作补胶位置。","A window leak has three locations to account for: where water crosses the outside layer, how it travels through the assembly and where it finally appears. Wind pressure can drive rain into a narrow joint. The water can then follow a frame channel, sill flashing or façade cavity before surfacing at a lower joint or lining. We look for evidence at each point before choosing where to repair."],
   ["在有组织排水的接口中，外层挡掉大部分雨水，进入的少量水经窗台排出，内侧气密层则影响接缝两边的气流和压差。核对窗系统图纸后，我们会看排水口能否通向室外、泛水端部能否挡住横向水流，以及窗框与内侧空气层是否连续。只在表面补胶，可能同时封住本来有效的出水路径。","In a drained junction, the outer layer sheds most rain, the sill drains water that gets past it and the inner air seal influences airflow and pressure across the joint. Once we know how the window was detailed, we check that outlets actually reach the exterior, flashing ends stop sideways flow and the frame connects to the inner air barrier. Resealing the face can inadvertently block a working outlet."]
  ],
  evidence:[
   [['补胶后同处复发','Stain recurs after resealing'],['相邻接口进水或排水受阻','Adjacent entry or restricted drainage'],['对照旧维修边界、泄水口及水痕先后。','Compare the old repair boundary, outlets and order in which stains appear.']],
   [['仅迎风雨时出现','Appears in wind-driven rain'],['压差与暴露方向影响','Pressure and exposure direction'],['记录风向、降雨与出现时间；区分凝结水。','Log wind direction, rain and onset, and check for condensation.']],
   [['喷水后室内没有水痕','No interior stain on wetting'],['范围、压力或持续时间不同','Different area, pressure or duration'],['记录测试边界；单次未复现不能证明整面立面通过。','Record the test boundary. One non-reproduction does not establish façade-wide performance.']]
  ],
  methods:[
   [['局部修复密封','Repair an isolated seal'],['适用于局部失效已经定位且排水路径完整的接缝。先核对兼容性和接缝变形，保留泄水口。','Use where evidence isolates a failed seal and confirms a working drain path. Check compatibility and joint movement and keep weeps open.']],
   [['恢复泛水及排水','Restore flashing and drainage'],['若水滞留在框槽或进入后方空腔，分区检查泛水搭接、端部及排水出路。隐蔽节点由合适的专业人员检查。','Where water sits in a channel or reaches the cavity, investigate flashing laps, ends and outlets by zone. Have concealed details assessed by an appropriate specialist.']]
  ],
  judgement:{
   heading:["什么时候需要检查相邻立面","When to investigate the adjoining façade"],
   body:[
    ["我们把现场照片按标高、朝向和降雨时间对齐，先辨别水痕是否总在同一条路径上。若低处窗台先湿，可优先查框槽、泛水端部和排水口。若水迹从窗头或高处板缝开始，或只在特定风向复发，诊断范围应包含上方立面。","We line up photos by level, exposure and rainfall timing to see whether the stain follows the same path. Where the sill wets first, start with the frame channel, flashing ends and outlets. If the stain starts at the head or a higher panel joint, or only returns in rain from one direction, include the façade above in the investigation."],
    ["单独淋湿一个节点，只能说明该节点在当次条件下的表现。在能够安全进行时，由适当人员分区复查并记录湿润顺序、持续时间及是否施加压差。否则某次喷水未复发，不能排除原风雨条件才会启动的路径。","Wetting one detail tells us how that detail behaved under those test conditions. Where a suitably qualified person can test safely, record which zones were wetted, the sequence and duration, and whether a pressure difference was applied. A negative result under spray alone can leave a wind-driven pathway unresolved."]
   ]
  },
  verification:[
   ["交接时记录修复部位、未打开的节点、排水口状态与复测条件。完工照片应能看见水的出口，而不仅是一道新胶缝。对照修前条件，分别记录已复现并处理的路径，以及仍需在相似风雨中复核的位置。","At handover we record the repaired detail, unopened junctions, condition of drains and retest conditions. A completion photo should show where water can leave as well as the new seal. We compare the result with the original conditions and identify paths that were reproduced and resolved, and any locations still to be checked in similar weather."]
  ],
  faq:[
   [['水痕位置就是入水点吗？','Is the stain the entry point?'],['水可以沿接口或空腔迁移。先对照水出现的时序和可能的上游节点。','Water can travel along a junction or cavity. Compare the timing with plausible upstream details.']],
   [['补胶后没再漏就能验收吗？','Is the absence of a leak after resealing enough?'],['应记录实际经历的暴露条件与验证边界，尤其是原来只有迎风雨才出现的渗漏。','Record the exposure actually experienced and the limits of the check, particularly where the original leak needed wind-driven rain.']]
  ],
  related:['recurring-faults-maintenance','resilient-floor-moisture'], secondary:'building-maintenance'
 },
 {
  slug:'uneven-hvac-zones',category:'hvac',image:noteArt('hvac-rooftop'),colour:'blue',
  title:['空调冷热不均：\n供风与控制诊断','Uneven HVAC temperatures:\nAirflow and controls'],
  summary:['同一时段有房间太热、也有房间太冷时，我们先核对分区需求和末端响应，再判断是否需要调风量。','When some rooms run hot while others run cold, we check zone demand and terminal response before deciding whether to rebalance airflow.'],
  keywords:[['分区负荷','Zone load'],['可变风量','Variable air volume'],['趋势记录','Trend logs']],
  mechanism:[
   ["我们先把投诉对应到实际末端箱，核查当前分隔、使用人数和传感器位置，再看同一时段的送风温度与控制请求。冷热不均可能来自区域负荷变化，也可能是风阀实际开度、风量传感器读数或再热状态与指令不符。只看墙上的设定值，会漏掉这些差异。","We map the complaint to the actual terminal unit and check the current layout, occupancy and sensor position before looking at supply temperature and the call for cooling or heat at the same time. Uneven conditions may reflect changed loads, or a mismatch between damper movement, indicated airflow, reheat state and their commands. The wall setpoint alone misses those differences."],
   ["在可变风量系统里，控制器根据温度需求调节风阀。传感器偏差可能使显示风量很稳定，实际风量却不正确。再热阀关不严时，末端也可能在请求冷量的同时把送风加暖。我们把温度、设置、风量、风阀指令及末端出风温度放在同一时间轴上，先查异常从哪一步开始。","A VAV controller moves the damper in response to zone demand. A biased airflow sensor can show a steady reading while the actual flow is wrong. A leaking reheat valve can warm the discharge air even while the zone calls for cooling. Lining up the temperature, setpoint, airflow, damper command and discharge temperature helps us see where the response went off track."]
  ],
  evidence:[
   [['单区午后过热','One zone overheats in the afternoon'],['太阳得热或分区负荷改变','Solar gain or a changed zone load'],['对照朝向、遮阳、使用率和送风趋势。','Compare aspect, shading, occupancy and supply trends.']],
   [['指令升高、风量无变化','Airflow does not follow the command'],['末端风阀、压力或量测问题','Damper, pressure or measurement fault'],['对照指令与反馈；由暖通人员复核末端实测。','Compare command and feedback and have the terminal reading checked.']],
   [['相邻分区同时制冷和再热','Adjacent zones cool and reheat together'],['设定、逻辑或传感器偏差','Setpoints, logic or sensor bias'],['核对控制序列和再热阀状态。','Look at the control sequence and reheat valve status.']]
  ],
  methods:[
   [['校核控制再观察','Correct controls and observe'],['若趋势显示传感器异常或指令没有正确响应，先复核校准和运行序列。','Where trends point to a bad reading or response, check sensor accuracy and the sequence first.']],
   [['调平衡或评估分区','Rebalance or assess zoning'],['控制和机械部件正常而末端风量偏离设计时，再调平衡。用途或隔断改变时，先复核设计负荷与新风要求。','Once controls and components work, rebalance against design flows. Changed use or partitions may require a review of loads and outdoor-air requirements.']]
  ],
  judgement:{
   heading:["怎样区分末端故障与公共静压问题","Distinguishing a terminal fault from shared pressure"],
   body:[
    ["一处偏离时，我们优先看该末端的风量测点、风阀与出风温度。多个末端在同一时段偏离时，要同时核对公共送风静压、机组状态及时间计划。选择同一系统里一个运行正常的邻区作对照，有助于避免把个别局部问题误判成整套系统风量不足。","If one zone deviates, we start with that terminal’s airflow point, damper and discharge temperature. If several deviate together, check shared duct static pressure, plant state and scheduling as well. A neighbouring zone served by the same system and working correctly makes a useful comparison before calling the whole system undersized."],
    ["先复核测量，再决定调风量。控制界面显示风阀已开，只代表控制系统看到了一个状态或发出了指令。末端流量与反馈不一致时，应由暖通人员在代表性负荷下核实，避免用永久提高风压掩盖传感器或执行器问题。","Check the measurement before rebalancing. A damper shown as open on screen may reflect a control point rather than confirmed airflow. Where feedback and flow disagree, have an HVAC specialist check the terminal under a representative load before raising system pressure to compensate for a bad sensor or actuator."]
   ]
  },
  verification:[
   ["验收记录应保留受影响区及对照区的占用状态、设置、室温、风量和出风温度，并标明末端与楼宇控制点编号。尽量复查原投诉时段。若只完成一个季节或负荷范围内的复核，就在交接中圈出剩余工况。","Record occupancy, setting, room temperature, airflow and discharge temperature for the affected and comparison zones, with the terminal and building controls point IDs. Recheck during the original complaint period where possible. If the check covered only one season or load range, record the conditions still to be checked."]
  ],
  faq:[
   [['调低公共设定值能解决吗？','Will lowering the common setpoint fix it?'],['会影响其他区域，且可能增加同时制冷和再热。先分清是单区问题还是系统问题。','It affects other zones and can increase simultaneous cooling and reheat. Establish whether the issue is local or system-wide first.']],
   [['有趋势记录还需要现场读数吗？','Do trend logs replace site readings?'],['趋势揭示时序。末端读数可帮助发现传感器漂移或风阀反馈异常。','Trends show timing. Terminal measurements help identify sensor drift or misleading damper feedback.']]
  ],
  related:['partition-head-movement','recurring-faults-maintenance']
 },
 {
  slug:'led-flicker-drivers-controls',category:'electrical',image:noteArt('led-suspended'),colour:'orange',
  title:['LED 闪烁：\n驱动与控制因素','LED flicker:\nDrivers and controls'],
  summary:['从灯具分布、调光状态和发生时刻入手，区分单灯驱动问题、控制兼容性和共同供电异常。','Use fixture patterns, dimming levels and timing to separate a local driver problem, a control mismatch and a shared supply issue.'],
  keywords:[['时间光调制','Temporal light modulation'],['驱动器','LED driver'],['调光负载','Dimming load']],
  mechanism:[
   ["LED 光输出会随驱动电流变化。电流纹波、调光波形，以及驱动与控制器相互作用，可能造成不同形式的时间光调制。肉眼在静止时察觉的闪烁、移动物体出现的断续影像和手机摄像条纹，观察条件不一样。我们先问清是人眼不适、转动部件看起来断续，还是只有录像异常。","LED output responds to changes in drive current. Driver ripple, the dimming waveform and interactions between controls and drivers can all modulate the light over time. Flicker seen while stationary, a broken-up image of a moving object and banding on video show up under different conditions. We first establish whether the problem is visual discomfort, an effect on moving objects or something only the camera records."],
   ["灯具范围也很关键。单一灯具在预热后异常，可以查局部驱动、接触与散热。共用调光命令的一组灯同时变化，则要核对控制状态和供电。只从一段自动曝光视频判断波动程度，无法排除相机逐行读取产生的条纹。","The number and location of affected fittings matters. One fitting that misbehaves after warming up points towards a local driver, connection or heat issue. A group that changes together on the same dimming command warrants a check of the control state and supply. A single auto-exposure clip cannot separate the light behaviour from banding introduced by the camera’s rolling shutter."]
  ],
  evidence:[
   [['仅最低亮度闪烁','Only flickers at low dim levels'],['配对兼容或低端运行不稳','Compatibility or low-end instability'],['列出灯具、驱动和控制器型号，记录出现档位。','Record fitting, driver and controller models and the level where it starts.']],
   [['一个灯具预热后闪烁','One fitting flickers after warm-up'],['局部驱动、连接或温升','Local driver, connection or heat'],['由电工对照同型号邻灯及现场温度。','Have an electrician compare nearby like fittings and operating temperature.']],
   [['整组同时闪烁','A group changes together'],['公共控制或供电异常','Shared control or supply problem'],['时间对照控制日志与相邻回路。','Correlate timing with control logs and nearby circuits.']]
  ],
  methods:[
   [['匹配控制组合','Match the control pair'],['由持证电工核对驱动、调光方式与负载要求，再验证选定组合覆盖实际运行范围。','Have a licensed electrician check drivers, dimming method and load requirements, then verify the intended combination across the operating range.']],
   [['分区定位再更换','Isolate the fault before replacement'],['单灯有明确证据时针对灯具处理；多组同步异常时先定位公共环节，避免批量换灯掩盖原因。','Target the individual fitting where evidence supports it. For synchronised symptoms, locate the shared cause before a bulk replacement.']]
  ],
  judgement:{
   heading:["低亮度才闪时，先验证配对","If flicker starts at low dim levels, check the pairing"],
   body:[
    ["记录触发闪烁的亮度区间、灯具和驱动型号、控制协议，以及同组其他灯具是否同步。由持证电工确认相容性和现场条件。稳定区间与测试结果应针对这个组合记录。同样的驱动器更换到另一组负载，不代表会获得相同表现。","Record the dimmer range that triggers the fault, the fitting and driver models, the control type and whether neighbouring fittings change at the same time. Have a licensed electrician verify compatibility and site conditions. Record the stable range for that combination. The same driver can behave differently on another load."],
    ["若用途涉及拍摄，约定现场摄像设备与设置，在该用途下单独检查。若关注视觉影响，则让专业人员用适当的光测量方式评价。一次手机消除条纹的设置变化，只回答那台设备在当次设置下的问题。","If the space is used for filming, agree on the camera and settings and check that use separately. If visual effects on occupants are the concern, arrange an appropriate light measurement. A camera setting that removes banding answers only how that camera behaved with those settings."]
   ]
  },
  verification:[
   ["复核从启动到稳定运行的表现、使用中的调光区间，以及开关或传感器触发后是否复发。归档实际安装的灯具、驱动和控制配置，标注测试时段和应用条件。重复发生时，后续人员可以对照这一组记录。","Recheck start-up, steady operation and the dimming range actually used, including what happens after switching or a sensor trigger. File the installed fitting, driver and control combination with the test period and application conditions so a future call-out can use the same baseline."]
  ],
  faq:[
   [['视频出现条纹代表灯具一定坏了吗？','Do video bands prove a fitting is faulty?'],['条纹也受拍摄设置影响。作为线索留下，还需对照现场观察和测量。','Camera settings affect banding. Keep it as a clue and compare it with site observations and measurement.']],
   [['同瓦数的驱动器可以互换吗？','Are drivers of the same wattage interchangeable?'],['还要核对输出特性、调光方式、温度范围和灯具适配。','Output characteristics, dimming method, temperature rating and fitting compatibility also matter.']]
  ],
  related:['uneven-hvac-zones','commercial-water-ingress']
 },
 {
  slug:'recurring-drain-blockages',category:'plumbing',image:noteArt('drain-run'),colour:'pink',
  title:['排水堵塞复发：\n沉积与管线条件','Recurring drain blockages:\nDeposits and pipe condition'],
  summary:['通水恢复只是第一个结果。我们追踪复发点位、用水负荷和管内状况，决定清理、防再积或管线修复的范围。','Restored flow is the first result. We trace where blockages recur, what the line carries and what the pipe looks like before choosing cleaning, source control or repair.'],
  keywords:[['管内影像','Drain CCTV'],['沉积位置','Deposit location'],['商业预处理','Trade waste pretreatment']],
  mechanism:[
   ["餐饮排水的管壁沉积不一定像一层冷却后凝固的油。对污水管的研究发现，某些硬质沉积物的形成涉及油脂中的脂肪酸和钙，也可能夹杂固体。现场看见硬结只能提供线索。我们结合上游来料、预处理维护状况和回堵历史，区分反复沉积与管段损坏。","Build-up in a food premises drain is not always just a layer of cooled cooking oil. Sewer research has found that some hardened deposits involve fatty acids and calcium and can incorporate solids. A hard deposit on camera is only a clue. We look at upstream inputs, pretreatment servicing and the history of blockages before deciding whether deposits or pipe damage are driving the recurrence."],
   ["油垢、错口和局部低点都可能在同一距离反复积料，也可能同时存在。管内影像只看到某个时刻的水位。下游受限也会造成上游积水，所以凭一帧静水不能认定管坡不合格。清理后复查剩余积水、接口与管壁，并标记与地面位置的对应关系。","Deposits, a displaced joint and a low point can each collect material at the same chainage, and more than one can be present. CCTV shows the water level at one moment. A restriction further downstream can also hold water upstream, so one frame of standing water cannot establish incorrect fall. After clearing, recheck the remaining water, joints and pipe wall and relate them to a location on site."]
  ],
  evidence:[
   [['同一用水高峰回涌','Backs up at the same peak period'],['负荷与支管能力不匹配','Load and branch capacity mismatch'],['记录关联器具、用水时段与上游预处理。','Log connected fixtures, peak periods and upstream pretreatment.']],
   [['反复在同距离清出沉积','Deposits recur at the same distance'],['低点、错口或局部沉积','Sag, displaced joint or local deposit'],['复核清理后影像和管段定位。','Compare post-cleaning footage and positively locate the section.']],
   [['邻近器具也有回涌','Nearby fixtures back up too'],['共同下游管段受限','Shared downstream restriction'],['核对接入走向与公共管段边界。','Confirm the connection layout and the shared section.']]
  ],
  methods:[
   [['清理与控制来料','Clean and reduce inputs'],['当证据指向沉积且管道状况允许，由合适的管道人员清理。餐饮场所同步核对当地供水机构的贸易废水要求。','Where deposits are the issue and the pipe can tolerate cleaning, arrange a suitable plumbing contractor. At food premises, check the local water authority’s trade waste requirements at the same time.']],
   [['评估局部修复','Assess a targeted pipe repair'],['在确认持续低点、错口或坏段后，再比较局部修复与更换，考虑停业影响与进入条件。','After confirming a persistent sag, displaced joint or damaged section, compare targeted repair and replacement against access and downtime.']]
  ],
  judgement:{
   heading:["通水恢复后，哪些证据才支持局部修管","What justifies a targeted repair after flow returns"],
   body:[
    ["我们会把首次回涌的器具、共用支管和复发点位放在排水示意图上。若清理后管线状况可确认，问题随负荷和来料变化，先检查源头管理和当地水务机构要求。若同一处清理后仍表现出偏移、持续积水或结构损伤，再定位并评估修管范围。","We mark the first fixture to surcharge, the shared branches and the repeat location on a drain sketch. If the pipe can be checked after cleaning and the symptoms follow load or inputs, start with source control and the local water authority’s trade waste requirements. If a displaced joint, persistent water or damage remains at the same position after clearing, locate it and assess the repair scope."]
   ]
  },
  verification:[
   ["保留同一方向的清理前后影像，记录起点、距离、检查不到的部位、上游器具和复测负荷。分别写明流量是否恢复、可见管段状态以及仍可能导致复发的条件，便于物业判断何时复查。","Keep before-and-after footage in the same direction, with the starting point, distances, inaccessible sections, upstream fixtures and recheck load. Distinguish restored flow from the condition of the pipe you could see and the factors that could cause another blockage."]
  ],
  faq:[
   [['管道积水一定说明没坡度吗？','Does standing water prove the drain has no fall?'],['不一定。下游限制也会使水留在画面内，需结合定位与复检。','A downstream restriction may also hold water in view. Correlate location and repeat inspection.']],
   [['清通后还要检查吗？','Is inspection useful after clearing?'],['反复堵塞时，清通后更容易看见此前被沉积遮住的管段。','For a repeat blockage, clearing often exposes sections that deposits previously obscured.']]
  ],
  related:['commercial-water-ingress','recurring-faults-maintenance']
 },
 {
  slug:'commercial-water-ingress',category:'urgent',image:noteArt('wet-floor'),colour:'lime',
  title:['商业场所进水：\n临时控制与恢复边界','Water ingress at commercial premises:\nContainment and recovery'],
  summary:['我们先区分人员风险、进水来源和受影响范围，再将临时控制、专业检查与恢复营业分开记录。','We separate risks to people, the water source and the affected area, then record containment, specialist checks and reopening as distinct stages.'],
  keywords:[['进水范围','Affected extent'],['电气检查','Electrical clearance'],['重新开放','Reopening']],
  mechanism:[
   ["水在墙脚和地板上出现后，可能继续通过内衬板、踢脚线后方、地材接缝或墙腔扩散。材料吸湿方式和干燥条件各异，最先干燥的表面通常不是情形最严重的位置。我们根据入水点、水位线、相邻空间和构造连接逐段划分影响区。","Once water reaches wall bases and flooring, it can spread behind skirtings and linings, through flooring joints or into cavities. Materials absorb and release moisture differently, and the first surface to dry may be far from the most affected area. We use the entry location, water marks, neighbouring spaces and how they connect to map the affected area."],
   ["我们先区分来源是否仍在进水、是否可能受污染，以及有无接触电气设备的风险。若水接近电气或安全状况不明，限制进入并由持证电工评估。吸水、通风或更换饰面是后续材料处置，不能替代电气安全确认。","We first establish whether the source is still active, whether contamination is possible and whether water could have reached electrical equipment. Where electrics may be affected or the condition is unknown, restrict access and arrange assessment by a licensed electrician. Extraction, ventilation and finish replacement are later material decisions and do not establish electrical safety."]
  ],
  evidence:[
   [['雨后外墙与门槛一带进水','Water at perimeter after rain'],['雨水进入或外部排水受限','Rain entry or restricted stormwater drainage'],['关联天气、开始时刻与外部水位。','Compare weather, onset and outside water levels.']],
   [['排水口先回涌','Water rises from a drain first'],['排水倒灌或下游受限','Backflow or downstream restriction'],['记录最先出现的器具及共同支管。','Record the first affected fixtures and shared branches.']],
   [['湿区接近插座或设备','Water near outlets or equipment'],['电气风险','Electrical hazard'],['隔离人员，由持证电工确认安全后再进入或复电。','Keep people clear and obtain licensed electrical clearance before entry or re-energisation.']]
  ],
  methods:[
   [['临时控制受影响区域','Contain the affected area'],['清晰划分通行与受影响区域，安排专业人员控制来源，防止污水或积水扩散。','Separate traffic from affected areas, arrange appropriate source control and avoid spreading standing or contaminated water.']],
   [['分区复查后恢复','Verify by zone before reopening'],['确认来源已处理，再按材料、污染程度、电气状态安排干燥、清理或拆换。','Confirm source control, then specify drying, cleaning or removal by material, contamination and electrical condition.']]
  ],
  judgement:{
   heading:["划分恢复范围时，不只看地面的水线","Why the reopening boundary extends beyond the waterline"],
   body:[
    ["如果水可能沿低处进入隔壁，或进入封闭墙腔，我们会把该区域列为待复核，即使表面没有明显水痕。比较同材质的受影响点和未受影响点有助于解释读数，但仍需结合基层、仪器和材料状况。对疑似污水或其他污染，另行安排专业评估。","If water may have tracked into the next room or a closed cavity, we mark that area for further checking even if the finish looks dry. Readings from affected and unaffected areas of the same material help put a measurement in context, alongside the substrate and instrument used. Arrange a separate specialist assessment for suspected sewage or other contamination."],
    ["开放通行、重新给设备供电和完成装饰面修复也应分开记录。一个区域能够安全通行，不代表相邻区可复电或能覆盖新饰面。","Record pedestrian access, electrical reinstatement and finish repairs as separate decisions. One area being safe to walk through does not clear nearby electrics or make the substrate ready to cover."]
   ]
  },
  verification:[
   ["交接按区域列明来源处理状态、进入限制、专业复核、材料读数及记录时间。再次开放前确认通行面与相关设备已获适用的安全确认。仍有隐藏湿区或待复验事项的区域，注明负责人和下一步。","At handover, record source control, access restrictions, specialist checks and material readings with their times for each zone. Confirm the applicable clearances for walking surfaces and equipment before reopening. Where concealed moisture or other checks remain, name who owns the next action."]
  ],
  faq:[
   [['表面干了就可以开放吗？','Can we reopen when the surface is dry?'],['还需核对隐蔽湿区、污染、电气与地面通行安全。','Consider concealed moisture, contamination, electrical safety and safe walking surfaces.']],
   [['进水是否都按同一方法清理？','Is clean-up the same for every water source?'],['污水或来源不明的情况需要专业评估，不宜按已确认清洁水的情况处理。','Sewage and unidentified sources need specialist assessment. They should not be treated as confirmed clean water.']]
  ],
  related:['recurring-drain-blockages','resilient-floor-moisture'],secondary:'cleaning-waste-hygiene'
 },
 ...require('./technical-notes-practice.cjs')
];

for (const article of articles) {
 const [, , primary] = categories[article.category];
 article.primary = primary;
 article.route = '/insights/' + article.slug + '/';
 article.publishedOn = '2026-11-20';
 if (!serviceSlugs.includes(primary) || (article.secondary && !serviceSlugs.includes(article.secondary))) {
  throw new Error('Unknown service on ' + article.slug);
 }
}
module.exports = {articles, categories, serviceArt};
