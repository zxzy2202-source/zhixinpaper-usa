import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import FaqSection from "@/components/ui/FaqSection";
import { GEO_REGIONS, THERMAL_PAPER_ROLLS, THERMAL_LABELS } from "@/lib/data";
import { canonicalUrl, faqSchema } from "@/lib/seo";
import { normalizeFaqItem } from "@/lib/faq";
import {
  ArrowRight, CheckCircle2, Truck, ShieldCheck, Package, MapPin,
  Clock, Download, Factory, FileCheck, Users, TrendingUp, Phone,
  Globe, Layers, Star, ChevronRight
} from "lucide-react";

interface Props {
  params: Promise<{ country: string }>;
}

const euRegion = GEO_REGIONS.find((r) => r.slug === "eu")!;

const OPEN_GRAPH_LOCALES: Record<string, string> = {
  germany: "en_DE",
  uk: "en_GB",
  france: "en_FR",
  netherlands: "en_NL",
  poland: "en_PL",
};

export async function generateStaticParams() {
  return (euRegion.countries || []).map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  const c = euRegion.countries?.find((c) => c.slug === country);
  if (!c) return {};
  return {
    title: `${country === "uk" ? "UK" : c.name} Thermal Paper and Labels Supply`,
    description: `Thermal paper rolls and labels for distributors in ${c.name}. Review material chemistry, document scope, printer fit, samples, packing, and shipping terms by project.`,
    alternates: {
      canonical: canonicalUrl(`/eu/${country}`),
      languages: {
        en: canonicalUrl(`/eu/${country}`),
        "x-default": canonicalUrl(`/eu/${country}`),
      },
    },
    openGraph: {
      title: `Thermal Paper Supplier ${c.name} | Zhixin Paper`,
      description: `Thermal paper rolls and labels for ${c.name} distributors, with grade-level document, packing, sample, and delivery review.`,
      url: canonicalUrl(`/eu/${country}`),
      siteName: "Zhixin Paper",
      locale: OPEN_GRAPH_LOCALES[country] ?? "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Thermal Paper Supplier ${c.name} | Zhixin Paper`,
      description: `Thermal paper rolls and labels configured for ${c.name} distribution projects.`,
    },
  };
}

// Country procurement checkpoints shown without unsupported market-size claims.
const MARKET_INSIGHTS: Record<string, { stat: string; label: string }[]> = {
  germany: [
    { stat: "80mm", label: "Common POS format to verify" },
    { stat: "Hamburg", label: "Routing option subject to booking" },
    { stat: "DE", label: "Local-language artwork review" },
    { stat: "By SKU", label: "Chemistry and document scope" },
  ],
  uk: [
    { stat: "57/80mm", label: "Common till-roll formats" },
    { stat: "UK REACH", label: "Scope reviewed by material" },
    { stat: "GB", label: "Import and VAT responsibility review" },
    { stat: "By Route", label: "Port and delivery plan" },
  ],
  france: [
    { stat: "FR", label: "Local-language artwork review" },
    { stat: "Le Havre", label: "Routing option subject to booking" },
    { stat: "By Grade", label: "Phenol chemistry confirmation" },
    { stat: "By Use", label: "Food-contact scope review" },
  ],
  netherlands: [
    { stat: "Rotterdam", label: "Routing and redistribution option" },
    { stat: "EU Hub", label: "Onward delivery planned by route" },
    { stat: "Euro Pallet", label: "Warehouse packing option" },
    { stat: "By Quote", label: "Customs and VAT responsibilities" },
  ],
  poland: [
    { stat: "Gdansk", label: "Routing option subject to booking" },
    { stat: "Central EU", label: "Onward distribution planning" },
    { stat: "PL", label: "Local-language artwork review" },
    { stat: "By SKU", label: "MOQ and packing confirmation" },
  ],
};

