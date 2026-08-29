# SEO / 结构化数据审计报告

**站点**：zhixinpaper.com (Next.js App Router)
**审计方式**：源代码全量审计（src/app 全部 75 个 page.tsx + src/lib/seo.ts、sitemap.ts、robots.ts）+ 20 余个页面的线上渲染结果抽查交叉验证
**审计页面覆盖**：约 90 个可索引 URL（静态页 + products/industries/compliance/eu 国家/blog 等全部动态路由）
**总体评分：79 / 100**（良好，基础扎实，结构化数据覆盖不一致是主要拖分项）

这个站点的 SEO 基础设施明显是被认真设计过的（有专门的 `src/lib/seo.ts` schema 工厂函数、robots.txt 里连 AI 爬虫允许名单和采集类爬虫屏蔽都写了注释说明思路），比大多数同类站点起点更高。问题主要出在"好的模式没有被复制到全部页面"，而不是从零开始缺失。

---

## 🔴 严重问题（建议优先修复）

### 1. 所有静态博客文章的 Article 结构化数据缺少 `image` 字段
- **位置**：`src/app/blog/[slug]/page.tsx` 第 198-213 行；数据源 `src/lib/data.ts` 第 985 行 `BLOG_POSTS`
- **问题**：`BLOG_POSTS` 数组里每篇文章只有 `slug/title/excerpt/category/readTime/date/tag`，完全没有图片字段。对应生成的 Article JSON-LD 里 `image` 属性因此永远不存在。数据库来源的文章（`dbPost` 分支）有条件判断 `coverImage` 存在才加 `image`，但静态文章连这个兜底都没有。
- **影响**：Google 的 Article 富媒体结果（以及 Google Discover 收录资格）明确要求 `image` 属性；这 17 篇静态博客文章目前全部不满足，等于放弃了这部分文章在搜索结果里出图、以及被 Discover 推荐的机会。
- **建议**：给 `BLOG_POSTS` 加一个 `image` 字段（哪怕先复用分类默认图，参考 `BlogPostClient.tsx` 里已有的 `CATEGORY_IMAGES` 映射），并在 `blog/[slug]/page.tsx` 两处 articleSchema 里都带上。

### 2. Compliance 子页面里，6 个和示范页用的不是同一套结构化数据
- **位置**：`src/app/compliance/{certificates,eu-food-contact,fda-us,fsc-paper,iso-9001,reach-rohs}/page.tsx`
- **对照组**：`src/app/compliance/bpa-free/page.tsx` 有完整的 `BreadcrumbList + WebPage + DefinedTerm + FAQPage` 一套 JSON-LD（用 `@graph` 组织），写得很规范。
- **问题**：线上抽查确认 `/compliance/fda-us` 页面顶部**确实显示了**"Home > Compliance > FDA US"面包屑导航，但页面源码里没有任何 `application/ld+json`——也就是说用户看得到的面包屑，搜索引擎拿不到对应的结构化标记。这 6 个页面看起来是 bpa-free 页面写完之后，作为"姊妹页"被复制内容但没复制 schema 部分。
- **影响**：这批页面是买家做合规判断时最容易点进来的内容（FDA/REACH/ISO/FSC 都是采购决策关键词），恰恰是最值得有面包屑富结果和潜在 FAQ 富结果的页面，现在全部拿不到。
- **建议**：直接照 `bpa-free/page.tsx` 的模式抄一份过去，6 个页面工作量不大。

---

## 🟡 需要修复的问题

### 3. Factory（5 个）和 OEM-Custom（5 个）子页面完全没有结构化数据
- `factory/{overview,equipment,capacity,quality-control,virtual-tour}` 和 `oem-custom/{page,custom-printing,moq-guide,private-label,sample-process}`，加上对应的 `[slug]` 动态兜底路由，全部检测不到 `application/ld+json`。
- 线上确认 `factory/overview` 同样有可见面包屑组件但无对应 schema；`oem-custom` 首页则连面包屑 UI 都没有。
- 建议：至少补上 `BreadcrumbList`，这两类页面内容偏"能力展示"，不一定需要 FAQPage。

