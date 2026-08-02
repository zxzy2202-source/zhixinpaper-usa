import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import SlotImage from "@/components/ui/SlotImage";
import { buildMetadata, organizationSchema, breadcrumbSchema } from "@/lib/seo";
import { GEO_REGIONS } from "@/lib/data";
import {
  ArrowRight, CheckCircle2, Truck, MapPin, ShieldCheck, Package,
  Factory, Users, Globe, Star, FileCheck, TrendingUp, Clock,
  Layers, Download, ChevronRight,
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "USA Thermal Paper Rolls & Labels Supplier | Zhixin Paper",
  description:
    "Thermal paper rolls and labels for US distributors and importers. Review material chemistry, food-contact scope, California disclosures, printer fit, packing, and shipping terms by project.",
  path: "/us",
  locale: "en_US",
  keywords: [
    "thermal paper supplier USA",
    "FDA compliant thermal paper",
    "Prop 65 thermal paper",
    "thermal labels wholesale USA",
    "receipt paper rolls US distributor",
    "BPA free thermal paper United States",
    "cannabis labels USA",
  ],
});

const usRegion = GEO_REGIONS.find((r) => r.slug === "us")!;
const subpages = (usRegion as any).subpages || [];

const US_PRODUCTS = [
  {
    title: "Thermal Paper Rolls",
    href: "/products/thermal-paper-rolls",
    slotKey: "home.product.thermal-rolls" as const,
    alt: "Thermal paper rolls configured for US retail and POS systems",
    copy: "POS, payment-terminal, ATM, lottery, and receipt rolls configured by printer model, dimensions, winding, paper grade, and packing plan.",
    specs: ["3 1/8 inch and metric formats", "Phenol options by selected grade", "Packing reviewed for the receiving channel"],
  },
  {
    title: "Thermal Labels",
    href: "/products/thermal-labels",
    slotKey: "home.product.thermal-labels" as const,
    alt: "Direct thermal shipping and barcode labels for US logistics and e-commerce",
    copy: "Direct thermal and thermal-transfer labels for shipping, barcode, retail, regulated, and food-label projects. Facestock, adhesive, artwork, and document scope are confirmed by application.",
    specs: ["4x6 and custom die-cut formats", "Regulated-label artwork review", "Permanent and removable adhesive options"],
  },
];

const US_COMPLIANCE = [
  { label: "Food-Contact Review", desc: "21 CFR scope checked by material and intended use", href: "/compliance/fda-us" },
  { label: "California Review", desc: "Chemical and warning scope checked by quoted grade", href: "/compliance/fda-us" },
  { label: "Phenol Options", desc: "BPA-free, BPS-free, or phenol-free by grade", href: "/compliance/bpa-free" },
  { label: "Quality Documents", desc: "Available quality-system documents reviewed by project", href: "/compliance/iso-9001" },
  { label: "Chain of Custody", desc: "Paper options subject to SKU and supplier confirmation", href: "/compliance/fsc-paper" },
  { label: "Regulated Labels", desc: "Requirements reviewed by state and application", href: "/us/cannabis-labels" },
];

const US_LOGISTICS = [
  { step: "Specification & Quote", time: "Project stage", detail: "Confirm SKU, quantity, packing, destination, Incoterm, and responsibilities" },
  { step: "Artwork or Sample", time: "When required", detail: "Approve artwork and production-intent samples before bulk release" },
  { step: "Production & QC", time: "After approval", detail: "Production timing follows the approved specification and current capacity" },
  { step: "Export & Transport", time: "After booking", detail: "Route and carrier schedule are confirmed in the shipment plan" },
  { step: "Import & Delivery", time: "By agreed Incoterm", detail: "Customs, tax, and final-delivery responsibilities follow the written quotation" },
];

