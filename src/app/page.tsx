import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SlotImage from "@/components/ui/SlotImage";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import {
  BLOG_POSTS,
  COMPANY,
  COMPLIANCE_ITEMS,
  GEO_REGIONS,
  INDUSTRIES,
  THERMAL_LABELS,
  THERMAL_PAPER_ROLLS,
} from "@/lib/data";
import { BUYING_SCENARIOS, HOMEPAGE_BUYER_PROBLEMS } from "@/lib/marketInsights";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Boxes,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Factory,
  FileCheck,
  Globe,
  Heart,
  Layers3,
  Leaf,
  Mail,
  MapPin,
  Package,
  Ruler,
  Shield,
  ShieldCheck,
  ShoppingCart,
  Snowflake,
  Star,
  Ticket,
  Truck,
  UtensilsCrossed,
  Wrench,
  Zap,
} from "lucide-react";

// ISR: homepage content can be refreshed from the admin settings without a full rebuild.
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Thermal Paper Supplier for Europe, USA & Canada | Zhixin Paper",
  description:
    "Thermal paper rolls and labels for distributors in Europe, the USA, and Canada. Ask for BPA-free grades, REACH, RoHS, FDA, Prop 65, or FSC documents before ordering.",
  path: "/",
  keywords: [
    "thermal paper supplier Europe",
    "thermal paper supplier USA",
    "thermal paper supplier Canada",
    "thermal paper North America",
    "BPA free thermal paper Europe",
    "FDA compliant thermal paper USA",
    "REACH compliant thermal paper supplier",
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
  ShieldCheck: <ShieldCheck className="h-5 w-5" />,
  FileCheck: <FileCheck className="h-5 w-5" />,
  Award: <Award className="h-5 w-5" />,
  Leaf: <Leaf className="h-5 w-5" />,
  UtensilsCrossed: <UtensilsCrossed className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
};

const INDUSTRY_ICONS: Record<string, React.ReactNode> = {
  ShoppingCart: <ShoppingCart className="h-5 w-5" />,
  Ticket: <Ticket className="h-5 w-5" />,
  Coins: <Star className="h-5 w-5" />,
  Building2: <Building2 className="h-5 w-5" />,
  Heart: <Heart className="h-5 w-5" />,
  Snowflake: <Snowflake className="h-5 w-5" />,
  Package: <Package className="h-5 w-5" />,
  Bus: <Truck className="h-5 w-5" />,
  Wrench: <Wrench className="h-5 w-5" />,
  Calendar: <Clock className="h-5 w-5" />,
  Scale: <Shield className="h-5 w-5" />,
  Leaf: <Leaf className="h-5 w-5" />,
};

const TRUST_ITEMS = [
  { icon: <Award className="h-4 w-4" />, text: "ISO 9001:2015" },
  { icon: <Leaf className="h-4 w-4" />, text: "BPA-free grades" },
  { icon: <ClipboardCheck className="h-4 w-4" />, text: "REACH / RoHS" },
  { icon: <ShieldCheck className="h-4 w-4" />, text: "FSC and FDA files" },
  { icon: <Globe className="h-4 w-4" />, text: "EU, USA, Canada" },
  { icon: <Truck className="h-4 w-4" />, text: "FOB, CIF, DDP" },
];

const HERO_PROOF = [
  { label: "Standard MOQ", value: "10k rolls", icon: <Boxes className="h-4 w-4" /> },
  { label: "Quote response", value: "24 hours", icon: <Clock className="h-4 w-4" /> },
  { label: "Custom sizes", value: "80mm, 57mm, 4x6", icon: <Ruler className="h-4 w-4" /> },
];

const QUICK_QUOTE_ITEMS = [
  { icon: <Ruler className="h-4 w-4" />, label: "Size", value: "Width, length, core, label format" },
  { icon: <Boxes className="h-4 w-4" />, label: "Volume", value: "Trial, pallet, mixed SKU, container" },
  { icon: <MapPin className="h-4 w-4" />, label: "Destination", value: "EU, USA, Canada, port, DDP" },
  { icon: <FileCheck className="h-4 w-4" />, label: "Documents", value: "BPA-free, REACH, FDA, FSC, ISO" },
];

