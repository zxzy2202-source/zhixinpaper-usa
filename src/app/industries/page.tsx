import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SlotImage from "@/components/ui/SlotImage";
import { INDUSTRIES } from "@/lib/data";
import { INDUSTRY_BUYER_INSIGHTS } from "@/lib/marketInsights";
import { breadcrumbSchema, canonicalUrl } from "@/lib/seo";
import {
  ArrowRight,
  Building2,
  Bus,
  Calendar,
  CheckCircle2,
  Factory,
  FileCheck,
  Heart,
  Leaf,
  Package,
  Scale,
  SearchCheck,
  ShieldCheck,
  ShoppingCart,
  Snowflake,
  Star,
  Ticket,
  Truck,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Thermal Paper by Industry",
  description:
    "Compare thermal paper rolls, labels, and ticket materials for POS, banking, healthcare, cold chain, logistics, transport, lottery, and specialty applications.",
  keywords: [
    "thermal paper industry solutions",
    "thermal paper rolls by industry",
    "thermal labels supplier by application",
    "POS receipt paper rolls",
    "lottery ticket thermal paper",
    "casino TITO paper supplier",
    "ATM receipt paper rolls",
    "freezer cold chain labels",
    "shipping labels bulk supplier",
    "BPA free thermal paper",
    "REACH compliant thermal paper supplier",
    "FDA compliant thermal paper",
    "thermal paper manufacturer for distributors",
    "private label thermal paper rolls",
  ],
  alternates: { canonical: canonicalUrl("/industries") },
};

type SlotName =
  | "home.hero"
  | "home.product.thermal-rolls"
  | "home.product.thermal-labels"
  | "home.factory-overview"
  | "home.compliance";

const INDUSTRY_ICONS: Record<string, React.ReactNode> = {
  ShoppingCart: <ShoppingCart className="h-5 w-5" />,
  Ticket: <Ticket className="h-5 w-5" />,
  Coins: <Star className="h-5 w-5" />,
  Building2: <Building2 className="h-5 w-5" />,
  Heart: <Heart className="h-5 w-5" />,
  Snowflake: <Snowflake className="h-5 w-5" />,
  Package: <Package className="h-5 w-5" />,
  Bus: <Bus className="h-5 w-5" />,
  Wrench: <Wrench className="h-5 w-5" />,
  Calendar: <Calendar className="h-5 w-5" />,
  Scale: <Scale className="h-5 w-5" />,
  Leaf: <Leaf className="h-5 w-5" />,
};

const INDUSTRY_IMAGE_SLOTS: Record<string, SlotName> = {
  "retail-pos": "home.product.thermal-rolls",
  "lottery-gaming": "home.product.thermal-rolls",
  casino: "home.product.thermal-rolls",
  "banking-finance": "home.compliance",
  "healthcare-pharma": "home.product.thermal-labels",
  "food-cold-chain": "home.product.thermal-labels",
  "logistics-warehouse": "home.product.thermal-labels",
  ecommerce: "home.product.thermal-labels",
  transportation: "home.factory-overview",
  "automotive-industrial": "home.factory-overview",
  "events-hospitality": "home.product.thermal-rolls",
  "government-legal": "home.compliance",
  "cannabis-specialty": "home.product.thermal-labels",
};

const INDUSTRY_SUMMARIES: Record<string, string> = {
  "retail-pos": "Receipt paper rolls for retail chains, supermarkets, restaurants, POS distributors, and private-label sellers.",
  "lottery-gaming": "Barcode-grade lottery and gaming ticket paper for terminal uptime, scan reliability, and audit control.",
  casino: "TITO thermal rolls for casino floors that need readable cash-value tickets and stable carton supply.",
  "banking-finance": "ATM and bank receipt rolls with archival image life, anti-static handling, and back-print options.",
  "healthcare-pharma": "BPA-free medical rolls and thermal labels for pharmacies, labs, clinics, and patient workflows.",
  "food-cold-chain": "Thermal labels and paper for frozen food, cold storage, HACCP workflows, and temperature-controlled logistics.",
  "logistics-warehouse": "Shipping labels, carton labels, and warehouse barcode labels for 3PLs and fulfillment centers.",
  ecommerce: "4x6 shipping labels, FNSKU labels, and marketplace-ready label formats for online sellers and 3PL teams.",
  transportation: "Parking, transit, and event ticket paper built for outdoor exposure, black marks, and validator scanning.",
  "automotive-industrial": "Industrial thermal labels for parts tracking, chemical exposure, high temperature, and factory workflows.",
  "events-hospitality": "Event tickets, wristband labels, branded roll stock, and QR-ready custom print for venues and hospitality.",
  "government-legal": "Receipt and record paper for public counters, legal offices, and workflows that need document control.",
  "cannabis-specialty": "Thermal labels and custom packaging labels for regulated specialty retail and dispensary operations.",
};

