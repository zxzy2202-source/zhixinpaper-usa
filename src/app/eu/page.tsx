import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import SlotImage from "@/components/ui/SlotImage";
import RegionHero from "@/components/ui/RegionHero";
import { buildMetadata, organizationSchema, breadcrumbSchema } from "@/lib/seo";
import { GEO_REGIONS } from "@/lib/data";
import {
  ArrowRight, CheckCircle2, Truck, MapPin, ShieldCheck, Package,
  Factory, Users, Globe, Star, FileCheck, TrendingUp, Clock,
  Layers, Download, Phone, ChevronRight,
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Europe Thermal Paper Rolls & Labels Supplier | Zhixin Paper",
  description:
    "Thermal paper rolls and labels for European distributors. Review phenol options, REACH or RoHS document scope, printer fit, packing, and destination-specific shipping terms by project.",
  path: "/eu",
  locale: "en_GB",
  keywords: [
    "thermal paper supplier Europe",
    "BPA free thermal rolls EU",
    "REACH compliant thermal paper",
    "thermal labels Europe wholesale",
    "receipt paper rolls European distributor",
    "POS paper rolls EU import",
  ],
});

const euRegion = GEO_REGIONS.find((r) => r.slug === "eu")!;
const countries = euRegion.countries || [];

const EU_PRODUCTS = [
  {
    title: "Thermal Paper Rolls",
    href: "/products/thermal-paper-rolls",
    slotKey: "home.product.thermal-rolls" as const,
    alt: "Thermal paper rolls configured for European POS and retail systems",
    copy: "POS, payment-terminal, ATM, lottery, and ticketing rolls configured by printer model, dimensions, winding, selected chemistry, and packing plan.",
    specs: ["80mm, 57mm, and custom formats", "Phenol options by selected grade", "Custom print and private-label review"],
  },
  {
    title: "Thermal Labels",
    href: "/products/thermal-labels",
    slotKey: "home.product.thermal-labels" as const,
    alt: "Direct thermal shipping and barcode labels for European logistics",
    copy: "Direct thermal labels for shipping, barcode, retail, food-label, and warehouse projects. Facestock, adhesive, food-contact scope, and documents are confirmed by application.",
    specs: ["4x6 and 100x150mm formats", "Permanent and removable adhesive options", "Food-contact scope reviewed by construction"],
  },
];

const EU_COMPLIANCE = [
  { label: "Phenol Options", desc: "BPA-free, BPS-free, or phenol-free by grade", href: "/compliance/bpa-free" },
  { label: "REACH/RoHS Review", desc: "Applicable scope checked by material and use", href: "/compliance/reach-rohs" },
  { label: "Quality Documents", desc: "Available quality-system documents reviewed by project", href: "/compliance/iso-9001" },
  { label: "Chain of Custody", desc: "Paper options subject to SKU and supplier confirmation", href: "/compliance/fsc-paper" },
  { label: "Food-Contact Review", desc: "Scope checked by construction and intended use", href: "/compliance/eu-food-contact" },
  { label: "Test Reports", desc: "Available reports matched to the quoted grade", href: "/compliance/certificates" },
];

const EU_LOGISTICS = [
  { step: "Specification & Quote", time: "Project stage", detail: "Confirm SKU, quantity, packing, destination, Incoterm, and responsibilities" },
  { step: "Artwork or Sample", time: "When required", detail: "Approve artwork and production-intent samples before bulk release" },
  { step: "Production & QC", time: "After approval", detail: "Production timing follows the approved specification and current capacity" },
  { step: "Export & Transport", time: "After booking", detail: "Port, route, and carrier schedule are confirmed in the shipment plan" },
  { step: "Import & Delivery", time: "By agreed Incoterm", detail: "Customs, VAT, and final-delivery responsibilities follow the written quotation" },
];

