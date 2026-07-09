import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SlotImage from "@/components/ui/SlotImage";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import {
  COMPANY,
  COMPLIANCE_ITEMS,
  THERMAL_LABELS,
} from "@/lib/data";
import {
  THERMAL_ROLL_SCENARIOS,
} from "@/lib/marketInsights";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  CheckCircle2,
  Factory,
  FileCheck,
  Gauge,
  Layers3,
  Leaf,
  Mail,
  MapPin,
  Package,
  Ruler,
  ScanLine,
  Shield,
  ShieldCheck,
  Sparkles,
  Truck,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";

// ISR: homepage content can be refreshed from the admin settings without a full rebuild.
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Thermal Paper Rolls & Labels Manufacturer | Zhixin Paper",
  description:
    "Factory-direct thermal paper rolls and labels for distributors, importers, and private-label buyers. Request BPA-free grades, REACH, RoHS, FDA, Prop 65, FSC files, samples, and shipping terms.",
  path: "/",
  keywords: [
    "thermal paper rolls manufacturer",
    "BPA free thermal paper wholesale",
    "BPS free thermal paper supplier",
    "phenol free thermal paper manufacturer",
    "REACH compliant thermal paper supplier",
    "Prop 65 thermal paper rolls",
    "receipt paper rolls bulk",
    "80mm thermal paper rolls wholesale",
    "3 1/8 x 230 thermal paper wholesale",
    "57mm credit card terminal paper rolls",
    "POS receipt paper manufacturer",
    "thermal paper factory direct",
    "thermal paper importer supplier",
    "thermal paper distributor supplier",
    "OEM thermal paper manufacturer",
    "custom printed thermal paper rolls",
    "guaranteed length thermal paper rolls",
    "low dust thermal paper rolls",
    "end of roll warning thermal paper",
    "FSC certified thermal paper manufacturer",
    "FDA compliant thermal paper manufacturer",
    "thermal labels supplier",
    "4x6 shipping labels wholesale",
  ],
});

const COMPLIANCE_ICONS: Record<string, ReactNode> = {
  ShieldCheck: <ShieldCheck className="h-5 w-5" />,
  FileCheck: <FileCheck className="h-5 w-5" />,
  Award: <Award className="h-5 w-5" />,
  Leaf: <Leaf className="h-5 w-5" />,
  UtensilsCrossed: <UtensilsCrossed className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
};

const HERO_PROOF = [
  {
    icon: <Ruler className="h-5 w-5" />,
    title: "Guaranteed length",
    desc: "Quote by width, roll length, OD, core ID, and carton count.",
  },
  {
    icon: <ScanLine className="h-5 w-5" />,
    title: "Fits POS terminals",
    desc: "Epson, Star, Clover, Square, PAX, Verifone, and kiosk specs.",
  },
  {
    icon: <FileCheck className="h-5 w-5" />,
    title: "SGS / Intertek-ready files",
    desc: "BPA/BPS-free, REACH, Prop 65, FSC, FDA, and ISO support.",
  },
  {
    icon: <Package className="h-5 w-5" />,
    title: "Moisture-safe packing",
    desc: "Shrink-wrap, reinforced cartons, pallet marks, and export terms.",
  },
];

const QUICK_QUOTE_ITEMS = [
  {
    icon: <Ruler className="h-5 w-5" />,
    label: "Paper spec",
    value: "Width, length, GSM, coating, color, end-of-roll stripe",
  },
  {
    icon: <Gauge className="h-5 w-5" />,
    label: "Roll fit",
    value: "Outer diameter, core ID, winding direction, printer model",
  },
  {
    icon: <Wrench className="h-5 w-5" />,
    label: "Use case",
    value: "POS receipt, credit terminal, kitchen ticket, parking, OEM",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    label: "Destination files",
    value: "EU, USA, Canada, REACH, Prop 65, FDA, FSC, DDP",
  },
];

const VOC_RISK_MAP = [
  {
    risk: "Fading receipts",
    buyerSignal: "Tax, chargeback, and audit receipts become unreadable too soon.",
    response: "Match image life, sensitivity, top-coat, and storage requirement before sampling.",
  },
  {
    risk: "Short rolls",
    buyerSignal: "Rolls marked 230 ft measure shorter, creating distributor claims.",
    response: "Quote measured length, OD, GSM, and packing count with sample confirmation.",
  },
  {
    risk: "Core or OD mismatch",
    buyerSignal: "Clover, Square, PAX, or Verifone terminals reject or jam rolls.",
    response: "Confirm terminal model, core ID, outer diameter, and winding direction.",
  },
  {
    risk: "Chemical odor",
    buyerSignal: "Staff associate odor with unsafe BPA/BPS substitutes.",
    response: "Offer BPA-free, BPS-free, phenol-free, and low-odor grades with documents.",
  },
  {
    risk: "Damaged packaging",
    buyerSignal: "Crushed cartons and humidity damage roll edges before use.",
    response: "Use shrink-wrap units, stronger cartons, pallet labels, and moisture planning.",
  },
  {
    risk: "Fake compliance files",
    buyerSignal: "Buyers distrust old PDF certificates or sample-only claims.",
    response: "Prepare current test reports, batch records, and QR-verifiable files when required.",
  },
];

