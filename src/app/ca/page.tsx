import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import SlotImage from "@/components/ui/SlotImage";
import RegionHero from "@/components/ui/RegionHero";
import FaqSection from "@/components/ui/FaqSection";
import { buildMetadata, organizationSchema, breadcrumbSchema, faqSchema } from "@/lib/seo";
import { normalizeFaqItem } from "@/lib/faq";
import { GEO_REGIONS } from "@/lib/data";
import {
  ArrowRight, CheckCircle2, Truck, MapPin, ShieldCheck, Package,
  Factory, Users, Globe, Star, FileCheck, TrendingUp, Clock,
  Layers, Download, ChevronRight,
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Canada Thermal Paper Rolls & Labels Supplier | Zhixin Paper",
  description:
    "Thermal paper rolls and labels for Canadian distributors. Review material chemistry, bilingual artwork, regulated-label requirements, printer fit, documents, and shipping terms by project.",
  path: "/ca",
  locale: "en_CA",
  keywords: [
    "thermal paper supplier Canada",
    "BPA free thermal paper Canada",
    "Health Canada compliant thermal paper",
    "thermal labels wholesale Canada",
    "cannabis labels Canada",
    "receipt paper rolls Canada",
    "POS paper rolls Canadian distributor",
  ],
});

const caRegion = GEO_REGIONS.find((r) => r.slug === "ca")!;
const subpages = (caRegion as any).subpages || [];

const CA_PRODUCTS = [
  {
    title: "Thermal Paper Rolls",
    href: "/products/thermal-paper-rolls",
    slotKey: "home.product.thermal-rolls" as const,
    alt: "Thermal paper rolls configured for Canadian retail and POS systems",
    copy: "POS, payment-terminal, ATM, lottery, and gaming rolls configured by printer model, dimensions, winding, paper grade, and packing plan.",
    specs: ["3 1/8 inch and metric formats", "Phenol options by selected grade", "Device fit confirmed by model and sample"],
  },
  {
    title: "Thermal Labels",
    href: "/products/thermal-labels",
    slotKey: "home.product.thermal-labels" as const,
    alt: "Direct thermal shipping and barcode labels for Canadian logistics",
    copy: "Direct thermal labels for shipping, barcode, retail, regulated, and food-label projects. Bilingual artwork, adhesive, construction, and document scope are confirmed by application.",
    specs: ["4x6 and 100x150mm formats", "Regulated-label artwork review", "Permanent and removable adhesive options"],
  },
];

const CA_COMPLIANCE = [
  { label: "Canadian Material Review", desc: "Chemical and intended-use scope checked by grade", href: "/compliance/fda-us" },
  { label: "Regulated Labels", desc: "Federal and provincial requirements reviewed", href: "/ca/cannabis-labels" },
  { label: "Phenol Options", desc: "BPA-free, BPS-free, or phenol-free by grade", href: "/compliance/bpa-free" },
  { label: "Quality Documents", desc: "Available quality-system documents reviewed by project", href: "/compliance/iso-9001" },
  { label: "Chain of Custody", desc: "Paper options subject to SKU and supplier confirmation", href: "/compliance/fsc-paper" },
  { label: "CEPA Scope Review", desc: "Material and chemical scope checked by project", href: "/compliance/reach-rohs" },
];

const CA_LOGISTICS = [
  { step: "Specification & Quote", time: "Project stage", detail: "Confirm SKU, quantity, packing, destination, Incoterm, and responsibilities" },
  { step: "Artwork or Sample", time: "When required", detail: "Approve bilingual artwork and production-intent samples before bulk release" },
  { step: "Production & QC", time: "After approval", detail: "Production timing follows the approved specification and current capacity" },
  { step: "Export & Transport", time: "After booking", detail: "Port, route, and carrier schedule are confirmed in the shipment plan" },
  { step: "Import & Delivery", time: "By agreed Incoterm", detail: "Customs, taxes, and final-delivery responsibilities follow the written quotation" },
];

const CA_FAQ = [
  {
    q: "How are Canadian material and regulatory requirements reviewed?",
    a: "The exact material grade, intended use, chemical scope, province, and current supporting documents are reviewed before approval. Available documents depend on the selected construction and report scope rather than applying universally to every product.",
  },
  {
    q: "Can you provide English and French artwork or documents?",
    a: "English and French artwork or project documents can be reviewed when required. The buyer supplies or approves regulated wording and translations, and the final deliverables are stated in the quotation.",
  },
  {
    q: "Can you supply labels for regulated cannabis products?",
    a: "We can manufacture labels to buyer-approved specifications. The buyer should provide current federal, provincial, product-class, bilingual, warning, symbol, variable-data, and packaging requirements for review before production.",
  },
  {
    q: "Can delivered shipping terms be quoted for Canada?",
    a: "Delivered terms may be quoted after destination, classification, duties, GST or HST, customs responsibilities, and inland delivery are reviewed. The written quotation states included costs and each party's responsibilities.",
  },
  {
    q: "How is the delivery schedule confirmed?",
    a: "The schedule is confirmed after specification and artwork approval, current capacity review, carton data, carrier booking, destination, customs scope, and the agreed Incoterm are known.",
  },
  {
    q: "What is the minimum order quantity for Canadian buyers?",
    a: "MOQ is confirmed by dimensions, material, printing, die-cut or tooling needs, packing, and annual volume. Share the target SKU and quantity so the quotation can state the applicable minimum and price breakpoints.",
  },
];