const EU_FAQ = [
  {
    q: "Can you offer BPA-free or other phenol options for Europe?",
    a: "BPA-free, BPS-free, or phenol-free routes may be offered by selected grade. The exact chemistry, current supporting report, intended use, destination, and applicable regulatory scope are confirmed before approval.",
  },
  {
    q: "Can you provide REACH or RoHS documents?",
    a: "Available declarations or reports are matched to the exact quoted material and applicable scope. REACH and RoHS do not apply identically to every paper or label construction, so procurement should review the selected SKU and intended use.",
  },
  {
    q: "Can delivered shipping terms be quoted for European destinations?",
    a: "Delivered terms may be quoted after destination, classification, duties, VAT, customs responsibilities, and inland delivery are reviewed. The written quotation states included costs and each party's responsibilities.",
  },
  {
    q: "How is the delivery schedule confirmed?",
    a: "The schedule is confirmed after specification and artwork approval, current capacity review, carton data, carrier booking, destination, customs scope, and the agreed Incoterm are known.",
  },
  {
    q: "What is the minimum order quantity for European buyers?",
    a: "MOQ is confirmed by dimensions, material, printing, die-cut or tooling needs, packing, and annual volume. Share the target SKU and quantity so the quotation can state the applicable minimum and price breakpoints.",
  },
  {
    q: "Can buyers request samples before bulk approval?",
    a: "Sample options are reviewed by SKU, material availability, printing, tooling, quantity, destination, and courier plan. Cost and turnaround are confirmed in writing for the project.",
  },
];

const TRUST_SIGNALS = [
  { icon: <Factory className="w-4 h-4 text-blue-600" />, label: "By RFQ", sub: "Capacity and production plan" },
  { icon: <Users className="w-4 h-4 text-blue-600" />, label: "By SKU", sub: "MOQ and packing review" },
  { icon: <Globe className="w-4 h-4 text-blue-600" />, label: "By Route", sub: "Incoterm and delivery plan" },
  { icon: <Star className="w-4 h-4 text-blue-600" />, label: "Since 2008", sub: "Manufacturing experience" },
];

