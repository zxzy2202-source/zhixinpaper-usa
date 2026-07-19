import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowRight, ChevronRight, FileCheck2, ShieldCheck } from "lucide-react";
import { breadcrumbSchema, buildMetadata, canonicalUrl, faqSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "BPA-Free & Phenol-Free Thermal Paper",
  description:
    "Compare BPA-free, BPS-free and phenol-free thermal paper terms, grade-level documents, receipt roll options, and fields required for a compliant quote.",
  path: "/compliance/bpa-free",
  keywords: [
    "BPA free thermal paper",
    "BPS free thermal paper",
    "phenol free thermal paper",
    "bisphenol free receipt paper",
    "BPA free thermal printer paper",
    "phenol free receipt rolls",
  ],
});

const TERMS = [
  {
    term: "BPA-free",
    meaning: "The selected thermal paper grade is specified without Bisphenol A as the developer.",
    boundary: "Does not by itself prove that the grade is BPS-free or phenol-free.",
  },
  {
    term: "BPS-free",
    meaning: "The selected grade is specified without Bisphenol S.",
    boundary: "Confirm the developer system and whether other bisphenols or phenolic developers are in scope.",
  },
  {
    term: "Phenol-free",
    meaning: "A supplier category generally used for grades formulated without named phenolic or bisphenol developers.",
    boundary: "The exact definition varies by grade and supplier; request the named scope and supporting document.",
  },
  {
    term: "Bisphenol-free",
    meaning: "A broader buyer term for grades that exclude specified bisphenol developers.",
    boundary: "Ask which bisphenols were tested or declared and which test method or threshold applies.",
  },
];

const DOCUMENT_CHECKS = [
  "Supplier grade name and technical data sheet",
  "Named BPA, BPS, bisphenol, or phenol-free scope",
  "Declaration or test report linked to the quoted grade",
  "Laboratory, method, date, threshold, and sample identity",
  "Destination-market and customer document requirements",
  "Approved sample and production-grade reference",
];

const BUYER_ROUTES = [
  {
    title: "Retail and POS distributors",
    copy: "Confirm the receipt-roll grade, store handling conditions, document pack, carton configuration, and repeat-order specification.",
  },
  {
    title: "Foodservice and hospitality",
    copy: "Separate receipt handling from direct food-contact claims. Document the actual use, exposure, and buyer standard before selection.",
  },
  {
    title: "Healthcare and pharmacy channels",
    copy: "Define handling frequency, retention need, image-life conditions, and procurement documentation without treating the paper as a medical certification.",
  },
  {
    title: "Private-label programs",
    copy: "Keep the paper grade, packaging claim, artwork wording, test report, and change-control record aligned across repeat orders.",
  },
];

const FAQS = [
  {
    question: "Is BPA-free thermal paper automatically BPS-free?",
    answer: "No. BPA-free describes the absence of BPA in the selected scope; another developer, including BPS, may be used. Request the paper grade, developer declaration, and supporting document when BPS-free status matters.",
  },
  {
    question: "Are BPS-free and phenol-free the same claim?",
    answer: "Not necessarily. BPS-free excludes BPS, while phenol-free may refer to a broader developer category. Supplier definitions and test scopes vary, so the quote and document pack should name the exact substances or developer system covered.",
  },
  {
    question: "Which document should a thermal paper buyer request?",
    answer: "Start with the supplier grade and TDS, then request a declaration or test report that names the relevant substance, threshold, method, sample identity, and date. Confirm that the document applies to the grade being quoted.",
  },
  {
    question: "Can BPA-free or phenol-free status be applied to every Zhixin Paper product?",
    answer: "Availability must be confirmed by product, paper grade, dimensions, converting route, quantity, and destination. Do not apply a document from one grade to another product without written confirmation.",
  },
  {
    question: "What information is needed for a compliant thermal paper quote?",
    answer: "Send the application, roll or label specification, printer model, required chemical wording, destination, customer standard, quantity, packing, and any document template that must be completed.",
  },
];

const definedTermSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "BPA-free, BPS-free and phenol-free thermal paper terminology",
  url: canonicalUrl("/compliance/bpa-free"),
  hasDefinedTerm: TERMS.map((item) => ({
    "@type": "DefinedTerm",
    name: item.term,
    description: `${item.meaning} ${item.boundary}`,
  })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "BPA-Free, BPS-Free and Phenol-Free Thermal Paper",
  url: canonicalUrl("/compliance/bpa-free"),
  description:
    "Buyer guide to thermal paper developer terminology, grade-level evidence, product selection, and quote requirements.",
  about: TERMS.map((item) => item.term),
};

const serializeJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");

export default function BPAFreePage() {
  const jsonLd = [
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Compliance", url: "/compliance" },
      { name: "BPA-Free & Phenol-Free", url: "/compliance/bpa-free" },
    ]),
    webPageSchema,
    definedTermSchema,
    faqSchema(FAQS),
  ];

  return (
    <>
      <Header />
      {jsonLd.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      ))}
      <main id="main-content" className="bg-[#fbfaf6] pt-[64px] md:pt-[92px]">
        <section className="border-b border-[#203531] bg-[#101b19] text-white">
          <div className="container-site py-4">
            <nav className="flex items-center gap-1.5 text-xs font-semibold text-[#aebbb5]" aria-label="Breadcrumb">
              <Link href="/" className="transition hover:text-white">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/compliance" className="transition hover:text-white">Compliance</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white">BPA-Free & Phenol-Free</span>
            </nav>
          </div>
          <div className="container-site grid gap-10 pb-14 pt-8 lg:grid-cols-[0.9fr_0.62fr] lg:items-end lg:pb-20">
            <div>
              <p className="text-xs font-bold text-[#d6b273]">Chemical terminology and document route</p>
              <h1
                aria-label="BPA-Free, BPS-Free and Phenol-Free Thermal Paper"
                className="mt-4 max-w-5xl text-[2rem] font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl"
              >
                <span aria-hidden="true" className="block whitespace-nowrap">BPA-Free & BPS-Free</span>{" "}
                <span aria-hidden="true" className="block whitespace-nowrap">Phenol-Free</span>{" "}
                <span aria-hidden="true" className="block whitespace-nowrap">Thermal Paper</span>
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#c7d0cb]">
                Match the claim to a named paper grade and document scope. These terms overlap, but they are not interchangeable proof.
              </p>
            </div>
            <div className="border-t border-white/20 pt-6">
              <p className="text-sm leading-7 text-[#aebbb5]">
                Quote-ready input: product specification, application, printer, required wording, destination, buyer standard, quantity, and document template.
              </p>
              <Link href="/quote" className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 bg-[#9c661d] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#7d4f16]">
                Confirm Grade & Documents <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="border-b border-[#ded6c8] bg-white py-14 md:py-16">
          <div className="container-site grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="section-label">Direct answer</p>
              <h2 className="mt-3 text-3xl font-bold text-[#14211f] md:text-4xl">What is phenol-free thermal paper?</h2>
            </div>
            <p className="text-base leading-8 text-[#4f5f5a]">
              Phenol-free thermal paper is a supplier category for grades formulated without a stated set of phenolic or bisphenol developers. Because definitions and test scopes vary, buyers should not treat the phrase as universal. Confirm the grade name, excluded substances, method or declaration, and whether the evidence applies to the exact roll or label being quoted.
            </p>
          </div>
        </section>

        <section className="border-b border-[#ded6c8] bg-[#f4f0e8] py-16 md:py-20">
          <div className="container-site">
            <div className="max-w-3xl">
              <p className="section-label">Terminology</p>
              <h2 className="mt-3 text-3xl font-bold text-[#14211f] md:text-4xl">Read the scope behind the label.</h2>
            </div>
            <div className="mt-9 overflow-x-auto border border-[#ded6c8] bg-white">
              <table className="w-full min-w-[900px] text-left">
                <thead className="bg-[#101b19] text-white">
                  <tr>
                    <th className="px-5 py-4 text-xs font-bold">Term</th>
                    <th className="px-5 py-4 text-xs font-bold">What it normally states</th>
                    <th className="px-5 py-4 text-xs font-bold">What it does not prove alone</th>
                  </tr>
                </thead>
                <tbody>
                  {TERMS.map((item, index) => (
                    <tr key={item.term} className={index % 2 === 0 ? "bg-white" : "bg-[#fbfaf6]"}>
                      <th scope="row" className="px-5 py-5 align-top text-sm font-bold text-[#14211f]">{item.term}</th>
                      <td className="px-5 py-5 align-top text-sm leading-7 text-[#4f5f5a]">{item.meaning}</td>
                      <td className="px-5 py-5 align-top text-sm leading-7 text-[#4f5f5a]">{item.boundary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="border-b border-[#ded6c8] bg-white py-16 md:py-20">
          <div className="container-site grid gap-12 lg:grid-cols-[0.72fr_1fr]">
            <div>
              <p className="section-label">Evidence checklist</p>
              <h2 className="mt-3 text-3xl font-bold text-[#14211f] md:text-4xl">Tie the claim to the quoted grade.</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#4f5f5a]">
                A company certificate or document for another paper grade is not automatic proof for the product in your RFQ.
              </p>
              <div className="mt-8 flex flex-wrap gap-5 text-sm font-bold text-[#0f5f5c]">
                <Link href="/compliance/reach-rohs" className="inline-flex items-center gap-2 hover:underline">REACH & RoHS route <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/compliance/certificates" className="inline-flex items-center gap-2 hover:underline">Certificate library <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
            <ul className="border-t border-[#ded6c8]">
              {DOCUMENT_CHECKS.map((item) => (
                <li key={item} className="flex gap-3 border-b border-[#ded6c8] py-4 text-sm font-semibold leading-6 text-[#33413e]">
                  <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-[#9c661d]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-[#101b19] py-16 text-white md:py-20">
          <div className="container-site">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-end">
              <h2 className="text-3xl font-bold text-white md:text-4xl">Use the same chemistry term differently by buyer task.</h2>
              <p className="max-w-2xl text-sm leading-7 text-[#c7d0cb] lg:justify-self-end">
                The product specification remains central. Industry language changes the qualification questions, evidence pack, and approval path.
              </p>
            </div>
            <div className="mt-10 grid gap-px bg-white/15 md:grid-cols-2">
              {BUYER_ROUTES.map((route) => (
                <article key={route.title} className="bg-[#101b19] p-6 md:p-8">
                  <ShieldCheck className="h-5 w-5 text-[#d6b273]" />
                  <h3 className="mt-5 text-xl font-bold text-white">{route.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#aebbb5]">{route.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#ded6c8] bg-[#fbfaf6] py-16 md:py-20">
          <div className="container-site grid gap-12 lg:grid-cols-[0.7fr_1fr]">
            <div>
              <p className="section-label">Buyer questions</p>
              <h2 className="mt-3 text-3xl font-bold text-[#14211f] md:text-4xl">Clarify the developer before approving the wording.</h2>
            </div>
            <div className="border-t border-[#ded6c8]">
              {FAQS.map((faq) => (
                <article key={faq.question} className="border-b border-[#ded6c8] py-6">
                  <h3 className="text-lg font-bold text-[#14211f]">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#4f5f5a]">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#9c661d] py-14 text-white">
          <div className="container-site grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-white">Send the required wording with your product specification.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85">We will confirm the available grade route, evidence needed, sample plan, packing, and quote fields.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#14211f] px-7 py-3.5 text-sm font-bold text-white">
                Request a Grade Review <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/products/thermal-paper-rolls" className="inline-flex min-h-12 items-center justify-center border border-white/55 px-7 py-3.5 text-sm font-semibold text-white">
                Browse Thermal Rolls
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
