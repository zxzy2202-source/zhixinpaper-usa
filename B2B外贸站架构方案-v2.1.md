# 🏗️ B2B 外贸独立站架构方案 v2.1（双轨融合 + 后台美学版）

> 适用：B 端外贸展示站 / 工厂询盘站 / 产品 catalog 站 / 多地区 GEO 落地页
> 不适用：B2C 电商（订单+支付+库存）、UGC 社区、需要会员注册的站
>
> **验证项目**：
> - **轻型版**：`zxpapers.com` — 西安智芯热敏纸（已上线，月费 ~$0）
> - **重型版**：`zhixinpaper.com` — 同业务多 GEO 落地页（已上线，月费 ~$0）
>
> **v2.1 新增**：H 轨图床默认 R2（不再 Vercel Blob）+ 后台 UI 设计哲学 + `site_settings` 通用配置层 + 后台简化 6 项菜单 + 5 个新踩坑

---

## 一、为什么要做 v2.0（v1.0 的局限）

v1.0 只覆盖了**轻型架构**（KV + R2 + 单页站），在做 `zhixinpaper.com` 时发现以下场景压不住：

| v1.0 解决不好的需求 | 真实业务案例 |
|---|---|
| ❌ 多 GEO 落地页（/us, /ca, /eu 各一套独立内容） | 投 Google Ads 要分国家落地页 |
| ❌ 动态产品/行业页（`industries/[slug]` 几十个长尾词页面） | Programmatic SEO |
| ❌ 后台运营自助改某 SKU 的字段（标题/价格区间/认证） | 运营不想求开发 |
| ❌ 媒体库分类、批量上传、Alt 文本编辑 | 图片上百张时 KV 装不下 |
| ❌ 多账号后台（销售看询盘、运营改文案） | 团队协作 |
| ❌ 询盘有状态流转（新→跟进中→已成交→已丢单） | 销售要 SOP |
| ❌ 索引查询（"7 天内的 USA 询盘"） | KV 只支持 get/set |

**结论**：v1.0 的 KV 方案适合"内容少、流量小、单点决策快"的站；
当出现**关系型数据 / 批量操作 / 索引查询 / 多角色协作**时，就该升级到重型版。

---

## 二、核心理念（v1.0 + 新增）

### 沿用 v1.0 三铁律 ✅

1. **零供应商绑死** — 任一组件都能换
2. **零月费起步** — 流量小月成本 $0
3. **代码 100% 在自己手上** — GitHub 私有 repo

### v2.0 新增三条 🆕

4. **数据模型决定架构选型** — 文档型选 KV，关系型选 SQL，别硬扛
5. **图片是一等公民** — 不管哪条轨，必走"槽位 + 媒体库"两层抽象
6. **副作用必须 await** — Vercel/Next 16 Lambda 响应即 kill，不 await 就丢

---

## 三、双轨决策树（先选轨再开工）

```
                      ┌──────────────────────┐
                      │  这个项目长啥样？     │
                      └──────────┬───────────┘
                                 │
                ┌────────────────┴─────────────────┐
                │                                  │
        ┌───────▼──────────┐              ┌────────▼─────────┐
        │ 单一品牌站        │              │ 多 GEO / 多语言   │
        │ < 50 个长尾页     │              │ > 50 个长尾页     │
        │ 单人决策          │              │ 团队协作          │
        │ 询盘 < 100/月     │              │ 询盘需流转管理    │
        └───────┬──────────┘              └────────┬─────────┘
                │                                  │
        ┌───────▼──────────┐              ┌────────▼─────────┐
        │  🚀 轻型轨 (L)   │              │  🏭 重型轨 (H)   │
        │  zxpapers.com    │              │ zhixinpaper.com  │
        └──────────────────┘              └──────────────────┘
```

### 双轨对比一览

| 维度 | 🚀 轻型轨 (L) | 🏭 重型轨 (H) |
|---|---|---|
| **代表项目** | zxpapers.com | zhixinpaper.com |
| **数据层** | Upstash Redis (KV REST) | Turso (libSQL) + Drizzle ORM |
| **图床** | Cloudflare R2 (S3 兼容) | **Cloudflare R2**（v2.1 默认，不再 Vercel Blob） |
| **后台鉴权** | HMAC cookie（自建 50 行） | bcrypt + jose JWT + 多账号 |
| **询盘通知** | Server酱 + 企微 + 飞书 | Server酱 + Resend |
| **托管** | Vercel Hobby | Vercel Hobby / PM2 自托管 |
| **路由特色** | 静态首页 + 博客 | `/us /ca /eu`、`industries/[slug]`、`products/[slug]` |
| **后台菜单** | 仪表盘 / 文章 / 图片 / 询盘 / SEO（**扁平 5 项**） | 仪表盘 / Hero / 图片 / 文章 / 客户询盘 / SEO（**v2.1 扁平 6 项**） |
| **可视化配置** | KV settings | **site_settings 表（v2.1 新增）** |
| **开发上线** | 1-2 天 | 3-5 天 |
| **月费** | $0 | $0（PV < 100w） |
| **数据迁移** | KV dump → JSON | `turso db dump` → SQL |

