import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { GEO_REGIONS, THERMAL_PAPER_ROLLS, THERMAL_LABELS } from "@/lib/data";
import {
  ArrowRight, CheckCircle2, Truck, ShieldCheck, Package, MapPin,
  Clock, Download, Factory, FileCheck, Users, TrendingUp, Phone,
  Globe, Layers, Star, ChevronRight
} from "lucide-react";

interface Props {
  params: Promise<{ country: string }>;
}

const euRegion = GEO_REGIONS.find((r) => r.slug === "eu")!;

export async function generateStaticParams() {
  return (euRegion.countries || []).map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  const c = euRegion.countries?.find((c) => c.slug === country);
  if (!c) return {};
  return {
    title: `Thermal Paper Supplier ${c.name} — BPA-Free Rolls & Labels`,
    description: `ISO 9001 certified thermal paper supplier for ${c.name}. BPA-free, REACH/RoHS compliant. ${(c as any).description || ""} Free samples available.`,
    keywords: c.keywords,
    alternates: {
      canonical: `https://www.zhixinpaper.com/eu/${country}`,
    },
    openGraph: {
      title: `Thermal Paper Supplier ${c.name} — BPA-Free Rolls & Labels | Zhixin Paper`,
      description: `ISO 9001 certified thermal paper rolls and labels for ${c.name} distributors. REACH/RoHS compliant, BPA-free, DDP delivery.`,
      url: `https://www.zhixinpaper.com/eu/${country}`,
      siteName: "Zhixin Paper",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Thermal Paper Supplier ${c.name} — BPA-Free Rolls & Labels | Zhixin Paper`,
      description: `ISO 9001 certified thermal paper rolls and labels for ${c.name} distributors.`,
    },
  };
}

// ── Market insights per country ──
const MARKET_INSIGHTS: Record<string, { stat: string; label: string }[]> = {
  germany: [
    { stat: "€2.1B+", label: "Annual thermal paper market" },
    { stat: "#1", label: "Largest EU thermal paper market" },
    { stat: "80mm", label: "Most popular POS roll width" },
    { stat: "Jan 2025", label: "BPA ban effective date" },
  ],
  uk: [
    { stat: "£1.4B+", label: "Annual thermal consumables market" },
    { stat: "57mm", label: "Most popular till roll width" },
    { stat: "UK REACH", label: "Post-Brexit compliance standard" },
    { stat: "DDP UK", label: "Customs-free delivery available" },
  ],
  france: [
    { stat: "€1.2B+", label: "Annual thermal paper market" },
    { stat: "FSC", label: "Required by major French retailers" },
    { stat: "EU 2024/3190", label: "BPA ban compliance required" },
    { stat: "Le Havre", label: "Primary import port" },
  ],
  netherlands: [
    { stat: "Rotterdam", label: "Europe's largest port" },
    { stat: "EU Hub", label: "Re-distribution to 27 EU countries" },
    { stat: "20–24 days", label: "Sea freight from Qingdao" },
    { stat: "DDP NL", label: "Customs-free delivery available" },
  ],
  poland: [
    { stat: "€450M+", label: "Annual thermal paper market" },
    { stat: "+12%", label: "YoY market growth (logistics)" },
    { stat: "Gdańsk", label: "Primary import port" },
    { stat: "Central EU", label: "Gateway to CEE markets" },
  ],
};

// ── Logistics timeline per country ──
const LOGISTICS_STEPS: Record<string, { step: string; time: string; detail: string }[]> = {
  germany: [
    { step: "Order Confirmed", time: "Day 0", detail: "Quote accepted, production scheduled" },
    { step: "Production", time: "Days 1–10", detail: "Manufacturing & QC inspection" },
    { step: "Export", time: "Days 11–13", detail: "FOB Qingdao — customs clearance" },
    { step: "Sea Freight", time: "Days 14–32", detail: "Qingdao → Hamburg (18–22 days)" },
    { step: "Delivery", time: "Days 33–35", detail: "DDP delivery to your warehouse" },
  ],
  uk: [
    { step: "Order Confirmed", time: "Day 0", detail: "Quote accepted, production scheduled" },
    { step: "Production", time: "Days 1–10", detail: "Manufacturing & QC inspection" },
    { step: "Export", time: "Days 11–13", detail: "FOB Qingdao — customs clearance" },
    { step: "Sea Freight", time: "Days 14–40", detail: "Qingdao → Felixstowe (25–30 days)" },
    { step: "Delivery", time: "Days 41–43", detail: "DDP delivery to your UK warehouse" },
  ],
  netherlands: [
    { step: "Order Confirmed", time: "Day 0", detail: "Quote accepted, production scheduled" },
    { step: "Production", time: "Days 1–10", detail: "Manufacturing & QC inspection" },
    { step: "Export", time: "Days 11–13", detail: "FOB Qingdao — customs clearance" },
    { step: "Sea Freight", time: "Days 14–34", detail: "Qingdao → Rotterdam (20–24 days)" },
    { step: "Delivery", time: "Days 35–37", detail: "DDP delivery to your NL warehouse" },
  ],
  default: [
    { step: "Order Confirmed", time: "Day 0", detail: "Quote accepted, production scheduled" },
    { step: "Production", time: "Days 1–10", detail: "Manufacturing & QC inspection" },
    { step: "Export", time: "Days 11–13", detail: "FOB Qingdao — customs clearance" },
    { step: "Sea Freight", time: "Days 14–38", detail: "Qingdao → EU port (18–28 days)" },
    { step: "Delivery", time: "Days 39–42", detail: "DDP delivery to your warehouse" },
  ],
};

// ── Popular products with links per country ──
const POPULAR_PRODUCTS_LINKS: Record<string, { name: string; href: string; tag?: string }[]> = {
  germany: [
    { name: "Standard POS Rolls 80×80mm", href: "/products/thermal-paper-rolls/standard-pos-rolls", tag: "Best Seller" },
    { name: "ATM & Bank Receipt Rolls", href: "/products/thermal-paper-rolls/atm-banking-rolls" },
    { name: "Direct Thermal Labels 100×150mm", href: "/products/thermal-labels/direct-thermal-labels" },
    { name: "Lottery & Gaming Rolls", href: "/products/thermal-paper-rolls/lottery-gaming-rolls" },
    { name: "Custom Printed Rolls (OEM)", href: "/oem-custom/private-label" },
  ],
  uk: [
    { name: "Standard POS Till Rolls 57×40mm", href: "/products/thermal-paper-rolls/standard-pos-rolls", tag: "Best Seller" },
    { name: "Standard POS Till Rolls 80×80mm", href: "/products/thermal-paper-rolls/standard-pos-rolls" },
    { name: "Direct Thermal Labels 4×6\"", href: "/products/thermal-labels/direct-thermal-labels" },
    { name: "ATM & Bank Receipt Rolls", href: "/products/thermal-paper-rolls/atm-banking-rolls" },
    { name: "Custom Printed Rolls (OEM)", href: "/oem-custom/private-label" },
  ],
  netherlands: [
    { name: "Direct Thermal Labels 100×150mm", href: "/products/thermal-labels/direct-thermal-labels", tag: "Best Seller" },
    { name: "Fanfold Labels (Logistics)", href: "/products/thermal-labels/fanfold-labels" },
    { name: "Standard POS Rolls 80×80mm", href: "/products/thermal-paper-rolls/standard-pos-rolls" },
    { name: "Shipping Labels (DHL/GLS/DPD)", href: "/products/thermal-labels/direct-thermal-labels" },
    { name: "Custom Printed Rolls (OEM)", href: "/oem-custom/private-label" },
  ],
  default: [
    { name: "Standard POS Rolls", href: "/products/thermal-paper-rolls/standard-pos-rolls", tag: "Best Seller" },
    { name: "Direct Thermal Labels", href: "/products/thermal-labels/direct-thermal-labels" },
    { name: "ATM & Bank Receipt Rolls", href: "/products/thermal-paper-rolls/atm-banking-rolls" },
    { name: "Fanfold Labels", href: "/products/thermal-labels/fanfold-labels" },
    { name: "Custom Printed Rolls (OEM)", href: "/oem-custom/private-label" },
  ],
};

// ── Country-specific FAQ ──
const COUNTRY_FAQ: Record<string, { q: string; a: string }[]> = {
  germany: [
    { q: "Is your thermal paper BPA-free and compliant with EU 2024/3190?", a: "Yes. All our products are available in BPA-free formulation, compliant with EU Commission Regulation 2024/3190 which banned BPA in thermal paper effective January 2, 2025. SGS test reports are available on request at no charge." },
    { q: "Do you provide German-language compliance documentation?", a: "Yes. We provide German-language REACH declarations, BPA-free certificates, and technical data sheets for German procurement teams and regulatory audits." },
    { q: "Can you ship DDP to our warehouse in Germany?", a: "Yes. We offer DDP (Delivered Duty Paid) shipping to any German address via Hamburg port. All customs duties and VAT are handled on our side — you receive goods at your door with no additional charges." },
    { q: "What is the minimum order quantity for Germany?", a: "MOQ is 10,000 rolls for standard POS rolls, or 50,000 labels for thermal labels. Container load pricing is available for 200+ cartons with significant volume discounts." },
  ],
  uk: [
    { q: "Are your products UK REACH compliant post-Brexit?", a: "Yes. We provide UK REACH compliance documentation independent of EU REACH, including UK SVHC declarations and BPA-free certificates valid for UK import requirements." },
    { q: "Do you ship DDP to UK addresses?", a: "Yes. We offer DDP delivery to any UK address via Felixstowe or Southampton port. All UK customs duties and import VAT are handled by us — no unexpected charges for you." },
    { q: "What UK-specific sizes do you stock?", a: "We stock all standard UK till roll sizes: 57×40mm, 57×50mm, 80×70mm, and 80×80mm. Custom widths are available for specialist applications." },
    { q: "How long does delivery take to the UK?", a: "Sea freight from Qingdao to Felixstowe takes 25–30 days. With 10–15 days production, total lead time is typically 35–45 days. Air freight is available for urgent orders." },
  ],
  default: [
    { q: "Are your products BPA-free and REACH compliant?", a: "Yes. All our products are available in BPA-free formulation, compliant with EU Commission Regulation 2024/3190. Full REACH SVHC declarations and SGS test reports are available on request." },
    { q: "Do you offer DDP shipping to EU countries?", a: "Yes. We offer DDP (Delivered Duty Paid) shipping to most EU countries. All customs duties and VAT are handled on our side — you receive goods at your warehouse with no additional charges." },
    { q: "What is the minimum order quantity?", a: "MOQ is 10,000 rolls for standard POS rolls, or 50,000 labels for thermal labels. Volume discounts are available from 50 cartons, with container load pricing for 200+ cartons." },
    { q: "Can you provide compliance documentation for our procurement team?", a: "Yes. We provide a full compliance documentation package including ISO 9001:2015 certificate, BPA-free test reports, REACH declarations, and TDS — all within 24 hours of request." },
  ],
};

export default async function EUCountryPage({ params }: Props) {
  const { country } = await params;
  const c = euRegion.countries?.find((c) => c.slug === country) as any;
  if (!c) notFound();

  const highlights: string[] = c.highlights || [
    `Dedicated ${c.name} market support with local language documentation`,
    "BPA-free and REACH/RoHS compliant products for EU market entry",
    "ISO 9001:2015 certified factory with full quality traceability",
    "Competitive pricing with stable supply for distributors and importers",
    `Custom OEM and private label for ${c.name} brands`,
    "Fast EU logistics with DDP delivery available",
  ];

  const compliance: string[] = c.compliance || ["BPA-Free (EU 2024/3190)", "REACH/RoHS", "ISO 9001:2015", "FSC Certified"];
  const marketInsights = MARKET_INSIGHTS[country] || null;
  const logisticsSteps = LOGISTICS_STEPS[country] || LOGISTICS_STEPS["default"];
  const popularProductLinks = POPULAR_PRODUCTS_LINKS[country] || POPULAR_PRODUCTS_LINKS["default"];
  const faq = COUNTRY_FAQ[country] || COUNTRY_FAQ["default"];
  const isPilot = country === "uk";

  return (
    <>
      <Header />
      <main id="main-content" className={isPilot ? "pilot-brand-page" : undefined}>

        {/* ── HERO ── */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 border-b border-slate-200">
          <div className="container-site">
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 uppercase tracking-wide">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/eu" className="hover:text-blue-600 transition-colors">Europe</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-500">{c.name}</span>
            </nav>
            <div className={isPilot ? "mb-4 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center" : "flex items-center gap-4 mb-4"}>
              <span className="text-5xl">{c.flag}</span>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-0.5 bg-blue-600 rounded-full" />
                  <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600">{c.lang} Market</span>
                </div>
                <h1 className="font-bold text-slate-900 text-5xl md:text-6xl">
                  Thermal Paper Supplier {c.name}
                </h1>
              </div>
            </div>
            <p className="text-slate-500 text-lg max-w-3xl mb-5">
              {c.description || `ISO 9001 certified thermal paper manufacturer with dedicated support for the ${c.name} market. BPA-free, REACH compliant, DDP delivery available.`}
            </p>
            {/* Compliance badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {compliance.map((badge: string) => (
                <span key={badge} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-xs tracking-wide uppercase text-slate-600  shadow-sm">
                  <CheckCircle2 className="w-3 h-3 text-blue-600" />
                  {badge}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/quote" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold  transition-colors shadow-sm text-sm">
                Get {c.name} Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/samples" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-slate-300 text-slate-700 font-semibold  hover:border-blue-400 hover:text-blue-600 transition-all text-sm">
                {isPilot ? "Request Samples" : "Free Samples"}
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-slate-300 text-slate-700 font-semibold  hover:border-blue-400 hover:text-blue-600 transition-all text-sm">
                <Download className="w-4 h-4" /> Compliance Docs
              </Link>
              <Link href="/eu" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-blue-600 text-blue-600 font-bold  hover:bg-blue-600 hover:text-white transition-all text-sm">
                All EU Markets
              </Link>
            </div>
          </div>
        </section>

        {/* ── LOGISTICS INFO BAR ── */}
        {c.shipping && (
          <section className="py-5 bg-blue-600 text-white">
            <div className="container-site flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-200" />
                <span className="font-semibold">{c.shipping}</span>
              </div>
              {c.port && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-200" />
                  <span>Destination Port: <strong>{c.port}</strong></span>
                </div>
              )}
              {c.leadTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-200" />
                  <span>Lead Time: <strong>{c.leadTime}</strong></span>
                </div>
              )}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-blue-200 text-xs">DDP · FOB · CIF available</span>
              </div>
            </div>
          </section>
        )}

        {/* ── MARKET INSIGHTS (if available) ── */}
        {marketInsights && (
          <section className="py-10 bg-white border-b border-slate-100">
            <div className="container-site">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h2 className="font-bold text-slate-900 text-xl">{c.name} Market at a Glance</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {marketInsights.map((item) => (
                  <div key={item.label} className="bg-blue-50 border border-blue-100  p-5 text-center">
                    <p className="font-bold text-blue-700 text-2xl mb-1">{item.stat}</p>
                    <p className="text-slate-500 text-xs">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── WHY ZHIXIN + POPULAR PRODUCTS + QUICK LINKS ── */}
        <section className="py-20 bg-white">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              {/* Highlights */}
              <div className="lg:col-span-2">
                <h2 className="font-bold text-slate-900 text-3xl mb-6">Why Zhixin Paper for {c.name}?</h2>
                <div className="space-y-4 mb-8">
                  {highlights.map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <p className="text-slate-600 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>

                {/* Trust signals row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { icon: <Factory className="w-4 h-4 text-blue-600" />, label: "500M+", sub: "Rolls/year capacity" },
                    { icon: <Users className="w-4 h-4 text-blue-600" />, label: "500+", sub: "Distributors served" },
                    { icon: <Globe className="w-4 h-4 text-blue-600" />, label: "80+", sub: "Countries supplied" },
                    { icon: <Star className="w-4 h-4 text-blue-600" />, label: "15+", sub: "Years experience" },
                  ].map((item) => (
                    <div key={item.label} className="bg-slate-50 border border-slate-200  p-4 text-center">
                      <div className="flex justify-center mb-2">{item.icon}</div>
                      <p className="font-bold text-slate-900 text-lg">{item.label}</p>
                      <p className="text-slate-500 text-xs">{item.sub}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-5">

                {/* Popular Products with direct links */}
                <div className="bg-slate-50 border border-slate-200  p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Package className="w-4 h-4 text-blue-600" />
                    <h3 className="font-bold text-slate-900 text-base">Popular in {c.name}</h3>
                  </div>
                  <div className="space-y-2.5">
                    {popularProductLinks.map((p) => (
                      <Link
                        key={p.href}
                        href={p.href}
                        className="flex items-center justify-between gap-2 text-slate-600 hover:text-blue-600 text-sm transition-colors group"
                      >
                        <div className="flex items-center gap-2">
                          <ArrowRight className="w-3 h-3 text-blue-500 shrink-0" />
                          <span className="group-hover:underline">{p.name}</span>
                        </div>
                        {p.tag && (
                          <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[9px] font-bold rounded-full shrink-0">
                            {p.tag}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-white border border-slate-200  p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <h3 className="font-bold text-slate-900 text-base">Quick Links</h3>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { label: "Thermal Paper Rolls", href: "/products/thermal-paper-rolls" },
                      { label: "Thermal Labels", href: "/products/thermal-labels" },
                      { label: "BPA-Free Products", href: "/compliance/bpa-free" },
                      { label: "REACH/RoHS Compliance", href: "/compliance/reach-rohs" },
                      { label: "Custom OEM / Private Label", href: "/oem-custom" },
                      { label: "Request Compliance Docs", href: "/contact" },
                      { label: "Request Quote", href: "/quote" },
                    ].map((link) => (
                      <Link key={link.href} href={link.href} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 text-sm transition-colors">
                        <ArrowRight className="w-3.5 h-3.5 text-blue-600/50" />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="bg-emerald-50 border border-emerald-200  p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <h3 className="font-bold text-slate-900 text-sm">Talk to a Specialist</h3>
                  </div>
                  <p className="text-slate-500 text-xs mb-3">
                    WhatsApp our {c.name} sales team directly. Response within 2 hours during business hours.
                  </p>
                  <a
                    href="https://wa.me/8618792771927"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold  text-xs transition-colors w-full justify-center"
                  >
                    WhatsApp Now <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── LOGISTICS TIMELINE ── */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-2">
              <Truck className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-slate-900 text-2xl">Delivery Timeline to {c.name}</h2>
            </div>
            <p className="text-slate-500 text-sm mb-10 max-w-2xl">
              From order confirmation to delivery at your {c.name} warehouse — here is the complete timeline.
            </p>
            <div className="relative">
              {/* Timeline connector line */}
              <div className="absolute top-5 left-5 right-5 h-0.5 bg-blue-200 hidden md:block" style={{ zIndex: 0 }} />
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                {logisticsSteps.map((step, i) => (
                  <div key={step.step} className="relative flex flex-col items-center text-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-3 z-10 ${
                      i === logisticsSteps.length - 1
                        ? "bg-emerald-600 text-white"
                        : "bg-blue-600 text-white"
                    }`}>
                      {i + 1}
                    </div>
                    <p className="font-bold text-slate-900 text-xs mb-1">{step.step}</p>
                    <p className="text-blue-600 text-xs font-semibold mb-1">{step.time}</p>
                    <p className="text-slate-400 text-[10px] leading-relaxed">{step.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 bg-blue-50 border border-blue-200  p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="font-bold text-slate-900 text-sm mb-1">Need faster delivery?</p>
                <p className="text-slate-500 text-xs">Air freight available for urgent orders. Contact us for air freight pricing and availability.</p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold  text-xs transition-colors shrink-0"
              >
                Contact Us <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── COMPLIANCE SECTION ── */}
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-2">
              <FileCheck className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-slate-900 text-2xl">
                Compliance &amp; Certifications for {c.name}
              </h2>
            </div>
            <p className="text-slate-500 text-sm mb-8 max-w-2xl">
              All compliance documents are issued by accredited third-party laboratories and updated annually. Request the full compliance pack for your procurement team within 24 hours.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {[
                { label: "BPA-Free", desc: "EU 2024/3190 ban compliant", href: "/compliance/bpa-free" },
                { label: "REACH/RoHS", desc: "SVHC compliant, Annex XVII", href: "/compliance/reach-rohs" },
                { label: "ISO 9001:2015", desc: "Certified quality management", href: "/compliance/iso-9001" },
                { label: "FSC Certified", desc: "Responsible forest sourcing", href: "/compliance/fsc-paper" },
                { label: "EU Food Contact", desc: "Food-safe labeling compliant", href: "/compliance/eu-food-contact" },
                { label: "SGS / Intertek", desc: "Third-party test reports", href: "/compliance/certificates" },
              ].map((item) => (
                <Link key={item.label} href={item.href} className="bg-slate-50 border border-slate-200  p-4 hover:border-blue-300 hover:shadow-sm transition-all group text-center">
                  <div className="flex justify-center mb-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-bold text-slate-900 text-xs group-hover:text-blue-600 transition-colors block mb-1">{item.label}</span>
                  <p className="text-[10px] text-slate-500">{item.desc}</p>
                </Link>
              ))}
            </div>

            {/* Compliance pack CTA */}
            <div className="bg-blue-50 border border-blue-200  p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="font-bold text-slate-900 text-base mb-1">Request Full {c.name} Compliance Pack</p>
                <p className="text-slate-500 text-sm">
                  ISO 9001 certificate, BPA-free SGS test report, REACH declaration, TDS — all in one package. Sent within 24 hours.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold  text-sm transition-colors shrink-0 shadow-sm"
              >
                <Download className="w-4 h-4" /> Request Docs
              </Link>
            </div>
          </div>
        </section>

        {/* ── OEM / PRIVATE LABEL ── */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-0.5 bg-emerald-500 rounded-full" />
                  <span className="text-xs font-bold tracking-widest uppercase text-emerald-600">OEM & Private Label</span>
                </div>
                <h2 className="font-bold text-slate-900 text-3xl mb-4">
                  Build Your {c.name} Brand
                </h2>
                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  Launch your own thermal paper brand in the {c.name} market with our end-to-end OEM service. Custom logo printing, branded packaging, Pantone color matching, and NDA protection — all included. MOQ from 5,000 rolls.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    `Custom logo and back-print for ${c.name} market branding`,
                    "Pantone color matching — exact brand color reproduction",
                    "Local language packaging (German, French, Dutch, Polish, etc.)",
                    "NDA signed before any design work begins",
                    "7-day branded sample turnaround",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <Link href="/oem-custom/private-label" className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold  text-sm transition-colors shadow-sm">
                  Explore OEM Options <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="bg-white border border-slate-200  p-8">
                <h3 className="font-bold text-slate-900 text-lg mb-5">OEM Service Summary</h3>
                <div className="space-y-4">
                  {[
                    { label: "Minimum Order", value: "5,000 rolls" },
                    { label: "Sample Turnaround", value: "7 business days" },
                    { label: "Color Matching", value: "Pantone / CMYK" },
                    { label: "Print Options", value: "Front + Back print" },
                    { label: "Language Support", value: c.lang + " documentation" },
                    { label: "NDA", value: "Signed before design" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center
 justify-between py-2 border-b border-slate-200 last:border-0">
                      <span className="text-slate-500 text-sm">{item.label}</span>
                      <span className="font-bold text-slate-900 text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── COUNTRY-SPECIFIC FAQ ── */}
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-slate-900 text-2xl">Frequently Asked Questions — {c.name}</h2>
            </div>
            <p className="text-slate-500 text-sm mb-8 max-w-2xl">
              Common questions from {c.name} distributors and importers about our products, compliance, and logistics.
            </p>
            <div className="space-y-4 max-w-3xl">
              {faq.map((item, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200  p-6">
                  <p className="font-bold text-slate-900 text-sm mb-2">{item.q}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner
          title={`Ready to Source for ${c.name}?`}
          subtitle={`Get a custom quote with full EU compliance documentation. ${c.shipping ? `Shipping: ${c.shipping}.` : ""} Free samples available.`}
        />
      </main>
      <Footer />
    </>
  );
}
