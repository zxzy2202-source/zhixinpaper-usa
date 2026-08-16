# 全站 URL、内链与 Google SEO / GEO 审计报告

审计对象：Zhixin Paper Next.js 网站  
审计方式：源码只读审计，覆盖 App Router 页面、共享布局、Sitemap、Metadata、JSON-LD、Header/Footer、产品/行业/地区/合规/工厂/博客/案例模板。  
审计时间：2026-08-06  

## 一、执行摘要

### 总体判断

网站的 SEO/GEO 基础设施属于**中上水平**：核心产品、行业、地区和合规页面已经具备较完整的页面结构、canonical、Sitemap、面包屑、FAQ 或实体结构化数据，并且行业详情模板的 GEO 内容质量较强。

当前主要问题不是“全站没有 SEO”，而是**路由治理、模板一致性和内链权重分配不稳定**：

1. 工厂栏目存在同一 URL 的动态模板与显式页面两套实现。
2. Header 的 Export 顶级入口固定指向 `/eu`，地区父链语义错误。
3. 一部分页面使用完整 `buildMetadata()`，另一部分只输出基础 metadata，依赖根布局隐式继承 OG/Twitter/robots。
4. Footer 没有稳定传递地区、博客首页、关键合规页和主要行业页。
5. 动态博客、产品、案例的相关推荐存在自链、固定前几项和 DB 内容互链不足问题。
6. 部分地区和合规页面正文 GEO 信息已有，但 JSON-LD 没有同步表达实体关系。
7. robots 明确限制多个 AI 抓取器；这不是技术错误，但会直接影响相应 AI 搜索渠道的可见性。

## 二、URL 与 Sitemap 覆盖

### 2.1 页面分类

源码中共发现 **72 个 `page.tsx`**：

```text
72 = 18 个 admin + 2 个直接 notFound catch-all + 9 个公开动态路由文件 + 43 个公开静态路由文件
```

证据：`src/app/**/page.tsx` 枚举。

- 后台页面：18 个，不应进入公开 Sitemap。
- `/us/[slug]`、`/ca/[slug]`：直接 `notFound()`，不是可索引内容页。
- 公开动态路由文件：9 个。
- 公开静态路由文件：43 个。

动态路由已知参数实例：

```text
11 个纸卷产品
+ 11 个标签产品
+ 12 个行业
+ 5 个 EU 国家
+ 6 个动态合规项目（bpa-free 有独立静态页）
+ 4 个案例
+ 3 个工厂页
+ 4 个 OEM 页
+ 11 个静态博客
= 67 个已知动态实例
```

动态参数证据：

- `src/app/products/thermal-paper-rolls/[slug]/page.tsx:193-199`
- `src/app/products/thermal-labels/[slug]/page.tsx:22-24`
- `src/app/industries/[slug]/page.tsx:19-21`
- `src/app/eu/[country]/page.tsx:31-33`
- `src/app/compliance/[slug]/page.tsx:15-16`
- `src/app/case-studies/[slug]/page.tsx:14-16`
- `src/app/factory/[slug]/page.tsx:297-299`
- `src/app/oem-custom/[slug]/page.tsx:192-194`
- `src/app/blog/[slug]/page.tsx:41-43`

### 2.2 Sitemap 数量与去重

`sitemap.ts` 的静态数组约 47 项，代码生成的已知动态项约 61 项，原始项约 108 项。

已确认的重复项：

- EU 5 个国家页同时出现在静态数组和动态数组。
- `/compliance/bpa-free` 同时出现在静态数组和动态合规数组。

最终去重由 `uniqueSitemap()` 完成：

- 去重函数：`src/app/sitemap.ts:26-36`
- 最终合并：`src/app/sitemap.ts:159-169`

已知唯一 URL：

```text
108 - 5 - 1 = 102
```

数据库中已发布博客会额外加入 Sitemap：

- 查询：`src/app/sitemap.ts:119-131`
- URL 映射：`src/app/sitemap.ts:133-141`

因此运行时完整数量应表达为：

```text
最终唯一 Sitemap URL = 102 + N - R
```

其中：

- `N`：数据库中已发布博客数
- `R`：数据库博客与静态博客 URL 的重复数

本次源码审计未连接生产数据库，因此不猜测 `N` 和 `R`。

### 2.3 覆盖结论

对已知公开静态页和已知动态实例进行源码集合比较：

```text
公开 URL → Sitemap 缺失：0 / 109
已知 Sitemap URL → 公开路由缺失：0 / 102
```

结论：**已知公开 URL 的 Sitemap 覆盖良好**。但 DB 博客需要运行时核对，且 Sitemap 与动态路由数据源存在维护分叉风险。

## 三、Google SEO 技术审计

### 3.1 已有优点