const ROLL_PRODUCT_ROUTES = [
  {
    href: "/products/thermal-paper-rolls/standard-pos-rolls",
    title: "POS receipt rolls",
    spec: "80mm, 57mm, 3 1/8 in x 230 ft",
    buyer: "Retail chains, restaurants, distributors, FBA sellers",
    proof: "Guaranteed length, clear print, end-of-roll warning",
  },
  {
    href: "/products/thermal-paper-rolls/standard-pos-rolls",
    title: "Credit card terminal rolls",
    spec: "57mm compact OD, 50 ft / 85 ft programs",
    buyer: "Merchant service providers, mobile payment terminals",
    proof: "Core ID, OD, and winding direction control",
  },
  {
    href: "/industries/retail-pos",
    title: "Kitchen ticket paper",
    spec: "Top-coated, heat and oil resistant options",
    buyer: "QSR chains, foodservice distributors, POS integrators",
    proof: "Heat-lamp resistance and low-odor coating options",
  },
  {
    href: "/products/thermal-paper-rolls/parking-ticketing-rolls",
    title: "Parking and ticket rolls",
    spec: "80mm kiosk, 57mm handheld, black-mark formats",
    buyer: "Parking operators, ticket systems, integrators",
    proof: "Jam control, UV planning, barcode readability",
  },
  {
    href: "/compliance/phenol-free",
    title: "BPA / BPS / phenol-free rolls",
    spec: "REACH, Prop 65, FSC, FDA document packs",
    buyer: "EU importers, ESG retailers, healthcare, public buyers",
    proof: "Compliance-first grades with current test report support",
  },
];

const COMPLIANCE_PROOF = [
  {
    title: "EU route",
    href: "/eu",
    desc: "REACH, RoHS, FSC, BPA-free, phenol-free, and food-contact document checks.",
  },
  {
    title: "USA route",
    href: "/us",
    desc: "FDA files, Prop 65 support, pallet pricing, private-label cartons, and DDP options.",
  },
  {
    title: "Canada route",
    href: "/ca",
    desc: "Bilingual document requests, BPA-free grades, common sizes, and freight terms.",
  },
];

const COMPLIANCE_CARD_COPY = [
  {
    slug: "bpa-free",
    desc: "BPA-free roll grades for retail, foodservice, EU, and North American buyers.",
    meta: "Handling safety",
  },
  {
    slug: "reach-rohs",
    desc: "REACH SVHC and RoHS declarations for import review and buyer onboarding.",
    meta: "EU import files",
  },
  {
    slug: "iso-9001",
    desc: "ISO-managed production records, in-process checks, and finished goods control.",
    meta: "Factory system",
  },
  {
    slug: "fsc-paper",
    desc: "FSC paper options for retailers and distributors with sustainability requirements.",
    meta: "Sourcing proof",
  },
  {
    slug: "fda-us",
    desc: "FDA document support for US food-contact, medical, and packaging applications.",
    meta: "US compliance",
  },
  {
    slug: "phenol-free",
    desc: "Phenol-free options for buyers moving beyond BPA-free and BPS substitutions.",
    meta: "Premium grade",
  },
];

const QUALITY_CHECKS = [
  {
    icon: <Factory className="h-5 w-5" />,
    title: "Batch and sample control",
    desc: "Approve samples against roll size, core ID, coating, image life, carton marks, and certificate needs.",
  },
  {
    icon: <Layers3 className="h-5 w-5" />,
    title: "Packing for repeat orders",
    desc: "Plan shrink-wrap units, carton strength, pallet patterns, and mixed SKU loading before shipment.",
  },
  {
    icon: <Truck className="h-5 w-5" />,
    title: "Export shipping terms",
    desc: "Compare FOB, CIF, and DDP options for carton, pallet, and container thermal paper programs.",
  },
];

