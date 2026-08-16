# Zhixin Paper 生产站 Banner UI 双视口验收报告

- 站点：<https://www.zhixinpaper.com>
- 日期：2026-08-02（Asia/Shanghai）
- 代码基线：`8bb8bbd8d57208ee310b50d3f61875cfc6c33dca`（本地 `HEAD` 与 `origin/main` 一致）
- 源码路由口径：97 个去重公开 URL，来自 `src/app/sitemap.ts` 的静态路由及源码数据集合；不包含运行时数据库中新增且不与静态博客重复的文章
- 目标视口：Desktop `1440x900`；Mobile `390x844`
- 操作约束：只读；未登录；未提交表单；未修改代码
- 结论状态：**受工具限制，未完成视觉验收，不建议据此签署 Banner UI 上线通过**

## 执行摘要

浏览器自动化工具发现调用首次即失败，返回 `No tools available from MCP server.`。按任务要求，失败一次后立即停止该浏览器路径，没有循环重试，也没有调用 `browser_console` 的 expression/scriptPath 模式。

随后仅通过只读 HTTP 抓取与生产站 `sitemap.xml` 建立真实 URL 覆盖清单，并核对页面静态文本结构。该方式可以确认大部分页面可访问且存在 H1、首要说明和 CTA，但**不能**替代 `1440x900` 与 `390x844` 的实际渲染检查，也不能提供截图、计算样式、元素矩形、控制台错误或图片主体裁切证据。

因此：

- 已执行静态样本清单：34 个 URL，覆盖大部分主要实现；独立复核已确认仍有其他独立首屏 JSX 未进入样本，因此不能把 34 页或简单补加后的数量称为完整视觉模板基线。
- 按本轮执行记录统计，HTTP 静态抓取成功：29/34。
- 按本轮执行记录统计，HTTP 静态抓取失败：5/34（抓取代理返回 502，未据此判定生产站故障）。
- 双视口视觉验收：本轮未完成；视觉样本总量需先建立“97 URL → 首屏实现族 → 代表 URL”映射后确定。
- 已确认 P0/P1/P2 产品问题：0；缺少浏览器证据，不能宣称无问题。

## 覆盖 URL 与模板

