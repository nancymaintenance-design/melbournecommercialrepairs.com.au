# 三套内页视觉实施与验收 · 2026-11-14

在既有内容优化分支上实施，31 个内页使用三套对应视觉模板，首页代码与动效保持。

## 页面与关键词对应

| 编号 | 现有 URL | 已确认核心词 | 保留的中英文 H1 | 模板 |
|---|---|---|---|---|
| S01 | /services/building-maintenance/ | commercial building maintenance Melbourne | 墨尔本商业建筑维护与日常维修 / Commercial Building Maintenance & Repairs in Melbourne | architecture |
| S02 | /services/roofing-waterproofing/ | commercial roof repairs Melbourne | 墨尔本商业屋顶维修、防水与建筑修复 / Commercial Roof Repairs, Waterproofing & Remedial Works in Melbourne | architecture |
| S03 | /services/electrical-lighting/ | commercial electrician Melbourne | 墨尔本商业电气维修与照明维护 / Commercial Electricians & Electrical Maintenance in Melbourne | systems |
| S04 | /services/plumbing-drainage-gas/ | commercial plumber Melbourne | 墨尔本商业水管、排水与燃气服务 / Commercial Plumbing, Drainage & Gas Services in Melbourne | systems |
| S05 | /services/hvac-building-systems/ | commercial air conditioning maintenance Melbourne | 墨尔本商业空调与楼宇设备系统维护 / Commercial Air Conditioning & HVAC Maintenance in Melbourne | systems |
| S06 | /services/fire-security-access/ | fire protection services Melbourne | 墨尔本商业消防、安防与门禁维护 / Fire Protection, Security & Access Control in Melbourne | systems |
| S07 | /services/landscaping-irrigation/ | commercial garden maintenance Melbourne | 墨尔本商业园林维护与灌溉维修 / Commercial Garden Maintenance & Irrigation in Melbourne | architecture |
| S08 | /services/signage-wayfinding/ | commercial signage Melbourne | 墨尔本商业标识安装、维修与导视 / Commercial Signage Installation & Maintenance in Melbourne | architecture |
| S09 | /services/facade-high-access-cleaning/ | high rise window cleaning Melbourne | 墨尔本高空玻璃与建筑外立面清洁 / High-Rise Window & Façade Cleaning in Melbourne | architecture |
| S10 | /services/cleaning-waste-hygiene/ | commercial cleaning Melbourne | 墨尔本商业清洁与环境维护服务 / Commercial Cleaning Services in Melbourne | architecture |
| S11 | /services/car-parks-external-works/ | car park maintenance Melbourne | 墨尔本停车场维修、划线与室外维护 / Car Park Repairs, Line Marking & Maintenance in Melbourne | architecture |
| S12 | /services/fit-outs-make-good/ | commercial fitouts Melbourne | 墨尔本商业翻新、室内改造与退租恢复 / Commercial Fitouts, Refurbishments & Make Good in Melbourne | architecture |
| I01 | /sectors/offices/ | office maintenance Melbourne | 墨尔本办公室与写字楼维修维护 / Office Building Maintenance in Melbourne | spaces |
| I02 | /sectors/retail-shopping-centres/ | shopping centre maintenance Melbourne | 墨尔本零售店铺与购物中心维护 / Retail & Shopping Centre Maintenance in Melbourne | spaces |
| I03 | /sectors/hospitality/ | restaurant maintenance Melbourne | 墨尔本餐饮与酒店维修维护 / Restaurant & Hotel Maintenance in Melbourne | spaces |
| I04 | /sectors/warehouses-logistics/ | warehouse maintenance Melbourne | 墨尔本仓库与物流设施维护 / Warehouse & Logistics Facility Maintenance in Melbourne | spaces |
| I05 | /sectors/industrial-business-parks/ | industrial building maintenance Melbourne | 墨尔本工厂与工业园区物业维护 / Factory & Industrial Property Maintenance in Melbourne | spaces |
| I06 | /sectors/medical-health/ | medical centre maintenance Melbourne | 墨尔本医疗中心与健康场所维护 / Medical Centre & Healthcare Facility Maintenance in Melbourne | spaces |
| I07 | /sectors/education-community/ | school maintenance Melbourne | 墨尔本学校与社区设施维修维护 / School & Community Facility Maintenance in Melbourne | spaces |
| I08 | /sectors/commercial-common-areas/ | commercial strata maintenance Melbourne | 墨尔本商业共用区域与业主委员会物业维护 / Commercial Strata & Common Property Maintenance in Melbourne | spaces |

服务总览 /services/ 为蓝橙建筑；商业总览 /sectors/ 与全部 8 场景为热粉空间；S03–S06 为荧光设备。其他服务、地区、关于、新闻、FAQ、联系、隐私共用蓝橙结构，保留各自正式文字。没有新增 URL。

## 视觉与滚动

- 建筑：巨幅双层标题、完整建筑、橙色曲线底图、室内拆解章节、特写缩略卡。
- 设备：屋顶、管线、底座三个独立轮廓遮罩；滚动 0/497/627px 时屋顶分别 0/-40/-51px，管线 0/-9.8/-12.5px，底座无整体上下平移。
- 室内：房间、顶板与右侧墙板使用对应轮廓；顶板向上、墙板向右展开，非整图搬移。
- 空调细节：机体和滤网分离；橙色实体管线随滚动延伸，跨越黄绿与蓝色章节。
- 场景：热粉巨字与斜标题牌、真实质感场景推进、黄绿入口章节、圆角特写。医疗、教育、餐饮分别补足匹配建筑素材。
- 全部新增素材为建筑概念示意，不作为真实客户项目、认证或案例证据。使用清晰 WebP；原 PNG 归档于 source-artwork/inner-page-design。

## 内容保护与检查

- 32 个 HTML；全部单一 H1。31 内页元数据及 page-content 正文与 bb40f21 基线逐字相同。12 服务、8 场景内容源与渲染源未修改。
- 1635 个内部链接、263 个素材引用通过本地存在性检查；构建可重复，npm run build / npm run check 通过。
- 31 内页 × 中英文共 62 个手机状态（390×844）均无标题或页面横向溢出；31 英文桌面状态（1440×1000）均通过。
- FAQ 展开后切换语言保持；8 导航链接继续指向栏目 URL；手机菜单及 Escape 关闭实测通过；S05 询盘仍预选 service=4。
- 系统减少动效时屋顶、滤网 transform 均为 none，正文入场全部直接显示；实际控制台无 error。初始 HTML 包含全部中文正文，英文保存在 data-en。
- 所有实际图片 computed filter 均为 none，没有 blur 或毛玻璃。

## 实际截图

- overview-comparison.jpg、systems-comparison.jpg、spaces-comparison.jpg：左设计图 / 右实际首屏与下方视觉章节。
- scroll-keyframes.jpg 与 motion-keyframes.json：真实滚动关键帧及独立图层位移。固定导航在长页面截图中随当时视口位置显示。
- mobile-three-templates.jpg：三套中文手机首屏；各模板另有 mobile-en.jpg。
- *-full-final.jpg：实际完整网页截图，包含正式正文、FAQ 和相关链接。

正式 H1/正文比示意文字更长，因此设备和场景标题换行与章节总高有所增加；按用户要求保留正式内容。素材透视与个别缩略图裁切存在轻微差异，不宣称逐像素复刻。

本轮仅独立开发分支和 PR；未合并 main、未改 DNS、未主动部署生产。