根布局提供：

- 全局 title / description
- metadataBase
- OpenGraph
- Twitter Card
- robots index/follow
- WebSite JSON-LD
- Organization JSON-LD

证据：

- `src/app/layout.tsx:27-55`
- `src/app/layout.tsx:95-103`
- `src/lib/seo.ts:80-144`
- `src/lib/seo.ts:305-315`

`buildMetadata()` 已统一输出：

- title
- description
- canonical
- hreflang
- robots
- OpenGraph
- Twitter

证据：`src/lib/seo.ts:21-75`。

### 3.2 P0：动态 Metadata 输出不统一

重点文件：

- `src/app/blog/[slug]/page.tsx:62-104`
- `src/app/products/thermal-paper-rolls/[slug]/page.tsx:197-264`
- `src/app/factory/[slug]/page.tsx:297-302`
- `src/app/oem-custom/[slug]/page.tsx:192-197`

问题：

- 有些分支使用 `absolute title`，有些使用普通 title。
- 有些分支自定义 OpenGraph，有些只依赖根布局。
- Twitter、robots、OG URL、OG 图片兜底并未统一。
- Blog 动态页的数据库分支可能产生 `文章标题 | Blog | Zhixin Paper`，若数据库 title 自带品牌名还可能重复品牌后缀。

影响：Google 页面标题、分享卡片、canonical 和爬虫指令可能因页面分支不同而不一致；AI 引用时页面实体的标题和摘要也会不稳定。

建议：所有公开动态页面统一调用一个共享 metadata builder，显式输出 canonical、OG、Twitter 和 robots，不依赖根布局对嵌套对象的隐式继承。

### 3.3 P0：Product Schema 绝对 URL 拼接风险

证据：`src/lib/seo.ts:173-174`。

当前逻辑直接执行：

```ts
image: `${SITE_URL}${image}`
url: `${SITE_URL}${url}`
```

如果调用方传入绝对 URL，可能生成非法 URL。

建议：增加统一 `absoluteUrl()`，对绝对 URL 原样保留，对相对路径再拼接站点域名。

### 3.4 P1：JSON-LD 实体重复与覆盖不均

Organization 在根布局和多个页面重复注入：

- `src/app/layout.tsx:100-103`
- `src/app/about/page.tsx:151-153`
- `src/app/compliance/page.tsx:106-112`
- `src/app/factory/page.tsx:150-156`
- `src/app/eu/page.tsx:105-108`
- `src/app/us/page.tsx:105-108`
- `src/app/ca/page.tsx:105-108`

问题不是必然导致索引失败，而是缺少稳定 `@id`，实体维护与合并不够清晰。

建议：根布局只提供一个带稳定 `@id` 的 Organization；页面通过 `@id` 引用，不重复创建相同实体。

### 3.5 P1：Breadcrumb 覆盖不完整

产品、行业、部分区域页覆盖较好，但以下页面族存在缺口或不一致：

- 部分工厂子页面
- 部分合规子页面
- 部分 OEM 子页面
- privacy / cookie policy
- Blog 列表页
- 部分动态内容页

工具定义：`src/lib/seo.ts:198-208`。

特别发现：

- 标签产品详情 Breadcrumb 包含 Home。
- 纸卷详情 Breadcrumb 从 Products 开始，缺少 Home。
- 证据：`src/app/products/thermal-paper-rolls/[slug]/page.tsx:431-436` 与 `src/app/products/thermal-labels/[slug]/page.tsx:139-145`。

建议统一可视面包屑与 BreadcrumbList 层级。

### 3.6 P1：动态合规页结构化数据弱于 BPA 专页

动态合规页有可视面包屑，但没有对应 JSON-LD：

- `src/app/compliance/[slug]/page.tsx:145-151`
- 正文信息：`src/app/compliance/[slug]/page.tsx:165-213`

BPA 专页则有 Breadcrumb、WebPage、DefinedTermSet、FAQ：

- `src/app/compliance/bpa-free/page.tsx:89-129`

建议为动态合规模板统一补 BreadcrumbList + WebPage/DefinedTerm 或 FAQ（仅在正文存在完全一致问答时）。

### 3.7 P2：FAQ / Article / Product Schema 覆盖不统一

- FAQ Schema 主要集中在 FAQ、产品、区域页和部分合规页。
- 部分有可见 FAQ 的页面没有 FAQPage 结构化数据。
- 案例 Article 缺少 `datePublished`、`dateModified` 和 Breadcrumb：`src/app/case-studies/[slug]/page.tsx:37-54`。
- Blog Article 需确认 `src/app/blog/[slug]/page.tsx:146` 与 `:192` 是否为互斥分支；若非互斥则存在重复 Article。

## 四、内链与信息架构审计

