import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, FileCheck2, PackageCheck, Ship } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import FaqSection from "@/components/ui/FaqSection";
import { buildMetadata, breadcrumbSchema, canonicalUrl, faqSchema } from "@/lib/seo";

const TITLE = "Export and Customs Information for Mexico Thermal Paper Orders";
const DESCRIPTION =
  "Prepare a comparable thermal paper or label quotation for Mexico with confirmed specifications, documents, packing, destination details, and Incoterm responsibilities.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/mx/export-and-customs",
  locale: "en_MX",
  languages: {
    en: "https://www.zhixinpaper.com/mx/export-and-customs",
    "x-default": "https://www.zhixinpaper.com/mx/export-and-customs",
  },
});

const FAQS = [
  {
    question: "What information should a Mexico distributor provide for a quotation?",
    answer:
      "Share the product type, width, length or outer diameter, core, winding direction, printer or application, quantity per SKU, packing preference, destination city or postal code, and requested delivery term.",
  },
  {
    question: "Can you quote FOB or CIF delivery to Mexico?",
    answer:
      "FOB, CIF, and other delivery terms can be reviewed by project. The commercial offer should state the named destination, shipment scope, customs responsibility, inland delivery responsibility, and any exclusions before approval.",
  },
  {
    question: "Which export documents can be reviewed before shipment?",
    answer:
      "The available document package depends on the selected material and order. Buyers can request review of the commercial invoice, packing information, shipping documents, material declarations, and any grade-specific compliance documents needed for the project.",
  },
  {
    question: "How do samples help before a Mexico order?",
    answer:
      "A physical sample or printer specification helps confirm dimensions, core, winding, print performance, label adhesion, packing, and handling before the final quotation and production plan are approved.",
  },
];

const CHECKLIST = [
  {
    icon: ClipboardCheck,
    title: "Product specification",
    text: "Confirm width, length or diameter, core, winding direction, basis weight, facestock, adhesive, and printer or application.",
  },
  {
    icon: FileCheck2,
    title: "Grade-level documents",
    text: "Match declarations, test reports, and material scope to the selected grade and intended use instead of assuming every grade has the same documents.",
  },
  {
    icon: PackageCheck,
    title: "Export packing",
    text: "Confirm carton marks, pallet configuration, mixed-SKU handling, private-label artwork, and the approval point for packing instructions.",
  },
  {
    icon: Ship,
    title: "Destination and terms",
    text: "State city, postal code, port or delivery point, shipment type, requested Incoterm, and which party handles customs and inland delivery.",
  },
];

export default function MexicoExportAndCustomsPage() {
  const schemas = [
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Mexico", url: "/mx" },
      { name: "Export and Customs Information", url: "/mx/export-and-customs" },
    ]),
    faqSchema(FAQS),
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: TITLE,
      description: DESCRIPTION,
      url: canonicalUrl("/mx/export-and-customs"),
      inLanguage: "en",
      areaServed: { "@type": "Country", name: "Mexico" },
      about: ["Thermal paper export", "Mexico customs information", "Thermal label shipment planning"],
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
        <section className="bg-[#101b19] py-20 text-white md:py-28">
          <div className="container-site">
            <nav className="mb-8 text-sm text-[#b9c5be]">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/mx" className="hover:text-white">Mexico thermal paper supplier</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Export and customs information</span>
            </nav>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-[#d6b273]">Mexico shipment planning</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
                Export and customs information for Mexico thermal paper orders
              </h1>
              <p className="mt-6 text-base leading-8 text-[#dce4df] md:text-lg">
                Prepare the information needed for a comparable quotation and smoother shipment review. Product specification, material documents, export packing, destination, and delivery responsibilities should be confirmed together.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/quote" className="inline-flex min-h-12 items-center gap-2 bg-[#9c661d] px-7 py-3.5 text-sm font-bold text-white hover:bg-[#7d4f16]">
                  Request a Mexico quotation <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/mx" className="inline-flex min-h-12 items-center border border-white/45 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10">
                  Back to Mexico supplier page
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container-site">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-[#9c661d]">Quotation checklist</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-[#14211f] md:text-4xl">
                Four inputs keep a Mexico thermal paper quotation comparable
              </h2>
              <p className="mt-4 text-base leading-8 text-[#4f5f5a]">
                A low unit price is not comparable when the roll size, material grade, packing, or delivery responsibility is different. Confirm these inputs before comparing offers.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {CHECKLIST.map((item) => (
                <div key={item.title} className="border border-[#ded6c8] bg-white p-6">
                  <item.icon className="h-6 w-6 text-[#0f5f5c]" />
                  <h3 className="mt-5 text-xl font-bold text-[#14211f]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#4f5f5a]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#ded6c8] bg-white py-20 md:py-24">
          <div className="container-site grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold text-[#9c661d]">Responsibility review</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-[#14211f] md:text-4xl">
                State the shipment boundary before approval
              </h2>
              <p className="mt-5 text-base leading-8 text-[#4f5f5a]">
                Destination, port or delivery point, customs scope, tax treatment, inland transportation, and document responsibility should be written into the commercial offer. The final import process remains subject to the buyer&apos;s appointed customs and logistics parties.
              </p>
              <Link href="/contact" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#0f5f5c]">
                Discuss a shipment plan <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Destination city and postal code",
                "Port or delivery point",
                "Requested Incoterm",
                "Customs and tax responsibility",
                "Carton and pallet marks",
                "Commercial and material documents",
              ].map((item) => (
                <div key={item} className="border border-[#ded6c8] bg-[#fbfaf6] p-5 text-sm font-semibold leading-6 text-[#33413e]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <FaqSection
          id="faq"
          faqs={FAQS}
          title="Mexico export planning questions"
          intro="Use these questions to prepare the details needed for a specification-led quotation."
          eyebrow="Frequently asked questions"
          tone="light"
        />

        <section className="border-t border-[#ded6c8] bg-[#e7eee9] py-16">
          <div className="container-site flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-[#14211f]">Send the specification and destination together</h2>
              <p className="mt-3 text-sm leading-7 text-[#4f5f5a]">
                We will review the product, document, packing, and delivery information needed for a comparable Mexico quotation.
              </p>
            </div>
            <Link href="/quote" className="inline-flex min-h-12 items-center gap-2 bg-[#0f5f5c] px-7 py-3 text-sm font-bold text-white">
              Start a quotation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <CTABanner />
      <Footer />
    </>
  );
}
