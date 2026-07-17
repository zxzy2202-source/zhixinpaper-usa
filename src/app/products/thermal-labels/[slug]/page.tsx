import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { THERMAL_LABELS } from "@/lib/data";
import { canonicalUrl } from "@/lib/seo";
import {
  ArrowRight, CheckCircle2, Package, Truck, Award, ChevronRight,
  Star, Shield, Zap, Tag, MessageSquare, Download, Layers, Clock,
  Factory, FileCheck, TrendingUp, Users, Phone, ShoppingCart
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return THERMAL_LABELS.map((label) => ({ slug: label.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const label = THERMAL_LABELS.find((l) => l.slug === slug);
  if (!label) return {};
  return {
    title: `${label.name} — ${label.subtitle} | Wholesale Manufacturer`,
    description: `${label.name} thermal labels wholesale from ISO 9001 certified manufacturer. ${label.keywords}. BPA-free, FDA-compliant options. MOQ ${label.moq}. Factory-direct pricing, compatible with Zebra, Honeywell, SATO printers. Free samples available.`,
    keywords: `${label.keywords}, thermal labels wholesale, BPA free labels, FDA compliant labels, factory direct pricing, ${label.name} manufacturer`,
    alternates: { canonical: canonicalUrl(`/products/thermal-labels/${slug}`) },
  };
}

// ── Printer compatibility by label slug ──
const PRINTER_COMPAT: Record<string, { brand: string; models: string; badge?: string }[]> = {
  "direct-thermal-labels": [
    { brand: "Zebra", models: "GX430t / ZD420 / ZD621 / ZD888", badge: "Amazon FBA Validated" },
    { brand: "Honeywell", models: "PC42t / PC45 / PD45S" },
    { brand: "SATO", models: "CL4NX Plus / CG408TT" },
    { brand: "Dymo", models: "LabelWriter 4XL / 5XL" },
    { brand: "Rollo", models: "X1040 / Wireless" },
    { brand: "Brother", models: "QL-1110NWB / TD-4550DNWB" },
  ],
  "fanfold-labels": [
    { brand: "Zebra", models: "ZT411 / ZT421 / ZT610 (Industrial)", badge: "High-Speed Validated" },
    { brand: "Honeywell", models: "PX940 / PX4ie / PX6ie" },
    { brand: "SATO", models: "CL6NX Plus / CL4NX Plus" },
    { brand: "Datamax", models: "H-6308 / H-8308" },
  ],
  "default": [
    { brand: "Zebra", models: "ZD420 / ZD621 / ZT411" },
    { brand: "Honeywell", models: "PC42t / PD45S" },
    { brand: "SATO", models: "CL4NX Plus" },
    { brand: "Datamax", models: "E-4204B" },
  ],
};

// ── Platform compatibility (for ecommerce labels) ──
const PLATFORM_COMPAT: Record<string, { name: string; note: string }[]> = {
  "direct-thermal-labels": [
    { name: "Amazon FBA", note: "4×6\" validated, 24-month image life, GS1-128 compliant" },
    { name: "Shopify", note: "Compatible with Shopify Shipping label format" },
    { name: "WooCommerce", note: "Works with WooCommerce PDF label plugins" },
    { name: "DHL", note: "DHL Express & Parcel label format compatible" },
    { name: "UPS", note: "UPS WorldShip label format compatible" },
    { name: "FedEx", note: "FedEx Ship Manager label format compatible" },
    { name: "USPS", note: "USPS Click-N-Ship label format compatible" },
    { name: "Amazon Logistics", note: "Amazon Last Mile delivery label compatible" },
  ],
};

// ── Tiered pricing by label slug ──
const TIERED_PRICING: Record<string, { tier: string; qty: string; unit: string; savings: string }[]> = {
  "direct-thermal-labels": [
    { tier: "Trial", qty: "50,000 labels", unit: "Best for testing", savings: "—" },
    { tier: "Starter", qty: "100K–499K", unit: "Small seller / distributor", savings: "8% off" },
    { tier: "Volume", qty: "500K–1.9M", unit: "Pallet pricing", savings: "15% off" },
    { tier: "Container", qty: "2M+ labels", unit: "FCL factory-direct", savings: "22% off" },
  ],
  "fanfold-labels": [
    { tier: "Trial", qty: "50,000 labels", unit: "Best for testing", savings: "—" },
    { tier: "Starter", qty: "100K–499K", unit: "Fulfillment center", savings: "8% off" },
    { tier: "Volume", qty: "500K–1.9M", unit: "3PL / warehouse", savings: "15% off" },
    { tier: "Container", qty: "2M+ labels", unit: "FCL factory-direct", savings: "22% off" },
  ],
  "default": [
    { tier: "Sample", qty: "1 carton", unit: "Contact for price", savings: "—" },
    { tier: "Starter", qty: "25K–99K", unit: "Small distributor", savings: "5% off" },
    { tier: "Volume", qty: "100K–499K", unit: "Pallet pricing", savings: "12% off" },
    { tier: "Container", qty: "500K+ labels", unit: "FCL factory-direct", savings: "20% off" },
  ],
};

// ── Compliance docs by label slug ──
const COMPLIANCE_DOCS: Record<string, { name: string; desc: string }[]> = {
  "direct-thermal-labels": [
    { name: "BPA-Free Test Report (SGS)", desc: "EU 2024/3190 & Prop 65 compliant" },
    { name: "REACH SVHC Declaration", desc: "240+ substances tested" },
    { name: "Amazon FBA Compliance Letter", desc: "24-month image life verified" },
    { name: "Technical Data Sheet (TDS)", desc: "Full adhesive, facestock & barcode specs" },
  ],
  "freezer-cold-chain-labels": [
    { name: "EU Food Contact Declaration", desc: "Regulation (EC) No 1935/2004 compliant" },
    { name: "FDA Pharma Cold Chain Cert", desc: "21 CFR compliant for pharmaceutical use" },
    { name: "Freeze-Thaw Test Report", desc: "Adhesion verified through 50 cycles" },
    { name: "Technical Data Sheet (TDS)", desc: "Temperature range, adhesive & facestock specs" },
  ],
  "default": [
    { name: "BPA-Free Test Report (SGS)", desc: "EU 2024/3190 compliant" },
    { name: "REACH SVHC Declaration", desc: "EU REACH Annex XVII compliant" },
    { name: "ISO 9001:2015 Certificate", desc: "Certified quality management" },
    { name: "Technical Data Sheet (TDS)", desc: "Full product specifications" },
  ],
};

export default async function LabelDetailPage({ params }: Props) {
  const { slug } = await params;
  const label = THERMAL_LABELS.find((l) => l.slug === slug);
  if (!label) notFound();

  const related = THERMAL_LABELS.filter((l) => l.slug !== slug).slice(0, 4);
  const heroText = (label as { heroDesc?: string }).heroDesc || `${label.name} — custom OEM printing, private label capabilities, and specialized adhesive options for distributors and importers worldwide.`;
  const descText = (label as { description?: string }).description || `Premium ${label.name} for wholesale distributors and importers. ISO 9001:2015 certified. MOQ ${label.moq}. Custom OEM and private label available.`;

  const printers = PRINTER_COMPAT[slug] || PRINTER_COMPAT["default"];
  const platforms = PLATFORM_COMPAT[slug] || null;
  const pricing = TIERED_PRICING[slug] || TIERED_PRICING["default"];
  const complianceDocs = COMPLIANCE_DOCS[slug] || COMPLIANCE_DOCS["default"];
  const isEcommerceLabel = ["direct-thermal-labels", "fanfold-labels"].includes(slug);

  return (
    <>
      <Header />
      <main id="main-content" className="product-detail">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden bg-[#101b19] pt-[72px]">
          <div className="relative z-10 border-b border-white/10 bg-[#101b19]/85 backdrop-blur-sm">
            <div className="container-site py-3">
              <nav className="flex items-center gap-1.5 text-xs text-slate-400">
                <Link href="/products" className="hover:text-white transition-colors">Products</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/products/thermal-labels" className="hover:text-white transition-colors">Thermal Labels</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-300">{label.name}</span>
              </nav>
            </div>
          </div>

          <div className="relative min-h-[560px] w-full">
            <Image
              src="/images/thermal-labels-product.jpg"
              alt={`${label.name} - Thermal Labels`}
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,20,18,0.97)_0%,rgba(8,20,18,0.82)_54%,rgba(8,20,18,0.24)_100%)]" />

            <div className="absolute inset-0 flex items-center">
              <div className="container-site">
                <div className="max-w-xl py-14">
                  <h1 className="font-bold text-white text-5xl md:text-6xl leading-tight mb-3 drop-shadow-lg">
                    {label.name}
                  </h1>
                  <p className="mb-5 text-xl font-medium text-[#d6b273]">{label.subtitle}</p>
                  <p className="text-slate-200 text-base leading-relaxed mb-8 max-w-md font-light">
                    {heroText}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/quote" className="inline-flex items-center gap-2 bg-[#b9822f] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#101b19]/30 transition-all hover:bg-[#9f6e25]">
                      Request a Quote <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link href="/samples" className="inline-flex items-center gap-2 border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/20">
                      Request Samples
                    </Link>
                    <a href="/contact" className="inline-flex items-center gap-2 border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/20">
                      <Download className="w-4 h-4" /> Compliance Docs
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── PRODUCT DESCRIPTION ── */}
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="container-site">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-bold tracking-widest uppercase text-emerald-600">Product Overview</span>
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

              <div className="lg:col-span-1 space-y-6">
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
                  <h2 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-emerald-600" />
                    Key Features
                  </h2>
                  <div className="space-y-3">
                    {label.features.map((f) => (
                      <div key={f} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-sm leading-snug">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                  <h2 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#0f5f5c]" />
                    Applications
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {label.applications.map((app) => (
                      <span key={app} className="px-3 py-1.5 bg-[#b9822f] text-white text-xs font-bold rounded-lg uppercase tracking-wide">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                  <h2 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-[#0f5f5c]" />
                    Available Sizes
                  </h2>
                  <div className="grid grid-cols-2 gap-2">
                    {label.sizes.map((size) => (
                      <div key={size} className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-center text-sm font-semibold text-slate-700 hover:border-[#0f5f5c]/40 hover:bg-[#f4f0e8] transition-all cursor-default">
                        {size}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mt-3 text-center">Custom sizes available — contact us</p>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="px-8 py-6 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="font-bold text-slate-900 text-2xl">Product Specifications</h2>
                      <p className="text-slate-500 text-sm mt-1">Complete technical specifications for {label.name}</p>
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:border-[#0f5f5c]/40 hover:text-[#0f5f5c] transition-colors shadow-sm shrink-0"
                    >
                      <Download className="w-4 h-4" />
                      Download TDS
                    </Link>
                  </div>
                  <div className="p-8">
                    <table className="w-full">
                      <tbody>
                        {(label as unknown as { specifications?: Record<string, string> }).specifications ? (
                          Object.entries((label as unknown as { specifications: Record<string, string> }).specifications).map(([key, val], i) => (
                            <tr key={key} className={i % 2 === 0 ? "bg-slate-50/50" : "bg-white"}>
                              <td className="py-3.5 px-4 font-semibold text-slate-500 text-xs uppercase tracking-wide w-2/5 rounded-l-lg">{key}</td>
                              <td className="py-3.5 px-4 text-slate-800 text-sm font-medium rounded-r-lg">{val}</td>
                            </tr>
                          ))
                        ) : (
                          [
                            ["Facestock", "Thermal-sensitive paper / Synthetic"],
                            ["Adhesive Type", "Permanent / Removable / Freezer"],
                            ["Liner Material", "Glassine / PE / PET"],
                            ["Label Format", "Roll / Fanfold / Sheet"],
                            ["Minimum Order Qty", label.moq],
                            ["Standard Lead Time", "10–15 business days"],
                            ["Quality Certification", "ISO 9001:2015"],
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

                  <div className="px-8 py-6 bg-gradient-to-r from-[#0f5f5c] to-[#101b19] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="font-bold text-white text-base">Need a custom label solution?</p>
                      <p className="text-[#d6b273] text-sm">Custom sizes, adhesives, and print options available with low MOQ.</p>
                    </div>
                    <div className="flex gap-3 shrink-0 flex-wrap">
                      <Link href="/samples" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0f5f5c] font-bold rounded-xl hover:bg-[#f4f0e8] transition-colors text-sm shadow-sm">
                        Request Samples
                      </Link>
                      <Link href="/quote" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#b9822f] text-white font-bold rounded-xl hover:bg-[#9f6e25] transition-colors text-sm shadow-sm border border-[#b9822f]">
                        Request a Quote <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PRINTER COMPATIBILITY ── */}
        <section className="py-14 bg-slate-50 border-t border-slate-200">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-2">
              <Layers className="w-5 h-5 text-emerald-600" />
              <h2 className="font-bold text-slate-900 text-2xl">Printer Compatibility</h2>
            </div>
            <p className="text-slate-500 text-sm mb-8 max-w-2xl">
              Pre-tested and validated on all major thermal label printer platforms. Guaranteed scan-through-rate and zero jamming under standard operating conditions.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
              {printers.map((p) => (
                <div key={p.brand} className="bg-white border border-slate-200 rounded-xl p-4 hover:border-emerald-300 hover:shadow-sm transition-all text-center">
                  <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="font-bold text-slate-900 text-xs mb-1">{p.brand}</p>
                  <p className="text-slate-400 text-[10px] leading-relaxed">{p.models}</p>
                  {p.badge && (
                    <span className="inline-block mt-2 px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[9px] font-bold rounded-full">
                      {p.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400">
              Not seeing your printer? <Link href="/contact" className="text-[#0f5f5c] hover:underline">Contact us</Link> — we test compatibility on request.
            </p>
          </div>
        </section>

        {/* ── E-COMMERCE PLATFORM COMPATIBILITY (conditional) ── */}
        {platforms && (
          <section className="py-14 bg-white border-t border-slate-100">
            <div className="container-site">
              <div className="flex items-center gap-3 mb-2">
                <ShoppingCart className="w-5 h-5 text-amber-500" />
                <h2 className="font-bold text-slate-900 text-2xl">E-Commerce Platform Compatibility</h2>
              </div>
              <p className="text-slate-500 text-sm mb-8 max-w-2xl">
                Pre-validated for all major e-commerce platforms and carriers. Drop-in replacement — no printer reconfiguration required.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {platforms.map((p) => (
                  <div key={p.name} className="bg-amber-50 border border-amber-100 rounded-xl p-4 hover:border-amber-300 hover:shadow-sm transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <p className="font-bold text-slate-900 text-sm">{p.name}</p>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed">{p.note}</p>
                  </div>
                ))}
              </div>
              {isEcommerceLabel && (
                <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 text-sm mb-1">Amazon FBA Seller?</p>
                    <p className="text-slate-500 text-xs">
                      Our 4×6" direct thermal labels are pre-validated for Amazon fulfillment centers. 24-month image life meets FBA retention requirements. GS1-128 barcode standard supported.
                    </p>
                  </div>
                  <Link
                    href="/industries/ecommerce"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm transition-colors shrink-0 shadow-sm"
                  >
                    FBA Label Guide <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── TIERED PRICING ── */}
        <section className="py-14 bg-slate-50 border-t border-slate-200">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-[#0f5f5c]" />
              <h2 className="font-bold text-slate-900 text-2xl">Volume Pricing</h2>
            </div>
            <p className="text-slate-500 text-sm mb-8 max-w-2xl">
              Factory-direct pricing with volume discounts. The more you order, the more you save — from trial rolls to full container loads.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {pricing.map((tier, i) => (
                <div
                  key={tier.tier}
                  className={`rounded-2xl p-6 border-2 transition-all ${
                    i === 2
                      ? "border-emerald-500 bg-emerald-50 shadow-md shadow-emerald-100"
                      : "border-slate-200 bg-white hover:border-emerald-200"
                  }`}
                >
                  {i === 2 && (
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-600 text-white text-[9px] font-bold tracking-widest uppercase rounded-full mb-3">
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
              <Link href="/quote" className="inline-flex items-center gap-2 px-6 py-3 bg-[#b9822f] hover:bg-[#9f6e25] text-white font-bold rounded-xl text-sm transition-colors shadow-sm">
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-slate-400 text-xs">Response within 24 hours · No commitment required</p>
            </div>
          </div>
        </section>

        {/* ── COMPLIANCE DOCUMENTS ── */}
        <section className="py-14 bg-white border-t border-slate-100">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-2">
              <FileCheck className="w-5 h-5 text-[#0f5f5c]" />
              <h2 className="font-bold text-slate-900 text-2xl">Compliance Documents</h2>
            </div>
            <p className="text-slate-500 text-sm mb-8 max-w-2xl">
              Full compliance documentation package available for your procurement team. All documents issued by accredited third-party laboratories, updated annually.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {complianceDocs.map((doc) => (
                <div key={doc.name} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#0f5f5c]/40 hover:shadow-sm transition-all group">
                  <div className="w-9 h-9 bg-[#f4f0e8] rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#e7eee9] transition-colors">
                    <Download className="w-4 h-4 text-[#0f5f5c]" />
                  </div>
                  <p className="font-bold text-slate-900 text-sm mb-1 leading-snug">{doc.name}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{doc.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#f4f0e8] border border-[#0f5f5c]/25 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="font-bold text-slate-900 text-sm mb-1">Request Full Compliance Pack</p>
                <p className="text-slate-500 text-xs">
                  Submit your company details and we will send the complete compliance documentation package within 24 hours — ready for your procurement audit.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#b9822f] hover:bg-[#9f6e25] text-white font-bold rounded-xl text-sm transition-colors shrink-0 shadow-sm"
              >
                <Download className="w-4 h-4" /> Request Docs
              </Link>
            </div>
          </div>
        </section>

        {/* ── TRUST + CONVERSION STRIP ── */}
        <section className="py-10 bg-slate-50 border-t border-slate-200">
          <div className="container-site">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-4 p-6 bg-[#f4f0e8] rounded-2xl border border-[#ded6c8]">
                <div className="w-10 h-10 bg-[#b9822f] rounded-xl flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm mb-1">Request Samples</p>
                  <p className="text-slate-500 text-xs mb-3">Test print quality and adhesion before bulk order. Shipped within 3 days.</p>
                  <Link href="/samples" className="text-[#0f5f5c] hover:text-[#0f5f5c] font-semibold text-xs flex items-center gap-1">
                    Request Now <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-amber-50 rounded-2xl border border-amber-100">
                <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shrink-0">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm mb-1">Amazon FBA Compliant</p>
                  <p className="text-slate-500 text-xs mb-3">4×6" labels pre-validated for Amazon FBA. GS1-128 barcode standard, Zebra compatible.</p>
                  <Link href="/industries/ecommerce" className="text-amber-600 hover:text-amber-700 font-semibold text-xs flex items-center gap-1">
                    FBA Guide <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm mb-1">Talk to a Specialist</p>
                  <p className="text-slate-500 text-xs mb-3">WhatsApp or email our team. Response within 2 hours during business hours.</p>
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

        {/* ── RELATED LABELS ── */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="container-site">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-bold text-slate-900 text-3xl">Related Labels</h2>
              <Link href="/products/thermal-labels" className="text-[#0f5f5c] hover:text-[#0f5f5c] font-semibold text-sm flex items-center gap-1">
                All Labels <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((l) => (
                <Link
                  key={l.slug}
                  href={`/products/thermal-labels/${l.slug}`}
                  className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-[#0f5f5c]/40 hover:shadow-lg transition-all"
                >
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                    <Tag className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-[#0f5f5c] transition-colors leading-snug">{l.name}</h3>
                  <p className="text-slate-400 text-xs">{l.subtitle}</p>
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
