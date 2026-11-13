# 服务内容增补与逐页归属

2026-11-13。基于附件及上一份12服务/8场景蓝图，对现有页面进行增补。以远端 main 的 50575ed（保留 Vercel 输出目录修复）为基础，独立分支 codex/service-content-refinement；不合并main、不部署。

## 实际修改的主题

| ID | 现有 URL | 本次内容 |
|---|---|---|
| S02 | /services/roofing-waterproofing/ | 保留原屋顶、防水及修复正文；补天沟/落水管、下游雨水分工、F10、S11恢复内链及屋面询盘。 |
| S03 | /services/electrical-lighting/ | 保留原电气正文；补反复故障、配电维修/新增负荷、照明线路与运营交接；合并F11、加入F12、保留非营业时间问题，使用电气专属CTA。 |
| S04 | /services/plumbing-drainage-gas/ | 保留原水管正文；独立展开隐藏查漏、污水/雨水、热水、燃气及交接。热水/燃气共用H2重新明确，FAQ合并堵塞/管损并加入管线和热水维修决策，使用水管专属CTA。 |
| S05 | /services/hvac-building-systems/ | 保留原通风、楼控及设备正文；补系统核对、清洁/运行检查、温控与进场交接；增强维护问答并加入系统范围问题，CTA明确维护而非安装。 |
| S06 | /services/fire-security-access/ | 原消防、门禁及其3道FAQ保持；只在安防下补监控安装/维护/系统检查及F17，使用系统维护CTA。 |
| I02 | /sectors/retail-shopping-centres/ | 原4段与3道FAQ保留；补店铺灯具/温控与开闭店窗口，新增S03/S05正文内链。 |
| I08 | /sectors/commercial-common-areas/ | 原4段与3道FAQ保留；补共用照明、供电、共享管线和工单交接，新增S03/S04正文内链。 |

其余7个服务和6个场景正文记录保持；全部80个原主题段落的中英文正文逐字保留，仅S04一个H2扩展为热水与燃气。首页、导航、URL、3D与滚动逻辑、素材和新闻正文保持；样式仅增加H3子段落的分隔与排版。

## 20主题关键词与标题/内链表

### S01 · 保留

- URL：/services/building-maintenance/
- 主词：commercial building maintenance Melbourne
- 中文H1：墨尔本商业建筑维护与日常维修
- English H1：Commercial Building Maintenance & Repairs in Melbourne

| H2 中文 | H2 English | 下属 H3 中英文 |
|---|---|---|
| 计划维护与突发建筑维修 | Planned Maintenance and Reactive Building Repairs | — |
| 门、墙面、吊顶与日常设施修理 | Repairs to Doors, Walls, Ceilings and Everyday Fixtures | — |
| 商业木工、固定柜体与局部涂装修补 | Commercial Carpentry, Joinery and Painting Repairs | — |
| 围绕运营安排多项维修 | Coordinating Repair Lists Around Your Business Operations | — |

| FAQ 中文 | FAQ English |
|---|---|
| 商业建筑维护具体包含哪些维修？ | Which repairs are included in commercial building maintenance? |
| 能否为楼宇安排定期维护？ | Can you arrange a recurring maintenance programme for our building? |
| 单次维修或多项小维修是否承接？ | Can we book a one-off repair or a list of small jobs? |

相关服务/场景卡片：S02、S12、S03。正文内链：H2-1 —；H2-2 —；H2-3 S12；H2-4 S02。

### S02 · 增补

- URL：/services/roofing-waterproofing/
- 主词：commercial roof repairs Melbourne
- 中文H1：墨尔本商业屋顶维修、防水与建筑修复
- English H1：Commercial Roof Repairs, Waterproofing & Remedial Works in Melbourne

| H2 中文 | H2 English | 下属 H3 中英文 |
|---|---|---|
| 屋面漏水、泛水板与箱形天沟维修 | Commercial Roof Leaks, Flashings and Box Gutter Repairs | 天沟、落水管与泛水节点维修 / Gutter, Downpipe and Flashing Repairs；衔接屋面排水与下游雨水维修 / Coordinating Roof Drainage and Stormwater Repairs |
| 屋顶露台、湿区与地下部位防水 | Waterproofing for Rooftops, Wet Areas and Below-Ground Spaces | — |
| 混凝土、接缝与受水损构件修复 | Remedial Repairs to Concrete, Joints and Water-Damaged Building Elements | — |
| 评估维修、恢复与更换方案 | Assessing Repair, Restoration and Replacement Options | — |