> 💡 **没想清楚就选 L**。L → H 升级是把 KV 字段 1:1 映射成表，2 天能搬完。反过来 H → L 几乎不可能。

---

## 四、共用核心组件（两条轨都必须有）⭐

不管选哪条轨，下面这 8 个文件**直接 copy** 就能用：

### 4.1 `src/lib/notify.ts` — 询盘多通道通知

```ts
// Server酱 (主, 国内微信秒推) + Resend/企微/飞书 (兜底)
export async function notifyAll(payload: InquiryPayload) {
  const results = await Promise.allSettled([
    notifyServerchan(payload),
    notifyResend(payload),
    notifyWecom(payload),
    notifyFeishu(payload),
  ]);
  return results;
}
```

**铁律**：调用方**必须 `await`**，否则 Lambda 响应后被 kill，通知丢失。

```ts
// ❌ 错（推送会丢）
notifyAll(data).catch(console.error);
return NextResponse.json({ ok: true });

// ✅ 对
await notifyAll(data).catch(console.error);
return NextResponse.json({ ok: true });
```

### 4.2 `src/lib/imageCompress.ts` — 浏览器端预压缩

零依赖 canvas 实现：
- maxDim 2400 / quality 0.85
- SVG / GIF 直接跳过
- PNG 保持 PNG（保留透明）
- 压缩后变大自动回退原文件

```ts
// MediaManager.tsx 集成
const compressed = await compressImage(file, { maxDim: 2400, quality: 0.85 });
const uploaded = await uploadToServer(compressed); // 服务端 sharp 二次压缩
```

**上传链路**：⚡浏览器压缩 → 🌿服务端 sharp 二次压缩（**双保险**）

### 4.3 `src/lib/imageSlots.ts` — 槽位注册表（**边界安全文件**）

```ts
// 🚨 铁律：本文件零 Node 运行时依赖，可被 'use client' 组件 import
export const SLOT_REGISTRY = [
  { key: "home.hero", label: "首页 Hero", group: "home",
    fallback: "/img/hero.jpg", defaultAlt: "...", recommendedSize: "2400×1200" },
  { key: "geo.us.hero", label: "/us 页 Hero", group: "geo", /*...*/ },
  // ...
] as const satisfies readonly SlotDefinition[];

export type SlotKey = (typeof SLOT_REGISTRY)[number]["key"]; // ⭐ 强类型推导
```

**铁律**：使用方**必须用 `SlotKey` 类型，不能用 `string`**：

```ts
// ❌ 危险：写错不报错
interface ApplicationItem { slotKey?: string; }

// ✅ 安全：写错 build 失败
import type { SlotKey } from "@/lib/imageSlots";
interface ApplicationItem { slotKey?: SlotKey; }
```

### 4.4 `src/lib/imageSlotResolver.ts` — 服务端槽位解析器

```ts
// 60s 进程内缓存，后台改图自动失效
export async function resolveSlot(key: SlotKey): Promise<ResolvedSlot> { ... }
export function invalidateSlotCache() { ... } // 后台 PUT 后调用
```

### 4.5 `src/components/ui/SlotImage.tsx` — Server Component

```tsx
// 一行替换全站硬编码 <Image>
<SlotImage slotKey="home.hero" alt="..." fill priority />
```

未绑定时自动用 fallback 兜底，**永不报错**。

### 4.6 单一数据源铁律 ⚠️

Hero 类多入口资产**只能有一个源**：

```ts
// ❌ 灾难：两个源同时存在，后台改了 banners 但 SlotImage 走 imageSlots → 永远看不到变化
banners: [{ url: ... }, { url: ... }]
<SlotImage slotKey="home.hero" />

// ✅ 选一个：要么 banners[i] 要么 imageSlots，不能并存
```

### 4.7 边界安全文件铁律 ⚠️

```ts
// ❌ 灾难：'use client' 组件 import 含 Node API 的服务端模块 → 整条链拉进 client bundle，体积爆炸
"use client"
import { POST_CATEGORIES } from "@/lib/postsStore"; // postsStore 含 fs/path

// ✅ 拆出零依赖常量文件
"use client"
import { POST_CATEGORIES } from "@/lib/postsCategories"; // 纯常量
import type { Post } from "@/lib/postsStore"; // 只 import type 不带运行时
```

### 4.8 数据库初始化脚本（H 轨必须）

`scripts/init-db.mjs`：零依赖 / 幂等 / `CREATE TABLE IF NOT EXISTS`

```bash
npm run db:init  # 首次启动必跑，否则表单提交 500
```

