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
  title: "Canada Thermal Paper Supplier — Health Canada Compliant | Zhixin Paper",
  description:
    "BPA-free thermal paper rolls and labels for Canadian distributors. Health Canada compliant, Cannabis Act labels, bilingual EN/FR documentation. DDP shipping via Vancouver or Montreal.",
  path: "/ca",
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
    alt: "BPA-free thermal paper rolls for Canadian retail and POS systems",
    copy: "Standard POS, payment terminal, ATM, lottery, and gaming rolls — BPA-free, Health Canada compliant, compatible with all Canadian retail and gaming printer brands.",
    specs: ["3 1/8\" & 80mm POS rolls", "BPA-free / BPS-free grades", "Lottery & gaming certified"],
  },
  {
    title: "Thermal Labels",
    href: "/products/thermal-labels",
    slotKey: "home.product.thermal-labels" as const,
    alt: "Direct thermal shipping and barcode labels for Canadian logistics",
    copy: "Direct thermal labels for shipping, barcode, retail, cannabis, and food applications. Cannabis Act compliant label options for all provinces. Bilingual packaging available.",
    specs: ["4x6\" & 100×150mm shipping", "Cannabis Act compliant die-cuts", "Permanent & removable adhesive"],
  },
];

const CA_COMPLIANCE = [
  { label: "Health Canada", desc: "Compliant substrates & documentation", href: "/compliance/fda-us" },
  { label: "Cannabis Act", desc: "Provincial labeling compliance", href: "/ca/cannabis-labels" },
  { label: "BPA-Free", desc: "BPA/BPS-free certified by SGS", href: "/compliance/bpa-free" },
  { label: "ISO 9001:2015", desc: "Certified quality management", href: "/compliance/iso-9001" },
  { label: "FSC Certified", desc: "Responsible forest sourcing", href: "/compliance/fsc-paper" },
  { label: "CEPA Compliant", desc: "Canadian Environmental Protection Act", href: "/compliance/reach-rohs" },
];

const CA_LOGISTICS = [
  { step: "Order Confirmed", time: "Day 0", detail: "Quote accepted, production slot reserved" },
  { step: "Production & QC", time: "Days 1–10", detail: "Manufacturing with ISO 9001 quality checks" },
  { step: "Export Clearance", time: "Days 11–13", detail: "FOB Qingdao — Chinese customs clearance" },
  { step: "Sea Freight", time: "Days 14–28", detail: "Qingdao → Vancouver (10–15 days) or Montreal (22–26 days)" },
  { step: "DDP Delivery", time: "Days 29–33", detail: "Customs cleared, delivered to your Canadian warehouse" },
];

const CA_FAQ = [
  {
    q: "Are your thermal paper products compliant with Canadian regulations?",
    a: "Yes. Our thermal paper products are manufactured with BPA-free coatings and comply with the Canadian Environmental Protection Act (CEPA). We provide full Health Canada compliance documentation for applicable product grades, including BPA-free certifications and third-party SGS test reports.",
  },
  {
    q: "Do you provide bilingual English/French documentation for Quebec and federal requirements?",
    a: "Yes. We provide bilingual EN/FR compliance documentation, including BPA-free certificates, ISO 9001 certificates, technical data sheets, and packaging labels. This is particularly important for Quebec-based distributors and for meeting federal bilingual labeling requirements.",
  },
  {
    q: "Can you supply Cannabis Act compliant labels for Canadian provinces?",
    a: "Yes. We manufacture thermal labels that meet the Cannabis Act and provincial regulations for Ontario (OCS), British Columbia (BCLDB), Alberta (AGLC), Quebec (SQDC), and all other provinces. Labels include mandatory health warnings, THC symbols, excise stamps where applicable, and bilingual text as required.",
  },
  {
    q: "Do you offer DDP shipping to Canadian addresses?",
    a: "Yes. We offer DDP (Delivered Duty Paid) shipping to any Canadian destination via Vancouver (Prince Rupert) or Montreal ports. All customs duties, GST/HST, and clearance fees are handled on our side — you receive goods at your warehouse door with no additional charges.",
  },
  {
    q: "What are your delivery times to Canada?",
    a: "Sea freight from Qingdao to Vancouver takes 10–15 days, making Western Canada our fastest North American route. Montreal delivery takes 22–26 days. With 10–15 days production, total lead time is approximately 25–40 days depending on destination. Air freight is available for urgent orders.",
  },
  {
    q: "What is the minimum order quantity for Canadian buyers?",
    a: "MOQ is 10,000 rolls for standard POS rolls or 50,000 pieces for thermal labels. We offer flexible pallet-load (LCL) pricing for smaller orders and full container load (FCL) pricing for volume buyers. Samples are available for first-time buyers to verify quality before committing to larger volumes.",
  },
];

const TRUST_SIGNALS = [
  { icon: <Factory className="w-4 h-4 text-red-600" />, label: "500M+", sub: "Rolls/year capacity" },
  { icon: <Users className="w-4 h-4 text-red-600" />, label: "500+", sub: "Distributors served" },
  { icon: <Globe className="w-4 h-4 text-red-600" />, label: "80+", sub: "Countries supplied" },
  { icon: <Star className="w-4 h-4 text-red-600" />, label: "15+", sub: "Years experience" },
];

