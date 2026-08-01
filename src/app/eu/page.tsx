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
  Layers, Download, Phone, ChevronRight,
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Europe Thermal Paper Supplier — BPA-Free Rolls & Labels | Zhixin Paper",
  description:
    "Thermal paper rolls and labels for European distributors. REACH/RoHS compliant, BPA-free, DDP shipping to Germany, UK, France, Netherlands, Poland & more. ISO 9001 certified factory.",
  path: "/eu",
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
    alt: "BPA-free thermal paper rolls for European POS and retail systems",
    copy: "Standard POS, payment terminal, ATM, lottery, and ticketing rolls — BPA-free, REACH compliant, compatible with all European printer brands.",
    specs: ["80mm & 57mm POS rolls", "BPA-free / BPS-free grades", "Custom print & private label"],
  },
  {
    title: "Thermal Labels",
    href: "/products/thermal-labels",
    slotKey: "home.product.thermal-labels" as const,
    alt: "Direct thermal shipping and barcode labels for European logistics",
    copy: "Direct thermal labels for shipping, barcode, retail, food, and warehouse applications. EU food contact compliant options available.",
    specs: ["4x6\" & 100×150mm shipping", "Permanent & removable adhesive", "EU food contact compliant"],
  },
];

const EU_COMPLIANCE = [
  { label: "BPA-Free", desc: "EU 2024/3190 ban compliant since Jan 2025", href: "/compliance/bpa-free" },
  { label: "REACH/RoHS", desc: "SVHC compliant, Annex XVII certified", href: "/compliance/reach-rohs" },
  { label: "ISO 9001:2015", desc: "Certified quality management system", href: "/compliance/iso-9001" },
  { label: "FSC Certified", desc: "Responsible forest sourcing", href: "/compliance/fsc-paper" },
  { label: "EU Food Contact", desc: "Food-safe labeling compliant", href: "/compliance/eu-food-contact" },
  { label: "SGS / Intertek", desc: "Third-party laboratory test reports", href: "/compliance/certificates" },
];

const EU_LOGISTICS = [
  { step: "Order Confirmed", time: "Day 0", detail: "Quote accepted, production slot reserved" },
  { step: "Production & QC", time: "Days 1–10", detail: "Manufacturing with ISO 9001 quality checks" },
  { step: "Export Clearance", time: "Days 11–13", detail: "FOB Qingdao — Chinese customs clearance" },
  { step: "Sea Freight", time: "Days 14–35", detail: "Qingdao → Hamburg / Rotterdam / Felixstowe / Le Havre / Gdańsk" },
  { step: "DDP Delivery", time: "Days 36–40", detail: "Customs cleared, delivered to your EU warehouse" },
];

const EU_FAQ = [
  {
    q: "Are your thermal paper products BPA-free and compliant with EU 2024/3190?",
    a: "Yes. All our thermal paper rolls and labels are available in BPA-free formulation, fully compliant with EU Commission Regulation 2024/3190 which banned BPA in thermal paper effective January 2, 2025. SGS third-party test reports are available on request at no charge.",
  },
  {
    q: "Do you provide REACH SVHC declarations and RoHS compliance documentation?",
    a: "Yes. We provide complete REACH SVHC declarations (Article 33), RoHS compliance certificates, and BPA-free test reports. Our compliance documentation pack is updated annually and accepted by EU customs authorities and major European retailers.",
  },
  {
    q: "Can you ship DDP (Delivered Duty Paid) to EU countries?",
    a: "Yes. We offer DDP shipping to Germany, UK, France, Netherlands, Poland, and most other EU member states. All customs duties, import VAT, and clearance fees are handled on our side — you receive goods at your warehouse door with no additional charges or paperwork.",
  },
  {
    q: "What are your standard delivery times to Europe?",
    a: "Sea freight from Qingdao to major European ports typically takes 18–30 days depending on destination: Hamburg (18–22 days), Rotterdam (20–24 days), Le Havre (20–25 days), Felixstowe (25–30 days), Gdańsk (22–28 days). Production takes 10–15 days. Total lead time including customs clearance is approximately 35–45 days.",
  },
  {
    q: "What is the minimum order quantity for European buyers?",
    a: "MOQ is 10,000 rolls for standard POS rolls, or 50,000 pieces for thermal labels. Volume discounts start at 50 cartons, with container-load pricing available for 200+ cartons. Small trial orders are welcome for first-time buyers to verify quality before committing to larger volumes.",
  },
  {
    q: "Do you provide samples for European buyers before placing a bulk order?",
    a: "Yes. We provide free samples for qualified buyers — standard sizes ship within 3–5 business days via international courier (DHL/FedEx). Custom-printed samples require 7 business days. Samples let you verify paper quality, print density, core fit, and packaging before committing to a production order.",
  },
];

