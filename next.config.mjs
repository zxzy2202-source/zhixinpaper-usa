/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Enable Next.js image optimization for CDN caching
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
    // 允许远程图片走 next/image 优化
    remotePatterns: [
      // Cloudflare R2 公开开发 URL（pub-xxx.r2.dev）
      { protocol: "https", hostname: "*.r2.dev" },
      // Cloudflare R2 自定义域名（如 cdn.zhixinpaper.com）
      { protocol: "https", hostname: "cdn.zhixinpaper.com" },
      // 兼容期：Vercel Blob 残留图片（迁移完成后可删）
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  // Enable compression for better performance
  compress: true,
  // Remove X-Powered-By header for security
  poweredByHeader: false,
  // Performance: enable React strict mode
  reactStrictMode: true,
  async headers() {
    return [
      // Security headers for all routes
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      // Long-term cache for static assets (images, fonts, icons)
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Long-term cache for Next.js static files
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache for SVG and other public assets
      {
        source: "/:file(.*\\.(?:svg|png|jpg|jpeg|gif|ico|webp|avif|woff|woff2|ttf|eot))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      // Admin routes: never cache, always private
      {
        source: "/admin/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-cache, no-store, must-revalidate",
          },
        ],
      },
      // CDN cache for public HTML pages (exclude admin routes)
      {
        source: "/((?!api|admin|_next/static|_next/image|favicon.ico).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
  // Trailing slash consistency
  trailingSlash: false,
};
export default nextConfig;