const US_FAQ = [
  {
    q: "Can you support US food-contact thermal-paper projects?",
    a: "We can review candidate grades for the intended application. The quotation should identify the exact material, applicable 21 CFR scope, contact conditions, test or declaration documents, and sample-validation plan; availability is not a universal approval for every product or use.",
  },
  {
    q: "How do you address California Proposition 65 requirements?",
    a: "California chemical and warning requirements are reviewed against the exact quoted grade and current supporting documents. The buyer should confirm the intended use and any required warning assessment before approval.",
  },
  {
    q: "Can delivered shipping terms be quoted for the United States?",
    a: "Delivered terms may be quoted after the destination, product classification, tariffs, taxes, customs responsibilities, and inland delivery are reviewed. The written quotation states what is included and which party is responsible for each step.",
  },
  {
    q: "Can you supply labels for regulated cannabis products?",
    a: "We can manufacture labels to buyer-approved artwork and specifications. The buyer should provide the current state, product-class, warning, symbol, variable-data, and packaging requirements for review before production.",
  },
  {
    q: "What is the minimum order quantity for US buyers?",
    a: "MOQ is confirmed by dimensions, material, printing, die-cut or tooling needs, packing, and annual volume. Share the target SKU and quantity so the quotation can state the applicable minimum and price breakpoints.",
  },
  {
    q: "Can you pack for Amazon FBA programs?",
    a: "FNSKU, unit packing, carton labels, and other channel requirements can be reviewed against the buyer's current routing and preparation instructions. The approved packing specification is confirmed before production.",
  },
];

const TRUST_SIGNALS = [
  { icon: <Factory className="w-4 h-4 text-blue-600" />, label: "By RFQ", sub: "Capacity and production plan" },
  { icon: <Users className="w-4 h-4 text-blue-600" />, label: "By SKU", sub: "MOQ and packing review" },
  { icon: <Globe className="w-4 h-4 text-blue-600" />, label: "By Route", sub: "Incoterm and delivery plan" },
  { icon: <Star className="w-4 h-4 text-blue-600" />, label: "Since 2008", sub: "Manufacturing experience" },
];

