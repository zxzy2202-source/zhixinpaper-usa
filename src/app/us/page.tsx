import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  ArrowRight, CheckCircle2, Truck, MapPin, ShieldCheck, Package,
  Clock, Download, Factory, FileCheck, Users, TrendingUp, Phone,
  Globe, Star, Layers
} from "lucide-react";

export const metadata: Metadata = {
  title: "Thermal Paper Supplier USA — FDA Compliant Wholesale",
  description:
    "FDA-compliant, Prop 65 compliant thermal paper rolls and labels for US distributors and importers. BPA-free, 21 CFR food contact safe, ISO 9001 certified. DDP shipping to USA. Cannabis labels, POS paper, shipping labels. Compatible with Zebra, Epson, Star printers.",
  keywords: [
    "thermal paper supplier USA",
    "thermal labels wholesale America",
    "FDA compliant thermal paper",
    "BPA free thermal paper USA",
    "Prop 65 compliant thermal paper",
    "21 CFR thermal paper",
    "thermal paper DDP USA",
    "pallet pricing thermal paper USA",
    "container load thermal paper USA",
    "cannabis labels USA",
    "Zebra compatible thermal labels USA",
    "thermal paper importer United States",
    "receipt paper wholesale USA",
    "shipping labels bulk USA",
  ],
};

const US_HIGHLIGHTS = [
  "FDA 21 CFR compliant — full food contact documentation provided for US import clearance",
  "Prop 65 compliant — no BPA, BPS, or BPAF in any product, SGS test reports available",
  "DDP shipping to any US port — no customs clearance hassle, no unexpected charges",
  "LA / Long Beach port — 14–18 days sea freight from Qingdao; East Coast via NY/NJ 22–26 days",
  "LTL pallet pricing and full container load (FCL) pricing available for all order sizes",
  "Cannabis labels compliant with CA, CO, WA, OR, MI, IL, and all legal state regulations",
  "Compatible with Zebra, Epson, Star, Bixolon, Rollo, Dymo, and all US-market printers",
  "ISO 9001:2015 certified factory with SGS / Intertek third-party test reports on request",
];

const US_PRODUCTS = [
  { name: "Standard POS Rolls 3⅛×230", spec: "80mm, BPA-Free, 55–80gsm, 12mm core", href: "/products/thermal-paper-rolls/standard-pos-rolls", tag: "Best Seller" },
  { name: "Shipping Labels 4×6 inch", spec: "102×152mm, direct thermal, Amazon FBA validated", href: "/products/thermal-labels/direct-thermal-labels", tag: "Amazon FBA" },
  { name: "ATM & Bank Receipt Rolls", spec: "80mm, archival-grade, 7-year image life", href: "/products/thermal-paper-rolls/atm-banking-rolls" },
  { name: "Fanfold Labels (Warehouse)", spec: "4×6\", Z-fold, high-volume fulfillment", href: "/products/thermal-labels/fanfold-labels" },
  { name: "Cannabis Compliance Labels", spec: "State-compliant, tamper-evident, custom printed", href: "/us/cannabis-labels", tag: "Specialty" },
  { name: "Medical Grade Thermal Rolls", spec: "BPA-Free, 10-year image life, FDA compliant", href: "/products/thermal-paper-rolls/medical-rolls" },
];

const US_COMPLIANCE = [
  { label: "FDA 21 CFR", desc: "Food contact compliant", href: "/compliance/fda-us" },
  { label: "Prop 65 Compliant", desc: "No BPA/BPS/BPAF", href: "/compliance/bpa-free" },
  { label: "ISO 9001:2015", desc: "Certified quality management", href: "/compliance/iso-9001" },
  { label: "FSC Certified", desc: "Responsibly sourced paper", href: "/compliance/fsc-paper" },
  { label: "SGS / Intertek", desc: "Third-party test reports", href: "/compliance/certificates" },
  { label: "Cannabis Compliant", desc: "All legal US states", href: "/us/cannabis-labels" },
];

const US_MARKET_STATS = [
  { stat: "$8.2B+", label: "US thermal paper market" },
  { stat: "#1", label: "Largest global thermal market" },
  { stat: "3⅛\"", label: "Most popular POS roll width" },
  { stat: "4×6\"", label: "Standard shipping label size" },
];