| # | URL | 实现模板 | 选取依据 | 静态核对 |
|---:|---|---|---|---|
| 1 | `/` | 首页 Banner | 指定 | 成功：H1、说明、2 CTA、图片资源 |
| 2 | `/products` | 产品聚合页 | 指定 | 成功 |
| 3 | `/products/thermal-paper-rolls/standard-pos-rolls` | 纸卷默认详情 | sitemap 与站内真实链接 | 成功：H1、说明、2 CTA、图片资源 |
| 4 | `/products/thermal-paper-rolls/atm-banking-rolls` | 纸卷专用详情：ATM | sitemap 与站内真实链接 | 成功：H1、说明、2 CTA |
| 5 | `/products/thermal-paper-rolls/lottery-gaming-rolls` | 纸卷专用详情：彩票 | sitemap 与站内真实链接 | 成功 |
| 6 | `/products/thermal-paper-rolls/medical-rolls` | 纸卷专用详情：医疗 | sitemap 与站内真实链接 | 成功：H1、副标题、3 CTA、图片资源 |
| 7 | `/products/thermal-labels/direct-thermal-labels` | 标签详情 | 首页真实链接 | 成功 |
| 8 | `/industries` | 行业聚合页 | 指定 | 成功 |
| 9 | `/industries/retail-pos` | 行业详情 | 首页真实链接 | 成功 |
| 10 | `/factory` | 工厂入口页 | 指定 | 成功 |
| 11 | `/factory/overview` | 工厂概览 | 首页真实链接 | 成功 |
| 12 | `/factory/equipment` | 工厂设备 | sitemap | 失败：HTTP 抓取代理 502 |
| 13 | `/oem-custom` | OEM 聚合页 | 指定 | 失败：HTTP 抓取代理 502 |
| 14 | `/oem-custom/custom-printing` | OEM 专项：定制印刷 | sitemap | 失败：HTTP 抓取代理 502 |
| 15 | `/compliance` | 合规聚合页 | 指定 | 失败：HTTP 抓取代理 502 |
| 16 | `/compliance/bpa-free` | 合规详情：BPA | sitemap | 失败：HTTP 抓取代理 502 |
| 17 | `/compliance/reach-rohs` | 合规详情：REACH/RoHS | sitemap 与站内真实链接 | 成功：H1、说明、2 CTA |
| 18 | `/us` | 美国市场页 | 指定 | 成功：H1、说明、2 CTA、图片资源 |
| 19 | `/ca` | 加拿大市场页 | 指定 | 成功：H1、说明、2 CTA、图片资源 |
| 20 | `/eu` | 欧洲市场页 | 指定 | 成功：H1、说明、2 CTA、图片资源 |
| 21 | `/eu/germany` | EU 国家页：德国 | `/eu` 真实链接 | 成功：H1、说明、4 CTA |
| 22 | `/mx` | 墨西哥市场页 | 指定 | 成功：H1、说明、2 CTA、图片资源 |
| 23 | `/us/fda-compliant` | 美国 FDA 专项 | 指定 | 成功：H1、说明、2 CTA、图片资源 |
| 24 | `/case-studies` | 案例聚合页 | 指定 | 成功：H1、说明、CTA |
| 25 | `/case-studies/european-lottery-operator` | 案例详情 | 聚合页真实链接 | 成功：H1、说明、CTA |
| 26 | `/blog` | 博客聚合页 | 指定 | 成功：H1、说明、13 篇文章链接 |
| 27 | `/blog/what-is-thermal-paper` | 静态博客详情 | 博客页真实链接 | 成功：H1、副标题；正文 CTA |
| 28 | `/about` | 关于页 | 指定 | 成功：H1、说明、2 CTA、图片资源 |
| 29 | `/quote` | RFQ 表单页 | 指定 | 成功：H1、说明、表单与提交按钮（未提交） |
| 30 | `/contact` | 联系表单页 | 指定 | 成功：H1、说明、表单与提交按钮（未提交） |
| 31 | `/samples` | 样品表单页 | 指定 | 成功：H1、说明、表单与提交按钮（未提交） |
| 32 | `/faq` | FAQ 页 | 指定 | 成功：H1、说明、正文 CTA |
| 33 | `/privacy-policy` | 隐私政策页 | 指定 | 成功：H1、更新时间、正文 |
| 34 | `/cookie-policy` | Cookie 政策页 | 指定 | 成功：H1、更新时间、正文 |

> 注：本轮 34 个 URL 是已实际执行静态抓取的样本。独立源码复核至少发现 `/products/thermal-paper-rolls`、`/products/thermal-labels`、`/compliance/certificates`、`/compliance/fsc-paper`、`/compliance/eu-food-contact`、`/us/cannabis-labels` 和 `/ca/cannabis-labels` 等自行维护首屏 JSX 的页面尚未进入本轮样本；是否能由其他页面代表，需按结构、样式、数据与 CTA 等价标准建立映射后判断。97 个公开 URL 的口径来自当前本地及 `origin/main` 源码中 sitemap 的去重结果；数据库可继续增加不重复的已发布博客，因此生产 sitemap 总量可能动态增加。

## P0 / P1 / P2 问题

### P0

**未确认。** 无浏览器渲染、截图、DOM 几何或控制台证据，不能确认或排除首屏空白、关键 CTA 不可操作、全屏遮挡等 P0 问题。

### P1

**未确认产品问题。** 以下是验收阻断，不计为站点缺陷：

