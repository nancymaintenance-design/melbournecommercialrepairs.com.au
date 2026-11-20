
const regional = name => '/assets/region-reference-v3/' + name + '.webp';
const service = name => '/assets/service-reference-v1/' + name + '.webp';
const technical = name => '/assets/news-technical/' + name + '.webp';
const artwork = (panel, guide, aside, scenes, methods, record) => ({panel,guide,aside,scenes,methods,record});

module.exports = [
 {
  slug:'concrete-spalling-corrosion',category:'building',colour:'blue',image:regional('detail-wall-repair'),
  title:['混凝土保护层剥落：\n从锈胀到修复边界','Concrete spalling:\nCorrosion and repair limits'],
  summary:['看到掉角、顺筋裂缝或旧补丁边缘松动时，我们先判断病害的范围和落物风险，再区分局部修补与需要扩大调查的情况。','When concrete breaks away, cracks along reinforcement or loosens at an old patch, we map the deterioration and falling-object risk before deciding how far to investigate.'],
  keywords:[['顺筋裂缝','Cracks along bars'],['保护层空鼓','Cover delamination'],['钢筋锈蚀','Reinforcement corrosion']],
  mechanism:[
   ['钢筋通常受到混凝土高碱环境保护。二氧化碳从表面进入并逐步降低碱度，氯盐也可能通过孔隙或裂缝进入。钢筋一旦开始腐蚀，锈蚀产物占据更大体积，可能先沿钢筋方向顶出裂纹，再把表层与内部混凝土分开。','Concrete usually protects reinforcement through its high alkalinity. Carbonation lowers alkalinity from the surface inwards, and chlorides can reach the steel through pores or cracks. The products of corrosion take up more space, which can open a crack along a bar and eventually lift the cover away.'],
   ['我们先在同一构件上标出锈迹、裂缝、旧补丁和露筋，再看它们是否跟渗水、暴露面或钢筋走向吻合。敲击筛查可以由有条件的人员用于寻找疑似分层。其声音也受构件厚度和边界影响，需要与其他证据交叉核对。','We map rust stains, cracks, old patches and exposed bars on the same element, then compare them with water exposure and reinforcement direction. A competent assessor can use sounding to screen for possible delamination. Thickness and edges also affect the response, so we check the result against other evidence.']
  ],
  evidence:[
   [['裂缝沿钢筋延伸','Crack follows a bar'],['锈胀或其他沿筋开裂','Corrosion expansion or other reinforcement-related cracking'],['对照保护层与钢筋位置，记录锈迹及裂纹延伸。','Compare cover and bar position, and record staining and crack extent.']],
   [['局部表面掉块','Local piece has broken away'],['保护层分层或局部冲击','Cover delamination or local impact'],['先控制落物区域，再由合适人员圈定边界。','Control the falling-object area and have a suitable assessor map its limits.']],
   [['旧补丁边缘再开裂','Cracking returns at a patch edge'],['周边劣化或新旧材料界面损伤','Deterioration around the patch or a damaged interface'],['查旧修补范围、渗水路径及相邻构件的表现。','Check the previous scope, exposure to water and the condition of nearby elements.']]
  ],
  methods:[
   [['按确认范围局部修补','Patch within confirmed limits'],['适合范围清楚、经评估可按原构件要求修复的部位。修补范围与材料应由核实的钢筋、基层和暴露条件决定。','Use a local patch where assessment defines the limits and confirms suitability for the element. Base the scope and material on the steel, substrate and exposure actually found.']],
   [['扩大调查并处理来源','Investigate further and address the source'],['出现广泛分层、受力疑虑或反复剥落时，由结构专业人员评估钢筋截面、保护层和劣化边界，维修安排与控制水分来源一起制定。','Where delamination is widespread, capacity is in doubt or spalling returns, arrange a structural assessment of steel section, cover and deterioration limits. Plan repairs alongside the work needed to control moisture.']]
  ],
  judgement:{heading:['可见掉块只是调查的起点','A visible spall is the starting point'],body:[
   ['同一块梁或板可能同时有已掉落的外缘、仍粘着的空鼓区和外观看起来完好的邻近区域。我们把这些状态画在同一张位置图上，并标明哪些地方从地面只能远看，哪些部位已近距离检查。','The same beam or slab can have a visible spall, hollow cover still in place and an apparently sound area next to it. We mark all three on one sketch and distinguish locations viewed from the ground from surfaces checked at close range.'],
   ['遇到继续落物的可能、钢筋明显受损或构件变形时，物业先控制人员进入，由专业人员复核后再定工序。现场报告应把即时防护和永久修复范围分别写清。','Where material could continue to fall, the steel is visibly damaged or the element has moved, keep people clear and obtain specialist advice before setting the repair sequence. The site record should distinguish immediate controls from the permanent repair scope.']
  ]},
  verification:[['交接记录构件编号、照片方位、实际修补边界、修补前的钢筋和基层状况、材料与检查人。对未能近距离查看的位置，以及仍可能反复受潮的点位，安排后续复查。','File the element ID, photo orientation, actual patch limits, pre-repair condition of the steel and substrate, the material used and who checked the work. Schedule follow-up for areas that could not be inspected closely or may still get wet.']],
  faq:[
   [['有锈水就说明钢筋截面已经不足吗？','Does a rust stain prove the steel has lost capacity?'],['锈迹提示需要调查。截面及承载能力须根据钢筋状况与构件受力由适当人员评估。','A stain is a reason to investigate. Section loss and capacity need an assessment of the steel and the structural element.']],
   [['旧补丁完好还需要记录吗？','Should we record a sound-looking old patch?'],['需要。它能帮助定位过去的修补范围，也给后续复查留下基线。','Yes. It locates the previous work and gives future inspections a baseline.']]
  ],
  related:['recurring-faults-maintenance','commercial-storm-make-safe'],
  visuals:artwork(['先圈定受影响范围','Map the affected area first'],[
   [['裂缝走向','Crack direction'],['沿筋 / 横向','Along bars / across']],
   [['落物范围','Falling-object area'],['外缘 / 下方通道','Edge / access below']],
   [['修补边界','Repair boundary'],['旧补丁 / 相邻保护层','Old patch / adjacent cover']]
  ],['把旧补丁与周边混凝土一起检查。','Check the old patch and the surrounding concrete together.'],[
   [['顺筋开裂','Crack along a bar'],regional('detail-wall-repair')],
   [['表层掉块','Local spall'],service('gallery-building-maintenance-before')],
   [['旧补丁复裂','Patch edge cracks again'],service('gallery-building-maintenance-after')]
  ],[regional('detail-wall-repair'),service('hero-building-maintenance')],[
   [['位置','Location'],['构件编号与拍摄方位','Element ID and photo orientation']],
   [['修补','Repair'],['钢筋、基层和实际边界','Steel, substrate and actual limits']],
   [['复查','Follow-up'],['未近查位置及受潮点','Areas not checked closely and wetting locations']]
  ])
 },
 {
  slug:'flat-roof-ponding-drainage',category:'envelope',colour:'orange',image:service('problem-roof-membrane'),
  title:['商业屋面积水：\n落水口、找坡与挠度','Water ponding on commercial roofs:\nOutlets, falls and deflection'],
  summary:['同一片屋面反复积水时，我们先看出水口、水线和屋面高低关系，再判断该恢复排水、调整局部构造，还是安排结构评估。','When water repeatedly ponds on a commercial roof, we compare outlets, water marks and roof levels before deciding whether the issue is drainage, local detailing or structural movement.'],
  keywords:[['落水口','Roof outlets'],['屋面找坡','Roof falls'],['结构挠度','Structural deflection']],
  mechanism:[
   ['积水可能出在出口、表面坡度或承托屋面的结构。出水口畅通时，周围的高边、修补层或下沉低点仍可能让水流不到入口。水越深，屋面承受的重量越大。柔性屋面向下挠时，低点可能进一步聚水，形成荷载与挠度的相互放大。','Ponding can start at an outlet, at the surface falls or in the structure supporting the roof. Even with a clear outlet, a raised rim, previous overlay or local dip can interrupt the route to it. Water adds load as its depth increases. On a flexible roof, that load can deepen a low spot and let it collect more water.'],
   ['我们把积水轮廓叠在屋面分区图上，并对照出口、溢流口和相邻排水区。积水时间与室内渗漏时间分开记录。积水会影响防水层的暴露条件，入水仍可能来自接缝、穿屋面部位或更上游的构造。','We place the ponding outline on a roof plan and compare it with outlets, overflows and adjacent drainage areas. We record when the water stands and when leakage appears indoors separately. Ponding changes membrane exposure, while the entry point may still be a joint, a roof penetration or a detail further upslope.']
  ],
  evidence:[
   [['水线围绕落水口扩张','Water spreads around the outlet'],['入口堵塞或下游排放受限','Blocked inlet or restricted downstream discharge'],['对照落叶、杂物和排放痕迹，核对溢流是否发生。','Check debris and discharge marks and note whether overflow operated.']],
   [['出口附近干而中部还有水','Outlet area dries but the middle holds water'],['局部低点或改造改变坡度','Local depression or falls altered by previous work'],['由具备安全条件的人员核对出口和低点的标高。','Have a suitably equipped person compare outlet and low-point levels.']],
   [['积水范围扩大且屋面明显变形','Ponding widens and the roof visibly deflects'],['挠度与积水荷载相互影响','Possible feedback between deflection and water load'],['限制受影响区域进入，提交结构专业评估。','Keep people clear and arrange a structural assessment.']]
  ],
  methods:[
   [['恢复既有排水通路','Restore the existing drainage path'],['确认限制在出水口或下游时，安排适当人员恢复通畅并复查溢流路径，核对积水是否仍留在同一低点。','Where the restriction is at or beyond the outlet, restore flow through the appropriate trade and check the overflow path and whether the low point still holds water.']],
   [['核对坡度与结构再制定修复','Assess falls and structure before altering the roof'],['出现坡度问题、多个出口相互影响或可见下挠时，先核对屋面构造与承载条件，再决定找坡、出口改造或防水修复的范围。','Where falls, interacting outlets or visible deflection are involved, check the assembly and structural conditions before setting the scope for regrading, outlet alterations or membrane work.']]
  ],
  judgement:{heading:['落水口通畅之后，复查水还在哪里','Recheck where water remains after the outlet clears'],body:[
   ['若清理后积水逐渐退出原低点，出口受限可能是主要因素。若水圈缩小但集中在远离出口的同一位置，继续处理口部通常不能解决那个低点。我们在可比降雨后复查，并记录雨停到拍照的时间。','If clearing the outlet lets the original low point drain, the restriction may have been the main issue. If water retreats but stays in the same area away from the outlet, further outlet work is unlikely to change that depression. We compare after similar rain and log the time between the end of rain and each photo.'],
   ['有明显下挠、异常响动或水位继续上升时，不安排人员上屋面检查。排水和临时处置应由负责现场安全的专业人员安排。','Visible sagging, unusual noises or a rising water level call for restricted access. Leave roof attendance and temporary drainage decisions to the people responsible for site safety.']
  ]},
  verification:[['保留屋面分区、出口与溢流位置、积水边界、水线和检查时间。把排水复查与防水确认分开记录，并注明结构评估的范围、结论和待处理事项。','Keep the roof zones, outlet and overflow locations, pond outline, water marks and inspection time. Record drainage checks separately from membrane checks, along with the scope, findings and outstanding items from any structural assessment.']],
  faq:[
   [['有积水就要重做防水吗？','Does ponding mean the membrane needs replacement?'],['先区分排水、坡度、结构和防水层状态。维修方案取决于查明的原因。','First distinguish drainage, falls, structure and membrane condition. The repair scope follows the cause found.']],
   [['可以开孔让积水排掉吗？','Can a new hole be made to release the water?'],['新排水点会影响构造、防水及下游排放，必须先由适当专业人员评估。','A new outlet affects the assembly, waterproofing and downstream discharge and needs professional assessment.']]
  ],
  related:['window-wall-water-ingress','commercial-storm-make-safe'],
  visuals:artwork(['顺着水线找排水瓶颈','Use water marks to trace the drainage restriction'],[
   [['排水端','Drainage points'],['入口 / 溢流','Outlet / overflow']],
   [['积水分布','Ponding pattern'],['近出口 / 中部低点','Near outlet / central low']],
   [['屋面状态','Roof condition'],['标高 / 可见挠度','Levels / visible deflection']]
  ],['清理出口后，对照同一处低点的残水范围。','After clearing the outlet, compare the water left at the original low point.'],[
   [['出口周边积水','Water around an outlet'],service('problem-roof-flashing')],
   [['中部仍有低点','Water remains at a low point'],service('problem-roof-membrane')],
   [['屋面变形迹象','Signs of roof movement'],regional('detail-roof')]
  ],[service('problem-roof-flashing'),service('specialist-roofing-waterproofing')],[
   [['分区','Zones'],['落水口、溢流与可见水线','Outlets, overflows and water marks']],
   [['复查','Recheck'],['降雨时段与残水边界','Rain timing and remaining pond extent']],
   [['交接','Handover'],['排水、防水和结构复核状态','Drainage, membrane and structural checks']]
  ])
 },
 {
  slug:'occupancy-sensor-lighting-controls',category:'electrical',colour:'blue',image:service('specialist-electrical-lighting'),
  title:['感应照明误关：\n覆盖、延时与控制分区','Occupancy-controlled lighting:\nCoverage, delays and false offs'],
  summary:['人还坐在会议室里，灯却熄了。我们按实际座位、控制分区和关闭时刻复现问题，区分探测不到、定时覆盖与照明指令冲突。','When lights go out while a meeting room is still occupied, we reproduce the issue at the actual seats and check the control zone and timing to separate detection, scheduling and conflicting commands.'],
  keywords:[['感应覆盖','Sensor coverage'],['关闭延时','Switch-off delay'],['分区指令','Zone commands']],
  mechanism:[
   ['走进房间属于明显移动，伏案、阅读或视频会议时的移动幅度小得多。依靠红外变化探测的感应器需要适当的视线与位置。隔板、玻璃、吊顶与安装方向会改变有效覆盖，门口测一次通过，容易漏掉实际工位的问题。','Walking into a room is a much larger movement than typing, reading or sitting on a call. Passive infrared sensing depends on placement and how it sees movement. Partitions, glazing, ceiling layouts and orientation can change coverage. An entry walk test can therefore miss the seats where occupants lose light.'],
   ['照明实际输出还可能受定时程序、日光调暗、手动覆盖或中央控制影响。我们把关灯时刻与传感器状态和照明分区指令对照。如果探测状态还显示有人，而分区同时收到另一条关闭指令，维修重点就转向控制优先级。','Lighting output may also respond to schedules, daylight dimming, manual overrides or a central controller. We compare the time lights go out with the sensor state and commands for that lighting zone. If occupancy is still detected when another off command arrives, the investigation moves to which control takes priority.']
  ],
  evidence:[
   [['进门能亮，坐下后熄灯','Lights respond at entry but go out when seated'],['小动作覆盖不足或遮挡','Poor coverage for small movements or obstruction'],['按真实座位和常见姿势重复观察，占用结束计时也要记录。','Repeat at the actual seats and typical posture and time the vacancy delay.']],
   [['不同房间固定时刻一起熄灯','Several rooms switch off at the same time'],['上级时程或公共覆盖指令','Shared schedule or central override'],['对齐程序时间、分区日志及实际关灯时刻。','Compare schedule time, zone logs and actual switching time.']],
   [['过道有人时，空会议室亮灯','An empty room lights up when someone passes'],['感应覆盖越过控制边界','Detection extends beyond the intended zone'],['同一轮验证房间内和相邻过道，记录门开闭状态。','Check inside the room and in the adjacent corridor, recording whether the door is open.']]
  ],
  methods:[
   [['调整受影响区的覆盖','Correct coverage in the affected zone'],['确认覆盖不足或溢出时，由适当电气人员评估感应器位置和配置。有新的隔断时，先按现有布置重新验证边缘工位。','Where dead spots or spillover are confirmed, have an appropriate electrical practitioner assess placement and configuration. Recheck boundary seats in the current layout after partition changes.']],
   [['核对时程、日光与控制优先级','Check scheduling, daylighting and command priority'],['若探测输入正确但输出异常，核对实际分区绑定、时间段、手动覆盖及日光设置。修改后要同时验证有人的工况与无人时的关灯逻辑。','If sensing is correct but output is wrong, check the zone mapping, schedules, overrides and daylight settings. After changes, verify occupied operation and the switch-off sequence when the area is empty.']]
  ],
  judgement:{heading:['用办公行为复现误关','Reproduce the fault during normal activities'],body:[
   ['我们把验证分成进门、静坐、离开和相邻通道经过四种场景。每次只改变一个条件。会议室门口的走动容易让传感器保持占用状态，复测时应记录通道是否有人和门是否开启。','We separate entry, quiet seated use, exit and nearby corridor movement. Change one condition at a time. Corridor traffic can keep a sensor reporting occupancy, so note who was passing and whether the door was open during a recheck.'],
   ['延长延时有时能减少短时误关，但可能让错误覆盖和不必要的运行时间继续存在。优先核对覆盖、实际关灯延时与上级指令，再决定改哪项设置。','A longer delay can reduce some false offs while leaving a dead spot or unnecessary run time in place. Check coverage, the actual countdown and overriding commands before deciding which setting to change.']
  ]},
  verification:[['按房间编号归档感应器与照明组、座位或通道测试点、占用与无人切换时间，以及日光和定时控制状态。普通照明调试与应急照明复核分别记录，涉及应急照明时交由相应人员处理。','Record the room ID, sensor and lighting group, seats or corridor points checked, occupied and vacant timings, and the daylight or scheduling state. Keep ordinary lighting commissioning separate from emergency lighting checks and refer any affected emergency system to the appropriate personnel.']],
  faq:[
   [['换成更灵敏的感应器会解决吗？','Will a more sensitive sensor fix it?'],['要同时看小动作漏检和越界触发。灵敏度提高可能让相邻区域的移动被算进来。','Check both missed small movements and unwanted detections. More sensitivity can also pick up activity outside the zone.']],
   [['开关能开灯，是否说明感应控制正常？','Does a working wall switch prove occupancy control is working?'],['手动开灯只验证该指令链。需另行核对感应输入、延时与分区自动输出。','Manual switching verifies that command path. Check detection, delay and automatic zone output separately.']]
  ],
  related:['led-flicker-drivers-controls','partition-speech-privacy'],
  visuals:artwork(['用实际占用状态核对开关逻辑','Verify switching under real occupancy'],[
   [['覆盖区域','Coverage'],['入口 / 静坐工位','Entry / seated workspace']],
   [['触发时刻','Timing'],['动作 / 关灯延时','Movement / off delay']],
   [['控制边界','Control zones'],['会议室 / 相邻通道','Meeting room / adjacent corridor']]
  ],['单次走入测试看不到静坐时的漏检。','A walk-in check can miss detection faults during quiet seated use.'],[
   [['静坐后误关','False off while seated'],service('gallery-electrical-lighting-after')],
   [['同时关灯','Several zones switch off together'],service('problem-electrical-warehouse')],
   [['相邻区误触发','Unwanted adjacent-zone detection'],regional('detail-lighting')]
  ],[service('gallery-electrical-lighting-after'),service('specialist-electrical-lighting')],[
   [['分区','Zone'],['感应器与实际联动灯组','Sensor and lighting group controlled']],
   [['时序','Timing'],['占用、离开与实际关灯时间','Occupied, exit and switch-off times']],
   [['控制','Controls'],['日光设置、时程和覆盖状态','Daylight settings, scheduling and overrides']]
  ])
 },
 {
  slug:'drain-trap-seal-odours',category:'plumbing',colour:'pink',image:regional('detail-plumbing'),
  title:['地漏与水槽返味：\n区分干涸水封和排水压差','Drain odours:\nDry traps and pressure changes'],
  summary:['低频使用的地漏返味，与多处器具同时咕噜响，通常需要分开排查。我们把水封变化、排放时序和通气条件对照起来。','A smell from a seldom-used floor waste and several fixtures gurgling together call for different checks. We compare trap water levels, discharge timing and vent conditions.'],
  keywords:[['水封','Water trap seal'],['压力瞬变','Pressure transients'],['排水通气','Drainage venting']],
  mechanism:[
   ['存水弯依靠一段留存的水隔开室内和排水管气体。长期没有补水时，水封可能因蒸发变浅。另一些情况发生在邻近器具排放时，管内空气压力短时间变化，可能把存水拉走，也可能从水封中顶出气泡。','A water trap holds water between the room and the drain air. In a fixture that goes unused, evaporation can reduce that seal. Another pattern occurs when nearby fixtures discharge. Short pressure changes in the pipe can pull water out or push air through the seal.'],
   ['我们区分臭味出现的地点和实际失水的器具。最低使用率的地漏、附近的清扫口和共用立管上的器具都可能需要查看。通风改变也可能把来自别处的气味带进来，现场先辨别排水系统和室内空气路径。','We separate where someone notices an odour from the fixture that may have lost its seal. A little-used floor waste, a nearby access opening and fixtures on the shared stack may all need checking. Changed ventilation can bring an odour in from elsewhere, so we distinguish drain behaviour from airflow through the room.']
  ],
  evidence:[
   [['停用一段时间后返味','Odour develops after a period of disuse'],['水封蒸发或补水失效','Evaporation or loss of trap replenishment'],['核对使用和补水记录，观察恢复后是否再次减少。','Check usage and replenishment and see whether the seal drops again.']],
   [['其他器具排放时咕噜响','Trap gurgles when another fixture discharges'],['支管或立管压力瞬变','Pressure changes in the branch or stack'],['记录哪些器具同时使用、声响先后及水封变化。','Log which fixtures discharged, the order of sounds and the change in the seal.']],
   [['有水封仍反复闻到气味','Odour recurs with a water seal present'],['其他失水点、松动连接或外来气味','A different trap, loose connection or unrelated odour'],['分区检查地漏、连接和通气端附近的表现。','Check floor wastes, connections and areas near the vent by zone.']]
  ],
  methods:[
   [['恢复和观察低频使用水封','Restore and monitor little-used traps'],['适用于可确认长时间干涸的器具。结合使用情况复核补水安排，并记录水封维持时间和返味是否复现。','Use where prolonged disuse is confirmed. Review how the trap is replenished for actual use and record how long it holds and whether the odour returns.']],
   [['调查共用排水和通气','Investigate the shared drainage and vent system'],['多处同时异常或与上游排放相关时，由适当水管专业人员追查共用管段、通气状态和局部受限情况。','Where several fixtures are affected or the issue follows upstream discharge, have a suitable plumber assess shared pipework, venting and any restriction.']]
  ],
  judgement:{heading:['看返味是否跟排放动作同一时刻发生','Check whether the odour follows a discharge'],body:[
   ['周一开门发现低频使用地漏有气味，是重要的时间线索。若工作日高峰同时听到咕噜声、看到水位变化，就要记录哪些设备在排放，而不能只反复补水。','An odour from a little-used floor waste on Monday morning gives us a timing clue. Gurgling and a changing water level during weekday peak use call for a record of what was discharging, even if topping up temporarily improves the smell.'],
   ['有条件时选同一管系中正常器具作为比较，现场区分单点失水与成组的压力影响。物业记录可先写清位置和使用时段，拆检由适当人员完成。','Where practical, compare a normally operating fixture on the same system to separate one depleted trap from a pressure effect across the group. Property staff can log location and usage. Leave opening the system to the appropriate trade.']
  ]},
  verification:[['交接记录地漏或器具编号、使用频率、故障发生时的排放组合、补水或管路处理后的观察和仍需复查的时段。若来访时没有复现，应说明当时哪些器具在使用。','File the waste or fixture ID, frequency of use, the combination of discharges when the fault occurred, observations after replenishment or pipework repairs and the period still to be checked. If the fault did not recur, record which fixtures were operating during the visit.']],
  faq:[
   [['补水后气味消失，原因就确定了吗？','Does topping up the trap establish the cause?'],['说明恢复水封有帮助，仍需看水后来是缓慢减少，还是在排放时迅速变化。','It shows the restored seal helped. Check whether the water subsequently recedes slowly or changes suddenly with a discharge.']],
   [['排水顺畅也会返味吗？','Can drains smell even when fixtures empty freely?'],['可以。水封、通气和管件连接与排水速度是不同的检查对象。','Yes. The seal, venting and connections need checks of their own, even when fixtures empty freely.']]
  ],
  related:['recurring-drain-blockages','commercial-water-ingress'],
  visuals:artwork(['对照水封变化与排放时序','Compare seal changes with discharge timing'],[
   [['使用频次','Fixture use'],['经常 / 闲置','Regular / unused']],
   [['声音与时间','Noise and timing'],['静置 / 排放时','At rest / during discharge']],
   [['管路范围','Drainage scope'],['单个 / 共用立管','One fixture / shared stack']]
  ],['记录先出现声音、气味还是水封变化。','Record whether noise, odour or a seal change appeared first.'],[
   [['停用后返味','Odour after disuse'],service('gallery-plumbing-inspection-v2')],
   [['排放时咕噜响','Gurgling during discharge'],technical('drain-run')],
   [['水封在但仍有气味','Odour with the seal present'],service('gallery-plumbing-site-v2')]
  ],[regional('detail-plumbing'),service('specialist-plumbing-drainage-gas')],[
   [['位置','Fixture'],['器具、低频使用和补水情况','Fixture use and replenishment']],
   [['排放','Discharge'],['出现问题时的组合和先后','Combination and sequence at the time']],
   [['观察','Follow-up'],['恢复后水封状态和待复查时段','Seal after work and periods to recheck']]
  ])
 },
 {
  slug:'meeting-room-carbon-dioxide-ventilation',category:'hvac',colour:'blue',image:service('specialist-hvac-wide-v2'),
  title:['会议室 CO₂ 升高：\n用趋势判断新风','Rising CO₂ in meeting rooms:\nAssessing outdoor airflow'],
  summary:['我们把房间人数、使用时长、室外基线和设备状态放在同一时间轴，判断二氧化碳变化是否值得进一步查新风量。','We compare room occupancy, meeting length, outdoor background and plant operation on one timeline to decide when a rise in CO₂ warrants airflow checks.'],
  keywords:[['室外基线','Outdoor baseline'],['实际占用','Actual occupancy'],['新风量','Outdoor airflow']],
  mechanism:[
   ['人在室内呼出的二氧化碳会累积，同时被室外空气稀释。在同一房间，人数、活动程度、开放给相邻空间的通道及会议持续多久，都会改变曲线。刚坐满时的读数和满员一小时后的读数含义不同，单个峰值不能替代通风量核对。','People breathe out CO₂ while outdoor air dilutes it. Occupancy, activity, openings to nearby spaces and meeting duration all change the curve. A reading just after people arrive has a different meaning from one after a long meeting. A single peak does not establish the outdoor airflow.'],
   ['室温正常时也可能需要查新风，因为循环送风与室外空气是不同来源。我们同步查看人员进入和离开、新风指令与反馈、机组开停，以及测点是否靠近送风口、门或人员呼吸区。','A room can hold a comfortable temperature and still need an outdoor-air check. Recirculated supply and outdoor air are different parts of the system. We line up arrivals and departures, outdoor-air commands and feedback, plant operation and the sensor position relative to diffusers, doors and occupants.']
  ],
  evidence:[
   [['满员后持续上升','CO₂ keeps climbing after the room fills'],['人数增加、会议较长或新风供给偏低','More people, longer occupancy or low outdoor airflow'],['对照时段、实际人数与设计或调试资料。','Compare timing and headcount with design or commissioning records.']],
   [['隔壁两间也在同一时段升高','Adjacent rooms rise in the same period'],['共用机组或计划时段异常','Shared plant or schedule issue'],['比对其他分区、新风指令与机组运行状态。','Check other zones, outdoor-air commands and plant state.']],
   [['固定探头与对照读数相差大','Fixed sensor disagrees with a comparison reading'],['位置影响、偏差或记录时钟错位','Siting effects, sensor bias or misaligned clocks'],['协调测点和时间，再请暖通人员核对准确性。','Align locations and clocks before arranging a sensor accuracy check.']]
  ],
  methods:[
   [['先确认读数与运行逻辑','Confirm readings and control sequence'],['测点不合理或控制反馈异常时，先核对探头、时间、占用程序和指令响应。','If siting or feedback looks wrong, check the sensor, timing, occupancy programme and response to commands.']],
   [['核验实测新风并评估当前用途','Measure outdoor airflow and review current use'],['当趋势持续指向通风不足，安排暖通人员在代表性负荷下验证新风量及分配，并对照房间现行用途和人数。','If trends continue to point to low ventilation, arrange outdoor airflow and distribution checks under representative conditions and compare with current room use and occupancy.']]
  ],
  judgement:{heading:['比较同一房间在相近工况下的走势','Compare the same room under similar conditions'],body:[
   ['我们会用满员会议与较少人员的会议作对照，记录门状态和会议散场后的变化。若调风后房间人数恰好减少，读数降低不能单独归因于维修。需要有代表性的人员和机组状态才能验收。','We compare a full meeting with a smaller one, recording the door state and what happens once people leave. A lower reading after changes may reflect fewer people. Verify the outcome with representative occupancy and plant operation.'],
   ['二氧化碳能帮助追踪人员呼出的空气在室内累积的程度。其他污染来源和空气质量问题需要另行检查。','CO₂ helps trace the build-up of air exhaled by occupants. Other pollutant sources and indoor air quality issues require separate checks.']
  ]},
  verification:[['交接保存人数、时间、测点、室外对照、机组状态和相关实测结果。改动后记录占用工况、门与系统状态及与原曲线的差异。','File occupancy, timing, sensor locations, the outdoor comparison, plant state and measured results. After work, record occupancy, door and system state and how the trend compares with the original.']],
  faq:[
   [['低读数能说明新风达标吗？','Does a low reading prove adequate ventilation?'],['空房或使用时间很短时读数也可能低。应结合实际人数、时间和新风实测。','An empty room or short meeting can also show a low reading. Interpret it alongside occupancy, duration and airflow measurements.']],
   [['把空调温度设低能解决吗？','Will a colder setpoint fix it?'],['需要检查系统实际引入的室外空气。改变温度设定不一定增加新风。','Check how much outdoor air the system actually brings in. A colder setpoint may leave that unchanged.']]
  ],
  related:['uneven-hvac-zones','occupancy-sensor-lighting-controls'],
  visuals:artwork(['把人数、时序和设备状态对上','Line up occupancy, timing and plant state'],[
   [['实际人数','Occupancy'],['满员 / 部分人员','Full / partly occupied']],
   [['测量条件','Measurement'],['室内测点 / 室外基线','Room reading / outdoor baseline']],
   [['新风运行','Outdoor air'],['机组 / 风阀反馈','Plant / damper response']]
  ],['温度正常时，仍需单独核对新风。','A comfortable temperature still leaves outdoor airflow to check.'],[
   [['满员持续上升','Rise during full occupancy'],regional('scene-cbd-inner')],
   [['相邻房间同时升高','Several rooms rise together'],technical('hvac-rooftop')],
   [['固定探头读数偏离','Sensor readings disagree'],regional('detail-hvac-technician')]
  ],[regional('detail-hvac-technician'),service('specialist-hvac-wide-v2')],[
   [['工况','Conditions'],['人数、门状态和占用时长','Occupancy, door state and duration']],
   [['测点','Readings'],['室内趋势、室外对照及实测','Room trend, outdoor comparison and measured airflow']],
   [['设置','Controls'],['机组及新风控制点','Plant and outdoor-air controls points']]
  ])
 },
 {
  slug:'fire-rated-service-penetrations',category:'fire',colour:'orange',image:regional('scene-south-east'),
  title:['管线穿过防火分隔：\n核对改造后的封堵系统','Service penetrations:\nChecking firestopping after alterations'],
  summary:['新增线缆、换管和拆除旧服务后，我们按实际墙板、开口和穿越物来核对封堵。封堵表面完整，只是检查的一部分。','After cables are added, pipes replaced or redundant services removed, we check firestopping against the actual barrier, opening and services passing through it. Surface appearance is one part of the inspection.'],
  keywords:[['防火分隔','Fire separation'],['贯穿封堵','Penetration seals'],['系统核对','System matching']],
  mechanism:[
   ['墙或楼板的耐火表现取决于构造连续性，管线开口是其中一个薄弱点。封堵与基材种类、孔边间距、穿越物及其材料一起工作。塑料管受热可能软化并留下开口，金属管则可能把热量传到分隔另一侧。','A fire-resisting wall or floor depends on continuity, and service openings interrupt it. The seal works with the substrate, clearance around the opening and the services that pass through it. Plastic pipe can soften and leave an opening, while metal pipe can carry heat to the other side.'],
   ['加线、换管或改用另一种托盘后，即使补了外露的胶，开口构造也已经变化。我们先核对防火分隔位置和该点位的记录，然后请专业人员把现状与适用的封堵系统资料逐项对照，包括安装方向与可见深度。','Adding cables, replacing pipes or changing a tray alters the opening even if the visible seal is topped up. We first identify the barrier and its record, then have the current assembly checked against the applicable firestop documentation, including orientation and visible seal depth.']
  ],
  evidence:[
   [['新增电缆挤在原封堵边缘','New cables crowd the edge of an old seal'],['开口填充和间隙已变','Changed fill or clearances'],['对比改造前记录、实际穿越物及开口几何。','Compare prior records with current services and opening details.']],
   [['孔洞有色胶但无对应资料','Coloured sealant with no matching records'],['安装资料未能确认系统','Installed system cannot yet be identified'],['核对编号、构造资料和可见系统标识。','Check the location ID, assembly records and visible product marks.']],
   [['拆管后留下空套管','An empty sleeve remains after pipe removal'],['空置开口和原安装条件不同','A vacant opening differs from the original configuration'],['记录墙板、套管和开口，交相关人员安排评估。','Record the barrier, sleeve and opening and refer for specialist assessment.']]
  ],
  methods:[
   [['先补齐点位和系统证据','Identify the location and installed system'],['记录足够且现状可核实时，由合适人员核对结构、穿越物及安装范围，补齐现场留档。','Where records and site access allow confirmation, check the barrier, services and installed detail and complete the site record.']],
   [['按当前组合设计修复','Specify the repair for the current configuration'],['无法确认或现状已更改时，由专业人员选定适用做法。若没有合适匹配，先澄清技术方案再施工。','If the installation cannot be confirmed or the configuration has changed, obtain a specialist repair scope. Resolve any mismatch before work proceeds.']]
  ],
  judgement:{heading:['检查对象是整个贯穿构造','Inspect the complete penetration assembly'],body:[
   ['同一层同一种颜色的封堵胶可能用于不同构造。我们把记录建立到单个贯穿点，写清墙或楼板类型、管线材质和数量、支撑情况、可从哪些侧面核对。','Two openings on the same level may have the same sealant colour and different construction. We record each penetration individually, with barrier type, service materials and quantities, supports and the sides available for inspection.'],
   ['若吊顶或箱体遮挡了一侧，记录时注明。外观检查仅涵盖可见范围。需要拆检、防火性能核对或对未知材料采取措施的工作，由相应人员安排。','Record any side obscured by a ceiling or enclosure. A visual inspection covers the accessible detail. Leave opening up, fire performance assessment and work on unidentified materials to the appropriate specialists.']
  ]},
  verification:[['归档贯穿点编号、分隔位置、穿越物、适用系统文件、封闭前后照片和检查人。把不在本次核验范围的点位列入后续记录，并保持编号与平面图一致。','Keep each penetration ID, barrier location, services, applicable system documentation, photos before and after closing up, and who checked it. List locations outside the scope and match their IDs to the plan.']],
  faq:[
   [['封堵材料颜色相同就可以补用吗？','Can we top up a seal with a product of the same colour?'],['颜色不能确认材料、基材和贯穿构造是否匹配。应以适用系统资料和现状为依据。','Colour cannot establish compatibility with the substrate and penetration assembly. Use the appropriate system evidence and the actual detail.']],
   [['旧线拆走后还有复查必要吗？','Does a penetration need checking after a cable is removed?'],['需要核对空隙和原系统状态，确认剩余组合怎么处理，并更新点位记录。','Review the opening left behind and the original system. Confirm how the remaining configuration is treated and update the record.']]
  ],
  related:['fire-door-latching-and-access','partition-head-movement'],
  visuals:artwork(['先确认分隔，再识别每个贯穿点','Identify the barrier and each penetration'],[
   [['分隔类型','Barrier type'],['墙 / 楼板','Wall / floor']],
   [['穿越物','Service type'],['管道 / 线缆与托盘','Pipe / cables and tray']],
   [['改造记录','Alteration record'],['既有 / 新增或拆除','Existing / added or removed']]
  ],['保留封闭前影像，便于复查可见构造。','Record the accessible assembly before it is closed up.'],[
   [['新增线缆','Added services'],service('gallery-fit-outs-make-good-work')],
   [['资料待核对','Assembly records to verify'],service('specialist-building-partition')],
   [['拆管留孔','Opening after removal'],service('gallery-plumbing-work-v2')]
  ],[regional('scene-south-east'),service('gallery-fit-outs-make-good-work')],[
   [['点位','Location'],['贯穿编号和防火分隔','Penetration ID and fire separation']],
   [['配置','Configuration'],['穿越物、开口与适用系统','Services, opening and applicable assembly']],
   [['归档','Records'],['现场影像、检查人和待复核项','Site photos, checker and unresolved items']]
  ])
 },
 {
  slug:'tree-root-footpath-lifting',category:'landscape',colour:'lime',image:service('gallery-landscaping-irrigation-before'),
  title:['树旁步道起拱：\n区分根系、基层与排水','Raised footpaths beside trees:\nRoots, base and drainage'],
  summary:['步道高差出现在树旁时，我们一起检查抬升区、相邻沉降与径流，找出保护树木和恢复通行兼顾的维修边界。','Where a footpath changes level beside a tree, we check uplift, adjacent settlement and runoff together to set a scope that protects the tree and restores access.'],
  keywords:[['树根生长','Root growth'],['步道高差','Footpath level changes'],['基层支撑','Base support']],
  mechanism:[
   ['树根与铺面之间的冲突受树种、空间、土壤和水分共同影响。根系生长可能抬高板边，也可能因旁边的地基沉陷，造成另一侧看起来凸起。湿区基层支撑不足时，同一条步道还可能出现摇动或重复错台。','Tree and pavement conflicts depend on the species, available soil space and moisture as well as the pavement. Growing roots can lift an edge, while settlement beside it can make the adjoining panel look high. In a wet area, poor base support can also let part of the path rock or repeatedly change level.'],
   ['我们从建筑入口到树池外侧连续记录高差和积水，不只拍最大的一道接缝。再由相关人员确定是否需要更详细的根系调查。根的位置与其对树木稳定性的作用不能靠表面高差判断。','We record levels and standing water along the route from the entrance past the tree bed, as well as the largest step. The appropriate specialists can then decide whether root investigation is needed. A surface level change does not reveal which roots are present or what they do for tree stability.']
  ],
  evidence:[
   [['隆起集中在树池一侧','Heave is concentrated beside the tree bed'],['根系或局部构造顶起','Root growth or local uplift'],['查接缝走向、相邻板高度和树池边界。','Check the joint pattern, adjoining levels and tree-bed edge.']],
   [['远离树干的一侧下陷','Surface sinks further from the trunk'],['基层流失、压实不足或排水影响','Loss of base, poor support or drainage effects'],['记录水流路径、摇动区与低洼范围。','Record flow paths, rocking panels and the limits of the depression.']],
   [['修平后同一处再次错台','The same step returns after levelling'],['持续根系作用或基础移动','Continuing root growth or movement below the paving'],['对照原修复边界、前后照片与测点。','Compare the old repair limits, photos and level points.']]
  ],
  methods:[
   [['在明确基层和根系条件后恢复通行','Restore access after checking the base and roots'],['若高差局限且基层条件明确，安排局部铺面处理，并保护重要根系和周边排水。','Where the level change is local and base conditions are known, plan a local pavement repair that protects important roots and maintains drainage.']],
   [['调整路径及根区构造','Reconsider the route and root-zone detail'],['若冲突反复或范围扩大，可联合树艺和场地人员评估改线路、扩大根区空间或采用与现场相容的构造。','If the conflict returns or spreads, involve arboriculture and pavement specialists to assess rerouting, more room for roots or a compatible pavement detail.']]
  ],
  judgement:{heading:['先记录行人绕行，再判断可保留的铺面','Record the pedestrian route before deciding what paving to retain'],body:[
   ['排查时把人流路线、轮椅或推车经过的位置和夜间通行一起记录。临时改道要确认人能到达同一出入口。再比较高点与两侧的基本标高，避免把下沉误判为邻板被顶起。','Note the pedestrian route, wheelchair and trolley travel and how the area is used after dark. A temporary detour needs to serve the same entrances. Compare the high-looking edge with levels on both sides before deciding which slab actually moved.'],
   ['削平或换板能处理表面高差，但根和基层仍可能变化。遇到重要根系时，先由树艺人员评估其作用和损伤风险，不把切根当作常规步骤。','Grinding or replacement can remove a surface step while movement below continues. Where important roots may be involved, obtain arboricultural advice on their role and the risk of damage before considering any root work.']
  ]},
  verification:[['交接记录通行路线、测点和坡向、保护的树木及根区、排水复查结果和后续检查日期。留存相同角度照片，便于发现板缝和高差是否继续变化。','At handover, record the access route, level points and falls, tree and root-zone protection, drainage checks and the next inspection. Keep photos from the same positions to track changes at joints and edges.']],
  faq:[
   [['树旁一有高差就是树根顶起来的吗？','Is a step beside a tree always caused by roots?'],['相邻基层沉降也可形成同样的表象。需要同时查高低变化、排水和树池位置。','Settlement beside the tree can look similar. Check levels, drainage and the location of the planting area together.']],
   [['改成可渗透铺面就会永久解决吗？','Will permeable paving permanently resolve it?'],['还要考虑根区空间、基层、径流和通行要求。需要按该处条件评估。','Rooting space, base support, runoff and access still matter. Assess the detail against the local conditions.']]
  ],
  related:['irrigation-uneven-coverage','concrete-spalling-corrosion'],
  visuals:artwork(['量清高差，辨别抬升与沉降','Measure the step and distinguish uplift from settlement'],[
   [['树池边界','Tree-bed edge'],['树根 / 铺面','Roots / paving']],
   [['高差分布','Level changes'],['单缝 / 多块板','One joint / several panels']],
   [['通行水路','Access and water'],['绕行 / 排水坡向','Detour / surface falls']]
  ],['根系处置要结合树木稳定性。','Consider tree stability before deciding on root work.'],[
   [['树边隆起','Raised pavement at the tree'],service('gallery-landscaping-irrigation-before')],
   [['雨后低洼','Depression after rain'],service('problem-parking-drain')],
   [['同点反复错台','The same step returns'],regional('detail-parking')]
  ],[service('gallery-landscaping-irrigation-after'),service('specialist-landscaping-irrigation')],[
   [['标高','Levels'],['高点、低点和排水坡向','Highs, lows and drainage falls']],
   [['树区','Tree zone'],['根区保护及经确认的处理范围','Root protection and agreed work limits']],
   [['通行','Access'],['常用路线与复查点','Usual route and recheck points']]
  ])
 },
 {
  slug:'facade-fixing-galvanic-corrosion',category:'signage',colour:'pink',image:service('material-facade-metal'),
  title:['金属立面连接腐蚀：\n材料接触、积水与涂层','Corrosion around façade fixings:\nMetal contact, moisture and coatings'],
  summary:['外立面或招牌紧固点出现腐蚀时，我们查明双方材质、是否长时间受潮，以及损伤是否局限在接触区，再定修复范围。','When façade or sign fixings corrode, we identify the metals and moisture exposure and check whether deterioration is concentrated at the contact before setting the repair scope.'],
  keywords:[['电偶腐蚀','Galvanic corrosion'],['隔离垫片','Isolation washers'],['积水与盐分','Moisture and salts']],
  mechanism:[
   ['不同金属电连接并同时接触导电水膜时，可能形成电偶。某些组合中，较活泼的金属会在接触附近加快腐蚀。孔缘涂层破损，或垫片下反复积水，都会影响腐蚀集中在哪里。','Dissimilar metals can form a galvanic couple when electrically connected and bridged by a conductive film of water. In some combinations the more active metal corrodes faster near the contact. Damage to the coating at the bore or repeated wetting beneath a washer can affect where the attack concentrates.'],
   ['我们同时检查局部缝隙、排水构造和表面涂层。垫片下的腐蚀也可能由滞水和缝隙环境造成，不能只凭材料不同就下结论。表面白粉、红锈或流痕也可能来自上方构件。','We also assess crevices, drainage and the coating. Retained water and crevice conditions can account for corrosion beneath a washer even without a dissimilar-metal effect. White deposits, red rust or streaks may also have washed down from a component above.']
  ],
  evidence:[
   [['孔缘局部点蚀','Pitting concentrates around a fixing hole'],['局部涂层受损、缝隙或电偶影响','Coating damage, crevice conditions or galvanic effects'],['核对紧固件、母材、垫层与受潮轨迹。','Identify the fastener, parent metal, separating layer and moisture pattern.']],
   [['沿多条板缝出现潮痕','Moisture marks follow several panel joints'],['排水与长期受潮为共同因素','Drainage and prolonged wetting may be shared factors'],['记录痕迹起点、板缝与可能滞水区。','Map the start of the marks, joints and likely water traps.']],
   [['紧固点松动或板边变形','Fixing is loose or the panel edge has distorted'],['受力或连接截面可能受影响','Load transfer or fixing section may be affected'],['先控制下方通行，交合适人员评估连接。','Manage access below and have the connection assessed.']]
  ],
  methods:[
   [['处理经确认的局部接触问题','Correct an isolated contact problem'],['确认连接可靠且腐蚀局部时，按系统要求选兼容材料和隔离方式，同时处理局部涂层与排水。','Where the connection is sound and corrosion is local, select compatible materials and isolation to suit the assembly and address coating damage and drainage.']],
   [['扩大调查并复核连接','Investigate further and assess the fixings'],['多个固定点异常、基材损伤或荷载有疑虑时，由相应人员核对承力与材料选择，再安排更换和防水细节。','Where several fixings are affected, the substrate is damaged or load transfer is in doubt, arrange an assessment of the support and materials before specifying replacement and weatherproofing.']]
  ],
  judgement:{heading:['换紧固件前先核对连接的两侧','Check both sides of the connection before replacing a fixing'],body:[
   ['一种更耐蚀的螺栓不一定能消除整个节点的腐蚀。我们核对被连接的金属、垫片的隔离是否连续、孔内是否同样接触，以及水是否能从节点流出。','A more corrosion-resistant bolt does not by itself resolve the detail. We identify the connected metals and check whether isolation is continuous, what touches inside the hole and whether water can drain from the joint.'],
   ['可见腐蚀范围与实际受力范围也可能不同。维修记录要区分已经检查的固定点、需要打开才能确认的连接，以及临时限制的区域。','The visible corrosion and the area carrying load may differ. Record fixings actually examined, connections that need opening up and any temporary restrictions.']
  ]},
  verification:[['记录固定点编号、材质与隔离件、受潮范围、封闭前照片以及谁复核了连接和排水。把需要随风雨复查的位置列在交接单上。','Record fixing IDs, materials and isolators, moisture exposure, photos before closing up and who checked the support and drainage. Identify locations to revisit after weather exposure.']],
  faq:[
   [['用不锈钢螺丝能解决铝板孔缘腐蚀吗？','Will stainless screws resolve pitting around aluminium holes?'],['仍需核对金属接触、隔离和排水条件，以及螺丝是否适合该连接。','Check metal contact, isolation and drainage as well as whether the screws suit the connection.']],
   [['表面擦掉白粉就可以验收吗？','Can we accept the work after cleaning white deposits off?'],['还应核对沉积来源、涂层破损和连接状态，并留下复查点。','Check the source of the deposit, coating condition and connection, and identify any follow-up checks.']]
  ],
  related:['external-sign-fixings','window-wall-water-ingress'],
  visuals:artwork(['把接触面与受潮点一起标出','Map metal contact and wetting together'],[
   [['金属配对','Metal pair'],['紧固件 / 面板','Fastener / panel']],
   [['受潮条件','Moisture'],['缝隙 / 溢流','Crevice / overflow']],
   [['连接状况','Connection'],['局部点蚀 / 多点变形','Local pitting / widespread movement']]
  ],['流痕可以来自更高处，沿路径回查。','Follow streaks upwards to see where they began.'],[
   [['固定孔周边点蚀','Pitting around a fixing'],service('problem-signage-fixing')],
   [['沿板缝潮痕','Staining along panel joints'],service('material-facade-metal')],
   [['板边松动或变形','Loose or distorted panel edge'],regional('detail-facade')]
  ],[service('problem-signage-fixing'),service('specialist-signage-wayfinding')],[
   [['材料','Materials'],['母材、紧固件与隔离件','Parent metal, fixings and isolators']],
   [['现场','Site condition'],['潮痕、受检位置和封闭前照片','Wetting, checked locations and photos before closing']],
   [['复核','Checks'],['连接、排水及风雨后待复查点','Fixings, drainage and locations to recheck after rain']]
  ])
 },
 {
  slug:'partition-speech-privacy',category:'interiors',colour:'blue',image:service('specialist-building-partition'),
  title:['会议室隔音不足：\n排查门缝、吊顶与旁路','Meeting-room speech privacy:\nDoors, ceilings and flanking paths'],
  summary:['隔墙改造后邻室仍听得清谈话时，我们先找声音实际穿行的路径，再判断应修门缝、吊顶上方还是墙体接缝。','When speech still carries into the next room after a fit-out, we trace the paths it follows before deciding whether to address the door, ceiling void or partition junctions.'],
  keywords:[['语音私密性','Speech privacy'],['吊顶回风空腔','Shared ceiling plenum'],['侧向传声','Flanking transmission']],
  mechanism:[
   ['隔墙的实验室隔声表现反映特定试件，但现场声音还能经门底、共用吊顶空腔、回风路径或墙边缝绕过去。两间办公室可能墙板规格相同，却因墙顶收口或风口布置不同而表现不同。','A wall’s laboratory sound rating describes the assembly tested. On site, sound can pass under the door, through a shared ceiling void or return-air path, or around an unsealed junction. Two rooms with the same plasterboard can perform differently because of the head detail or grille layout.'],
   ['我们会从接收房间和走道两边听，并把门开闭、吊顶状态和空调运行写在同一记录里。设备背景声能影响一句话是否听清，也可以经风管和吊顶传进来。比较时要保持相近的设备状态和讲话位置。','We listen in the receiving room and the corridor, recording door position, ceiling condition and plant operation. Equipment noise can change how intelligible speech is and can itself pass through ductwork and ceilings. Comparisons need similar plant states and talker locations.']
  ],
  evidence:[
   [['靠门缝处声音明显','Sound is strongest near the door gap'],['门周边存在直接空气通路','Direct air path around the doorset'],['对照门扇闭合和门底或边缘间隙。','Compare how the door closes and the gaps at the bottom or edges.']],
   [['门已关，吊顶附近仍听得到','Speech remains audible near the ceiling with the door shut'],['共用吊顶空腔或墙顶旁路','Shared plenum or bypass at the partition head'],['对照隔墙是否到结构板、上方回风和相邻吊顶布置。','Check whether the wall reaches the slab, how return air moves and the adjoining ceiling layout.']],
   [['靠风口的两间房互相听见','Rooms hear each other near grilles'],['回风或风管串声','Cross-talk via return air or ductwork'],['用受控声源和一致设备状态对照各测点。','Compare locations using a controlled source and consistent plant operation.']]
  ],
  methods:[
   [['完善门组与局部收口','Improve the doorset and local seals'],['对已定位的直接通路，评估门周边、板缝及穿越口是否可用适配的做法处理。仍需保留门组的既有安全与通行功能。','For a confirmed direct path, assess suitable treatments for the door perimeter, joints and penetrations. Preserve the doorset’s required safety and access functions.']],
   [['联合处理吊顶或空调旁路','Address ceiling or air-system paths together'],['吊顶空腔或风管传声占主导时，与声学及暖通人员核对隔声、回风、消防和检修条件，再定墙顶或风管的局部改造。','Where the plenum or duct dominates, review acoustic, return-air, fire and maintenance requirements with the relevant specialists before altering the wall head or ductwork.']]
  ],
  judgement:{heading:['隔墙加厚前，先看声音是否绕行','Look for a bypass before upgrading the partition'],body:[
   ['从同一讲话位置对比靠门、墙中和风口，可以帮助决定优先调查的路径。若墙中不突出而门底或吊顶明显，先复核可接近的旁路，必要时请声学人员测量。','Compare the door, middle of the wall and grilles using the same talker position. If the door gap or ceiling stands out, investigate those accessible paths before changing the wall, with acoustic measurements where needed.'],
   ['不能为改善隔声而随意封堵回风口或防火分隔。现场方案要同时核对房间原用途、通风和其他约束。','Acoustic changes need to account for return-air paths and the fire separation. Check the room’s intended use, ventilation and other requirements before deciding on a treatment.']
  ]},
  verification:[['记录房间编号、声源与接收点、门和设备状态、处理的路径和仍可能传声的位置。若项目有明确私密性目标，按约定条件由适当人员复测。','Record the rooms, source and receiver positions, door and plant states, the paths treated and any remaining suspected routes. Where the project has a defined privacy target, arrange a suitable retest under the agreed conditions.']],
  faq:[
   [['贴吸音板会让隔壁听不见吗？','Will adding absorptive panels make speech inaudible next door?'],['吸音板能改变本室混响。跨房间的表现仍取决于墙、门和旁路。','Absorption changes reverberation in the room. Sound reaching the next room still depends on the wall, doors and bypass paths.']],
   [['听不清词就能说明问题已经解决吗？','Does indistinct speech prove the issue is resolved?'],['背景声和说话位置会影响结果。用可重复条件核对实际目标。','Background noise and talker position affect intelligibility. Check the agreed target under repeatable conditions.']]
  ],
  related:['partition-head-movement','meeting-room-carbon-dioxide-ventilation'],
  visuals:artwork(['找声音穿行的路径','Trace the path the sound takes'],[
   [['门周边','Door perimeter'],['门底 / 边缝','Threshold / perimeter gaps']],
   [['吊顶上方','Ceiling void'],['墙顶 / 共用空腔','Partition head / shared plenum']],
   [['风口串声','Air paths'],['回风口 / 相邻房间','Return grille / adjoining room']]
  ],['同一声源位置下比较门、墙中和风口。','Compare the door, wall and grille with the source in the same place.'],[
   [['门缝附近明显','Louder near the door gap'],regional('detail-door')],
   [['吊顶旁路','Possible ceiling bypass'],service('gallery-fit-outs-make-good-work')],
   [['风口串声','Possible cross-talk at grilles'],service('problem-hvac-filter')]
  ],[service('specialist-building-partition'),service('gallery-fit-outs-make-good-work')],[
   [['位置','Rooms'],['声源、接收点与可疑路径','Source, receivers and suspect paths']],
   [['条件','Test conditions'],['门状态、通风及背景声','Door state, ventilation and background noise']],
   [['复测','Recheck'],['处理范围与验收目标','Work limits and agreed privacy target']]
  ])
 },
 {
  slug:'ceramic-floor-tile-debonding',category:'floors',colour:'orange',image:service('gallery-fit-outs-make-good-work'),
  title:['商业地砖空鼓：\n从响应差异排查粘结层','Hollow-sounding floor tiles:\nAssessing the bond and substrate'],
  summary:['同一层地砖的敲击声不一致时，我们用网格标出变化，再比较松动、裂纹、边界以及基层和胶层的状态。','When tiles sound different across one floor, we grid the variation and compare it with movement, cracking, boundaries and the condition of the bond and substrate.'],
  keywords:[['地砖空鼓','Hollow sounding tiles'],['粘结界面','Bond interface'],['基层位移','Substrate movement']],
  mechanism:[
   ['敲击时的声音随砖、胶层和下面构造的支撑变化。粘结不连续或界面脱开会改变振动，但砖尺寸、边缘、下面的膜层和空腔也会影响声音。我们在同一区域比较同类地砖，把声音变化用作圈定检查范围的线索。','The sound from a tap changes with the tile, bond and support below. Gaps or separation can alter vibration, but tile size, edges, a membrane or a void underneath also affect the response. We compare like tiles in the same area and use changes in sound to guide the inspection.'],
   ['当板缝、门口或基层接缝附近同时出现裂纹和响声变化时，我们会查图纸和维修记录，判断是否有持续位移。若安排局部打开，可用两侧粘结材料留存的位置辨别脱开在哪一层。','Where cracking and a changed response occur near a threshold or substrate joint, we check drawings and repair records for ongoing movement. A targeted opening, where justified, can show the interface that separated by revealing which faces retain adhesive.']
  ],
  evidence:[
   [['单砖角部声音不同但无松动','One corner sounds different with no movement'],['边界变化或局部支撑不均','An edge effect or uneven local support'],['对照相邻同款砖和边缘位置，标出范围。','Compare similar tiles nearby and map the response relative to edges.']],
   [['沿基层接缝连续空响并开裂','Hollow response and cracking run along a substrate joint'],['接缝位移或连续粘结缺陷','Joint movement or a continuous bond defect'],['复核原构造、砖缝走势与此前修补范围。','Check the assembly, joint pattern and previous repair limits.']],
   [['脚踩可动，砖边翘起','A tile moves underfoot or its edge is raised'],['可能失去有效粘结，影响通行','Possible bond loss affecting safe access'],['先控制通行，确认活动范围与相邻砖状态。','Manage access and check which tiles move and the condition around them.']]
  ],
  methods:[
   [['按验证过的范围局部换铺','Replace tiles within a confirmed local boundary'],['适合范围有限且基层状态和位移条件已经明确的情况。选相容系统，并对照邻区接缝和表面高度。','Suitable where the affected extent is small and substrate and movement conditions are understood. Use a compatible system and check joints and surface levels against the adjoining floor.']],
   [['调查连续性缺陷再修复','Investigate a widespread fault before reinstating'],['空响、裂纹或松动成片分布时，先查基层、层间状态和接缝功能。根据缺陷范围决定局部扩大或重做该分区。','Where the response, cracking or movement is widespread, investigate the substrate, bond interfaces and joint function first. Use the findings to decide whether to extend the repair or reinstate the affected zone.']]
  ],
  judgement:{heading:['空响图是调查工具，松动砖要单独标出','Map the sound response and mark moving tiles separately'],body:[
   ['我们将测点分成声音异常、开裂、实际移动和相邻正常区，现场注明砖型及基层变化。若空响主要在某个构造边缘，没有相应的松动或裂纹，复核范围与抽查方式要按现场风险决定。','We map changes in sound, cracks, movement and comparable areas separately, noting tile type and changes below. If the different sound stays near an assembly edge without movement or cracking, the need and extent of invasive checks depend on the risk and the detail.'],
   ['复铺后只敲一次不能替代基层和工序记录。若原问题跟使用、潮湿或温度变化有关，应保留相同工况的后续复查点。','One sounding check after laying cannot replace the substrate and work records. If use, moisture or temperature was involved, retain follow-up points for comparable conditions.']
  ]},
  verification:[['保存网格、伸缩或控制缝位置、局部打开时的层间照片、处理范围及养护条件。通行恢复前核对接缝、收口和实际高差。','Keep the grid, movement-joint locations, photos of the interfaces exposed, repair limits and curing conditions. Check joints, transitions and actual level differences before reopening the floor.']],
  faq:[
   [['声音空就一定要全部拆掉吗？','Does a hollow sound mean the floor needs removal?'],['先看声音分布、实际松动和基层构造。具体范围由证据和通行风险决定。','Check the pattern, tile movement and substrate assembly first. Evidence and access risk determine the scope.']],
   [['重新填缝可以处理松动吗？','Will regrouting repair a tile that moves?'],['需要先查砖为何移动。填缝无法确认基层支撑或恢复失效的粘结。','First find why the tile moves. Grout does not establish substrate support or restore a failed bond.']]
  ],
  related:['resilient-floor-moisture','tree-root-footpath-lifting'],
  visuals:artwork(['把声音、开裂和实际移动分开标注','Map sound, cracking and movement separately'],[
   [['响声分布','Sound pattern'],['单角 / 连续区域','One corner / continuous area']],
   [['基层条件','Substrate'],['接缝 / 下部支撑','Joint / underlying support']],
   [['通行状态','Pedestrian access'],['平整 / 活动或翘边','Level / moving or raised']]
  ],['脚踩可动的砖应单独标记。','Mark tiles that move underfoot separately.'],[
   [['角部声音不同','Different response at a corner'],service('gallery-fit-outs-make-good-complete')],
   [['异常沿基层接缝','Pattern follows a substrate joint'],service('gallery-fit-outs-make-good-work')],
   [['边缘影响通行','Edge affects walking route'],regional('detail-showroom')]
  ],[service('gallery-fit-outs-make-good-work'),service('gallery-fit-outs-make-good-complete')],[
   [['范围','Extent'],['网格、空响、裂缝与活动点','Grid, sound, cracks and moving points']],
   [['基层','Substrate'],['明确的界面和修补边界','Confirmed interface and repair limits']],
   [['验收','Acceptance'],['养护、收口和通行面状况','Curing, finish transitions and walking surface']]
  ])
 },
 {
  slug:'window-condensation-diagnosis',category:'doors',colour:'blue',image:service('material-facade-glass'),
  title:['商业窗面结露：\n区分室内水珠与中空玻璃雾化','Window condensation:\nSurface droplets and fogged glazing'],
  summary:['窗上有水珠时，我们先确认水出现在哪一面，再对照清晨、室内湿度和玻璃边缘温度，区分结露、夹层雾化与雨水渗漏。','When glass looks wet, we first identify the affected surface and compare timing, indoor moisture and edge temperature to distinguish surface condensation, misting between panes and rain entry.'],
  keywords:[['玻璃边缘','Glass edge'],['露点','Dew point'],['中空玻璃','Insulated glazing']],
  mechanism:[
   ['空气接触比自身露点更冷的窗面，水汽就可在表面凝结。玻璃边缘与窗框常比中部更冷，局部水珠会先在这些位置显现。室内湿度、窗边气流和遮挡也会改变结果。','Water vapour can condense on a window surface that is colder than the surrounding air’s dew point. The glass edge and frame can be colder than the centre, so moisture may show there first. Indoor humidity, airflow and items blocking that airflow can change the pattern.'],
   ['我们记录湿迹在哪一面以及是否能轻擦去。若双层玻璃之间持续雾化，从两侧都无法擦去，需评估玻璃单元。若窗头、内墙或窗台出现水线并紧随风雨，再查窗墙接缝和排水。','We record which face is wet and whether the moisture wipes away. Persistent mist between panes that cannot be cleaned from either face calls for an assessment of the glazing unit. Water tracks at the head, wall or sill that follow wind-driven rain warrant a junction and drainage check.']
  ],
  evidence:[
   [['冷晨室内一侧可擦水珠','Wipeable droplets on the room side on cold mornings'],['冷表面遇到较湿室内空气','Cold surface exposed to moist room air'],['对照玻璃边、中心、室内温湿度和运行时段。','Compare edge and centre conditions with room temperature, humidity and timing.']],
   [['雾层夹在玻璃之间','Misting persists between glass panes'],['中空玻璃单元可能进湿','Moisture may have entered the insulated unit'],['确认两侧表面均不能擦除，记录玻璃及窗框标识。','Check whether it remains after wiping both faces and note the glass and frame identification.']],
   [['迎风雨后窗边墙面先湿','The surrounding wall wets first after driving rain'],['外部接口入水或排水受限','Water entry at the junction or restricted drainage'],['对照上游水线、风向与降雨时间。','Compare upstream marks, wind direction and rain timing.']]
  ],
  methods:[
   [['先改善确认的室内结露因素','Address confirmed room-side condensation factors'],['核对湿源、运行时段和窗边气流，必要时安排暖通及窗体专业评估比较室内因素和冷边温度。','Check moisture sources, operating schedule and airflow at the window. Where needed, arrange ventilation and glazing assessment to distinguish room conditions from cold edge temperatures.']],
   [['按故障位置检查玻璃单元或外部接口','Assess the glazing unit or junction as indicated'],['夹层持续雾化时查玻璃单元与边封。与风雨相关时调查外部接缝和排水，依据证据分别定维修。','Investigate the glazing unit and edge seal for persistent inter-pane misting. For rain-linked wetting, check the external junction and drainage. Scope the work to the evidence.']]
  ],
  judgement:{heading:['在窗面第一次出现湿迹时记录','Record the first wetting rather than the final puddle'],body:[
   ['窗台积水可以是窗上水珠汇下来，也可能沿构造流入。我们在相同窗型中找一扇没有异常的对照窗，比较朝向、边框、窗帘或隔板及设备状态，再回看最早的水迹。','A wet sill can collect water from glass condensation or receive water from the assembly. We compare an unaffected window of the same type, noting aspect, frame, blinds or partitions and plant state, then trace where the first marks appeared.'],
   ['用湿度或玻璃温度作比较时，尽量保留同一时段的记录。单次干燥工况无法复现冷晨结露，也不能排除风雨时才出现的路径。','Where humidity and glass temperature are relevant, record them at the same time. A single dry visit may miss cold-morning condensation or a pathway that opens during wind-driven rain.']
  ]},
  verification:[['按窗编号保留湿迹所在面、第一次出现时间、室内外条件、玻璃或接口处理范围及冷晨或风雨复查安排。','For each window, keep the affected face, onset time, indoor and outdoor conditions, glazing or junction repair scope and any planned check in cold-morning or wet weather.']],
  faq:[
   [['两层玻璃之间起雾能从室内擦掉吗？','Can mist between the panes be wiped off indoors?'],['若确认水汽在封闭夹层内，擦拭室内表面不能触及，需检查玻璃单元。','If the moisture is inside the sealed space, wiping the room face cannot reach it. Have the glazing unit checked.']],
   [['为什么只有玻璃下缘结露？','Why is there condensation only at the bottom edge?'],['该处温度可能与中心不同，也受室内气流影响。对照同一时间的边缘温度、湿度和中心状态。','The edge may be cooler than the centre, and local airflow can also matter. Compare edge temperature, humidity and the centre at the same time.']]
  ],
  related:['window-wall-water-ingress','meeting-room-carbon-dioxide-ventilation'],
  visuals:artwork(['先确认是哪一面湿','Identify which surface gets wet first'],[
   [['湿迹所在面','Affected face'],['室内 / 玻璃夹层','Room face / between panes']],
   [['出现时刻','Timing'],['冷晨 / 风雨后','Cold morning / after driving rain']],
   [['构造位置','Location'],['玻璃边 / 窗墙接缝','Glass edge / window-to-wall junction']]
  ],['窗台水迹要回查最早出现的位置。','Trace water on the sill back to the first wet spot.'],[
   [['室内水珠','Droplets on the room face'],regional('scene-cbd-inner')],
   [['夹层雾化','Misting inside the unit'],service('material-facade-glass')],
   [['风雨后墙边先湿','Wall wets first after driving rain'],technical('window-sill')]
  ],[service('material-facade-glass'),regional('detail-sealing')],[
   [['窗位','Window'],['窗编号与湿迹所在面','Window ID and wet surface']],
   [['工况','Conditions'],['湿度、玻璃边缘和风雨时间','Humidity, glass edge and rain timing']],
   [['后续','Follow-up'],['已处理位置和待观察工况','Work limits and conditions still to check']]
  ])
 },
 {
  slug:'commercial-storm-make-safe',category:'urgent',primary:'roofing-waterproofing',secondary:'building-maintenance',
  colour:'lime',image:regional('detail-roof'),
  title:['风暴后屋面与外墙受损：\n临时隔离、检查和恢复','Storm-damaged buildings:\nMaking safe and planning recovery'],
  summary:['暴风雨后发现松动外装、屋面破口或吊顶变形时，我们把落物区、安全通行和后续修复分开记录，再安排有条件的检查。','When a storm leaves loose cladding, a roof opening or ceiling movement, we record falling-object zones, safe access and permanent repairs separately before arranging an inspection.'],
  keywords:[['风载损伤','Wind damage'],['落物隔离','Falling-object exclusion'],['恢复边界','Reopening boundary']],
  mechanism:[
   ['风雨后看到的损伤可能来自风压、飞散物冲击或水进入建筑的连锁影响。外装有缺口时，相邻连接和支撑也可能受损。受潮吊顶的状态应与屋面破口分开核对。','Damage after a storm may begin with wind pressure, debris impact or water entering the building, with effects elsewhere. A gap in the exterior can be accompanied by damage to adjoining fixings or supports. A wet ceiling needs its own assessment alongside the roof opening.'],
   ['我们先用平面图和从安全位置取得的照片标出异常，并把物业当前使用方式一起记录。损伤区下方的常用步道、雨后室内通道和屋面检查位置都有不同的进入条件，不能用一处外观判断全场安全。','We map visible damage using a plan and photos taken from safe positions, and note how the property is being used. The path below, the indoor route after rain and any roof access point have different risks. A view of one elevation does not establish conditions across the site.']
  ],
  evidence:[
   [['外装或招牌在风中移动','Cladding or a sign moves in the wind'],['连接松动或邻接支撑损伤','Loosened fixing or damage to adjoining support'],['控制下方通行，记录移动范围并安排专业检查。','Keep people clear below, record the extent of movement and arrange specialist assessment.']],
   [['屋面破口旁继续进水','Water continues to enter near a roof opening'],['外层失去连续性或上游来水','Loss of weather protection or water arriving from upslope'],['安全位置记录水线、破口及相邻系统。','Record water marks, opening and adjacent systems from safe locations.']],
   [['吊顶鼓胀或变形','Ceiling sags or bulges'],['衬板或悬挂系统受损，可能有积水','Possible lining or suspension damage and retained water'],['限制下方进入，由相关人员核对支撑和电气条件。','Restrict access below and have supports and electrical conditions assessed.']]
  ],
  methods:[
   [['先隔离并安排临时保护','Isolate the area and arrange temporary protection'],['在持续风雨或落物风险未解除时，先安排绕行和分区隔离。临时保护由适当人员在现场条件允许时实施，并写明适用时限和复查条件。','While weather or falling-object risk persists, arrange detours and exclusion zones. Have appropriate personnel provide temporary protection when conditions allow, with clear limits and a recheck plan.']],
   [['分区核验后恢复通行','Verify by zone before reopening'],['相关专业人员审核构造、服务和通行后，区分可开放、临时开放和仍封闭区域。永久维修按核实的损伤、连接和进水范围落实。','Once the structure, services and access have been checked, identify areas that can reopen, can operate with temporary restrictions or must stay closed. Scope permanent repairs to confirmed damage, fixings and water entry.']]
  ],
  judgement:{heading:['记录临时措施适用的范围和时限','Record what temporary protection covers and for how long'],body:[
   ['一处遮挡可以减轻入雨，却不能证明原连接、吊顶或受潮设备已达到恢复条件。交接时我们会把用于减少进一步损伤的措施，与恢复通行和永久修理的批准事项分列。','Temporary covering may reduce incoming rain while leaving the fixings, ceiling or wet equipment to be checked. We record measures to limit further damage separately from decisions about access and permanent repair.'],
   ['出现再次大风、临时保护变动、新水迹或外装继续移动时，按现场安排复核。记录未能安全检查的侧面和区域，让下一位人员从同一张图继续。','Arrange a recheck if strong wind returns, protection shifts, new water marks appear or the exterior keeps moving. Record the elevations and zones that could not be safely checked so the next person has the same plan.']
  ]},
  verification:[['记录时间、区位、临时控制负责人、复查触发条件及可开放路线。把屋面和外墙复核、水受影响区域检查、临时措施及永久工作分别归档。','Record the time, locations, person responsible for temporary controls, triggers for reinspection and routes that can open. File roof and façade checks, wet-area checks, temporary controls and permanent works separately.']],
  faq:[
   [['雨停了就能开放下方通道吗？','Can the path below reopen once the rain stops?'],['应先确认上方落物、构造和通行风险已由适当人员复核。','Have the overhead, structural and access risks checked before reopening.']],
   [['临时遮挡完成就可以关闭工单吗？','Can the job be closed after putting up temporary protection?'],['临时处置应保留有效范围、责任人和复查条件，待永久修复按核定范围处理。','Keep the limits, responsible person and recheck conditions on record until permanent work is scoped and addressed.']]
  ],
  related:['commercial-water-ingress','flat-roof-ponding-drainage'],
  visuals:artwork(['先划出落物和受潮范围','Map falling-object and wet areas first'],[
   [['外围','Exterior'],['松动部位 / 下方通道','Loose material / route below']],
   [['开口','Openings'],['屋面破口 / 水走向','Roof opening / water path']],
   [['内部','Interior'],['吊顶 / 电气与通行','Ceiling / electrics and access']]
  ],['从安全位置留影，再按区域安排查验。','Take photos from safe positions and organise the checks by zone.'],[
   [['外装移动','Exterior material moves'],regional('detail-facade')],
   [['屋面开口进水','Water at a roof opening'],regional('detail-roof')],
   [['吊顶有变形','Ceiling movement'],service('problem-building-ceiling')]
  ],[regional('detail-roof'),service('hero-roofing-waterproofing')],[
   [['隔离','Isolation'],['临时控制范围和可通行路线','Temporary controls and available routes']],
   [['复查','Rechecks'],['构造、服务及天气触发条件','Structure, services and weather triggers']],
   [['交付','Handover'],['处置责任与永久修复范围','Responsibility and permanent work scope']]
  ])
 }

];
