import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { THERMAL_PAPER_ROLLS } from "@/lib/data";
import {
  ArrowRight, CheckCircle2, Package, Truck, Award, ChevronRight,
  Star, Shield, Zap, MessageSquare, Download, Layers, Clock,
  Factory, FileCheck, TrendingUp, Users, Phone
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return THERMAL_PAPER_ROLLS.map((roll) => ({ slug: roll.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const roll = THERMAL_PAPER_ROLLS.find((r) => r.slug === slug);
  if (!roll) return {};
  return {
    title: `${roll.name} — ${roll.subtitle} | Wholesale Manufacturer`,
    description: `${roll.name} thermal paper rolls wholesale from ISO 9001 certified manufacturer. ${roll.keywords}. BPA-free, FDA-compliant options. MOQ ${roll.moq}. Factory-direct pricing, pallet and container load available. Free samples via DHL/FedEx.`,
    keywords: `${roll.keywords}, thermal paper rolls wholesale, BPA free thermal paper, FDA compliant, factory direct pricing, ${roll.name} manufacturer`,
  };
}

// ── Printer compatibility data by product slug ──
const PRINTER_COMPAT: Record<string, { brand: string; models: string }[]> = {
  "standard-pos-rolls": [
    { brand: "Epson", models: "TM-T20III / TM-T82III / TM-T88VII" },
    { brand: "Star", models: "TSP100IV / TSP650II / mC-Print3" },
    { brand: "Bixolon", models: "SRP-350V / SRP-380" },
    { brand: "Citizen", models: "CT-S310II / CT-S651" },
  ],
  "atm-banking-rolls": [
    { brand: "Diebold Nixdorf", models: "DN200 / DN800 Series" },
    { brand: "NCR", models: "SelfServ 80 / 6622 / 6687" },
    { brand: "Wincor", models: "ProCash 2050xe / 4060xe" },
    { brand: "Hyosung", models: "MX5600T / MX8800T" },
  ],
  "lottery-gaming-rolls": [
    { brand: "IGT", models: "S2000 / AVP Series" },
    { brand: "Aristocrat", models: "MKVI / Helix" },
    { brand: "Scientific Games", models: "ProStar Series" },
    { brand: "Interlott", models: "Vmax / Omega" },
  ],
};

// ── Tiered pricing data by product slug ──
const TIERED_PRICING: Record<string, { tier: string; qty: string; unit: string; savings: string }[]> = {
  "standard-pos-rolls": [
    { tier: "Sample", qty: "1–9 cartons", unit: "Contact for price", savings: "—" },
    { tier: "Starter", qty: "10–49 cartons", unit: "Best for small distributors", savings: "5% off" },
    { tier: "Volume", qty: "50–199 cartons", unit: "Pallet pricing", savings: "12% off" },
    { tier: "Container", qty: "200+ cartons", unit: "FCL factory-direct", savings: "20% off" },
  ],
  "default": [
    { tier: "Sample", qty: "1 carton", unit: "Contact for price", savings: "—" },
    { tier: "Starter", qty: "5–19 cartons", unit: "Best for small distributors", savings: "5% off" },
    { tier: "Volume", qty: "20–99 cartons", unit: "Pallet pricing", savings: "12% off" },
    { tier: "Container", qty: "100+ cartons", unit: "FCL factory-direct", savings: "20% off" },
  ],
};

// ── Compliance documents by product slug ──
const COMPLIANCE_DOCS: Record<string, { name: string; desc: string; icon: string }[]> = {
  "standard-pos-rolls": [
    { name: "BPA-Free Test Report (SGS)", desc: "EU 2024/3190 compliant — no BPA, BPS, or BPAF", icon: "shield" },
    { name: "REACH SVHC Declaration", desc: "240+ substances tested, Annex XVII compliant", icon: "file" },
    { name: "ISO 9001:2015 Certificate", desc: "TÜV-recognized, annual surveillance audit", icon: "award" },
    { name: "Technical Data Sheet (TDS)", desc: "Full specifications, storage conditions, print parameters", icon: "download" },
  ],
  "atm-banking-rolls": [
    { name: "BPA-Free Certificate (SGS)", desc: "Standard — no surcharge required", icon: "shield" },
    { name: "REACH / RoHS Declaration", desc: "EU banking regulatory compliance", icon: "file" },
    { name: "ISO 9001:2015 Certificate", desc: "Quality management system certification", icon: "award" },
    { name: "Archival Grade Test Report", desc: "7-year image life verified by independent lab", icon: "download" },
  ],
  "default": [
    { name: "BPA-Free Test Report (SGS)", desc: "EU 2024/3190 compliant", icon: "shield" },
    { name: "REACH SVHC Declaration", desc: "EU REACH Annex XVII compliant", icon: "file" },
    { name: "ISO 9001:2015 Certificate", desc: "Certified quality management", icon: "award" },
    { name: "Technical Data Sheet (TDS)", desc: "Full product specifications", icon: "download" },
  ],
};

export default async function RollDetailPage({ params }: Props) {
  const { slug } = await params;
  const roll = THERMAL_PAPER_ROLLS.find((r) => r.slug === slug);
  if (!roll) notFound();

  const related = THERMAL_PAPER_ROLLS.filter((r) => r.slug !== slug).slice(0, 4);
  const heroText = (roll as { heroDesc?: string }).heroDesc || `${roll.name} — manufactured to the highest quality standards. BPA-free options, custom OEM printing, and private label for distributors worldwide.`;
  const descText = (roll as { description?: string }).description || `Premium ${roll.name} for wholesale distributors and importers. ISO 9001:2015 certified. MOQ ${roll.moq}. Custom OEM and private label available.`;

  const printers = PRINTER_COMPAT[slug] || null;
  const pricing = TIERED_PRICING[slug] || TIERED_PRICING["default"];
  const complianceDocs = COMPLIANCE_DOCS[slug] || COMPLIANCE_DOCS["default"];

  return (
    <>
      <Header />
      <main>

        {/* ── HERO: Full-width product image with overlay info ── */}
        <section className="pt-[72px] relative bg-slate-900 overflow-hidden">
          {/* Breadcrumb bar */}
          <div className="relative z-10 bg-slate-900/80 backdrop-blur-sm border-b border-white/10">
            <div className="container-site py-3">
              <nav className="flex items-center gap-1.5 text-xs text-slate-400">
                <Link href="/products" className="hover:text-white transition-colors">Products</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/products/thermal-paper-rolls" className="hover:text-white transition-colors">Thermal Paper Rolls</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-300">{roll.name}</span>
              </nav>
            </div>
          </div>

          {/* Large product image */}
          <div className="relative w-full" style={{ height: "520px" }}>
            <Image
              src="/images/thermal-rolls-product.jpg"
              alt={`${roll.name} - Thermal Paper Rolls`}
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/92 via-slate-900/55 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

            {/* Overlay content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container-site">
                <div className="max-w-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-0.5 bg-blue-400 rounded-full" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-blue-400">Thermal Paper Rolls</span>
                    {roll.tag && (
                      <span className={`px-2 py-0.5 text-[9px] tracking-widest uppercase font-bold rounded-full ${
                        roll.tag === "New"
                          ? "bg-emerald-400/20 text-emerald-300 border border-emerald-400/30"
                          : "bg-blue-400/20 text-blue-300 border border-blue-400/30"
                      }`}>{roll.tag}</span>
                    )}
                  </div>
                  <h1 className="font-bold text-white text-5xl md:text-6xl leading-tight mb-3 drop-shadow-lg">
                    {roll.name}
                  </h1>
                  <p className="text-blue-300 text-xl font-medium mb-5">{roll.subtitle}</p>
                  <p className="text-slate-200 text-base leading-relaxed mb-8 max-w-md font-light">
                    {heroText}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/quote" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/40 text-sm">
                      Request Quote <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link href="/samples" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 hover:border-white/40 transition-all text-sm backdrop-blur-sm">
                      Free Sample
                    </Link>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 hover:border-white/40 transition-all text-sm backdrop-blur-sm"
                    >
                      <Download className="w-4 h-4" /> Compliance Docs
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom stats bar */}
            <div className="absolute bottom-0 left-0 right-0">
              <div className="container-site">
                <div className="grid grid-cols-2 md:flex md:flex-row md:items-center gap-0 bg-white/10 backdrop-blur-md border-t border-white/10 divide-x divide-white/10 rounded-t-xl overflow-hidden w-fit">
                  {[
                    { icon: <Package className="w-4 h-4" />, label: "MOQ", value: roll.moq },
                    { icon: <Clock className="w-4 h-4" />, label: "Lead Time", value: "10–15 Days" },
                    { icon: <Award className="w-4 h-4" />, label: "Certified", value: "ISO 9001" },
                    { icon: <Shield className="w-4 h-4" />, label: "BPA-Free", value: "Available" },
                    { icon: <Factory className="w-4 h-4" />, label: "Capacity", value: "500M+/yr" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 px-5 py-3">
                      <span className="text-blue-400">{item.icon}</span>
                      <div>
                        <div className="text-[9px] tracking-widest uppercase text-slate-400 leading-none mb-0.5">{item.label}</div>
                        <div className="font-bold text-white text-sm leading-none">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST SIGNAL BAR ── */}
        <section className="py-4 bg-slate-800 border-b border-slate-700">
          <div className="container-site">
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
              {[
                { icon: <Factory className="w-3.5 h-3.5 text-blue-400" />, text: "500M+ rolls/year factory capacity" },
                { icon: <FileCheck className="w-3.5 h-3.5 text-emerald-400" />, text: "SGS & TÜV test reports available" },
                { icon: <Truck className="w-3.5 h-3.5 text-blue-400" />, text: "FOB Qingdao · DDP Europe/USA" },
                { icon: <Users className="w-3.5 h-3.5 text-amber-400" />, text: "Trusted by 500+ distributors in 80+ countries" },
                { icon: <Clock className="w-3.5 h-3.5 text-blue-400" />, text: "24-hour quote response" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUCT DESCRIPTION ── */}
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="container-site">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-bold tracking-widest uppercase text-blue-600">Product Overview</span>
              </div>
              <p className="text-slate-700 text-lg leading-relaxed">
                {descText}
              </p>
            </div>
          </div>
        </section>

        {/* ── SPECS + FEATURES ── */}
        <section className="py-16 bg-white">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Left: Key info + features */}
              <div className="lg:col-span-1 space-y-6">

                {/* Quick highlights */}
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                  <h2 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-blue-600" />
                    Key Features
                  </h2>
                  <div className="space-y-3">
                    {roll.features.map((f) => (
                      <div key={f} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-sm leading-snug">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Applications */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                  <h2 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                    Applications
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {roll.applications.map((app) => (
                      <span key={app} className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg uppercase tracking-wide">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Available sizes */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                  <h2 className="font-bold text-slate-900 text-lg mb-4">Available Sizes</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {roll.sizes.map((size) => (
                      <div key={size} className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-center text-sm font-semibold text-slate-700 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-default">
                        {size}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mt-3 text-center">Custom sizes available — contact us</p>
                </div>
              </div>

              {/* Right: Full spec table */}
              <div className="lg:col-span-2">
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="px-8 py-6 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="font-bold text-slate-900 text-2xl">Product Specifications</h2>
                      <p className="text-slate-500 text-sm mt-1">Complete technical specifications for {roll.name}</p>
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:border-blue-300 hover:text-blue-600 transition-colors shadow-sm shrink-0"
                    >
                      <Download className="w-4 h-4" />
                      Download TDS
                    </Link>
                  </div>
                  <div className="p-8">
                    <table className="w-full">
                      <tbody>
                        {(roll as unknown as { specifications?: Record<string, string> }).specifications ? (
                          Object.entries((roll as unknown as { specifications: Record<string, string> }).specifications).map(([key, val], i) => (
                            <tr key={key} className={i % 2 === 0 ? "bg-slate-50/50" : "bg-white"}>
                              <td className="py-3.5 px-4 font-semibold text-slate-500 text-xs uppercase tracking-wide w-2/5 rounded-l-lg">{key}</td>
                              <td className="py-3.5 px-4 text-slate-800 text-sm font-medium rounded-r-lg">{val}</td>
                            </tr>
                          ))
                        ) : (
                          [
                            ["Coating Type", "Thermal sensitive coating"],
                            ["BPA-Free Option", "Available on request"],
                            ["Core Size", "12mm / 17mm / 25mm"],
                            ["Minimum Order Qty", roll.moq],
                            ["Standard Lead Time", "10–15 business days"],
                            ["Quality Certification", "ISO 9001:2015"],
                            ["Compliance", "REACH / RoHS / BPA-Free"],
                          ].map(([key, val], i) => (
                            <tr key={key} className={i % 2 === 0 ? "bg-slate-50/50" : "bg-white"}>
                              <td className="py-3.5 px-4 font-semibold text-slate-500 text-xs uppercase tracking-wide w-2/5 rounded-l-lg">{key}</td>
                              <td className="py-3.5 px-4 text-slate-800 text-sm font-medium rounded-r-lg">{val}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* CTA inside spec panel */}
                  <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="font-bold text-white text-base">Need a custom specification?</p>
                      <p className="text-blue-200 text-sm">Our team can tailor any product to your exact requirements.</p>
                    </div>
                    <div className="flex gap-3 shrink-0 flex-wrap">
                      <Link href="/samples" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm shadow-sm">
                        Free Sample
                      </Link>
                      <Link href="/quote" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400 transition-colors text-sm shadow-sm border border-blue-400">
                        Get Quote <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PRINTER COMPATIBILITY (conditional) ── */}
        {printers && (
          <section className="py-14 bg-slate-50 border-t border-slate-200">
            <div className="container-site">
              <div className="flex items-center gap-3 mb-2">
                <Layers className="w-5 h-5 text-blue-600" />
                <h2 className="font-bold text-slate-900 text-2xl">Printer Compatibility</h2>
              </div>
              <p className="text-slate-500 text-sm mb-8 max-w-2xl">
                Pre-tested and validated on the following printer platforms. Guaranteed scan-through-rate and zero jamming under standard operating conditions.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {printers.map((p) => (
                  <div key={p.brand} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="font-bold text-slate-900 text-sm mb-1">{p.brand}</p>
                    <p className="text-slate-500 text-xs leading-relaxed">{p.models}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-4">
                Not seeing your printer model? <Link href="/contact" className="text-blue-600 hover:underline">Contact us</Link> — we test compatibility on request.
              </p>
            </div>
          </section>
        )}

        {/* ── TIERED PRICING ── */}
        <section className="py-14 bg-white border-t border-slate-100">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-slate-900 text-2xl">Volume Pricing</h2>
            </div>
            <p className="text-slate-500 text-sm mb-8 max-w-2xl">
              Factory-direct pricing with volume discounts. The more you order, the more you save — from trial cartons to full container loads.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {pricing.map((tier, i) => (
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

        {/* ── COMPLIANCE DOCUMENTS ── */}
        <section className="py-14 bg-slate-50 border-t border-slate-200">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-2">
              <FileCheck className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-slate-900 text-2xl">Compliance Documents</h2>
            </div>
            <p className="text-slate-500 text-sm mb-8 max-w-2xl">
              Full compliance documentation package available for your procurement team. All documents are issued by accredited third-party laboratories and updated annually.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {complianceDocs.map((doc) => (
                <div key={doc.name} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all group">
                  <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                    <Download className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="font-bold text-slate-900 text-sm mb-1 leading-snug">{doc.name}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{doc.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="font-bold text-slate-900 text-sm mb-1">Request Full Compliance Pack</p>
                <p className="text-slate-500 text-xs">
                  Submit your company details and we will send the complete compliance documentation package within 24 hours — ready for your procurement audit.
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

        {/* ── OEM / PRIVATE LABEL CALLOUT ── */}
        <section className="py-14 bg-white border-t border-slate-100">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-0.5 bg-emerald-500 rounded-full" />
                  <span className="text-xs font-bold tracking-widest uppercase text-emerald-600">OEM & Private Label</span>
                </div>
                <h2 className="font-bold text-slate-900 text-3xl mb-4">
                  Your Brand, Our Manufacturing
                </h2>
                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  Build your own thermal paper brand with our end-to-end OEM service. Custom logo printing on the roll wrapper, branded outer cartons, Pantone color matching, and NDA protection — all included. MOQ from 5,000 rolls.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    "Front-print & back-print with your logo, QR codes, or promotional content",
                    "Pantone color matching — exact brand color reproduction guaranteed",
                    "Custom core sizes, roll dimensions, and packaging to your spec",
                    "NDA signed before any design work begins — your IP is protected",
                    "7-day sample turnaround — see your branded roll before committing",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/oem-custom/private-label" className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-colors shadow-sm">
                    Explore OEM Options <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/samples" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:border-emerald-400 hover:text-emerald-600 transition-all text-sm">
                    Request Branded Sample
                  </Link>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8 border border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg mb-5">OEM Service at a Glance</h3>
                <div className="space-y-4">
                  {[
                    { label: "Minimum Order", value: "5,000 rolls" },
                    { label: "Sample Turnaround", value: "7 business days" },
                    { label: "Color Matching", value: "Pantone / CMYK" },
                    { label: "Print Options", value: "Front + Back print" },
                    { label: "NDA", value: "Signed before design" },
                    { label: "Packaging", value: "Custom carton & label" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-200 last:border-0">
                      <span className="text-slate-500 text-sm">{item.label}</span>
                      <span className="font-bold text-slate-900 text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST + CONVERSION STRIP ── */}
        <section className="py-10 bg-slate-50 border-t border-slate-200">
          <div className="container-site">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Free Sample Card */}
              <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm mb-1">Request Free Samples</p>
                  <p className="text-slate-500 text-xs mb-3">Test quality before you order. Shipped via DHL/FedEx within 3 business days.</p>
                  <Link href="/samples" className="text-blue-600 hover:text-blue-700 font-semibold text-xs flex items-center gap-1">
                    Request Now <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
              {/* Custom Print Card */}
              <div className="flex items-start gap-4 p-6 bg-green-50 rounded-2xl border border-green-100">
                <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm mb-1">Custom Logo &amp; Back Print</p>
                  <p className="text-slate-500 text-xs mb-3">Print your logo, coupons, QR codes or ads on every roll. MOQ 5,000 rolls.</p>
                  <Link href="/oem-custom/private-label" className="text-green-600 hover:text-green-700 font-semibold text-xs flex items-center gap-1">
                    Learn More <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
              {/* WhatsApp Direct Card */}
              <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm mb-1">Talk to a Specialist</p>
                  <p className="text-slate-500 text-xs mb-3">WhatsApp or email our team directly. Response within 2 hours during business hours.</p>
                  <a
                    href="https://wa.me/8618792771927"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 hover:text-slate-900 font-semibold text-xs flex items-center gap-1"
                  >
                    WhatsApp Now <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED PRODUCTS ── */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="container-site">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-bold text-slate-900 text-3xl">Related Products</h2>
              <Link href="/products/thermal-paper-rolls" className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
                All Rolls <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/products/thermal-paper-rolls/${r.slug}`}
                  className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-blue-600 transition-colors leading-snug">{r.name}</h3>
                  <p className="text-slate-400 text-xs">{r.subtitle}</p>
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