| FAQ 中文 | FAQ English |
|---|---|
| 如何确定商业屋顶需要维修还是更换？ | How do you decide whether a commercial roof needs repair or replacement? |
| 商业建筑哪些部位可以安排防水？ | Which parts of a commercial building can be waterproofed? |
| 防水施工与养护需要多长时间？ | How long will the waterproofing work and curing stages take? |
| 屋面排水与下游雨水管线能一起安排维修吗？ | Can roof drainage and downstream stormwater repairs be coordinated? |

相关服务/场景卡片：S04、S01、S09、S11。正文内链：H2-1 S04、S11；H2-2 —；H2-3 S01；H2-4 S09。

CTA：咨询屋面维修 ↗ / Enquire About Roof Repairs ↗；沿用原咨询入口并携带正确服务编号。

### S03 · 增补

- URL：/services/electrical-lighting/
- 主词：commercial electrician Melbourne
- 中文H1：墨尔本商业电气维修与照明维护
- English H1：Commercial Electricians & Electrical Maintenance in Melbourne

| H2 中文 | H2 English | 下属 H3 中英文 |
|---|---|---|
| 电气故障排查与供电维修 | Electrical Fault Finding and Power Supply Repairs | 反复跳闸、间歇故障与受影响回路 / Recurring Trips, Intermittent Faults and Affected Circuits |
| 配电柜、独立回路与三相电安排 | Switchboard Upgrades, New Circuits and Three-Phase Power | 配电柜维修与新增用电需求 / Switchboard Repairs and New Power Requirements |
| 办公室、店面与仓库 LED 照明 | LED Lighting for Offices, Retail Spaces and Warehouses | 照明回路、线路与供电连接修理 / Lighting Circuits, Wiring and Power Connections |
| 出口、应急照明与计划检测 | Exit Lighting, Emergency Lighting and Scheduled Testing | 营业安排、停用窗口与完成复查 / Trading Hours, Planned Interruptions and Completion Checks |

| FAQ 中文 | FAQ English |
|---|---|
| 商业现场反复供电故障如何排查？ | How do you investigate recurring power faults at a commercial site? |
| 现有办公室荧光灯可以升级为 LED 吗？ | Can existing fluorescent office fittings be upgraded to LEDs? |
| 电气工作能否安排在非营业时段？ | Can electrical work be arranged outside our normal trading hours? |
| 能否评估配电柜应该维修还是更新？ | Can you assess whether a switchboard needs repairs or an upgrade? |

相关服务/场景卡片：S06、S05、S12。正文内链：H2-1 —；H2-2 S12；H2-3 —；H2-4 S06。

CTA：获取电气工程报价 ↗ / Request an Electrical Quote ↗；沿用原咨询入口并携带正确服务编号。

### S04 · 增补

- URL：/services/plumbing-drainage-gas/
- 主词：commercial plumber Melbourne
- 中文H1：墨尔本商业水管、排水与燃气服务
- English H1：Commercial Plumbing, Drainage & Gas Services in Melbourne

| H2 中文 | H2 English | 下属 H3 中英文 |
|---|---|---|
| 漏水、卫生间与热水维修 | Commercial Plumbing Repairs for Leaks, Toilets and Hot Water | 隐藏管线查漏与设施修理 / Locating Leaks in Concealed Pipework |
| 堵塞排水、管道摄像检查与维护 | Blocked Drains, CCTV Inspections and Drainage Maintenance | 反复堵塞、管道损坏与检查范围 / Repeat Blockages, Pipe Damage and Inspection Scope；下游雨水管线与场地恢复 / Downstream Stormwater Lines and Site Reinstatement |
| 商业热水与燃气管线设备服务 | Commercial Hot Water and Gas Plumbing | 商业热水故障与维修安排 / Commercial Hot Water Faults and Repairs |
| 防倒流、混水阀与用水系统维护计划 | Planned Servicing for Backflow Devices, TMVs and Water Systems | 停水安排、增加项确认与交付记录 / Water Interruptions, Scope Changes and Handover Records |

