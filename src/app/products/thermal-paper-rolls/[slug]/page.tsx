import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import StandardPosRollPage from "@/components/products/StandardPosRollPage";
import AtmBankingRollPage from "@/components/products/AtmBankingRollPage";
import { THERMAL_PAPER_ROLLS } from "@/lib/data";
import { PRODUCT_BUYER_CHECKS } from "@/lib/marketInsights";
import { breadcrumbSchema, canonicalUrl, faqSchema, productSchema } from "@/lib/seo";
import {
  ArrowRight, CheckCircle2, Package, Truck, Award, ChevronRight,
  Star, Shield, Zap, MessageSquare, Download, Layers, Clock,
  Factory, FileCheck, TrendingUp, Users, Phone
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

const STANDARD_POS_PAGE = {
  title: "POS receipt paper rolls for Europe, USA and Canada",
  kicker: "BPA-free POS rolls · Factory-direct wholesale",
  subtitle:
    "80mm and 57mm thermal receipt rolls for retail distributors, POS suppliers, restaurants, supermarkets, and payment terminal programs.",
  intro:
    "Source standard POS thermal paper rolls with clear size control, printer fit, compliance documents, and export packaging for repeat orders across Europe, the United States, and Canada.",
  buyerTypes: [
    "Thermal paper distributors and importers",
    "Retail chain and supermarket procurement teams",
    "POS equipment resellers and payment terminal suppliers",
    "Restaurant, QSR, hospitality, and foodservice groups",
  ],
  quoteChecklist: [
    "Roll width, length or outer diameter",
    "Core ID, winding direction, and carton count",
    "Printer or terminal model, such as Epson, Star, Bixolon, Clover, Square, or PAX",
    "BPA-free, REACH, Prop 65, FDA, FSC, or phenol-free document needs",
    "Destination market, shipping term, and pallet or mixed-SKU plan",
  ],
  regionalNotes: [
    {
      market: "Europe",
      href: "/eu",
      compliance: "BPA-free, REACH, RoHS, FSC, and EU buyer document packs",
      sourcing: "Common POS roll sizes include 80x80mm and 57mm till rolls for retail and hospitality distributors.",
      shipping: "FOB Qingdao, CIF Hamburg or Rotterdam, and DDP options on request.",
    },
    {
      market: "United States",
      href: "/us",
      compliance: "BPA-free, Prop 65 support, FDA-related document requests, and ISO files",
      sourcing: "Popular for 3 1/8 inch receipt rolls, payment terminal programs, POS resellers, and retail chains.",
      shipping: "FOB Qingdao, CIF Los Angeles or Long Beach, plus DDP and LTL planning for repeat orders.",
    },
    {
      market: "Canada",
      href: "/ca",
      compliance: "BPA-free, Health Canada oriented document support, and bilingual EN/FR file requests",
      sourcing: "Built for Canadian distributors serving retail, pharmacy, restaurant, and cannabis-adjacent POS channels.",
      shipping: "Vancouver, Prince Rupert, Montreal, and DDP Canada routes can be quoted by volume.",
    },
  ],
  faqs: [
    {
      question: "What POS receipt roll sizes can Zhixin Paper supply?",
      answer:
        "We supply common 57mm and 80mm POS receipt roll sizes, including 57x38mm, 57x40mm, 57x50mm, 80x60mm, and 80x80mm. Custom width, length, core ID, and carton packing can be quoted for distributors.",
    },
    {
      question: "Are these POS thermal paper rolls available as BPA-free?",
      answer:
        "Yes. BPA-free POS thermal paper grades are available for Europe, the United States, and Canada. Buyers can request REACH, RoHS, Prop 65, FDA-related, FSC, ISO, or phenol-free document support before ordering.",
    },
    {
      question: "Which POS printers are compatible with these receipt rolls?",
      answer:
        "Standard POS rolls are commonly used with Epson, Star, Bixolon, Citizen, Clover, Square, PAX, and similar receipt or payment terminal printers. Share your printer model before sampling so roll width, OD, core, and winding direction can be checked.",
    },
    {
      question: "What information should I send for a POS roll quote?",
      answer:
        "Send roll size, target length or outer diameter, core ID, quantity, carton packing, printer model, destination country, compliance documents required, and preferred shipping term such as FOB, CIF, or DDP.",
    },
  ],
};

const STANDARD_POS_HERO_PROOFS = [
  "Measured roll length before shipment",
  "BPA-free, REACH and Prop 65 files",
  "Fit check for Epson, Star, Clover and PAX",
  "Shrink-wrap cartons for moisture control",
];

const STANDARD_POS_RFQ_FIELDS = [
  "Roll width + target length or OD",
  "Core ID, winding direction and carton count",
  "Printer / payment terminal model",
  "Destination market + document pack required",
];

const ATM_BANKING_FAQS = [
  {
    question: "Which ATM and banking terminal brands can these rolls support?",
    answer: "We supply rolls for Diebold Nixdorf, NCR, Wincor, Hyosung, bank teller terminals, and financial kiosks. Send the exact terminal model so width, OD, core ID, winding direction, and feed requirements can be checked before sampling.",
  },
  {
    question: "How is the seven-year image-life requirement confirmed?",
    answer: "Archival performance depends on the selected grade and storage environment. We can provide an archival-grade test report and document the expected heat, humidity, light, and handling conditions on the technical data sheet.",
  },
  {
    question: "Can regulatory disclosures be printed on the reverse side?",
    answer: "Yes. Optional black or blue back print is available for disclosures, terms, support information, or multilingual content. Artwork revision, print side, ink color, and approval records are confirmed before production.",
  },
  {
    question: "What information is needed for an ATM roll quotation?",
    answer: "Send the terminal brand and model, roll width, OD or length, core ID, winding direction, quantity, image-life target, back-print requirement, destination, Incoterm, and required compliance documents.",
  },
];

const STANDARD_POS_DECISION_CARDS = [
  {
    label: "Specification lock",
    title: "Confirm the roll before you confirm the price.",
    body: "Width, OD, real length, core ID, paper GSM, winding direction and carton count are checked before sampling.",
  },
  {
    label: "Field reliability",
    title: "Built around the complaints buyers actually see.",
    body: "Low dust coating, stable diameter and clean slitting help reduce jams, fading, short rolls and counter returns.",
  },
  {
    label: "Import approval",
    title: "Compliance files travel with the quote.",
    body: "BPA-free, REACH, RoHS, Prop 65, FSC, ISO and TDS files can be prepared before your internal approval.",
  },
];

const STANDARD_POS_RISK_MAP = [
  {
    risk: "Short rolls",
    proof: "Measured length, OD and carton count locked on the quote sheet.",
  },
  {
    risk: "Printer jams",
    proof: "Core ID, width tolerance, winding direction and target printer model checked before sampling.",
  },
  {
    risk: "Fading receipts",
    proof: "Thermal coating, storage conditions and image-life expectation documented in the TDS.",
  },
  {
    risk: "Chemical claims",
    proof: "BPA-free, BPS-free or phenol-free document routes prepared for EU, US and Canada buyers.",
  },
  {
    risk: "Crushed cartons",
    proof: "Shrink wrap, export cartons and pallet plan matched to LCL, pallet or container shipping.",
  },
  {
    risk: "Approval delays",
    proof: "SGS, Intertek, ISO, REACH and FSC file requests collected at the RFQ stage.",
  },
];

export async function generateStaticParams() {
  return THERMAL_PAPER_ROLLS.map((roll) => ({ slug: roll.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const roll = THERMAL_PAPER_ROLLS.find((r) => r.slug === slug);
  if (!roll) return {};

  if (slug === "standard-pos-rolls") {
    return {
      title: "POS Receipt Paper Rolls for Europe, USA & Canada | BPA-Free Wholesale",
      description:
        "BPA-free POS receipt paper rolls for Europe, USA, and Canada. 80mm and 57mm thermal rolls, printer fit checks, compliance documents, OEM packing, samples, and FOB/CIF/DDP quotes.",
      keywords:
        "POS receipt paper rolls Europe, POS receipt paper rolls USA, thermal paper rolls Canada, BPA-free POS rolls wholesale, 80mm thermal receipt rolls, 57mm POS paper rolls, Epson compatible receipt paper, Star printer thermal rolls, receipt paper distributor supplier",
      alternates: { canonical: canonicalUrl(`/products/thermal-paper-rolls/${slug}`) },
      openGraph: {
        title: "POS Receipt Paper Rolls for Europe, USA & Canada",
        description:
          "Factory-direct BPA-free POS thermal paper rolls with compliance files, printer fit checks, export packing, and regional shipping options.",
        type: "website",
        images: [
          {
            url: "/images/thermal-rolls-product.jpg",
            width: 1200,
            height: 630,
            alt: "BPA-free POS thermal receipt paper rolls for distributors",
          },
        ],
      },
    };
  }

  if (slug === "atm-banking-rolls") {
    return {
      title: { absolute: "ATM Receipt Paper Rolls | Zhixin Paper" },
      description:
        "BPA-free ATM receipt paper rolls with anti-static coating, up to 7-year image life, terminal fit checks, optional back print, and compliance files.",
      keywords:
        "ATM receipt paper rolls, archival thermal paper, bank receipt rolls, Diebold Nixdorf paper, NCR ATM paper, anti-static thermal paper, ATM back print paper",
      alternates: { canonical: canonicalUrl(`/products/thermal-paper-rolls/${slug}`) },
      openGraph: {
        title: "ATM Receipt Paper Rolls for Banking Terminals",
        description:
          "Archival-grade, anti-static ATM receipt paper with terminal fit checks, compliance files, and optional regulatory back print.",
        type: "website",
        images: [{ url: "/images/thermal-rolls-product.jpg", width: 1200, height: 630, alt: "ATM and bank receipt thermal paper rolls" }],
      },
    };
  }

  return {
    title: `${roll.name} — ${roll.subtitle} | Wholesale Manufacturer`,
    description: `${roll.name} thermal paper rolls wholesale from ISO 9001 certified manufacturer. ${roll.keywords}. BPA-free, FDA-compliant options. MOQ ${roll.moq}. Factory-direct pricing, pallet and container load available. Free samples via DHL/FedEx.`,
    keywords: `${roll.keywords}, thermal paper rolls wholesale, BPA free thermal paper, FDA compliant, factory direct pricing, ${roll.name} manufacturer`,
    alternates: { canonical: canonicalUrl(`/products/thermal-paper-rolls/${slug}`) },
  };
}

// ── Printer compatibility data by product slug ──
const PRINTER_COMPAT: Record<string, { brand: string; models: string }[]> = {
  "standard-pos-rolls": [
    { brand: "Epson", models: "TM-T20III / TM-T82III / TM-T88VII" },
    { brand: "Star", models: "TSP100IV / TSP650II / mC-Print3" },
    { brand: "Bixolon", models: "SRP-350V / SRP-380" },
    { brand: "Citizen", models: "CT-S310II / CT-S651" },
  ],
  "atm-banking-rolls": [
    { brand: "Diebold Nixdorf", models: "DN200 / DN800 Series" },
    { brand: "NCR", models: "SelfServ 80 / 6622 / 6687" },
    { brand: "Wincor", models: "ProCash 2050xe / 4060xe" },
    { brand: "Hyosung", models: "MX5600T / MX8800T" },
  ],
  "lottery-gaming-rolls": [
    { brand: "IGT", models: "S2000 / AVP Series" },
    { brand: "Aristocrat", models: "MKVI / Helix" },
    { brand: "Scientific Games", models: "ProStar Series" },
    { brand: "Interlott", models: "Vmax / Omega" },
  ],
};

// ── Tiered pricing data by product slug ──
const TIERED_PRICING: Record<string, { tier: string; qty: string; unit: string; savings: string }[]> = {
  "standard-pos-rolls": [
    { tier: "Sample", qty: "1–9 cartons", unit: "Contact for price", savings: "—" },
    { tier: "Starter", qty: "10–49 cartons", unit: "Best for small distributors", savings: "5% off" },
    { tier: "Volume", qty: "50–199 cartons", unit: "Pallet pricing", savings: "12% off" },
    { tier: "Container", qty: "200+ cartons", unit: "FCL factory-direct", savings: "20% off" },
  ],
  "default": [
    { tier: "Sample", qty: "1 carton", unit: "Contact for price", savings: "—" },
    { tier: "Starter", qty: "5–19 cartons", unit: "Best for small distributors", savings: "5% off" },
    { tier: "Volume", qty: "20–99 cartons", unit: "Pallet pricing", savings: "12% off" },
    { tier: "Container", qty: "100+ cartons", unit: "FCL factory-direct", savings: "20% off" },
  ],
};

// ── Compliance documents by product slug ──
const COMPLIANCE_DOCS: Record<string, { name: string; desc: string; icon: string }[]> = {
  "standard-pos-rolls": [
    { name: "BPA-Free Test Report (SGS)", desc: "EU 2024/3190 compliant — no BPA, BPS, or BPAF", icon: "shield" },
    { name: "REACH SVHC Declaration", desc: "240+ substances tested, Annex XVII compliant", icon: "file" },
    { name: "ISO 9001:2015 Certificate", desc: "TÜV-recognized, annual surveillance audit", icon: "award" },
    { name: "Technical Data Sheet (TDS)", desc: "Full specifications, storage conditions, print parameters", icon: "download" },
  ],
  "atm-banking-rolls": [
    { name: "BPA-Free Certificate (SGS)", desc: "Standard — no surcharge required", icon: "shield" },
    { name: "REACH / RoHS Declaration", desc: "EU banking regulatory compliance", icon: "file" },
    { name: "ISO 9001:2015 Certificate", desc: "Quality management system certification", icon: "award" },
    { name: "Archival Grade Test Report", desc: "7-year image life verified by independent lab", icon: "download" },
  ],
  "default": [
    { name: "BPA-Free Test Report (SGS)", desc: "EU 2024/3190 compliant", icon: "shield" },
    { name: "REACH SVHC Declaration", desc: "EU REACH Annex XVII compliant", icon: "file" },
    { name: "ISO 9001:2015 Certificate", desc: "Certified quality management", icon: "award" },
    { name: "Technical Data Sheet (TDS)", desc: "Full product specifications", icon: "download" },
  ],
};

export default async function RollDetailPage({ params }: Props) {
  const { slug } = await params;
  const roll = THERMAL_PAPER_ROLLS.find((r) => r.slug === slug);
  if (!roll) notFound();

  const related = THERMAL_PAPER_ROLLS.filter((r) => r.slug !== slug).slice(0, 4);
  const heroText = (roll as { heroDesc?: string }).heroDesc || `${roll.name} — manufactured to the highest quality standards. BPA-free options, custom OEM printing, and private label for distributors worldwide.`;
  const descText = (roll as { description?: string }).description || `Premium ${roll.name} for wholesale distributors and importers. ISO 9001:2015 certified. MOQ ${roll.moq}. Custom OEM and private label available.`;

  const printers = PRINTER_COMPAT[slug] || null;
  const pricing = TIERED_PRICING[slug] || TIERED_PRICING["default"];
  const complianceDocs = COMPLIANCE_DOCS[slug] || COMPLIANCE_DOCS["default"];
  const buyerChecks = PRODUCT_BUYER_CHECKS[slug] || null;
  const isStandardPos = slug === "standard-pos-rolls";
  const isAtmBanking = slug === "atm-banking-rolls";
  const productJsonLd = productSchema({
    name: isStandardPos ? "POS Receipt Paper Rolls" : roll.name,
    description: isStandardPos ? STANDARD_POS_PAGE.intro : descText,
    image: "/images/thermal-rolls-product.jpg",
    url: `/products/thermal-paper-rolls/${slug}`,
    sku: `thermal-roll-${slug}`,
    category: "Thermal Paper Rolls",
    keywords: isStandardPos
      ? "POS receipt paper rolls, BPA-free thermal paper rolls, 80mm receipt rolls, 57mm POS rolls, Europe USA Canada thermal paper supplier"
      : roll.keywords,
  });

  const atmProductJsonLd = {
    ...productJsonLd,
    "@id": `${canonicalUrl(`/products/thermal-paper-rolls/${slug}`)}#product`,
    name: "ATM Receipt Paper Rolls",
    alternateName: ["ATM Thermal Paper Rolls", "Bank Receipt Paper Rolls", "Archival ATM Paper"],
    description:
      "BPA-free, anti-static ATM receipt paper rolls with up to 7-year image life, optional regulatory back print, and fit checks for major banking terminal platforms.",
    material: "Archival-grade thermal paper",
    model: "57mm, 80mm and 82.5mm ATM roll formats",
    additionalProperty: [
      { "@type": "PropertyValue", name: "Common widths", value: "57mm, 80mm, 82.5mm" },
      { "@type": "PropertyValue", name: "Image life", value: "Up to 7 years under specified storage conditions" },
      { "@type": "PropertyValue", name: "Anti-static coating", value: "Standard" },
      { "@type": "PropertyValue", name: "Print speed", value: "Up to 300mm/sec" },
      { "@type": "PropertyValue", name: "Back print", value: "Optional black or blue ink" },
      { "@type": "PropertyValue", name: "BPA status", value: "BPA-free standard" },
      { "@type": "PropertyValue", name: "Minimum order quantity", value: roll.moq },
      { "@type": "PropertyValue", name: "Compatible platforms", value: "Diebold Nixdorf, NCR, Wincor, Hyosung" },
    ],
  };

  const atmRelatedProductsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Related thermal paper products for banking buyers",
    itemListElement: [
      ["Back Print Thermal Rolls", "/products/thermal-paper-rolls/back-print-thermal-rolls"],
      ["Kiosk and Vending Rolls", "/products/thermal-paper-rolls/kiosk-vending-rolls"],
      ["Standard POS Rolls", "/products/thermal-paper-rolls/standard-pos-rolls"],
      ["Custom Printed Rolls", "/products/thermal-paper-rolls/custom-printed-rolls"],
    ].map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      url: canonicalUrl(path),
    })),
  };

  const jsonLd = [
    breadcrumbSchema([
      { name: "Products", url: "/products" },
      { name: "Thermal Paper Rolls", url: "/products/thermal-paper-rolls" },
      { name: roll.name, url: `/products/thermal-paper-rolls/${slug}` },
    ]),
    isAtmBanking ? atmProductJsonLd : productJsonLd,
    ...(isAtmBanking ? [atmRelatedProductsJsonLd] : []),
    ...(isStandardPos ? [faqSchema(STANDARD_POS_PAGE.faqs)] : []),
    ...(isAtmBanking ? [faqSchema(ATM_BANKING_FAQS)] : []),
  ];

  if (isStandardPos) {
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
        <StandardPosRollPage
          roll={roll}
          faqs={STANDARD_POS_PAGE.faqs}
          regionalNotes={STANDARD_POS_PAGE.regionalNotes}
        />
        <Footer />
      </>
    );
  }

  if (isAtmBanking) {
    return (
      <>
        <Header />
        {jsonLd.map((schema, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
        <AtmBankingRollPage roll={roll} faqs={ATM_BANKING_FAQS} />
        <Footer />
      </>
    );
  }

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
      {isStandardPos && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .standard-pos-hero-grid {
                display: grid;
                gap: 2rem;
              }
              @media (min-width: 1024px) {
                .standard-pos-hero-grid {
                  grid-template-columns: minmax(0, 1fr) minmax(340px, 410px);
                  align-items: center;
                }
              }
            `,
          }}
        />
      )}
      <main id="main-content" className="product-detail">

        {/* ── HERO: Full-width product image with overlay info ── */}
        <section className="relative overflow-hidden bg-[#101b19] pt-[72px]">
          {/* Breadcrumb bar */}
          <div className="relative z-10 border-b border-white/10 bg-[#101b19]/85 backdrop-blur-sm">
            <div className="container-site py-3">
              <nav className="flex items-center gap-1.5 text-xs text-slate-400">
                <Link href="/products" className="hover:text-white transition-colors">Products</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/products/thermal-paper-rolls" className="hover:text-white transition-colors">Thermal Paper Rolls</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-300">{roll.name}</span>
              </nav>
            </div>
          </div>

          {/* Large product image */}
          <div className="relative overflow-hidden">
            <Image
              src="/images/thermal-rolls-product.jpg"
              alt={isStandardPos ? "BPA-free POS receipt paper rolls for Europe USA and Canada distributors" : `${roll.name} - Thermal Paper Rolls`}
              fill
              className="object-cover object-center"
              preload
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,20,18,0.97)_0%,rgba(8,20,18,0.82)_54%,rgba(8,20,18,0.24)_100%)]" />

            {/* Overlay content */}
            <div className="relative z-10">
              <div className="container-site py-10 md:py-14 lg:py-16">
                <div className="standard-pos-hero-grid">
                  <div className="max-w-3xl">
                  <h1 className="font-bold text-white text-4xl md:text-5xl xl:text-6xl leading-tight mb-4 drop-shadow-lg">
                    {isStandardPos ? STANDARD_POS_PAGE.title : roll.name}
                  </h1>
                  <p className="max-w-xl text-[#d6b273] text-xl font-medium mb-5">
                    {isStandardPos ? STANDARD_POS_PAGE.subtitle : roll.subtitle}
                  </p>
                  <p className="text-slate-200 text-base leading-relaxed mb-8 max-w-xl font-light">
                    {isStandardPos ? STANDARD_POS_PAGE.intro : heroText}
                  </p>
                  {isStandardPos && (
                    <div className="mb-8 grid gap-2 sm:grid-cols-2">
                      {STANDARD_POS_HERO_PROOFS.map((proof) => (
                        <div key={proof} className="flex min-h-11 items-center gap-2 border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-slate-100 backdrop-blur-sm">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#d6b273]" />
                          <span>{proof}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <Link href="/quote" className="inline-flex min-h-11 items-center gap-2 bg-[#b9822f] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#101b19]/30 transition-all hover:bg-[#9f6e25]">
                      Request a Quote <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link href="/samples" className="inline-flex min-h-11 items-center gap-2 border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/20">
                      Request Samples
                    </Link>
                    <a
                      href="/contact"
                      className="inline-flex min-h-11 items-center gap-2 border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/20"
                    >
                      <Download className="w-4 h-4" /> Compliance Docs
                    </a>
                  </div>
                </div>

                  <div className="border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/30 md:p-6">
                    {isStandardPos ? (
                      <>
                        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0f5f5c]">RFQ starter pack</p>
                            <h2 className="mt-2 text-2xl font-extrabold tracking-normal text-slate-950">
                              Send four details. Get a usable landed-cost quote.
                            </h2>
                          </div>
                          <div className="hidden h-11 w-11 shrink-0 items-center justify-center bg-[#b9822f] text-white sm:flex">
                            <MessageSquare className="h-5 w-5" />
                          </div>
                        </div>
                        <div className="mt-5 grid gap-3">
                          {STANDARD_POS_RFQ_FIELDS.map((field, index) => (
                            <div key={field} className="flex items-start gap-3 bg-slate-50 p-3">
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-slate-950 text-xs font-bold text-white">
                                {index + 1}
                              </span>
                              <span className="text-sm font-semibold leading-6 text-slate-700">{field}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-slate-200 pt-5 text-center">
                          {[
                            ["MOQ", roll.moq],
                            ["Lead", "10-15 days"],
                            ["Markets", "EU / US / CA"],
                          ].map(([label, value]) => (
                            <div key={label} className="bg-[#f4f0e8] px-2 py-3">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-[#0f5f5c]">{label}</p>
                              <p className="mt-1 text-sm font-extrabold text-slate-950">{value}</p>
                            </div>
                          ))}
                        </div>
                        <Link
                          href="/quote"
                          className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-[#9f6e25]"
                        >
                          Request a Quote
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </>
                    ) : (
                      <div className="grid gap-3">
                        {[
                          { icon: <Package className="w-4 h-4" />, label: "MOQ", value: roll.moq },
                          { icon: <Clock className="w-4 h-4" />, label: "Lead Time", value: "10-15 Days" },
                          { icon: <Award className="w-4 h-4" />, label: "Certified", value: "ISO 9001" },
                          { icon: <Shield className="w-4 h-4" />, label: "BPA-Free", value: "Available" },
                        ].map((item) => (
                          <div key={item.label} className="flex items-center gap-3 bg-slate-50 p-4">
                            <span className="text-[#0f5f5c]">{item.icon}</span>
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{item.label}</div>
                              <div className="text-sm font-bold text-slate-950">{item.value}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST SIGNAL BAR ── */}
        <section className="py-4 bg-slate-800 border-b border-slate-700">
          <div className="container-site">
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
              {[
                { icon: <Factory className="w-3.5 h-3.5 text-[#d6b273]" />, text: "500M+ rolls/year factory capacity" },
                { icon: <FileCheck className="w-3.5 h-3.5 text-emerald-400" />, text: "SGS & TÜV test reports available" },
                { icon: <Truck className="w-3.5 h-3.5 text-[#d6b273]" />, text: "FOB Qingdao · DDP Europe/USA" },
                { icon: <Users className="w-3.5 h-3.5 text-amber-400" />, text: "Trusted by 500+ distributors in 80+ countries" },
                { icon: <Clock className="w-3.5 h-3.5 text-[#d6b273]" />, text: "24-hour quote response" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {isStandardPos && (
          <section className="bg-white py-14 border-b border-slate-100">
            <div className="container-site">
              <div className="mb-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                <div>
                  <p className="section-label">POS roll buying cockpit</p>
                  <h2 className="mt-3 text-3xl font-extrabold tracking-normal text-slate-950 md:text-4xl">
                    Move from sample request to reorder without hidden roll risks.
                  </h2>
                </div>
                <p className="text-sm leading-7 text-slate-600">
                  This page is structured for distributors, POS equipment resellers and retail buyers who need
                  a stable repeat-order thermal receipt roll, not a one-time commodity quote.
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {STANDARD_POS_DECISION_CARDS.map((card) => (
                  <div key={card.label} className="border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0f5f5c]">{card.label}</p>
                    <h3 className="mt-3 text-xl font-extrabold tracking-normal text-slate-950">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{card.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
                <div className="bg-slate-950 p-6 text-white">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-sky-300" />
                    <h3 className="text-lg font-extrabold tracking-normal text-white">Built for monthly reorder buyers</h3>
                  </div>
                  <div className="mt-5 grid gap-3">
                    {STANDARD_POS_PAGE.buyerTypes.map((type) => (
                      <div key={type} className="flex items-start gap-3 border-t border-white/10 pt-3 text-sm leading-6 text-slate-200">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                        {type}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-slate-200 bg-slate-50 p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-[#0f5f5c]" />
                      <h3 className="text-lg font-extrabold tracking-normal text-slate-950">Quote checklist</h3>
                    </div>
                    <span className="hidden text-xs font-bold uppercase tracking-widest text-slate-400 sm:inline">
                      24h response
                    </span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {STANDARD_POS_PAGE.quoteChecklist.map((item) => (
                      <div key={item} className="min-h-20 bg-white p-4 text-sm font-medium leading-6 text-slate-700">
                        {item}
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/quote"
                    className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-[#9f6e25]"
                  >
                    Request a Quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {!isStandardPos && (
          <section className="py-12 bg-white border-b border-slate-100">
            <div className="container-site">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-[#0f5f5c]" />
                  <span className="text-xs font-bold tracking-widest uppercase text-[#0f5f5c]">Product Overview</span>
                </div>
                <p className="text-slate-700 text-lg leading-relaxed">
                  {descText}
                </p>
              </div>
            </div>
          </section>
        )}

        {isStandardPos && (
          <section className="bg-slate-950 py-14 text-white">
            <div className="container-site">
              <div className="mb-8 grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-300">
                    VoC risk map
                  </p>
                  <h2 className="mt-3 text-3xl font-extrabold tracking-normal text-white md:text-4xl">
                    Turn common receipt-roll complaints into pre-shipment checks.
                  </h2>
                </div>
                <p className="text-sm leading-7 text-slate-300">
                  The goal is simple: remove the reasons a distributor loses trust after the first pallet.
                  We document fit, length, coating, chemical status and packing before the order moves.
                </p>
              </div>

              <div className="grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3">
                {STANDARD_POS_RISK_MAP.map((item) => (
                  <div key={item.risk} className="bg-slate-950 p-6">
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <h3 className="text-xl font-extrabold tracking-normal text-white">{item.risk}</h3>
                      <Shield className="h-5 w-5 text-emerald-300" />
                    </div>
                    <p className="text-sm leading-7 text-slate-300">{item.proof}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/quote" className="inline-flex min-h-11 items-center justify-center gap-2 bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-100">
                  Request a Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/samples" className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  Test Samples First
                </Link>
              </div>
            </div>
          </section>
        )}

        {buyerChecks && !isStandardPos && (
          <section className="bg-slate-950 py-14 text-white">
            <div className="container-site">
              <div className="mb-8 grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-300">
                    Buyer checks before ordering
                  </p>
                  <h2 className="mt-3 text-3xl font-extrabold tracking-normal text-white md:text-4xl">
                    Confirm the details that usually decide whether the roll works in the field.
                  </h2>
                </div>
                <p className="text-sm leading-7 text-slate-300">
                  These checks come from repeat buyer questions around fit, documents, scanning, packaging,
                  and reorder stability. Send what you know; we can help fill the gaps before sampling.
                </p>
              </div>

              <div className="grid gap-px bg-white/10 lg:grid-cols-3">
                {buyerChecks.map((check) => (
                  <div key={check.title} className="bg-slate-950 p-6">
                    <div className="mb-5 flex h-10 w-10 items-center justify-center bg-[#b9822f]/10 text-[#d6b273]">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{check.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400">{check.whyItMatters}</p>
                    <div className="mt-5 border-t border-white/10 pt-4">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-300">Confirm</p>
                      <p className="mt-2 text-sm leading-6 text-slate-200">{check.whatToConfirm}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/quote" className="inline-flex items-center justify-center gap-2 bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-100">
                  Request a Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/samples" className="inline-flex items-center justify-center gap-2 border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  Request Samples
                </Link>
              </div>
            </div>
          </section>
        )}

        {isStandardPos && (
          <section className="bg-slate-50 py-14 border-t border-slate-200">
            <div className="container-site">
              <div className="mb-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                <div>
                  <p className="section-label">Regional sourcing notes</p>
                  <h2 className="mt-3 text-3xl font-extrabold tracking-normal text-slate-950 md:text-4xl">
                    POS receipt rolls quoted for Europe, USA and Canada.
                  </h2>
                </div>
                <p className="text-sm leading-7 text-slate-600">
                  Regional pages help buyers check compliance files, common sizes, language/document needs,
                  and shipping routes before asking for landed cost.
                </p>
              </div>

              <div className="grid gap-5 lg:grid-cols-3">
                {STANDARD_POS_PAGE.regionalNotes.map((region) => (
                  <Link
                    key={region.market}
                    href={region.href}
                    className="group border border-slate-200 bg-white p-6 transition hover:border-[#0f5f5c]/40 hover:bg-[#f4f0e8]"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <h3 className="text-2xl font-extrabold tracking-normal text-slate-950">{region.market}</h3>
                      <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#0f5f5c]" />
                    </div>
                    <div className="space-y-4 text-sm leading-6 text-slate-600">
                      <p><span className="font-bold text-slate-950">Compliance:</span> {region.compliance}</p>
                      <p><span className="font-bold text-slate-950">Sourcing:</span> {region.sourcing}</p>
                      <p><span className="font-bold text-slate-950">Shipping:</span> {region.shipping}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── SPECS + FEATURES ── */}
        <section className="py-16 bg-white">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Left: Key info + features */}
              <div className="lg:col-span-1 space-y-6">

                {/* Quick highlights */}
                <div className="bg-[#f4f0e8] border border-[#ded6c8] rounded-2xl p-6">
                  <h2 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#0f5f5c]" />
                    Key Features
                  </h2>
                  <div className="space-y-3">
                    {roll.features.map((f) => (
                      <div key={f} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#0f5f5c] shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-sm leading-snug">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Applications */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                  <h2 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#0f5f5c]" />
                    Applications
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {roll.applications.map((app) => (
                      <span key={app} className="px-3 py-1.5 bg-[#b9822f] text-white text-xs font-bold rounded-lg uppercase tracking-wide">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Available sizes */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                  <h2 className="font-bold text-slate-900 text-lg mb-4">Available Sizes</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {roll.sizes.map((size) => (
                      <div key={size} className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-center text-sm font-semibold text-slate-700 hover:border-[#0f5f5c]/40 hover:bg-[#f4f0e8] transition-all cursor-default">
                        {size}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mt-3 text-center">Custom sizes available — contact us</p>
                </div>
              </div>

              {/* Right: Full spec table */}
              <div className="lg:col-span-2">
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="px-8 py-6 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="font-bold text-slate-900 text-2xl">Product Specifications</h2>
                      <p className="text-slate-500 text-sm mt-1">Complete technical specifications for {roll.name}</p>
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:border-[#0f5f5c]/40 hover:text-[#0f5f5c] transition-colors shadow-sm shrink-0"
                    >
                      <Download className="w-4 h-4" />
                      Download TDS
                    </Link>
                  </div>
                  <div className="p-8">
                    <table className="w-full">
                      <tbody>
                        {(roll as unknown as { specifications?: Record<string, string> }).specifications ? (
                          Object.entries((roll as unknown as { specifications: Record<string, string> }).specifications).map(([key, val], i) => (
                            <tr key={key} className={i % 2 === 0 ? "bg-slate-50/50" : "bg-white"}>
                              <td className="py-3.5 px-4 font-semibold text-slate-500 text-xs uppercase tracking-wide w-2/5 rounded-l-lg">{key}</td>
                              <td className="py-3.5 px-4 text-slate-800 text-sm font-medium rounded-r-lg">{val}</td>
                            </tr>
                          ))
                        ) : (
                          [
                            ["Coating Type", "Thermal sensitive coating"],
                            ["BPA-Free Option", "Available on request"],
                            ["Core Size", "12mm / 17mm / 25mm"],
                            ["Minimum Order Qty", roll.moq],
                            ["Standard Lead Time", "10–15 business days"],
                            ["Quality Certification", "ISO 9001:2015"],
                            ["Compliance", "REACH / RoHS / BPA-Free"],
                          ].map(([key, val], i) => (
                            <tr key={key} className={i % 2 === 0 ? "bg-slate-50/50" : "bg-white"}>
                              <td className="py-3.5 px-4 font-semibold text-slate-500 text-xs uppercase tracking-wide w-2/5 rounded-l-lg">{key}</td>
                              <td className="py-3.5 px-4 text-slate-800 text-sm font-medium rounded-r-lg">{val}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* CTA inside spec panel */}
                  <div className="px-8 py-6 bg-gradient-to-r from-[#0f5f5c] to-[#101b19] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="font-bold text-white text-base">Need a custom specification?</p>
                      <p className="text-[#d6b273] text-sm">Our team can tailor any product to your exact requirements.</p>
                    </div>
                    <div className="flex gap-3 shrink-0 flex-wrap">
                      <Link href="/samples" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0f5f5c] font-bold rounded-xl hover:bg-[#f4f0e8] transition-colors text-sm shadow-sm">
                        Request Samples
                      </Link>
                      <Link href="/quote" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#b9822f] text-white font-bold rounded-xl hover:bg-[#9f6e25] transition-colors text-sm shadow-sm border border-[#b9822f]">
                        Request a Quote <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PRINTER COMPATIBILITY (conditional) ── */}
        {printers && (
          <section className="py-14 bg-slate-50 border-t border-slate-200">
            <div className="container-site">
              <div className="flex items-center gap-3 mb-2">
                <Layers className="w-5 h-5 text-[#0f5f5c]" />
                <h2 className="font-bold text-slate-900 text-2xl">Printer Compatibility</h2>
              </div>
              <p className="text-slate-500 text-sm mb-8 max-w-2xl">
                Pre-tested and validated on the following printer platforms. Guaranteed scan-through-rate and zero jamming under standard operating conditions.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {printers.map((p) => (
                  <div key={p.brand} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#0f5f5c]/40 hover:shadow-sm transition-all">
                    <div className="w-8 h-8 bg-[#e7eee9] rounded-lg flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-4 h-4 text-[#0f5f5c]" />
                    </div>
                    <p className="font-bold text-slate-900 text-sm mb-1">{p.brand}</p>
                    <p className="text-slate-500 text-xs leading-relaxed">{p.models}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-4">
                Not seeing your printer model? <Link href="/contact" className="text-[#0f5f5c] hover:underline">Contact us</Link> — we test compatibility on request.
              </p>
            </div>
          </section>
        )}

        {/* ── TIERED PRICING ── */}
        <section className="py-14 bg-white border-t border-slate-100">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-[#0f5f5c]" />
              <h2 className="font-bold text-slate-900 text-2xl">Volume Pricing</h2>
            </div>
            <p className="text-slate-500 text-sm mb-8 max-w-2xl">
              Factory-direct pricing with volume discounts. The more you order, the more you save — from trial cartons to full container loads.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {pricing.map((tier, i) => (
                <div
                  key={tier.tier}
                  className={`rounded-2xl p-6 border-2 transition-all ${
                    i === 2
                      ? "border-[#0f5f5c] bg-[#f4f0e8] shadow-md shadow-[#0f5f5c]/10"
                      : "border-slate-200 bg-white hover:border-[#0f5f5c]/25"
                  }`}
                >
                  {i === 2 && (
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#b9822f] text-white text-[9px] font-bold tracking-widest uppercase rounded-full mb-3">
                      Most Popular
                    </div>
                  )}
                  <p className="font-bold text-slate-900 text-base mb-1">{tier.tier}</p>
                  <p className="text-slate-500 text-xs mb-3">{tier.qty}</p>
                  <p className="text-slate-700 text-sm font-medium mb-2">{tier.unit}</p>
                  {tier.savings !== "—" && (
                    <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                      {tier.savings}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Link href="/quote" className="inline-flex items-center gap-2 px-6 py-3 bg-[#b9822f] hover:bg-[#9f6e25] text-white font-bold rounded-xl text-sm transition-colors shadow-sm">
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-slate-400 text-xs">Response within 24 hours · No commitment required</p>
            </div>
          </div>
        </section>

        {/* ── COMPLIANCE DOCUMENTS ── */}
        <section className="py-14 bg-slate-50 border-t border-slate-200">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-2">
              <FileCheck className="w-5 h-5 text-[#0f5f5c]" />
              <h2 className="font-bold text-slate-900 text-2xl">Compliance Documents</h2>
            </div>
            <p className="text-slate-500 text-sm mb-8 max-w-2xl">
              Full compliance documentation package available for your procurement team. All documents are issued by accredited third-party laboratories and updated annually.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {complianceDocs.map((doc) => (
                <div key={doc.name} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#0f5f5c]/40 hover:shadow-sm transition-all group">
                  <div className="w-9 h-9 bg-[#f4f0e8] rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#e7eee9] transition-colors">
                    <Download className="w-4 h-4 text-[#0f5f5c]" />
                  </div>
                  <p className="font-bold text-slate-900 text-sm mb-1 leading-snug">{doc.name}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{doc.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#f4f0e8] border border-[#0f5f5c]/25 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="font-bold text-slate-900 text-sm mb-1">Request Full Compliance Pack</p>
                <p className="text-slate-500 text-xs">
                  Submit your company details and we will send the complete compliance documentation package within 24 hours — ready for your procurement audit.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#b9822f] hover:bg-[#9f6e25] text-white font-bold rounded-xl text-sm transition-colors shrink-0 shadow-sm"
              >
                <Download className="w-4 h-4" /> Request Docs
              </Link>
            </div>
          </div>
        </section>

        {isStandardPos && (
          <section className="bg-white py-14 border-t border-slate-100">
            <div className="container-site">
              <div className="mb-8 max-w-3xl">
                <p className="section-label">POS roll FAQ</p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-normal text-slate-950 md:text-4xl">
                  Questions buyers ask before ordering POS receipt paper.
                </h2>
              </div>
              <div className="grid gap-px bg-slate-200 md:grid-cols-2">
                {STANDARD_POS_PAGE.faqs.map((faq) => (
                  <div key={faq.question} className="bg-white p-6">
                    <h3 className="text-lg font-bold tracking-normal text-slate-950">{faq.question}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── OEM / PRIVATE LABEL CALLOUT ── */}
        <section className="py-14 bg-white border-t border-slate-100">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-0.5 bg-emerald-500 rounded-full" />
                  <span className="text-xs font-bold tracking-widest uppercase text-emerald-600">OEM & Private Label</span>
                </div>
                <h2 className="font-bold text-slate-900 text-3xl mb-4">
                  Your Brand, Our Manufacturing
                </h2>
                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  Build your own thermal paper brand with our end-to-end OEM service. Custom logo printing on the roll wrapper, branded outer cartons, Pantone color matching, and NDA protection — all included. MOQ from 5,000 rolls.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    "Front-print & back-print with your logo, QR codes, or promotional content",
                    "Pantone color matching — exact brand color reproduction guaranteed",
                    "Custom core sizes, roll dimensions, and packaging to your spec",
                    "NDA signed before any design work begins — your IP is protected",
                    "7-day sample turnaround — see your branded roll before committing",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/oem-custom/private-label" className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-colors shadow-sm">
                    Explore OEM Options <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/samples" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:border-emerald-400 hover:text-emerald-600 transition-all text-sm">
                    Request Branded Sample
                  </Link>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-[#f4f0e8] rounded-2xl p-8 border border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg mb-5">OEM Service at a Glance</h3>
                <div className="space-y-4">
                  {[
                    { label: "Minimum Order", value: "5,000 rolls" },
                    { label: "Sample Turnaround", value: "7 business days" },
                    { label: "Color Matching", value: "Pantone / CMYK" },
                    { label: "Print Options", value: "Front + Back print" },
                    { label: "NDA", value: "Signed before design" },
                    { label: "Packaging", value: "Custom carton & label" },
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

        {/* ── TRUST + CONVERSION STRIP ── */}
        <section className="py-10 bg-slate-50 border-t border-slate-200">
          <div className="container-site">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Free Sample Card */}
              <div className="flex items-start gap-4 p-6 bg-[#f4f0e8] rounded-2xl border border-[#ded6c8]">
                <div className="w-10 h-10 bg-[#b9822f] rounded-xl flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm mb-1">Request Samples</p>
                  <p className="text-slate-500 text-xs mb-3">Test quality before you order. Shipped via DHL/FedEx within 3 business days.</p>
                  <Link href="/samples" className="text-[#0f5f5c] hover:text-[#0f5f5c] font-semibold text-xs flex items-center gap-1">
                    Request Now <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
              {/* Custom Print Card */}
              <div className="flex items-start gap-4 p-6 bg-green-50 rounded-2xl border border-green-100">
                <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm mb-1">Custom Logo &amp; Back Print</p>
                  <p className="text-slate-500 text-xs mb-3">Print your logo, coupons, QR codes or ads on every roll. MOQ 5,000 rolls.</p>
                  <Link href="/oem-custom/private-label" className="text-green-600 hover:text-green-700 font-semibold text-xs flex items-center gap-1">
                    Learn More <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
              {/* WhatsApp Direct Card */}
              <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm mb-1">Talk to a Specialist</p>
                  <p className="text-slate-500 text-xs mb-3">WhatsApp or email our team directly. Response within 2 hours during business hours.</p>
                  <a
                    href="https://wa.me/8618792771927"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 hover:text-slate-900 font-semibold text-xs flex items-center gap-1"
                  >
                    WhatsApp Now <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED PRODUCTS ── */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="container-site">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-bold text-slate-900 text-3xl">Related Products</h2>
              <Link href="/products/thermal-paper-rolls" className="text-[#0f5f5c] hover:text-[#0f5f5c] font-semibold text-sm flex items-center gap-1">
                All Rolls <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/products/thermal-paper-rolls/${r.slug}`}
                  className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-[#0f5f5c]/40 hover:shadow-lg transition-all"
                >
                  <div className="w-10 h-10 bg-[#f4f0e8] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#e7eee9] transition-colors">
                    <Package className="w-5 h-5 text-[#0f5f5c]" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-[#0f5f5c] transition-colors leading-snug">{r.name}</h3>
                  <p className="text-slate-400 text-xs">{r.subtitle}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
