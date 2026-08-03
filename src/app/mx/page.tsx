import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SlotImage } from "@/components/ui/SlotImage";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  PackageCheck,
  Ruler,
  Ship,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FaqSection from "@/components/ui/FaqSection";
import { breadcrumbSchema, canonicalUrl, faqSchema } from "@/lib/seo";

const TITLE = "Thermal Paper Supplier for Mexico";
const DESCRIPTION =
  "Thermal paper rolls and thermal labels for distributors in Mexico. Confirm dimensions, material grade, packing, documents, samples, and delivery terms.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: canonicalUrl("/mx") },
  openGraph: {
    type: "website",
    locale: "en_MX",
    url: canonicalUrl("/mx"),
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Zhixin Paper",
    images: [
      {
        url: "/images/thermal-rolls-product.jpg",
        width: 1200,
        height: 630,
        alt: "Thermal paper rolls for distributors in Mexico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/thermal-rolls-product.jpg"],
  },
};

const PRODUCTS = [
  {
    title: "Point-of-sale rolls",
    description: "Common 80 mm and 57/58 mm formats, defined by width, outer diameter, core, length, and winding direction.",
    href: "/products/thermal-paper-rolls/standard-pos-rolls",
    image: "/images/thermal-rolls-product.jpg",
    link: "Explore POS rolls",
  },
  {
    title: "Thermal labels",
    description: "Direct thermal and thermal-transfer labels for logistics, barcodes, warehousing, retail, and specialized applications.",
    href: "/products/thermal-labels",
    image: "/images/thermal-labels-product.jpg",
    link: "Explore thermal labels",
  },
  {
    title: "Custom printing and private label",
    description: "Printing, packing, and private-label options reviewed against artwork, specification, volume, and the approval process.",
    href: "/oem-custom",
    image: "/images/factory-overview.jpg",
    link: "Review customization options",
  },
];

const QUOTE_FIELDS = [
  "Width, length, or outer diameter",
  "Core diameter and winding direction",
  "Printer model or physical sample",
  "Quantity per SKU and estimated usage",
  "Carton packing and pallet configuration",
  "Postal code, city, and delivery term",
];

const FAQS = [
  {
    question: "What information is needed to quote thermal paper rolls?",
    answer:
      "Provide the width, length or outer diameter, core, winding direction, printer model, quantity, packing, and destination. A physical sample or current specification sheet helps confirm equivalency.",
  },
  {
    question: "Can you quote 80 mm and 57 or 58 mm roll sizes?",
    answer:
      "Yes. These size families are available within our range. The final specification is confirmed by width, actual length, diameter, core, basis weight, and printer compatibility.",
  },
  {
    question: "Which compliance documents are available?",
    answer:
      "The document package depends on the selected grade and end use. Before ordering, we confirm the required scope in writing, such as BPA, REACH, FSC, food-contact, or other applicable documents.",
  },
  {
    question: "How is delivery to Mexico quoted?",
    answer:
      "FOB, CIF, and other terms are quoted according to volume, destination, postal code, and shipment type. Cost, schedule, and customs responsibilities must be confirmed in the commercial offer.",
  },
];