| FAQ 中文 | FAQ English |
|---|---|
| 商业水管系统的维护周期如何确定？ | How is a suitable commercial plumbing maintenance interval decided? |
| 反复堵塞时，如何判断是堵塞还是管道损坏？ | How do you investigate repeat blockages and check for pipe damage? |
| 上门、维修和较大水管工程如何报价？ | How are call-out, repair and larger plumbing project costs quoted? |
| 受损管线如何确定局部修理还是更换？ | How do you decide whether damaged pipework should be repaired or replaced? |
| 热水设备怎样确定维修还是更换？ | How do you assess whether a hot water unit should be repaired or replaced? |

相关服务/场景卡片：S02、S05、S11。正文内链：H2-1 S01；H2-2 S02、S11；H2-3 —；H2-4 S05。

CTA：获取水管维修报价 ↗ / Request a Plumbing Quote ↗；沿用原咨询入口并携带正确服务编号。

### S05 · 增补

- URL：/services/hvac-building-systems/
- 主词：commercial air conditioning maintenance Melbourne
- 中文H1：墨尔本商业空调与楼宇设备系统维护
- English H1：Commercial Air Conditioning & HVAC Maintenance in Melbourne

| H2 中文 | H2 English | 下属 H3 中英文 |
|---|---|---|
| 计划性商业空调保养 | Scheduled Commercial Air Conditioning Servicing | 按现有空调系统类型确定维护 / Scoping Servicing for Installed Air Conditioning Systems；滤网、盘管、排水与运行检查 / Filters, Coils, Drainage and Operating Checks |
| 故障排查、维修与系统更新 | HVAC Fault Finding, Breakdown Repairs and System Upgrades | 温控、气流与间歇运行问题 / Temperature Controls, Airflow and Intermittent Operation |
| 使用中商业楼宇的机械通风 | Mechanical Ventilation for Occupied Commercial Buildings | — |
| 楼宇控制、冷水系统与机械设备 | Building Controls, Chillers and Mechanical Plant Maintenance | 结合楼宇使用的设备进场与维护交接 / Plant Access, Building Use and Servicing Handover |

| FAQ 中文 | FAQ English |
|---|---|
| 一次商业空调保养可包含哪些工作？ | What work is included in a commercial HVAC servicing visit? |
| 如何确定本物业空调的保养频次？ | How should servicing frequency be set for our air conditioning systems? |
| 计划维护与故障维修有什么区别？ | How does planned HVAC maintenance differ from a breakdown repair? |
| 哪些空调系统可以纳入本物业的维护范围？ | Which air conditioning systems can your team maintain? |

相关服务/场景卡片：S03、S04、S06。正文内链：H2-1 —；H2-2 S03、S04；H2-3 —；H2-4 S06。

CTA：咨询空调维护安排 ↗ / Request AC Servicing ↗；沿用原咨询入口并携带正确服务编号。

### S06 · 增补

- URL：/services/fire-security-access/
- 主词：fire protection services Melbourne
- 中文H1：墨尔本商业消防、安防与门禁维护
- English H1：Fire Protection, Security & Access Control in Melbourne

| H2 中文 | H2 English | 下属 H3 中英文 |
|---|---|---|
| 消防设施与安全设施维护协调 | Fire Equipment Maintenance and Essential Safety Measures | — |
| 商业监控、报警维修与设备更新 | Commercial CCTV, Alarm Repairs and Security System Upgrades | 商业监控安装、维护与系统检查 / CCTV Installation, Maintenance and System Checks |
| 员工、访客与共用入口门禁 | Access Control for Staff, Visitors and Shared Entrances | — |
| 协同检测、维护记录与交接 | Coordinated Testing, Maintenance Records and System Handover | — |

| FAQ 中文 | FAQ English |
|---|---|
| 门禁能否与现有监控和报警联动？ | Can door access control be connected to our existing cameras and alarms? |
| 商业报警反复误报如何排查？ | How can repeated false alarms at our business be investigated? |
| 停电时电子门禁会如何工作？ | How will electronic door access behave during a power failure? |
| 监控维护可以纳入物业服务计划吗？ | Can CCTV maintenance be included in our property service plan? |

相关服务/场景卡片：S03、S05、S01。正文内链：H2-1 S03；H2-2 —；H2-3 S01；H2-4 S05。

