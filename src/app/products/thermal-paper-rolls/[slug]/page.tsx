import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { SlotImage } from "@/components/ui/SlotImage";
import StandardPosRollPage from "@/components/products/StandardPosRollPage";
import AtmBankingRollPage from "@/components/products/AtmBankingRollPage";
import PaymentTerminalRollPage from "@/components/products/PaymentTerminalRollPage";
import { COMPANY, THERMAL_PAPER_ROLLS } from "@/lib/data";
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
  title: "POS Receipt Paper Rolls",
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

const PAYMENT_TERMINAL_FAQS = [
  {
    question: "What size paper do credit card terminals use?",
    answer: "Many payment terminals use 57mm or 2 1/4-inch direct thermal rolls, but the required length or outer diameter, core ID, and winding direction vary by model. Send the exact terminal model or current roll before ordering.",
  },
  {
    question: "Are EDC rolls and credit card terminal paper rolls the same product?",
    answer: "They are overlapping buyer terms for compact receipt rolls used in electronic payment terminals. The name alone does not confirm fit; the terminal model and complete roll specification still control approval.",
  },
  {
    question: "Can one roll specification work across a mixed terminal fleet?",
    answer: "Sometimes, but do not assume it. Build a model-to-spec matrix and test each distinct paper compartment, maximum OD, core, winding, and sensing requirement before consolidating SKUs.",
  },
  {
    question: "Can terminal rolls be supplied as BPA-free or phenol-free?",
    answer: "Those options depend on the selected paper grade. Specify whether you need BPA-free, BPS-free, or phenol-free wording and request the relevant grade-level declaration or test report before approval.",
  },
  {
    question: "What should a payment terminal roll RFQ include?",
    answer: "Include terminal brand and model, roll width, target length or OD, core ID, winding direction, end-mark requirement, paper grade, quantity per SKU, packing, destination, and target date.",
  },
];

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
    question: "How is a required image-retention period evaluated?",
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
    body: "Requested files are checked for current availability, scope, validity, and quoted-grade applicability before internal approval.",
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
      title: "Wholesale POS Receipt Paper Rolls",
      description:
        "BPA-free POS receipt paper rolls in 80 mm and 57 mm formats. Confirm printer fit, core, length, compliance files, OEM packing, samples, and delivery terms.",
      alternates: {
        canonical: canonicalUrl(`/products/thermal-paper-rolls/${slug}`),
        languages: {
          en: canonicalUrl(`/products/thermal-paper-rolls/${slug}`),
          "x-default": canonicalUrl(`/products/thermal-paper-rolls/${slug}`),
        },
      },
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
        "ATM receipt paper rolls selected by terminal model, retention target, anti-static requirement, optional back print, and grade-level documentation.",
      alternates: {
        canonical: canonicalUrl(`/products/thermal-paper-rolls/${slug}`),
        languages: {
          en: canonicalUrl(`/products/thermal-paper-rolls/${slug}`),
          "x-default": canonicalUrl(`/products/thermal-paper-rolls/${slug}`),
        },
      },
      openGraph: {
        title: "ATM Receipt Paper Rolls for Banking Terminals",
        description:
          "Archival-grade, anti-static ATM receipt paper with terminal fit checks, compliance files, and optional regulatory back print.",
        type: "website",
        images: [{ url: "/images/thermal-rolls-product.jpg", width: 1200, height: 630, alt: "ATM and bank receipt thermal paper rolls" }],
      },
    };
  }

  if (slug === "credit-card-terminal-rolls") {
    return {
      title: "Credit Card Terminal Paper Rolls & Sizes",
      description:
        "Source credit card terminal paper rolls by model, 57mm or 2 1/4-inch size, OD, core, winding, grade, packing, and fit-check sample.",
      alternates: {
        canonical: canonicalUrl(`/products/thermal-paper-rolls/${slug}`),
        languages: {
          en: canonicalUrl(`/products/thermal-paper-rolls/${slug}`),
          "x-default": canonicalUrl(`/products/thermal-paper-rolls/${slug}`),
        },
      },
      openGraph: {
        title: "Credit Card Terminal Paper Rolls",
        description: "Model-qualified payment terminal rolls with specification and sample checks before bulk supply.",
        type: "website",
        images: [{ url: "/images/thermal-rolls-product.jpg", width: 1200, height: 630, alt: "Credit card terminal thermal paper rolls" }],
      },
    };
  }

  return {
    title: `${roll.name} Wholesale`,
    description: `Wholesale ${roll.name.toLowerCase()} for distributors and OEM buyers. Confirm size, printer fit, paper grade, compliance files, export packing, and samples.`,
    alternates: {
      canonical: canonicalUrl(`/products/thermal-paper-rolls/${slug}`),
      languages: {
        en: canonicalUrl(`/products/thermal-paper-rolls/${slug}`),
        "x-default": canonicalUrl(`/products/thermal-paper-rolls/${slug}`),
      },
    },
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
    { tier: "Starter", qty: "10–49 cartons", unit: "Quoted by grade and packing", savings: "Request quote" },
    { tier: "Volume", qty: "50–199 cartons", unit: "Pallet plan reviewed", savings: "Request quote" },
    { tier: "Container", qty: "200+ cartons", unit: "FCL plan reviewed", savings: "Request quote" },
  ],
  "default": [
    { tier: "Sample", qty: "1 carton", unit: "Contact for price", savings: "—" },
    { tier: "Starter", qty: "5–19 cartons", unit: "Quoted by specification", savings: "Request quote" },
    { tier: "Volume", qty: "20–99 cartons", unit: "Pallet plan reviewed", savings: "Request quote" },
    { tier: "Container", qty: "100+ cartons", unit: "FCL plan reviewed", savings: "Request quote" },
  ],
};