const SERVICE_PROMISES = [
  {
    icon: <Clock className="h-5 w-5" />,
    title: "24-hour quote path",
    desc: "Send the spec, destination, and monthly volume. We return product options, sample plan, and freight direction.",
  },
  {
    icon: <FileCheck className="h-5 w-5" />,
    title: "Documents before order",
    desc: "Check the files your market asks for before deposit, including BPA-free, REACH, RoHS, FDA, Prop 65, FSC, and ISO.",
  },
  {
    icon: <Truck className="h-5 w-5" />,
    title: "Regional shipping terms",
    desc: "Quote FOB, CIF, or DDP options for distributors and importers serving Europe, the United States, and Canada.",
  },
  {
    icon: <BadgeCheck className="h-5 w-5" />,
    title: "OEM-ready packaging",
    desc: "Plan private-label rolls, cartons, labels, pallet marks, and repeat specs before the bulk run starts.",
  },
];

const SOURCING_STEPS = [
  {
    title: "Send the buying details",
    desc: "Share size, quantity, printer model or use case, destination, and the documents your market needs.",
  },
  {
    title: "Confirm sample and documents",
    desc: "Check roll sensitivity, label adhesive, packaging, certificate files, and carton details before scaling.",
  },
  {
    title: "Lock price and shipping",
    desc: "Agree pallet pricing, mixed-SKU cartons, container loads, FOB, CIF, or DDP terms around repeat orders.",
  },
  {
    title: "Repeat the approved spec",
    desc: "Keep batch records, artwork, carton marks, and reorder specs stable for your regional sales channel.",
  },
];

