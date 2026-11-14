# Melbourne 地区目录 — 本地视觉版本

本轮以用户最后确认的《墨尔本地标服务地区目录.png》为唯一视觉目标：复原同一电蓝舞台、城市画面、荧光绿拱环、彩色椭圆台座和上下各五个入口。用户明确纠正了之前的实景照片方向，因此公开页面没有使用另找的实景照片。

## 修改范围

- 首页 `#areas`：保留 H2，使用同一目录组件。
- `/areas/melbourne/`：单一 H1，取消该页旧的重复建筑 Hero 与重复地区正文，沿用原 SEO 标题。
- 十个入口分别指向十个实际大区页面；标题来自《墨尔本核心地名.md》，不展示下属街区。第十项中文是英文标题 Frankston & Mornington Peninsula 的译名。
- 既有服务、行业、资讯、FAQ、关于和 Contact 内容与设计保留。

## 动效与实现

卡片名称、编号、链接、按钮与时间控制均为实际 HTML。城市、拱环和台座为从用户设计图独立整理的无文字背景；原始 Logo 沿用现有透明 PNG。三张 WebP 合计约 1.26 MiB。

日景、黄昏、夜景以同一相机编辑，只在城市窗口交叉淡化。台座固定，避免素材边缘的小差异造成跳动。淡粉色 `I love Melbourne` 由 Canvas 点阵组成，有聚散呼吸；前景卡片与名称不参与城市视差。舞台进入时轻微展开，悬停抬升，不绑定新的滚动锁屏。

场景时间以 96 秒演示一个 24 小时循环，不声称是墨尔本实时钟。拖动时间滑块会暂停自动，可恢复；视差限制为滚动约 ±3px、指针约 ±2px。减少动态效果时保留静态文字与当前光照，关闭循环、视差和入场运动；离屏及隐藏页暂停动画。每页一个控制器、一个 Canvas。

## 验证

`npm run build`、`npm run check`、`npm run test:assets`、`npm run test:visuals`、`node tests/areas.cjs` 通过。42 页共检查 1997 个内部链接和 171 个图片引用；31 份既有 SEO metadata、27 个既有视觉章节及正文受保护。

本轮快照核对：首页八个其他 section 精确 SHA256 不变；30 个其他内页仅因共享 detail.js 新增区域导航激活而更新脚本缓存版本，正文和结构不变；footer.html 字节不变。连续构建两次输出一致。

浏览器核对：1536×1024 中英文、390×844 手机中英文；十个标题与入口完整，最长英文名称不溢出。手机英文咨询按钮修正为自然换行。实测第十区导航、英文保留、单 H1、返回目录及地区导航激活。时间滑块 Home 显示 00:00 并停止自动；按钮恢复自动；减少动态效果时 animation=none、城市 transform=none。两页各一套地区组件，首页正常衔接下方资讯。无控制台错误。首页、总览与十个子区 HTTP 均为 200。

## 本地预览与证据

- http://127.0.0.1:8765/areas/melbourne/?lang=zh
- http://127.0.0.1:8765/?lang=zh#areas
- 本站 `reports/melbourne-area-theatre-2026-11-14/`：reference-vs-desktop.png、desktop-day.png、desktop-dusk.png、desktop-night.png、desktop-en.png、day-dusk-night.png、mobile-zh.png、mobile-en.png、home-areas.png；另有内容、保护快照、资产原件与提示词记录。

只在既有本地 8765 端口预览。没有推送、部署、远程服务器或 DNS 操作。