const PRIORITY_CARD_SUMMARIES: Record<string, string> = {
  "retail-pos": "Receipt rolls for retail chains, POS distributors, restaurants, and private-label sellers.",
  "lottery-gaming": "Barcode-grade ticket paper for lottery terminals, betting shops, and gaming machines.",
  casino: "TITO rolls for cash-value tickets, scanner reliability, and stable carton supply.",
  "banking-finance": "ATM and bank receipt rolls for transaction records, anti-static handling, and back print.",
  "healthcare-pharma": "BPA-free medical rolls and labels for pharmacies, labs, clinics, and patient workflows.",
  "food-cold-chain": "Freezer labels and thermal paper for cold storage, food, and controlled logistics.",
};

const PRIORITY_SLUGS = [
  "retail-pos",
  "lottery-gaming",
  "casino",
  "banking-finance",
  "healthcare-pharma",
  "food-cold-chain",
];

const SCENARIO_ROUTES = [
  {
    label: "POS and retail receipts",
    href: "/industries/retail-pos",
    detail: "80mm, 57mm, BPA-free grades, back print, private-label cartons",
    image: "home.product.thermal-rolls" as SlotName,
  },
  {
    label: "Lottery, casino, and tickets",
    href: "/industries/lottery-gaming",
    detail: "Barcode density, black mark, ticket validity, scanner reliability",
    image: "home.product.thermal-rolls" as SlotName,
  },
  {
    label: "Labels for logistics and cold chain",
    href: "/industries/food-cold-chain",
    detail: "4x6 shipping labels, freezer adhesive, food-contact document packs",
    image: "home.product.thermal-labels" as SlotName,
  },
  {
    label: "Banking, healthcare, and records",
    href: "/industries/banking-finance",
    detail: "Archival image life, anti-static paper, BPA-free files, carton marks",
    image: "home.compliance" as SlotName,
  },
];

const BUYER_CHECKS = [
  "Product size, core ID, outer diameter, label format, and winding direction",
  "Printer, terminal, scanner, validator, or system integrator specification",
  "BPA-free, REACH, RoHS, FDA, FSC, Prop 65, or customer document requirements",
  "Carton pack, pallet plan, destination, Incoterm, and monthly reorder volume",
];

const DOCUMENT_ROUTES = [
  {
    href: "/compliance/bpa-free",
    title: "BPA-free and phenol-free checks",
    text: "For receipt, medical, food, and public-use purchasing programs.",
  },
  {
    href: "/compliance/reach-rohs",
    title: "REACH / RoHS document route",
    text: "For importers who need chemical compliance files before deposit.",
  },
  {
    href: "/compliance/fda-us",
    title: "FDA and food-contact files",
    text: "For food, pharmacy, healthcare, cannabis, and label applications.",
  },
];

const priorityIndustries = PRIORITY_SLUGS.map((slug) => INDUSTRIES.find((industry) => industry.slug === slug)).filter(
  Boolean,
) as typeof INDUSTRIES;

const remainingIndustries = INDUSTRIES.filter((industry) => !PRIORITY_SLUGS.includes(industry.slug));

function getIndustrySummary(slug: string, fallback: string) {
  return INDUSTRY_SUMMARIES[slug] ?? fallback;
}

function getPriorityCardSummary(slug: string, fallback: string) {
  return PRIORITY_CARD_SUMMARIES[slug] ?? getIndustrySummary(slug, fallback);
}

function getIndustryImage(slug: string): SlotName {
  return INDUSTRY_IMAGE_SLOTS[slug] ?? "home.factory-overview";
}

function getPriorityIndustryImage(slug: string): SlotName {
  const priorityImages: Record<string, SlotName> = {
    "retail-pos": "home.product.thermal-rolls",
    "lottery-gaming": "home.product.thermal-rolls",
    casino: "home.factory-overview",
    "banking-finance": "home.compliance",
    "healthcare-pharma": "home.product.thermal-labels",
    "food-cold-chain": "home.product.thermal-labels",
  };
  return priorityImages[slug] ?? getIndustryImage(slug);
}

function getInsightLine(slug: string) {
  const insight = INDUSTRY_BUYER_INSIGHTS[slug];
  if (!insight) return null;
  return {
    motive: insight.purchaseMotives[0],
    risk: insight.commonRisks[0],
    checklist: insight.quoteChecklist.slice(0, 3),
  };
}

function industryListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Thermal paper industry solutions",
    itemListElement: INDUSTRIES.map((industry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${industry.name} thermal paper solutions`,
      url: canonicalUrl(`/industries/${industry.slug}`),
      description: getIndustrySummary(industry.slug, industry.description),
    })),
  };
}

export default function IndustriesPage() {
  const jsonLd = [
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Industries", url: "/industries" },
    ]),
    industryListSchema(),
  ];

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
      <main id="main-content" className="pt-[88px]">
        <section className="paper-noise relative overflow-hidden bg-[#101b19] text-white">
          <div className="absolute inset-0">
            <SlotImage
              slotKey="home.hero"
              fill
              sizes="100vw"
              className="object-cover object-[58%_center] opacity-[0.48]"
              preload
              quality={78}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(185,130,47,0.14),transparent_24rem),linear-gradient(90deg,rgba(10,24,22,0.98)_0%,rgba(16,27,25,0.9)_44%,rgba(16,27,25,0.52)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#101b19] to-transparent" />
          </div>

          <div className="container-site relative z-10 py-14 md:py-18 lg:py-22">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div>
                <div className="mb-6 inline-flex items-center border border-white/16 bg-white/[0.07] px-4 py-2 text-xs font-semibold text-[#d6b273] backdrop-blur-sm">
                  Industry sourcing hub
                </div>
                <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.04] tracking-normal text-white md:text-5xl xl:text-6xl">
                  Thermal paper rolls and labels by industry
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 md:text-lg">
                  Match the product to the buying scenario: receipt rolls, ticket paper, TITO rolls, thermal labels,
                  cold-chain labels, document files, cartons, and repeat-order logistics.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/quote"
                    className="inline-flex items-center justify-center gap-2 bg-[#9c661d] px-7 py-3.5 text-sm font-bold text-white shadow-[0_18px_45px_rgba(185,130,47,0.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#7d4f16] active:translate-y-px"
                  >
                    Request a Quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center gap-2 border border-white/22 bg-white/[0.08] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/[0.14] active:translate-y-px"
                  >
                    View Products
                  </Link>
                </div>

                <div className="mt-8 grid max-w-2xl grid-cols-3 gap-px bg-white/14">
                  {[
                    ["13+", "Industry pages"],
                    ["24 h", "Quote response"],
                    ["OEM", "Carton programs"],
                  ].map(([value, label]) => (
                    <div key={label} className="bg-[#101b19]/82 p-3 sm:p-4">
                      <div className="text-xl font-extrabold text-white sm:text-2xl">{value}</div>
                      <div className="mt-1 text-[10px] font-bold text-[#c7d0cb] sm:text-xs">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
                <div className="group relative min-h-[260px] overflow-hidden border border-white/16 bg-[#0b1513]/60 md:min-h-[420px]">
                  <SlotImage
                    slotKey="home.product.thermal-rolls"
                    fill
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    quality={76}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101b19] via-[#101b19]/48 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-xs font-bold text-[#d6b273]">Thermal paper rolls</p>
                    <h2 className="mt-3 text-2xl font-extrabold text-white">POS, ATM, lottery, casino, ticketing</h2>
                    <p className="mt-3 text-sm leading-6 text-[#c7d0cb]">
                      Start from roll width, OD, core ID, coating, image life, and carton pack.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3">
                  {[
                    {
                      slot: "home.product.thermal-labels" as SlotName,
                      title: "Thermal labels",
                      text: "Shipping, freezer, food, pharmacy, cannabis, and warehouse barcode labels.",
                    },
                    {
                      slot: "home.compliance" as SlotName,
                      title: "Document route",
                      text: "BPA-free, REACH, RoHS, FDA, FSC, ISO, Prop 65, and customer files.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="relative min-h-[160px] overflow-hidden border border-white/16 bg-[#0b1513] md:min-h-[204px]">
                      <SlotImage
                        slotKey={item.slot}
                        fill
                        sizes="(max-width: 1024px) 100vw, 28vw"
                        className="object-cover opacity-80"
                        quality={72}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#101b19] via-[#101b19]/36 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <h2 className="text-xl font-extrabold text-white">{item.title}</h2>
                        <p className="mt-2 text-sm leading-6 text-[#c7d0cb]">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#ded6c8] bg-[#fbfaf6] py-12 md:py-14">
          <div className="container-site">
            <div className="mb-8 max-w-3xl">
              <h2 className="max-w-3xl text-3xl font-extrabold tracking-normal text-[#14211f] md:text-5xl">
                Use the application first, then check the spec.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#4f5f5a]">
                Buyers rarely start from a product name alone. These routes connect the application, printer environment,
                compliance documents, and shipment details.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {SCENARIO_ROUTES.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group overflow-hidden border border-[#ded6c8] bg-white shadow-[0_14px_34px_rgba(20,33,31,0.06)] transition duration-200 hover:-translate-y-1 hover:border-[#0f5f5c]/35 hover:shadow-[0_18px_48px_rgba(20,33,31,0.12)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#ebe5d9]">
                    <SlotImage
                      slotKey={item.image}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      quality={72}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101b19]/72 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-flex h-9 w-9 items-center justify-center bg-white/90 text-[#0f5f5c]">
                        <SearchCheck className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-extrabold tracking-normal text-[#14211f] transition group-hover:text-[#0f5f5c]">
                      {item.label}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#4f5f5a]">{item.detail}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0f5f5c]">
                      View route
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f4f0e8] py-16 md:py-20">
          <div className="container-site">
            <div className="mb-10 grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <div>
                <h2 className="max-w-3xl text-3xl font-extrabold tracking-normal text-[#14211f] md:text-5xl">
                  High-repeat categories with clear buyer checks.
                </h2>
              </div>
              <div className="lg:justify-self-end">
                <p className="max-w-xl text-sm leading-7 text-[#4f5f5a]">
                  These six routes cover the highest-repeat thermal paper and label purchases. Each card shows the buyer
                  reason, the risk to check, and the details needed for a cleaner quote.
                </p>
                <Link
                  href="/quote"
                  className="mt-5 inline-flex w-fit items-center justify-center gap-2 bg-[#101b19] px-6 py-3 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#0f5f5c] active:translate-y-px"
                >
                  Request a Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {priorityIndustries.map((industry) => {
                const insight = getInsightLine(industry.slug);
                return (
                  <Link
                    key={industry.slug}
                    href={`/industries/${industry.slug}`}
                    className="group flex min-h-full flex-col overflow-hidden border border-[#ded6c8] bg-[#fbfaf6] shadow-[0_14px_34px_rgba(20,33,31,0.06)] transition duration-200 hover:-translate-y-1 hover:border-[#0f5f5c]/35 hover:shadow-[0_20px_54px_rgba(20,33,31,0.12)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#ebe5d9]">
                      <SlotImage
                        slotKey={getPriorityIndustryImage(industry.slug)}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover object-center transition duration-500 group-hover:scale-[1.04]"
                        quality={74}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#101b19]/58 via-[#101b19]/8 to-transparent" />
                      <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center bg-white text-[#0f5f5c] shadow-lg">
                        {INDUSTRY_ICONS[industry.icon] ?? <Factory className="h-5 w-5" />}
                      </div>
                      <div className="absolute bottom-5 left-5 right-5">
                        <h3 className="mt-2 text-2xl font-extrabold tracking-normal text-white">
                          {industry.name}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-sm leading-6 text-[#4f5f5a]">
                        {getPriorityCardSummary(industry.slug, industry.description)}
                      </p>

                      {insight ? (
                        <div className="mt-4 space-y-2 border-t border-[#ded6c8] pt-4">
                          {[
                            ["Buyer", insight.motive],
                            ["Check", insight.risk],
                          ].map(([label, text]) => (
                            <div key={label} className="grid grid-cols-[64px_1fr] gap-3 text-sm leading-6">
                              <span className="text-[10px] font-bold text-[#87918c]">
                                {label}
                              </span>
                              <span className={label === "Buyer" ? "font-bold text-[#14211f]" : "text-[#4f5f5a]"}>
                                {text}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-4 border-t border-[#ded6c8] pt-4 text-sm leading-6 text-[#4f5f5a]">
                          Share the product use case, printer or system model, monthly volume, and document requirements.
                        </p>
                      )}

                      <div className="mt-auto pt-4">
                        <span className="inline-flex items-center gap-2 text-sm font-bold text-[#0f5f5c]">
                          Open industry page
                          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#fbfaf6] py-16 md:py-20">
          <div className="container-site">
            <div className="mb-10 max-w-3xl">
              <h2 className="max-w-3xl text-3xl font-extrabold tracking-normal text-[#14211f] md:text-5xl">
                Browse the full application index.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#4f5f5a]">
                Each link reinforces the site architecture for industry search intent while giving buyers a practical
                path to the correct thermal paper roll, label, or ticket stock.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {remainingIndustries.map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  className="group flex min-h-full flex-col overflow-hidden border border-[#ded6c8] bg-white shadow-[0_12px_30px_rgba(20,33,31,0.05)] transition duration-200 hover:-translate-y-1 hover:border-[#0f5f5c]/35 hover:shadow-[0_18px_48px_rgba(20,33,31,0.1)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#ebe5d9]">
                    <SlotImage
                      slotKey={getIndustryImage(industry.slug)}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover object-center transition duration-500 group-hover:scale-[1.04]"
                      quality={68}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101b19]/42 via-transparent to-transparent" />
                    <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center bg-white text-[#0f5f5c] shadow-lg">
                      {INDUSTRY_ICONS[industry.icon] ?? <Factory className="h-5 w-5" />}
                    </div>
                    {industry.tag && (
                      <span className="absolute right-4 top-4 border border-[#d6b273]/35 bg-[#fbfaf6]/92 px-2 py-1 text-[10px] font-bold text-[#7a551d]">
                        {industry.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-extrabold tracking-normal text-[#14211f] transition group-hover:text-[#0f5f5c]">
                      {industry.name}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#4f5f5a]">
                      {getIndustrySummary(industry.slug, industry.description)}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {industry.products.slice(0, 2).map((product) => (
                        <span key={product} className="bg-[#f4f0e8] px-2 py-1 text-xs font-medium text-[#4f5f5a]">
                          {product}
                        </span>
                      ))}
                    </div>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-[#0f5f5c]">
                      View solution
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}

              <Link
                href="/quote"
                className="group flex min-h-full flex-col justify-between overflow-hidden border border-[#101b19] bg-[#101b19] p-6 text-white shadow-sm transition duration-200 hover:-translate-y-1 hover:bg-[#0f5f5c] hover:shadow-[0_18px_48px_rgba(20,33,31,0.16)]"
              >
                <div>
                  <div className="mb-8 flex h-11 w-11 items-center justify-center bg-white/10 text-[#d6b273]">
                    <SearchCheck className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-bold text-[#d6b273]">Not sure where to start?</p>
                  <h3 className="mt-4 text-2xl font-extrabold tracking-normal text-white">
                    Send your use case and specs.
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#c7d0cb]">
                    Share the industry, roll or label size, printer model, destination, and compliance files. We will
                    route the inquiry to the right product.
                  </p>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white">
                  Request a Quote
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#101b19] py-16 text-white md:py-20">
          <div className="container-site">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div>
                <p className="section-label text-[#d6b273]">SEO and quote quality</p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-normal text-white md:text-5xl">
                  Send the details that change the price.
                </h2>
                <p className="mt-5 text-sm leading-7 text-[#c7d0cb]">
                  Thermal paper pricing changes with size, coating, image life, adhesive, cartons, document files, and
                  freight terms. A complete RFQ helps us quote the correct product the first time.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/quote"
                    className="inline-flex items-center justify-center gap-2 bg-[#9c661d] px-7 py-3.5 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#7d4f16] active:translate-y-px"
                  >
                    Request a Quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/samples"
                    className="inline-flex items-center justify-center gap-2 border border-white/24 px-7 py-3.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/[0.08] active:translate-y-px"
                  >
                    Request Samples
                  </Link>
                </div>
              </div>

              <div className="grid gap-px bg-white/12 sm:grid-cols-2">
                {BUYER_CHECKS.map((item) => (
                  <div key={item} className="bg-[#0b1513] p-5">
                    <CheckCircle2 className="h-5 w-5 text-[#d6b273]" />
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-100">{item}</p>
                  </div>
                ))}
                <div className="bg-[#0f5f5c] p-5 sm:col-span-2">
                  <div className="flex items-start gap-4">
                    <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#f4d28d]" />
                    <p className="text-sm leading-7 text-slate-100">
                      Use this page to route buyers by industry, then send them to product pages, compliance pages, or the RFQ form.
                      This keeps the page useful for search engines and for procurement teams.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f4f0e8] py-16">
          <div className="container-site">
            <div className="mb-8 flex items-center gap-3">
              <FileCheck className="h-5 w-5 text-[#0f5f5c]" />
              <h2 className="text-2xl font-extrabold tracking-normal text-[#14211f] md:text-3xl">
                Document paths buyers often request
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {DOCUMENT_ROUTES.map((route) => (
                <Link key={route.href} href={route.href} className="group border border-[#ded6c8] bg-[#fbfaf6] p-6 transition duration-200 hover:-translate-y-0.5 hover:border-[#0f5f5c]/35 hover:bg-white">
                  <h3 className="text-lg font-extrabold text-[#14211f] transition group-hover:text-[#0f5f5c]">
                    {route.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#4f5f5a]">{route.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0f5f5c]">
                    View document route
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
