# 恢复内页视觉与商业种类展台

用户最新纠正：仅取消一个重复大视觉，不接受把内页改成小模型双栏或无模型纯色背景板。本记录覆盖此前 compact 设计方向。

## 恢复

`content/design-shell.cjs` 恢复 d1733f2 原第一主视觉的完整 HTML 构成，29 个页面逐页精确对照一致。只移除第二个 `reference-bridge` 拼接；原大模型、机电三层、SPACES/HVAC 等艺术字、配色、按钮和分类导航恢复。`inner-flow.css` 清除上一轮缩小模型和无图主题板规则，只保留全幅机电标签的视口边界修正。现有 designer.css 与 designer-motion.js 继续提供原效果。

## 商业种类

`/sectors/` 使用 `content/sector-explorer.cjs`、`sector-explorer.css`、`sector-explorer.js`：

- 一张完整的八类建筑岛屿，与独立橙色弧面背景组合。
- 8 个编号热点、8 个底部选择项及一张当前详情卡同步。
- 点击选择、方向键/Home/End、真实详情链接；无需等待动画。
- 保留八项原正式名称、介绍、全部标签、中英文和 URL。
- 单个控制器协调轻微取景、呼吸及原生滚动位移；减少动效时静态呈现，入口可用。

两张新素材均用内置 ImageGen 按用户参考生成，已检查：`assets/sectors/sector-campus-v1.png`（1774×887，透明）与 `sector-orange-backdrop-v1.png`（1586×992，独立背景）。提示及原始输出路径记录在本站 reports/sector-design-restoration-2026-11-14/。没有把用户截图整张当网页背景，也没有用 CSS 绘制建筑替代真实素材。

## 验证

- 32 页单 H1；29 个原主视觉与正式正文逐页精确保留；31 页 SEO 元数据保留。
- 八个热点/选项/详情及全部原中英介绍和标签对应；0 个重复 bridge、0 个第二目录。
- 首页原四场景、首页服务展柜和 /services/ 三卡目录保护检查通过。
- 1579 个本地内链引用、132 个图片引用、32 页资源哈希版本与语法/构建检查通过。
- 实测桌面八个热点、手机中英各八状态、键盘切换、真实仓库详情跳转、减少动效；无横向溢出，最终控制台错误为 0。
- 代表原模板 H1 顶部：HVAC 154px、零售约120px、关于154px。全幅模型宽分别约1495、1359、1440px（1500px视口），已恢复到原设计规模。
- HVAC 滚动550px时屋顶 Y≈-53px、管线 Y≈-13px、楼体Y=0，独立分层动作保留。

详细截图与对照：`E:/Ellis-Services/Ellis Services WordPress/reports/sector-design-restoration-2026-11-14/`。

当前仅本地 `http://127.0.0.1:8765/sectors/?lang=zh`。未推送、未部署或修改生产服务器。