- 全部 34 个 URL，`1440x900` 与 `390x844`：浏览器工具不可用，无法检查首屏非空、H1/副标题/CTA 可读性、遮罩明暗、图片主体裁切、越界/重叠、首屏高度、标题换行和导航遮挡。
- 全部 34 个 URL：无法读取浏览器控制台的简单 level 过滤结果，阻断错误未验证。
- `/factory/equipment`、`/oem-custom`、`/oem-custom/custom-printing`、`/compliance`、`/compliance/bpa-free`：只读 HTTP 抓取代理返回 502。该响应来自抓取代理，不能作为生产站 502 的证据。

### P2

**未确认产品问题。** 静态提取中出现以下待浏览器复核信号，但提取器可能改变编码或空白，不能据此报缺陷：

- `/eu`、`/eu/germany`：国家/地区旗帜在提取文本中显示为 `🇪🇺` 或 `🇩��` 等异常组合；需要浏览器截图和 DOM 文本复核。
- `/us`、`/ca`、`/eu`：H1 提取文本在地区名前出现多个空格（如 `Thermal Paper Supplier   USA`）；需要实际排版检查，不能仅凭文本归一化结果判断。

## 通过项

以下仅为**静态内容/可达性通过**，不是 Banner UI 双视口通过：

- 29 个成功抓取页面返回了非空正文。
- 成功抓取页面均提取到 H1。
- 主要营销/详情模板普遍提取到首要说明与至少一个 CTA。
- 首页、多个区域页、产品详情和关于页提取到图片资源引用，说明静态内容中存在 Banner/主图候选资源。
- `/quote`、`/contact`、`/samples` 的表单字段与提交按钮存在；全程未填写、未提交。
- `robots.txt` 允许普通公开页面抓取；本次未访问 `/api/`、`/admin/` 或 `/login`。
- `sitemap.xml` 与页面真实链接足以确认所选详情路径属于生产站公开内容。

## 未能验证项

以下项目在每个 URL、每个目标视口均未验证：

| 检查项 | `1440x900` | `390x844` | 所需证据 |
|---|---|---|---|
| 首屏非空 | 未验证 | 未验证 | 截图 + main/hero 可见矩形 |
| H1/副标题/CTA 可读 | 未验证 | 未验证 | 截图 + 可见性/颜色/对比度 |
| 遮罩明暗 | 未验证 | 未验证 | 截图 + overlay 计算样式 |
| 图片主体裁切 | 未验证 | 未验证 | 截图；疑似项用图片与容器矩形、`object-fit/object-position` 复核 |
| 文字/按钮越界或重叠 | 未验证 | 未验证 | 截图 + `getBoundingClientRect` 独立 evaluate |
| 首屏高度 | 未验证 | 未验证 | viewport 与 hero/nav 矩形 |
| 标题换行 | 未验证 | 未验证 | 截图 + H1 行数/高度 |
| 导航遮挡 | 未验证 | 未验证 | nav 与 hero 内容矩形相交检查 |
| 阻断错误 | 未验证 | 未验证 | 控制台仅按简单 level 过滤 + 页面错误状态 |

尤其是“疑似裁切需 DOM 几何复核”无法执行：没有可用浏览器 evaluate/snapshot 工具，因此没有把任何静态图片引用标记为裁切缺陷。

## 源码审计发现与修复优先级

以下结论来自当前本地及 `origin/main` 对应源码，可以作为后续视觉核验线索；它们是实现风险，不冒充双视口视觉缺陷。

### 待视觉确认的源码风险

以下项目均有源码依据，但由于尚无双视口截图、计算样式与 DOM 几何证据，统一按 **P2 待验证风险** 管理，不将其定性为已发生的产品缺陷。

1. **About 页存在较重的遮罩叠加**  
   `/about` 的背景图先使用 `opacity-90`，其上再叠加全屏约 45% 深色层和左侧约 35% 深色层。左侧文字区可能比其他页面更暗，应以真实截图校准文字区对比度和背景细节，再决定是否合并为单层渐变。

