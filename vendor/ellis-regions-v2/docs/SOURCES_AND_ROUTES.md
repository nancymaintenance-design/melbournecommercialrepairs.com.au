# ELLIS 地区设计依据与现有路径

日期：2026-11-17。此文件记录资料与路径；视觉实施规则统一见 REGION_UI_GUIDE.md。

## 现站观察范围

浏览器查看了地区总览、CBD 代表详情、语言切换与联系表单。总览中的 10 个地区 href 均已观察；没有逐页验证另外九区的运行状态。

- 总览：https://melbournecommercialrepairscomau.vercel.app/areas/melbourne/?lang=zh
- CBD：https://melbournecommercialrepairscomau.vercel.app/areas/melbourne/cbd-inner/?lang=zh
- 联系：https://melbournecommercialrepairscomau.vercel.app/contact/?lang=en
- 现有语言切换：lang=zh / lang=en；联系表单 id：contact-enquiry-form。

| 大区 | 既有路径 |
|---|---|
| 市中心及内城 | `/areas/melbourne/cbd-inner/` |
| 东区 | `/areas/melbourne/eastern/` |
| 东南区 | `/areas/melbourne/south-east/` |
| 西区 | `/areas/melbourne/western/` |
| 北区 | `/areas/melbourne/northern/` |
| 东北区 | `/areas/melbourne/north-east/` |
| 西北区 | `/areas/melbourne/north-west/` |
| Bayside 及南部 | `/areas/melbourne/bayside-southern/` |
| 外东南区 · Casey & Cardinia | `/areas/melbourne/casey-cardinia/` |
| Frankston 与莫宁顿半岛 | `/areas/melbourne/frankston-mornington-peninsula/` |

## 地区背景资料

下列地方政府与规划资料只支撑物业场景选择；不代表 Ellis 的已完工项目或当地分支。服务排序和进场建议属于本方案的编辑安排。

### 01 市中心及内城

