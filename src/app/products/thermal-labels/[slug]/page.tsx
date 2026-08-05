import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import HeroBanner from "@/components/ui/HeroBanner";
import { SlotImage } from "@/components/ui/SlotImage";
import { THERMAL_LABELS } from "@/lib/data";
import { breadcrumbSchema, canonicalUrl, productSchema } from "@/lib/seo";
import {
  ArrowRight, CheckCircle2, Package, Truck, Award,
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
    title: `${label.name} Wholesale`,
    description: `Wholesale ${label.name.toLowerCase()} for distributors and OEM buyers. Custom sizes, printer-fit checks, export packing, compliance files, and samples.`,
    alternates: {
      canonical: canonicalUrl(`/products/thermal-labels/${slug}`),
      languages: {
        en: canonicalUrl(`/products/thermal-labels/${slug}`),
        "x-default": canonicalUrl(`/products/thermal-labels/${slug}`),
      },
    },
  };
}

// ── Printer compatibility by label slug ──
const PRINTER_COMPAT: Record<string, { brand: string; models: string; badge?: string }[]> = {
  "direct-thermal-labels": [
    { brand: "Zebra", models: "GX430t / ZD420 / ZD621 / ZD888", badge: "Model fit check" },
    { brand: "Honeywell", models: "PC42t / PC45 / PD45S" },
    { brand: "SATO", models: "CL4NX Plus / CG408TT" },
    { brand: "Dymo", models: "LabelWriter 4XL / 5XL" },
    { brand: "Rollo", models: "X1040 / Wireless" },
    { brand: "Brother", models: "QL-1110NWB / TD-4550DNWB" },
  ],
  "fanfold-labels": [
    { brand: "Zebra", models: "ZT411 / ZT421 / ZT610 (Industrial)", badge: "Model fit check" },
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
    { name: "Amazon FBA", note: "Produce from the current approved 4×6 template and barcode data" },
    { name: "Shopify", note: "Match the exported shipping-label dimensions and printer settings" },
    { name: "WooCommerce", note: "Match the generated PDF layout, size, and printer settings" },
    { name: "DHL", note: "Produce from the buyer's current DHL label template" },
    { name: "UPS", note: "Produce from the buyer's current UPS label template" },
    { name: "FedEx", note: "Produce from the buyer's current FedEx label template" },
    { name: "USPS", note: "Produce from the buyer's current USPS label template" },
    { name: "Amazon Logistics", note: "Produce from the buyer's current last-mile template" },
  ],
};

// ── Tiered pricing by label slug ──
const TIERED_PRICING: Record<string, { tier: string; qty: string; unit: string; savings: string }[]> = {
  "direct-thermal-labels": [
    { tier: "Trial", qty: "50,000 labels", unit: "Best for testing", savings: "—" },
    { tier: "Starter", qty: "100K–499K", unit: "Quoted by specification", savings: "Request quote" },
    { tier: "Volume", qty: "500K–1.9M", unit: "Pallet plan reviewed", savings: "Request quote" },
    { tier: "Container", qty: "2M+ labels", unit: "FCL plan reviewed", savings: "Request quote" },
  ],
  "fanfold-labels": [
    { tier: "Trial", qty: "50,000 labels", unit: "Best for testing", savings: "—" },
    { tier: "Starter", qty: "100K–499K", unit: "Quoted by specification", savings: "Request quote" },
    { tier: "Volume", qty: "500K–1.9M", unit: "Pallet plan reviewed", savings: "Request quote" },
    { tier: "Container", qty: "2M+ labels", unit: "FCL plan reviewed", savings: "Request quote" },
  ],
  "default": [
    { tier: "Sample", qty: "1 carton", unit: "Contact for price", savings: "—" },
    { tier: "Starter", qty: "25K–99K", unit: "Quoted by specification", savings: "Request quote" },
    { tier: "Volume", qty: "100K–499K", unit: "Pallet plan reviewed", savings: "Request quote" },
    { tier: "Container", qty: "500K+ labels", unit: "FCL plan reviewed", savings: "Request quote" },
  ],
};

