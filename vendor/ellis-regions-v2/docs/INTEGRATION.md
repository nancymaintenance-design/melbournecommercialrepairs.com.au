# 接入现有 Ellis 网站

## 1. 复用范围

这是地区模块，不要用它的本地服务器替代现有站点。以下 11 个真实路由由同一数据源驱动：

| 页面 | 路径 |
|---|---|
| 地区总览 | `/areas/melbourne/` |
| 市中心及内城 | `/areas/melbourne/cbd-inner/` |
| 东区 | `/areas/melbourne/eastern/` |
| 东南区 | `/areas/melbourne/south-east/` |
| 西区 | `/areas/melbourne/western/` |
| 北区 | `/areas/melbourne/northern/` |
| 东北区 | `/areas/melbourne/north-east/` |
| 西北区 | `/areas/melbourne/north-west/` |
| Bayside 及南部 | `/areas/melbourne/bayside-southern/` |
| Casey & Cardinia | `/areas/melbourne/casey-cardinia/` |
| Frankston 与莫宁顿半岛 | `/areas/melbourne/frankston-mornington-peninsula/` |

语言为 `?lang=zh` 或 `?lang=en`。数据内 `slug` 是内容 ID，不能直接用来替换真实网址后缀。

## 2. 渲染接口

```js
import data from './data/region-pages.json';
import { renderPage, renderMain, resolvePage } from './src/render.mjs';

const options = {
  data,
  pathname: '/areas/melbourne/western/',
  lang: 'zh',
  assetBase: '/assets/ellis-regions',
  siteOrigin: 'https://YOUR-CONFIRMED-DOMAIN',
  preview: false,
  contactLocal: true,
  search: '?lang=zh',
};

const fullDocument = renderPage(options); // 包含 head、导航、正文、页尾
const sectionHtml = renderMain(options); // 仅正文区块及浅页尾过渡
const matched = resolvePage(data, options.pathname); // 未知路径返回 null
```

静态站生成器/服务器模板可以直接使用这些纯函数。React、Next、Astro 等工程可以按现有组件方式移植区块，保持数据与 DOM 合同；不用重新生成文案或重新猜设计。`renderMain()` 的首屏负边距为配合完整页头，接入已有布局时按现有头部高度调整 `.hero`，并避免重复绘制导航、页尾和过渡。

正式页面的主要内容应在初始 HTML 中可读。不要把全部页面改成加载后才请求 JSON 的客户端空壳。

## 3. 样式与图片

- 拷贝 `public/assets/` 中的独立素材；可统一改到接收工程的品牌资产目录。
- 所有设计 token 由 `public/assets/styles.css` 的 `@layer tokens` 定义。
- 样式只加载到地区页，或按接收工程的作用域方案隔离。不要让本模块的全局 reset/标题规则覆盖其他已完成页面。
- `src/visuals.mjs` 管理图片尺寸、alt、场景坐标和构图。热点按自然图像比例定位；更换/裁剪图片时同步调整坐标。
- 完整效果图只作参考。本实现没有把整张效果图当页面背景。

## 4. 交互

`src/app.mjs` 自动初始化自己的 DOM。现有客户端路由如果不会完整刷新，应在组件挂载后调用导出的 `initialisePage(root = document)`，或把同样逻辑转成工程的组件状态。销毁组件时不要残留全局事件和观察器；整页导航的本地版由浏览器负责销毁页面。

主要 DOM 合同：

- 场景根：`data-scenario-explorer`。
- 场景按钮：`data-scene-select="0|1|2"`，`aria-controls` 指向面板。
- 内容面板：`data-scene-panel="0|1|2"`，完整内容在初始 HTML。
- 选中状态：`.is-active`、`aria-pressed`；增强根 `.is-enhanced`。
- 地区预览：`data-region-preview-select` 与 `data-region-preview-panel` 使用真实 `areaParam`。
- FAQ 与覆盖范围保持原生 `details`。

## 5. 联系预选

示例：

`/contact/?lang=zh&area=western&service=roofing-waterproofing#contact-enquiry-form`

接入 `hydrateContactContext()`，保留现有表单后端、附件与验证。具体代码见 `CONTACT_INTEGRATION.md`。不要把本地邮件草稿演示页替换正式联系页。

## 6. 索引与链接

本地预览服务器始终输出 `X-Robots-Tag: noindex, nofollow`，`robots.txt` 也禁止预览索引。这属于预览服务器的行为，不应复制到正式站点。

`renderPage({preview:false})` 对地区页输出 metadata、canonical、双语 hreflang、WebPage 与 BreadcrumbList。与接收工程既有语言 URL / canonical 策略统一后再发布，避免同页重复 schema、不同域名 canonical 或复制预览 noindex。联系演示与 404 继续 noindex。

导航中的现有服务和其他内容页在独立版指向原站，以便可点击。接入后改成接收工程同源路径或路由组件；地区之间维持现有地址，不创建服务×地区×街区重复页。

## 7. 一次完整验收

保留批准的视觉和文案，完成框架适配后检查：真实路由与双语、图片/热点和展开卡、手机号/邮箱/社交外链、联系预填与原提交链路、移动端、生产构建、canonical/hreflang。不要反复重做与本次集成无关的全站审计。

此包已执行的验证见 `VERIFICATION.md`。生产凭据、正式后端和部署仍由现有工程提供。