// ── Compliance documents by product slug ──
const COMPLIANCE_DOCS: Record<string, { name: string; desc: string; icon: string }[]> = {
  "standard-pos-rolls": [
    { name: "Phenol Test Report", desc: "Availability and scope confirmed for the quoted paper grade", icon: "shield" },
    { name: "REACH Declaration", desc: "Current declaration confirmed for the selected material", icon: "file" },
    { name: "Quality Management Certificate", desc: "Holder, issuer, validity, and certified scope reviewed on request", icon: "award" },
    { name: "Technical Data Sheet (TDS)", desc: "Revision, storage guidance, and print parameters reviewed for the quoted grade", icon: "download" },
  ],
  "atm-banking-rolls": [
    { name: "Phenol Test Report", desc: "Availability and scope confirmed for the quoted paper grade", icon: "shield" },
    { name: "REACH / RoHS Declaration", desc: "Current declaration confirmed for the selected material", icon: "file" },
    { name: "Quality Management Certificate", desc: "Holder, issuer, validity, and certified scope reviewed on request", icon: "award" },
    { name: "Image Stability Report", desc: "Test conditions matched to the selected grade and retention target", icon: "download" },
  ],
  "default": [
    { name: "Phenol Test Report", desc: "Availability and scope confirmed for the quoted grade", icon: "shield" },
    { name: "REACH Declaration", desc: "Current declaration confirmed for the selected material", icon: "file" },
    { name: "Quality Management Certificate", desc: "Holder, issuer, validity, and certified scope reviewed on request", icon: "award" },
    { name: "Technical Data Sheet (TDS)", desc: "Available fields and revision confirmed for the quoted grade", icon: "download" },
  ],
};