const LOGISTICS_STEPS: Record<string, { step: string; time: string; detail: string }[]> = {
  default: [
    { step: "Specification & Quote", time: "Project stage", detail: "Confirm SKU, quantity, packing, destination, Incoterm, and responsibilities" },
    { step: "Artwork or Sample", time: "When required", detail: "Approve artwork and production-intent samples before bulk release" },
    { step: "Production & QC", time: "After approval", detail: "Timing follows the approved specification and current capacity" },
    { step: "Export & Transport", time: "After booking", detail: "Port, route, and carrier schedule are recorded in the shipment plan" },
    { step: "Import & Delivery", time: "By agreed Incoterm", detail: "Customs, VAT, and final-delivery responsibilities follow the written quotation" },
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
    { q: "Can you offer phenol options for German projects?", a: "BPA-free, BPS-free, or phenol-free routes may be offered by selected grade. The quotation identifies the chemistry, intended use, destination, and available report scope for procurement review." },
    { q: "Can German-language project documents be reviewed?", a: "German-language artwork or project documents can be reviewed when required. The buyer supplies or approves regulated wording and translations, and the quotation records the final deliverables." },
    { q: "Can delivered terms be quoted for Germany?", a: "Delivered terms may be quoted after destination, classification, customs, duties, VAT, inland delivery, and responsibility allocation are reviewed. Included costs are stated in writing." },
    { q: "What is the minimum order quantity for Germany?", a: "MOQ is confirmed by dimensions, material, printing, tooling, packing, and volume. Share the target SKU and quantity so the quotation can state the applicable minimum and price breakpoints." },
  ],
  uk: [
    { q: "Can you provide documents for UK REACH review?", a: "Available declarations or reports are matched to the selected material and applicable UK scope. Procurement should review the exact SKU, intended use, report coverage, and current validity before approval." },
    { q: "Can delivered terms be quoted for UK addresses?", a: "Delivered terms may be quoted after destination, classification, duties, import VAT, customs responsibilities, and inland delivery are reviewed. The quotation states what is included." },
    { q: "Which UK roll sizes can be reviewed?", a: "Common 57mm and 80mm formats and custom widths can be reviewed. Printer model, width, outer diameter, core, winding direction, and sensing requirements should be confirmed before ordering." },
    { q: "How is the UK delivery schedule confirmed?", a: "The schedule is confirmed after specification and artwork approval, current capacity, carton data, carrier booking, destination, customs scope, and Incoterm are known." },
  ],
  default: [
    { q: "Can you offer BPA-free or other phenol options?", a: "BPA-free, BPS-free, or phenol-free routes may be offered by selected grade. Chemistry, intended use, destination, and current supporting documents are confirmed for the quoted SKU." },
    { q: "Can delivered terms be quoted for European destinations?", a: "Delivered terms may be quoted after destination, classification, duties, VAT, customs responsibilities, and inland delivery are reviewed. The written quotation states included costs and responsibilities." },
    { q: "What is the minimum order quantity?", a: "MOQ is confirmed by dimensions, material, printing, die-cut or tooling needs, packing, and volume. Share the target SKU and quantity for the applicable minimum and price breakpoints." },
    { q: "Can procurement request supporting documents?", a: "Available quality, chemistry, chain-of-custody, food-contact, and technical documents are matched to the exact quoted material, intended use, report scope, language need, and current validity." },
  ],
};