// ── Compliance docs by label slug ──
const COMPLIANCE_DOCS: Record<string, { name: string; desc: string }[]> = {
  "direct-thermal-labels": [
    { name: "Phenol Test Report", desc: "Availability and scope confirmed for the quoted label grade" },
    { name: "REACH Declaration", desc: "Current declaration confirmed for the selected material" },
    { name: "Image Stability Report", desc: "Test conditions matched to the selected material and retention target" },
    { name: "Technical Data Sheet (TDS)", desc: "Full adhesive, facestock & barcode specs" },
  ],
  "freezer-cold-chain-labels": [
    { name: "Food-Contact Document", desc: "Availability and scope confirmed for the selected material and use" },
    { name: "Material Declaration", desc: "Current document confirmed for the destination and application" },
    { name: "Freeze-Thaw Test Report", desc: "Test profile matched to the surface, adhesive, and project cycle" },
    { name: "Technical Data Sheet (TDS)", desc: "Temperature range, adhesive & facestock specs" },
  ],
  "default": [
    { name: "Phenol Test Report", desc: "Availability and scope confirmed for the quoted grade" },
    { name: "REACH Declaration", desc: "Current declaration confirmed for the selected material" },
    { name: "Quality Management Certificate", desc: "Holder, issuer, validity, and certified scope reviewed on request" },
    { name: "Technical Data Sheet (TDS)", desc: "Available fields and revision confirmed for the quoted construction" },
  ],
};