export default function CanadaPage() {
  const jsonLd = [
    organizationSchema(),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Canada", url: "/ca" },
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
        <section className="relative isolate overflow-hidden bg-[#1f0d0d] text-white">
          <SlotImage
            slotKey="geo.ca.hero"
            alt="Thermal paper rolls and labels manufacturing for Canadian distribution"
            fill
            fetchPriority="high"
            loading="eager"
            sizes="100vw"
            quality={76}
            className="-z-20 object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(20,8,8,0.68)_0%,rgba(20,8,8,0.48)_48%,rgba(20,8,8,0.18)_82%,rgba(20,8,8,0.05)_100%)]" />

          <div className="container-site py-16 md:py-20 lg:py-24">
            <div className="flex items-center gap-4 mb-5">
              <span className="text-5xl drop-shadow-lg">🇨🇦</span>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-0.5 bg-red-400 rounded-full" />
                  <span className="text-xs font-bold tracking-widest uppercase text-red-200">Canada Market</span>
                </div>
                <h1 className="font-bold text-white leading-[1.08] text-4xl sm:text-5xl md:text-6xl">
                  Thermal Paper Supplier<br className="sm:hidden" /> Canada
                </h1>
              </div>
            </div>
            <p className="text-red-50/90 text-lg max-w-2xl mb-5 leading-relaxed">
              Health Canada compliant, BPA-free thermal paper rolls and labels for Canadian distributors and importers. Cannabis Act compliant labels for all provinces. Bilingual EN/FR documentation available. DDP shipping via Vancouver (10–15 days) or Montreal (22–26 days).
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {["Health Canada Compliant", "BPA-Free / BPS-Free", "Cannabis Act Labels", "ISO 9001", "DDP Canada", "Bilingual EN/FR Docs", "FSC Certified"].map((f) => (
                <span key={f} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-xs tracking-wide uppercase text-white shadow-sm">
                  <CheckCircle2 className="w-3 h-3 text-red-300" />
                  {f}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/quote" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold transition-all shadow-lg shadow-red-600/30 text-sm">
                Get Canada Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/samples" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 hover:border-white/40 transition-all backdrop-blur-sm text-sm">
                Free Samples
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
                      Cannabis Act compliant thermal labels for all Canadian provinces. Confirm bilingual requirements, excise stamp integration, health warning placement, and provincial-specific regulations.
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
              <span>Lead time: <strong>25–40 days</strong> (production + sea freight + clearance)</span>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-red-200 text-xs">DDP · FOB · CIF available — GST/HST included in DDP</span>
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
                Every product we ship to Canada is manufactured with BPA-free thermal coating, documented with Health Canada compliance declarations, and packed for Canadian pallet standards. Bilingual labeling included.
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
                  Canada has unique bilingual, regulatory, and logistics requirements. We built our export process around Canadian customs and provincial regulations — every shipment includes the documentation your procurement team and provincial regulators need.
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
              All compliance documents are issued by accredited third-party laboratories (SGS, Intertek) and updated annually. Bilingual EN/FR documentation available for Quebec and federal requirements. Request the full compliance pack within 24 hours.
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
                  Health Canada compliance documentation, BPA-free SGS test report, ISO 9001 certificate, CEPA declaration, bilingual TDS — all in one package. Sent within 24 hours.
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
              From order confirmation to delivery at your Canadian warehouse — Vancouver is our fastest North American route at just 10–15 days sea freight from Qingdao.
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
                <p className="font-bold text-slate-900 text-sm mb-1">Need faster delivery?</p>
                <p className="text-slate-500 text-xs">Air freight available for urgent orders (5–7 days to YVR, YUL, or YYZ). Contact us for air freight pricing and availability to your nearest Canadian airport.</p>
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
                  Launch your own thermal paper brand in Canada with our end-to-end OEM service. Custom logo printing, branded bilingual packaging, Pantone color matching, and NDA protection — all included. MOQ from 5,000 rolls.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    "Custom logo and back-print for Canadian market branding",
                    "Pantone color matching — exact brand color reproduction",
                    "Bilingual EN/FR packaging for Quebec and federal compliance",
                    "Canadian-standard pallet packing with branded carton marks",
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

        {/* ── CANADA FAQ ── */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-2">
              <Layers className="w-5 h-5 text-red-600" />
              <h2 className="font-bold text-slate-900 text-2xl md:text-4xl">
                Frequently Asked Questions — Canada
              </h2>
            </div>
            <p className="text-slate-500 text-base mb-10 max-w-2xl">
              Common questions from Canadian distributors and importers about our products, compliance, bilingual documentation, and logistics.
            </p>
            <div className="space-y-4 max-w-3xl">
              {CA_FAQ.map((item, i) => (
                <div key={i} className="bg-white border border-slate-200 p-6">
                  <p className="font-bold text-slate-900 text-sm mb-2">{item.q}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner
          title="Ready to source for Canada?"
          subtitle="Get a custom quote with full Health Canada compliance documentation and bilingual labeling. Free samples for qualified buyers. DDP shipping to any Canadian destination."
        />
      </main>
      <Footer />
    </>
  );
}