> 教训：本仓第一次跑时 SQLite `data/` 都没有 → 前端 `.json()` 解析挂 `Unexpected token '<'`（500 返回的 HTML 错误页）。

### 4.9 全局站点数据定义 ⭐（v2.1 通用化核心）

**原则**：严禁在通知标题、邮件签名、发件人名称中使用硬编码字符串。

在 `src/lib/data.ts` 中维护 `COMPANY` 变量：
```ts
export const COMPANY = {
  name: "Zhixin Paper",
  email: "Sales@zxpapers.com",
  whatsapp: "+86 187 9277 1927",
  // ...
};
```

**应用场景**：
1. **通知标题**：`[${COMPANY.name}][🎯 Quote Request] ...`（方便老板在微信群区分多个站）。
2. **邮件发件人**：`${COMPANY.name} Website <noreply@...>`。
3. **自动回复**：正文中的公司名、联系方式全部自动同步。

---

## 五、🚀 轻型轨详细方案

### 5.1 技术栈

| 层 | 选型 | 月成本 |
|---|---|---|
| 框架 | Next.js 15 (App Router) + TypeScript | $0 |
| 样式 | Tailwind CSS + Radix UI | $0 |
| 托管 | Vercel Hobby | $0 |
| 图床 | Cloudflare R2（10GB 免费） | $0 |
| 数据 | Upstash Redis (KV REST) | $0 (月 10K commands) |
| 域名 | 任意注册商 + DNS CNAME | ~$10/年 |
| **总月费** | | **~$0** |

### 5.2 KV 抽象层 ⭐（v1.0 沿用）

```ts
// src/lib/storage.ts
interface KVStorage {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  delete(key: string): Promise<void>;
}

class FileStorage implements KVStorage { /* 本地开发 */ }
class VercelKVStorage implements KVStorage { /* fetch 直打 Upstash REST */ }

export function getStorage(): KVStorage {
  return process.env.KV_REST_API_URL ? new VercelKVStorage() : new FileStorage();
}
```

**好处**：换 Postgres/Mongo/Dynamo 只改这一个文件。

### 5.3 项目结构

```
src/
├── app/
│   ├── admin/{login,hero,images,posts,inquiries,seo}/
│   ├── api/{inquiry,admin/*}/
│   └── page.tsx, layout.tsx, products/, resources/
├── lib/
│   ├── storage.ts          ⭐ KV 抽象
│   ├── auth.ts             # Node HMAC (API 用)
│   ├── authEdge.ts         # Edge Web Crypto (middleware 用)
│   ├── heroStore.ts, postsStore.ts, inquiryStore.ts, seoStore.ts
│   ├── imageSlots.ts       ⭐ 槽位注册
│   ├── notify.ts, imageCompress.ts, r2.ts, markdown.ts
├── components/{admin,layout,shared}/
└── middleware.ts           # 鉴权拦截
```

### 5.4 适用场景

✅ 单品牌单语言站、博客、文章 < 200 篇
✅ 询盘 < 100/月、单人接单
✅ 老板想周末自己改文案
❌ 多 GEO / 多语言 / 团队协作 → 走重型轨

---

## 六、🏭 重型轨详细方案

### 6.1 技术栈

| 层 | 选型 | 月成本 |
|---|---|---|
| 框架 | Next.js 16 (App Router) + TypeScript | $0 |
| 样式 | Tailwind CSS v4 + lucide-react | $0 |
| 托管 | Vercel Hobby（或 PM2 自托管） | $0 |
| **数据库** | **Turso (libSQL)** + Drizzle ORM | $0 (月 1B 行读) |
| 图床 | **Cloudflare R2 (S3 兼容)** | $0 (10GB 免费 + 零出站) |
| 邮件 | Resend | $0 (月 3000 封) |
| 微信推送 | Server酱·Turbo | ¥39/年 |
| 鉴权 | bcrypt + jose JWT | $0 |
| **总月费** | | **~$0** |

> 💡 选 Turso 不选 Postgres 的原因：单写多读、按行计费、边缘节点同步、CLI 友好。

### 6.2 数据库 schema（11 张表，v2.1）

```ts
// src/lib/db/schema.ts
admin_users          // 多账号后台
contact_inquiries    // /api/contact 询盘
quote_requests       // /api/quote 报价
sample_requests      // /api/samples 样品
blog_posts           // 博客
product_overrides    // 运营自助改 SKU 字段（创新点 1）⭐
media_categories     // 媒体库分类
media_files          // 媒体库
image_slots          // 槽位绑定
site_settings        // 通用 key-value 配置（v2.1 新增）⭐⭐
activity_log         // 操作日志
```

> v2.1 新增 `site_settings` 一张通用配置表，承载 Hero 文案 / SEO 元数据 / 公司信息等所有"运营要改但不值得单独建表"的字段。

### 6.3 创新点 1：`product_overrides` 表 ⭐

