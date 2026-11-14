# 首页服务展柜补充 · 本地验收

日期：2026-11-14。当前只在本地开发分支 codex/home-service-showcase，未推送 GitHub、未创建新 PR、未触发云端构建或部署。生产发布等待用户确认。

本地地址：http://127.0.0.1:8765/?lang=zh#services

## 本次范围

- 只重设计首页 #services 原模块；保留首页四场景、跑马条及其余版块。
- 模板 2 为最终展柜；模板 3 为同一套卡片的空间叠放、展开、色彩接替。没有上下拼接第二套服务模块。
- S01 建筑、S05 空调、S07 园林三张主卡；其余九张卡始终为可用的真实链接。保留顶部“查看全部服务”及原咨询按钮。
- 同一个 service-showcase.js 工厂输出静态 HTML 与运行时卡片；app.js 继续使用原十二项中英文数据和 URL。语言切换不重建卡片节点或动画实例。
- 只用一个被动滚动监听和一个待执行 RAF 更新本模块。主卡、图像、文字、室内顶板／墙板、空调滤网使用同一进度，不加入旧 service-card 的单卡入场控制。
- 桌面有效展开距离约 447px，展开期间有实际画面变化，随后正常退出；手机不额外增加锁屏留白。
- 内页 H1 去掉装饰大字的前置占位；SPACES 排在正式主题之后，H1 不等待入场动画。其余内页布局及正式内容继续沿用。

## 12 项入口

| 编号 | 保留名称 | URL |
|---|---|---|
| 01 | 建筑主体与日常维修 | /services/building-maintenance/ |
| 02 | 屋顶、防水与建筑修复 | /services/roofing-waterproofing/ |
| 03 | 商业电气与照明 | /services/electrical-lighting/ |
| 04 | 水管、排水与燃气 | /services/plumbing-drainage-gas/ |
| 05 | 空调与楼宇设备系统 | /services/hvac-building-systems/ |
| 06 | 消防、安防与门禁 | /services/fire-security-access/ |
| 07 | 商业园林绿化与灌溉 | /services/landscaping-irrigation/ |
| 08 | 广告标识与导视 | /services/signage-wayfinding/ |
| 09 | 外立面与高空清洁 | /services/facade-high-access-cleaning/ |
| 10 | 商业清洁与环境维护 | /services/cleaning-waste-hygiene/ |
| 11 | 停车场与室外工程 | /services/car-parks-external-works/ |
| 12 | 商业翻新与退租恢复 | /services/fit-outs-make-good/ |

## 检查结果

- 32 个 HTML 各一个 H1；首页服务模块一个、卡片十二张、动画挂载一个。原十二服务和八场景双语数据完全保留。
- 1642 个内部链接、283 个图片引用存在性检查通过；十二个服务目标页也包括在实际浏览器检查中。
- npm run build、npm run check、重复构建一致性通过。内页 page-content 正文与 page-meta 与 d1733f2 基线一致。首页四场景 HTML 保留，仅忽略 Windows 换行差异。
- 31 内页 × 双语 × 桌面／手机，共 124 个状态；H1 顶部为 121–154px，均直接可见，无横向溢出。
- 桌面 1500×1040、手机 390×844 无标题横向截断。真实点击语言切换后，目录终态仍为 1.0000，卡片／挂载数保持 12／1。
- 原咨询入口打开，服务选项仍为 12 项 + 多项 + 提示项；S04 卡片真实跳转到水管详情。
- 减少动态模式直接显示完整目录，三主卡 transform 均为 none；无 JS 初始 HTML 仍有十二项真实链接。
- 模块图片 computed filter 无非 none 值；未加入模糊、毛玻璃。生成图是服务概念示意，不作为真实工程案例。
- 浏览器 console error 为空；滚动终态后 next section 正常进入视口，无空白尾段。

## 证据文件

- desktop-directory.png：正常动效模式最终目录实际截图。
- desktop-stacked.png、desktop-directory-en.png：桌面叠放与英文检查截图。
- directory-comparison.jpg：模板 2 与真实目录并排对照。
- three-scroll-states.jpg：录屏原生帧中的叠放、展开中与最终目录。
- mobile-theatre.png：手机正常动效过程截图；mobile-catalog-reduced.png：手机减少动效模式完整十二项目录。
- inner-h1-mobile.jpg、inner-h1-checks.json：内页主题前置证据。
- stack-unfold-directory.mp4：真实浏览器滚动录屏，原生采集 120 帧，按原始时间戳编码，采集时长约 19.7 秒；不由三张静态图拼接。采集帧率低于网页原生 RAF 刷新率。

## 有意保留的差异

参考图中的服务简称换回既有完整服务名称，因此个别手机标题换行为两行。模板 3 的第二份十二项侧栏没有复制；九项配套服务就在同一个最终网格中持续可用。素材角度与示意图存在少量差异，未声称逐像素复刻。