### 4. 已经写好的 `localBusinessSchema()` / `manufacturerSchema()` 从未被调用
- **位置**：`src/lib/seo.ts` 第 262 行和第 305 行附近
- 这两个函数专门为 `/eu`、`/us`、`/ca` 区域枢纽页设计（`localBusinessSchema` 甚至按 `eu/us/ca` 分好了地址、服务范围），但全站搜索 `localBusinessSchema(` / `manufacturerSchema(` 调用次数都是 0——写完之后没接上。
- 建议：在 `src/app/eu/page.tsx`、`us/page.tsx`、`ca/page.tsx` 里各加一行调用，是最低成本的一处修复。同时 `us/cannabis-labels`、`us/fda-compliant`、`ca/cannabis-labels` 这几个区域细分页目前也是零结构化数据。

### 5. 三处内容性图片用了空 `alt=""`，本该是描述性文字
| 文件 | 行号 | 说明 |
|---|---|---|
| `src/app/blog/[slug]/BlogPostClient.tsx` | 84 | 文章封面图，建议 `alt={title}` |
| `src/app/blog/[slug]/BlogPostClient.tsx` | 122 | "相关文章"缩略图，建议 `alt={post.title}` |
| `src/app/contact/ContactClient.tsx` | 472 | 支持网络卡片配图，建议用 `item.title` 描述 |

空 `alt` 语义上是"纯装饰性图片，请屏幕阅读器跳过"，但这三处都是有实际内容意义的图（文章封面、文章缩略图），用空 alt 等于放弃了图片搜索和无障碍阅读的信息量。顺带一提：全站有个统一封装的 `<SlotImage>` 组件，会强制解析出一个真实 alt 值（`alt={alt ?? slot.alt}`），凡是走这个组件的图片 alt 覆盖率都很好——这三处是绕开了这个组件、手写 `<Image>` 的地方。

### 6. Sitemap 里大部分静态页缺少 `lastModified`
- `src/app/sitemap.ts` 里 50+ 条 `staticPages` 只写了 `changeFrequency` 和 `priority`，没有 `lastModified`；只有数据库博客文章和 `BLOG_POSTS`（用 `post.date`）带了这个字段。
- Google 会用 `lastmod` 作为是否需要重新抓取的信号，长期缺失可能拖慢重要页面更新后的重新收录速度。

### 7. `compliance/[slug]/page.tsx` 是无法被访问到的死代码
- `COMPLIANCE_ITEMS` 的 7 个 slug 全部有对应的静态文件夹（`bpa-free/`、`certificates/` 等），Next.js 路由优先匹配静态目录，所以这个动态兜底路由永远不会被实际请求命中。不影响 SEO，但建议清理，避免以后有人在这个文件里改动却发现线上没生效而困惑。

---

## 🟢 值得考虑的优化项（非必须）

- **标题偏短**：以下页面的 `<title>` 在拼上"| Zhixin Paper"后仍然明显短于 Google 展示上限，可以塞入更多关键词：`cookie-policy`(29字符)、`privacy-policy`、`faq`、`industries` 首页、`products` 首页、`factory/overview`、`oem-custom/private-label`、`us/fda-compliant`。这些不是错误，只是没用满可用空间。
- **博客列表页 `/blog` 没有结构化数据**：可以加一个 `CollectionPage` 或 `ItemList` schema，但优先级低于文章详情页本身的问题。
- **31 个文件出现了 10-11px 的极小字号**（`text-[10px]`/`text-[11px]`）：抽查看应该都是徽章/标签类小字，不是正文，但建议人工过一遍确认没有正文级文字用了这么小的字号（移动端可读性/无障碍最佳实践建议正文 ≥16px）。

---

## ✅ 做得好的地方