export default function MexicoPage() {
  const schemas = [
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Mexico", url: "/mx" },
    ]),
    faqSchema(FAQS),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: TITLE,
      description: DESCRIPTION,
      url: canonicalUrl("/mx"),
      inLanguage: "en",
      areaServed: { "@type": "Country", name: "Mexico" },
      about: ["Thermal paper", "Thermal paper rolls", "Thermal labels"],
    },
  ];

  return (
    <>
      <Header />
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}

      <main id="main-content" lang="en" className="bg-[#fbfaf6] pt-[64px] md:pt-[92px]">
        <section className="relative isolate min-h-[clamp(380px,50vh,620px)] overflow-hidden bg-[#101b19] text-white">
          <SlotImage
            slotKey="geo.mx.hero"
            alt="Thermal paper rolls prepared for wholesale supply"
            fill
            fetchPriority="high"
            loading="eager"
            quality={65}
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-[#101b19]/62" />
          <div className="container-site flex min-h-[clamp(380px,50vh,620px)] items-center py-16 md:py-20">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-[#d6b273]">B2B supply for Mexico</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-white md:text-6xl">
                Thermal paper and thermal label supplier for Mexico
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#dce4df] md:text-lg">
                For distributors, importers, and private-label buyers who need to confirm specifications, compatibility, documents, and packing before purchasing.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/quote"
                  className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#9c661d] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#7d4f16]"
                >
                  Request a Quote <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/samples"
                  className="inline-flex min-h-12 items-center justify-center border border-white/45 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Request Samples
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#ded6c8] bg-white">
          <div className="container-site grid gap-px bg-[#ded6c8] sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Ruler, label: "Sizes", value: "80 mm, 57/58 mm, and custom formats" },
              { icon: ClipboardCheck, label: "Validation", value: "Printer, core, diameter, and winding direction" },
              { icon: PackageCheck, label: "Packing", value: "Carton, pallet, and mixed-SKU options quoted by project" },
              { icon: Ship, label: "Delivery", value: "Terms and destination confirmed in the offer" },
            ].map((item) => (
              <div key={item.label} className="bg-white px-6 py-7">
                <item.icon className="h-5 w-5 text-[#9c661d]" />
                <p className="mt-4 text-xs font-bold text-[#87918c]">{item.label}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#14211f]">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container-site">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-[#9c661d]">Core products</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-[#14211f] md:text-4xl">
                Start with the product family, then confirm the specification before ordering
              </h2>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {PRODUCTS.map((product) => (
                <article key={product.href} className="border border-[#ded6c8] bg-white">
                  <Link href={product.href} className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#101b19]">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.025]"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#14211f]">{product.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[#4f5f5a]">{product.description}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0f5f5c]">
                        {product.link} <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#ded6c8] bg-white py-20 md:py-24">
          <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold text-[#9c661d]">Quote information</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-[#14211f] md:text-4xl">
                A useful quotation starts with a complete specification
              </h2>
              <p className="mt-5 text-base leading-8 text-[#4f5f5a]">
                Avoid comparing only the price per roll. Actual length, diameter, core, paper grade, and packing all affect performance and landed cost.
              </p>
              <Link href="/quote" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#0f5f5c]">
                Open the quotation form <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-px border border-[#ded6c8] bg-[#ded6c8] sm:grid-cols-2">
              {QUOTE_FIELDS.map((field) => (
                <div key={field} className="flex min-h-24 items-start gap-3 bg-[#fbfaf6] p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0f5f5c]" />
                  <p className="text-sm font-semibold leading-6 text-[#33413e]">{field}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#101b19] py-20 text-white md:py-24">
          <div className="container-site grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <FileCheck2 className="h-7 w-7 text-[#d6b273]" />
              <h2 className="mt-5 text-3xl font-bold leading-tight text-white md:text-4xl">
                Confirm document scope by material grade and application
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#c7d0cb]">
                Requirements vary by market, contact conditions, substrate, and end use. Before approving an order, request the material grade name and the exact list of declarations or reports that must accompany the shipment.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "BPA and phenol options", href: "/compliance/bpa-free" },
                { label: "REACH and RoHS", href: "/compliance/reach-rohs" },
                { label: "ISO 9001 quality system", href: "/compliance/iso-9001" },
                { label: "FSC options", href: "/compliance/fsc-paper" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex min-h-16 items-center justify-between border border-white/12 bg-white/[0.04] px-5 text-sm font-semibold text-[#efe7d6] transition hover:border-[#d6b273]/45 hover:bg-white/[0.07]"
                >
                  {item.label} <ArrowRight className="h-4 w-4 text-[#d6b273]" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <FaqSection
          id="faq"
          faqs={FAQS}
          title="Before requesting a price"
          intro="Confirm the product specification, documents, packing, and destination details needed for a comparable quotation."
          eyebrow="Frequently asked questions"
          tone="light"
        />

        <section className="border-t border-[#ded6c8] bg-[#e7eee9] py-16">
          <div className="container-site flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-[#14211f]">Send your dimensions, volume, and destination</h2>
              <p className="mt-3 text-sm leading-7 text-[#4f5f5a]">
                We will review the specification needed to prepare a comparable quotation and a sample plan when appropriate.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/quote" className="inline-flex min-h-12 items-center gap-2 bg-[#0f5f5c] px-7 py-3 text-sm font-bold text-white">
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex min-h-12 items-center border border-[#0f5f5c]/30 px-7 py-3 text-sm font-bold text-[#0f5f5c]">
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
