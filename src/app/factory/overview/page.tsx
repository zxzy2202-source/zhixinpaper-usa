import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import HeroBanner from "@/components/ui/HeroBanner";
import FactorySubnav from "@/components/factory/FactorySubnav";
import { breadcrumbSchema, canonicalUrl } from "@/lib/seo";

const PAGE_URL = canonicalUrl("/factory/overview");

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Thermal Paper Converting and Label Manufacturing",
  url: PAGE_URL,
  description:
    "Review Zhixin Paper's thermal paper slitting, label converting, quality-control, warehouse, and export-packing operations in Xi'an, China.",
};

const serializeJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");

const jsonLd = [
  breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Factory", url: "/factory" },
    { name: "Overview", url: "/factory/overview" },
  ]),
  webPageSchema,
];

export const metadata: Metadata = {
  title: "Thermal Paper Factory Overview: Slitting to Packing",
  description: "Review Zhixin Paper's thermal paper slitting, label converting, quality-control, warehouse, and export-packing operations in Xi'an, China.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
};

export default function FactoryOverviewPage() {
  const stats = [
    { value: "5,000 m²", label: "Factory Area" },
    { value: "65", label: "Employees" },
    { value: "11", label: "Slitting Machines" },
    { value: "30 tons", label: "Per Day" },
    { value: "Since 2009", label: "Manufacturing" },
    { value: "50+", label: "Export Countries" },
  ];

  const sections = [
    {
      title: "Sourced Materials",
      desc: "Thermal paper jumbo rolls and blank label stock are sourced through consolidated purchasing before in-house converting and production.",
    },
    {
      title: "Slitting & Converting Division",
      desc: "Sourced jumbo rolls are slit in-house by roll width, OD, core, winding, and approved specification. Inspection records are defined by project.",
    },
    {
      title: "Label Manufacturing Division",
      desc: "Custom printed labels are produced in-house through printing, die-cutting, vision inspection, slitting, and packaging after label stock is sourced.",
    },
    {
      title: "Quality Control Laboratory",
      desc: "Inspection methods and records are selected from the product specification, intended use, acceptance criteria, and available equipment. Requested traceability and batch documents must be included in the project scope.",
    },
  ];

  return (

    <>
      <Header />
      <FactorySubnav current="/factory/overview" />
      {jsonLd.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      ))}
      <main id="main-content" className="legacy-brand-page min-h-screen bg-white">
      {/* Hero */}
      <HeroBanner
        variant="overview"
        eyebrow="Factory overview"
        title="Thermal Paper Converting and Label Manufacturing"
        description="Review the production areas involved in thermal paper rolls and labels, from material handling and converting to printing, inspection, packing, and export-order coordination."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Factory", href: "/factory" },
          { label: "Overview" },
        ]}
        actions={[
          { label: "Explore Factory Areas", href: "/factory/virtual-tour", kind: "primary" },
          { label: "Discuss an Audit", href: "/contact", kind: "secondary" },
        ]}
      />

      {/* Stats */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-blue-700">{s.value}</div>
                <div className="text-sm text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Production Divisions</h2>
          <p className="text-slate-500 mb-12 max-w-2xl">Our one-site facility covers 5,000 m² and supports a 65-person team across sourcing, converting, inspection, printing, and packing.</p>
          <div className="grid md:grid-cols-2 gap-8">
            {sections.map((s, i) => (
              <div key={i} className="bg-white border border-slate-200  p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-100  flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-bold text-lg">{i + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{s.title}</h3>
                <p className="text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
    <CTABanner
      title="Planning a factory review?"
      subtitle="Tell us which products, processes, documents, and audit checkpoints matter to your sourcing team so the visit scope can be reviewed."
      showTrust={false}
    />
    <Footer />
    </>
  );
}