const LABEL_CROSS_SELL = [
  {
    href: "/products/thermal-labels/direct-thermal-labels",
    title: "Direct thermal labels",
    desc: "4x6 shipping, barcode, carton, and retail labels for warehouse buyers.",
  },
  {
    href: "/products/thermal-labels/freezer-cold-chain-labels",
    title: "Freezer and cold chain labels",
    desc: "Cold-storage adhesive and legible print for food and logistics use cases.",
  },
  {
    href: "/products/thermal-labels/custom-printed-labels",
    title: "Custom printed labels",
    desc: "Logo, QR code, color, and private-label formats for repeat buyers.",
  },
];

export default function HomePage() {
  const jsonLd = [breadcrumbSchema([{ name: "Home", url: "/" }])];
  const featuredLabels = THERMAL_LABELS.slice(0, 3);
  const complianceCards = COMPLIANCE_CARD_COPY.map((card) => {
    const item = COMPLIANCE_ITEMS.find((complianceItem) => complianceItem.slug === card.slug);
    return item ? { ...card, icon: item.icon, name: item.name } : null;
  }).filter((card): card is NonNullable<typeof card> => card !== null);

  return (
    <>
      <Header />
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <main id="main-content" className="bg-white pt-[88px]">
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0">
            <SlotImage
              slotKey="home.hero"
              fill
              sizes="100vw"
              className="object-cover object-[62%_center] opacity-55 saturate-[0.95]"
              preload
              quality={78}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.98)_0%,rgba(15,23,42,0.91)_48%,rgba(15,23,42,0.64)_74%,rgba(15,23,42,0.42)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950 via-slate-950/72 to-transparent" />
          </div>

          <div className="container-site relative z-10 grid min-h-[720px] gap-10 py-12 xl:grid-cols-2 xl:items-center xl:py-16 xl:min-h-[760px]">
            <div className="max-w-4xl">
              <div className="mb-6 inline-flex items-center gap-3 border border-white/20 bg-white/[0.08] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-sky-100 backdrop-blur-sm">
                <span className="h-2 w-2 bg-emerald-400" />
                ISO 9001 thermal paper manufacturer · Since {COMPANY.founded}
              </div>

              <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.04] tracking-normal text-white sm:text-5xl lg:text-6xl">
                Verified thermal paper rolls for buyers who cannot risk short rolls or fake files
              </h1>

              <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-slate-200 md:text-lg">
                Factory-direct POS, credit terminal, kitchen, parking, and BPA/BPS-free thermal rolls
                for distributors and importers. Confirm roll length, core fit, compliance files, samples,
                packaging, and shipping terms before bulk production.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/quote"
                  className="inline-flex min-h-12 items-center justify-center gap-2 bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-[0_18px_45px_rgba(37,99,235,0.28)] transition hover:bg-blue-500"
                >
                  Request a Verified Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/samples"
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/24 bg-white/[0.08] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/45 hover:bg-white/[0.14]"
                >
                  Request Samples and Files
                </Link>
              </div>

              <div className="mt-10 grid max-w-4xl gap-px bg-white/14 sm:grid-cols-2 xl:grid-cols-4">
                {HERO_PROOF.map((item) => (
                  <div key={item.title} className="bg-slate-950/58 p-4 pr-16 backdrop-blur-sm sm:pr-4">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center bg-white/[0.08] text-sky-200">
                      {item.icon}
                    </div>
                    <h2 className="text-base font-bold tracking-normal text-white">{item.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="border border-white/16 bg-white/[0.08] p-5 shadow-[0_24px_90px_rgba(2,6,23,0.35)] backdrop-blur-md lg:p-6 xl:max-w-[440px] xl:justify-self-end">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-200">Quote checklist</p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-normal text-white">
                Send four details. Get the right roll, file pack, and freight option.
              </h2>
              <div className="mt-6 grid gap-3">
                {QUICK_QUOTE_ITEMS.map((item) => (
                  <div key={item.label} className="grid grid-cols-[44px_minmax(0,1fr)] gap-3 border border-white/12 bg-slate-950/42 p-3 pr-16 sm:pr-3">
                    <span className="flex h-11 w-11 items-center justify-center bg-white/[0.08] text-sky-200">
                      {item.icon}
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-white">{item.label}</span>
                      <span className="mt-1 block text-sm leading-6 text-slate-300">{item.value}</span>
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/quote"
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
              >
                Start RFQ
                <ArrowRight className="h-4 w-4" />
              </Link>
            </aside>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="container-site grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Standard MOQ", value: "10k rolls" },
              { label: "Quote response", value: "24 hours" },
              { label: "Export terms", value: "FOB / CIF / DDP" },
              { label: "Main routes", value: "EU / USA / Canada" },
            ].map((item) => (
              <div key={item.label} className="bg-white px-5 py-5">
                <div className="text-2xl font-extrabold tracking-normal text-slate-950">{item.value}</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container-site">
            <SectionIntro
              eyebrow="Buyer risk map"
              title="Turn common thermal paper complaints into quote checks."
              desc="The Feishu research pointed to the same purchasing risks across POS, payment terminals, kitchen tickets, parking tickets, and BPA-free premium rolls. The homepage now makes those risks visible before the buyer asks."
            />

            <div className="mt-10 grid gap-px bg-slate-200 md:grid-cols-2 xl:grid-cols-3">
              {VOC_RISK_MAP.map((item) => (
                <article key={item.risk} className="bg-white p-5 md:p-6">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center bg-blue-50 text-blue-700">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-extrabold tracking-normal text-slate-950">{item.risk}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.buyerSignal}</p>
                  <p className="mt-4 border-t border-slate-200 pt-4 text-sm font-bold leading-6 text-slate-900">
                    {item.response}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container-site">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <p className="section-label">Thermal paper roll routes</p>
                <h2 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-normal text-slate-950 md:text-5xl">
                  Choose by the failure you need to prevent.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
                  Start with the buyer's use case, then lock the roll size, terminal fit, coating, certificate,
                  packaging, and repeat-order terms.
                </p>
                <div className="mt-8 overflow-hidden border border-slate-200">
                  <div className="relative aspect-[16/11] min-h-[280px] bg-slate-100">
                    <SlotImage
                      slotKey="home.product.thermal-rolls"
                      fill
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent p-5 text-white">
                      <h3 className="text-xl font-bold text-white">Thermal paper rolls first</h3>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                        POS receipt, payment terminal, kitchen ticket, parking, ticketing, and custom printed programs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                {ROLL_PRODUCT_ROUTES.map((route, index) => (
                  <Link
                    key={route.title}
                    href={route.href}
                    className="group grid gap-4 border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:bg-slate-50 sm:grid-cols-[48px_minmax(0,1fr)_auto]"
                  >
                    <span className="flex h-12 w-12 items-center justify-center bg-slate-950 text-sm font-extrabold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-xl font-extrabold tracking-normal text-slate-950 transition group-hover:text-blue-700">
                        {route.title}
                      </span>
                      <span className="mt-2 block text-sm font-semibold leading-6 text-slate-700">{route.spec}</span>
                      <span className="mt-2 block text-sm leading-6 text-slate-600">{route.buyer}</span>
                      <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-emerald-700">
                        <BadgeCheck className="h-4 w-4" />
                        {route.proof}
                      </span>
                    </span>
                    <span className="self-center text-blue-700">
                      <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-950 py-16 text-white md:py-20">
          <div className="container-site">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-300">Compliance proof</p>
                <h2 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-normal text-white md:text-4xl">
                  Make the certificate pack part of the quote, not an afterthought.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                  Buyers in Europe and North America increasingly ask for BPA-free, BPS-free, phenol-free,
                  REACH, Prop 65, FSC, FDA, and ISO proof before approving new suppliers.
                </p>
              </div>

              <div className="border border-white/10 bg-white/[0.05] p-5 md:p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-blue-600 text-white">
                    <FileCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-extrabold tracking-normal text-white">Document pack before deposit</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Attach the right files to the RFQ stage so procurement, compliance, and sales teams can review the grade early.
                    </p>
                  </div>
                </div>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {["Current test reports", "Material declarations", "Batch and sample records", "Market route notes"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />
                      {item}
                    </div>
                  ))}
                </div>
                <Link
                  href="/compliance"
                  className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
                >
                  View Compliance Routes
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {complianceCards.map((item) => (
                <Link
                  key={item.slug}
                  href={`/compliance/${item.slug}`}
                  className="group border border-white/10 bg-white/[0.045] p-5 transition hover:border-sky-300/35 hover:bg-white/[0.08]"
                >
                  <span className="mb-4 flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center bg-white/[0.08] text-sky-200 transition group-hover:bg-blue-600 group-hover:text-white">
                      {COMPLIANCE_ICONS[item.icon]}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{item.meta}</span>
                  </span>
                  <span className="block text-lg font-extrabold tracking-normal text-white">{item.name}</span>
                  <span className="mt-3 block text-sm leading-6 text-slate-400">{item.desc}</span>
                </Link>
              ))}
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {COMPLIANCE_PROOF.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="group border border-white/10 bg-slate-900/70 p-5 transition hover:border-sky-300/40 hover:bg-slate-900"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-base font-extrabold tracking-normal text-white">{route.title}</span>
                    <ArrowRight className="h-4 w-4 text-slate-500 transition group-hover:translate-x-1 group-hover:text-sky-300" />
                  </span>
                  <span className="mt-3 block text-sm leading-6 text-slate-400">{route.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container-site">
            <SectionIntro
              eyebrow="Factory and packing"
              title="Protect the roll before it reaches the printer."
              desc="A good quote has more than a unit price. It confirms sample checks, carton protection, pallet loading, and export terms for repeat supply."
            />

            <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-stretch">
              <div className="grid gap-px bg-slate-200 md:grid-cols-3">
                {QUALITY_CHECKS.map((item) => (
                  <article key={item.title} className="bg-slate-50 p-6">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center bg-white text-blue-700 shadow-sm">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-extrabold tracking-normal text-slate-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.desc}</p>
                  </article>
                ))}
              </div>

              <div className="relative min-h-[360px] overflow-hidden bg-slate-900">
                <SlotImage
                  slotKey="home.factory-overview"
                  fill
                  sizes="(min-width: 1024px) 36vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/92 via-slate-950/28 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <Factory className="mb-4 h-7 w-7 text-sky-300" />
                  <h3 className="text-2xl font-extrabold tracking-normal text-white">Traceable production</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Batch records, material checks, roll drawings, carton plans, and certificate requests stay tied to the order.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container-site">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <p className="section-label">Secondary product route</p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-normal text-slate-950 md:text-5xl">
                  Add thermal labels when the same buyer also handles fulfillment.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                  Keep thermal paper rolls as the homepage lead, then cross-sell labels for warehouse,
                  cold-chain, retail, and private-label programs.
                </p>
                <Link
                  href="/products/thermal-labels"
                  className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:border-blue-400 hover:text-blue-700"
                >
                  View Thermal Labels
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {LABEL_CROSS_SELL.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:bg-slate-50"
                  >
                    <div className="mb-5 flex h-11 w-11 items-center justify-center bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-extrabold tracking-normal text-slate-950 transition group-hover:text-blue-700">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
              {featuredLabels.map((label) => (
                <Link
                  key={label.slug}
                  href={`/products/thermal-labels/${label.slug}`}
                  className="group bg-white p-5 transition hover:bg-slate-50"
                >
                  <span className="text-sm font-bold text-blue-700">Thermal label</span>
                  <h3 className="mt-2 text-lg font-extrabold tracking-normal text-slate-950 transition group-hover:text-blue-700">
                    {label.name}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{label.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container-site">
            <SectionIntro
              eyebrow="Detailed buying scenarios"
              title="When buyers already know the application, send them straight to the right roll."
              desc="These paths preserve the current product database while making the homepage more specific to the risks importers and distributors evaluate."
            />

            <div className="mt-10 grid gap-px bg-slate-200 md:grid-cols-2 xl:grid-cols-3">
              {THERMAL_ROLL_SCENARIOS.slice(0, 6).map((scenario) => (
                <Link
                  key={scenario.scenario}
                  href={scenario.href}
                  className="group bg-white p-5 transition hover:bg-slate-50"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                    {scenario.commonSpec}
                  </span>
                  <h3 className="mt-3 text-xl font-extrabold tracking-normal text-slate-950 transition group-hover:text-blue-700">
                    {scenario.scenario}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{scenario.buyerRisk}</p>
                  <div className="mt-5 border-t border-slate-200 pt-4 text-sm font-bold leading-6 text-slate-900">
                    Ask for: {scenario.askFor}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#071525] py-16 text-white">
          <div className="container-site grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex items-start gap-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-blue-600">
                <Mail className="h-6 w-6" />
              </span>
              <div>
                <h2 className="text-2xl font-extrabold tracking-normal text-white md:text-3xl">
                  Send the roll spec, target terminal, destination, and document list. We will quote the product, packing, samples, and shipping terms.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                  Include BPA/BPS-free, REACH, Prop 65, FDA, FSC, phenol-free, private-label, carton, pallet,
                  or DDP requirements if they affect your buyer's approval.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/quote"
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
              >
                Request a Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/samples"
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Request Samples
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function SectionIntro({
  desc,
  eyebrow,
  title,
}: {
  desc: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:items-end">
      <div>
        <p className="section-label">{eyebrow}</p>
        <h2 className="mt-3 max-w-4xl text-3xl font-extrabold tracking-normal text-slate-950 md:text-5xl">
          {title}
        </h2>
      </div>
      <p className="max-w-2xl text-sm leading-7 text-slate-600 lg:justify-self-end">
        {desc}
      </p>
    </div>
  );
}
