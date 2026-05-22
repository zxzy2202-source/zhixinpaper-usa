import type { MetadataRoute } from "next";

/**
 * robots.txt — B2B 外贸站 SEO 优化版
 * ─────────────────────────────────────────────────────────────────
 * 策略：
 *   1. 主流搜索引擎（Google/Bing/Yandex/Baidu/DuckDuckGo）全开放
 *   2. 屏蔽无 SEO 价值路径：/api/ /admin/ /_next/ /login 等
 *   3. 明确允许图片爬虫抓 R2 上的产品图（图片 SEO 关键）
 *   4. 屏蔽常见 AI 训练爬虫，保护原创内容（OEM/工厂参数等商业资产）
 *   5. 屏蔽垃圾爬虫（SemrushBot/AhrefsBot 等），节省服务器资源
 */
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
          "/_next/",        // Next.js 内部资源
          "/data/",         // 本地 SQLite 文件目录（防意外暴露）
          "*.json$",        // 屏蔽所有裸 JSON
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
        disallow: ["/api/", "/admin/", "/login", "/_next/static/chunks/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/"],
        disallow: ["/admin/"],
      },

      // ─── Bing 同等开放 ───
      {
        userAgent: "Bingbot",
        allow: ["/"],
        disallow: ["/api/", "/admin/", "/login"],
      },

      // ─── 屏蔽 AI 训练爬虫（保护原创内容/产品资料） ───
      { userAgent: "GPTBot", disallow: ["/"] },
      { userAgent: "ChatGPT-User", disallow: ["/"] },
      { userAgent: "CCBot", disallow: ["/"] },                  // Common Crawl
      { userAgent: "anthropic-ai", disallow: ["/"] },           // Claude
      { userAgent: "Claude-Web", disallow: ["/"] },
      { userAgent: "Google-Extended", disallow: ["/"] },        // Google Bard/Gemini 训练
      { userAgent: "PerplexityBot", disallow: ["/"] },
      { userAgent: "Bytespider", disallow: ["/"] },             // 字节跳动 AI
      { userAgent: "Amazonbot", disallow: ["/"] },              // Alexa 训练
      { userAgent: "Applebot-Extended", disallow: ["/"] },      // Apple AI
      { userAgent: "FacebookBot", disallow: ["/"] },            // Meta AI
      { userAgent: "Meta-ExternalAgent", disallow: ["/"] },

      // ─── 屏蔽 SEO 分析爬虫（消耗带宽 + 数据被竞品看到） ───
      { userAgent: "AhrefsBot", disallow: ["/"] },
      { userAgent: "SemrushBot", disallow: ["/"] },
      { userAgent: "MJ12bot", disallow: ["/"] },
      { userAgent: "DotBot", disallow: ["/"] },
      { userAgent: "BLEXBot", disallow: ["/"] },
      { userAgent: "DataForSeoBot", disallow: ["/"] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