代码里写死产品骨架（`siteData.ts` 里 30 个 SKU），但允许运营**只覆盖某几个字段**：

```ts
// siteData.ts (代码默认)
{ slug: "thermal-roll-80x80", title: "80x80 Thermal Roll", price: "$0.15-0.30", ... }

// DB product_overrides 表（运营在 /admin/products 编辑）
{ slug: "thermal-roll-80x80", title_override: "Premium 80x80 BPA-Free Roll",
  price_override: "$0.18-0.32", description_override: null /* 仍用代码默认 */ }
```

**好处**：
- 不用懂 Markdown 不用懂 CMS schema
- 紧急改价 5 秒搞定
- 代码默认是 fallback，永远不会"空"

### 6.4 创新点 2：多 GEO 路由

```
app/
├── us/page.tsx    → /us  (USA Hero + Prop 65/FDA 卖点)
├── ca/page.tsx    → /ca  (Canada Hero + 双语)
├── eu/page.tsx    → /eu  (REACH/RoHS)
└── industries/
    └── [slug]/page.tsx   → /industries/lottery, /industries/cannabis ...
```

每个 GEO 页都接 `geo.us.hero` 槽位 → 后台可独立换图、独立 SEO。

### 6.5 创新点 3 (v2.1)：`site_settings` 通用配置表 ⭐⭐

**痛点**：Hero 文案、SEO 元数据、公司电话这些字段，硬编码改字符串要发 PR，单独建表又过度设计。

**解法**：一张通用表 `site_settings(key PK, section_key, value JSON, updated_by, updated_at)`。

```ts
// src/lib/siteSettingsTypes.ts (边界文件 - 类型 + 默认值 + 评分函数)
export type HeroConfig = { badge, headlineLine1, ..., primaryCtaText, ... };
export type SeoConfig = { siteTitle, siteDescription, keywords, ogImage, ... };
export const DEFAULT_HERO_HOME: HeroConfig = { ... };
export const DEFAULT_SEO: SeoConfig = { ... };
export const SETTING_KEYS = { HERO_HOME: "hero.home", SEO_GLOBAL: "seo.global" } as const;
export function calculateSeoScore(seo: SeoConfig): number { ... }  // 纯函数

// src/lib/siteSettings.ts (服务端 - 含 db 调用)
export async function getSetting<T>(key: string, defaults: T): Promise<T> {
  const rows = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
  if (!rows.length) return defaults;
  return { ...defaults, ...JSON.parse(rows[0].value) } as T;
}
export const getHeroHome = () => getSetting(SETTING_KEYS.HERO_HOME, DEFAULT_HERO_HOME);
export async function setSetting<T>(key, sectionKey, value, updatedBy) { ... }
```

**3 个关键设计**：
1. **拆边界文件**：types/defaults/纯函数放 `siteSettingsTypes.ts`（零 Node 依赖，可被 'use client' import），db 读写放 `siteSettings.ts`
2. **defaults 是 fallback**：DB 空时自动用默认值，前台永远不崩
3. **统一 API**：`PUT /api/admin/settings { key, data }`，所有可视化配置走一个接口

**Hero 编辑页核心交互**：左侧实时预览深色卡（深色背景模拟前台 Hero） + 右侧 12 字段表单 + 固定底部保存栏 + 「换图」按钮跳 `/admin/image-slots#home.hero` 锚点（复用上传逻辑，零代码重复）。

**SEO 评分公式**（满分 100，基础 40）：
```
+15 siteTitle    +15 siteDescription    +12 ogImage
+8  keywords     +5  googleVerification +3 bingVerification
+2  twitterHandle
```

**前台接入**：
```ts
// src/app/page.tsx - Hero 接入
const hero = await getHeroHome();
<h1>{hero.headlineLine1} <span>{hero.headlineHighlight}</span></h1>

// src/app/layout.tsx - SEO 接入（generateMetadata 取代静态 metadata）
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoGlobal();
  return {
    title: seo.siteTitle || DEFAULT_TITLE,
    verification: { google: seo.googleSiteVerification || undefined },
    // ...
  };
}
```

**新项目加一个"运营可配字段"的成本**：
- types 文件加一行 type + default
- 后台表单加一行 input
- 前台读取处 `await getXxx()` 替换硬编码

**5 分钟搞定，不用建表、不用写 API**。

### 6.6 创新点 4 (v2.1)：后台 UI 简化哲学（B2B 引导式 vs CRM 仪表盘）⭐

**反模式**："企业级仪表盘"——4 数字卡 + 趋势图 + Top 国家 + 最新线索列表。看起来专业，实际**老板天天用根本不看图表**。

**正解**：zxpapers 风格"引导式工作台"。