### 4.1 P0：工厂同 URL 双模板

动态模板：

- `src/app/factory/[slug]/page.tsx:11-77`
- `src/app/factory/[slug]/page.tsx:78-131`
- `src/app/factory/[slug]/page.tsx:297-299`

显式同路径页面：

- `src/app/factory/overview/page.tsx`
- `src/app/factory/equipment/page.tsx`
- `src/app/factory/capacity/page.tsx`
- `src/app/factory/quality-control/page.tsx`
- `src/app/factory/virtual-tour/page.tsx`

影响：5 个公开工厂二级 URL 存在内容源分叉。实际路由通常由显式目录优先，但动态模板仍被维护和生成参数引用。

建议：保留一套实现，删除影子模板或把动态模板改成唯一实现；同时统一工厂兄弟页导航。

### 4.2 P0：Export 顶级入口错误指向 `/eu`

证据：

- 顶级链接：`src/components/layout/Header.tsx:672-680`
- 地区菜单：`src/components/layout/Header.tsx:517-570`
- 移动端菜单：`src/components/layout/Header.tsx:633-638`

当前语义是：

```text
Export → Europe
Export 菜单下同时包含 Europe / USA / Canada / Mexico
```

这不是正确的父子信息架构。建议建立 `/markets` 或 `/regions` 作为独立父级，让 `/eu`、`/us`、`/ca`、`/mx` 成为兄弟页。

### 4.3 P1：Footer 地区和关键内容集群入口不足

Footer 当前主要覆盖 Products、Capabilities、Company、法律页：

- `src/components/layout/Footer.tsx:17-43`
- 法律与 Sitemap：`src/components/layout/Footer.tsx:129-136`

缺少稳定入口：

- `/eu`、`/us`、`/ca`、`/mx`
- 欧洲国家页
- `/blog` 博客首页
- 主要合规叶子页
- 主要行业详情页
- `/samples`
- `/faq`

影响：地区和合规 GEO 集群主要依赖 Header、Sitemap 或页面内链，缺少全站稳定传递。

### 4.4 P1：数据库博客相关推荐存在自链且 DB 文章互链不足

证据：`src/app/blog/[slug]/BlogPostClient.tsx:52-60`。

数据库文章相关推荐只读取静态 `BLOG_POSTS`，并且没有明确排除当前 slug；静态分支有排除逻辑：`src/app/blog/[slug]/BlogPostClient.tsx:165-171`。

影响：

- 数据库文章可能链接回自己。
- 数据库文章之间无法形成主题集群。
- 新文章可能只依赖列表页和 Sitemap 被发现。

建议：统一读取静态 + DB 已发布文章，过滤当前 slug，并按分类、主题、产品、行业字段排序。

### 4.5 P1：产品相关推荐固定数组前四项

证据：

- 纸卷：`src/app/products/thermal-paper-rolls/[slug]/page.tsx:352`
- 标签：`src/app/products/thermal-labels/[slug]/page.tsx:130`

均为 `filter(current !== slug).slice(0, 4)`。

影响：数组前部产品获得过多内链，后部产品弱引用，产品集群内部权重倾斜。

建议：改为显式 relatedSlugs，或按应用、材料、打印方式、行业、地区等字段匹配。

### 4.6 P1：行业推荐产品使用首词模糊匹配

证据：`src/app/industries/[slug]/page.tsx:46-53`。

仅用产品名第一个词进行匹配，可能错配或为空；同时影响页面推荐区和 ItemList Schema：`src/app/industries/[slug]/page.tsx:79-87`。

建议：在 `INDUSTRIES` 数据中增加显式 `relatedProductSlugs`。

### 4.7 P1：工厂显式子页面缺少统一兄弟导航

动态模板有完整子导航：`src/app/factory/[slug]/page.tsx:323-371`，但显式页面没有统一复用。

影响：五个工厂子页面横向发现能力不一致，且实际生效页面反而弱于影子模板。

### 4.8 P2：移动端行业入口不完整

桌面菜单覆盖较多行业：`src/components/layout/Header.tsx:219-235`；移动端只直接列出约 5 个：`src/components/layout/Header.tsx:606-612`。

建议移动端至少提供“全部行业”入口，或完整输出行业集合列表。

## 五、GEO 友好度审计

### 5.1 当前强项

行业详情模板是全站最强 GEO 基线，包含：

- BreadcrumbList
- Service + areaServed
- 产品 ItemList
- FAQPage
- Buyer insight
- 方案对比
- 技术适用性边界
- Evidence answers
- Supporting resources

证据：`src/app/industries/[slug]/page.tsx:57-360`。

这套结构适合 AI 从页面中提取：

- 适用场景
- 采购问题
- 材料/规格边界
- 选择条件
- 验证路径
- 相关产品

