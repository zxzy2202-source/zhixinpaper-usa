import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { THERMAL_PAPER_ROLLS } from "@/lib/data";
import { THERMAL_ROLL_SCENARIOS } from "@/lib/marketInsights";
import { breadcrumbSchema, buildMetadata, canonicalUrl, faqSchema } from "@/lib/seo";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Thermal Paper Rolls: Sizes & Specifications",
  description:
    "Compare thermal paper roll sizes, metric and inch names, POS and terminal uses, core IDs, coatings, packing, and wholesale quote requirements.",
  path: "/products/thermal-paper-rolls",
  keywords: [
    "thermal paper rolls",
    "thermal receipt paper rolls",
    "thermal paper rolls wholesale",
    "POS receipt paper rolls",
    "receipt paper rolls",
    "till rolls",
    "cash register paper rolls",
    "credit card terminal paper rolls",
    "80x80 thermal paper rolls",
    "3 1/8 x 230 thermal paper rolls",
    "57mm thermal paper rolls",
    "2 1/4 inch receipt paper",
  ],
});

const THERMAL_ROLL_TERMS = [
  {
    term: "Thermal paper rolls",
    alsoCalled: "Direct thermal paper rolls, thermal printer paper rolls",
    use: "The broad product family. Add the printer, application, or full roll specification before quoting.",
  },
  {
    term: "Thermal receipt paper",
    alsoCalled: "Receipt paper rolls, POS rolls, POS receipt paper",
    use: "Receipt stock for POS and cash-register printers. Width alone does not confirm printer fit.",
  },
  {
    term: "Till rolls",
    alsoCalled: "Cash register rolls, register rolls",
    use: "Common UK and European buying terms for receipt rolls used at a checkout or till.",
  },
  {
    term: "Receipt tape",
    alsoCalled: "Register tape, cash register tape",
    use: "North American legacy terms that can refer to thermal or non-thermal paper; confirm the print method.",
  },
  {
    term: "Terminal paper rolls",
    alsoCalled: "Credit card machine paper, payment terminal rolls",
    use: "Usually compact 57mm or 2 1/4-inch rolls. Confirm model, OD, core ID, and winding direction.",
  },
];

const THERMAL_ROLL_SPEC_NAMES = [
  {
    name: "80 x 80 mm",
    meaning: "Usually 80mm roll width x approximately 80mm outer diameter",
    confirm: "Core ID, paper GSM, measured roll length, winding direction, and carton count",
  },
  {
    name: "3 1/8 in x 230 ft",
    meaning: "3.125-inch roll width x 230-foot nominal roll length",
    confirm: "OD, core ID, paper GSM, actual length tolerance, and printer model",
  },
  {
    name: "57 x 40 mm",
    meaning: "57mm roll width x approximately 40mm outer diameter",
    confirm: "Core ID, target length, terminal paper compartment, and pack count",
  },
  {
    name: "2 1/4 in x 50 ft / 85 ft",
    meaning: "2.25-inch roll width x nominal roll length in feet",
    confirm: "Finished OD, core ID, winding direction, and exact terminal model",
  },
];

const THERMAL_ROLL_FAQS = [
  {
    question: "What are thermal paper rolls?",
    answer:
      "Thermal paper rolls are heat-sensitive paper rolls used in direct thermal printers without ink or toner. Common applications include POS receipts, payment terminals, kiosks, parking systems, and printed receipt programs. A complete specification normally includes width, length or outer diameter, core ID, paper GSM, winding direction, coating, and packing.",
  },
  {
    question: "How are thermal paper roll sizes named?",
    answer:
      "Metric names commonly use width x outer diameter, such as 80 x 80 mm or 57 x 40 mm. Inch-based names often use width x roll length, such as 3 1/8 in x 230 ft or 2 1/4 in x 50 ft. Always confirm which dimensions a supplier is quoting.",
  },
  {
    question: "Are 80 x 80 mm and 3 1/8 in x 230 ft the same roll?",
    answer:
      "Not automatically. Both are about 80mm or 3.125 inches wide, but 80 x 80 mm usually states width and outer diameter while 3 1/8 in x 230 ft states width and nominal length. Paper GSM, core ID, winding tension, and actual measured length determine the finished OD.",
  },
  {
    question: "Are 57mm and 2 1/4-inch receipt paper the same width?",
    answer:
      "They are the same common width family because 2.25 inches is about 57.15mm. They are not a complete specification. Payment terminals can require different outer diameters, lengths, core IDs, or winding directions even when the paper width matches.",
  },
  {
    question: "What information is needed for a thermal paper roll quote?",
    answer:
      "Send the application or printer model, roll width, target length or outer diameter, core ID, paper GSM or grade, winding direction, coating or compliance needs, quantity per SKU, packing method, and destination. A current roll photo or sample helps verify ambiguous size names.",
  },
];

const thermalRollCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Thermal Paper Rolls",
  alternateName: [
    "Thermal Receipt Paper Rolls",
    "POS Receipt Paper Rolls",
    "Till Rolls",
    "Cash Register Paper Rolls",
    "Terminal Paper Rolls",
  ],
  description:
    "Thermal paper roll types, size notation, applications, and wholesale specification requirements.",
  url: canonicalUrl("/products/thermal-paper-rolls"),
  inLanguage: "en",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: THERMAL_PAPER_ROLLS.map((roll, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: roll.name,
      url: canonicalUrl(`/products/thermal-paper-rolls/${roll.slug}`),
    })),
  },
};

const thermalRollTerminologySchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Thermal paper roll terminology and size notation",
  description:
    "Common English names and metric or imperial specification formats used when sourcing thermal paper rolls.",
  url: `${canonicalUrl("/products/thermal-paper-rolls")}#thermal-roll-terminology`,
  hasDefinedTerm: THERMAL_ROLL_TERMS.map((item) => ({
    "@type": "DefinedTerm",
    name: item.term,
    alternateName: item.alsoCalled.split(", "),
    description: item.use,
  })),
};

export default function ThermalPaperRollsPage() {
  const jsonLd = [
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Products", url: "/products" },
      { name: "Thermal Paper Rolls", url: "/products/thermal-paper-rolls" },
    ]),
    thermalRollCollectionSchema,
    thermalRollTerminologySchema,
    faqSchema(THERMAL_ROLL_FAQS),
  ];

  return (
    <>
      <Header />
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
      <main id="main-content">
        <section className="paper-noise border-b border-[#ded6c8] bg-[#fbfaf6] pt-32 pb-16">
          <div className="container-site">
            <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-[#87918c]">
              <Link href="/products" className="hover:text-[#0f5f5c] transition-colors">Products</Link>
              <span>/</span>
              <span className="text-[#4f5f5a]">Thermal Paper Rolls</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-0.5 w-8 bg-[#9c661d]" />
              <span className="text-xs font-bold text-[#0f5f5c]">Thermal Paper Rolls</span>
            </div>
            <h1 className="font-bold text-[#14211f] text-5xl md:text-6xl mb-4">
              Thermal Paper Rolls
            </h1>
            <p className="text-[#4f5f5a] text-lg max-w-2xl mb-6">
              Choose thermal paper rolls by the buying scenario: POS receipts, payment terminals, kitchen tickets, lottery and casino tickets, parking tickets, or custom printed campaigns. We help distributors confirm size, coating, documents, packaging, and landed cost before bulk orders.
            </p>
            <div className="flex flex-wrap gap-3">
              {["BPA-Free Documents", "Roll Size Control", "Scan Reliability", "OEM Printing", "Pallet & DDP Options"].map((f) => (
                <span key={f} className="flex items-center gap-1.5 border border-[#ded6c8] bg-[#f4f0e8] px-3 py-1.5 text-xs font-semibold text-[#4f5f5a]">
                  <CheckCircle2 className="w-3 h-3 text-[#0f5f5c]" />
                  {f}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#ded6c8] bg-[#101b19] py-12 text-white">
          <div className="container-site grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="text-xs font-bold text-[#c8a96b]">Direct answer</p>
              <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">
                What are thermal paper rolls?
              </h2>
            </div>
            <p className="max-w-4xl text-base leading-8 text-[#e7eee9]">
              Thermal paper rolls are heat-sensitive paper rolls used in direct thermal printers without ink or toner.
              Buyers may call them thermal receipt paper, POS rolls, till rolls, register tape, or terminal paper. A
              quote-ready specification includes width, length or outer diameter, core ID, paper GSM, winding direction,
              coating, quantity, packing, and the printer or application.
            </p>
          </div>
        </section>

        <section className="border-b border-[#ded6c8] bg-[#fbfaf6] py-16">
          <div className="container-site">
            <div className="mb-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="section-label">Buying scenarios</p>
                <h2 className="mt-3 text-3xl font-bold text-[#14211f] md:text-4xl">
                  Match the roll to the risk your buyer is trying to avoid.
                </h2>
              </div>
              <p className="text-sm leading-7 text-[#4f5f5a]">
                The same paper width can behave very differently in a supermarket POS, a mobile payment terminal,
                a lottery machine, or an outdoor parking kiosk. Start with the use case, then confirm the spec.
              </p>
            </div>

            <div className="overflow-x-auto border border-[#ded6c8]">
              <table className="min-w-[980px] w-full text-left">
                <thead className="bg-[#101b19] text-white">
                  <tr>
                    <th className="px-5 py-4 text-xs font-bold">Scenario</th>
                    <th className="px-5 py-4 text-xs font-bold">Common spec</th>
                    <th className="px-5 py-4 text-xs font-bold">Buyer risk</th>
                    <th className="px-5 py-4 text-xs font-bold">Recommended path</th>
                    <th className="px-5 py-4 text-xs font-bold">Ask for</th>
                  </tr>
                </thead>
                <tbody>
                  {THERMAL_ROLL_SCENARIOS.map((scenario, index) => (
                    <tr key={scenario.scenario} className={index % 2 === 0 ? "bg-[#fbfaf6]" : "bg-[#f4f0e8]"}>
                      <td className="px-5 py-5 align-top text-sm font-bold text-[#14211f]">{scenario.scenario}</td>
                      <td className="px-5 py-5 align-top text-sm text-[#4f5f5a]">{scenario.commonSpec}</td>
                      <td className="px-5 py-5 align-top text-sm text-[#4f5f5a]">{scenario.buyerRisk}</td>
                      <td className="px-5 py-5 align-top">
                        <Link href={scenario.href} className="inline-flex items-center gap-2 text-sm font-bold text-[#0f5f5c] hover:text-[#0a4745]">
                          {scenario.recommendedProduct}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </td>
                      <td className="px-5 py-5 align-top text-sm text-[#4f5f5a]">{scenario.askFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="thermal-roll-terminology" className="scroll-mt-28 border-b border-[#ded6c8] bg-[#f4f0e8] py-20">
          <div className="container-site">
            <div className="max-w-3xl">
              <p className="section-label">Names and specifications</p>
              <h2 className="mt-3 text-3xl font-bold text-[#14211f] md:text-4xl">
                Read the roll name before comparing the price.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#4f5f5a]">
                Thermal roll names change by market. Metric listings often state width x outer diameter, while US and
                Canadian listings often state width x nominal length. A familiar name is not a complete specification.
              </p>
            </div>

            <div className="mt-10 overflow-x-auto border border-[#ded6c8] bg-[#fbfaf6]">
              <table className="min-w-[880px] w-full text-left">
                <thead className="bg-[#101b19] text-white">
                  <tr>
                    <th className="px-5 py-4 text-xs font-bold">Buyer term</th>
                    <th className="px-5 py-4 text-xs font-bold">Also called</th>
                    <th className="px-5 py-4 text-xs font-bold">How to use the term</th>
                  </tr>
                </thead>
                <tbody>
                  {THERMAL_ROLL_TERMS.map((item, index) => (
                    <tr key={item.term} className={index % 2 === 0 ? "bg-[#fbfaf6]" : "bg-[#eee9df]"}>
                      <th scope="row" className="px-5 py-5 align-top text-sm font-bold text-[#14211f]">{item.term}</th>
                      <td className="px-5 py-5 align-top text-sm text-[#4f5f5a]">{item.alsoCalled}</td>
                      <td className="px-5 py-5 align-top text-sm leading-6 text-[#4f5f5a]">{item.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10 overflow-x-auto border border-[#ded6c8] bg-[#fbfaf6]">
              <table className="min-w-[880px] w-full text-left">
                <thead className="bg-[#0f5f5c] text-white">
                  <tr>
                    <th className="px-5 py-4 text-xs font-bold">Common size name</th>
                    <th className="px-5 py-4 text-xs font-bold">What it usually means</th>
                    <th className="px-5 py-4 text-xs font-bold">Confirm before ordering</th>
                  </tr>
                </thead>
                <tbody>
                  {THERMAL_ROLL_SPEC_NAMES.map((item, index) => (
                    <tr key={item.name} className={index % 2 === 0 ? "bg-[#fbfaf6]" : "bg-[#eee9df]"}>
                      <th scope="row" className="px-5 py-5 align-top text-sm font-bold text-[#14211f]">{item.name}</th>
                      <td className="px-5 py-5 align-top text-sm text-[#4f5f5a]">{item.meaning}</td>
                      <td className="px-5 py-5 align-top text-sm leading-6 text-[#4f5f5a]">{item.confirm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#fbfaf6]">
          <div className="container-site">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-label">Product line</p>
                <h2 className="mt-3 text-3xl font-bold text-[#14211f] md:text-4xl">
                  Roll options for repeat orders.
                </h2>
              </div>
              <Link href="/quote" className="inline-flex items-center gap-2 text-sm font-bold text-[#0f5f5c] hover:text-[#0a4745]">
                Send a roll spec
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {THERMAL_PAPER_ROLLS.map((roll) => (
                <Link key={roll.slug} href={`/products/thermal-paper-rolls/${roll.slug}`} className="border border-[#ded6c8] bg-[#fbfaf6] hover:border-[#0f5f5c]/40 hover:bg-[#f4f0e8] transition-all p-6 group">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-[#14211f] text-xl group-hover:text-[#0f5f5c] transition-colors">{roll.name}</h3>
                    {roll.tag && (
                      <span className={`ml-2 shrink-0 border px-2 py-0.5 text-[10px] font-bold ${roll.tag === "New" ? "border-[#0f5f5c]/25 bg-[#0f5f5c]/10 text-[#0f5f5c]" : "bg-[#e7eee9] text-[#0f5f5c] border-[#0f5f5c]/25"}`}>{roll.tag}</span>
                    )}
                  </div>
                  <p className="text-[#4f5f5a] text-sm mb-4">{roll.subtitle}</p>
                  <div className="space-y-1.5 mb-4">
                    {roll.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-[#4f5f5a]">
                        <CheckCircle2 className="w-3 h-3 text-[#0f5f5c]/60 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="divider pt-4 flex items-center justify-between">
                    <span className="text-[#87918c] text-xs">MOQ: {roll.moq}</span>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0f5f5c]">
                      Details <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#ded6c8] bg-[#fbfaf6] py-20">
          <div className="container-site grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="section-label">Thermal roll FAQ</p>
              <h2 className="mt-3 text-3xl font-bold text-[#14211f] md:text-4xl">
                Clear answers before you request a quote.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#4f5f5a]">
                These answers define the naming and measurement rules used throughout this product category.
              </p>
            </div>
            <div className="divide-y divide-[#ded6c8] border-y border-[#ded6c8]">
              {THERMAL_ROLL_FAQS.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-bold text-[#14211f]">
                    {faq.question}
                    <span aria-hidden="true" className="text-xl font-normal text-[#0f5f5c] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 max-w-3xl pr-10 text-sm leading-7 text-[#4f5f5a]">{faq.answer}</p>
                </details>
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