const TRUST_SIGNALS = [
  { icon: <Factory className="w-4 h-4 text-blue-600" />, label: "500M+", sub: "Rolls/year capacity" },
  { icon: <Users className="w-4 h-4 text-blue-600" />, label: "500+", sub: "Distributors served" },
  { icon: <Globe className="w-4 h-4 text-blue-600" />, label: "80+", sub: "Countries supplied" },
  { icon: <Star className="w-4 h-4 text-blue-600" />, label: "15+", sub: "Years experience" },
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
        <section className="relative isolate overflow-hidden bg-[#0f1f2d] text-white">
          <SlotImage
            slotKey="geo.eu.hero"
            alt="Thermal paper rolls and labels manufacturing for European distribution"
            fill
            fetchPriority="high"
            loading="eager"
            sizes="100vw"
            quality={76}
            className="-z-20 object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,24,36,0.72)_0%,rgba(10,24,36,0.54)_48%,rgba(10,24,36,0.18)_82%,rgba(10,24,36,0.06)_100%)]" />

          <div className="container-site py-16 md:py-20 lg:py-24">
            <div className="flex items-center gap-4 mb-5">
              <span className="text-5xl drop-shadow-lg">🇪🇺</span>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-0.5 bg-blue-400 rounded-full" />
                  <span className="text-xs font-bold tracking-widest uppercase text-blue-200">European Union Market</span>
                </div>
                <h1 className="font-bold text-white leading-[1.08] text-4xl sm:text-5xl md:text-6xl">
                  Thermal Paper Supplier<br className="sm:hidden" /> Europe
                </h1>
              </div>
            </div>
            <p className="text-blue-50/90 text-lg max-w-2xl mb-5 leading-relaxed">
              REACH & RoHS compliant thermal paper rolls and labels for European distributors. BPA-free since before the 2025 ban. ISO 9001 certified factory with DDP shipping to Germany, UK, France, Netherlands, Poland, and beyond.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {["REACH Compliant", "RoHS Tested", "BPA-Free / BPS-Free", "ISO 9001", "DDP Europe", "Euro Pallet Shipping", "FSC Certified"].map((f) => (
                <span key={f} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-xs tracking-wide uppercase text-white shadow-sm">
                  <CheckCircle2 className="w-3 h-3 text-blue-300" />
                  {f}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/quote" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/30 text-sm">
                Get Europe Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/samples" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 hover:border-white/40 transition-all backdrop-blur-sm text-sm">
                Free Samples
              </Link>
            </div>
          </div>
        </section>

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
              <span>Lead time: <strong>35–45 days</strong> (production + sea freight + clearance)</span>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-blue-200 text-xs">DDP · FOB · CIF available to all EU member states</span>
            </div>
          </div>
        </section>

        {/* ── PRODUCT LINES ── */}
        <section className="py-20 bg-white border-b border-slate-100">
          <div className="container-site">
            <div className="max-w-3xl mb-10">
              <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
                Two product lines. EU compliance built in.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-500 max-w-2xl">
                Every product we ship to Europe is manufactured with BPA-free thermal coating, documented with REACH declarations, and packed for Euro pallet shipping. Select a product line to browse sizes and specifications.
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
                  European buyers have higher compliance standards than most markets. We built our export process around EU documentation requirements — every shipment includes the declarations your procurement team needs.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    "BPA-free certified since 2018 — years ahead of the EU 2025 ban",
                    "REACH SVHC declarations and RoHS certificates updated annually",
                    "German, French, Dutch, and Polish-language compliance documentation",
                    "Euro pallet (1200×800mm) packing standard for EU warehouses",
                    "DDP shipping to most EU countries — no customs burden on buyers",
                    "ISO 9001:2015 certified factory with full batch traceability",
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
              All compliance documents are issued by accredited third-party laboratories (SGS, Intertek) and updated annually. Request the full compliance pack for your procurement team — delivered within 24 hours.
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
                  ISO 9001 certificate, BPA-free SGS test report, REACH declaration, RoHS certificate, TDS — all in one package. Sent within 24 hours.
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
                <p className="font-bold text-slate-900 text-sm mb-1">Need faster delivery?</p>
                <p className="text-slate-500 text-xs">Air freight available for urgent orders (5–7 days). Contact us for air freight pricing and availability to your nearest EU airport.</p>
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
                  Launch your own thermal paper brand in Europe with our end-to-end OEM service. Custom logo printing, branded packaging in local languages, Pantone color matching, and NDA protection — all included. MOQ from 5,000 rolls.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    "Custom logo and back-print for European market branding",
                    "Pantone color matching — exact brand color reproduction",
                    "Local language packaging (German, French, Dutch, Polish, etc.)",
                    "Euro pallet packing with branded carton marks",
                    "NDA signed before any design work begins",
                    "7-day branded sample turnaround",
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
                    { label: "Minimum Order", value: "5,000 rolls" },
                    { label: "Sample Turnaround", value: "7 business days" },
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
          subtitle="Get a custom quote with full EU compliance documentation. Free samples for qualified buyers. DDP shipping to most EU countries."
        />
      </main>
      <Footer />
    </>
  );
}