```
┌─────────────────────────────────────────────────┐
│ 老板，您好 👋                                    │
│ 欢迎回来。下面是您网站的实时状态。               │
├──────┬──────┬──────┬──────┐                    │
│ 图片  │ 文章  │ 询盘  │ SEO  │ ← 4 大功能卡    │
│ 67/127│  3   │  1   │  85  │                    │
├──────┴──────┴──────┴──────┤                    │
│ ✨ 快速开始              │ 📊 图片自定义进度    │
│ ① 换掉 AI 占位图   ✓     │ ████████░░ 67%       │
│ ② 发布第一篇博客         │ 继续加油              │
│ ③ 接收客户询盘           │ → 查看前台           │
│ ④ 优化 SEO 分数          │                      │
└─────────────────────────────────────────────────┘
```

**侧边栏菜单：扁平 6 项，不分组**（旧 9 项分 4 组 → 新 6 项）：
```
仪表盘 / 首页 Hero / 图片管理 / 文章管理 / 客户询盘 / SEO 设置
```

**3 项菜单合并到 1 个 Tab 页**（联系询盘/报价请求/样品申请 → `/admin/inquiries?type=inquiry|quote|sample`）：
- URL 查询参数控制 Tab，SSR 友好
- 三类数据 `Promise.all` 一次性查
- 统一字段渲染（姓名/公司/国家/状态/时间/类型）
- 详情页保留 `/admin/quotes/[id]`、`/admin/samples/[id]` 不动

**菜单隐藏但路由保留**（产品管理、媒体库）：
- 删 `NAV_ITEMS` 项即可（**不删 page.tsx**）
- 高级用户 URL 直接进还能用
- 老板 99% 不需要时就不显示

**B2B 后台 6 条铁律**（zhixinpaper v2.1 实战）：
1. **菜单不超过 7 项**（米勒定律），多了就 Tab 合并
2. **首页不放图表**（老板看数字不看曲线）
3. **每个卡片有去向**（点哪都能跳详情，不是死信息）
4. **进度条胜过百分比文字**（视觉感知 3 倍快）
5. **快速开始 4 步**（新手前 7 天最高频使用）
6. **固定底部保存栏**（长表单滚到底不用回顶）

### 6.7 项目结构

```
src/
├── app/
│   ├── admin/{login,layout,inquiries,quotes,samples,blog,products,media,image-slots,settings}/
│   ├── api/{contact,quote,samples,admin/*}/
│   ├── {us,ca,eu}/         # GEO 落地页
│   ├── industries/[slug]/  # 动态行业页
│   ├── products/[slug]/    # 动态产品页
│   ├── {about,factory,compliance,oem-custom,case-studies,faq,quote,samples,contact}/
│   └── {robots,sitemap}.ts # 自动生成
├── lib/
│   ├── db/{schema.ts,index.ts}  # Drizzle ORM
│   ├── session.ts          # jose JWT
│   ├── imageSlots.ts, imageSlotResolver.ts, notify.ts, imageCompress.ts
│   ├── seo.ts              # metadata 工厂 + JSON-LD
│   ├── rate-limit.ts       # 防表单刷
│   └── data.ts             # 产品 + 行业骨架数据
├── components/{layout,ui,admin}/
└── scripts/
    ├── init-db.mjs         ⭐ 幂等建 10 张表
    └── create-admin.mjs    # npm run admin:create
```

### 6.8 适用场景

✅ 多 GEO / 多语言 / 多落地页（投 Google Ads 必备）
✅ 长尾词 SEO（行业页、产品页几十上百个）
✅ 团队协作（销售改询盘状态、运营改产品）
✅ 询盘需 SOP 流转

---

## 七、踩坑全集（v1.0 + v2.0 实战）

### 7.1 部署 / 环境变量

| 坑 | 解决 | 来源 |
|---|---|---|
| Vercel KV 已下架 | 改 Upstash for Redis | v1.0 |
| Connect 时填了 Custom Prefix | 变量名变 `STORAGE_KV_*` 读不到，必须留空 | v1.0 |
| Server酱配完没生效 | **必须 Redeploy 一次**（环境变量不会应用到旧部署） | v1.1 |
| Server酱收不到 | 必须关注「Server酱·Turbo版」公众号 | v1.1 |
| Vercel Blob remotePatterns 没加 | `*.public.blob.vercel-storage.com` | v2.0 |
| `.env.local` PowerShell 写时乱码 | 必须 UTF-8 无 BOM | v1.0 |
| `.gitignore` 把 `.env.example` 也忽略了 | 加 `!.env.example` 白名单 | v2.0 |

### 7.2 Next.js 运行时陷阱

