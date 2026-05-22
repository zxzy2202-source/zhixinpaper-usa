import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import SectionHeader from "@/components/ui/SectionHeader";
import SlotImage from "@/components/ui/SlotImage";
import { buildMetadata, organizationSchema, breadcrumbSchema } from "@/lib/seo";
import { COMPANY, THERMAL_PAPER_ROLLS, THERMAL_LABELS, INDUSTRIES, COMPLIANCE_ITEMS, BLOG_POSTS, GEO_REGIONS } from "@/lib/data";
import {
  ArrowRight, CheckCircle2, ShieldCheck, FileCheck, Award, Leaf,
  UtensilsCrossed, Shield, Package, Truck, Clock, Star,
  ShoppingCart, Ticket, Building2, Heart, Snowflake, Wrench, ChevronRight,
  Factory, Zap, Globe, BadgeCheck,
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Thermal Paper Rolls & Labels Manufacturer | BPA-Free Factory Direct Wholesale",
  description:
    "ISO 9001:2015 certified manufacturer of BPA-free, FDA-compliant thermal paper rolls and thermal labels. Factory-direct wholesale for distributors, importers, and e-commerce sellers in USA, Europe & Canada. Pallet pricing, free samples, DDP shipping available.",
  path: "/",
  keywords: [
    "thermal paper rolls manufacturer",
    "thermal labels supplier",
    "BPA free thermal paper wholesale",
    "thermal paper rolls wholesale",
    "receipt paper rolls bulk",
    "80mm thermal paper rolls wholesale",
    "4x6 shipping labels wholesale",
    "thermal paper factory direct",
    "thermal paper USA importer",
    "thermal paper Europe distributor",
    "OEM thermal paper manufacturer",
    "custom thermal labels OEM",
    "container load thermal paper wholesale",
    "pallet pricing thermal paper rolls",
    "ISO 9001 thermal paper manufacturer",
    "FDA compliant thermal paper manufacturer",
    "Prop 65 compliant thermal paper",
    "BPA free receipt paper",
    "REACH compliant thermal paper EU",
    "POS paper rolls bulk",
    "ATM paper rolls supplier",
    "ecommerce shipping labels bulk",
    "Zebra compatible thermal labels",
    "Epson compatible receipt paper",
    "casino TITO paper manufacturer",
    "cannabis compliance labels USA",
    "freezer labels cold chain",
    "DDP thermal paper USA",
    "LTL shipping thermal paper USA",
  ],
});

const COMPLIANCE_ICONS: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  FileCheck: <FileCheck className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
  Leaf: <Leaf className="w-5 h-5" />,
  UtensilsCrossed: <UtensilsCrossed className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
};

const INDUSTRY_ICONS: Record<string, React.ReactNode> = {
  ShoppingCart: <ShoppingCart className="w-5 h-5" />,
  Ticket: <Ticket className="w-5 h-5" />,
  Coins: <Star className="w-5 h-5" />,
  Building2: <Building2 className="w-5 h-5" />,
  Heart: <Heart className="w-5 h-5" />,
  Snowflake: <Snowflake className="w-5 h-5" />,
  Package: <Package className="w-5 h-5" />,
  Bus: <Truck className="w-5 h-5" />,
  Wrench: <Wrench className="w-5 h-5" />,
  Calendar: <Clock className="w-5 h-5" />,
  Scale: <Shield className="w-5 h-5" />,
  Leaf: <Leaf className="w-5 h-5" />,
};

