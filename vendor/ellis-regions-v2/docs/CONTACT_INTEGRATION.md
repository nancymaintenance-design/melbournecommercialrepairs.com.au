# 联系页接入：地区和服务预选

这套地区页已经把咨询入口接成真实 URL，例如：

```text
/contact/?lang=zh&area=western&service=roofing-waterproofing#contact-enquiry-form
```

`area=western` 是现有地区路由的末段；内容数据的 ID `western-suburbs` 不直接写进查询参数。英文入口同样明确保留 `lang=en`。

## 正式网站需要接入的部分

正式联系页保留现有的提交、文件上传、验证码及后端处理。只接入 `src/contact-context.mjs` 的预选逻辑。

现有表单提供以下名称即可：

```html
<form id="contact-enquiry-form">
  <!-- 其余现有字段和提交行为照常保留。 -->
  <label for="contact-area">物业所在地区</label>
  <select id="contact-area" name="area">
    <option value="">请选择地区</option>
    <!-- 由 region-pages.json 的 regions 生成： -->
    <option value="western">西区</option>
  </select>

  <label for="contact-service">需要的服务</label>
  <select id="contact-service" name="service">
    <option value="">请选择服务</option>
    <!-- 由 SERVICE_CATALOG 生成完整 12 项： -->
    <option value="roofing-waterproofing">屋顶、防水与建筑修复</option>
  </select>
</form>
```

上面的两组选项仅用于说明字段名称；交付包的 `render.mjs` 已实现完整 10 个地区、12 项服务的选项生成，可以直接复用。地区使用 `areaParam` 作为 option value，服务使用 `slug`。

### 普通 HTML / 非受控表单

在现有联系页挂载后调用一次。`regionData` 是本包的 `data/region-pages.json`，由项目现有的数据加载方式提供：

```js
import { hydrateContactContext } from './contact-context.mjs';

export function mountRegionContactPrefill(regionData, currentLang) {
  return hydrateContactContext(document, {
    data: regionData,
    search: window.location.search,
    lang: currentLang === 'zh' ? 'zh' : 'en',
  });
}
```

适配器只会填写空白且存在相应选项的字段，然后触发 `input` 和 `change` 事件。已有选择和用户编辑默认保留。返回值包含 `{ context, formFound, applied }`，方便集成时定位是否找到表单与具体更新了哪些字段。

在 SPA 中，每次联系页新实例挂载时调用即可；不要在每次输入重绘时反复覆盖字段。需要明确重置为新链接上下文时可传 `overwrite: true`，普通进入流程无需该参数。

### React 等受控表单

受控字段应使用纯函数初始化现有表单状态，避免直接修改 DOM 后又被框架状态覆盖：

```js
import { createRegionLinks } from './region-links.mjs';

const initialContext = createRegionLinks(regionData)
  .readContactContext(search, currentLang);

// 在现有表单的初始值/loader 中合并这两项：
const initialValues = {
  ...existingInitialValues,
  area: existingInitialValues.area || initialContext.area || '',
  service: existingInitialValues.service || initialContext.service || '',
};
```

`search` 由当前路由提供；SSR 项目应在服务器与客户端使用相同参数。字段后续继续由现有表单库管理，不必引入第二套提交机制。

## 已提供的接口

| 文件 | 导出 | 用途 |
| --- | --- | --- |
| `region-links.mjs` | `SERVICE_CATALOG` | 完整 12 项服务的 `slug`、`route` 与 `names.zh/en` |
| `region-links.mjs` | `createRegionLinks(data)` | 地区链接、服务链接、咨询链接与上下文解析 |
| `contact-context.mjs` | `readContactContext(search, { data, lang })` | 不操作 DOM 的解析入口 |
| `contact-context.mjs` | `hydrateContactContext(root, options)` | 现有非受控表单的一次性预选 |
| `contact-context.mjs` | `validateEnquiry(values, lang)` | 独立演示表单的双语校验 |
| `contact-context.mjs` | `createEmailDraft(values, options)` | 独立演示表单的邮件草稿链接 |

上下文包含 `lang`、`area`、`regionId`、`areaName`、`service`、`serviceName`；无有效值时返回 `null`。不认识的地区、服务与 URL 注入内容被忽略。有效服务可独立预选，不要求必须同时传地区。

中文与英文展示名称根据当前语言选取。传入 `lang` 时以页面当前语言为准；不传时读取 URL 的 `lang`，非 `zh` 值按英文处理。

## 本地演示与正式提交的边界

交付版 `/contact/` 为了可以直接体验，使用 `data-mail-draft` 启用邮件草稿流程。页面会验证姓名、邮箱及需求内容，然后在访客自己的邮件应用中打开草稿；页面不会发送咨询，也不会把表单资料保存到浏览器存储。

正式网站接入时：

1. 使用 `hydrateContactContext()` 或纯解析方式完成预选。
2. 保留现有后端提交逻辑。
3. 不把演示的 `data-mail-draft`、`mailto:` 表单 action 或演示说明搬到正式提交表单。

`hydrateContactContext()` 本身没有 submit 监听，没有网络请求，没有自动提交。地区页上的咨询按钮可以先接入正式联系页，即使后端提交系统完全不变。

## 已验证的参数

10 个地区的 `area` 值：`cbd-inner`、`eastern`、`south-east`、`western`、`northern`、`north-east`、`north-west`、`bayside-southern`、`casey-cardinia`、`frankston-mornington-peninsula`。

自动化测试包括双语路由往返、完整 12 项服务、未知/畸形参数过滤、保留用户修改及邮件内容编码。无需为这次预选改动新建 API。