| 坑 | 解决 |
|---|---|
| middleware 用了 Node API 报错 | Edge runtime 不支持，用 Web Crypto（`authEdge.ts`） |
| 副作用 `notifyAll()` 不 await → 通知丢失 | **必须 await**，Vercel/Next 16 Lambda 响应即 kill |
| `"use client"` 组件 import 服务端模块 → bundle 爆炸 | 拆"边界安全文件"，跨端只 `import type` |
| Hero 两个数据源（banners[] + imageSlots）冲突 | **单一数据源**铁律：选一个 |
| Next 16 dev server 重复启动跳 3001 | `taskkill /PID xxx /F` 杀旧进程 |
| `slotKey?: string` 写错不报错 | 用 `SlotKey` 类型强约束 |

### 7.3 数据库 / 后台

| 坑 | 解决 |
|---|---|
| 首次启动 SQLite `data/` 不存在 → 表单 500 | `scripts/init-db.mjs` 幂等建表，`npm run db:init` |
| 前端 `.json()` 报 `Unexpected token '<'` | 多半是后端 500 返回 HTML 错误页 |
| 加了后台页面但侧边栏看不到 | **菜单数组 `NAV_ITEMS` 必须同步加项** ⭐（zhixinpaper-usa 翻车过） |
| 后台改图没生效 | 检查 `invalidateSlotCache()` 是否在 PUT API 里调用 |
| Sanity 残留代码 grep 不干净 | 类型 `sanity|PortableText|getAllPosts` 全删 |

### 7.4 图片

| 坑 | 解决 |
|---|---|
| 上传大图后页面卡 | 浏览器端 `imageCompress.ts` 预压缩 + 服务端 sharp 二次压缩 |
| 后台找不到入口绑图 | `/admin/image-slots` 菜单必须在 `NAV_ITEMS` 暴露 |
| next/image 用 R2/Blob 报错 | `next.config.mjs` `remotePatterns` 加域名 |

### 7.5 R2 迁移 / 图床切换（v2.1 新增）

| 坑 | 解决 |
|---|---|
| `NEXT_PUBLIC_R2_URL` 手抖打错（`.r2.devch`） | Vercel 环境变量保存前**复制粘贴一次比对**，错了图片全瞎 |
| Vercel Blob → R2 迁移时漏跑 SQL 更新 | `scripts/migrate-blob-to-r2.mjs` 必须把 `media_files.url` 字段全部 UPDATE 一遍 |
| `image_slots` 外键指向不存在的 `users` 表 | 历史遗留，跑 `scripts/fix-image-slots-fk.mjs` 重建外键到 `admin_users` |
| 删 `@vercel/blob` 前没确认线上稳定 | 等线上跑一周再 `pnpm remove`，避免 rollback 需要 |
| R2 bucket 没开 Public Access | 上传成功但前台 403，控制台 → Settings → Public R2.dev URL 开启 |

### 7.6 包管理器 / 后台 UI（v2.1 新增）

| 坑 | 解决 |
|---|---|
| **`package-lock.json` 和 `pnpm-lock.yaml` 同时存在** | Vercel 用 pnpm 构建，本地手贱 `npm install` 会写出 npm lock 导致依赖分裂；**全程只用 pnpm**，删掉 `package-lock.json` |
| **改超过 30 行的文件用 `edit` 局部替换** | 残留旧代码 → 语法错；改大文件用 `read` + `write` **整文件重写** |
| 后台加新页面但侧边栏不显示 | 同步加 `NAV_ITEMS`（zhixinpaper-usa 翻车过 2 次） |
| 后台菜单超过 7 项老板找不到 | 用 Tab 合并（三类询盘 → `/admin/inquiries?type=`）+ 隐藏低频菜单（产品/媒体保留路由不显示） |
| Hero 文案改一次要发 PR | 用 `site_settings` 表 + `generateMetadata` 取代静态 metadata |
| `'use client'` 组件 import 含 db 的服务端模块 | 拆边界文件（`siteSettingsTypes.ts` 零 Node 依赖 vs `siteSettings.ts` 含 db） |
| 用户名/密码登录后台用浏览器自动填充破坏 UI | 表单加 `autocomplete="off"` + `name` 用非常规命名 |

### 7.7 Next.js 16 元数据（v2.1 新增）

| 坑 | 解决 |
|---|---|
| 静态 `export const metadata` 无法读 DB | 改 `export async function generateMetadata()` |
| `verification.google` 传空字符串 | 会渲染空 meta 标签污染源码，必须传 `undefined`（用 `seo.x?.trim() \|\| undefined`） |
| `verification.other` 字段必须是对象 | Bing 用 `{ "msvalidate.01": "xxx" }`，不能直接传字符串 |
| `generateMetadata` 报错整站 500 | DB 查询必须 `try/catch` + 默认值兜底 |

---

## 八、上线流程（按轨分）

### 🚀 轻型轨（30 分钟）

