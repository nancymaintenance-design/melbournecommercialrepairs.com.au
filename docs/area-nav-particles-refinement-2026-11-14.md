# 地区粒子与共享导航修订

2026-11-14。本轮仅落实用户最新三项修订，在本地 8765 预览。

## 实际改动

- 首页地区模块及 `/areas/melbourne/` 删除整条时间文字、滑块、暂停按钮和循环说明。控制器不依赖这些元素，不生成替代开关，默认自动循环。
- 地区与 Contact 取消各自导航尺寸缩放，回到其他内页已有的固定圆角导航：顶部16px、宽94.6%、高66px，Logo46px。保留首页原有导航形态和四场景随色逻辑。全站导航文字桌面14px；1051–1200px为13px，手机菜单15px。小尺寸使用同一菜单行为。
- 导航“联系我们”使用荧光绿圆角按钮、电蓝文字及橙色底边，悬停轻微抬升，URL与中英文切换保留。
- `I love Melbourne` 使用本地 Pacifico 连体手写字体。字形完整边界按城市画面宽度50%拟合，并在城市窗口水平、垂直居中；桌面实际756.99px/1514px，手机180.01px/360px。
- 粒子淡粉色，桌面最多4500点、手机1400点；加入同字形12%清晰粉色底层帮助连接笔画，无模糊滤镜。17–20点随夜色渐显，20–5点完整，5–8点渐隐，8–17点完全隐藏。台座、城市构图、卡片和正文保持。
- 仍支持系统减少动态效果；离屏/隐藏页节电暂停。公开页面没有播放控制。测试用 `ma:set-time` 仅用于本地检查固定时刻。

## 检查与截图

构建、语法、资源版本、视觉保护、`tests/areas.cjs` 与 `tests/area-effects.cjs` 均通过。42页均只加载一次共享导航补丁且位于样式表末尾。10区入口和单H1保留。

浏览器实际检查1536×1024中英文导航、390×844手机、1024×768平板菜单。地区/Contact/Services导航矩形、Logo尺寸和14px字号一致。联系CTA实点进入Contact，中文标题、单表单、首屏提交入口正常。手机菜单正常展开关闭，联系入口44px高，没有横向溢出。Contact英文手机提交按钮底边767px，在844px首屏内。

真实Canvas：14:00 alpha=0且非透明像素为0；18:30 alpha=.5；22:00 alpha=1；06:00 alpha=.7407。字体加载为ready后才采样，没有回退字体跳动。默认自动时间从14.008推进至14.129，无公开开关。减少动态效果保留同字体静态夜字并关闭视差。

保护快照40项全部一致：29页正文、首页其他8个版块及Contact主体/表单/介绍3部分。未修改正文、表单字段、联系方式、URL、已认可建筑视觉或10区卡片。

证据目录：本站 `reports/area-nav-particles-refinement-2026-11-14/`。包括 `area-day.png`、`area-night.png`、`day-night-comparison.png`、`shared-navigation-comparison.png`、`contact-desktop.png`、`area-mobile-night.png`、`mobile-navigation.png`、`contact-mobile-en.png`、`scope-before.json`、`scope-after.json`。

字体来源：https://fonts.google.com/specimen/Pacifico 。本地 `assets/fonts/Pacifico-OFL.txt` 保留 SIL Open Font License；没有把某个字体描述为经统计证实的澳洲最受欢迎字体。

本轮没有推送、部署、远程服务器或DNS操作。