export default function HomePage() {
  const featuredRolls = THERMAL_PAPER_ROLLS.slice(0, 6);
  const featuredLabels = THERMAL_LABELS.slice(0, 6);
  const featuredIndustries = INDUSTRIES.slice(0, 8);
  const featuredPosts = BLOG_POSTS.slice(0, 3);

  const jsonLd = [organizationSchema(), breadcrumbSchema([{ name: "Home", url: "/" }])];

  return (
    <>
      <Header />
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <main className="pt-[88px]">

        {/* ── HERO ── */}
        <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-blue-950">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <SlotImage
              slotKey="home.hero"
              fill
              className="object-cover object-center opacity-75"
              priority
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/65 via-blue-900/35 to-transparent" />
          </div>
          {/* Grid overlay */}
          <div className="absolute inset-0 z-0 opacity-[0.04]" style={{backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "60px 60px"}} />

          <div className="container-site relative z-10 py-24 flex-1 flex items-center">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/15 border border-blue-400/25 rounded-full text-blue-300 text-xs font-semibold tracking-widest uppercase mb-8 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                ISO 9001 Certified Manufacturer · Est. {COMPANY.founded}
              </div>

              {/* Headline */}
              <h1 className="font-extrabold text-white text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6">
                One-Stop{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-blue-200 to-cyan-200">
                  Thermal
                </span>
                <br />
                Consumables
                <br />
                <span className="text-blue-100">Platform</span>
              </h1>

              {/* Subheadline */}
              <p className="text-blue-50/90 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
                Thermal paper rolls &amp; thermal labels for distributors, importers, and local factories in{" "}
                <strong className="text-white font-semibold">Europe, USA &amp; Canada</strong>.
                Custom OEM · BPA-Free · Stable Supply · Full Compliance Documentation.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-12">
                <Link href="/quote" className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-400/40 hover:-translate-y-0.5 text-sm">
                  Get a Custom Quote <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/samples" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 hover:border-white/40 transition-all backdrop-blur-sm text-sm">
                  Request Free Samples
                </Link>
                <Link href="/products" className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent hover:bg-white/5 text-blue-300 font-semibold rounded-xl border border-blue-400/30 hover:border-blue-300/50 transition-all text-sm">
                  Browse Products
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2">
                {COMPANY.certifications.map((cert) => (
                  <span key={cert} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/8 border border-white/15 rounded-lg text-[11px] font-semibold tracking-widest uppercase text-slate-300 backdrop-blur-sm">
                    <BadgeCheck className="w-3 h-3 text-blue-400" />
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="relative z-10 bg-white/5 backdrop-blur-md border-t border-white/10">
            <div className="container-site">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
                {COMPANY.stats.map((stat) => (
                  <div key={stat.label} className="px-6 py-5 text-center">
                    <div className="font-extrabold text-white text-3xl md:text-4xl tracking-tight">{stat.value}</div>
                    <div className="text-[10px] tracking-widest uppercase text-blue-300/70 mt-1 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ── */}
        <section className="bg-slate-50 border-b border-slate-200 py-5">
          <div className="container-site">
            <div className="flex flex-wrap items-center justify-center gap-8 text-slate-500 text-xs font-semibold tracking-wider uppercase">
              {[
                { icon: <Factory className="w-4 h-4" />, text: "Direct Factory Pricing" },
                { icon: <Zap className="w-4 h-4" />, text: "15-Day Lead Time" },
                { icon: <Globe className="w-4 h-4" />, text: "80+ Countries Served" },
                { icon: <BadgeCheck className="w-4 h-4" />, text: "ISO 9001:2015 Certified" },
                { icon: <Shield className="w-4 h-4" />, text: "BPA-Free Available" },
                { icon: <Truck className="w-4 h-4" />, text: "EU / US / CA Compliance" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors">
                  <span className="text-blue-500">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DUAL PRODUCT CATEGORIES ── */}
        <section className="py-24 bg-white">
          <div className="container-site">
            <SectionHeader
              label="01 — Core Products"
              title="Thermal Paper Rolls & Labels"
              subtitle="Two core product lines covering every thermal printing application — from POS receipts to cold-chain labels."
              className="mb-14"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Rolls card */}
              <div className="group rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:border-blue-200 transition-all duration-300">
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <SlotImage slotKey="home.product.thermal-rolls" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-800/55 via-slate-800/10 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg uppercase tracking-wider shadow-sm">Thermal Paper Rolls</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white/80 text-sm leading-snug">POS · ATM · Lottery · Casino TITO · Medical · Transport · Kiosk</p>
                  </div>
                </div>
                <div className="p-7 bg-white">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-bold text-slate-900 text-2xl tracking-tight">Thermal Paper Rolls</h3>
                    <span className="text-xs text-slate-400 font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1">9 Products</span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">From standard POS rolls to specialized casino TITO and medical-grade paper — all available BPA-free with REACH/RoHS compliance documentation.</p>
                  <div className="grid grid-cols-2 gap-2 mb-7">
                    {featuredRolls.map((roll) => (
                      <Link key={roll.slug} href={"/products/thermal-paper-rolls/" + roll.slug} className="flex items-center gap-2 text-xs text-slate-500 hover:text-blue-600 transition-colors group/item font-medium py-1">
                        <ChevronRight className="w-3 h-3 shrink-0 text-blue-400 group-hover/item:translate-x-0.5 transition-transform" />
                        {roll.name}
                      </Link>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Link href="/products/thermal-paper-rolls" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm">
                      All Paper Rolls <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link href="/quote" className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-200 hover:border-blue-300 text-slate-600 hover:text-blue-600 text-sm font-semibold rounded-xl transition-colors">
                      Get Quote
                    </Link>
                  </div>
                </div>
              </div>

              {/* Labels card */}
              <div className="group rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:border-blue-200 transition-all duration-300">
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <SlotImage slotKey="home.product.thermal-labels" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-800/55 via-slate-800/10 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg uppercase tracking-wider shadow-sm">Thermal Labels</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white/80 text-sm leading-snug">Direct · Transfer · Freezer · High-Temp · Wristband · Tamper-Evident · Synthetic</p>
                  </div>
                </div>
                <div className="p-7 bg-white">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-bold text-slate-900 text-2xl tracking-tight">Thermal Labels</h3>
                    <span className="text-xs text-slate-400 font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1">11 Products</span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">From −40°C freezer labels to 150°C high-temperature labels — complete range for logistics, healthcare, food, and industrial applications.</p>
                  <div className="grid grid-cols-2 gap-2 mb-7">
                    {featuredLabels.map((label) => (
                      <Link key={label.slug} href={"/products/thermal-labels/" + label.slug} className="flex items-center gap-2 text-xs text-slate-500 hover:text-blue-600 transition-colors group/item font-medium py-1">
                        <ChevronRight className="w-3 h-3 shrink-0 text-blue-400 group-hover/item:translate-x-0.5 transition-transform" />
                        {label.name}
                      </Link>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Link href="/products/thermal-labels" className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm">
                      All Labels <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link href="/quote" className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-200 hover:border-blue-300 text-slate-600 hover:text-blue-600 text-sm font-semibold rounded-xl transition-colors">
                      Get Quote
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section className="py-24 bg-slate-50">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionHeader
                  label="02 — Why Zhixin Paper"
                  title="Reliable Supply. Proven Compliance."
                  subtitle="Manufacturing precision combined with international compliance expertise for the most demanding markets."
                />
                <div className="mt-10 space-y-4">
                  {[
                    { title: "ISO 9001:2015 Certified Factory", desc: "Documented quality management system with full traceability from raw material to finished goods. Audit reports available on request." },
                    { title: "BPA-Free & REACH/RoHS Compliant", desc: "All products available in BPA-free formulation. REACH SVHC tested and certified for EU market entry. RoHS compliant for electronics applications." },
                    { title: "Custom OEM & Private Label", desc: "Full custom printing, private label, and OEM capabilities. Low MOQ from 10,000 units. Your logo, your brand, our quality." },
                    { title: "Stable Supply & Fast Delivery", desc: "Large inventory buffer, 15-day standard lead time, dedicated freight forwarding for EU/US/CA markets. DDP available." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-white rounded-xl border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all group">
                      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0 font-bold text-white text-sm group-hover:scale-105 transition-transform">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-base mb-1.5">{item.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex gap-3">
                  <Link href="/factory" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm text-sm">
                    Visit Our Factory <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/compliance" className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-600 font-semibold rounded-xl transition-colors text-sm">
                    View Certifications
                  </Link>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <SlotImage slotKey="home.factory-overview" width={640} height={480} className="w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-3">
                  {[{ v: "15+", l: "Years Exp." }, { v: "500M+", l: "Rolls/Year" }, { v: "80+", l: "Countries" }].map((s) => (
                    <div key={s.l} className="bg-white/95 backdrop-blur-sm rounded-xl p-3.5 text-center shadow-lg">
                      <div className="font-extrabold text-blue-600 text-2xl tracking-tight">{s.v}</div>
                      <div className="text-[9px] tracking-widest uppercase text-slate-500 font-semibold mt-0.5">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── INDUSTRIES ── */}
        <section className="py-24 bg-white">
          <div className="container-site">
            <SectionHeader
              label="03 — Industries Served"
              title="Solutions for Every Sector"
              subtitle="Specialized thermal consumables engineered for 13+ industries — from retail POS and e-commerce fulfillment to banking, healthcare, and cannabis."
              className="mb-14"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredIndustries.map((industry) => (
                <Link key={industry.slug} href={"/industries/" + industry.slug}
                  className="p-5 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-200 group"
                >
                  <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-100 group-hover:scale-110 transition-all">
                    {INDUSTRY_ICONS[industry.icon] || <Package className="w-5 h-5" />}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-2 leading-snug">{industry.name}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">{industry.description}</p>
                  <div className="flex items-center gap-1 text-blue-500 text-xs font-semibold mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ChevronRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/industries" className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all text-sm">
                View All 13 Industries <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── COMPLIANCE ── */}
        <section className="py-24 bg-gradient-to-br from-blue-50 via-slate-50 to-white">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <SlotImage slotKey="home.compliance" width={600} height={450} className="w-full object-cover rounded-2xl shadow-2xl" />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl border border-slate-200 p-5 max-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-bold text-slate-900 text-sm">All Markets</span>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">EU · USA · Canada compliance documentation included with every order.</p>
                </div>
              </div>
              <div>
                <SectionHeader
                  label="04 — Compliance"
                  title="Built for Demanding Markets"
                  subtitle="Every product tested and certified for Europe, USA, and Canada. Full documentation provided with every shipment."
                />
                <div className="mt-10 grid grid-cols-2 gap-3">
                  {COMPLIANCE_ITEMS.map((item) => (
                    <Link key={item.slug} href={"/compliance/" + item.slug}
                      className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all group"
                    >
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-100 group-hover:scale-110 transition-all">
                        {COMPLIANCE_ICONS[item.icon]}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{item.description.split(".")[0]}</div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-8 flex gap-3">
                  <Link href="/compliance" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm text-sm">
                    View All Certifications <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/compliance/certificates" className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-600 font-semibold rounded-xl transition-colors text-sm">
                    Download Certificates
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── GEO REGIONS ── */}
        <section className="py-24 bg-white">
          <div className="container-site">
            <SectionHeader
              label="05 — Regional Coverage"
              title="Serving Europe, USA & Canada"
              subtitle="Dedicated supply solutions for each market — local compliance, optimized logistics, and regional expertise."
              className="mb-14"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {GEO_REGIONS.map((region) => (
                <Link key={region.slug} href={"/" + region.slug}
                  className="relative p-8 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-16 translate-x-16 group-hover:bg-blue-100 transition-colors" />
                  <div className="relative">
                    <div className="text-5xl mb-5">{region.flag}</div>
                    <h3 className="font-extrabold text-slate-900 text-2xl mb-3 tracking-tight">{region.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">{region.description}</p>
                    <div className="flex items-center gap-2 text-blue-600 text-sm font-bold group-hover:gap-3 transition-all">
                      Explore {region.name} Solutions <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── OEM / CUSTOM ── */}
        <section className="py-24 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600 text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-5" style={{backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)", backgroundSize: "32px 32px"}} />
          <div className="container-site relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-xs font-semibold tracking-widest uppercase mb-6">
                  06 — OEM & Custom
                </div>
                <h2 className="font-extrabold text-4xl md:text-5xl leading-tight tracking-tight mb-6">
                  Your Brand.<br />
                  <span className="text-sky-200">Our Manufacturing.</span>
                </h2>
                <p className="text-blue-100 text-lg leading-relaxed mb-10">
                  Private label thermal paper rolls and labels with your logo, your colors, and your specifications. Low MOQ, fast sampling, full NDA protection.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-10">
                  {[
                    { title: "Private Label", desc: "Your brand on every roll and label", href: "/oem-custom/private-label" },
                    { title: "Custom Printing", desc: "Logo, QR codes, variable data", href: "/oem-custom/custom-printing" },
                    { title: "Low MOQ", desc: "From 10,000 units per SKU", href: "/oem-custom/moq-guide" },
                    { title: "Free Samples", desc: "Sample process in 5–7 days", href: "/oem-custom/sample-process" },
                  ].map((item) => (
                    <Link key={item.title} href={item.href} className="p-4 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/40 transition-all group">
                      <div className="font-bold text-white text-sm mb-1 group-hover:text-blue-200 transition-colors">{item.title}</div>
                      <div className="text-blue-100/80 text-xs">{item.desc}</div>
                    </Link>
                  ))}
                </div>
                <Link href="/oem-custom" className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30 text-sm">
                  Explore OEM Options <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <SlotImage slotKey="home.factory-overview" width={640} height={480} className="w-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-700/30 to-blue-900/45" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-extrabold text-white/20 tracking-tighter">OEM</div>
                    <div className="text-white font-bold text-xl mt-2">Private Label Ready</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BLOG ── */}
        <section className="py-24 bg-slate-50">
          <div className="container-site">
            <div className="flex items-end justify-between mb-14">
              <SectionHeader label="07 — Knowledge Base" title="Thermal Paper Guides & News" subtitle="Technical guides, compliance updates, and industry insights for distributors." />
              <Link href="/blog" className="hidden md:flex items-center gap-2 text-blue-600 text-sm font-bold hover:gap-3 transition-all shrink-0 ml-8">
                All Articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <Link key={post.slug} href={"/blog/" + post.slug}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-200 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group"
                >
                  <div className="p-7 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full uppercase tracking-wider">{post.category}</span>
                      <span className="text-slate-400 text-xs">{post.readTime} read</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg leading-snug mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-5">{post.excerpt}</p>
                    <div className="flex items-center gap-2 text-blue-600 text-xs font-bold border-t border-slate-100 pt-4">
                      Read Article <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
