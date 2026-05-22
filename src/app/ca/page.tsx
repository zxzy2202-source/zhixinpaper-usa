import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import {
  ArrowRight, CheckCircle2, ShieldCheck, Award, Package,
  Truck, Factory, Star, ChevronDown, Globe, FileText,
  Clock, TrendingUp, Phone, Download, MapPin, Layers
} from "lucide-react";

export const metadata: Metadata = {
  title: "Thermal Paper Supplier Canada — BPA-Free Rolls & Labels",
  description:
    "Leading thermal paper rolls and labels supplier for Canadian distributors and importers. BPA-free, Health Canada compliant, ISO 9001 certified. Cannabis labels, POS paper, shipping labels. Free samples.",
  keywords: "thermal paper supplier Canada, thermal labels wholesale Canada, BPA-free thermal paper Canada, cannabis labels Canada, POS paper rolls Canada, thermal paper distributor Canada",
  openGraph: {
    title: "Thermal Paper Supplier Canada — BPA-Free Rolls & Labels",
    description: "ISO 9001 certified thermal paper manufacturer for Canadian distributors. BPA-free, Health Canada compliant, cannabis labels, POS rolls. Free samples available.",
  },
};

const CA_PRODUCTS = [
  { name: "Standard POS Rolls 80×80mm", spec: "BPA-Free, 55–80gsm, 12mm core", href: "/products/thermal-paper-rolls" },
  { name: "Thermal Receipt Rolls 3⅛×230", spec: "3.125 inch, standard CA/US POS size", href: "/products/thermal-paper-rolls" },
  { name: "Shipping Labels 4×6 inch", spec: "102×152mm, direct thermal, permanent adhesive", href: "/products/thermal-labels" },
  { name: "Cannabis Compliance Labels", spec: "Health Canada compliant, tamper-evident", href: "/ca/cannabis-labels" },
  { name: "ATM Paper Rolls 80×200mm", spec: "High-sensitivity, bank-grade", href: "/products/thermal-paper-rolls" },
  { name: "Direct Thermal Labels 100×150mm", spec: "Permanent adhesive, BPA-free", href: "/products/thermal-labels" },
];

const CA_WHY = [
  "Health Canada compliant BPA-free thermal paper — full compliance documentation provided",
  "Cannabis label expertise — federal and provincial compliant for ON, BC, AB, QC, and all provinces",
  "ISO 9001:2015 certified factory with SGS/Intertek third-party test reports",
  "CA/US standard sizes: 3⅛×230, 4×6 inch labels, 80×80mm POS rolls",
  "Vancouver / Prince Rupert port shipping — 10–15 day standard lead time to BC; 18–22 days to Eastern Canada",
  "Bilingual (English/French) documentation available for Quebec and federal requirements",
  "Custom OEM and private label for Canadian brands and distributors",
  "Dedicated Canadian market support with North American business hours response",
];

const CA_COMPLIANCE = [
  "BPA-Free Certified",
  "Health Canada Compliant",
  "ISO 9001:2015",
  "FSC® Certified Paper",
  "Cannabis Act Compliant",
  "CEPA / REACH Compliant",
];

const CA_MARKET_STATS = [
  { stat: "$1.1B+", label: "Canadian thermal paper market" },
  { stat: "10–15 days", label: "BC sea freight from Qingdao" },
  { stat: "EN/FR", label: "Bilingual documentation" },
  { stat: "All provinces", label: "Cannabis Act compliant" },
];

const CA_LOGISTICS = [
  { step: "Order Confirmed", time: "Day 0", detail: "Quote accepted, production scheduled" },
  { step: "Production", time: "Days 1–10", detail: "Manufacturing & QC inspection" },
  { step: "Export", time: "Days 11–13", detail: "FOB Qingdao — customs clearance" },
  { step: "Sea Freight", time: "Days 14–25", detail: "Qingdao → Vancouver (10–15 days)" },
  { step: "DDP Delivery", time: "Days 26–28", detail: "Delivered to your CA warehouse" },
];

