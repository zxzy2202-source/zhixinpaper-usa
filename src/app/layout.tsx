import type { Metadata, Viewport } from "next";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { Inter } from "next/font/google";
import { websiteSchema, organizationSchema } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zhixinpaper.com"),
  title: {
    default: "Zhixin Paper — Thermal Paper Rolls & Labels Manufacturer",
    template: "%s | Zhixin Paper",
  },
  description:
    "ISO 9001:2015 certified manufacturer of BPA-free thermal paper rolls and thermal labels. Factory-direct wholesale for distributors and importers in Europe, USA & Canada. FOB Qingdao.",
  keywords: [
    // Core product keywords (high volume)
    "thermal paper rolls manufacturer",
    "thermal labels supplier",
    "thermal paper wholesale",
    "BPA free thermal paper",
    "receipt paper rolls bulk",
    "POS paper rolls wholesale",
    "80mm thermal paper rolls",
    "57mm thermal paper rolls",
    // B2B buyer intent keywords
    "thermal paper importer",
    "thermal paper distributor",
    "thermal paper factory direct",
    "OEM thermal paper manufacturer",
    "custom thermal labels",
    "thermal paper container load",
    "pallet pricing thermal rolls",
    // Compliance & certification keywords
    "ISO 9001 thermal paper",
    "FDA compliant thermal paper",
    "Prop 65 compliant thermal paper",
    "BPA free receipt paper USA",
    "REACH compliant thermal paper",
    // Application-specific keywords
    "ATM paper rolls supplier",
    "shipping labels 4x6 wholesale",
    "ecommerce shipping labels bulk",
    "Zebra compatible thermal labels",
    "Epson compatible POS paper",
    // Geographic keywords
    "thermal paper supplier USA",
    "thermal paper supplier Europe",
    "thermal paper supplier Canada",
    "DDP shipping thermal paper USA",
    // Brand
    "Zhixin Paper",
    "zxpapers",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Zhixin Paper",
    title: "Zhixin Paper — BPA-Free Thermal Paper Rolls & Labels Manufacturer",
    description:
      "ISO 9001 certified manufacturer of BPA-free thermal paper rolls and thermal labels. Factory-direct wholesale for distributors in Europe, USA & Canada.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Zhixin Paper — Thermal Paper Manufacturer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zhixin Paper — Thermal Paper Rolls & Labels Manufacturer",
    description:
      "ISO 9001 certified BPA-free thermal paper manufacturer. Factory-direct wholesale for distributors in Europe, USA & Canada.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1e293b" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
      </head>
      <body className="bg-white text-slate-900 antialiased font-sans">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