- **robots.txt 思路清晰**：主流搜索引擎全放开，AI 爬虫（GPTBot、PerplexityBot、ClaudeBot 等）专门放行以争取 AI 搜索引用和询盘入口，采集类爬虫（AhrefsBot、MJ12bot 等）屏蔽，且特意在注释里写明"不屏蔽 /_next/，否则 Search Console 会报资源被屏蔽"——这是容易被忽略的细节，这里做对了。
- **Sitemap 与站内导航同源**：`sitemap.ts` 和实际页面链接都从 `src/lib/data.ts` 里同一批 `INDUSTRIES`/`THERMAL_PAPER_ROLLS`/`GEO_REGIONS` 等数组生成，加上 `uniqueSitemap()` 去重逻辑，从架构上就避免了"sitemap 和真实页面对不上""死链"这类问题——线上对 52 个站内硬编码链接的扫描没有发现一个断链。
- **Canonical + hreflang 全站覆盖**且都指向页面自身（没有出现"所有页面 hreflang 都指回首页"这种常见错误），欧洲各国家页面还按国家单独配置了 `locale`。
- **没有误伤的 noindex**：全站唯一一处 `index:false` 只存在于工厂函数的条件分支里，实际没有任何页面被意外排除出索引；`/admin`、`/api`、`/login` 也通过 robots.txt 正确屏蔽。
- **标题结构干净**：站内所有可索引页面都通过统一的 `HeroBanner`/`RegionHero`/`PageHeader` 组件承载唯一的 H1，包括分支最多的产品详情页（4 个互斥 if 分支，每个分支各自只渲染一个 H1）都验证了不会重复。
- **图片 alt 覆盖率总体良好**，且有 `<SlotImage>` 这样的封装组件从架构上保证运营后台换图时 alt 不会丢。
- **首页、产品页、行业页、博客详情页等核心落地页全部是 Server Component**，全站只有 2 个 page.tsx 用了 `'use client'`，对 SEO 关键的首屏内容渲染和 TTFB 是好事。
- **克制的 Product schema 使用**：`productSchema()` 函数注释里明确写了"不要在没有真实 offer/review/rating 的情况下输出 Product 富结果标记，否则 Search Console 会报错"——这是一个容易被误用但这里刻意避开了的坑。
- **404 处理正确**：访问不存在的页面返回真实 404 状态码，不是"假 200"。

---

## 建议的修复优先级

1. 先修 compliance 6 个子页面的结构化数据（复制 bpa-free 的模式，工作量小、影响面广，且是高转化意图页面）
2. 给 `BLOG_POSTS` 数据加 `image` 字段，接上 Article schema
3. 接入现成但闲置的 `localBusinessSchema()`/`manufacturerSchema()` 到 eu/us/ca 三个枢纽页
4. factory、oem-custom 两类页面补 BreadcrumbList
5. 其余属于打磨项，可以按内容更新节奏顺手改

---

## 修复记录（2026-08-28 当天完成）

以下问题已直接在代码里修复，改动均为新增 JSON-LD / 字段，未改动任何页面的可见文案或视觉样式：

- ✅ **问题 2**：compliance 下 6 个子页面（certificates、eu-food-contact、fda-us、fsc-paper、iso-9001、reach-rohs）已按 bpa-free 的模式补上 `BreadcrumbList` + `WebPage` JSON-LD。
- ✅ **问题 1**：`src/lib/data.ts` 新增导出 `BLOG_CATEGORY_IMAGES`（按分类映射一张兜底图），`blog/[slug]/page.tsx` 的两个 Article schema 分支（静态文章 + 数据库文章兜底）都已补上 `image` 字段；`BlogPostClient.tsx` 同步复用同一份映射，不再各自维护一份。
- ✅ **问题 4**：`localBusinessSchema()` 已接入 `eu/page.tsx`、`us/page.tsx`、`ca/page.tsx` 三个区域枢纽页；顺带给 `us/cannabis-labels`、`us/fda-compliant`、`ca/cannabis-labels` 三个区域细分页也补上了 `BreadcrumbList` + `WebPage`（审计里提到过这几个页面同样是零结构化数据）。
- ✅ **问题 3**：factory 的 4 个子页面（overview、equipment、capacity、quality-control）补了 `BreadcrumbList` + `WebPage`；virtual-tour 页面原本已有 VideoObject schema，追加了 `BreadcrumbList`。oem-custom 首页及 4 个子页面（custom-printing、moq-guide、private-label、sample-process）同样补齐。
- ✅ **问题 5**：`BlogPostClient.tsx` 里文章封面图、相关文章缩略图的 `alt=""` 改成了描述性文字（`alt={title}` / `alt={post.title}`）；`ContactClient.tsx` 支持网络卡片配图同样改成 `alt={item.title}`。
- ✅ **问题 6**：`sitemap.ts` 里 49 条静态页条目补上了 `lastModified`。