const CA_TIERED_PRICING = [
  { tier: "Sample", qty: "1–4 cartons", unit: "Contact for price", savings: "—" },
  { tier: "Starter", qty: "5–19 cartons", unit: "LTL pallet pricing", savings: "5% off" },
  { tier: "Volume", qty: "20–99 cartons", unit: "Full pallet / LTL", savings: "12% off" },
  { tier: "Container", qty: "100+ cartons", unit: "FCL factory-direct", savings: "20% off" },
];

const CA_FAQ = [
  {
    q: "Are your thermal papers BPA-free for the Canadian market?",
    a: "Yes. All our thermal paper products are BPA-free and comply with Health Canada regulations. We provide full BPA-free certification documentation including SGS or Intertek test reports.",
  },
  {
    q: "Do you supply cannabis labels compliant with the Cannabis Act of Canada?",
    a: "Yes. We manufacture cannabis labels compliant with Canada's Cannabis Act and provincial regulations. Our labels include required health warnings, standardized cannabis symbol, and tamper-evident features for all provinces.",
  },
  {
    q: "What are the most popular thermal paper sizes for Canadian POS systems?",
    a: "Canadian POS systems use the same sizes as the US: 3⅛×230 (3.125 inch width) for standard POS, 2¼×85 for credit card terminals, and 80×80mm. For shipping labels, 4×6 inch (102×152mm) is standard for Canada Post, UPS, FedEx, and Amazon Canada.",
  },
  {
    q: "What is the lead time for shipping to Canada?",
    a: "Standard sea freight takes 10–15 days to Vancouver/Prince Rupert (BC) and 18–22 days to Eastern Canada (Toronto/Montreal). Express air freight is available for urgent orders.",
  },
  {
    q: "Can you provide bilingual (English/French) documentation for Quebec?",
    a: "Yes. We provide bilingual product documentation, SDS sheets, and compliance declarations in both English and French to meet Quebec and federal bilingual requirements.",
  },
  {
    q: "What is the MOQ for Canadian orders?",
    a: "Standard MOQ is 1 pallet (approx. 500–1,000 rolls depending on size). We offer sample packs for new Canadian customers to test product quality before bulk ordering.",
  },
  {
    q: "Do you ship to Canadian warehouses for national distribution?",
    a: "Yes. We can ship to any Canadian warehouse or fulfillment center. We provide all necessary import documentation for Canadian customs clearance including CFIA and CBSA requirements.",
  },
];