CTA：讨论系统维护范围 ↗ / Discuss System Maintenance ↗；沿用原咨询入口并携带正确服务编号。

### S07 · 保留

- URL：/services/landscaping-irrigation/
- 主词：commercial garden maintenance Melbourne
- 中文H1：墨尔本商业园林维护与灌溉维修
- English H1：Commercial Garden Maintenance & Irrigation in Melbourne

| H2 中文 | H2 English | 下属 H3 中英文 |
|---|---|---|
| 草坪、花园与室外场地定期养护 | Scheduled Lawn, Garden and Grounds Care | — |
| 绿篱修剪、杂草处理与局部更新 | Hedge Trimming, Weed Control and Garden Renewals | — |
| 灌溉故障、维修与季节设置 | Irrigation Fault Finding, Repairs and Seasonal Settings | — |
| 商业园区养护范围与维护计划 | Maintenance Plans for Commercial Sites | — |

| FAQ 中文 | FAQ English |
|---|---|
| 商业园林维护计划可包含哪些工作？ | Which tasks can be included in a commercial garden maintenance plan? |
| 如何确定商业花园的养护频次？ | How do you decide the right visit frequency for a commercial garden? |
| 能否排查灌溉故障导致的草坪干斑？ | Can you diagnose dry lawn patches caused by faulty irrigation? |

相关服务/场景卡片：S04、S11、S08。正文内链：H2-1 S11；H2-2 —；H2-3 S04；H2-4 S08。

### S08 · 保留

- URL：/services/signage-wayfinding/
- 主词：commercial signage Melbourne
- 中文H1：墨尔本商业标识安装、维修与导视
- English H1：Commercial Signage Installation & Maintenance in Melbourne

| H2 中文 | H2 English | 下属 H3 中英文 |
|---|---|---|
| 店面、楼体与接待标识安装 | Shopfront, Building and Reception Sign Installation | — |
| 发光标识、灯箱与面板维修 | Illuminated Sign, Lightbox and Panel Repairs | — |
| 导视、楼层目录与租户信息更新 | Wayfinding, Directories and Site Sign Updates | — |
| 旧牌拆除、登高与持续维护 | Sign Removal, Access Planning and Ongoing Maintenance | — |

| FAQ 中文 | FAQ English |
|---|---|
| 其他公司安装的标识可以维修吗？ | Can an existing sign be repaired even if another company installed it? |
| 标识报价需要提供哪些信息？ | What details are useful when requesting a signage quote? |
| 闪烁的灯箱是否需要整块更换？ | Can a flickering lightbox be repaired instead of replacing the whole sign? |

相关服务/场景卡片：S03、S01、S12。正文内链：H2-1 S01；H2-2 S03；H2-3 —；H2-4 S12。

### S09 · 保留

- URL：/services/facade-high-access-cleaning/
- 主词：high rise window cleaning Melbourne
- 中文H1：墨尔本高空玻璃与建筑外立面清洁
- English H1：High-Rise Window & Façade Cleaning in Melbourne

| H2 中文 | H2 English | 下属 H3 中英文 |
|---|---|---|
| 外部玻璃与窗框清洁 | Exterior Glass and Window Frame Cleaning | — |
| 覆层、抹灰与砌体外墙洗护 | Façade Washdowns for Cladding, Render and Masonry | — |
| 使用中楼宇的高处进入安排 | Access Planning for Occupied Commercial Buildings | — |
| 单次清洁与持续外立面养护 | One-Off Cleans and Scheduled Façade Care | — |

| FAQ 中文 | FAQ English |
|---|---|
| 整栋外立面清洗与外窗清洁有什么区别？ | How does a full façade washdown differ from a window clean? |
| 外立面清洁周期如何选择？ | How is the cleaning schedule chosen for a commercial façade? |
| 租户仍在楼内时能安排高空清洁吗？ | Can high-access cleaning take place while tenants remain in the building? |

相关服务/场景卡片：S02、S10、S08。正文内链：H2-1 —；H2-2 S02；H2-3 —；H2-4 S10。

### S10 · 保留

- URL：/services/cleaning-waste-hygiene/
- 主词：commercial cleaning Melbourne
- 中文H1：墨尔本商业清洁与环境维护服务
- English H1：Commercial Cleaning Services in Melbourne

