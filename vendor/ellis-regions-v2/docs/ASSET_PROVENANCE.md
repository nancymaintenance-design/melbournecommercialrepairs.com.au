# 图片与字体来源

页面的标题、段落、热点、展开卡片、内链和按钮由 HTML/CSS/JavaScript 实现。没有把整张设计效果图当作网页，也没有把效果图切成图片按钮。

原有版本的24张独立图片及logo兼容副本保留，来源记录如下。本次根据用户提供的 `墨尔本商业维修区域概览-3.png` 补充 **13张独立生成原图、13张对应WebP及10张地区卡片缩略图**。另外增加两款本地中文字体子集。`asset-manifest.json` 记录实际文件尺寸、字节数及用途。

## 本次新增的独立插图（v2）

用户参考图仅用于确定构图与视觉风格。以下图像通过内置imagegen分别生成，属于 **AI生成的建筑与装饰示意图**，不是实拍项目、已完成施工案例、客户现场或地理测绘成果。

| 原始PNG | 对应WebP | 原图尺寸 | 用途 |
|---|---|---:|---|
| `hero-melbourne-v2.png` | `hero-melbourne-v2.webp` | 1896×830 | 墨尔本地标风格首屏插图 |
| `preview-cbd-street-v2.png` | `preview-cbd-street-v2.webp` | 1897×829 | CBD办公楼入口与街道展开预览 |
| `region-cbd-inner-v2.png` | `region-cbd-inner-v2.webp` | 1536×1024 | CBD玻璃高层办公楼近景 |
| `region-eastern-v2.png` | `region-eastern-v2.webp` | 1536×1024 | 东区绿树街角商业办公楼近景 |
| `region-south-east-v2.png` | `region-south-east-v2.webp` | 1536×1024 | 东南区橙白办公工业楼近景 |
| `region-western-v2.png` | `region-western-v2.webp` | 1536×1024 | 西区灰色仓库、卷帘门与橙色横带 |
| `region-northern-v2.png` | `region-northern-v2.webp` | 1536×1024 | 北区两层商务园办公楼近景 |
| `region-north-east-v2.png` | `region-north-east-v2.webp` | 1536×1024 | 东北区商业办公建筑近景 |
| `region-north-west-v2.png` | `region-north-west-v2.webp` | 1536×1024 | 西北区仓库建筑近景 |
| `region-bayside-southern-v2.png` | `region-bayside-southern-v2.webp` | 1536×1024 | Bayside及南部商业建筑近景 |
| `region-casey-cardinia-v2.png` | `region-casey-cardinia-v2.webp` | 1536×1024 | Casey与Cardinia商业工业单元近景 |
| `region-frankston-mornington-peninsula-v2.png` | `region-frankston-mornington-peninsula-v2.webp` | 1536×1024 | Frankston与半岛接待建筑近景 |
| `corner-ribbon-v2.png` | `corner-ribbon-v2.webp` | 827×1902，RGBA | 透明橙色折角备选装饰；当前界面未使用 |

这些原始PNG保留在创作工作文件中，**不纳入运行包**；正式页面使用优化后的WebP。透明折角WebP仅作为可选资源随交付包保留，当前角部装饰使用CSS，并未加载这张图。

### 地区卡片缩略图

10张地区图分别另有 `card-region-{地区后缀}-v2.webp`，尺寸均为 **640×427**。它们由对应独立建筑原图缩小得到，用于5列地区卡片；不是对整页UI参考图的裁切。

地区后缀为：`cbd-inner`、`eastern`、`south-east`、`western`、`northern`、`north-east`、`north-west`、`bayside-southern`、`casey-cardinia`、`frankston-mornington-peninsula`。

总览的主要图像包括首屏地标、10张卡片缩略图、CBD街道预览，以及其他9个地区的展开预览大图。大图与卡片图分别配置，避免用完整园区模型替代近景建筑卡片。

### 用户设计参考图

`design-reference-overview.png` 是用户提供的批准稿副本。它只在预览的 `?compare=1` 对照模式使用，包括 `START_HERE.html?compare=1`。该图随交付包保留以便核对，清单标为 `previewOnly: true`、`runtime: false`；它不是网站主体背景或页面替代品。

## 复用的 Ellis 素材

以下原有来源记录保留。这些图像用于既有模型、细节及其他场景；新版地区总览的建筑近景使用上面的v2素材。

