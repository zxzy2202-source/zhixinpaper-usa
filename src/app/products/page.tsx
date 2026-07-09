import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { SlotImage } from "@/components/ui/SlotImage";
import { THERMAL_PAPER_ROLLS, THERMAL_LABELS } from "@/lib/data";
import { canonicalUrl } from "@/lib/seo";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  CheckCircle2,
  Factory,
  FileCheck2,
  PackageCheck,
  Ruler,
  SearchCheck,
  ShieldCheck,
  Tags,
  Truck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Thermal Paper Products | Rolls, Labels & Custom OEM Supply",
  description:
    "Browse factory-direct thermal paper products for wholesale buyers: POS rolls, ATM paper, lottery tickets, direct thermal labels, freezer labels, custom printed rolls, and OEM packaging. Request samples, documents, and a bulk quote.",
  keywords: [
    "thermal paper products",
    "thermal paper rolls wholesale",
    "thermal labels wholesale",
    "BPA free thermal paper rolls",
    "POS paper rolls supplier",
    "ATM paper rolls",
    "lottery ticket thermal paper",
    "direct thermal labels",
    "freezer labels",
    "custom printed thermal rolls",
    "OEM thermal paper manufacturer",
  ],
  alternates: { canonical: canonicalUrl("/products") },
};

const productLines = [
  {
    label: "Product line 01",
    title: "Thermal Paper Rolls",
    href: "/products/thermal-paper-rolls",
    slotKey: "home.product.thermal-rolls",
    alt: "BPA-free thermal paper rolls in common POS, ATM, lottery, and ticketing sizes",
    description:
      "Receipt, POS, ATM, lottery, casino, medical, parking, transport, and custom printed thermal rolls for repeat wholesale orders.",
    specs: ["57mm / 80mm widths", "12mm / 17mm / 25mm cores", "BPA-free grades", "OEM carton packing"],
    cta: "Browse thermal paper rolls",
  },
  {
    label: "Product line 02",
    title: "Thermal Labels",
    href: "/products/thermal-labels",
    slotKey: "home.product.thermal-labels",
    alt: "Direct thermal labels and thermal transfer labels for logistics, cold chain, retail, and industrial use",
    description:
      "Direct thermal, thermal transfer, freezer, removable, synthetic, tamper-evident, wristband, fanfold, and custom printed labels.",
    specs: ["4 x 6 shipping labels", "Permanent / removable adhesive", "Roll or fanfold", "Die-cut and private label"],
    cta: "Browse thermal labels",
  },
] as const;

const bestSellingProducts = [
  {
    type: "Rolls",
    title: "Standard POS Rolls",
    href: "/products/thermal-paper-rolls/standard-pos-rolls",
    image: "home.product.thermal-rolls",
    reason: "High-repeat receipt paper for retailers, supermarkets, restaurants, and POS distributors.",
    checks: ["80x80mm and 57mm sizes", "BPA-free option", "Epson, Star, Bixolon fit"],
  },
  {
    type: "Rolls",
    title: "ATM & Bank Receipt Rolls",
    href: "/products/thermal-paper-rolls/atm-banking-rolls",
    image: "home.product.thermal-rolls",
    reason: "Archival receipt paper for ATM, teller, payment, and financial service terminals.",
    checks: ["Anti-static coating", "Long image life", "Back-print option"],
  },
  {
    type: "Rolls",
    title: "Lottery & Gaming Rolls",
    href: "/products/thermal-paper-rolls/lottery-gaming-rolls",
    image: "home.product.thermal-rolls",
    reason: "Barcode-grade thermal rolls for lottery terminals, betting shops, and gaming machines.",
    checks: ["Barcode density", "Black mark option", "Audit-friendly batches"],
  },
  {
    type: "Labels",
    title: "Direct Thermal Labels",
    href: "/products/thermal-labels/direct-thermal-labels",
    image: "home.product.thermal-labels",
    reason: "No-ribbon labels for shipping, e-commerce fulfillment, 3PL warehouses, and retail pricing.",
    checks: ["4x6 / 100x150mm", "GS1 barcode support", "Roll or fanfold"],
  },
  {
    type: "Labels",
    title: "Freezer & Cold Chain Labels",
    href: "/products/thermal-labels/freezer-cold-chain-labels",
    image: "home.product.thermal-labels",
    reason: "Cold-chain labels for frozen food, pharma logistics, labs, and temperature-controlled storage.",
    checks: ["Low-temp adhesive", "Moisture resistance", "Freeze-thaw testing"],
  },
  {
    type: "OEM",
    title: "Custom Printed Rolls & Labels",
    href: "/oem-custom/private-label",
    image: "home.factory-overview",
    reason: "Private-label packaging, back-print advertising, brand cartons, and repeat-order spec control.",
    checks: ["Artwork proof", "Pantone / QR code", "Carton and pallet marks"],
  },
] as const;