1. **GitHub** (5min)：建 private repo，`git push`
2. **Vercel Import** (5min)：选 repo，Deploy（首次失败正常）
3. **Upstash** (5min)：Vercel Storage → Marketplace → Upstash Redis → Pay As You Go → **Custom Prefix 留空**
4. **环境变量** (10min)：
   - 必填：`NEXT_PUBLIC_R2_URL` / `R2_*` / `ADMIN_PASSWORD` / `ADMIN_SESSION_SECRET`
   - 选填：`SERVERCHAN_SENDKEY` / `WECOM_WEBHOOK_URL` / `FEISHU_WEBHOOK_URL`
   - 自动：`KV_REST_API_URL` / `KV_REST_API_TOKEN`
5. **Redeploy** (3min)：不勾 Build Cache
6. **绑域名** (10min)：DNS CNAME → `cname.vercel-dns.com`

### 🏭 重型轨（60 分钟，v2.1）

1. **GitHub + Vercel** (10min)：同上
2. **Turso DB** (10min)：
   ```bash
   turso db create thermalpaper-prod
   turso db tokens create thermalpaper-prod
   # 拿到 TURSO_DATABASE_URL + TURSO_AUTH_TOKEN
   ```
3. **Cloudflare R2** (10min)：
   - Cloudflare → R2 → 建 bucket → 开 Public Access
   - API Tokens → Create R2 API Token（拿 Access Key ID + Secret）
   - 记下 R2 public URL（形如 `https://pub-xxx.r2.dev`），**确认末尾没 typo**
4. **环境变量** (15min)：
   - DB：`TURSO_DATABASE_URL` / `TURSO_AUTH_TOKEN`
   - R2：`R2_ACCOUNT_ID` / `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` / `R2_BUCKET` / `NEXT_PUBLIC_R2_URL`
   - 鉴权：`ADMIN_SESSION_SECRET`（48位随机）
   - 通知：`SERVERCHAN_SENDKEY` / `RESEND_API_KEY`（选填）
5. **初始化** (10min)：
   ```bash
   npm run db:init        # 幂等建 11 张表（含 site_settings）
   npm run admin:create   # 创建管理员账号
   ```
6. **Redeploy + 绑域名** (10min)

---

## 九、新项目启动模板

### 选轨问 3 个问题：

1. 需要几个 GEO 落地页？**1 个 → L，>1 → H**
2. 后台需要几个角色？**1 个 → L，>1 → H**
3. 产品/行业页 > 30 个？**否 → L，是 → H**

### L 轨启动

```bash
cp -r E:\website\zxpaper E:\website\新项目名
cd E:\website\新项目名
rm -rf .next .git data src/app/products src/app/resources src/app/about
# 改 src/config/siteData.ts + src/app/layout.tsx + public/logo.*
git init && pnpm install && pnpm dev
# 按 VERCEL_DEPLOY_CHECKLIST.md 走一遍
```

### H 轨启动

```bash
cp -r E:\website\zhixinpaper-usa-main E:\website\新项目名
cd E:\website\新项目名
rm -rf .next .git data node_modules
# 改 src/lib/data.ts (siteData + products + industries)
# 改 src/app/layout.tsx + public/logo.*
# 改 src/lib/imageSlots.ts (按业务重新注册槽位)
git init && npm install
npm run db:init && npm run admin:create
npm run dev
```

---

## 十、扩展路线

| 需求 | L 轨升级 | H 轨升级 |
|---|---|---|
| 月 PV > 100w | 迁 Cloudflare Pages（永久免费） | Vercel Pro $20/月 或 PM2 自托管 |
| 数据量 > 100MB | 换 Upstash 固定 $10/月，或迁 Neon Postgres | Turso Scaler $29/月 |
| 多语言 | next-intl + slots/posts 加 locale 字段 | 同左，加 `app/[locale]/` |
| 在线下单 | 加 ordersStore + Stripe | 加 `orders` 表 + Stripe |
| 全文搜索 | Algolia / Meilisearch Cloud | 同左，或 Turso FTS5 |
| AI 助手 | 接 OpenAI API + 一个 chatStore | 同左，加 `chat_sessions` 表 |

---

## 十一、复用 Checklist 🟢🟡🔴

### 🟢 100% 复用（两条轨都直接 copy）

- `src/lib/notify.ts` — 询盘通知（Server酱+Resend+企微+飞书）
- `src/lib/imageCompress.ts` — 浏览器端压缩
- `src/lib/imageSlots.ts` — 槽位注册（边界安全）
- `src/lib/imageSlotResolver.ts` — 服务端解析 + 缓存
- `src/components/ui/SlotImage.tsx` — 槽位化 Image
- `src/lib/seo.ts` — metadata 工厂 + JSON-LD（buildMetadata / organizationSchema / breadcrumbSchema）
- `src/lib/rate-limit.ts` — 防表单刷
- `src/lib/r2.ts` — R2 S3 客户端封装（v2.1）
- `src/lib/siteSettingsTypes.ts` + `src/lib/siteSettings.ts` — 通用配置层（v2.1）⭐
- `src/app/api/admin/settings/route.ts` — 通用配置 API（v2.1）
- `scripts/init-db.mjs`（H 轨）/ `scripts/create-admin.mjs`（H 轨）