| H2 中文 | H2 English | 下属 H3 中英文 |
|---|---|---|
| 办公与共用区域日常保洁 | Routine Cleaning for Workplaces and Shared Areas | — |
| 深度清洁、地毯与硬地面护理 | Deep Cleaning, Carpet Care and Hard-Floor Maintenance | — |
| 洗手间、用品与约定废物处理 | Washroom Hygiene, Consumables and Waste Handling | — |
| 围绕运营制定清洁安排 | Cleaning Schedules Built Around Site Operations | — |

| FAQ 中文 | FAQ English |
|---|---|
| 商业清洁服务如何确定报价？ | Which factors determine the price of a commercial cleaning service? |
| 什么时候适合深度清洁？ | When is a deep clean more suitable than a routine clean? |
| 可以安排单次清洁而不签长期维护合同吗？ | Can you arrange a single clean without an ongoing maintenance contract? |

相关服务/场景卡片：S09、S12、S11。正文内链：H2-1 —；H2-2 —；H2-3 —；H2-4 S09、S12。

### S11 · 保留

- URL：/services/car-parks-external-works/
- 主词：car park maintenance Melbourne
- 中文H1：墨尔本停车场维修、划线与室外维护
- English H1：Car Park Repairs, Line Marking & Maintenance in Melbourne

| H2 中文 | H2 English | 下属 H3 中英文 |
|---|---|---|
| 车位、车道与行人通道划线 | Parking Bay, Access Lane and Pedestrian Line Marking | — |
| 坑洞、沥青修补与表层更新 | Pothole Repairs, Asphalt Patching and Resurfacing | — |
| 防撞柱、挡车器与室外设施 | Bollards, Wheel Stops and External Fixtures | — |
| 分区施工、排水衔接与重新开放 | Staged Works, Drainage and Site Reopening | — |

| FAQ 中文 | FAQ English |
|---|---|
| 新标线施工后车辆何时可以进入？ | When can vehicles return after new car park markings are applied? |
| 更改停车布局前能否清除旧标线？ | Can existing line markings be removed before the layout is changed? |
| 施工期间可以保留部分停车位使用吗？ | Is it possible to keep part of the car park open during the works? |

相关服务/场景卡片：S04、S03、S10。正文内链：H2-1 —；H2-2 S04；H2-3 —；H2-4 S03、S10。

### S12 · 保留

- URL：/services/fit-outs-make-good/
- 主词：commercial fitouts Melbourne
- 中文H1：墨尔本商业翻新、室内改造与退租恢复
- English H1：Commercial Fitouts, Refurbishments & Make Good in Melbourne

| H2 中文 | H2 English | 下属 H3 中英文 |
|---|---|---|
| 办公室与商业室内翻新 | Office and Commercial Interior Refurbishments | — |
| 使用中商业空间的分阶段改造 | Staged Fitouts for Occupied Business Premises | — |
| 退租拆除、恢复与租户交接 | Make Good, Defit and Tenancy Reinstatement | — |
| 多工种顺序与交付准备 | Coordinated Trades and Handover Preparation | — |

| FAQ 中文 | FAQ English |
|---|---|
| 商业退租恢复可以包含哪些工程？ | Which works may be included in a commercial tenancy make good? |
| 办公室翻新期间员工可以留在现场吗？ | Can staff remain on site while an office refurbishment is completed? |
| 拆除清空与完整 make good 有什么区别？ | What is the difference between a strip out and a complete make good? |

相关服务/场景卡片：S01、S03、S08、S10。正文内链：H2-1 S01；H2-2 S03；H2-3 S10；H2-4 S08。

### I01 · 保留

- URL：/sectors/offices/
- 主词：office maintenance Melbourne
- 中文H1：墨尔本办公室与写字楼维修维护
- English H1：Office Building Maintenance in Melbourne

| H2 中文 | H2 English | 下属 H3 中英文 |
|---|---|---|
| 使用中办公室与租户区域维修 | Repairs Across Occupied Offices and Tenancies | — |
| 办公室空调、照明与电气故障 | HVAC, Lighting and Electrical Faults at Work | — |
| 茶水间、洗手间与共用设施 | Kitchenettes, Washrooms and Shared Amenities | — |
| 围绕办公时段安排进场与维护 | Planned Visits and Works Around Office Hours | — |

