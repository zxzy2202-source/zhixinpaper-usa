import type { MetadataRoute } from "next";

/**
 * robots.txt — B2B 外贸站 SEO 优化版
 * ─────────────────────────────────────────────────────────────────
 * 策略：
 *   1. 主流搜索引擎（Google/Bing/Yandex/Baidu/DuckDuckGo）全开放
 *   2. 屏蔽无 SEO 价值路径：/api/ /admin/ /login 等（/_next/ 保持开放供渲染）
 *   3. 明确允许图片爬虫抓 R2 上的产品图（图片 SEO 关键）
 *   4. 为 B2B 询盘获客开放主流 AI 搜索、用户请求、训练和语料抓取
 *   5. AI 抓取器继续禁止访问后台、API、登录和本地数据路径
 *   6. 屏蔽低价值 SEO 分析爬虫，节省服务器资源
 */
const PRIVATE_PATHS = ["/api/", "/admin/", "/login", "/data/"];

const AI_USER_AGENTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "Claude-Web",
  "Google-Extended",
  "CCBot",
  "Applebot-Extended",
  "Amazonbot",
  "FacebookBot",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "Bytespider",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  const siteUrl = "https://www.zhixinpaper.com";

  return {
    rules: [
      // ─── 主规则：所有搜索引擎默认开放，屏蔽内部路径 ───
      {
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/api/",          // 所有 API 端点
          "/admin/",        // 后台管理
          "/login",         // 登录页
          // 注意：不屏蔽 /_next/ — Google 渲染页面需要 CSS/JS，
          // 屏蔽会导致 Search Console 报"资源被屏蔽"并影响渲染评估
          "/data/",         // 本地 SQLite 文件目录（防意外暴露）
          "/*?*utm_*",      // 屏蔽 UTM 参数页面（避免重复收录）
          "/*?*ref=*",
          "/*?*fbclid=*",
          "/*?*gclid=*",
        ],
      },

      // ─── Googlebot 单独配置：更激进的开放，明确允许图片 ───
      {
        userAgent: "Googlebot",
        allow: ["/"],
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/"],
        disallow: PRIVATE_PATHS,
      },

      // ─── Bing 同等开放 ───
      {
        userAgent: "Bingbot",
        allow: ["/"],
        disallow: PRIVATE_PATHS,
      },

      // ─── AI 搜索、用户请求、训练和公共语料抓取全部开放 ───
      // 目标是让 B2B 产品、行业、市场与合规页面获得更多 AI 引用和询盘入口。
      ...AI_USER_AGENTS.map((userAgent) => ({
        userAgent,
        allow: ["/"],
        disallow: PRIVATE_PATHS,
      })),

      // ─── 屏蔽 SEO 分析爬虫（消耗带宽） ───
      // 注：SemrushBot 已放行，老板自己要用 Semrush 跑分析
      { userAgent: "AhrefsBot", disallow: ["/"] },
      { userAgent: "MJ12bot", disallow: ["/"] },
      { userAgent: "DotBot", disallow: ["/"] },
      { userAgent: "BLEXBot", disallow: ["/"] },
      { userAgent: "DataForSeoBot", disallow: ["/"] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
