# 🏗️ B2B 落地页获客架构方案 v2.1 (H 轨标准版)

> **定位**：高转化、多 GEO、AI 友好型 B2B 落地页/外贸独立站标准架构。
> **目标**：零月费起步、极致 SEO、多地区投放支持、运营全可视化自助。
> **适用**：Google Ads 投放页、行业垂直落地页、工厂展示独立站。

---

## 一、 技术栈规范 (Standard Stack)

开发必须严格遵守以下选型，严禁私自更换数据库或图床，以确保全项目线兼容：

| 维度 | 技术选型 | 备注 |
|---|---|---|
| **框架** | **Next.js 16.2+ (App Router)** | 必须使用 Server Components 和 `generateMetadata`。 |
| **样式** | **Tailwind CSS v4** | 必须定义 CSS 变量，支持主题色一键切换。 |
| **数据库** | **Turso (libSQL)** | 边缘数据库，支持 SQL 索引，满足询盘状态流转需求。 |
| **ORM** | **Drizzle ORM** | 强类型约束，禁止使用原始 SQL。 |
| **图床** | **Cloudflare R2** | S3 兼容协议。必须实现"槽位(Slot) + 媒体库"两层抽象。 |
| **通知** | **Server酱 + Resend** | 微信秒级推送 + 自动邮件确认。 |
| **鉴权** | **jose JWT + bcryptjs** | 自建轻量级多账号鉴权。 |

---

## 二、 核心数据模型 (DB Schema - 11 张表)

开发需通过 `drizzle-kit` 或 `scripts/init-db.mjs` 确保以下表结构：

1.  **admin_users**: 后台管理员（多账号）。
2.  **site_settings**: ⭐ **核心配置表**。存储 Hero 文案、SEO 元数据等 JSON 数据。
3.  **contact_inquiries**: 基础询盘。
4.  **quote_requests**: 报价请求（含预估金额）。
5.  **sample_requests**: 样品申请（含物流追踪）。
6.  **product_overrides**: ⭐ **运营自助层**。允许覆盖代码中的默认产品字段。
7.  **blog_posts**: 博客/新闻（支持 SEO 独立设置）。
8.  **media_files**: 媒体库（必须存 width, height, alt, size, webp_thumb_url）。
9.  **media_categories**: 媒体分类。
10. **image_slots**: ⭐ **槽位绑定表**。映射 `slot_key` 到 `media_file_id`。
11. **activity_log**: 记录管理员所有操作。

---

## 三、 落地页核心功能实现 (Key Implementation)

### 3.1 槽位化图片系统 (Image Slotting)
*   **注册制**：在 `lib/imageSlots.ts` 注册所有图片的 `slotKey`。
*   **零坏图**：前端使用 `SlotImage` 组件，数据库未绑定时自动使用代码设定的 `fallback` 图片。

### 3.2 可视化文案与 SEO (v2.1 新特性)
*   **site_settings 层**：通过一个 `PUT /api/admin/settings` 接口处理所有配置。
*   **实时 SEO 评分**：后台 SeoEditor 必须实时计算 0-100 分。
*   **Metadata 生成**：全站禁止使用静态 `metadata`，必须统一使用 `generateMetadata` 从 DB 读取 `site_settings`。

### 3.3 多 GEO 路由矩阵
*   **固定路由**：`/us`, `/ca`, `/eu` 必须独立设计 Hero 文案（通过 `geo.us.hero` 等槽位）。
*   **动态路由**：`industries/[slug]` 必须支持通过 URL slug 动态渲染行业案例，且支持自定义 SEO 标题。

### 3.4 询盘 Tab 三合一
*   **统一管理**：后台 `/admin/inquiries` 必须通过 Tab 切换展示“联系/报价/样品”，且支持状态修改。

### 3.5 全局站点变量与自动化通知 ⭐
*   **变量中枢**：所有站点名称、联系方式必须统一配置在 `src/lib/data.ts` 的 `COMPANY` 对象中。
*   **动态标题**：`notify.ts` 中的通知标题必须带上 `[${COMPANY.name}]` 前缀，确保在共享通知频道（如同一个 Server酱账号）中能一眼区分来源。
*   **一致性签名**：所有自动回复邮件的页脚、发件人名称、正文致谢词必须动态引用该变量。

---

## 四、 性能标准 (Performance Standards)

1.  **首页 ISR**：首页必须配置 `export const revalidate = 3600;`，确保 TTFB < 100ms。
2.  **图片预压缩**：
    *   前端：浏览器端 `canvas` 预压缩至 2400px。
    *   后端：`sharp` 二次压缩 + 生成 **400px WebP 缩略图**。
3.  **双保险通知**：询盘提交后的 `notifyAll()` 必须被 `await`，防止 Serverless 函数提前结束。

---

## 五、 开发与交付 Checklist

1.  **代码克隆**：基于 zhixinpaper-usa 母版。
2.  **数据初始化**：
    *   `npm run db:init` (DDL 建表)。
    *   `npm run admin:create` (创建首个管理员)。
3.  **环境配置**：
    *   `TURSO_DATABASE_URL` / `TURSO_AUTH_TOKEN`
    *   `R2_ACCOUNT_ID` / `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY`
    *   `NEXT_PUBLIC_R2_URL` (注意结尾斜杠及 public access)。
    *   `SERVERCHAN_SENDKEY` / `RESEND_API_KEY`。
4.  **槽位注册**：根据业务需求修改 `src/lib/imageSlots.ts`。
5.  **数据默认值**：在 `src/lib/siteSettingsTypes.ts` 中设定默认的 Hero 和 SEO 文案。
6.  **部署验证**：Vercel 部署后，测试：(1)图片上传是否生成缩略图；(2)询盘提交微信是否收到；(3)首页源代码 SEO 标签是否正确。

---

## 六、 维护铁律

1.  **禁止私自安装 npm 依赖**：全项目强制使用 `pnpm`。
2.  **禁止在 'use client' 组件引用 db**：所有数据库操作必须拆分到服务端文件。
3.  **改动大文件禁止局部 edit**：超过 50 行的改动必须整文件重写。

---
**版本：v2.1 (2026-05-22)**
**作者：Accio Work Chief Architect**