2. **共享媒体 Banner 的遮罩强度无法按图片调整**  
   `HeroBanner` 的 `media` 变体统一使用左侧约 78%、中部约 56% 的深色遮罩。该模板覆盖标签详情、工厂能力、OEM、案例及部分合规页面；应先对明暗差异较大的原图建立截图基线，再决定是否增加受限的 `overlayTone` 或 `overlayStrength` 配置。

3. **About 与 MX 使用较高的固定最小高度**  
   `/about` 在外层与内容层设置 `620px/700px` 最小高度，`/mx` 使用约 `620px` 首屏。该实现可能在短屏移动设备上占用过多首屏空间，但 `620px` 本身不能证明已经发生问题，需要用 hero 与 viewport 几何确认。

4. **移动端图片焦点缺少逐图控制**  
   首页和标签详情等页面使用 `object-cover` 及固定横向焦点；同一焦点不一定适合不同产品图和手机比例。应在 `390x844` 逐图确认主体完整后，再决定是否增加桌面/移动两个焦点配置。

5. **标题宽度和换行规则不统一**  
   共享 `HeroBanner` 已使用响应式宽度与 `break-words`，但区域页、博客、FAQ 等独立首屏各自维护字号和 `max-width`。长文章标题、国家名称及未来多语言文本需要截图和行数数据确认。

6. **相似 Banner 重复维护**  
   US、CA、EU，Contact、Samples，以及博客静态/数据库分支均存在近似首屏 JSX。这是可确认的维护风险，不代表当前视觉已异常；视觉基线通过后再评估是否抽取区域 Hero、表单页 Hero 和博客文章 Hero。

7. **法律页面没有独立 Banner**  
   `/privacy-policy` 与 `/cookie-policy` 的 H1 直接位于正文区域。这不构成功能错误；是否增加紧凑型浅色 `PageHeader` 属于视觉一致性决策。

## 建议执行顺序

1. 先建立“97 个源码公开 URL → 首屏实现族 → 代表 URL”映射，再恢复浏览器能力，对每个确认后的代表页建立 `1440x900` 与 `390x844` 截图、对比度和元素矩形基线。
2. 根据真实证据确认问题等级，优先修复遮挡、不可读、严重裁切或首屏高度失衡等高影响问题。
3. 在确认的高影响问题中，先处理覆盖面最大的共享 `HeroBanner`，再处理 `/about`、`/mx` 等页面专属实现。
4. 视觉结果稳定后，再抽取区域页、表单页、博客页的重复首屏，避免在未确认基线前扩大改动。
5. 对 97 个源码公开 URL 做模板映射回归；同一模板代表页异常时，扩大为该模板逐页检查。

## 源码证据

- 共享 Banner：`src/components/ui/HeroBanner.tsx`
- 首页：`src/app/page.tsx`
- About：`src/app/about/page.tsx`
- MX：`src/app/mx/page.tsx`
- 区域页：`src/app/us/page.tsx`、`src/app/ca/page.tsx`、`src/app/eu/page.tsx`
- 标签详情：`src/app/products/thermal-labels/[slug]/page.tsx`
- 博客详情：`src/app/blog/[slug]/BlogPostClient.tsx`
- 表单页：`src/app/contact/ContactClient.tsx`、`src/app/samples/SamplesClient.tsx`

## 限制与后续验收条件

首次浏览器工具发现命令：`accio-mcp-cli keyword browser`；结果：`No tools available from MCP server.`。该路径按要求立即停止，没有再次发现、安装或调用其他浏览器工具。

要形成可签署的最终验收结论，需要在提供浏览器 snapshot/evaluate/截图能力后重新执行全部 URL 的两个固定视口；控制台仅做简单 level 过滤，DOM 数据通过 snapshot/evaluate 独立调用，并对所有疑似裁切或重叠记录元素矩形证据。