const US_LOGISTICS = [
  { step: "Order Confirmed", time: "Day 0", detail: "Quote accepted, production scheduled" },
  { step: "Production", time: "Days 1–10", detail: "Manufacturing & QC inspection" },
  { step: "Export", time: "Days 11–13", detail: "FOB Qingdao — customs clearance" },
  { step: "Sea Freight", time: "Days 14–28", detail: "Qingdao → LA/LB (14–18 days)" },
  { step: "DDP Delivery", time: "Days 29–32", detail: "Delivered to your US warehouse" },
];

const US_TIERED_PRICING = [
  { tier: "Sample", qty: "1–4 cartons", unit: "Contact for price", savings: "—" },
  { tier: "Starter", qty: "5–19 cartons", unit: "LTL pallet pricing", savings: "5% off" },
  { tier: "Volume", qty: "20–99 cartons", unit: "Full pallet / LTL", savings: "12% off" },
  { tier: "Container", qty: "100+ cartons", unit: "FCL factory-direct", savings: "20% off" },
];

const US_FAQ = [
  {
    q: "Are your products FDA compliant and Prop 65 compliant?",
    a: "Yes. All our products are available in FDA 21 CFR compliant formulations for food contact applications. All products are Prop 65 compliant — no BPA, BPS, or BPAF. SGS test reports and FDA compliance declarations are available on request at no charge.",
  },
  {
    q: "Do you offer DDP shipping to US addresses?",
    a: "Yes. We offer DDP (Delivered Duty Paid) shipping to any US port — Los Angeles/Long Beach for West Coast, New York/New Jersey for East Coast. All US customs duties and import fees are handled on our side. You receive goods at your warehouse with no additional charges.",
  },
  {
    q: "Are your 4×6 shipping labels Amazon FBA compliant?",
    a: "Yes. Our 4×6 inch (102×152mm) direct thermal labels are pre-validated for Amazon fulfillment centers. 24-month image life meets Amazon FBA label retention requirements. GS1-128 barcode format supported. Compatible with Zebra GX430t, ZD420, and ZD621 — the printer models used at Amazon FCs.",
  },
  {
    q: "Do you supply cannabis compliance labels for US states?",
    a: "Yes. We supply state-compliant cannabis labels for all US legal states including CA, CO, WA, OR, MI, IL, NV, AZ, and more. Labels include tamper-evident features, custom printing, and meet individual state packaging and labeling requirements.",
  },
];