| FAQ 中文 | FAQ English |
|---|---|
| 一次办公室维护可以安排哪些维修？ | What repairs can be included in a commercial maintenance visit? |
| 可以安排在正常办公时间之外吗？ | Can maintenance be booked outside normal office hours? |
| 员工仍在楼内时如何安排维修？ | How do you plan repairs while staff remain in the building? |

相关服务/场景卡片：S01、S03、S04、S05、S10、S12。正文内链：H2-1 S01；H2-2 S03、S05；H2-3 S04；H2-4 S10、S12。

### I02 · 增补

- URL：/sectors/retail-shopping-centres/
- 主词：shopping centre maintenance Melbourne
- 中文H1：墨尔本零售店铺与购物中心维护
- English H1：Retail & Shopping Centre Maintenance in Melbourne

| H2 中文 | H2 English | 下属 H3 中英文 |
|---|---|---|
| 店面、店内设施与租户区域维修 | Shopfronts, Store Fixtures and Tenancy Repairs | 店铺照明、空调与开闭店窗口 / Retail Lighting, Air Conditioning and Trading Windows |
| 屋顶漏水、水管故障与公共设施 | Roof Leaks, Plumbing Faults and Shared Amenities | — |
| 入口、标识与顾客通行 | Entrances, Signage and Customer Access | — |
| 围绕营业与商场入场要求施工 | Works Planned Around Trading and Centre Access | — |

| FAQ 中文 | FAQ English |
|---|---|
| 可以安排开店前施工吗？ | Can site work be completed before shops open? |
| 入口与相邻停车区可以一起维护吗？ | Can entrance areas and adjoining car parks be maintained together? |
| 如何配合购物中心的进场要求？ | How are repairs organised around shopping-centre access requirements? |

相关服务/场景卡片：S01、S04、S08、S09、S11、S12。正文内链：H2-1 S01、S03、S05；H2-2 S02、S04；H2-3 S08、S11；H2-4 S12。

### I03 · 保留

- URL：/sectors/hospitality/
- 主词：restaurant maintenance Melbourne
- 中文H1：墨尔本餐饮与酒店维修维护
- English H1：Restaurant & Hotel Maintenance in Melbourne

| H2 中文 | H2 English | 下属 H3 中英文 |
|---|---|---|
| 餐厅后厨、服务区与排水 | Restaurant Kitchens, Service Areas and Drainage | — |
| 用餐区、吧台与顾客设施 | Dining Areas, Bars and Customer Amenities | — |
| 酒店客房、浴室与住客区域 | Hotel Rooms, Bathrooms and Guest Areas | — |
| 配合餐饮服务与客房占用的计划 | Planned Works Around Service and Occupancy | — |

| FAQ 中文 | FAQ English |
|---|---|
| 能否在餐饮服务间隙安排维修？ | Can repairs be scheduled between trading or service periods? |
| 定期维护能否与临时维修一起安排？ | Is planned maintenance available alongside urgent repairs? |
| 客房与浴室维修可以按入住情况分批吗？ | Can room and bathroom repairs be staged around hotel occupancy? |

相关服务/场景卡片：S01、S03、S04、S05、S10、S12。正文内链：H2-1 S04、S05；H2-2 S03；H2-3 S01；H2-4 S10、S12。

### I04 · 保留

- URL：/sectors/warehouses-logistics/
- 主词：warehouse maintenance Melbourne
- 中文H1：墨尔本仓库与物流设施维护
- English H1：Warehouse & Logistics Facility Maintenance in Melbourne

| H2 中文 | H2 English | 下属 H3 中英文 |
|---|---|---|
| 仓库屋面、天沟与渗水 | Roofs, Gutters and Water Ingress | — |
| 仓库地面、装卸区与交通路线 | Warehouse Floors, Loading Areas and Traffic Routes | — |
| 照明、通风与员工设施 | Lighting, Ventilation and Staff Facilities | — |
| 围绕发货和场地进入安排施工 | Planned Works Around Dispatch and Site Access | — |

| FAQ 中文 | FAQ English |
|---|---|
| 仓库维修可以按单次项目安排吗？ | Can warehouse repairs be booked as individual jobs? |
| 如何与叉车和装卸作业分开施工？ | How will works be separated from forklifts and loading operations? |
| 屋顶、地面与室外维修可以一起协调吗？ | Can roof, floor and external-area repairs be coordinated together? |

