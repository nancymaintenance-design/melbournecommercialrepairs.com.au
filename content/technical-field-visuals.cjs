
const imagePath = (folder, name) => '/assets/' + folder + '/' + name + '.webp';
const technical = name => imagePath('news-technical', name);
const regional = name => imagePath('region-reference-v3', name);
const service = name => imagePath('service-reference-v1', name);
const magazine = name => imagePath('news-magazine', name);

// Photos illustrate what to examine. The original evidence rows supply the observations and conclusions.
module.exports = {
 'window-wall-water-ingress': {
  guide: [
   [['水痕位置','Stain location'],['窗边 / 墙内','At the sill / within the wall']],
   [['暴露条件','Exposure'],['风向 / 降雨时刻','Wind direction / time of rain']],
   [['排水路径','Drainage path'],['接缝 / 泛水 / 出水口','Junction / flashing / outlet']]
  ],
  aside:['我们先追查水路，再判断是否需要补胶。','We trace the water path before deciding where to reseal.'],
  scenes: [
   [['补胶后复发','Recurs after resealing'],regional('detail-sealing')],
   [['迎风雨时出现','Appears in wind-driven rain'],service('material-facade-glass')],
   [['喷水后无水痕','No stain after wetting'],technical('window-sill')]
  ],
  methods:[regional('detail-sealing'),service('problem-roof-flashing')],
  record:[
   [["修复位置", "Repair scope"],['修复部位与未打开的节点','Repairs and unopened junctions']],
   [["排水与复测", "Drainage and retest"],['排水口状态与复测条件','Outlet condition and retest conditions']],
   [["后续复查", "Follow-up"],['已处理水路与待复查位置','Resolved paths and locations to recheck']]
  ]
 },
 'uneven-hvac-zones': {
  guide: [
   [['分区负荷','Zone load'],['朝向 / 遮阳 / 占用','Orientation / shading / occupancy']],
   [['末端风量','Terminal airflow'],['指令 / 反馈 / 实测','Command / feedback / measurement']],
   [['趋势对照','Trend comparison'],['故障区 / 同系统对照区','Affected / comparison zone']]
  ],
  aside:['我们在同一时间轴上对照室温、风量和再热。','We compare room temperature, airflow and reheat on the same timeline.'],
  scenes: [
   [['单区午后过热','Afternoon overheating'],imagePath('design','interior-room')],
   [['风量不随指令','Airflow does not follow command'],service('specialist-hvac-wide-v2')],
   [['相邻区同时制冷和再热','Cooling and reheat together'],regional('detail-hvac-technician')]
  ],
  methods:[regional('detail-hvac-technician'),service('specialist-hvac-wide-v2')],
  record:[
   [["分区状态", "Zone conditions"],['受影响区、对照区及占用状态','Affected and comparison zones and occupancy']],
   [["运行读数", "Operating readings"],['设定、室温、风量与出风温度','Setpoint, room temperature, airflow and discharge temperature']],
   [["设备编号", "System IDs"],['末端编号、控制点与待复核工况','Terminal and controls point IDs and conditions to recheck']]
  ]
 },
 'recurring-drain-blockages': {
  guide: [
   [['回涌时刻','Timing'],['高峰用水 / 平时','Peak use / ordinary use']],
   [['沉积位置','Deposit location'],['同一距离 / 不同管段','Same distance / different pipe runs']],
   [['影响范围','Affected fixtures'],['单个器具 / 共用支管','One fixture / common branch']]
  ],
  aside:['我们在清通后继续核对沉积位置和管况。','Once flow returns, we check where deposits recur and assess the pipe condition.'],
  scenes: [
   [['用水高峰回涌','Backs up at peak use'],service('gallery-plumbing-site-v2')],
   [['沉积出现在同一距离','Deposits at the same distance'],technical('drain-run')],
   [['邻近器具也回涌','Nearby fixtures back up'],service('gallery-plumbing-inspection-v2')]
  ],
  methods:[service('gallery-plumbing-inspection-v2'),service('gallery-plumbing-work-v2')],
  record:[
   [["管内影像", "Drain footage"],['清理前后同方向的影像','Before-and-after footage in the same direction']],
   [["检查范围", "Inspection extent"],['检查起点、距离及未达管段','Starting point, distances and inaccessible sections']],
   [["复测负荷", "Recheck load"],['上游器具、复测负荷和复发条件','Upstream fixtures, recheck load and recurrence factors']]
  ]
 },
 'commercial-water-ingress': {
  guide: [
   [['进水来源','Water source'],['外墙周边 / 排水口','Building perimeter / drain']],
   [['影响范围','Affected extent'],['通行面 / 设备','Walking surfaces / equipment']],
   [['恢复边界','Reopening boundary'],['分区复核 / 留档','Zone checks / handover records']]
  ],
  aside:['恢复使用前，我们逐区核对通行面和设备状况。','We check each zone before reopening, including walking surfaces and equipment.'],
  scenes: [
   [['雨后周边进水','Perimeter water after rain'],regional('detail-sealing')],
   [['排水口先回涌','Drain backs up first'],service('problem-parking-drain')],
   [['水接近电气设备','Water near electrical equipment'],technical('wet-floor')]
  ],
  methods:[technical('wet-floor'),service('gallery-cleaning-public-before-v2')],
  record:[
   [["区域限制", "Zone restrictions"],['各区的进水来源处理和进入限制','Source control and access restrictions by zone']],
   [["复核记录", "Verification record"],['专业确认、材料读数与记录时间','Specialist checks, material readings and times']],
   [["责任分工", "Follow-up owner"],['待复验区域及下一步负责人','Areas to recheck and who owns the next action']]
  ]
 },
 'recurring-faults-maintenance': {
  titleAccent:['用工单记录追查原因','Tracing Causes Through Work Orders'],
  guide: [
   [['复发位置','Location'],['同一部位 / 多处','One location / several locations']],
   [['发生时段','Timing'],['共同工况 / 使用周期','Shared conditions / use cycles']],
   [['资产记录','Asset history'],['工单 / 现场复查','Work orders / site checks']]
  ],
  aside:['我们按设备记录故障表现及影响，据此安排复查。','We record the fault pattern and its impact for each asset to plan follow-up.'],
  scenes: [
   [['同一部位反复报修','Repeat tickets at one location'],regional('detail-door')],
   [['多处同时出现','Several locations affected together'],regional('scene-south-east')],
   [['磨耗随使用增加','Wear increases with use'],service('specialist-building-hinge')]
  ],
  methods:[regional('detail-wall-repair'),magazine('maintenance-plan-v1')],
  record:[
   [["恢复功能", "Restored function"],['恢复的功能与验证条件','Restored function and verification conditions']],
   [["资产档案", "Asset history"],['未处理的上游问题与资产记录','Outstanding upstream issues and asset history']],
   [["复查安排", "Follow-up"],['原工况复查时间和负责人','When to recheck original conditions and who will do it']]
  ]
 },
 'fire-door-latching-and-access': {
  titleAccent:['锁闭、压差与门禁','that fail to latch'],
  guide: [
   [['闭合与锁闭','Closing and latching'],['闭门末段 / 锁舌','Final travel / latch']],
   [['门禁状态','Access state'],['普通运行 / 读卡后','Normal operation / after access is granted']],
   [['门组状态','Doorset condition'],['间隙 / 擦痕','Gaps / rubbing']]
  ],
  aside:['我们对照关门过程与故障出现时的门禁状态。','We check door movement under the access settings that produced the fault.'],
  scenes: [
   [['闭门末段未锁闭','Stops short of latching'],regional('detail-door')],
   [['读卡后间歇失常','Intermittent after access is granted'],service('problem-access-reader')],
   [['门扇下垂或擦碰','Door sags or drags'],service('specialist-building-hinge')]
  ],
  methods:[regional('detail-door'),service('specialist-fire-security-access')],
  record:[
   [["门组资料", "Doorset details"],['门组标识和已处理部件','Doorset ID and work performed']],
   [["功能复核", "Functional checks"],['自闭、锁闭及关联功能复核范围','Self-closing, latching and associated functions checked']],
   [["留档内容", "Records"],['复核人员及另行检查的状态','Who checked it and states verified separately']]
  ]
 },
 'irrigation-uneven-coverage': {
  titleAccent:['压力、布点与径流','coverage and runoff'],
  guide: [
   [['干斑位置','Dry patch location'],['分区末端 / 喷洒缺口','End of zone / coverage gap']],
   [['运行条件','Operating conditions'],['水压 / 风况 / 时长','Pressure / wind / run time']],
   [['径流边界','Runoff boundary'],['植床 / 步道','Planting bed / footpath']]
  ],
  aside:['我们先检查水是否到达，再决定调整覆盖范围还是运行时长。','We check whether water reaches the area before changing coverage or run time.'],
  scenes: [
   [['分区末端干斑','Dry spots at the end of a zone'],service('specialist-landscaping-irrigation')],
   [['水流到步道','Water reaches the path'],service('problem-garden-sprinkler')],
   [['地面湿、叶片萎蔫','Wet ground and wilting plants'],service('gallery-landscaping-irrigation-before')]
  ],
  methods:[service('problem-garden-sprinkler'),service('specialist-landscaping-irrigation')],
  record:[
   [["复测工况", "Retest conditions"],['可比的分区、运行时长和风况','Comparable zones, run times and wind']],
   [["布点记录", "Coverage records"],['集水布局、干区和积水位置','Catch layout, dry areas and ponding']],
   [["步道径流", "Path runoff"],['喷洒越界和停水后径流','Overspray and runoff after shut-off']]
  ]
 },
 'external-sign-fixings': {
  titleAccent:['连接、基层与水路径','Fixings and substrates'],
  guide: [
   [['面板动作','Panel movement'],['摆动 / 偏转','Movement / rotation']],
   [['连接基层','Fixings and substrate'],['紧固件 / 承力面','Fasteners / supporting surface']],
   [['水迹位置','Moisture marks'],['安装孔 / 周边收口','Fixing holes / perimeter seals']]
  ],
  aside:['我们分别核对连接是否稳定，以及立面开孔的防水处理。','We check the connection and weatherproofing around façade penetrations separately.'],
  scenes: [
   [['面板迎风摆动','Panel moves in wind'],regional('detail-signage')],
   [['孔位锈迹或潮痕','Staining at the fixing'],service('problem-signage-fixing')],
   [['饰面开裂、标识偏转','Facing cracks and sign rotates'],service('material-facade-metal')]
  ],
  methods:[service('problem-signage-fixing'),magazine('signage-make-good-v1')],
  record:[
   [["连接资料", "Fixing details"],['标识位置、受检连接与基层','Sign location, fixings inspected and substrate']],
   [["验收影像", "Verification photos"],['封闭前照片、稳定性和防水检查','Photos before closing up, stability and weatherproofing checks']],
   [["复查条件", "Reinspection"],['碰撞或风暴后的复查部位','Points to reinspect after an impact or storm']]
  ]
 },
 'partition-head-movement': {
  titleAccent:['位移与收口','Movement and joints'],
  guide: [
   [['裂缝走向','Crack direction'],['墙顶 / 门洞角部','Wall head / door corner']],
   [['触发条件','Triggers'],['使用变化 / 季节变化','Use / seasonal change']],
   [['节点构造','Joint detail'],['板缝 / 位移节点','Board joint / movement detail']]
  ],
  aside:['我们先查哪里限制了位移，再决定如何修复饰面。','We identify what limits movement before repairing the finish.'],
  scenes: [
   [['墙顶连续裂纹','Continuous crack at the wall head'],service('gallery-fit-outs-make-good-work')],
   [['门洞角部斜裂','Diagonal crack at a door corner'],service('specialist-building-partition')],
   [['同一补缝重新开裂','Repaired joint cracks again'],regional('detail-wall-repair')]
  ],
  methods:[regional('detail-wall-repair'),service('gallery-fit-outs-make-good-work')],
  record:[
   [["节点资料", "Joint details"],['封闭前可见构造、材料和连接','Visible details, materials and connections']],
   [["环境复查", "Condition recheck"],['原触发条件下的复查','Recheck under original triggering conditions']],
   [["系统文件", "System documentation"],['评级隔断的系统文件和复核记录','System documentation and checks for rated partitions']]
  ]
 },
 'resilient-floor-moisture': {
  titleAccent:['基层潮气与粘结问题','Moisture and Bonding Issues'],
  guide: [
   [['起翘位置','Location'],['外墙边 / 日晒区','Perimeter / sun-exposed area']],
   [['基层状态','Substrate condition'],['湿度 / 表面状态','Moisture / surface condition']],
   [['胶层界面','Adhesive interface'],['地板背面 / 基层面','Covering back / substrate face']]
  ],
  aside:['局部重铺前，我们检查两侧胶层和水分来源。','We check both sides of the bond and the moisture source before local replacement.'],
  scenes: [
   [['从外墙边缘鼓起','Blisters at the perimeter'],service('gallery-fit-outs-make-good-work')],
   [['沿日晒窗带起翘','Lifting in a sun-exposed strip'],service('gallery-fit-outs-make-good-complete')],
   [['胶层与地板脱开','Adhesive releases from covering'],technical('resilient-floor')]
  ],
  methods:[technical('resilient-floor'),service('gallery-fit-outs-make-good-work')],
  record:[
   [["测点与结果", "Testing records"],['测点、方法、工况及测试结果','Test locations, methods, conditions and results']],
   [["验收标准", "Acceptance criteria"],['系统验收标准和已处理水源','System acceptance criteria and moisture source addressed']],
   [["恢复范围", "Scope of reinstatement"],['换铺边界、养护及复检部位','Replacement limits, curing and recheck locations']]
  ]
 },
 'doors-hardware-latching': {
  titleAccent:['门扇与五金排查','That Stick or Won’t Latch'],
  guide: [
   [['首个接触点','First point of contact'],['门框上缘 / 侧边','Frame head / jamb']],
   [['锁舌位置','Latch position'],['门扇 / 扣板','Leaf / strike']],
   [['环境变化','Changing conditions'],['天气 / 通风','Weather / ventilation']]
  ],
  aside:['我们找出门扇最先碰到的位置，再确定要调整的部件。','We find the first point of contact before choosing which component to adjust.'],
  scenes: [
   [['门扇擦框上缘','Leaf rubs at the top'],service('specialist-building-hinge')],
   [['到位但未锁闭','Reaches frame but misses the strike'],regional('detail-door')],
   [['雨天才擦碰','Binds only after rain'],regional('detail-sealing')]
  ],
  methods:[service('specialist-building-hinge'),regional('detail-door')],
  record:[
   [["闭门检查", "Closing checks"],['代表性开角下的闭合和锁闭','Closing and latching from representative angles']],
   [["通行与间隙", "Passage and clearances"],['门扇间隙、通行和已复核工况','Gaps, passage and conditions actually checked']],
   [["专用功能", "Specialist functions"],['专用门组的适用功能与检查','Applicable specialist doorset functions and checks']]
  ]
 }
};