**未处理**：问题 7（清理无法访问到的 `compliance/[slug]/page.tsx` 死代码）和"值得考虑的优化项"里的标题长度、博客列表页 schema、极小字号排查——这几项风险收益比不高，建议按需再处理。

**验证方式说明**：本机 `node_modules` 里的 pnpm 符号链接大面积损坏（`next`、`react`、`typescript`、`eslint` 等全部指向失效，报 I/O error），导致本机跑不了 `npm run typecheck` / `lint` / `build` / `test`——这个问题在我改动之前就存在，和这次改动无关，但会挡住你自己本地跑 `npm run build`。建议找时间跑一次 `pnpm install` 修复。因为本机跑不了，我把改动过的 27 个文件复制到一个隔离环境里用 TypeScript 单独做了一次语法检查（不含项目内其它模块，只看语法是否合法），没有发现语法错误。建议你本机环境修好之后，正式跑一次 `npm run lint && npm run typecheck && npm test && npm run build` 做最终确认。

---

## 继续优化（同日第二轮）

- ✅ **/blog 列表页补了结构化数据**：`src/app/blog/page.tsx` 加了 `BreadcrumbList` + `CollectionPage`（`hasPart` 里列出最多 50 篇文章的标题和链接）。
- ✅ **7 处过短标题优化**：faq、industries 首页、products 首页（`DEFAULT_SEO_SECTIONS.products.siteTitle`）、factory/overview、oem-custom/private-label、us/fda-compliant、ca/cannabis-labels 的 `<title>` 都补充了关键词，从原来 13-33 字符拉长到 49-57 字符（加上"| Zhixin Paper"后缀基本落在 60-70 字符区间）。cookie-policy 和 privacy-policy 两个法务页面刻意没有改动——这两个页面本身没有搜索意图，硬塞关键词反而不自然。
- **修正一处审计误判**：之前报告里说的"问题 7：`compliance/[slug]/page.tsx` 是无法访问到的死代码"是错的。核对 `COMPLIANCE_ITEMS` 后发现里面有个 `iso-15223`（Medical Label Review）没有对应的静态文件夹，所以 `/compliance/iso-15223` 实际上正是由这个动态路由提供服务的，而且这个页面本身已经有 `BreadcrumbList` 结构化数据了。之前审计时没有把 `COMPLIANCE_ITEMS` 的完整 slug 列表和静态文件夹逐一核对，这里更正。**这个页面不需要做任何改动。**
- **本机环境问题**：尝试用 `pnpm install` 修复本机损坏的 node_modules 符号链接，但失败了——`E:\website\zhixinpaper-usa-main` 这个挂载盘对 unlink 操作报 `EPERM: operation not permitted`，pnpm 连基本的文件操作测试都过不了。这不是我能从这边修的问题，大概率是这个盘本身的性质（网络盘/云同步盘一类）不支持 pnpm 需要的符号链接和文件操作。建议你在电脑本地（不是通过这次会话）直接删掉 node_modules 文件夹重新 `pnpm install` 试试，如果同样报错，那就是这个目录所在的盘不适合放 node_modules，可能需要把项目挪到本地磁盘（比如 C 盘）而不是当前这个盘。