const TRUST_SIGNALS = [
  { icon: <Factory className="w-4 h-4 text-red-600" />, label: "By RFQ", sub: "Capacity and production plan" },
  { icon: <Users className="w-4 h-4 text-red-600" />, label: "By SKU", sub: "MOQ and packing review" },
  { icon: <Globe className="w-4 h-4 text-red-600" />, label: "By Route", sub: "Incoterm and delivery plan" },
  { icon: <Star className="w-4 h-4 text-red-600" />, label: "Since 2008", sub: "Manufacturing experience" },
];

export default function CanadaPage() {
  const faqs = CA_FAQ.map(normalizeFaqItem);
  const jsonLd = [
    organizationSchema(),
    breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Canada", url: "/ca" }]),
    faqSchema(faqs),
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
          slotKey="geo.ca.hero"
          alt="Thermal paper rolls and labels manufacturing for Canadian distribution"
          flagEmoji="🇨🇦"
          marketLabel="Canada Market"
          title="Thermal Paper Supplier Canada"
          description="Thermal paper rolls and labels for Canadian distributors and importers. Material chemistry, bilingual artwork, regulated-label requirements, printer fit, documents, and shipping responsibilities are confirmed for the quoted product and province."
          features={["Canadian Material Review", "Phenol Options", "Regulated Labels", "Quality Documents", "Delivered-Term Review", "Bilingual Artwork", "Chain-of-Custody Options"]}
          ctaPrimaryLabel="Get Canada Quote"
          ctaPrimaryHref="/quote"
          theme={{
            bgColor: "bg-[#1f0d0d]",
            overlayGradient: "bg-[linear-gradient(90deg,rgba(20,8,8,0.68)_0%,rgba(20,8,8,0.48)_48%,rgba(20,8,8,0.18)_82%,rgba(20,8,8,0.05)_100%)]",
            accentBarColor: "bg-red-400",
            accentTextColor: "text-red-200",
            checkColor: "text-red-300",
            primaryButtonColor: "bg-red-600",
            primaryButtonHoverColor: "hover:bg-red-500",
            primaryButtonShadowColor: "shadow-red-600/30",
          }}
        />

        {/* ── SUBPAGE CARDS ── */}
        {subpages.length > 0 && (
          <section className="py-16 bg-white border-b border-slate-200">
            <div className="container-site">
              <div className="max-w-3xl mb-8">
                <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                  Canadian market solutions.
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-500 max-w-2xl">
                  Dedicated pages for key Canadian compliance and application requirements. Each covers specifications, regulations, and what to ask for before ordering.
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {subpages.map((page: any) => (
                  <Link
                    key={page.slug}
                    href={`/ca/${page.slug}`}
                    className="group border border-slate-200 bg-slate-50 p-6 hover:border-red-300 hover:shadow-md transition-all"
                  >
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-red-600 transition-colors mb-2">{page.name}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                      Regulated-label projects require buyer-approved federal, provincial, product-class, bilingual, warning, symbol, variable-data, and packaging requirements.
                    </p>
                    <div className="flex items-center gap-2 text-sm font-bold text-red-600 group-hover:gap-3 transition-all">
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
        <section className="py-5 bg-red-700 text-white">
          <div className="container-site flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-red-200" />
              <span className="font-semibold">{caRegion.shipping}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-200" />
              <span>Major ports: <strong>Vancouver (Prince Rupert), Montreal</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-200" />
              <span>Schedule: <strong>confirmed by quotation</strong> after specification, capacity, route, and booking review</span>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-red-200 text-xs">FOB · CIF · delivered terms reviewed by destination, tax, and responsibility</span>
            </div>
          </div>
        </section>

        {/* ── PRODUCT LINES ── */}
        <section className="py-20 bg-white border-b border-slate-100">
          <div className="container-site">
            <div className="max-w-3xl mb-10">
              <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
                Two product lines. Built for Canada.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-500 max-w-2xl">
                Each project is reviewed against the exact product grade, printer, intended use, documents, bilingual artwork, packing, and destination requirements. Select a product line to browse available configurations.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {CA_PRODUCTS.map((product) => (
                <article key={product.title} className="group border border-slate-200 bg-white hover:border-red-200 transition-colors">
                  <Link href={product.href} className="block">
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#1f0d0d]">
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
                        <ArrowRight className="mt-1 h-6 w-6 shrink-0 text-red-600 transition group-hover:translate-x-1" />
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
                  Why Canadian distributors choose Zhixin.
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-500 max-w-xl">
                  Canada projects can involve bilingual artwork, material review, regulated-label requirements, and destination-specific import responsibilities. These items are recorded in the approved specification and quotation.
                </p>
                <div className="mt-8 space-y-4">
                  {(caRegion.highlights as string[]).map((item: string) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
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
              <FileCheck className="w-5 h-5 text-red-600" />
              <h2 className="font-bold text-slate-900 text-2xl md:text-4xl">
                Canadian Compliance & Certifications
              </h2>
            </div>
            <p className="text-slate-500 text-base mb-10 max-w-2xl">
              Documents are matched to the exact quoted material, intended use, province, report scope, language need, and current validity. Request the relevant files for procurement review before approval.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {CA_COMPLIANCE.map((item) => (
                <Link key={item.label} href={item.href} className="bg-slate-50 border border-slate-200 p-5 hover:border-red-300 hover:shadow-sm transition-all group text-center">
                  <div className="flex justify-center mb-3">
                    <CheckCircle2 className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="font-bold text-slate-900 text-xs group-hover:text-red-600 transition-colors block mb-1">{item.label}</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                </Link>
              ))}
            </div>
            <div className="bg-red-50 border border-red-200 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="font-bold text-slate-900 text-base mb-1">Request Full Canadian Compliance Pack</p>
                <p className="text-slate-500 text-sm">
                  Material declarations, applicable test reports, quality-system documents, technical data, and bilingual files are assembled according to the selected grade and project scope.
                </p>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-colors shrink-0 shadow-sm">
                <Download className="w-4 h-4" /> Request Docs
              </Link>
            </div>
          </div>
        </section>

        {/* ── LOGISTICS TIMELINE ── */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-2">
              <Truck className="w-5 h-5 text-red-600" />
              <h2 className="font-bold text-slate-900 text-2xl md:text-4xl">
                Delivery Timeline to Canada
              </h2>
            </div>
            <p className="text-slate-500 text-base mb-10 max-w-2xl">
              The delivery plan is confirmed after specification and artwork approval, current production capacity, carton data, carrier booking, destination, customs scope, and the agreed Incoterm are known.
            </p>
            <div className="relative">
              <div className="absolute top-5 left-5 right-5 h-0.5 bg-red-200 hidden md:block" style={{ zIndex: 0 }} />
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                {CA_LOGISTICS.map((step, i) => (
                  <div key={step.step} className="relative flex flex-col items-center text-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-3 z-10 ${
                      i === CA_LOGISTICS.length - 1
                        ? "bg-emerald-600 text-white"
                        : "bg-red-600 text-white"
                    }`}>
                      {i + 1}
                    </div>
                    <p className="font-bold text-slate-900 text-xs mb-1">{step.step}</p>
                    <p className="text-red-600 text-xs font-semibold mb-1">{step.time}</p>
                    <p className="text-slate-400 text-[10px] leading-relaxed">{step.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 bg-red-50 border border-red-200 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="font-bold text-slate-900 text-sm mb-1">Need an alternative transport plan?</p>
                <p className="text-slate-500 text-xs">Air, ocean, or combined transport can be reviewed after carton data, destination, required date, carrier availability, and customs responsibilities are confirmed.</p>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-colors shrink-0">
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
                  Build your Canadian brand.
                </h2>
                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  Plan a private-label thermal paper program for Canada. Logo printing, bilingual packaging, color targets, confidentiality terms, samples, MOQ, and schedule are confirmed after specification and market review.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    "Custom logo and back-print for Canadian market branding",
                    "Color target reviewed against the approved sample",
                    "English and French packaging text reviewed against current buyer and market requirements",
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
                    { label: "Language Support", value: "English + French (bilingual)" },
                    { label: "Pallet Standard", value: "Canadian 48×40\" GMA" },
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

        <FaqSection
          faqs={faqs}
          title="Frequently Asked Questions — Canada"
          intro="Common questions from Canadian distributors and importers about products, compliance, logistics, and ordering."
          eyebrow="Canada buyer FAQ"
          tone="light"
        />


        <CTABanner
          title="Ready to source for Canada?"
          subtitle="Get a project-specific quote covering material selection, bilingual artwork, supporting documents, sample options, packing, Incoterm, and destination responsibilities."
        />
      </main>
      <Footer />
    </>
  );
}
