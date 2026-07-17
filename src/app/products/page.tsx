import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { SlotImage } from "@/components/ui/SlotImage";
import { THERMAL_PAPER_ROLLS, THERMAL_LABELS } from "@/lib/data";
import { SITE_NAME, breadcrumbSchema, canonicalUrl, faqSchema } from "@/lib/seo";
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  FileCheck2,
  PackageCheck,
  Ruler,
  SearchCheck,
  ShieldCheck,
  Tags,
  Truck,
} from "lucide-react";

const productPageDescription =
  "Browse wholesale thermal paper rolls and labels by use case, size, compliance files, packing, and RFQ details for repeat import orders.";

export const metadata: Metadata = {
  title: "Thermal Paper Products | Rolls, Labels & Custom OEM Supply",
  description: productPageDescription,
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

const sourcingSummary = [
  {
    term: "Main product families",
    detail: "Thermal paper rolls for POS, ATM, lottery, casino, transport, medical, kiosk, and custom receipt programs; thermal labels for shipping, barcode, cold-chain, retail, wristband, synthetic, tamper-evident, and industrial use.",
  },
  {
    term: "Best RFQ starting point",
    detail: "Start with application, size, core or label format, monthly quantity, destination, compliance files, and packing requirements. These details affect paper grade, adhesive, carton pack, pallet plan, and freight terms.",
  },
  {
    term: "Buyer fit",
    detail: "Built for distributors, importers, POS paper resellers, label converters, warehouse suppliers, retail chains, logistics operators, and OEM private-label programs.",
  },
];

const productDirectory = [
  {
    title: "Thermal paper rolls",
    href: "/products/thermal-paper-rolls",
    description: "Receipt and ticket rolls grouped by terminal, printer fit, image life, core, OD, and carton plan.",
    items: THERMAL_PAPER_ROLLS.map((item) => ({
      name: item.name,
      href: `/products/thermal-paper-rolls/${item.slug}`,
      detail: item.applications.slice(0, 3).join(" / "),
      spec: item.sizes.slice(0, 4).join(" / "),
      moq: item.moq,
    })),
  },
  {
    title: "Thermal labels",
    href: "/products/thermal-labels",
    description: "Direct thermal and thermal transfer labels grouped by adhesive, facestock, liner, barcode use, and environment.",
    items: THERMAL_LABELS.map((item) => ({
      name: item.name,
      href: `/products/thermal-labels/${item.slug}`,
      detail: item.applications.slice(0, 3).join(" / "),
      spec: item.sizes.slice(0, 4).join(" / "),
      moq: item.moq,
    })),
  },
] as const;

const productFaqs = [
  {
    question: "What thermal paper products does Zhixin Paper manufacture?",
    answer:
      "Zhixin Paper manufactures wholesale thermal paper rolls and thermal labels, including POS receipt rolls, ATM receipt paper, lottery and casino ticket rolls, medical and transport rolls, direct thermal labels, thermal transfer labels, freezer labels, removable labels, synthetic labels, wristband labels, and custom printed OEM products.",
  },
  {
    question: "How should buyers choose between thermal paper rolls and thermal labels?",
    answer:
      "Choose thermal paper rolls when the printer outputs receipts, tickets, transaction records, or terminal slips. Choose thermal labels when the application needs adhesive, liner, barcode tracking, shipping labels, cold-chain identification, retail pricing, or product labeling.",
  },
  {
    question: "What information is needed for an accurate bulk quote?",
    answer:
      "A strong RFQ includes product use case, width, roll OD, core ID, label size, facestock or adhesive, monthly quantity, destination country, incoterm, certificate needs, carton marks, pallet plan, and any private-label artwork or back-print requirements.",
  },
  {
    question: "Are compliance documents available for product categories?",
    answer:
      "Yes. Depending on the product and destination market, buyers can request BPA-free, REACH/RoHS, FDA, FSC, ISO 9001, food-contact, image-life, and material test files before placing a bulk order.",
  },
  {
    question: "Can one order mix several roll or label SKUs?",
    answer:
      "Yes. Mixed-SKU programs are available for distributors and importers. Confirm each SKU size, quantity, carton count, pallet requirement, warehouse label, and destination so the packing plan can be quoted accurately.",
  },
] as const;

export default function ProductsPage() {
  const paperRollCount = THERMAL_PAPER_ROLLS.length;
  const labelCount = THERMAL_LABELS.length;
  const allDirectoryItems = productDirectory.flatMap((group) => group.items);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Thermal paper products directory",
    numberOfItems: paperRollCount + labelCount,
    itemListElement: allDirectoryItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: canonicalUrl(item.href),
    })),
  };

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Thermal Paper Products",
    headline: "Thermal paper rolls and labels for repeat wholesale orders",
    description: productPageDescription,
    url: canonicalUrl("/products"),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: canonicalUrl("/"),
    },
    about: [
      "Thermal paper rolls",
      "Thermal labels",
      "POS receipt paper",
      "ATM receipt paper",
      "Direct thermal labels",
      "Custom printed thermal paper",
      "BPA-free thermal paper",
    ],
    mainEntity: {
      "@type": "ItemList",
      name: "Thermal paper product categories",
      numberOfItems: productLines.length,
      itemListElement: productLines.map((line, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: line.title,
        url: canonicalUrl(line.href),
      })),
    },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      collectionPageJsonLd,
      breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Products", url: "/products" },
      ]),
      itemListJsonLd,
      faqSchema(productFaqs.map((faq) => ({ question: faq.question, answer: faq.answer }))),
    ],
  };

  return (
    <>
      <Header />
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <section className="paper-noise relative overflow-hidden bg-[#101b19] pt-32 text-white">
          <div className="absolute inset-0">
            <SlotImage
              slotKey="home.hero"
              alt="Thermal paper rolls and labels manufactured for export buyers"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(185,130,47,0.2),transparent_24rem),linear-gradient(90deg,rgba(10,24,22,0.97)_0%,rgba(16,27,25,0.86)_54%,rgba(16,27,25,0.44)_100%)]" />
          </div>

          <div className="container-site relative pb-14">
            <nav className="mb-8 flex items-center gap-2 text-xs font-semibold text-[#c7d0cb]/70">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Products</span>
            </nav>

            <div className="max-w-4xl">
              <div>
                <h1 className="max-w-4xl text-5xl font-bold leading-[1.02] text-white md:text-6xl lg:text-7xl">
                  Thermal paper rolls and labels for repeat wholesale orders.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-[#c7d0cb] md:text-lg">
                  Choose the product line first. We help confirm size, coating or adhesive, printer fit, documents, packing, and freight terms before bulk production.
                </p>
                <dl className="mt-8 grid gap-px overflow-hidden border border-white/10 bg-white/10 text-left md:grid-cols-3">
                  <div className="bg-[#101b19]/70 p-4">
                    <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#d6b273]">Roll categories</dt>
                    <dd className="mt-2 text-2xl font-bold text-white">{paperRollCount}</dd>
                  </div>
                  <div className="bg-[#101b19]/70 p-4">
                    <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#d6b273]">Label categories</dt>
                    <dd className="mt-2 text-2xl font-bold text-white">{labelCount}</dd>
                  </div>
                  <div className="bg-[#101b19]/70 p-4">
                    <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#d6b273]">Quote path</dt>
                    <dd className="mt-2 text-2xl font-bold text-white">Spec first</dd>
                  </div>
                </dl>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="#product-lines" className="inline-flex items-center justify-center gap-2 bg-[#b9822f] px-6 py-3 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#9f6e25] active:translate-y-px">
                    Choose a Product Line
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link href="/quote" className="inline-flex items-center justify-center gap-2 border border-white/25 px-6 py-3 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#fbfaf6]/10 active:translate-y-px">
                    Request a Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="product-sourcing-summary" className="bg-[#f4f0e8] py-14">
          <div className="container-site">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1fr] lg:items-start">
              <div>
                <p className="section-label">Product sourcing summary</p>
                <h2 id="product-sourcing-summary" className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-[#14211f] md:text-4xl">
                  Short answers for buyers, search engines, and AI summaries.
                </h2>
              </div>
              <dl className="grid gap-px overflow-hidden border border-[#ded6c8] bg-[#ded6c8]">
                {sourcingSummary.map((item) => (
                  <div key={item.term} className="grid gap-3 bg-[#fbfaf6] p-5 md:grid-cols-[220px_1fr]">
                    <dt className="text-sm font-bold text-[#14211f]">{item.term}</dt>
                    <dd className="text-sm leading-7 text-[#4f5f5a]">{item.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section id="product-lines" className="bg-[#fbfaf6] py-20 md:py-24">
          <div className="container-site">
            <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1fr] lg:items-end">
              <div>
                <p className="section-label">Choose a product line</p>
                <h2 className="mt-3 max-w-2xl text-4xl font-bold leading-tight text-[#14211f] md:text-5xl">
                  Start with the material your customer reorders every month.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-[#4f5f5a] lg:justify-self-end">
                Rolls and labels are quoted differently. Pick the closest product line first, then confirm size, adhesive, printer fit, documents, carton pack, and repeat-order terms.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {productLines.map((line) => (
                <Link key={line.title} href={line.href} className="group overflow-hidden border border-[#ded6c8] bg-[#fbfaf6] transition-colors hover:border-[#0f5f5c]/40">
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#0b1513]">
                    <SlotImage
                      slotKey={line.slotKey}
                      alt={line.alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101b19]/80 via-[#101b19]/20 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-xs font-bold text-[#d6b273]">{line.label}</p>
                      <h3 className="mt-2 text-3xl font-bold text-white">{line.title}</h3>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <p className="text-sm leading-7 text-[#4f5f5a]">{line.description}</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {line.specs.map((spec) => (
                        <div key={spec} className="flex items-center gap-2 text-sm font-semibold text-[#33413e]">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0f5f5c]" aria-hidden="true" />
                          {spec}
                        </div>
                      ))}
                    </div>
                    <div className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#0f5f5c]">
                      {line.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f4f0e8] py-18">
          <div className="container-site">
            <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="section-label">Best-selling products</p>
                <h2 className="mt-3 max-w-2xl text-4xl font-bold leading-tight text-[#14211f] md:text-5xl">
                  High-repeat SKUs buyers usually quote first.
                </h2>
              </div>
              <Link href="/quote" className="inline-flex items-center justify-center gap-2 bg-[#101b19] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#9f6e25] lg:shrink-0">
                Send product specs
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {bestSellingProducts.map((product) => (
                <Link key={product.title} href={product.href} className="group overflow-hidden border border-[#ded6c8] bg-[#fbfaf6] transition-colors hover:border-[#0f5f5c]/40">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#0b1513]">
                    <SlotImage
                      slotKey={product.image}
                      alt={`${product.title} product image`}
                      fill
                      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101b19]/75 via-[#101b19]/15 to-transparent" />
                    <span className="absolute left-4 top-4 bg-[#fbfaf6] px-3 py-1 text-[11px] font-bold text-[#14211f]">
                      {product.type}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#14211f] group-hover:text-[#0f5f5c]">{product.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#4f5f5a]">{product.reason}</p>
                    <div className="mt-5 space-y-2 border-t border-[#ded6c8] pt-5">
                      {product.checks.map((check) => (
                        <div key={check} className="flex items-center gap-2 text-xs font-semibold text-[#33413e]">
                          <SearchCheck className="h-3.5 w-3.5 shrink-0 text-[#0f5f5c]" aria-hidden="true" />
                          {check}
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0f5f5c]">
                      Open product page
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fbfaf6] py-18">
          <div className="container-site">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1fr] lg:items-start">
              <div>
                <p className="section-label">Buyer checks</p>
                <h2 className="mt-3 text-4xl font-bold leading-tight text-[#14211f] md:text-5xl">
                  Compare by purchasing risk, not by product name only.
                </h2>
                <p className="mt-5 text-sm leading-7 text-[#4f5f5a]">
                  The same category can need different paper, adhesive, cartons, and documents. Use this section to prepare a cleaner RFQ before you ask for pricing.
                </p>
                <div className="mt-8 grid gap-4">
                  {buyingChecks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex gap-4 border-l-2 border-[#0f5f5c] pl-4">
                        <Icon className="mt-1 h-5 w-5 shrink-0 text-[#0f5f5c]" aria-hidden="true" />
                        <div>
                          <h3 className="font-bold text-[#14211f]">{item.title}</h3>
                          <p className="mt-1 text-sm leading-6 text-[#4f5f5a]">{item.copy}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="overflow-hidden border border-[#ded6c8] bg-[#fbfaf6]">
                <div className="grid grid-cols-[1fr_1fr] bg-[#101b19] text-white md:grid-cols-[1.1fr_1.1fr_1.1fr_0.9fr]">
                  {["Buyer need", "Typical spec", "Risk to avoid", "Recommended page"].map((head) => (
                    <div key={head} className="border-r border-white/10 px-4 py-4 text-xs font-bold last:border-r-0">
                      {head}
                    </div>
                  ))}
                </div>
                {compareRows.map((row) => (
                  <div key={row.need} className="grid border-t border-[#ded6c8] md:grid-cols-[1.1fr_1.1fr_1.1fr_0.9fr]">
                    <div className="px-4 py-5 text-sm font-bold text-[#14211f]">{row.need}</div>
                    <div className="px-4 py-5 text-sm leading-6 text-[#4f5f5a]">{row.spec}</div>
                    <div className="px-4 py-5 text-sm leading-6 text-[#4f5f5a]">{row.risk}</div>
                    <div className="px-4 py-5">
                      <Link href={row.href} className="inline-flex items-center gap-2 text-sm font-bold text-[#0f5f5c] hover:text-[#0a4745]">
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

        <section aria-labelledby="complete-product-directory" className="bg-[#f4f0e8] py-18">
          <div className="container-site">
            <div className="mb-10 grid gap-6 lg:grid-cols-[0.85fr_1fr] lg:items-end">
              <div>
                <p className="section-label">Complete product directory</p>
                <h2 id="complete-product-directory" className="mt-3 max-w-2xl text-4xl font-bold leading-tight text-[#14211f] md:text-5xl">
                  Every product category linked from one crawlable hub.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-[#4f5f5a] lg:justify-self-end">
                Use this directory when you already know the product family. Each link opens a dedicated page with application notes, sizes, specifications, MOQ, and RFQ guidance.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {productDirectory.map((group) => (
                <section key={group.title} aria-labelledby={`${group.title.toLowerCase().replaceAll(" ", "-")}-directory`} className="border border-[#ded6c8] bg-[#fbfaf6]">
                  <div className="border-b border-[#ded6c8] p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 id={`${group.title.toLowerCase().replaceAll(" ", "-")}-directory`} className="text-2xl font-bold text-[#14211f]">{group.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-[#4f5f5a]">{group.description}</p>
                      </div>
                      <Link href={group.href} className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#0f5f5c] hover:underline">
                        View category
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>

                  <div className="divide-y divide-[#ded6c8]">
                    {group.items.map((item) => (
                      <Link key={item.href} href={item.href} className="group grid gap-3 p-5 transition-colors hover:bg-white md:grid-cols-[1fr_1fr_auto] md:items-center">
                        <div>
                          <h4 className="text-base font-bold text-[#14211f] group-hover:text-[#0f5f5c]">{item.name}</h4>
                          <p className="mt-1 text-xs leading-5 text-[#687772]">{item.detail}</p>
                        </div>
                        <div className="text-xs leading-5 text-[#4f5f5a]">
                          <span className="font-bold text-[#33413e]">Common specs: </span>
                          {item.spec}
                          {item.moq ? <span className="block pt-1"><span className="font-bold text-[#33413e]">MOQ: </span>{item.moq}</span> : null}
                        </div>
                        <ArrowRight className="h-4 w-4 text-[#87918c] transition-transform group-hover:translate-x-1 group-hover:text-[#0f5f5c]" aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fbfaf6] py-16">
          <div className="container-site">
            <div className="overflow-hidden bg-[#101b19] text-white">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-[440px] overflow-hidden border-b border-white/10 p-8 md:p-10 lg:border-b-0 lg:border-r">
                  <SlotImage
                    slotKey="home.factory-overview"
                    alt="Thermal paper factory team preparing quote-ready production details"
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover opacity-25"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#101b19] via-[#101b19]/90 to-[#0f5f5c]/50" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#d6b273]">RFQ information</p>
                      <h2 className="mt-4 max-w-xl text-4xl font-bold leading-tight text-white md:text-5xl">
                        Send the details that change the price.
                      </h2>
                      <p className="mt-5 max-w-lg text-sm leading-7 text-[#c7d0cb]">
                        A useful quote starts with the application, size, quantity, destination, documents, and packing. With those details, we can quote the roll, label, packaging, and shipping options.
                      </p>
                    </div>

                    <div className="mt-8">
                      <div className="grid gap-px bg-[#fbfaf6]/10 sm:grid-cols-3">
                        {[
                          { label: "Reply", value: "24 h" },
                          { label: "Samples", value: "Before bulk" },
                          { label: "Docs", value: "Before deposit" },
                        ].map((item) => (
                          <div key={item.label} className="bg-[#101b19]/55 p-4">
                            <p className="text-[11px] font-bold text-[#c7d0cb]/70">{item.label}</p>
                            <p className="mt-2 text-lg font-bold text-white">{item.value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <Link href="/quote" className="inline-flex items-center justify-center gap-2 bg-[#b9822f] px-6 py-3 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#9f6e25] active:translate-y-px">
                          Request a Quote
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <Link href="/samples" className="inline-flex items-center justify-center gap-2 border border-white/25 px-6 py-3 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#fbfaf6]/10 active:translate-y-px">
                          Request Samples
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0b1513] p-6 md:p-8">
                  <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#c7d0cb]/70">Quote-ready checklist</p>
                      <h3 className="mt-2 text-2xl font-bold text-white">
                        Six fields keep the quote accurate.
                      </h3>
                    </div>
                    <p className="max-w-xs text-sm leading-6 text-[#c7d0cb]">
                      Missing specs usually change price, cartons, samples, or freight terms.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {quoteFields.map((field, index) => {
                      const Icon = field.icon;
                      return (
                        <div key={field.label} className="border border-white/10 bg-[#fbfaf6]/[0.04] p-5 transition-colors hover:border-[#0f5f5c]/40 hover:bg-[#fbfaf6]/[0.07]">
                          <div className="flex items-start justify-between gap-4">
                            <Icon className="h-5 w-5 shrink-0 text-[#d6b273]" aria-hidden="true" />
                            <span className="text-[11px] font-bold text-[#c7d0cb]/60">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <h4 className="mt-4 text-base font-bold text-white">{field.label}</h4>
                          <p className="mt-2 text-sm leading-6 text-[#c7d0cb]">{field.helper}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 border border-[#d6b273]/25 bg-[#d6b273]/10 p-5">
                    <p className="text-xs font-bold text-[#d6b273]">What we send back</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {quoteOutcomes.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-sm font-semibold text-white">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#d6b273]" aria-hidden="true" />
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

        <section className="bg-[#fbfaf6] py-16">
          <div className="container-site grid gap-4 md:grid-cols-4">
            {[
              { icon: Boxes, title: "All products", href: "/products" },
              { icon: Tags, title: "OEM and private label", href: "/oem-custom/private-label" },
              { icon: FileCheck2, title: "Compliance documents", href: "/compliance" },
              { icon: Truck, title: "Export supply terms", href: "/eu" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} href={item.href} className="group flex items-center justify-between border border-[#ded6c8] p-5 transition-colors hover:border-[#0f5f5c]/40 hover:bg-[#f4f0e8]">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-[#0f5f5c]" aria-hidden="true" />
                    <span className="text-sm font-bold text-[#14211f]">{item.title}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#87918c] transition-transform group-hover:translate-x-1 group-hover:text-[#0f5f5c]" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="products-faq" className="bg-[#f4f0e8] py-18">
          <div className="container-site">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1fr]">
              <div>
                <p className="section-label">Product sourcing FAQ</p>
                <h2 id="products-faq" className="mt-3 text-4xl font-bold leading-tight text-[#14211f] md:text-5xl">
                  Answers buyers often need before opening product pages.
                </h2>
                <p className="mt-5 text-sm leading-7 text-[#4f5f5a]">
                  These answers are written in plain language so buyers, search engines, and AI answer engines can understand the category before a quote request.
                </p>
              </div>
              <div className="divide-y divide-[#ded6c8] border border-[#ded6c8] bg-[#fbfaf6]">
                {productFaqs.map((faq) => (
                  <article key={faq.question} className="p-6">
                    <h3 className="text-lg font-bold text-[#14211f]">{faq.question}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#4f5f5a]">{faq.answer}</p>
                  </article>
                ))}
              </div>
            </div>
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
