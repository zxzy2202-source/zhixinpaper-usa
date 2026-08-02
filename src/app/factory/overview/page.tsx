import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import HeroBanner from "@/components/ui/HeroBanner";
import { canonicalUrl } from "@/lib/seo";



export const metadata: Metadata = {
  title: "Thermal Paper Plant Overview",
  description: "Review Zhixin Paper's thermal paper coating, slitting, label converting, quality-control, warehouse, and export-packing operations in Xi'an, China.",
  keywords: "thermal paper manufacturing plant, ISO certified factory, thermal paper factory China",
  alternates: { canonical: canonicalUrl("/factory/overview") },
};

export default function FactoryOverviewPage() {
  const stats = [
    { value: "By Site", label: "Production Area Review" },
    { value: "By Line", label: "Equipment Inventory" },
    { value: "By RFQ", label: "Capacity Planning" },
    { value: "By Scope", label: "Quality Documents" },
    { value: "Since 2008", label: "Operating History" },
    { value: "By Function", label: "Production Team" },
  ];

  const sections = [
    {
      title: "Coating & Base Paper Division",
      desc: "Coating routes, line availability, material formulation, sensitivity, image density, and retention targets are reviewed against the exact product specification and current production plan.",
    },
    {
      title: "Slitting & Converting Division",
      desc: "Slitting and converting equipment is selected by roll width, OD, core, winding, material, tolerance, and approved specification. Inspection records are defined by project.",
    },
    {
      title: "Label Manufacturing Division",
      desc: "Label converting routes are reviewed by facestock, adhesive, liner, printing, die cutting, lamination, format, and approved sample before production planning.",
    },
    {
      title: "Quality Control Laboratory",
      desc: "Inspection methods and records are selected from the product specification, intended use, acceptance criteria, and available equipment. Requested traceability and batch documents must be included in the project scope.",
    },
  ];

  return (

    <>
      <Header />
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
          <p className="text-slate-500 mb-12 max-w-2xl">Our facility is organized into specialized production divisions, each equipped with dedicated machinery and staffed by experienced technicians.</p>
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