相关服务/场景卡片：S01、S02、S03、S04、S11、S12。正文内链：H2-1 S02、S04；H2-2 S11；H2-3 S03；H2-4 S12、S01。

### I05 · 保留

- URL：/sectors/industrial-business-parks/
- 主词：industrial building maintenance Melbourne
- 中文H1：墨尔本工厂与工业园区物业维护
- English H1：Factory & Industrial Property Maintenance in Melbourne

| H2 中文 | H2 English | 下属 H3 中英文 |
|---|---|---|
| 厂房外壳、屋面与外墙维护 | Factory Buildings, Roofs and External Fabric | — |
| 工业地面、硬地与车辆通行 | Floors, Hardstand and Vehicle Access | — |
| 厂房电气、通风与楼宇设备 | Electrical, Ventilation and Building Services | — |
| 工业园区分阶段现场工程 | Planned Site Works Across Industrial Estates | — |

| FAQ 中文 | FAQ English |
|---|---|
| 能否围绕租户与运行时间安排工程？ | Can work be arranged around tenants and operating hours? |
| 多租户工业园区的共用绿地能统一养护吗？ | Can you maintain shared grounds across a multi-tenancy industrial site? |
| 维护范围是厂房建筑还是生产机器？ | Does your scope cover the building, production machinery or both? |

相关服务/场景卡片：S01、S02、S03、S05、S07、S11。正文内链：H2-1 S01、S02；H2-2 S11；H2-3 S03、S05；H2-4 S07。

### I06 · 保留

- URL：/sectors/medical-health/
- 主词：medical centre maintenance Melbourne
- 中文H1：墨尔本医疗中心与健康场所维护
- English H1：Medical Centre & Healthcare Facility Maintenance in Melbourne

| H2 中文 | H2 English | 下属 H3 中英文 |
|---|---|---|
| 诊室、接待与室内维修 | Consulting Rooms, Reception and Interior Repairs | — |
| 给排水、照明与普通楼宇设备 | Plumbing, Lighting and Building Services | — |
| 配合患者与预约安排的维修 | Repairs Planned Around Patients and Appointments | — |
| 入口、步道与室外环境 | Entrances, Paths and Outdoor Areas | — |

| FAQ 中文 | FAQ English |
|---|---|
| 医疗场所可以安排哪些建筑维修？ | Which building repairs can be arranged for a healthcare facility? |
| 室外维护如何配合患者通行？ | How can outdoor maintenance keep patient routes open? |
| 你们维修建筑设施还是医疗器械？ | Do you repair building facilities or clinical equipment? |

相关服务/场景卡片：S01、S03、S04、S05、S07、S10。正文内链：H2-1 S01；H2-2 S03、S04、S05；H2-3 —；H2-4 S07。

### I07 · 保留

- URL：/sectors/education-community/
- 主词：school maintenance Melbourne
- 中文H1：墨尔本学校与社区设施维修维护
- English H1：School & Community Facility Maintenance in Melbourne

| H2 中文 | H2 English | 下属 H3 中英文 |
|---|---|---|
| 教室、洗手间与室内共用空间 | Classrooms, Amenities and Shared Indoor Spaces | — |
| 场地、围栏与入口设施 | Grounds, Fences and Access Points | — |
| 学校假期内的集中维修与更新 | Larger Works During School Holidays | — |
| 社区礼堂与共享设施维护 | Maintenance for Community Halls and Shared Facilities | — |

| FAQ 中文 | FAQ English |
|---|---|
| 较大维修可以安排在学校假期吗？ | Can major repairs be arranged for school holiday periods? |
| 室内维修与场地养护能一起协调吗？ | Can internal repairs and grounds care be coordinated together? |
| 进场前可以核对哪些材料与要求？ | What checks and documents can be provided before site access? |

相关服务/场景卡片：S01、S03、S04、S07、S11、S12。正文内链：H2-1 S01、S03、S04；H2-2 S07、S11；H2-3 S12；H2-4 —。

### I08 · 增补

- URL：/sectors/commercial-common-areas/
- 主词：commercial strata maintenance Melbourne
- 中文H1：墨尔本商业共用区域与业主委员会物业维护
- English H1：Commercial Strata & Common Property Maintenance in Melbourne