| 本包图片 | 来源 | 页面用途 |
|---|---|---|
| `logo.png` | 项目上传的 `ellis-services.png` | 公司原有图形标识；字标由页面文字呈现 |
| `ellis-services.png` | 同一上传logo的兼容文件名 | 兼容既有组件的logo路径 |
| `architecture.webp` | 既有 `ellis-codex-delivery/pack/prototype/assets/ellis-architecture.webp` | 办公楼与楼顶设备模型 |
| `interior-open.webp` | 既有 `motion/02-interior-open.webp` | 办公楼层展开场景 |
| `equipment-exploded.webp` | 既有 `motion/04-equipment-exploded.webp` | 屋面与设备层展开场景 |
| `warehouse.webp` | 先前生成的 `exec-c50de5fd-d1c3-4337-8158-571c5031523d.png` | 仓库、装卸与室外通道 |
| `retail.webp` | 先前生成的 `exec-b1b2ca77-5d1e-4cbf-81df-f04a1fb19560.png` | 零售楼宇、店面与停车区 |
| `industrial.webp` | 先前生成的 `exec-78165a69-9daa-4047-b691-a04f68434ddc.png` | 工业与附属办公物业 |
| `landscape.webp` | 先前生成的 `exec-eba8ca7d-bb88-4c2e-8f95-9ec4a262310e.png` | 商业庭院与园林 |
| `campus.webp` | 既有 `ellis-hotspot-kit/assets/commercial-campus.png` | 多类商业场景模型 |

## 从 Ellis 公开网站复用的图片

来源站点：<https://melbournecommercialrepairscomau.vercel.app/>。2026-11-17根据该站首页及地区页实际HTML中的图片路径读取；图片在本包中本地保存，不依赖运行时热链。

- `office-interior.webp`、`retail-interior.webp`、`hospitality-interior.webp`、`warehouse-interior.webp`、`industrial-interior.webp`、`medical-interior.webp`、`education-interior.webp`、`common-interior.webp`：原路径 `/assets/sector-selector/{type}-interior-v1.webp`。
- `melbourne-stage.webp`：原路径 `/assets/areas/melbourne-stage-design-day-v1.webp`；这是此前复用的墨尔本舞台地标图，新版地区总览首屏已改用独立的 `hero-melbourne-v2.webp`。
- `roofing-detail.webp`、`garden-irrigation.webp`、`signage.webp`、`facade-cleaning.webp`、`carpark.webp`、`fitout.webp`：原路径 `/assets/service-showcase/{name}.webp`。

这些图像延续既有项目素材，不代表新增真实施工项目、客户案例或地理测绘成果。页面以「场景示意 / Illustrative scene」区别插图与真实案例。没有使用工作区中那张另行检索的Tourism Australia原始城市照片，也没有添加新的第三方图库授权声明。

## 本地中文字体子集

| 文件 | 字体来源与字重 | 大小 |
|---|---|---:|
| `ellis-sans-sc-400.woff` | Noto Sans CJK SC Regular，400 | 316,856 B |
| `ellis-sans-sc-700.woff` | Noto Sans CJK SC Bold，700 | 323,188 B |

两份文件均是针对本项目现有内容制作的WOFF子集；文件中的Unicode映射各包含956个字符。它们不是完整中文字体。新增正文时应补充子集所需字符，并保留系统字体回退。

字体上游项目为 [Noto CJK](https://github.com/notofonts/noto-cjk)。授权为SIL Open Font License 1.1；完整随包版权与许可文本保存在 `docs/FONT_LICENSE.txt`。字体由本地资源路径提供，无需访问外部字体服务。交付与部署时保留该许可文件。

## 文件规格与接入

- 既有素材此前以WebP质量85、method 6作格式与体积优化，透明模型保留alpha通道。本次v2原图另行生成并导出WebP；具体尺寸、大小及透明状态以清单为准。
- 原始生成PNG在清单中为 `role: generation-source`、`runtime: false`、`packageIncluded: false`，只用于追溯，不代表运行包必须提供这些大文件。
- 用户批准稿为预览对照文件，透明折角为未启用的可选资源，两者均与生产页面使用的图片分开标记。
- 图像实际尺寸用于预留布局空间。场景热点按完整图片百分比定位；改变裁切方式时应同步处理热点位置。
- 首屏hero与地区卡片、展开预览、详情场景分别配置；首屏优先加载，其他画面按需要加载，避免一次加载整个图库。
- 接入现有工程时，合并同源图片，避免重复打包。未来增加真实项目图时，应单独补充项目名称、工作范围和图片授权来源，并明确区别于当前插图。