export default function HomePage() {
  const featuredRolls = THERMAL_PAPER_ROLLS.slice(0, 6);
  const featuredLabels = THERMAL_LABELS.slice(0, 6);
  const featuredIndustries = INDUSTRIES.slice(0, 8);
  const featuredPosts = BLOG_POSTS.slice(0, 3);

  const jsonLd = [breadcrumbSchema([{ name: "Home", url: "/" }])];

  return (
    <>
      <Header />
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <main id="main-content" className="pt-[88px]">
        <section className="relative overflow-hidden bg-[#071525] text-white">
          <div className="absolute inset-0">
            <SlotImage
              slotKey="home.hero"
              fill
              sizes="100vw"
              className="object-cover object-[58%_center] opacity-[0.74]"
              preload
              quality={75}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,10,25,0.96)_0%,rgba(7,21,37,0.78)_46%,rgba(7,21,37,0.22)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#071525] to-transparent" />
          </div>

          <div className="container-site relative z-10 flex min-h-[78vh] items-center py-16 lg:py-24">
            <div className="max-w-3xl">
              <div className="mb-7 inline-flex items-center gap-3 border border-white/12 bg-white/[0.08] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-100 backdrop-blur-sm">
                <span className="h-2 w-2 bg-emerald-400" />
                ISO 9001 certified manufacturer · Est. 2010
              </div>

              <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.04] tracking-normal text-white sm:text-5xl lg:text-7xl">
                Regional thermal paper supply for Europe, USA and Canada
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-200 md:text-lg">
                Thermal paper rolls and labels for distributors in Europe, the United States, and Canada. Send your size, volume, destination, and compliance needs. We reply with samples, documents, and shipping options.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-[0_18px_45px_rgba(37,99,235,0.28)] transition hover:bg-blue-500"
                >
                  Request a Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/samples"
                  className="inline-flex items-center justify-center gap-2 border border-white/22 bg-white/[0.08] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white/[0.14]"
                >
                  Request Free Samples
                </Link>
              </div>

              <div className="mt-10 grid max-w-2xl gap-6 border-t border-white/12 pt-7 sm:grid-cols-3">
                {HERO_PROOF.map((item) => (
                  <div key={item.label}>
                    <div className="text-lg font-extrabold text-white">{item.value}</div>
                    <div className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-300">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="container-site relative z-10 pb-8 lg:pb-12">
            <div className="border border-white/12 bg-white/[0.08] backdrop-blur-md">
              <div className="grid gap-px bg-white/10 lg:grid-cols-[1fr_auto]">
                <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
                  {QUICK_QUOTE_ITEMS.map((item) => (
                    <div key={item.label} className="bg-[#071525]/70 p-4 sm:p-5">
                      <div className="mb-3 flex h-9 w-9 items-center justify-center bg-white/[0.08] text-sky-200">
                        {item.icon}
                      </div>
                      <div className="text-sm font-bold text-white">{item.label}</div>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col justify-center bg-white p-5 text-slate-950 lg:w-72">
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">Quick Quote</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Send specs today. We reply with product options, documents, and shipping terms.
                  </p>
                  <Link
                    href="/quote"
                    className="mt-4 inline-flex items-center justify-center gap-2 bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                  >
                    Request a Quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="container-site grid gap-x-6 gap-y-4 py-6 sm:grid-cols-2 lg:grid-cols-6">
            {TRUST_ITEMS.map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-slate-50 text-blue-700">
                  {item.icon}
                </span>
                {item.text}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container-site">
            <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="section-label">Service promise</p>
                <h2 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-normal text-slate-950 md:text-5xl">
                  The buyer path is clear before a bulk order.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-slate-600">
                Built for distributors and importers who need price, documents, samples, and logistics without extra back-and-forth.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICE_PROMISES.map((item) => (
                <div key={item.title} className="border-t border-slate-200 bg-white pt-6">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center bg-slate-50 text-blue-700">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold tracking-normal text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-950 py-18 text-white md:py-22">
          <div className="container-site">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-300">
                  Buyer risk map
                </p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-normal text-white md:text-5xl">
                  Problems buyers want solved before they switch suppliers.
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-300">
                  Most importers already know the product name. The real question is whether the roll, label,
                  paperwork, and carton plan will survive daily use in their market.
                </p>
                <Link
                  href="/quote"
                  className="mt-8 inline-flex items-center justify-center gap-2 bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
                >
                  Request a Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-px bg-white/10 sm:grid-cols-2">
                {HOMEPAGE_BUYER_PROBLEMS.map((item) => (
                  <div key={item.title} className="bg-slate-950 p-6">
                    <div className="mb-5 flex h-10 w-10 items-center justify-center bg-sky-400/10 text-sky-300">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold tracking-normal text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400">{item.signal}</p>
                    <p className="mt-4 border-t border-white/10 pt-4 text-sm font-semibold leading-6 text-slate-200">
                      {item.response}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20 md:py-24">
          <div className="container-site">
            <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="section-label">Product lines</p>
                <h2 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-normal text-slate-950 md:text-5xl">
                  Start with the products your customers already reorder.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-slate-600">
                Choose the category, then check sizes, materials, certificates, packaging, and repeat-order terms.
              </p>
            </div>

            <div className="grid gap-8 xl:grid-cols-2">
              <ProductPanel
                accent="blue"
                href="/products/thermal-paper-rolls"
                imageSlot="home.product.thermal-rolls"
                label="Thermal paper rolls"
                title="Receipt, POS, ATM, lottery, casino, and medical rolls"
                description="Receipt, ATM, lottery, casino, and medical rolls with BPA-free coating, custom core IDs, black-mark options, and export carton specs."
                products={featuredRolls.map((item) => ({
                  name: item.name,
                  href: `/products/thermal-paper-rolls/${item.slug}`,
                }))}
              />
              <ProductPanel
                accent="emerald"
                href="/products/thermal-labels"
                imageSlot="home.product.thermal-labels"
                label="Thermal labels"
                title="Shipping, freezer, food, pharmacy, cannabis, and industrial labels"
                description="Direct thermal and thermal transfer labels with adhesive choices, die-cut formats, liner options, and printer compatibility for repeat orders."
                products={featuredLabels.map((item) => ({
                  name: item.name,
                  href: `/products/thermal-labels/${item.slug}`,
                }))}
              />
            </div>
          </div>
        </section>

        <section className="bg-white py-20 md:py-24">
          <div className="container-site">
            <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="section-label">Choose by buying scenario</p>
                <h2 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-normal text-slate-950 md:text-5xl">
                  Start from the job your buyer needs the paper to do.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-slate-600">
                Use this path when the visitor knows the use case but not the exact roll grade, coating,
                certificate, or print option.
              </p>
            </div>

            <div className="grid gap-px bg-slate-200 md:grid-cols-2 lg:grid-cols-3">
              {BUYING_SCENARIOS.map((scenario) => (
                <Link
                  key={scenario.title}
                  href={scenario.href}
                  className="group bg-white p-6 transition hover:bg-slate-50"
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-extrabold tracking-normal text-slate-950 transition group-hover:text-blue-700">
                        {scenario.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{scenario.subtitle}</p>
                    </div>
                    <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-700" />
                  </div>
                  <div className="grid gap-2">
                    {scenario.specs.map((spec) => (
                      <div key={spec} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="h-1.5 w-1.5 shrink-0 bg-blue-600" />
                        {spec}
                      </div>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-18 text-white md:py-22">
          <div className="container-site">
            <div className="mb-12 grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-300">Sourcing path</p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-normal text-white md:text-5xl">
                  Verify the order before it becomes a bulk shipment.
                </h2>
              </div>
              <div className="grid gap-px bg-white/10 md:grid-cols-2 xl:grid-cols-4">
                {SOURCING_STEPS.map((item, index) => (
                  <div key={item.title} className="bg-slate-950 p-5">
                    <div className="mb-5 flex h-9 w-9 items-center justify-center bg-white/[0.08] text-xs font-extrabold text-sky-200">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-base font-bold tracking-normal text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-300">Factory + documents</p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-normal text-white md:text-5xl">
                  Keep the order easy to verify.
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-300">
                  For regional buyers, the paperwork matters almost as much as the roll or label. Samples, batch details, and certificates can be checked before the bulk order is placed.
                </p>
                <div className="mt-8 grid grid-cols-3 border border-white/10">
                  {COMPANY.stats.slice(0, 3).map((stat) => (
                    <div key={stat.label} className="border-r border-white/10 p-4 last:border-r-0">
                      <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                      <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-[1.12fr_0.88fr]">
                <div className="relative min-h-[420px] overflow-hidden bg-slate-900 md:min-h-[520px]">
                  <SlotImage
                    slotKey="home.factory-overview"
                    fill
                    sizes="(min-width: 1024px) 44vw, (min-width: 768px) 58vw, 100vw"
                    className="object-cover opacity-95"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-slate-950/82 p-5 backdrop-blur-sm">
                    <Factory className="mb-3 h-6 w-6 text-sky-300" />
                    <h3 className="text-xl font-bold text-white">Traceable production</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Batch codes, material records, roll or label specs, and carton details are kept with the order.
                    </p>
                  </div>
                </div>
                <div className="border border-white/10 bg-white/[0.04]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                    <SlotImage
                      slotKey="home.compliance"
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 38vw, 100vw"
                      className="object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/78 via-slate-950/12 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-200">
                        Document preview
                      </p>
                      <h3 className="mt-2 text-xl font-bold text-white">Certificates before deposit</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center bg-emerald-400/10 text-emerald-300">
                        <CheckCircle2 className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-bold text-white">Documents by market</h3>
                        <p className="text-xs text-slate-400">Europe, USA, Canada, plus regulated uses</p>
                      </div>
                    </div>
                    <div className="grid gap-3">
                      {COMPLIANCE_ITEMS.slice(0, 6).map((item) => (
                        <Link
                          key={item.slug}
                          href={`/compliance/${item.slug}`}
                          className="flex items-center justify-between border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-slate-200 transition hover:border-sky-300/40 hover:text-white"
                        >
                          <span className="flex items-center gap-3">
                            <span className="text-sky-300">{COMPLIANCE_ICONS[item.icon]}</span>
                            {item.name}
                          </span>
                          <ChevronRight className="h-4 w-4 text-slate-500" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-18 md:py-22">
          <div className="container-site">
            <div className="mb-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="section-label">Markets & use cases</p>
                <h2 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-normal text-slate-950 md:text-5xl">
                  Choose the path closest to your buyer.
                </h2>
              </div>
              <p className="text-sm leading-7 text-slate-600">
                Some visitors arrive by application. Others arrive by region. This section keeps both paths close together, so distributors can move quickly to the right page.
              </p>
            </div>

            <div className="grid gap-10 border-t border-slate-200 pt-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h3 className="text-xl font-extrabold tracking-normal text-slate-950">Industry use cases</h3>
                  <Link
                    href="/industries"
                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:text-blue-900"
                  >
                    View all
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                  {featuredIndustries.slice(0, 6).map((industry) => (
                    <Link
                      key={industry.slug}
                      href={`/industries/${industry.slug}`}
                      className="group flex gap-4 transition"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-slate-100 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                        {INDUSTRY_ICONS[industry.icon] || <Package className="h-5 w-5" />}
                      </span>
                      <span>
                        <span className="block text-base font-bold tracking-normal text-slate-950 transition group-hover:text-blue-700">
                          {industry.name}
                        </span>
                        <span className="mt-2 line-clamp-2 block text-sm leading-6 text-slate-600">
                          {industry.description}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border border-slate-200 bg-slate-50 p-5">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center bg-white text-blue-700">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-extrabold tracking-normal text-slate-950">Regional supply pages</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">Documents, common sizes, and shipping routes by market.</p>
                  </div>
                </div>
                <div className="grid gap-3">
                  {GEO_REGIONS.map((region) => (
                    <Link
                      key={region.slug}
                      href={`/${region.slug}`}
                      className="group flex items-center justify-between gap-4 bg-white px-4 py-4 transition hover:bg-blue-50"
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-2xl">{region.flag}</span>
                        <span>
                          <span className="block text-sm font-bold text-slate-950">{region.name}</span>
                          <span className="mt-1 line-clamp-1 block text-xs text-slate-500">{region.description}</span>
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-700" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20 md:py-24">
          <div className="container-site grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div>
              <p className="section-label">OEM & Private Label</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-normal text-slate-950 md:text-5xl">
                Put your brand on the roll, label, or carton.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
                Custom printing, roll wrappers, carton marks, and packing lists can follow your sales channel.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  { title: "Private label packs", href: "/oem-custom/private-label" },
                  { title: "Logo and back-printing", href: "/oem-custom/custom-printing" },
                  { title: "MOQ and carton planning", href: "/oem-custom/moq-guide" },
                  { title: "Sample approval process", href: "/oem-custom/sample-process" },
                ].map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center justify-between border-b border-slate-200 py-4 text-sm font-bold text-slate-800 transition hover:border-blue-300 hover:text-blue-700"
                  >
                    {item.title}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                <SlotImage
                  slotKey="home.product.thermal-labels"
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 gap-px bg-white/15 p-4 backdrop-blur-sm">
                  {[
                    { icon: <Layers3 className="h-4 w-4" />, text: "Custom specs" },
                    { icon: <BadgeCheck className="h-4 w-4" />, text: "NDA support" },
                    { icon: <Zap className="h-4 w-4" />, text: "Fast samples" },
                  ].map((item) => (
                    <div key={item.text} className="bg-slate-950/70 p-3 text-center text-xs font-bold text-white">
                      <span className="mx-auto mb-2 flex h-8 w-8 items-center justify-center bg-white/[0.1] text-sky-200">
                        {item.icon}
                      </span>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-white py-20 md:py-24">
          <div className="container-site">
            <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="section-label">Buying Guides</p>
                <h2 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-normal text-slate-950 md:text-5xl">
                  Useful notes before a buyer sends an inquiry.
                </h2>
              </div>
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-blue-700">
                All articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:bg-slate-50"
                >
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className="bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-blue-700">
                      {post.category}
                    </span>
                    <span className="text-xs font-medium text-slate-400">{post.readTime} read</span>
                  </div>
                  <h3 className="line-clamp-2 text-lg font-bold tracking-normal text-slate-950 transition group-hover:text-blue-700">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">{post.excerpt}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-bold text-blue-700">
                    Read guide
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
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
                  Send the size, quantity, and destination. We'll take it from there.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                  Include the printer model or label use case if you have it. If not, send a photo of the current roll or label and the destination country.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
              >
                Request a Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/samples"
                className="inline-flex items-center justify-center gap-2 border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Request Free Samples
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ProductPanel({
  accent,
  description,
  href,
  imageSlot,
  label,
  products,
  title,
}: {
  accent: "blue" | "emerald";
  description: string;
  href: string;
  imageSlot: "home.product.thermal-rolls" | "home.product.thermal-labels";
  label: string;
  products: Array<{ href: string; name: string }>;
  title: string;
}) {
  const accentClass =
    accent === "emerald"
      ? "bg-emerald-600 text-white hover:bg-emerald-700"
      : "bg-blue-600 text-white hover:bg-blue-700";
  const chipClass =
    accent === "emerald" ? "text-emerald-700" : "text-blue-700";

  return (
    <article className="group overflow-hidden border border-slate-200 bg-white shadow-[0_22px_60px_rgba(15,23,42,0.06)]">
      <div className="grid min-h-full lg:grid-cols-[1.04fr_0.96fr] xl:grid-cols-1">
        <div className="relative aspect-[16/11] min-h-[300px] overflow-hidden bg-slate-100 lg:min-h-[420px] xl:min-h-0">
          <SlotImage
            slotKey={imageSlot}
            fill
            sizes="(min-width: 1280px) 44vw, (min-width: 1024px) 52vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.035]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/82 via-slate-950/18 to-transparent" />
          <div className="absolute left-5 top-5 bg-white/92 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-slate-950 backdrop-blur-sm">
            Factory-direct line
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-sky-100">
              {label}
            </span>
            <div className="mt-3 flex flex-wrap gap-2">
              {products.slice(0, 3).map((product) => (
                <span
                  key={product.href}
                  className="bg-white/12 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
                >
                  {product.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col p-6 md:p-8">
          <span className={`mb-4 w-fit text-xs font-bold uppercase tracking-[0.14em] ${chipClass}`}>
            {label}
          </span>
          <h3 className="text-2xl font-extrabold tracking-normal text-slate-950 md:text-3xl">{title}</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>

          <div className="mt-7 grid gap-x-5 gap-y-3 border-t border-slate-200 pt-6 sm:grid-cols-2">
            {products.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-700"
              >
                <span className="h-1.5 w-1.5 shrink-0 bg-blue-600" />
                {product.name}
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={href}
              className={`inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold transition ${accentClass}`}
            >
              View Product Line
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-500 hover:text-blue-700"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