### 🟡 改字段就能用

- L 轨：`heroStore.ts` / `postsStore.ts` / `inquiryStore.ts` / `seoStore.ts`
- H 轨：`src/lib/db/schema.ts` / `src/lib/data.ts` / `siteSettingsTypes.ts` 的 `DEFAULT_HERO_HOME` & `DEFAULT_SEO`
- 两轨共用：`PostEditor.tsx` / `HeroEditor.tsx` / `SeoEditor.tsx` / `MediaManager.tsx` / `AdminLayoutClient.tsx`（**6 项扁平菜单 v2.1**）
- 仪表盘 `admin/page.tsx`（B2B 引导式 v2.1，4 大卡 + 快速开始 + 图片进度）

### 🔴 完全重写（业务相关）

- `src/app/page.tsx` — 首页设计
- `src/app/layout.tsx` — 品牌色 / 字体
- `src/app/products/`, `industries/`, `case-studies/` — 业务核心页
- `src/config/siteData.ts` 或 `src/lib/data.ts` — 公司信息
- `src/lib/imageSlots.ts` SLOT_REGISTRY — 槽位列表
- `src/components/layout/Header.tsx` + `Footer.tsx`

---

## 十二、双轨架构得分对比（SEO/GEO 视角）

> 数据来源：2026-05-22 七维评测

| 维度 | 🚀 L (zxpapers) | 🏭 H (zhixinpaper v2.1) |
|---|---|---|
| SEO 基础（meta/sitemap/robots） | 8/10 | 10/10（动态 `generateMetadata`） |
| Schema.org JSON-LD | 5/10 | 9/10 |
| 多 GEO 落地页 | 0/10 | 10/10 |
| 长尾词覆盖（行业页） | 3/10 | 9/10 |
| Core Web Vitals | 9/10 | 8/10 |
| 后台编辑灵活度 | 7/10 | 10/10（Hero/SEO 可视化 v2.1） |
| 团队协作 | 2/10 | 8/10 |
| **后台 UX**（v2.1 新增） | 8/10 | 9/10（B2B 引导式） |
| **加权总分** | **48/80** | **73/80** |

**结论**：L 轨适合"小而美单品牌"，H 轨适合"全球化矩阵"。

---

## 十三、为什么这是"正确答案"

| 维度 | v2.0 双轨 | Sanity/Strapi | WordPress | Shopify |
|---|---|---|---|---|
| 月成本 | $0 | $30-100 | $20+ | $30+ |
| 老板上手 | 10 分钟 | 1 天 | 半天 | 2 小时 |
| 跑路成本 | 0（全自有） | 数据迁移地狱 | DB 迁移 | 几乎不可能 |
| 加 GEO 页 | H 轨 1 文件 | 改 Schema | 装插件 | 不支持 |
| SEO | 满分（SSR+ISR） | 看实现 | 玄学 | 受限 |
| 加新功能 | 一个 store/表 + 一个 admin 页 | 改 Schema + GROQ | 找插件赌运气 | 不能 |
| 性能 | Edge + ISR 起飞 | 需配 CDN | 必须装缓存插件 | 平台决定 |

---

## 📌 总结

**v2.1 = "选对轨 + 走对路 + 后台让老板用得顺手"的工程哲学**

- 单品牌站 → **🚀 L 轨**（zxpapers.com 模板，1-2 天）
- 多 GEO 站 → **🏭 H 轨**（zhixinpaper.com 模板，3-5 天）
- 两条轨共享 11 个核心组件（+ v2.1 三件套：R2 客户端 / 通用配置层 / settings API）
- **后台 UI 6 条铁律**沉淀（菜单≤7 / 不放图表 / 卡片有去向 / 进度条 / 4 步引导 / 固定保存栏）
- **`site_settings` 通用配置层**：新加运营字段 5 分钟搞定，不用建表
- 零月费起步，升级路线清晰，踩坑全集 7 大类

**v2.1 关键迭代**：
- H 轨图床默认 Cloudflare R2（10GB 免费 + 零出站，干掉 Vercel Blob 1GB 上限）
- 后台从 9 项 4 分组 → 扁平 6 项 + Tab 合并询盘三类
- Hero / SEO 全可视化编辑 + 实时预览 + 真实评分（不再估算）
- 包管理器铁律：**全程只用 pnpm**，禁止 npm install

**下一个项目：先看决策树 → 复制 zhixinpaper-usa-main → 改 siteData + DEFAULT_HERO_HOME → 上线**

---

**v2.1 — 2026-05-22 — 后台美学版**
**v2.0 — 2026-05-22 — 融合 zxpapers.com (v1.0) + zhixinpaper.com 实战**
**作者**：Boss Z + Accio Work Architect
