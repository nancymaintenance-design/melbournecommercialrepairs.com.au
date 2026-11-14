# 首页八类物业选择器 · 2026-11-14

本轮仅替换 `aria-label="商业物业种类"` 的 tablist 及其关联 tabpanel。组件地址：`http://127.0.0.1:8765/?lang=zh#property-selector`。

## 实现

- 保留八类原始中英文名称、说明、维护标签和详情 URL。
- 单列编号、蓝色细线和刻度；荧光绿选中条、蓝色箭头与橙色定位点。
- 电蓝主体、橙色曲线场景框；八张匹配空间的写实概念室内图与三张独立透明前景。
- 背景、照片与前景分别产生轻微视差。图片使用圆角遮罩和淡化，同一序列管理背景与前景动画；新选择取消旧过渡并从当前透明度继续。
- H3 中文桌面 27px、英文 25px、手机 24px；正式文字及链接均为 HTML。
- 保留方向键、Home / End；增加垂直 tablist 语义和 44px 热点点击区。热点弹层可用 Escape 关闭。
- 手机为单列索引接详情面板，正常文档滚动；减少动态效果时直接切换终态。

## 文件

`home-sector-selector.js`：共享静态输出及独立浏览器控制器。

`home-sector-selector.css`：只作用于 `[data-property-selector]` 的样式。

`app.js`：只接入现有八项选择器的渲染与详情更新。`renderSectorFilm()` 完整保留。

`build-pages.cjs` / `index.html`：首页局部静态输出及新资源引用。资源使用现有内容哈希版本机制。

`assets/sector-selector/`：11 张无损 WebP。1774×887；逐张解码 RGBA 与 PNG 原稿一致。总计约 16.55 MB，较原 PNG 减少 29.79%。原稿与生成记录存放在本站 reports 目录。

## 对应关系

| 编号 | 物业 | 详情路径 |
|---|---|---|
| 01 | 办公室与写字楼 | `/sectors/offices/` |
| 02 | 零售与购物中心 | `/sectors/retail-shopping-centres/` |
| 03 | 餐饮与酒店 | `/sectors/hospitality/` |
| 04 | 仓库与物流 | `/sectors/warehouses-logistics/` |
| 05 | 工厂与工业园区 | `/sectors/industrial-business-parks/` |
| 06 | 医疗与健康场所 | `/sectors/medical-health/` |
| 07 | 教育与社区设施 | `/sectors/education-community/` |
| 08 | 商业公共物业 | `/sectors/commercial-common-areas/` |

链接沿用 `?lang=zh` / `?lang=en`。

## 范围保护

修改前已存储首页局部以外的 HTML、上方四卡渲染代码、全局动效与样式、31 个内页的快照或哈希。最终检查一致。没有修改上方四卡的素材、内容、滚动距离、交互或动画；首页 Hero、12 项服务区和其余页面保持原实现。

验收素材和检查结果：`E:/Ellis-Services/Ellis Services WordPress/reports/home-sector-selector-2026-11-14/`。仅本地预览，没有推送或部署。