export default function CAPage() {
  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-slate-900 to-[#0F2B5B] text-white">
          <div className="container-site">
            <div className="flex items-start gap-6 mb-6">
              <span className="text-6xl leading-none">🇨🇦</span>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-0.5 bg-amber-400 rounded-full" />
                  <span className="text-[10px] font-bold tracking-widest uppercase text-amber-400">Canada Market</span>
                </div>
                <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-2">
                  Thermal Paper Supplier Canada
                </h1>
                <p className="text-white/60 text-base font-medium">BPA-Free Rolls &amp; Labels — Wholesale for Canadian Distributors</p>
              </div>
            </div>
            <p className="text-white/70 text-lg max-w-2xl mb-8 leading-relaxed">
              Zhixin Paper is a leading ISO 9001-certified thermal paper manufacturer supplying Canadian distributors, importers, and POS equipment companies since 2008. All products are BPA-free, Health Canada compliant, and available with full Canadian market documentation including bilingual (EN/FR) options.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {CA_COMPLIANCE.map((item) => (
                <span key={item} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[10px] tracking-widest uppercase text-white/80 font-semibold">
                  <ShieldCheck className="w-3 h-3 text-amber-400" />
                  {item}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/quote" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold rounded-xl transition-colors shadow-lg text-sm">
                Get Canada Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/samples" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-xl hover:border-white hover:bg-white/10 transition-all text-sm">
                Free Samples
              </Link>
              <Link href="/us" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-amber-400/50 text-amber-400 font-semibold rounded-xl hover:border-amber-400 transition-all text-sm">
                <Globe className="w-4 h-4" /> US Market
              </Link>
            </div>
          </div>
        </section>

        {/* ── Key Stats Bar ── */}
        <section className="py-10 bg-white border-b border-slate-100">
          <div className="container-site">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Truck, label: "BC Lead Time", value: "10–15 Days" },
                { icon: Package, label: "Port", value: "Vancouver / Prince Rupert" },
                { icon: Award, label: "Certification", value: "ISO 9001:2015" },
                { icon: Factory, label: "Est.", value: "Since 2008" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</div>
                    <div className="font-bold text-slate-900 text-sm">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MARKET STATS ── */}
        <section className="py-10 bg-slate-50 border-b border-slate-100">
          <div className="container-site">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-slate-900 text-xl">Canada Market at a Glance</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {CA_MARKET_STATS.map((item) => (
                <div key={item.label} className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-center">
                  <p className="font-bold text-blue-700 text-2xl mb-1">{item.stat}</p>
                  <p className="text-slate-500 text-xs">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CA-Specific Solutions ── */}
        <section className="py-20 bg-white">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-0.5 bg-blue-600 rounded-full" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600">CA Solutions</span>
            </div>
            <h2 className="font-bold text-slate-900 text-3xl md:text-4xl mb-3">Canada-Specific Products &amp; Services</h2>
            <p className="text-slate-500 text-base mb-10 max-w-xl">
              Specialized solutions for the Canadian market — Health Canada compliant, Cannabis Act labels, and bilingual documentation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Link href="/ca/cannabis-labels" className="group block p-8 bg-slate-50 border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-xl mb-2 group-hover:text-blue-600 transition-colors">Cannabis Labels Canada</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  Federal and provincial compliant cannabis labels for Canadian licensed producers and retailers. Meets Cannabis Act requirements including standardized cannabis symbol, health warnings, and tamper-evident features.
                </p>
                <div className="flex items-center gap-2 text-blue-600 text-xs font-semibold uppercase tracking-wide group-hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <div className="block p-8 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-xl mb-2">Bilingual Documentation</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  Full bilingual (English/French) product documentation, SDS sheets, and compliance declarations for Quebec and federal requirements. All packaging can be produced with bilingual text.
                </p>
                <Link href="/contact" className="flex items-center gap-2 text-blue-600 text-xs font-semibold uppercase tracking-wide hover:gap-3 transition-all">
                  Contact Us <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* All Products Grid */}
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-0.5 bg-blue-600 rounded-full" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600">Products</span>
            </div>
            <h2 className="font-bold text-slate-900 text-3xl mb-8">Top Products for the Canadian Market</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CA_PRODUCTS.map((product) => (
                <Link
                  key={product.name}
                  href={product.href}
                  className="group block p-5 bg-slate-50 border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="font-bold text-slate-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">{product.name}</div>
                  <div className="text-xs text-slate-400">{product.spec}</div>
                  <div className="flex items-center gap-1 mt-3 text-xs text-blue-600 font-semibold">
                    View details <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/products" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all text-sm">
                View All Products <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Why Zhixin Paper ── */}
        <section className="py-20 bg-slate-50 border-y border-slate-100">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-0.5 bg-blue-600 rounded-full" />
                  <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600">Why Us</span>
                </div>
                <h2 className="font-bold text-slate-900 text-3xl md:text-4xl mb-6">
                  Why Zhixin Paper for Canada?
                </h2>
                <div className="space-y-4">
                  {CA_WHY.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <p className="text-slate-600 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {/* WhatsApp CTA */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <h3 className="font-bold text-slate-900 text-sm">Talk to a Canada Specialist</h3>
                  </div>
                  <p className="text-slate-500 text-xs mb-3">
                    WhatsApp our Canada sales team directly. Response within 2 hours during business hours.
                  </p>
                  <a
                    href="https://wa.me/8618792771927"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors w-full justify-center"
                  >
                    WhatsApp Now <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-slate-900 text-base">Canadian Compliance &amp; Certifications</h3>
                  </div>
                  <div className="space-y-2">
                    {CA_COMPLIANCE.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <Link href="/compliance" className="flex items-center gap-1 mt-4 text-xs text-blue-600 font-semibold hover:underline">
                    View all certificates <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-slate-900 text-base">Quick Links</h3>
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: "Cannabis Labels Canada", href: "/ca/cannabis-labels" },
                      { label: "Thermal Paper Rolls", href: "/products/thermal-paper-rolls" },
                      { label: "Thermal Labels", href: "/products/thermal-labels" },
                      { label: "BPA-Free Products", href: "/compliance/bpa-free" },
                      { label: "Custom OEM & Private Label", href: "/oem-custom" },
                      { label: "Request a Quote", href: "/quote" },
                    ].map((link) => (
                      <Link key={link.href} href={link.href} className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors">
                        <ArrowRight className="w-3.5 h-3.5 text-blue-600/50" />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── LOGISTICS TIMELINE ── */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-2">
              <Truck className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-slate-900 text-2xl">Delivery Timeline to Canada</h2>
            </div>
            <p className="text-slate-500 text-sm mb-10 max-w-2xl">
              From order confirmation to DDP delivery at your Canadian warehouse — here is the complete timeline.
            </p>
            <div className="relative">
              <div className="absolute top-5 left-5 right-5 h-0.5 bg-blue-200 hidden md:block" style={{ zIndex: 0 }} />
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                {CA_LOGISTICS.map((step, i) => (
                  <div key={step.step} className="relative flex flex-col items-center text-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-3 z-10 ${
                      i === CA_LOGISTICS.length - 1 ? "bg-emerald-600 text-white" : "bg-blue-600 text-white"
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
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="font-bold text-slate-900 text-sm mb-1">Eastern Canada (Toronto / Montreal)?</p>
                <p className="text-slate-500 text-xs">Sea freight via Montreal port takes 22–26 days. Air freight available for urgent orders.</p>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition-colors shrink-0">
                Contact Us <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── VOLUME PRICING ── */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-slate-900 text-2xl">Volume Pricing for Canadian Buyers</h2>
            </div>
            <p className="text-slate-500 text-sm mb-8 max-w-2xl">
              Factory-direct pricing with volume discounts. LTL pallet pricing and FCL container pricing available.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {CA_TIERED_PRICING.map((tier, i) => (
                <div
                  key={tier.tier}
                  className={`rounded-2xl p-6 border-2 transition-all ${
                    i === 2
                      ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-100"
                      : "border-slate-200 bg-white hover:border-blue-200"
                  }`}
                >
                  {i === 2 && (
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-600 text-white text-[9px] font-bold tracking-widest uppercase rounded-full mb-3">
                      Most Popular
                    </div>
                  )}
                  <p className="font-bold text-slate-900 text-base mb-1">{tier.tier}</p>
                  <p className="text-slate-500 text-xs mb-3">{tier.qty}</p>
                  <p className="text-slate-700 text-sm font-medium mb-2">{tier.unit}</p>
                  {tier.savings !== "—" && (
                    <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                      {tier.savings}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Link href="/quote" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors shadow-sm">
                Get Exact Pricing <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-slate-400 text-xs">Response within 24 hours · No commitment required</p>
            </div>
          </div>
        </section>

        {/* ── Market Insight ── */}
        <section className="py-12 bg-white">
          <div className="container-site">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-start gap-4">
              <Star className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-900 text-sm mb-1">Canada Market Insight</div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Canada is a significant thermal paper market with strong demand from retail POS, banking, logistics, e-commerce, and the world&apos;s most regulated legal cannabis sector. Key requirements include Health Canada BPA-free compliance, Cannabis Act labeling regulations, and bilingual (English/French) documentation for federal and Quebec requirements. Vancouver and Prince Rupert ports provide the fastest sea freight connections from China to Canada.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 bg-slate-50 border-t border-slate-100">
          <div className="container-site max-w-3xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-0.5 bg-blue-600 rounded-full" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600">FAQ</span>
            </div>
            <h2 className="font-bold text-slate-900 text-3xl mb-10">
              Frequently Asked Questions — Canada
            </h2>
            <div className="space-y-4">
              {CA_FAQ.map((item, i) => (
                <details key={i} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden">
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-semibold text-slate-900 text-sm list-none">
                    {item.q}
                    <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform shrink-0 ml-4" />
                  </summary>
                  <div className="px-6 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <CTABanner
          title="Ready to Source Thermal Paper for Canada?"
          subtitle="Get a custom quote with Health Canada compliance documentation. Free samples for qualified Canadian distributors and importers."
        />
      </main>
      <Footer />
    </>
  );
}