- [Melbourne Planning Scheme — Strategic Directions](https://planning-schemes.app.planning.vic.gov.au/Melbourne/ordinance/02.03-2)：Hoddle Grid 的办公、零售、餐饮及多种城市功能；搜索索引摘录可读取，页面直接打开需要 JavaScript。
- [City of Melbourne — Iconic laneways and arcades walk](https://whatson.melbourne.vic.gov.au/things-to-do/walks/arcades-and-lanes)：市中心巷道及拱廊包含商店、咖啡馆、餐饮等商业空间。

### 02 东区

- [Eastern Metro Land Use Framework Plan — Productivity](https://www.planning.vic.gov.au/__data/assets/pdf_file/0035/637865/eastern_chapter04_productivity.pdf)：Box Hill 与 Ringwood 是东区的重要商业活动中心；文件说明零售、办公及服务等多种功能。
- [Planning Victoria — Ringwood Activity Centre](https://www.planning.vic.gov.au/guides-and-resources/strategies-and-initiatives/train-and-tram-zone-activity-centres/activity-centres-pilot-program/ringwood)：Ringwood 的活动中心规划围绕就业、商店与服务，并与市议会的核心区规划衔接。

### 03 东南区

- [Invest Victoria — Monash Precinct](https://invest.vic.gov.au/set-up-your-business/explore-precincts-of-melbourne/monash-precinct)：Monash 的商业产业与研究、制造、医疗等功能相联系；本文只引用产业结构，不引用就业统计或未来承诺。
- [Greater Dandenong — Dandenong South Industrial Area Extension Structure Plan](https://www.greaterdandenong.vic.gov.au/dandenong-south-industrial-area-extension-structure-plan)：Dandenong South 周边规划面向工业商业活动及相关场地、交通和基础设施。

### 04 西区

- [Wyndham City — Investing in Wyndham](https://www.wyndham.vic.gov.au/services/business-investment/wyndham-your-business-destination/investing-wyndham)：Laverton North 与 Truganina 的工业用地涵盖制造、物流及一般工业；西区页面以仓库与场地作为其中一种重点场景，不概括全部西区只有工业。

### 05 北区

- [Hume City Council — Precinct 10: Somerton](https://participate.hume.vic.gov.au/bph-p10)：Hume 官方材料将 Campbellfield 与 Somerton 的相关区域描述为工业走廊；该页为社区基础设施咨询资料，只取地理与产业背景。
- [Melbourne’s North Investment Attraction Strategy](https://www.suburbandevelopment.vic.gov.au/__data/assets/pdf_file/0026/208817/Melbournes-North-Investment-Attraction-Strategy-Final-Report.pdf)：北部 Campbellfield/Somerton 园区包含制造、仓储及物流；本文不使用其中的就业和产值统计。

### 06 东北区

- [Banyule Planning Scheme — 02.03-1 Settlement](https://planning-schemes.app.planning.vic.gov.au/Banyule/ordinance/22314812)：Banyule 的主要活动中心包括 Greensborough、Heidelberg、Ivanhoe，提供零售、商业、健康及专业服务。
- [Banyule Planning Scheme — Planning for Places](https://planning-schemes.app.planning.vic.gov.au/Banyule/ordinance/11.03-4S)：Heidelberg 的规划强调医院与医疗健康相关用途；此依据仅用于选择物业场景。

### 07 西北区

- [Hume City Council — City Profile](https://www.hume.vic.gov.au/Your-Council/Our-City/City-Profile)：Hume 官方说明机场周边存在重要就业区域，并由道路、机场及铁路货运网络支持商业与工业用地。
- [Hume Planning Scheme — Industrial areas and business parks](https://planning-schemes.app.planning.vic.gov.au/Hume/ordinance/15.01-2L-02)：规划列出 Broadmeadows 和 Tullamarine 的工业及商业园区用地。

### 08 Bayside 及南部

- [Bayside City Council — Placemaking Action Plan](https://yoursay.bayside.vic.gov.au/placemakingactionplan)：Bayside 官方将 Brighton 和 Sandringham 等商圈描述为餐饮、零售和服务业购物村。
- [Kingston Planning Scheme — Strategic directions](https://planning-schemes.app.planning.vic.gov.au/Kingston/ordinance/02.03-9)：Kingston 的工业用地与商业中心并存，规划关注较早工业区的交通、停车与货车进入条件。

### 09 外东南区 · Casey & Cardinia

- [Casey Planning Scheme — Strategic directions](https://planning-schemes.app.planning.vic.gov.au/Casey/ordinance/02.03-7)：Casey 有不同层级的活动中心，包括 Narre Warren、Cranbourne 和 Berwick。
- [Cardinia Shire — Employment land and precincts](https://www.cardinia.vic.gov.au/business/invest-cardinia-shire/employment-land-and-precincts-cardinia-shire)：Cardinia 官方列出 Officer 与 Pakenham 的商业、专业服务、制造与物流等就业场景。

### 10 Frankston 与莫宁顿半岛

- [Frankston City Council — Industrial Strategy](https://engage.frankston.vic.gov.au/industrial-strategy)：Frankston 官方资料列出 Carrum Downs 和 Seaford 等工业片区，说明该大区不只是旅游与沿海零售。
- [Mornington Peninsula Shire — Tourism industry](https://www.mornpen.vic.gov.au/Things-to-do/Explore-Mornington-Peninsula/Industry)：Mornington Peninsula Shire 提供旅游企业支持，因此页面可以选择餐饮与访客接待类商业物业作为场景之一。

## 链接与内容实现参考

- [Google：链接最佳实践](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)：真实 href、明确锚文本与上下文关联。
- [Google：延迟加载内容](https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading)：必要内容可直接读取，不要求先点击才下载。
- [Google：垃圾内容政策](https://developers.google.com/search/docs/essentials/spam-policies)：避免只替换地名的重复入口页；正常可展开内容可服务阅读体验。
- [Visit Melbourne：Southbank & South Wharf](https://www.visitmelbourne.com/regions/melbourne/destinations/southbank-and-south-wharf)：墨尔本城市主视觉的地标背景参考。

关键词是编辑候选，未测量月搜索量；不据此承诺排名、抓取频率或 AI 引用。