export default function EUPage() {
  const jsonLd = [
    organizationSchema(),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Europe", url: "/eu" },
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
        <RegionHero
          slotKey="geo.eu.hero"
          alt="Thermal paper rolls and labels manufacturing for European distribution"
          flagEmoji="🇪🇺"
          marketLabel="European Union Market"
          title="Thermal Paper Supplier Europe"
          description="Thermal paper rolls and labels for European distributors. Material chemistry, REACH or RoHS document scope, food-contact use, printer fit, packing, and destination responsibilities are confirmed for the quoted product."
          features={["Phenol Options", "REACH/RoHS Review", "Quality Documents", "Delivered-Term Review", "Euro-Pallet Options", "Chain-of-Custody Options", "Food-Contact Review"]}
          ctaPrimaryLabel="Get Europe Quote"
          ctaPrimaryHref="/quote"
          theme={{
            bgColor: "bg-[#0f1f2d]",
            overlayGradient: "bg-[linear-gradient(90deg,rgba(10,24,36,0.65)_0%,rgba(10,24,36,0.48)_48%,rgba(10,24,36,0.18)_82%,rgba(10,24,36,0.06)_100%)]",
            accentBarColor: "bg-blue-400",
            accentTextColor: "text-blue-200",
            checkColor: "text-blue-300",
            primaryButtonColor: "bg-blue-600",
            primaryButtonHoverColor: "hover:bg-blue-500",
            primaryButtonShadowColor: "shadow-blue-600/30",
          }}
        />

        {/* ── COUNTRY CARDS ── */}
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="container-site">
            <div className="max-w-3xl mb-10">
              <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
                Select your market.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-500 max-w-2xl">
                Each European country has its own compliance standards, popular sizes, and preferred shipping routes. Choose your market for country-specific product recommendations and logistics details.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {countries.map((c) => (
                <Link
                  key={c.slug}
                  href={`/eu/${c.slug}`}
                  className="group border border-slate-200 bg-white p-6 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{c.flag}</span>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{c.name}</h3>
                      <span className="text-xs text-slate-400 uppercase tracking-wide">{c.lang} Market</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3">
                    {c.description?.slice(0, 140)}
                    {c.description && c.description.length > 140 ? "..." : ""}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(c.compliance || []).slice(0, 3).map((cert: string) => (
                      <span key={cert} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold uppercase tracking-wide">
                        {cert}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:gap-3 transition-all">
                    View {c.name} details
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── LOGISTICS INFO BAR ── */}
        <section className="py-5 bg-blue-600 text-white">
          <div className="container-site flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-200" />
              <span className="font-semibold">{euRegion.shipping}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-200" />
              <span>Major ports: <strong>Hamburg, Rotterdam, Felixstowe, Le Havre, Gdańsk</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-200" />
              <span>Schedule: <strong>confirmed by quotation</strong> after specification, capacity, route, and booking review</span>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-blue-200 text-xs">FOB · CIF · delivered terms reviewed by destination, VAT, and responsibility</span>
            </div>
          </div>
        </section>

        {/* ── PRODUCT LINES ── */}
        <section className="py-20 bg-white border-b border-slate-100">
          <div className="container-site">
            <div className="max-w-3xl mb-10">
              <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
                 Product lines configured for European projects.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-500 max-w-2xl">
                Each project is reviewed against the exact product grade, printer, intended use, document scope, packing, and destination requirements. Select a product line to browse available configurations.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {EU_PRODUCTS.map((product) => (
                <article key={product.title} className="group border border-slate-200 bg-white hover:border-blue-200 transition-colors">
                  <Link href={product.href} className="block">
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#0f1f2d]">
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
                  Why European distributors choose Zhixin.
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-500 max-w-xl">
                  European procurement can require chemistry, regulatory-scope, language, pallet, and import-responsibility review. These items are matched to the selected SKU and recorded in the approved specification and quotation.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    "Phenol chemistry selected and documented by quoted grade",
                    "REACH or RoHS scope reviewed against the material and intended use",
                    "Local-language documents reviewed when required by the project",
                    "Euro-pallet and alternative packing plans agreed with the warehouse",
                    "Delivered terms quoted after customs, VAT, and destination review",
                    "Quality-system and batch documents supplied by approved project scope",
                  ].map((item) => (
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
                EU Compliance & Certifications
              </h2>
            </div>
            <p className="text-slate-500 text-base mb-10 max-w-2xl">
              Documents are matched to the exact quoted material, intended use, destination, report scope, and current validity. Request the relevant files for procurement review before approval.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {EU_COMPLIANCE.map((item) => (
                <Link key={item.label} href={item.href} className="bg-slate-50 border border-slate-200 p-5 hover:border-blue-300 hover:shadow-sm transition-all group text-center">
                  <div className="flex justify-center mb-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-bold text-slate-900 text-xs group-hover:text-blue-600 transition-colors block mb-1">{item.label}</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                </Link>
              ))}
            </div>

            {/* Compliance pack CTA */}
            <div className="bg-blue-50 border border-blue-200 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="font-bold text-slate-900 text-base mb-1">Request Full EU Compliance Pack</p>
                <p className="text-slate-500 text-sm">
                  Material declarations, applicable test reports, quality-system documents, and technical data are assembled according to the selected grade and project scope.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors shrink-0 shadow-sm"
              >
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
                Delivery Timeline to Europe
              </h2>
            </div>
            <p className="text-slate-500 text-base mb-10 max-w-2xl">
              From order confirmation to delivery at your EU warehouse — a typical end-to-end timeline for sea freight shipments from our Qingdao factory.
            </p>
            <div className="relative">
              <div className="absolute top-5 left-5 right-5 h-0.5 bg-blue-200 hidden md:block" style={{ zIndex: 0 }} />
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                {EU_LOGISTICS.map((step, i) => (
                  <div key={step.step} className="relative flex flex-col items-center text-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-3 z-10 ${
                      i === EU_LOGISTICS.length - 1
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
                <p className="text-slate-500 text-xs">Air, ocean, rail, or combined transport can be reviewed after carton data, destination, required date, carrier availability, and customs responsibilities are confirmed.</p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors shrink-0"
              >
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
                  Build your European brand.
                </h2>
                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  Plan a private-label thermal paper program for Europe. Logo printing, market-language packaging, color targets, confidentiality terms, samples, MOQ, and schedule are confirmed after specification and destination review.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    "Custom logo and back-print for European market branding",
                    "Color target reviewed against the approved sample",
                    "Market-language packaging text reviewed against current destination requirements",
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
                    { label: "Language Support", value: "DE / FR / NL / PL / EN" },
                    { label: "Packing Standard", value: "Euro pallet (1200×800mm)" },
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

        {/* ── EU FAQ ── */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-slate-900 text-2xl md:text-4xl">
                Frequently Asked Questions — Europe
              </h2>
            </div>
            <p className="text-slate-500 text-base mb-10 max-w-2xl">
              Common questions from European distributors and importers about our products, compliance, logistics, and ordering process.
            </p>
            <div className="space-y-4 max-w-3xl">
              {EU_FAQ.map((item, i) => (
                <div key={i} className="bg-white border border-slate-200 p-6">
                  <p className="font-bold text-slate-900 text-sm mb-2">{item.q}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner
          title="Ready to source for Europe?"
          subtitle="Get a project-specific quote covering material selection, document scope, sample options, packing, Incoterm, and destination responsibilities."
        />
      </main>
      <Footer />
    </>
  );
}
