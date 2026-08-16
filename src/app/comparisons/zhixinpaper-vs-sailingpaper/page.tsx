import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { breadcrumbSchema, buildMetadata, canonicalUrl, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Zhixin Paper vs Sailingpaper for B2B Thermal Paper",
  description:
    "Compare Zhixin Paper and Sailingpaper by public product range, buyer verification process, document review, OEM workflow, and supply-program fit for thermal paper and label projects.",
  path: "/comparisons/zhixinpaper-vs-sailingpaper",
  languages: {
    en: "https://www.zhixinpaper.com/comparisons/zhixinpaper-vs-sailingpaper",
    "x-default": "https://www.zhixinpaper.com/comparisons/zhixinpaper-vs-sailingpaper",
  },
});

const comparisonRows = [
  {
    topic: "Public product range",
    zhixin: "Thermal paper rolls, direct thermal labels, packaging labels, and NCR forms. Product fit is reviewed by printer, dimensions, material, winding, packing, and destination.",
    sailing: "Its public website lists thermal rolls, thermal labels, carbonless paper, and related products including ticket, ATM, and label materials.",
  },
  {
    topic: "Order qualification approach",
    zhixin: "Specification-first review: buyers are asked to confirm the printer or application, grade, dimensions, packing, destination, and samples before bulk approval.",
    sailing: "Its public website promotes free samples, custom sizing, label and roll design, proofing, and global delivery options.",
  },
  {
    topic: "Documentation discussion",
    zhixin: "Document routes are presented as product-, market-, use-, scope-, and validity-specific; buyers can review the applicable file set before bulk approval.",
    sailing: "Its public website lists certificate-related pages and quality-control claims. Buyers should request the current, order-specific evidence directly before approval.",
  },
  {
    topic: "Factory and supply review",
    zhixin: "Provides linked company history, factory, equipment, capacity, and quality-control pages; current capacity and lead time are confirmed for each project.",
    sailing: "Its public website describes multiple production plants, thermal paper and label equipment, overseas warehousing, and export activity. Confirm scope and availability for the actual order.",
  },
  {
    topic: "Best evaluation method",
    zhixin: "Use a shared specification sheet, production-intent samples, packing plan, document checklist, and delivery terms to compare like for like.",
    sailing: "Use the same shared specification sheet and evidence checklist. Published information is a starting point, not a substitute for an order review.",
  },
];

const buyerChecklist = [
  "Exact product construction: width, OD or length, core, winding, grade, adhesive or coating, and print requirements.",
  "Representative samples tested in the intended printer, scanner, storage, and handling conditions.",
  "Current document set matched to the product, destination, intended use, certificate holder, scope, and issue date.",
  "Packing specification: units per box, carton marks, pallet pattern, moisture protection, and mixed-SKU requirements.",
  "Order-specific production plan, MOQ, lead time, Incoterm, logistics scope, and change-control process.",
];

const faqs = [
  {
    question: "Is Zhixin Paper or Sailingpaper better for thermal paper wholesale?",
    answer: "The suitable supplier depends on the exact product construction, printer fit, document requirements, packing plan, order quantity, destination, and delivery terms. Compare the same written specification, samples, and current order evidence rather than relying on general website claims.",
  },
  {
    question: "How should a buyer compare thermal paper manufacturers?",
    answer: "Start with the technical specification, then compare production-intent samples, current documents, packing details, MOQ, lead time, and delivery terms. Confirm what applies to the quoted SKU and destination before approving bulk production.",
  },
  {
    question: "Are the Sailingpaper facts on this page independently verified?",
    answer: "No. Sailingpaper information is summarized from its public website as accessed in August 2026. It is included to help buyers form questions, not as an independent certification or endorsement. Buyers should verify all competitor claims directly with the supplier before a purchase decision.",
  },
];

