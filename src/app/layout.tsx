import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { websiteSchema, organizationSchema } from "@/lib/seo";
import { getSeoGlobal } from "@/lib/siteSettings";
import "./globals.css";

const geistSans = localFont({
  src: "../../node_modules/next/dist/next-devtools/server/font/geist-latin.woff2",
  variable: "--font-geist",
  display: "swap",
});

const geistDisplay = localFont({
  src: "../../node_modules/next/dist/next-devtools/server/font/geist-latin-ext.woff2",
  variable: "--font-display",
  display: "swap",
});

// 静态默认元数据（运行时会被 generateMetadata 中的 SEO 设置覆盖）
const DEFAULT_TITLE = "Zhixin Paper | Thermal Paper Rolls & Labels Manufacturer";
const DEFAULT_DESC =
  "ISO 9001:2015 certified manufacturer of BPA-free thermal paper rolls and thermal labels. Factory-direct wholesale for distributors and importers in Europe, USA & Canada. FOB Qingdao.";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoGlobal();
  const title = seo.siteTitle?.trim() || DEFAULT_TITLE;
  const description = seo.siteDescription?.trim() || DEFAULT_DESC;
  const ogImage = seo.ogImage?.trim() || "/images/og-default.jpg";

  return {
    metadataBase: new URL("https://www.zhixinpaper.com"),
    title: { default: title, template: "%s | Zhixin Paper" },
    description,
    keywords: seo.keywords?.trim()
      ? seo.keywords.split(",").map((k) => k.trim()).filter(Boolean)
      : undefined,
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "Zhixin Paper",
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      site: seo.twitterHandle?.trim() || undefined,
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    verification: {
      google: seo.googleSiteVerification?.trim() || undefined,
      other: seo.bingSiteVerification?.trim()
        ? { "msvalidate.01": seo.bingSiteVerification.trim() }
        : undefined,
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: "/apple-icon.png",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf6" },
    { media: "(prefers-color-scheme: dark)", color: "#101b19" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistDisplay.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        {/* OKKI CRM 访客分析配置 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.okkiConfigs = window.okkiConfigs || [];
              function okkiAdd() { okkiConfigs.push(arguments); };
              okkiAdd("analytics", { siteId: "68611-18549", gId: "" });
            `,
          }}
        />
      </head>
      <body className="bg-white text-slate-900 antialiased font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-blue-700 focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
        <WhatsAppButton />
        {/* OKKI CRM 访客分析脚本 */}
        <Script
          src="//tfile.xiaoman.cn/okki/analyze.js?id=68611-18549-"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
