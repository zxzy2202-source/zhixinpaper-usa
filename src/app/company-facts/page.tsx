import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { breadcrumbSchema, buildMetadata, canonicalUrl, organizationSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Zhixin Paper Company Facts and Verification Routes",
  description:
    "Review Zhixin Paper's legal entity, operating history, manufacturing scope, contact routes, and product-specific evidence process before a B2B thermal paper or label order.",
  path: "/company-facts",
  languages: {
    en: "https://www.zhixinpaper.com/company-facts",
    "x-default": "https://www.zhixinpaper.com/company-facts",
  },
});

const facts = [
  ["Legal entity", "Xi'an Zhi Xin Paper Co., Ltd.", "Confirm the contracting entity on the quotation and order documents."],
  ["Brand name", "Zhixin Paper / ZhixinPaper", "The trade name used across the website and product materials."],
  ["Legal registration", "Xi'an Zhi Xin Paper Co., Ltd. registered in August 2009", "The current legal entity is distinct from the predecessor business established in 2006."],
  ["Business roots", "Predecessor business established in 2006", "Zhixin Electronics Business Department preceded the current company; converting practice began in 2008."],
  ["Manufacturing scope", "Thermal paper rolls, thermal labels, and NCR forms", "Product construction, printer fit, packing, and document requirements are reviewed per SKU."],
  ["Primary B2B buyers", "Importers, distributors, OEM and private-label programs", "Projects are reviewed around repeat-order specifications and destination requirements."],
  ["Factory location", "Gaoling District, Xi'an, Shaanxi, China", "Factory and quality-control information is available through the linked review pages."],
];

const reviewRoutes = [
  {
    title: "Verify the manufacturing record",
    text: "Review the company timeline, operating principles, and the buyer review route before starting a supply program.",
    href: "/about",
    label: "Read company history",
  },
  {
    title: "Review current factory capability",
    text: "See converting, equipment, quality-control, and capacity-planning pages. Capacity and lead time are confirmed against the current project rather than stated as a blanket promise.",
    href: "/factory",
    label: "Explore the factory",
  },
  {
    title: "Match documents to the order",
    text: "Compliance evidence depends on product grade, intended use, destination, certificate scope, and document validity. Review the required route before deposit or bulk approval.",
    href: "/compliance",
    label: "Review compliance routes",
  },
];

export default function CompanyFactsPage() {
  const pageUrl = canonicalUrl("/company-facts");
  const jsonLd = [
    organizationSchema(),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Company Facts", url: "/company-facts" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "Zhixin Paper Company Facts and Verification Routes",
      url: pageUrl,
      mainEntity: {
        "@type": "Organization",
        "@id": "https://www.zhixinpaper.com/#organization",
        name: "Zhixin Paper",
        legalName: "Xi'an Zhi Xin Paper Co., Ltd.",
        foundingDate: "2009-08",
        url: "https://www.zhixinpaper.com",
      },
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
              <span className="text-white">Company facts</span>
            </nav>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e1c18a]">Buyer verification center</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">
              Company facts buyers can verify before approving a supply program.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/78 md:text-lg">
              This page separates stable company facts from product- and project-specific claims. Use the linked routes to verify the evidence relevant to your material, application, destination, and order stage.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container-site">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0f5f5c]">Entity and operating record</p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">Use the same facts across every buyer review.</h2>
              <p className="mt-4 text-sm leading-7 text-[#5d6763]">
                The facts below are company-level information. Product performance, certificate applicability, MOQ, capacity, lead time, and delivery terms remain subject to the quoted specification and current project review.
              </p>
            </div>
            <dl className="mt-10 divide-y divide-[#d7cec0] border-y border-[#d7cec0]">
              {facts.map(([term, value, note]) => (
                <div key={term} className="grid gap-3 py-6 md:grid-cols-[0.7fr_1fr_1.3fr] md:gap-8">
                  <dt className="text-sm font-bold text-[#0f5f5c]">{term}</dt>
                  <dd className="text-base font-semibold text-[#14211f]">{value}</dd>
                  <dd className="text-sm leading-6 text-[#5d6763]">{note}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="border-y border-[#ded6c8] bg-white py-16 md:py-20">
          <div className="container-site">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0f5f5c]">Evidence routes</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight md:text-4xl">Verify the detail that matters to your order.</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {reviewRoutes.map((route) => (
                <Link key={route.href} href={route.href} className="group border border-[#ded6c8] bg-[#fbfaf6] p-6 transition-colors hover:border-[#0f5f5c] hover:bg-white">
                  <h3 className="text-xl font-bold text-[#14211f]">{route.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#5d6763]">{route.text}</p>
                  <span className="mt-6 inline-block text-sm font-bold text-[#0f5f5c] group-hover:underline">{route.label} →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTABanner
          title="Need documentation or a specification review for a live project?"
          subtitle="Send the product, printer or application, destination, packing target, and document request. We will confirm the evidence route relevant to the quoted construction."
          trustItems={["Entity and scope review", "Product-specific document route", "Sample-first qualification", "Order-specific capacity review"]}
        />
      </main>
      <Footer />
    </>
  );
}