const buyingChecks = [
  {
    icon: Ruler,
    title: "Size and printer fit",
    copy: "Confirm width, diameter, length, core ID, label format, and the printer or terminal model before pricing.",
  },
  {
    icon: ShieldCheck,
    title: "Coating and compliance",
    copy: "Ask for BPA-free, REACH/RoHS, FDA, FSC, image-life, adhesive, and food-contact files when the use case requires them.",
  },
  {
    icon: PackageCheck,
    title: "Packing and logistics",
    copy: "Check carton quantity, pallet load, mixed SKU packing, warehouse labels, FOB/CIF/DDP terms, and repeat order marks.",
  },
] as const;

const compareRows = [
  {
    need: "Retail, restaurant, and POS receipts",
    spec: "57mm and 80mm receipt rolls, 12mm / 17mm core, BPA-free thermal paper",
    risk: "Short rolls, weak print density, poor printer fit, damaged cartons",
    href: "/products/thermal-paper-rolls/standard-pos-rolls",
    product: "Standard POS Rolls",
  },
  {
    need: "ATM, banking, and payment terminals",
    spec: "Archival thermal coating, anti-static surface, optional back print",
    risk: "Unreadable transaction records, static jams, poor image life",
    href: "/products/thermal-paper-rolls/atm-banking-rolls",
    product: "ATM & Bank Receipt Rolls",
  },
  {
    need: "Lottery, casino, parking, and ticketing",
    spec: "Barcode-grade coating, black mark option, controlled roll OD and core",
    risk: "Failed scans, weak density, terminal downtime, audit issues",
    href: "/products/thermal-paper-rolls/lottery-gaming-rolls",
    product: "Lottery & Gaming Rolls",
  },
  {
    need: "Shipping, warehouse, e-commerce, and FBA",
    spec: "4x6 / 100x150mm direct thermal labels, roll or fanfold, permanent adhesive",
    risk: "Unscannable labels, liner breaks, weak adhesive, printer jams",
    href: "/products/thermal-labels/direct-thermal-labels",
    product: "Direct Thermal Labels",
  },
  {
    need: "Frozen food, pharma, lab, and cold storage",
    spec: "Low-temperature adhesive, moisture-resistant facestock, freezer-grade thermal labels",
    risk: "Peeling after freezing, barcode loss, condensation damage",
    href: "/products/thermal-labels/freezer-cold-chain-labels",
    product: "Freezer & Cold Chain Labels",
  },
] as const;

const quoteFields = [
  {
    icon: SearchCheck,
    label: "Product or use case",
    helper: "POS roll, lottery ticket, 4x6 label, freezer label, or custom print.",
  },
  {
    icon: Ruler,
    label: "Size, core, OD, or format",
    helper: "Roll width, diameter, core ID, label size, liner, and die-cut format.",
  },
  {
    icon: Boxes,
    label: "Monthly quantity",
    helper: "Trial order, pallet order, mixed SKU cartons, or container load.",
  },
  {
    icon: Truck,
    label: "Destination and term",
    helper: "Country, port, warehouse, FOB, CIF, DDP, or forwarder details.",
  },
  {
    icon: FileCheck2,
    label: "Required certificates",
    helper: "BPA-free, REACH/RoHS, FDA, FSC, ISO, food-contact, or image-life files.",
  },
  {
    icon: Tags,
    label: "Packaging or private label",
    helper: "Carton marks, brand label, back print, QR code, pallet label, or artwork proof.",
  },
] as const;

const quoteOutcomes = ["Sample plan", "Document list", "Packing option", "Shipping term"];