export default async function RollDetailPage({ params }: Props) {
  const { slug } = await params;
  const roll = THERMAL_PAPER_ROLLS.find((r) => r.slug === slug);
  if (!roll) notFound();

  const currentIndex = THERMAL_PAPER_ROLLS.findIndex((item) => item.slug === slug);
  const related = [
    ...THERMAL_PAPER_ROLLS.slice(currentIndex + 1),
    ...THERMAL_PAPER_ROLLS.slice(0, currentIndex),
  ].slice(0, 4);
  const heroText = (roll as { heroDesc?: string }).heroDesc || `${roll.name} for distributor and OEM projects. Paper grade, dimensions, printer compatibility, documents, printing, packing, and private-label scope are confirmed for the quotation.`;
  const descText = (roll as { description?: string }).description || `${roll.name} for wholesale distributors and importers. Paper-grade documents, order quantity, OEM printing, and private-label options are confirmed for the quoted specification and project.`;

  const printers = PRINTER_COMPAT[slug] || null;
  const pricing = TIERED_PRICING[slug] || TIERED_PRICING["default"];
  const complianceDocs = COMPLIANCE_DOCS[slug] || COMPLIANCE_DOCS["default"];
  const buyerChecks = PRODUCT_BUYER_CHECKS[slug] || null;
  const isStandardPos = slug === "standard-pos-rolls";
  const isAtmBanking = slug === "atm-banking-rolls";
  const isPaymentTerminal = slug === "credit-card-terminal-rolls";
  const isCustomPrinted = slug === "custom-printed-rolls";
  const productJsonLd = productSchema({
    name: isStandardPos ? "POS Receipt Paper Rolls" : isPaymentTerminal ? "Credit Card Terminal Paper Rolls" : roll.name,
    description: isStandardPos ? STANDARD_POS_PAGE.intro : isPaymentTerminal ? roll.description : descText,
    image: "/images/thermal-rolls-product.jpg",
    url: `/products/thermal-paper-rolls/${slug}`,
    sku: `thermal-roll-${slug}`,
    category: "Thermal Paper Rolls",
    keywords: isStandardPos
      ? "POS receipt paper rolls, BPA-free thermal paper rolls, 80mm receipt rolls, 57mm POS rolls, Europe USA Canada thermal paper supplier"
      : roll.keywords,
    additionalProperties: [
      { name: "BPA-Free", value: "Available by quoted paper grade" },
      { name: "Quality documents", value: "Current certificate scope and validity confirmed on request" },
    ],
  });

  const paymentTerminalTermsJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Payment terminal paper roll terminology",
    url: canonicalUrl(`/products/thermal-paper-rolls/${slug}`),
    hasDefinedTerm: [
      ["Credit card terminal paper rolls", "Receipt rolls used in credit card and payment terminals."],
      ["Payment terminal rolls", "Direct thermal receipt rolls qualified against a payment-terminal model."],
      ["EDC rolls", "Regional buyer term for electronic data capture terminal paper rolls."],
      ["EFTPOS rolls", "Buyer term for electronic funds transfer point-of-sale receipt rolls."],
    ].map(([name, description]) => ({ "@type": "DefinedTerm", name, description })),
  };

  const atmProductJsonLd = {
    ...productJsonLd,
    "@id": `${canonicalUrl(`/products/thermal-paper-rolls/${slug}`)}#product`,
    name: "ATM Receipt Paper Rolls",
    alternateName: ["ATM Thermal Paper Rolls", "Bank Receipt Paper Rolls", "Archival ATM Paper"],
    description:
      "ATM receipt paper rolls selected by terminal model, retention target, anti-static requirement, approved back print, and grade-level documentation.",
    material: "Thermal paper grade selected by project requirements",
    model: "57mm, 80mm and 82.5mm ATM roll formats",
    additionalProperty: [
      { "@type": "PropertyValue", name: "Common widths", value: "57mm, 80mm, 82.5mm" },
      { "@type": "PropertyValue", name: "Image life", value: "Selected for the required retention and storage condition" },
      { "@type": "PropertyValue", name: "Anti-static coating", value: "Available subject to terminal requirement" },
      { "@type": "PropertyValue", name: "Print speed", value: "Validated with the named terminal and paper grade" },
      { "@type": "PropertyValue", name: "Back print", value: "Available from approved artwork" },
      { "@type": "PropertyValue", name: "Phenol options", value: "BPA-free, BPS-free, or phenol-free by selected grade" },
      { "@type": "PropertyValue", name: "Minimum order quantity", value: roll.moq },
      { "@type": "PropertyValue", name: "Platform fit review", value: "Exact terminal model, dimensions, paper path, and sample required" },
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
      { name: "Home", url: "/" },
      { name: "Products", url: "/products" },
      { name: "Thermal Paper Rolls", url: "/products/thermal-paper-rolls" },
      { name: roll.name, url: `/products/thermal-paper-rolls/${slug}` },
    ]),
    isAtmBanking ? atmProductJsonLd : productJsonLd,
    ...(isAtmBanking ? [atmRelatedProductsJsonLd] : []),
    ...(isStandardPos ? [faqSchema(STANDARD_POS_PAGE.faqs)] : []),
    ...(isAtmBanking ? [faqSchema(ATM_BANKING_FAQS)] : []),
    ...(isPaymentTerminal ? [paymentTerminalTermsJsonLd, faqSchema(PAYMENT_TERMINAL_FAQS)] : []),
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

  if (isPaymentTerminal) {
    return (
      <>
        <Header />
        {jsonLd.map((schema, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
        ))}
        <PaymentTerminalRollPage roll={roll} faqs={PAYMENT_TERMINAL_FAQS} />
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
      {(isStandardPos || isCustomPrinted) && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .product-hero-grid {
                display: grid;
                gap: 2rem;
              }
              @media (min-width: 1024px) {
                .product-hero-grid {
                  grid-template-columns: minmax(0, 1fr) minmax(340px, 410px);
                  align-items: start;
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
            <SlotImage
              slotKey={`products.card.${roll.slug}`}
              alt={isStandardPos ? "BPA-free POS receipt paper rolls for Europe USA and Canada distributors" : `${roll.name} - Thermal Paper Rolls`}
              fill
              className="object-cover object-center"
              fetchPriority="high"
              loading="eager"
              sizes="100vw"
              quality={65}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,20,18,0.65)_0%,rgba(8,20,18,0.48)_48%,rgba(8,20,18,0.18)_82%,rgba(8,20,18,0.05)_100%)]" />

            {/* Overlay content */}
            <div className="relative z-10">
              <div className="container-site py-10 md:py-14 lg:py-16">
                <div className={isStandardPos || isCustomPrinted ? "product-hero-grid" : ""}>
                  <div className="max-w-3xl">
                  {isCustomPrinted && (
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#d6b273]">
                      OEM &amp; Private Label · Flexographic Print
                    </p>
                  )}
                  <h1 className="font-bold text-white text-4xl md:text-5xl xl:text-6xl leading-tight mb-4 drop-shadow-lg">
                    {isStandardPos ? STANDARD_POS_PAGE.title : roll.name}
                  </h1>
                  <p className="max-w-xl text-[#d6b273] text-xl font-medium mb-5">
                    {isStandardPos ? STANDARD_POS_PAGE.subtitle : roll.subtitle}
                  </p>
                  <p className="text-slate-200 text-base leading-relaxed mb-6 max-w-xl font-light">
                    {isStandardPos ? STANDARD_POS_PAGE.intro : heroText}
                  </p>
                  {isCustomPrinted && (
                    <div className="mb-7 flex flex-wrap gap-3">
                      {[
                        { step: "01", label: "Submit artwork", desc: "AI · EPS · PDF" },
                        { step: "02", label: "Approve proof", desc: "Print template provided" },
                        { step: "03", label: "Production sample", desc: "Before bulk order" },
                      ].map(({ step, label, desc }) => (
                        <div key={step} className="flex items-center gap-2.5 border border-white/15 bg-white/8 px-3 py-2 backdrop-blur-sm">
                          <span className="text-[10px] font-black text-[#d6b273]">{step}</span>
                          <div>
                            <p className="text-xs font-bold text-white leading-none">{label}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
                    {isCustomPrinted ? (
                      <>
                        <Link href="/samples" className="inline-flex min-h-11 items-center gap-2 bg-[#9c661d] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#101b19]/30 transition-all hover:bg-[#7d4f16]">
                          Request a Print Sample <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/quote" className="inline-flex min-h-11 items-center gap-2 border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/20">
                          Submit Artwork &amp; Get Quote
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link href="/quote" className="inline-flex min-h-11 items-center gap-2 bg-[#9c661d] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#101b19]/30 transition-all hover:bg-[#7d4f16]">
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
                      </>
                    )}
                  </div>
                </div>

                  <div
                    className={`border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/30 md:p-6 ${
                      isCustomPrinted ? "hidden lg:block" : ""
                    }`}
                  >
                    {isStandardPos ? (
                      <>
                        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0f5f5c]">RFQ starter pack</p>
                            <h2 className="mt-2 text-2xl font-extrabold tracking-normal text-slate-950">
                              Send four details. Get a usable landed-cost quote.
                            </h2>
                          </div>
                          <div className="hidden h-11 w-11 shrink-0 items-center justify-center bg-[#9c661d] text-white sm:flex">
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
                            ["Lead", "By project"],
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
                          className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-[#7d4f16]"
                        >
                          Request a Quote
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </>
                    ) : isCustomPrinted ? (
                      <>
                        <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-4">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0f5f5c]">Print project checklist</p>
                            <h2 className="mt-1.5 text-lg font-extrabold text-slate-950 leading-snug">
                              What to send for your first print quote
                            </h2>
                          </div>
                          <div className="hidden h-10 w-10 shrink-0 items-center justify-center bg-[#9c661d] text-white sm:flex">
                            <Layers className="h-4 w-4" />
                          </div>
                        </div>
                        <div className="mt-4 grid gap-2.5">
                          {[
                            "Roll width, OD, core ID, and winding direction",
                            "Print side: front, back, or both",
                            "Number of colors and Pantone reference (if any)",
                            "Artwork file: AI / EPS / PDF (vector)",
                            "QR or barcode size and scanner target",
                            "Destination market and document requirements",
                          ].map((item, i) => (
                            <div key={i} className="flex items-start gap-2.5 bg-slate-50 px-3 py-2.5">
                              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-[#0f5f5c] text-[10px] font-black text-white">
                                {i + 1}
                              </span>
                              <span className="text-xs font-semibold leading-5 text-slate-700">{item}</span>
                            </div>
                          ))}
                        </div>
                        <Link
                          href="/samples"
                          className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 bg-[#9c661d] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#7d4f16]"
                        >
                          Request a Print Sample
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                          href="/quote"
                          className="mt-2 inline-flex min-h-10 w-full items-center justify-center gap-2 border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          Submit Artwork &amp; Get Quote
                        </Link>
                      </>
                    ) : (
                      <div className="grid gap-3">
                        {[
                          { icon: <Package className="w-4 h-4" />, label: "MOQ", value: roll.moq },
                          { icon: <Clock className="w-4 h-4" />, label: "Lead Time", value: "Confirmed by project" },
                          { icon: <Award className="w-4 h-4" />, label: "Documents", value: "Reviewed by scope" },
                          { icon: <Shield className="w-4 h-4" />, label: "Phenol Route", value: "By selected grade" },
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
                { icon: <Factory className="w-3.5 h-3.5 text-[#d6b273]" />, text: "Capacity confirmed by SKU, quantity, and current loading" },
                { icon: <FileCheck className="w-3.5 h-3.5 text-emerald-400" />, text: "Available reports matched to grade and scope" },
                { icon: <Truck className="w-3.5 h-3.5 text-[#d6b273]" />, text: "Incoterm and delivery scope confirmed in writing" },
                { icon: <Users className="w-3.5 h-3.5 text-amber-400" />, text: "Export packing and route reviewed by destination" },
                { icon: <Clock className="w-3.5 h-3.5 text-[#d6b273]" />, text: "Quote timing depends on complete RFQ details" },
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
                    className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-[#7d4f16]"
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
                    <div className="mb-5 flex h-10 w-10 items-center justify-center bg-[#9c661d]/10 text-[#d6b273]">
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
                <div className="bg-[#f4f0e8] border border-[#ded6c8]  p-6">
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
                <div className="bg-white border border-slate-200  p-6">
                  <h2 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#0f5f5c]" />
                    Applications
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {roll.applications.map((app) => (
                      <span key={app} className="px-3 py-1.5 bg-[#9c661d] text-white text-xs font-bold  uppercase tracking-wide">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Available sizes */}
                <div className="bg-white border border-slate-200  p-6">
                  <h2 className="font-bold text-slate-900 text-lg mb-4">Available Sizes</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {roll.sizes.map((size) => (
                      <div key={size} className="px-3 py-2.5 bg-slate-50 border border-slate-200  text-center text-sm font-semibold text-slate-700 hover:border-[#0f5f5c]/40 hover:bg-[#f4f0e8] transition-all cursor-default">
                        {size}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mt-3 text-center">Custom sizes available — contact us</p>
                </div>
              </div>

              {/* Right: Full spec table */}
              <div className="lg:col-span-2">
                <div className="bg-white border border-slate-200  overflow-hidden">
                  <div className="px-8 py-6 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="font-bold text-slate-900 text-2xl">Product Specifications</h2>
                      <p className="text-slate-500 text-sm mt-1">Complete technical specifications for {roll.name}</p>
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold  hover:border-[#0f5f5c]/40 hover:text-[#0f5f5c] transition-colors shadow-sm shrink-0"
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
                              <td className="py-3.5 px-4 font-semibold text-slate-500 text-xs uppercase tracking-wide w-2/5 ">{key}</td>
                              <td className="py-3.5 px-4 text-slate-800 text-sm font-medium ">{val}</td>
                            </tr>
                          ))
                        ) : (
                          [
                            ["Coating Type", "Thermal sensitive coating"],
                            ["BPA-Free Option", "Available on request"],
                            ["Core Size", "12mm / 17mm / 25mm"],
                            ["Minimum Order Qty", roll.moq],
                            ["Production Schedule", "Confirmed after grade, quantity, printing, and packing review"],
                            ["Quality Documents", "Current certificate scope and validity confirmed on request"],
                            ["Material Documents", "Availability and applicability confirmed for the quoted grade"],
                          ].map(([key, val], i) => (
                            <tr key={key} className={i % 2 === 0 ? "bg-slate-50/50" : "bg-white"}>
                              <td className="py-3.5 px-4 font-semibold text-slate-500 text-xs uppercase tracking-wide w-2/5 ">{key}</td>
                              <td className="py-3.5 px-4 text-slate-800 text-sm font-medium ">{val}</td>
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
                      <Link href="/samples" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0f5f5c] font-bold  hover:bg-[#f4f0e8] transition-colors text-sm shadow-sm">
                        Request Samples
                      </Link>
                      <Link href="/quote" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#9c661d] text-white font-bold  hover:bg-[#7d4f16] transition-colors text-sm shadow-sm border border-[#b9822f]">
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
                 These model families are common buyer references. Confirm width, OD, core, winding, sensing, paper path, and performance with the exact printer and an approved sample.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {printers.map((p) => (
                  <div key={p.brand} className="bg-white border border-slate-200  p-5 hover:border-[#0f5f5c]/40 hover:shadow-sm transition-all">
                    <div className="w-8 h-8 bg-[#e7eee9]  flex items-center justify-center mb-3">
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
               Quantity bands indicate packing and supply scale. Final pricing is quoted from the current paper grade, dimensions, printing, packing, volume, destination, and Incoterm.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {pricing.map((tier, i) => (
                <div
                  key={tier.tier}
                  className={` p-6 border-2 transition-all ${
                    i === 2
                      ? "border-[#0f5f5c] bg-[#f4f0e8] shadow-md shadow-[#0f5f5c]/10"
                      : "border-slate-200 bg-white hover:border-[#0f5f5c]/25"
                  }`}
                >
                  {i === 2 && (
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#9c661d] text-white text-[9px] font-bold tracking-widest uppercase rounded-full mb-3">
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
              <Link href="/quote" className="inline-flex items-center gap-2 px-6 py-3 bg-[#9c661d] hover:bg-[#7d4f16] text-white font-bold  text-sm transition-colors shadow-sm">
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-slate-400 text-xs">Response timing confirmed after specification and document review</p>
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
               Available files depend on the selected paper grade, test scope, destination, and current document validity. Request the exact report or declaration needed for your procurement review.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {complianceDocs.map((doc) => (
                <div key={doc.name} className="bg-white border border-slate-200  p-5 hover:border-[#0f5f5c]/40 hover:shadow-sm transition-all group">
                  <div className="w-9 h-9 bg-[#f4f0e8]  flex items-center justify-center mb-3 group-hover:bg-[#e7eee9] transition-colors">
                    <Download className="w-4 h-4 text-[#0f5f5c]" />
                  </div>
                  <p className="font-bold text-slate-900 text-sm mb-1 leading-snug">{doc.name}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{doc.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#f4f0e8] border border-[#0f5f5c]/25  p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="font-bold text-slate-900 text-sm mb-1">Request Full Compliance Pack</p>
                <p className="text-slate-500 text-xs">
                   Share the destination market, selected grade, and required file names so the team can confirm which current documents apply to the quoted material.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#9c661d] hover:bg-[#7d4f16] text-white font-bold  text-sm transition-colors shrink-0 shadow-sm"
              >
                <Download className="w-4 h-4" /> Request Docs
              </Link>
            </div>
          </div>
        </section>

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
                  Build a private-label thermal paper program through specification, artwork, color proof, packaging, document, quantity, and production review. NDA scope and timing are confirmed in writing when required.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    "Front-print & back-print with your logo, QR codes, or promotional content",
                     "Pantone spot-color matching available subject to proof approval",
                    "Custom core sizes, roll dimensions, and packaging to your spec",
                    "NDA scope confirmed in writing before protected design material is exchanged",
                     "Sample schedule confirmed after artwork, material, and print-process review",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/oem-custom/private-label" className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold  text-sm transition-colors shadow-sm">
                    Explore OEM Options <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/samples" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-slate-300 text-slate-700 font-semibold  hover:border-emerald-400 hover:text-emerald-600 transition-all text-sm">
                    Request Branded Sample
                  </Link>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-[#f4f0e8]  p-8 border border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg mb-5">OEM Service at a Glance</h3>
                <div className="space-y-4">
                  {[
                    { label: "Minimum Order", value: "Confirmed by SKU and setup" },
                    { label: "Sample Turnaround", value: "Confirmed by sample plan" },
                    { label: "Color Matching", value: "By approved proof" },
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
              {/* Sample Request Card */}
              <div className="flex items-start gap-4 p-6 bg-[#f4f0e8]  border border-[#ded6c8]">
                <div className="w-10 h-10 bg-[#9c661d]  flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm mb-1">Request Samples</p>
                  <p className="text-slate-500 text-xs mb-3">Sample specification, quantity, fee, production method, courier route, and schedule are confirmed before dispatch.</p>
                  <Link href="/samples" className="text-[#0f5f5c] hover:text-[#0f5f5c] font-semibold text-xs flex items-center gap-1">
                    Request Now <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
              {/* Custom Print Card */}
              <div className="flex items-start gap-4 p-6 bg-green-50  border border-green-100">
                <div className="w-10 h-10 bg-green-600  flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm mb-1">Custom Logo &amp; Back Print</p>
                  <p className="text-slate-500 text-xs mb-3">Print approved logos, QR codes, or promotional content after artwork, material, proof, and quantity review.</p>
                  <Link href="/oem-custom/private-label" className="text-green-600 hover:text-green-700 font-semibold text-xs flex items-center gap-1">
                    Explore private-label printing <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
              {/* WhatsApp Direct Card */}
              <div className="flex items-start gap-4 p-6 bg-slate-50  border border-slate-200">
                <div className="w-10 h-10 bg-slate-700  flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm mb-1">Talk to a Specialist</p>
                  <p className="text-slate-500 text-xs mb-3">WhatsApp or email the team with product, quantity, destination, and timing details for a project-specific response.</p>
                  <a
                    href={`https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}`}
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
                  className="group flex flex-col overflow-hidden border border-slate-200 bg-white transition-all hover:border-[#0f5f5c]/40 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <SlotImage
                      slotKey={`products.card.${r.slug}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-[#0f5f5c] transition-colors leading-snug">{r.name}</h3>
                    <p className="text-slate-500 text-xs leading-5 flex-1">{r.subtitle}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#0f5f5c]">
                      Explore {r.name} <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
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
