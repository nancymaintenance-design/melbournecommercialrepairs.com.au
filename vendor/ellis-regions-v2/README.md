# Ellis 墨尔本地区页面 · V2 代码交付

本包提供 **1 个地区总览 + 10 个大区详情，中英双语，共 22 个页面版本**，另附中英文联系预选演示。代码和内容已分开，供 Codex 接入现有网站，完成最终集成、必要检查与部署。

**V2 的总览页以用户批准的 `public/assets/design-reference-overview.png`（1024 × 1536）为视觉参照。** 这一版按该稿重新组织了版面和独立图片；请同时保留代码、图片、字体与最终样式层，不要只取 JSON 重新搭建普通卡片页。

## 先看批准稿与实际代码

解压整个压缩包后，双击 **`START_HERE.html`**。它打开离线预览台，可以切换页面、中文/English 和视口宽度。请保持 `preview/` 与 `public/assets/` 的相对位置。

以下参数在离线入口和本地 `/preview/` 中均可使用：

| 模式 | 离线入口示例 | 用途 |
|---|---|---|
| 设计稿宽度 | `START_HERE.html?width=1024` | 按 1024px 宽度查看实际网页 |
| 并排对照 | `START_HERE.html?compare=1` | 左侧批准稿，右侧实际代码页面 |
| 纯页面截图 | `START_HERE.html?capture=1&width=1024` | 隐藏预览工具栏，显示实际页面 |

批准稿只在对照模式中展示，**没有用整张效果图代替网页**。地区选择、场景展开、FAQ、导航与联系参数均由真实组件处理。

V2 实际浏览器截图的交付位置为：

- `docs/previews/ellis-region-hub-v2.jpg`：实际地区总览页。
- `docs/previews/ellis-region-comparison-v2.jpg`：批准稿与实际页面并排对照。

最终浏览器检查范围与结果以 `docs/VERIFICATION.md` 为准；这些文件名本身不代表已经完成全部验证，也不承诺逐像素一致。

## V2 的界面结构

地区总览保持这条紧凑顺序：

**Hero → 服务导航 → 5 × 2 地区卡 → 选中地区图文面板 → 橙色服务条 → 蓝黄咨询引导条 → 窄覆盖范围 → 紧凑暖黑页尾。**

- 首屏使用填满画面的墨尔本地标风格插图，标题与保险、CTA 紧凑排列。
- 十张地区卡使用各自的建筑近景插图。卡片主区域是预览按钮；右下角箭头是进入地区详情的独立链接，两者没有嵌套。
- 展开面板使用独立预览图和精选服务链接；不是放大卡片截图。详情页的 3D 场景素材继续独立配置。
- 总览原有介绍、完整服务内容、规划说明与覆盖地名保留在 HTML 的覆盖范围展开区，减少默认视图的重复大区块。
- 联系信息、保险与四个社交外链保留在暖黑页尾；总览页以紧凑排列和可展开资料收束内容。

这些图片是建筑与维护**场景示意**，不是已完成项目、客户照片或测绘地图。素材说明见 `docs/ASSET_PROVENANCE.md`。

## 必须一起接入的样式与字体

`public/assets/styles.css` 提供基础组件与样式层顺序，并通过：

```css
@import url('./fidelity.css') layer(fidelity);
```

加载 **`public/assets/fidelity.css`**。`fidelity` 是最后的层叠层，负责 V2 的比例、间距、字体、图片框架、卡片、横条及紧凑页尾。**遗漏该文件或改变它的层叠优先级，会退回偏离批准稿的旧布局。** 接入现有工程时可以做样式作用域适配，但要保留这套关系。

本地字体 `ellis-sans-sc-400.woff` 和 `ellis-sans-sc-700.woff` 由 Noto Sans CJK SC 制作项目子集，在 `fidelity.css` 中声明；随包保留 `docs/FONT_LICENSE.txt`。新增中文字时应补充子集并保留系统字体回退。页面不依赖外部字体请求。

## 本地运行

需要 Node.js 20 或以上，无需安装第三方依赖。

```bash
npm start
```

打开：

- [预览台](http://localhost:8765/preview/)
- [1024px 对照模式](http://localhost:8765/preview/?compare=1)
- [地区总览](http://localhost:8765/areas/melbourne/?lang=zh)
- [西区详情示例](http://localhost:8765/areas/melbourne/western/?lang=zh)

可用 `PORT` 或 `node server.mjs --port 9000` 改端口。`SITE_ORIGIN` 设置现有网站来源；`CONTACT_MODE=existing` 将咨询入口交给现站联系页。

```bash
npm test
npm run build
```

`build` 生成离线预览、浏览器脚本和独立运行目录 `dist/`。其中包含 `START_HERE.html` 与 `preview/`；运行 `node dist/server.mjs` 后也能使用 `/offline/`。独立服务器保留预览用 `noindex`，正式集成应使用接收工程既有的路由与索引策略。

## 给 Codex 的入口

先读 `CODEX_PROMPT.md`，再按 `docs/INTEGRATION.md` 接入。

| 文件 | 用途 |
|---|---|
| `public/assets/design-reference-overview.png` | 用户批准的总览视觉参照，仅供对照 |
| `src/render.mjs` | 真实 HTML、地区布局、页头页尾及元信息 |
| `src/app.mjs` | 场景展开、地区预览、移动导航和动效 |
| `src/contact-context.mjs` | 现有联系表单的参数预填适配 |
| `src/region-links.mjs` | 地区/服务路径与参数白名单 |
| `src/visuals.mjs` | `hero`、`card`、`preview`、详情场景及热点映射 |
| `data/region-pages.json` | 完整双语内容、10 大区、67 地名及关联关系 |
| `public/assets/styles.css` + `fidelity.css` | 基础样式与必须保留的 V2 最终样式层 |
| `public/assets/*.woff` + `docs/FONT_LICENSE.txt` | 本地字体子集及许可 |
| `preview/` | 构建生成的 24 个离线页面 |
| `docs/CONTACT_INTEGRATION.md` | 保留现有提交系统的接入方法 |
| `docs/VERIFICATION.md` | 测试与浏览器检查的实际记录 |
| `docs/ASSET_PROVENANCE.md` | 插图、缩略图与字体来源 |

## 交接边界

交付范围是本轮地区系列；服务详情等其他页面继续指向现有网址。当前提供独立可运行模块，Codex 将它接回现有工程，**无需另建框架或重写网站架构**。

保留 `?lang=zh/en`、10 个既有地区路径、12 项服务链接和可修改的地区/服务预选。细分地名在覆盖范围中展开，不批量新建小街区页面。

联系演示只准备邮件草稿，由访客在邮件应用确认发送。正式网站沿用原有表单提交、附件和后台，预填适配器不接管提交逻辑。此包没有部署新生产站点，也没有添加虚构项目、评分、响应时效或分支地址。