| H2 中文 | H2 English | 下属 H3 中英文 |
|---|---|---|
| 门厅、走廊与共用建筑区域 | Foyers, Corridors and Shared Building Areas | 共用照明、供电与共享管线 / Shared Lighting, Power and Pipework |
| 共享停车场、花园与入口系统 | Shared Car Parks, Gardens and Access Systems | — |
| 维护计划与业主委员会工单 | Planned Maintenance and Committee Work Orders | — |
| 多工种衔接与完工记录 | Coordinated Trades and Completion Records | — |

| FAQ 中文 | FAQ English |
|---|---|
| 能否与业主委员会或其物业经理对接？ | Can you work with an owners corporation or its strata manager? |
| 共用区域可以包含哪些维修？ | Which shared-area repairs can be included? |
| 完工后委员会可以收到哪些信息？ | What information can the committee receive when the job is finished? |

相关服务/场景卡片：S01、S02、S06、S07、S09、S11。正文内链：H2-1 S01、S02、S03、S04；H2-2 S06、S07、S11；H2-3 —；H2-4 S09。

## 17条FAQ建议的采用与合并

| 建议 | 处理 |
|---|---|
| F01 | S04新增管线修理/更换决策 |
| F02 | 旧管线修理与分段更新写入查漏正文，不额外增加重复FAQ |
| F03/F04 | 合为S04反复堵塞与管损检查问题，替换旧“疏通/摄像纳入计划”问法并保留计划信息 |
| F05 | 不追加统一疏通时长问题，当前缺乏具体项目时长依据 |
| F06 | 不枚举未经确认的热水型号；设备型号核对并入热水正文与F07 |
| F07 | S04新增热水维修/更换决策 |
| F08 | 沿用原S04按设备、使用强度确定维护周期的FAQ，热水仍在其范围内 |
| F09 | 停用与进入安排落实为S04 H3及专属询盘，不机械追加第6题 |
| F10 | S02新增屋面/下游雨水衔接问题 |
| F11 | 替换S03泛化范围问题，回答反复供电故障排查 |
| F12 | S03新增配电维修/更新判断 |
| F13 | 保留已有非营业时段问题，不重复 |
| F14 | 扩充已有S05保养范围答案，加入清洁、检查及交付 |
| F15 | 保留已有S05维护频次答案，不重复 |
| F16 | S05新增按实际安装系统核对维护范围的问题 |
| F17 | S06新增监控维护纳入物业计划问题 |

## 集中事实缺口

- 具体设备品牌/型号、特殊空调/热水系统可维修范围需按设备清单确认；未承诺所有品牌及特殊系统。
- 专项电气、燃气、消防检测报告和准入文件依现有真实人员、项目和资料确认；没有新增资质、认证、统一周期或法定结论。
- 未编造现场案例、价格、免费服务、评分、全天候和响应时限。
- 咨询仍沿用本地草稿与真实电话入口，没有新增收件接口或已预约承诺。

## 后续新闻队列（本轮不发布）

1. 商业物业反复堵塞的调查范围 → S04。
2. 营业中的商业电气维修安排 → S03。
3. 商业空调维护具体覆盖什么 → S05。
4. 屋面排水与下游雨水维修衔接 → S02/S04。
5. 商业热水维修与更换评估 → S04。
6. 一份商业楼宇维修清单的工种安排 → S01。

## 本轮检查

- npm run check / npm run build / git diff --check通过。
- 20主题桌面双语检查；7修改页390px双语正文与FAQ检查通过。
- 单页一个H1、4个主题H2、3–5个FAQ；全站主题保留80个H2主模块，新增18个H3，合计66组FAQ。
- 内部URL与锚点存在，服务专属CTA携带原服务编号；S04实际点击正确打开咨询草稿并预选水管服务。
- 所有80个原主题段落中英文正文保留；13个未增补主题的内容记录不变。
- 3D/滚动/导航/主视觉脚本、图片、首页及Vercel配置保持。
- 应用脚本错误0。自动导航中Chromium另记录一条既有原生页面转场取消提示（InvalidStateError / opt-in disabled）；咨询跳转与服务选择正常。本内容PR不修改转场逻辑。
- 本轮未发布支持文章、未合并main、未修改DNS或另行部署生产。