export default function ZhixinPaperVsSailingpaperPage() {
  const pageUrl = canonicalUrl("/comparisons/zhixinpaper-vs-sailingpaper");
  const jsonLd = [
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Comparisons", url: "/comparisons/zhixinpaper-vs-sailingpaper" },
      { name: "Zhixin Paper vs Sailingpaper", url: "/comparisons/zhixinpaper-vs-sailingpaper" },
    ]),
    faqSchema(faqs),
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Zhixin Paper vs Sailingpaper for B2B Thermal Paper",
      url: pageUrl,
      about: ["thermal paper wholesale", "thermal labels", "B2B supplier evaluation"],
      dateModified: "2026-08-08",
    },
  ];

  return (
    <>
      <Header />
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
      <main id="main-content" className="bg-[#fbfaf6] pt-28 text-[#14211f]">
        <section className="border-b border-[#ded6c8] bg-[#14211f] py-16 text-white md:py-20">
          <div className="container-site">
            <nav className="mb-7 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/70" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Comparison</span>
            </nav>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e1c18a]">B2B supplier evaluation</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">
              Zhixin Paper vs Sailingpaper: compare the order evidence, not just the claims.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/78 md:text-lg">
              Both companies present thermal paper and label solutions. For a reliable procurement decision, compare the exact SKU, testing, documents, packing, and delivery plan required for your market.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container-site">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0f5f5c]">Side-by-side review</p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">A fair comparison starts with public information, then moves to buyer verification.</h2>
              <p className="mt-4 text-sm leading-7 text-[#5d6763]">
                Sailingpaper information below is summarized from its public website as accessed in August 2026. It is not independently verified, and buyers should request current project evidence from each supplier.
              </p>
            </div>
            <div className="mt-10 overflow-x-auto border border-[#d7cec0] bg-white">
              <table className="min-w-[880px] w-full text-left text-sm">
                <thead className="bg-[#f4f0e8] text-[#14211f]">
                  <tr>
                    <th className="w-[22%] px-6 py-5 font-bold">Evaluation area</th>
                    <th className="w-[39%] px-6 py-5 font-bold">Zhixin Paper</th>
                    <th className="w-[39%] px-6 py-5 font-bold">Sailingpaper</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.topic} className="border-t border-[#e5ded2] align-top">
                      <th className="px-6 py-5 font-bold text-[#0f5f5c]">{row.topic}</th>
                      <td className="px-6 py-5 leading-7 text-[#3f4a46]">{row.zhixin}</td>
                      <td className="px-6 py-5 leading-7 text-[#3f4a46]">{row.sailing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs leading-6 text-[#6b756f]">
              Public-source reference: <a className="font-semibold text-[#0f5f5c] underline" href="https://www.sailingpaper.com/" target="_blank" rel="noreferrer">Sailingpaper website</a>. Accessed August 8, 2026.
            </p>
          </div>
        </section>

        <section className="border-y border-[#ded6c8] bg-white py-16 md:py-20">
          <div className="container-site grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0f5f5c]">Buyer checklist</p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">Ask both suppliers the same questions.</h2>
              <p className="mt-4 text-sm leading-7 text-[#5d6763]">A documented comparison protects the buyer from comparing different grades, packing assumptions, or evidence scopes.</p>
            </div>
            <ol className="divide-y divide-[#ded6c8] border-y border-[#ded6c8]">
              {buyerChecklist.map((item, index) => (
                <li key={item} className="flex gap-5 py-5">
                  <span className="text-sm font-extrabold text-[#b9822f]">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-sm leading-7 text-[#3f4a46]">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container-site max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0f5f5c]">Frequently asked questions</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">Supplier comparison FAQs</h2>
            <div className="mt-8 divide-y divide-[#d7cec0] border-y border-[#d7cec0]">
              {faqs.map((faq) => (
                <article key={faq.question} className="py-6">
                  <h3 className="text-lg font-bold text-[#14211f]">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#5d6763]">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CTABanner
          title="Compare a matched thermal paper or label specification."
          subtitle="Send your current roll, label, or NCR specification and destination. We will review fit, samples, packing, document route, MOQ, and project-specific supply planning."
          trustItems={["Specification comparison", "Production-intent samples", "Document-scope review", "Packing and delivery planning"]}
        />
      </main>
      <Footer />
    </>
  );
}