export default async function EUCountryPage({ params }: Props) {
  const { country } = await params;
  const c = euRegion.countries?.find((c) => c.slug === country) as any;
  if (!c) notFound();

  const highlights: string[] = c.highlights || [
    `${c.name} project support with language needs reviewed in the specification`,
    "Phenol chemistry and REACH or RoHS document scope reviewed by selected grade",
    "Quality-system and batch documents matched to the approved project scope",
    "Pricing and supply plan confirmed against quantity and current capacity",
    `Custom OEM and private-label options reviewed for ${c.name} brands`,
    "Incoterm, customs, VAT, and final-delivery responsibilities stated in the quotation",
  ];

  const compliance: string[] = c.compliance || ["Phenol Options", "REACH/RoHS Review", "Quality Documents", "Chain-of-Custody Options"];
  const marketInsights = MARKET_INSIGHTS[country] || null;
  const logisticsSteps = LOGISTICS_STEPS["default"];
  const popularProductLinks = POPULAR_PRODUCTS_LINKS[country] || POPULAR_PRODUCTS_LINKS["default"];
  const faq = COUNTRY_FAQ[country] || COUNTRY_FAQ["default"];
  const faqs = faq.map(normalizeFaqItem);
  const faqJsonLd = faqSchema(faqs);
  const isPilot = country === "uk";

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
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
              {c.description || `Thermal paper rolls and labels for ${c.name} distributors. Material chemistry, document scope, printer fit, packing, and shipping responsibilities are confirmed for the quoted product.`}
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
                Request Samples
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
                 <span className="text-blue-200 text-xs">FOB · CIF · delivered terms reviewed by destination, tax, and responsibility</span>
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
                    { icon: <Factory className="w-4 h-4 text-blue-600" />, label: "By RFQ", sub: "Capacity and production plan" },
                    { icon: <Users className="w-4 h-4 text-blue-600" />, label: "By SKU", sub: "MOQ and packing review" },
                    { icon: <Globe className="w-4 h-4 text-blue-600" />, label: "By Route", sub: "Incoterm and delivery plan" },
                    { icon: <Star className="w-4 h-4 text-blue-600" />, label: "Since 2008", sub: "Manufacturing experience" },
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
                      { label: "Phenol Option Review", href: "/compliance/bpa-free" },
                      { label: "REACH/RoHS Document Review", href: "/compliance/reach-rohs" },
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
                    Message our {c.name} sales team with your SKU, quantity, destination, and requested documents. The team will respond during business hours.
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
                 Compliance &amp; Document Review for {c.name}
              </h2>
            </div>
            <p className="text-slate-500 text-sm mb-8 max-w-2xl">
               Available documents are matched to the exact quoted material, intended use, destination, report scope, language need, and current validity. Request the relevant files for procurement review before approval.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {[
                { label: "Phenol Options", desc: "Chemistry confirmed by grade", href: "/compliance/bpa-free" },
                { label: "REACH/RoHS Review", desc: "Applicable scope checked by material", href: "/compliance/reach-rohs" },
                { label: "Quality Documents", desc: "Available system files reviewed", href: "/compliance/iso-9001" },
                { label: "Chain of Custody", desc: "Option confirmed by quoted SKU", href: "/compliance/fsc-paper" },
                { label: "Food-Contact Review", desc: "Scope checked by construction and use", href: "/compliance/eu-food-contact" },
                { label: "Test Reports", desc: "Matched to selected grade and scope", href: "/compliance/certificates" },
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
                 <p className="font-bold text-slate-900 text-base mb-1">Request Project Documents for {c.name}</p>
                 <p className="text-slate-500 text-sm">
                   Share the product grade, intended use, destination, and requested document list. Available reports and declarations will be matched to the quoted SKU and stated scope.
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
                   Develop a private-label thermal paper range for the {c.name} market. Logo printing, branded packaging, color targets, language needs, confidentiality terms, MOQ, and sample timing are confirmed for the approved specification.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    `Custom logo and back-print for ${c.name} market branding`,
                     "Color target and tolerance confirmed with approved artwork",
                     "Local-language packaging reviewed against buyer-approved copy",
                     "Confidentiality terms available for project review",
                     "Sample cost and turnaround confirmed by specification",
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
                     { label: "Minimum Order", value: "Confirmed by SKU" },
                     { label: "Sample Turnaround", value: "Confirmed by project" },
                     { label: "Color Matching", value: "Approved target and tolerance" },
                     { label: "Print Options", value: "Confirmed by construction" },
                     { label: "Language Support", value: "Reviewed when required" },
                     { label: "Confidentiality", value: "Terms available for review" },
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

        <FaqSection
          faqs={faqs}
          title={`Frequently Asked Questions — ${c.name}`}
          intro={`Common questions from ${c.name} distributors and importers about products, compliance, logistics, and ordering.`}
          eyebrow={`${c.name} buyer FAQ`}
          tone="light"
        />

        <CTABanner
          title={`Ready to Source for ${c.name}?`}
           subtitle={`Request a project-specific quote covering material, documents, samples, packing, Incoterm, destination, and responsibility allocation.${c.shipping ? ` Route options: ${c.shipping}.` : ""}`}
        />
      </main>
      <Footer />
    </>
  );
}