### 5.2 P1：地区页实体结构化表达不统一

EU 国家页有 FAQ Schema，但缺少 BreadcrumbList、CollectionPage/Service、Country/areaServed：

- `src/app/eu/[country]/page.tsx:181-189`
- 可视面包屑：`:193-201`

墨西哥页已有较完整地区实体表达：

- `src/app/mx/page.tsx:85-101`

US/CA/MX 页面缺少统一可视父级面包屑，导致结构化数据与可视信息架构不一致。

### 5.3 P1：合规详情 GEO 证据层级不统一

动态合规页正文包含 Review Details、Applicable Products、Markets 等信息，但没有对应结构化实体；BPA 页面则有 DefinedTermSet 与 FAQ。

建议把动态合规模板提升到 BPA 专页的共同基线，并保留“产品/等级/项目审核后确认”的审慎表述。

### 5.4 P2：默认 EU 国家页差异度不足

France、Poland 等国家主要复用默认产品、FAQ、物流和证据块：

- `src/app/eu/[country]/page.tsx:65-177`

建议只有具备国家级采购价值和差异化证据时扩展国家页；否则合并或明确页面定位，避免模板化薄内容。

### 5.5 P2：工厂页面“审慎但证据弱”

工厂页使用 “By Site / By Line / By RFQ / By Scope” 等谨慎表达：

- `src/app/factory/overview/page.tsx:23-30`
- `src/app/factory/[slug]/page.tsx:37-55`

这避免了不实承诺，但 GEO 证据仍偏抽象。建议增加已审核图片、设备编号、审核日期、文件范围或可申请证据入口，且不要补造固定产能和证书事实。

### 5.6 robots 对 AI 可见性的策略风险

robots 明确阻止多个 AI/SEO 抓取器：

- `src/app/robots.ts:55-76`

包括 GPTBot、CCBot、anthropic-ai、Claude-Web、Google-Extended 等。若目标是提高 GEO 引用率，应明确哪些爬虫要允许，哪些只限制高成本或低价值爬虫。当前规则会降低对应渠道访问公开内容的机会。

## 六、优先级执行清单

### P0：先修结构与可索引一致性

1. 合并工厂双模板，只保留唯一公开实现。
2. 新建独立 `/markets` 或 `/regions` 父级，修正 Export 顶级入口。
3. 统一动态页面 Metadata builder，覆盖 Blog、纸卷详情、Factory、OEM。
4. 修正 `productSchema()` 的绝对 URL 处理。
5. 核对 Blog 动态页 Article JSON-LD 是否存在重复注入。

### P1：修复内链权重与实体关系

6. Footer 增加 Regions、Blog、Compliance、FAQ/Samples 等核心入口。
7. DB + 静态博客统一相关推荐，排除当前 slug，按主题/产品/行业匹配。
8. 产品相关推荐改为显式关系或字段匹配。
9. 行业—产品改为显式 `relatedProductSlugs`。
10. 动态合规模板补 BreadcrumbList 和 WebPage/DefinedTerm/FAQ（按正文实际内容）。
11. EU 国家页补 BreadcrumbList、CollectionPage/Service、Country/areaServed。
12. 工厂显式页面复用统一兄弟导航。

### P2：优化 GEO 质量与维护可靠性

13. 案例 Article 补日期和 Breadcrumb。
14. 移动端补全部行业入口。
15. 对 France/Poland 评估是否具备足够差异化内容。
16. 将 Sitemap 动态项直接复用页面数据源，减少漏收录风险。
17. 评估 `/quote` 和 `/samples` 是否应该保留在 Sitemap。
18. 重新评估 robots 中 AI 抓取器封锁策略。

## 七、审计结论

### Google SEO

- URL 和 Sitemap 基础覆盖：**良好**。
- Canonical / title / description：**核心页面良好，动态和普通内容页不一致**。
- JSON-LD：**类型较丰富，但实体重复、Breadcrumb 和动态模板覆盖不一致**。
- 内链：**产品与行业基础链路较好，但地区、Footer、工厂和博客集群存在明显改进空间**。

### GEO

- 行业页面：**强**，可作为全站模板基线。
- 产品详情：**中上**，需要修正推荐关系、Breadcrumb 和动态 metadata 一致性。
- 地区页面：**中等**，正文信息较好，但实体 Schema、父级面包屑和国家差异内容不统一。
- 合规页面：**中等**，BPA 专页较强，动态合规模板偏弱。
- 工厂页面：**中等**，表达审慎，但证据链接和唯一模板治理不足。
- AI 抓取策略：**存在明显策略风险**，robots 当前封锁多个主要 AI 抓取器。

本报告为只读审计，未修改任何源码或生产数据。