export default function ProductsPage() {
  const paperRollCount = THERMAL_PAPER_ROLLS.length;
  const labelCount = THERMAL_LABELS.length;

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Thermal paper products",
    itemListElement: [...THERMAL_PAPER_ROLLS, ...THERMAL_LABELS].slice(0, 12).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: canonicalUrl(
        index < paperRollCount
          ? `/products/thermal-paper-rolls/${item.slug}`
          : `/products/thermal-labels/${item.slug}`,
      ),
    })),
  };

  return (
    <>
      <Header />
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />

        <section className="relative overflow-hidden bg-slate-950 pt-32 text-white">
          <div className="absolute inset-0">
            <SlotImage
              slotKey="home.hero"
              alt="Thermal paper rolls and labels manufactured for export buyers"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.96)_0%,rgba(15,23,42,0.8)_48%,rgba(15,23,42,0.36)_100%)]" />
          </div>

          <div className="container-site relative pb-14">
            <nav className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-100/70">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Products</span>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[0.9fr_0.55fr] lg:items-end">
              <div className="max-w-4xl">
                <div className="mb-5 inline-flex items-center gap-3 border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-100 backdrop-blur-sm">
                  <Factory className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
                  Factory-direct product catalog
                </div>
                <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-normal text-white md:text-6xl lg:text-7xl">
                  Thermal paper products for repeat wholesale orders.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 md:text-lg">
                  Browse thermal paper rolls, thermal labels, and private-label options by buyer scenario. We help confirm size, coating, documents, packing, and freight terms before bulk production.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/quote" className="inline-flex items-center justify-center gap-2 bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-500">
                    Request a Quote
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link href="/samples" className="inline-flex items-center justify-center gap-2 border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10">
                    Request Free Samples
                  </Link>
                </div>
              </div>

              <div className="border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200">Fast quote checklist</p>
                <div className="mt-5 grid grid-cols-2 gap-px bg-white/10">
                  {[
                    { label: "Rolls", value: `${paperRollCount}+ types` },
                    { label: "Labels", value: `${labelCount}+ types` },
                    { label: "MOQ", value: "Trial to pallet" },
                    { label: "Files", value: "Docs before order" },
                  ].map((item) => (
                    <div key={item.label} className="bg-slate-950/40 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-200/70">{item.label}</p>
                      <p className="mt-2 text-lg font-extrabold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-6 text-blue-100/80">
                  Send the product, size, quantity, destination, certificate needs, and packaging request. We reply with quote options and sample details.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white py-6">
          <div className="container-site grid gap-3 md:grid-cols-4">
            {[
              "ISO 9001:2015 manufacturing",
              "BPA-free, REACH/RoHS options",
              "FSC and FDA files available",
              "FOB, CIF, DDP, pallet supply",
            ].map((proof) => (
              <div key={proof} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <BadgeCheck className="h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                {proof}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white py-18">
          <div className="container-site">
            <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1fr] lg:items-end">
              <div>
                <p className="section-label">Choose a product line</p>
                <h2 className="mt-3 max-w-2xl text-4xl font-extrabold leading-tight tracking-normal text-slate-950 md:text-5xl">
                  Start with the material your customer reorders every month.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-slate-600 lg:justify-self-end">
                Rolls and labels are quoted differently. Pick the closest product line first, then confirm size, adhesive, printer fit, documents, carton pack, and repeat-order terms.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {productLines.map((line) => (
                <Link key={line.title} href={line.href} className="group overflow-hidden border border-slate-200 bg-white transition-colors hover:border-blue-300">
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                    <SlotImage
                      slotKey={line.slotKey}
                      alt={line.alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-200">{line.label}</p>
                      <h3 className="mt-2 text-3xl font-extrabold tracking-normal text-white">{line.title}</h3>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <p className="text-sm leading-7 text-slate-600">{line.description}</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {line.specs.map((spec) => (
                        <div key={spec} className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                          {spec}
                        </div>
                      ))}
                    </div>
                    <div className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-blue-700">
                      {line.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-18">
          <div className="container-site">
            <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="section-label">Best-selling products</p>
                <h2 className="mt-3 max-w-2xl text-4xl font-extrabold leading-tight tracking-normal text-slate-950 md:text-5xl">
                  High-repeat SKUs buyers usually quote first.
                </h2>
              </div>
              <Link href="/quote" className="inline-flex items-center justify-center gap-2 bg-slate-950 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700 lg:shrink-0">
                Send product specs
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {bestSellingProducts.map((product) => (
                <Link key={product.title} href={product.href} className="group overflow-hidden border border-slate-200 bg-white transition-colors hover:border-blue-300">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                    <SlotImage
                      slotKey={product.image}
                      alt={`${product.title} product image`}
                      fill
                      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />
                    <span className="absolute left-4 top-4 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-900">
                      {product.type}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-extrabold tracking-normal text-slate-950 group-hover:text-blue-700">{product.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{product.reason}</p>
                    <div className="mt-5 space-y-2 border-t border-slate-200 pt-5">
                      {product.checks.map((check) => (
                        <div key={check} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                          <SearchCheck className="h-3.5 w-3.5 shrink-0 text-blue-600" aria-hidden="true" />
                          {check}
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-700">
                      Open product page
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-18">
          <div className="container-site">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1fr] lg:items-start">
              <div>
                <p className="section-label">Buyer checks</p>
                <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-normal text-slate-950 md:text-5xl">
                  Compare by purchasing risk, not by product name only.
                </h2>
                <p className="mt-5 text-sm leading-7 text-slate-600">
                  The same category can need different paper, adhesive, cartons, and documents. Use this section to prepare a cleaner RFQ before you ask for pricing.
                </p>
                <div className="mt-8 grid gap-4">
                  {buyingChecks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex gap-4 border-l-2 border-blue-600 pl-4">
                        <Icon className="mt-1 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                        <div>
                          <h3 className="font-extrabold text-slate-950">{item.title}</h3>
                          <p className="mt-1 text-sm leading-6 text-slate-600">{item.copy}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="overflow-hidden border border-slate-200 bg-white">
                <div className="grid grid-cols-[1fr_1fr] bg-slate-950 text-white md:grid-cols-[1.1fr_1.1fr_1.1fr_0.9fr]">
                  {["Buyer need", "Typical spec", "Risk to avoid", "Recommended page"].map((head) => (
                    <div key={head} className="border-r border-white/10 px-4 py-4 text-xs font-bold uppercase tracking-[0.14em] last:border-r-0">
                      {head}
                    </div>
                  ))}
                </div>
                {compareRows.map((row) => (
                  <div key={row.need} className="grid border-t border-slate-200 md:grid-cols-[1.1fr_1.1fr_1.1fr_0.9fr]">
                    <div className="px-4 py-5 text-sm font-bold text-slate-950">{row.need}</div>
                    <div className="px-4 py-5 text-sm leading-6 text-slate-600">{row.spec}</div>
                    <div className="px-4 py-5 text-sm leading-6 text-slate-600">{row.risk}</div>
                    <div className="px-4 py-5">
                      <Link href={row.href} className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900">
                        {row.product}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container-site">
            <div className="overflow-hidden bg-slate-950 text-white">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-[440px] overflow-hidden border-b border-white/10 p-8 md:p-10 lg:border-b-0 lg:border-r">
                  <SlotImage
                    slotKey="home.factory-overview"
                    alt="Thermal paper factory team preparing quote-ready production details"
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover opacity-25"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/90 to-blue-950/70" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">RFQ information</p>
                      <h2 className="mt-4 max-w-xl text-4xl font-extrabold leading-tight tracking-normal text-white md:text-5xl">
                        Send the details that change the price.
                      </h2>
                      <p className="mt-5 max-w-lg text-sm leading-7 text-blue-100">
                        A useful quote starts with the application, size, quantity, destination, documents, and packing. With those details, we can quote the roll, label, packaging, and shipping options.
                      </p>
                    </div>

                    <div className="mt-8">
                      <div className="grid gap-px bg-white/10 sm:grid-cols-3">
                        {[
                          { label: "Reply", value: "24 h" },
                          { label: "Samples", value: "Before bulk" },
                          { label: "Docs", value: "Before deposit" },
                        ].map((item) => (
                          <div key={item.label} className="bg-slate-950/55 p-4">
                            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-200/70">{item.label}</p>
                            <p className="mt-2 text-lg font-extrabold text-white">{item.value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <Link href="/quote" className="inline-flex items-center justify-center gap-2 bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-500">
                          Request a Quote
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <Link href="/samples" className="inline-flex items-center justify-center gap-2 border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10">
                          Request Free Samples
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 p-6 md:p-8">
                  <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-200/70">Quote-ready checklist</p>
                      <h3 className="mt-2 text-2xl font-extrabold tracking-normal text-white">
                        Six fields keep the quote accurate.
                      </h3>
                    </div>
                    <p className="max-w-xs text-sm leading-6 text-slate-300">
                      Missing specs usually change price, cartons, samples, or freight terms.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {quoteFields.map((field, index) => {
                      const Icon = field.icon;
                      return (
                        <div key={field.label} className="border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-blue-400/40 hover:bg-white/[0.07]">
                          <div className="flex items-start justify-between gap-4">
                            <Icon className="h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                            <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-blue-200/60">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <h4 className="mt-4 text-base font-extrabold text-white">{field.label}</h4>
                          <p className="mt-2 text-sm leading-6 text-slate-300">{field.helper}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 border border-cyan-300/20 bg-cyan-300/10 p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200">What we send back</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {quoteOutcomes.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-sm font-semibold text-white">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container-site grid gap-4 md:grid-cols-4">
            {[
              { icon: Boxes, title: "All products", href: "/products" },
              { icon: Tags, title: "OEM and private label", href: "/oem-custom/private-label" },
              { icon: FileCheck2, title: "Compliance documents", href: "/compliance" },
              { icon: Truck, title: "Export supply terms", href: "/export" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} href={item.href} className="group flex items-center justify-between border border-slate-200 p-5 transition-colors hover:border-blue-300 hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-blue-700" aria-hidden="true" />
                    <span className="text-sm font-extrabold text-slate-950">{item.title}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-700" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </section>

        <CTABanner
          title="Need a product quote or sample pack?"
          subtitle="Send your product type, size, monthly volume, destination, and certificate request. We will reply with samples, document files, packaging options, and shipping terms."
        />
      </main>
      <Footer />
    </>
  );
}