export default async function LabelDetailPage({ params }: Props) {
  const { slug } = await params;
  const label = THERMAL_LABELS.find((l) => l.slug === slug);
  if (!label) notFound();

  const related = THERMAL_LABELS.filter((l) => l.slug !== slug).slice(0, 4);
  const heroText = (label as { heroDesc?: string }).heroDesc || `${label.name} for distributor and OEM projects. Facestock, adhesive, liner, printer compatibility, documents, printing, packing, and private-label scope are confirmed for the quotation.`;
  const descText = (label as { description?: string }).description || `${label.name} for wholesale distributors and importers. Material documents, order quantity, OEM printing, and private-label options are confirmed for the quoted construction and project.`;

  const printers = PRINTER_COMPAT[slug] || PRINTER_COMPAT["default"];
  const platforms = PLATFORM_COMPAT[slug] || null;
  const pricing = TIERED_PRICING[slug] || TIERED_PRICING["default"];
  const complianceDocs = COMPLIANCE_DOCS[slug] || COMPLIANCE_DOCS["default"];
  const isEcommerceLabel = ["direct-thermal-labels", "fanfold-labels"].includes(slug);
  const schemas = [
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Products", url: "/products" },
      { name: "Thermal Labels", url: "/products/thermal-labels" },
      { name: label.name, url: `/products/thermal-labels/${slug}` },
    ]),
    productSchema({
      name: label.name,
      description: descText,
      image: "/images/thermal-labels-product.jpg",
      url: `/products/thermal-labels/${slug}`,
      sku: `thermal-label-${slug}`,
      category: "Thermal Labels",
      keywords: label.keywords,
      additionalProperties: [
        { name: "BPA-Free", value: "Available by quoted material grade" },
        { name: "Quality management documents", value: "Current site and certificate scope confirmed on request" },
      ],
    }),
  ];

  return (
    <>
      <Header />
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
      <main id="main-content" className="product-detail">

        <HeroBanner
          variant="media"
          eyebrow="Thermal label supply"
          title={label.name}
          description={(
            <>
              <p className="font-semibold text-[#d6b273]">{label.subtitle}</p>
              <p className="mt-3 max-w-2xl">{heroText}</p>
              <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#e9dfcf] underline-offset-4 hover:text-white hover:underline">
                <Download className="h-4 w-4" aria-hidden="true" /> Request compliance documents
              </Link>
            </>
          )}
          breadcrumbs={[
            { label: "Products", href: "/products" },
            { label: "Thermal Labels", href: "/products/thermal-labels" },
            { label: label.name },
          ]}
          actions={[
            { label: "Request a Quote", href: "/quote", kind: "primary" },
            { label: "Request Samples", href: "/samples", kind: "secondary" },
          ]}
          media={(
            <SlotImage
              slotKey={`products.card.${label.slug}`}
              alt={`${label.name} - Thermal Labels`}
              fill
              className="object-cover object-[62%_center]"
              fetchPriority="high"
              loading="eager"
              sizes="100vw"
              quality={65}
            />
          )}
        />

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
                <div className="bg-emerald-50 border border-emerald-100  p-6">
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

                <div className="bg-white border border-slate-200  p-6">
                  <h2 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#0f5f5c]" />
                    Applications
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {label.applications.map((app) => (
                      <span key={app} className="px-3 py-1.5 bg-[#9c661d] text-white text-xs font-bold  uppercase tracking-wide">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-200  p-6">
                  <h2 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-[#0f5f5c]" />
                    Available Sizes
                  </h2>
                  <div className="grid grid-cols-2 gap-2">
                    {label.sizes.map((size) => (
                      <div key={size} className="px-3 py-2.5 bg-slate-50 border border-slate-200  text-center text-sm font-semibold text-slate-700 hover:border-[#0f5f5c]/40 hover:bg-[#f4f0e8] transition-all cursor-default">
                        {size}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mt-3 text-center">Custom sizes available — contact us</p>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white border border-slate-200  overflow-hidden">
                  <div className="px-8 py-6 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="font-bold text-slate-900 text-2xl">Product Specifications</h2>
                      <p className="text-slate-500 text-sm mt-1">Complete technical specifications for {label.name}</p>
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold  hover:border-[#0f5f5c]/40 hover:text-[#0f5f5c] transition-colors shadow-sm shrink-0"
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
                              <td className="py-3.5 px-4 font-semibold text-slate-500 text-xs uppercase tracking-wide w-2/5 ">{key}</td>
                              <td className="py-3.5 px-4 text-slate-800 text-sm font-medium ">{val}</td>
                            </tr>
                          ))
                        ) : (
                          [
                            ["Facestock", "Thermal-sensitive paper / Synthetic"],
                            ["Adhesive Type", "Permanent / Removable / Freezer"],
                            ["Liner Material", "Glassine / PE / PET"],
                            ["Label Format", "Roll / Fanfold / Sheet"],
                            ["Minimum Order Qty", label.moq],
                            ["Production Schedule", "Confirmed after material, quantity, artwork, and packing review"],
                            ["Quality Documents", "Current certificate scope and validity confirmed on request"],
                          ].map(([key, val], i) => (
                            <tr key={key} className={i % 2 === 0 ? "bg-slate-50/50" : "bg-white"}>
                              <td className="py-3.5 px-4 font-semibold text-slate-500 text-xs uppercase tracking-wide w-2/5 ">{key}</td>
                              <td className="py-3.5 px-4 text-slate-800 text-sm font-medium ">{val}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="px-8 py-6 bg-gradient-to-r from-[#0f5f5c] to-[#101b19] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="font-bold text-white text-base">Need a custom label solution?</p>
                      <p className="text-[#d6b273] text-sm">Custom sizes, adhesives, printing, tooling, samples, packing, and order quantity are confirmed by project review.</p>
                    </div>
                    <div className="flex gap-3 shrink-0 flex-wrap">
                      <Link href="/samples" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0f5f5c] font-bold  hover:bg-[#f4f0e8] transition-colors text-sm shadow-sm">
                        Request Samples
                      </Link>
                      <Link href="/quote" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#9c661d] text-white font-bold  hover:bg-[#7d4f16] transition-colors text-sm shadow-sm border border-[#b9822f]">
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
              These model families are common buyer references. Confirm dimensions, core or stack, winding, sensing, media path, print method, and performance with the exact printer and an approved sample.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
              {printers.map((p) => (
                <div key={p.brand} className="bg-white border border-slate-200  p-4 hover:border-emerald-300 hover:shadow-sm transition-all text-center">
                  <div className="w-8 h-8 bg-emerald-50  flex items-center justify-center mx-auto mb-2">
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
                Platform and carrier layouts change over time. Use the buyer&apos;s current approved template and verify label size, printer settings, barcode data, and scan performance before production.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {platforms.map((p) => (
                  <div key={p.name} className="bg-amber-50 border border-amber-100  p-4 hover:border-amber-300 hover:shadow-sm transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <p className="font-bold text-slate-900 text-sm">{p.name}</p>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed">{p.note}</p>
                  </div>
                ))}
              </div>
              {isEcommerceLabel && (
                <div className="mt-6 bg-amber-50 border border-amber-200  p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 text-sm mb-1">Amazon FBA Seller?</p>
                    <p className="text-slate-500 text-xs">
                      Share the current 4×6 template, printer, packaging surface, barcode data, and required retention period. The finished label should be sample-tested in the buyer&apos;s fulfillment workflow.
                    </p>
                  </div>
                  <Link
                    href="/industries/ecommerce"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold  text-sm transition-colors shrink-0 shadow-sm"
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
              Quantity bands indicate packing and supply scale. Final pricing is quoted from the current material, adhesive, dimensions, printing, packing, volume, destination, and Incoterm.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {pricing.map((tier, i) => (
                <div
                  key={tier.tier}
                  className={` p-6 border-2 transition-all ${
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
              <Link href="/quote" className="inline-flex items-center gap-2 px-6 py-3 bg-[#9c661d] hover:bg-[#7d4f16] text-white font-bold  text-sm transition-colors shadow-sm">
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-slate-400 text-xs">Response timing confirmed after specification and document review</p>
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
              Available files depend on the selected facestock, adhesive, test scope, destination, and current document validity. Request the exact report or declaration required for procurement review.
              {slug === "wristband-labels" && (
                <>
                  {" "}For medical-device applications, review our{" "}
                  <Link href="/compliance/iso-15223" className="font-semibold text-[#0f5f5c] hover:underline">
                    ISO 15223 medical-device labeling requirements
                  </Link>
                  .
                </>
              )}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {complianceDocs.map((doc) => (
                <div key={doc.name} className="bg-white border border-slate-200  p-5 hover:border-[#0f5f5c]/40 hover:shadow-sm transition-all group">
                  <div className="w-9 h-9 bg-[#f4f0e8]  flex items-center justify-center mb-3 group-hover:bg-[#e7eee9] transition-colors">
                    <Download className="w-4 h-4 text-[#0f5f5c]" />
                  </div>
                  <p className="font-bold text-slate-900 text-sm mb-1 leading-snug">{doc.name}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{doc.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#f4f0e8] border border-[#0f5f5c]/25  p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="font-bold text-slate-900 text-sm mb-1">Request Full Compliance Pack</p>
                <p className="text-slate-500 text-xs">
                  Share the destination market, selected construction, contact conditions, and required file names so the team can confirm which current documents apply.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#9c661d] hover:bg-[#7d4f16] text-white font-bold  text-sm transition-colors shrink-0 shadow-sm"
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
              <div className="flex items-start gap-4 p-6 bg-[#f4f0e8]  border border-[#ded6c8]">
                <div className="w-10 h-10 bg-[#9c661d]  flex items-center justify-center shrink-0">
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
              <div className="flex items-start gap-4 p-6 bg-amber-50  border border-amber-100">
                <div className="w-10 h-10 bg-amber-500  flex items-center justify-center shrink-0">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm mb-1">Marketplace Label Workflow</p>
                  <p className="text-slate-500 text-xs mb-3">Confirm the current 4×6 template, barcode data, printer settings, surface, and retention target before ordering.</p>
                  <Link href="/industries/ecommerce" className="text-amber-600 hover:text-amber-700 font-semibold text-xs flex items-center gap-1">
                    FBA Guide <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-slate-50  border border-slate-200">
                <div className="w-10 h-10 bg-slate-700  flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm mb-1">Talk to a Specialist</p>
                  <p className="text-slate-500 text-xs mb-3">Share the application, dimensions, material, printer, quantity, and destination so the team can confirm the response plan.</p>
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
                  className="group flex flex-col overflow-hidden border border-slate-200 bg-white transition-all hover:border-[#0f5f5c]/40 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <SlotImage
                      slotKey={`products.card.${l.slug}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-[#0f5f5c] transition-colors leading-snug">{l.name}</h3>
                    <p className="text-slate-500 text-xs leading-5 flex-1">{l.subtitle}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#0f5f5c]">
                      Explore {l.name} <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
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