export default function USPage() {
  return (
    <>
      <Header />
      <main>

        {/* ── HERO ── */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 border-b border-slate-200">
          <div className="container-site">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">🇺🇸</span>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-0.5 bg-blue-600 rounded-full" />
                  <span className="text-xs font-bold tracking-widest uppercase text-blue-600">United States Market</span>
                </div>
                <h1 className="font-bold text-slate-900 text-5xl md:text-6xl">
                  Thermal Paper Supplier USA
                </h1>
              </div>
            </div>
            <p className="text-slate-500 text-lg max-w-3xl mb-5">
              FDA-compliant, Prop 65 compliant thermal paper rolls and labels for US distributors, importers, and e-commerce sellers. BPA-free, ISO 9001 certified, DDP shipping to any US port.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["FDA 21 CFR", "Prop 65 Compliant", "BPA-Free", "ISO 9001", "DDP USA", "Amazon FBA Validated", "Cannabis Labels"].map((f) => (
                <span key={f} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-xs tracking-wide uppercase text-slate-600 rounded-lg shadow-sm">
                  <CheckCircle2 className="w-3 h-3 text-blue-600" />
                  {f}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/quote" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm text-sm">
                Get US Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/samples" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all text-sm">
                Free Samples
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all text-sm">
                <Download className="w-4 h-4" /> Compliance Docs
              </Link>
            </div>
          </div>
        </section>

        {/* ── LOGISTICS BAR ── */}
        <section className="py-5 bg-blue-600 text-white">
          <div className="container-site flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-200" />
              <span className="font-semibold">FOB Qingdao → Los Angeles / Long Beach — 14–18 days sea freight</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-200" />
              <span>West Coast: <strong>LA / Long Beach</strong> · East Coast: <strong>NY / NJ</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-200" />
              <span>Total lead time: <strong>24–32 days</strong></span>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-blue-200 text-xs">DDP · FOB · CIF available</span>
            </div>
          </div>
        </section>

        {/* ── MARKET STATS ── */}
        <section className="py-10 bg-white border-b border-slate-100">
          <div className="container-site">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-slate-900 text-xl">US Market at a Glance</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {US_MARKET_STATS.map((item) => (
                <div key={item.label} className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-center">
                  <p className="font-bold text-blue-700 text-2xl mb-1">{item.stat}</p>
                  <p className="text-slate-500 text-xs">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HIGHLIGHTS + SIDEBAR ── */}
        <section className="py-20 bg-white">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              {/* Highlights */}
              <div className="lg:col-span-2">
                <h2 className="font-bold text-slate-900 text-3xl mb-6">Why US Buyers Choose Zhixin Paper</h2>
                <div className="space-y-4 mb-8">
                  {US_HIGHLIGHTS.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <p className="text-slate-600 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>

                {/* Trust signals */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { icon: <Factory className="w-4 h-4 text-blue-600" />, label: "500M+", sub: "Rolls/year capacity" },
                    { icon: <Users className="w-4 h-4 text-blue-600" />, label: "500+", sub: "Distributors served" },
                    { icon: <Globe className="w-4 h-4 text-blue-600" />, label: "80+", sub: "Countries supplied" },
                    { icon: <Star className="w-4 h-4 text-blue-600" />, label: "15+", sub: "Years experience" },
                  ].map((item) => (
                    <div key={item.label} className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                      <div className="flex justify-center mb-2">{item.icon}</div>
                      <p className="font-bold text-slate-900 text-lg">{item.label}</p>
                      <p className="text-slate-500 text-xs">{item.sub}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-5">
                {/* Popular products */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Package className="w-4 h-4 text-blue-600" />
                    <h3 className="font-bold text-slate-900 text-base">Popular in USA</h3>
                  </div>
                  <div className="space-y-2.5">
                    {US_PRODUCTS.map((p) => (
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
                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <h3 className="font-bold text-slate-900 text-base">Quick Links</h3>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { label: "Thermal Paper Rolls", href: "/products/thermal-paper-rolls" },
                      { label: "Shipping Labels 4×6\"", href: "/products/thermal-labels/direct-thermal-labels" },
                      { label: "FDA Compliant Products", href: "/us/fda-compliant" },
                      { label: "Cannabis Labels USA", href: "/us/cannabis-labels" },
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

                {/* WhatsApp */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <h3 className="font-bold text-slate-900 text-sm">Talk to a US Specialist</h3>
                  </div>
                  <p className="text-slate-500 text-xs mb-3">
                    WhatsApp our US sales team directly. Response within 2 hours during business hours.
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
              </div>
            </div>
          </div>
        </section>

        {/* ── LOGISTICS TIMELINE ── */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-2">
              <Truck className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-slate-900 text-2xl">Delivery Timeline to USA</h2>
            </div>
            <p className="text-slate-500 text-sm mb-10 max-w-2xl">
              From order confirmation to DDP delivery at your US warehouse — here is the complete timeline.
            </p>
            <div className="relative">
              <div className="absolute top-5 left-5 right-5 h-0.5 bg-blue-200 hidden md:block" style={{ zIndex: 0 }} />
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                {US_LOGISTICS.map((step, i) => (
                  <div key={step.step} className="relative flex flex-col items-center text-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-3 z-10 ${
                      i === US_LOGISTICS.length - 1 ? "bg-emerald-600 text-white" : "bg-blue-600 text-white"
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
          </div>
        </section>

        {/* ── PRODUCTS GRID ── */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="container-site">
            <SectionHeader label="US Market" title="Popular Products for US Buyers" subtitle="Standard US sizes, FDA compliant, Prop 65 compliant. All products ship DDP to any US port." className="mb-10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {US_PRODUCTS.map((p) => (
                <Link key={p.href} href={p.href} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all group relative">
                  {p.tag && (
                    <span className="absolute top-4 right-4 px-2 py-0.5 bg-blue-100 text-blue-700 text-[9px] font-bold rounded-full">
                      {p.tag}
                    </span>
                  )}
                  <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-blue-600 transition-colors pr-16">{p.name}</h3>
                  <p className="text-xs text-slate-500 mb-3">{p.spec}</p>
                  <div className="flex items-center gap-1 text-blue-600 text-xs font-semibold group-hover:gap-2 transition-all">
                    View Details <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── VOLUME PRICING ── */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-slate-900 text-2xl">Volume Pricing for US Buyers</h2>
            </div>
            <p className="text-slate-500 text-sm mb-8 max-w-2xl">
              Factory-direct pricing with volume discounts. LTL pallet pricing and FCL container pricing available.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {US_TIERED_PRICING.map((tier, i) => (
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

        {/* ── US-SPECIFIC SUBPAGES ── */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="container-site">
            <SectionHeader label="US Specialties" title="US-Specific Solutions" className="mb-10" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/us/fda-compliant" className="rounded-xl border border-slate-200 bg-slate-50 hover:border-blue-200 hover:shadow-lg transition-all p-8 group">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="w-6 h-6 text-blue-600" />
                  <h2 className="font-bold text-slate-900 text-2xl group-hover:text-blue-600 transition-colors">FDA Compliant Thermal Paper</h2>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  FDA 21 CFR compliant thermal paper for food contact applications. BPA-free certified, Prop 65 compliant, suitable for food packaging labels, deli labels, and receipts in food service environments. Full compliance documentation for US import clearance.
                </p>
                <div className="flex items-center gap-2 text-blue-600 text-xs font-semibold uppercase tracking-wide group-hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="/us/cannabis-labels" className="rounded-xl border border-slate-200 bg-slate-50 hover:border-blue-200 hover:shadow-lg transition-all p-8 group">
                <div className="flex items-center gap-3 mb-3">
                  <Package className="w-6 h-6 text-blue-600" />
                  <h2 className="font-bold text-slate-900 text-2xl group-hover:text-blue-600 transition-colors">Cannabis Labels USA</h2>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  State-compliant cannabis labels for US dispensaries and cannabis brands. Tamper-evident, custom printed, meeting individual state requirements for CA, CO, WA, OR, MI, IL, NV, AZ, and all legal states.
                </p>
                <div className="flex items-center gap-2 text-blue-600 text-xs font-semibold uppercase tracking-wide group-hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ── COMPLIANCE ── */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-2">
              <FileCheck className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-slate-900 text-2xl">Compliance &amp; Certifications for US Market</h2>
            </div>
            <p className="text-slate-500 text-sm mb-8 max-w-2xl">
              Full compliance documentation package available for your procurement team. All documents issued by accredited third-party laboratories, updated annually.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
              {US_COMPLIANCE.map((item) => (
                <Link key={item.label} href={item.href} className="bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all group text-center">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                  <div className="font-bold text-slate-900 text-xs group-hover:text-blue-600 transition-colors">{item.label}</div>
                  <p className="text-[10px] text-slate-500 mt-1">{item.desc}</p>
                </Link>
              ))}
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="font-bold text-slate-900 text-sm mb-1">Request Full US Compliance Pack</p>
                <p className="text-slate-500 text-xs">
                  ISO 9001 certificate, FDA declaration, BPA-free SGS report, Prop 65 compliance letter, TDS — all in one package. Sent within 24 hours.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors shrink-0 shadow-sm"
              >
                <Download className="w-4 h-4" /> Request Docs
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-slate-900 text-2xl">Frequently Asked Questions — USA</h2>
            </div>
            <p className="text-slate-500 text-sm mb-8 max-w-2xl">
              Common questions from US distributors, importers, and e-commerce sellers.
            </p>
            <div className="space-y-4 max-w-3xl">
              {US_FAQ.map((item, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                  <p className="font-bold text-slate-900 text-sm mb-2">{item.q}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner
          title="Ready to Source for the US Market?"
          subtitle="Get a custom quote with FDA compliance documentation. DDP shipping to any US port. Free samples for qualified US distributors."
        />
      </main>
      <Footer />
    </>
  );
}