export default function USPage() {
  const jsonLd = [
    organizationSchema(),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "United States", url: "/us" },
    ]),
  ];

  return (
    <>
      <Header />
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <main id="main-content" className="pt-[88px]">
        {/* ── HERO ── */}
        <section className="relative isolate overflow-hidden bg-[#0d1f2d] text-white">
          <SlotImage
            slotKey="geo.us.hero"
            alt="Thermal paper rolls and labels manufacturing for US distribution"
            fill
            fetchPriority="high"
            loading="eager"
            sizes="100vw"
            quality={76}
            className="-z-20 object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,20,32,0.68)_0%,rgba(8,20,32,0.48)_48%,rgba(8,20,32,0.18)_82%,rgba(8,20,32,0.05)_100%)]" />

          <div className="container-site py-16 md:py-20 lg:py-24">
            <div className="flex items-center gap-4 mb-5">
              <span className="text-5xl drop-shadow-lg">🇺🇸</span>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-0.5 bg-blue-400 rounded-full" />
                  <span className="text-xs font-bold tracking-widest uppercase text-blue-200">United States Market</span>
                </div>
                <h1 className="font-bold text-white leading-[1.08] text-4xl sm:text-5xl md:text-6xl">
                  Thermal Paper Supplier<br className="sm:hidden" /> USA
                </h1>
              </div>
            </div>
            <p className="text-blue-50/90 text-lg max-w-2xl mb-5 leading-relaxed">
              Thermal paper rolls and labels for US distributors, importers, and e-commerce programs. Material chemistry, food-contact scope, California disclosures, printer fit, packing, and shipping responsibilities are confirmed for the quoted product.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {["Food-Contact Review", "California Review", "Phenol Options", "Quality Documents", "Delivered-Term Review", "Channel Packing", "Regulated Labels"].map((f) => (
                <span key={f} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-xs tracking-wide uppercase text-white shadow-sm">
                  <CheckCircle2 className="w-3 h-3 text-blue-400" />
                  {f}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/quote" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/30 text-sm">
                Get US Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/samples" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 hover:border-white/40 transition-all backdrop-blur-sm text-sm">
                Request Samples
              </Link>
            </div>
          </div>
        </section>

        {/* ── SUBPAGE CARDS ── */}
        {subpages.length > 0 && (
          <section className="py-16 bg-white border-b border-slate-200">
            <div className="container-site">
              <div className="max-w-3xl mb-8">
                <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                  US market solutions.
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-500 max-w-2xl">
                  Dedicated pages for key US compliance and application requirements. Each covers specifications, regulations, and what to ask for before ordering.
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {subpages.map((page: any) => (
                  <Link
                    key={page.slug}
                    href={`/us/${page.slug}`}
                    className="group border border-slate-200 bg-slate-50 p-6 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors mb-2">{page.name}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                      {page.slug === "fda-compliant"
                        ? "Review the exact material grade, intended use, applicable 21 CFR scope, California disclosure needs, supporting documents, and sample plan."
                        : "Regulated-label projects require buyer-approved state, product-class, warning, symbol, variable-data, and packaging requirements."}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:gap-3 transition-all">
                      View {page.name} details
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── LOGISTICS INFO BAR ── */}
        <section className="py-5 bg-blue-600 text-white">
          <div className="container-site flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-200" />
              <span className="font-semibold">{usRegion.shipping}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-200" />
              <span>Major ports: <strong>Los Angeles/Long Beach, NY/NJ, Savannah, Houston</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-200" />
              <span>Schedule: <strong>confirmed by quotation</strong> after specification, capacity, route, and booking review</span>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-blue-200 text-xs">FOB · CIF · delivered terms reviewed by destination and responsibility</span>
            </div>
          </div>
        </section>

        {/* ── PRODUCT LINES ── */}
        <section className="py-20 bg-white border-b border-slate-100">
          <div className="container-site">
            <div className="max-w-3xl mb-10">
              <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
                 Product lines configured for US projects.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-500 max-w-2xl">
                Each project is reviewed against the exact product grade, printer, intended use, documents, packing, and destination requirements. Select a product line to browse available configurations.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {US_PRODUCTS.map((product) => (
                <article key={product.title} className="group border border-slate-200 bg-white hover:border-blue-200 transition-colors">
                  <Link href={product.href} className="block">
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#0d1f2d]">
                      <SlotImage
                        slotKey={product.slotKey}
                        alt={product.alt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.025]"
                      />
                    </div>
                    <div className="p-6 md:p-8">
                      <div className="flex items-start justify-between gap-6">
                        <h3 className="text-3xl font-bold text-slate-900 md:text-4xl">{product.title}</h3>
                        <ArrowRight className="mt-1 h-6 w-6 shrink-0 text-blue-600 transition group-hover:translate-x-1" />
                      </div>
                      <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">{product.copy}</p>
                      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-200 pt-5 text-sm font-semibold text-slate-700">
                        {product.specs.map((spec) => <span key={spec}>{spec}</span>)}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY ZHIXIN + TRUST SIGNALS ── */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="container-site">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.65fr] lg:items-start">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
                  Why US distributors choose Zhixin.
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-500 max-w-xl">
                  US procurement commonly requires material, import, printer-fit, and channel-packing review. Our quotation process records the selected grade, supporting documents, packing plan, destination, and responsibility allocation.
                </p>
                <div className="mt-8 space-y-4">
                  {(usRegion.highlights as string[]).map((item: string) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-600 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {TRUST_SIGNALS.map((item) => (
                  <div key={item.label} className="bg-white border border-slate-200 p-6 text-center">
                    <div className="flex justify-center mb-3">{item.icon}</div>
                    <p className="font-bold text-slate-900 text-2xl">{item.label}</p>
                    <p className="text-slate-400 text-xs mt-1">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── COMPLIANCE OVERVIEW ── */}
        <section className="py-20 bg-white border-b border-slate-100">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-2">
              <FileCheck className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-slate-900 text-2xl md:text-4xl">
                US Compliance & Certifications
              </h2>
            </div>
            <p className="text-slate-500 text-base mb-10 max-w-2xl">
              Documents are matched to the exact quoted material, intended use, jurisdiction, report scope, and current validity. Request the relevant files for procurement review before approval.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {US_COMPLIANCE.map((item) => (
                <Link key={item.label} href={item.href} className="bg-slate-50 border border-slate-200 p-5 hover:border-blue-300 hover:shadow-sm transition-all group text-center">
                  <div className="flex justify-center mb-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-bold text-slate-900 text-xs group-hover:text-blue-600 transition-colors block mb-1">{item.label}</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                </Link>
              ))}
            </div>
            <div className="bg-blue-50 border border-blue-200 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="font-bold text-slate-900 text-base mb-1">Request Full US Compliance Pack</p>
                <p className="text-slate-500 text-sm">
                  Material declarations, applicable test reports, quality-system documents, and technical data are assembled according to the selected grade and project scope.
                </p>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors shrink-0 shadow-sm">
                <Download className="w-4 h-4" /> Request Docs
              </Link>
            </div>
          </div>
        </section>

        {/* ── LOGISTICS TIMELINE ── */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-2">
              <Truck className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-slate-900 text-2xl md:text-4xl">
                Delivery Timeline to the USA
              </h2>
            </div>
            <p className="text-slate-500 text-base mb-10 max-w-2xl">
              The delivery plan is confirmed after specification approval, current production capacity, carrier booking, destination, customs scope, and the agreed Incoterm are known.
            </p>
            <div className="relative">
              <div className="absolute top-5 left-5 right-5 h-0.5 bg-blue-200 hidden md:block" style={{ zIndex: 0 }} />
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                {US_LOGISTICS.map((step, i) => (
                  <div key={step.step} className="relative flex flex-col items-center text-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-3 z-10 ${
                      i === US_LOGISTICS.length - 1
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
            <div className="mt-8 bg-blue-50 border border-blue-200 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="font-bold text-slate-900 text-sm mb-1">Need an alternative transport plan?</p>
                <p className="text-slate-500 text-xs">Air, ocean, or combined transport can be reviewed after carton data, destination, required date, carrier availability, and customs responsibilities are confirmed.</p>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors shrink-0">
                Contact Us <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── OEM / PRIVATE LABEL ── */}
        <section className="py-20 bg-white border-b border-slate-100">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-0.5 bg-emerald-500 rounded-full" />
                  <span className="text-xs font-bold tracking-widest uppercase text-emerald-600">OEM & Private Label</span>
                </div>
                <h2 className="font-bold text-slate-900 text-3xl md:text-5xl mb-4">
                  Build your American brand.
                </h2>
                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  Plan a private-label thermal paper program for the US market. Logo printing, packaging, color targets, confidentiality terms, samples, MOQ, and schedule are confirmed after specification and project review.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    "Custom logo and back-print for US market branding",
                    "Color target reviewed against the approved sample",
                    "FBA packaging and label requirements confirmed from current buyer instructions",
                    "Pallet dimensions and packing plan confirmed by route",
                    "NDA scope and signing point confirmed when required",
                    "Branded sample timing confirmed after review",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <Link href="/oem-custom/private-label" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors shadow-sm">
                  Explore OEM Options <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-8">
                <h3 className="font-bold text-slate-900 text-lg mb-6">OEM Service Summary</h3>
                <div className="space-y-4">
                  {[
                    { label: "Minimum Order", value: "Confirmed by SKU" },
                    { label: "Sample Turnaround", value: "Confirmed after review" },
                    { label: "Color Matching", value: "Pantone / CMYK" },
                    { label: "Print Options", value: "Front + Back print" },
                    { label: "FBA Ready", value: "FNSKU + poly-bagging" },
                    { label: "Pallet Standard", value: "US 48×40\" GMA pallet" },
                    { label: "NDA", value: "Signed before design work" },
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

        {/* ── US FAQ ── */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-slate-900 text-2xl md:text-4xl">
                Frequently Asked Questions — USA
              </h2>
            </div>
            <p className="text-slate-500 text-base mb-10 max-w-2xl">
              Common questions from US distributors and importers about our products, compliance, logistics, and ordering process.
            </p>
            <div className="space-y-4 max-w-3xl">
              {US_FAQ.map((item, i) => (
                <div key={i} className="bg-white border border-slate-200 p-6">
                  <p className="font-bold text-slate-900 text-sm mb-2">{item.q}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner
          title="Ready to source for the USA?"
          subtitle="Get a project-specific quote covering material selection, supporting documents, sample options, packing, Incoterm, and destination responsibilities."
        />
      </main>
      <Footer />
    </>
  );
}
