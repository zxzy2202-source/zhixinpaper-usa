import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import HeroBanner from "@/components/ui/HeroBanner";
import { canonicalUrl } from "@/lib/seo";

const PAGE_URL = canonicalUrl("/factory/quality-control");

export const metadata: Metadata = {
  title: "Quality Control | Thermal Paper Manufacturing",
  description: "Review Zhixin Paper's material checks, in-process controls, finished-goods testing, traceability approach, and project-specific document review for thermal paper and labels.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
};

const qcSteps = [
  { step: "01", title: "Incoming Material Review", desc: "Base paper, adhesives, coatings, and packaging materials are checked against the approved purchase and product specifications before use. Available supplier documents are reviewed according to the material and project scope." },
  { step: "02", title: "In-Process Monitoring", desc: "Production teams monitor relevant process settings and product characteristics during converting, printing, and packing. The control plan depends on the construction, equipment, and agreed acceptance criteria." },
  { step: "03", title: "Visual and Dimensional Checks", desc: "Inspection methods may include visual checks, dimensional measurements, print review, splice review, and sampling at defined production stages. The exact inspection route is confirmed during project review." },
  { step: "04", title: "Finished-Goods Testing", desc: "Batch samples can be checked for characteristics such as image response, dimensions, winding, adhesion, barcode readability, or print quality when those checks are relevant to the approved specification." },
  { step: "05", title: "Production Records", desc: "Production and inspection records are maintained using the applicable batch and order references. Traceability detail depends on the product route, packaging format, and agreed documentation plan." },
  { step: "06", title: "Issue Review and Corrective Action", desc: "Reported quality issues are logged and reviewed against samples, specifications, production records, and use conditions. Response timing and corrective-action format are agreed according to the issue scope and evidence available." },
];

export default function QualityControlPage() {
  return (

    <>
      <Header />
      <main id="main-content" className="legacy-brand-page min-h-screen bg-white">
      <HeroBanner
        variant="media"
        eyebrow="Manufacturing quality control"
        title="Quality Management System"
        description="Review how material checks, in-process monitoring, finished-goods testing, production records, and issue handling are planned around the approved product specification and application."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Factory", href: "/factory" },
          { label: "Quality Control" },
        ]}
        actions={[
          { label: "Discuss Quality Requirements", href: "/quote", kind: "primary" },
          { label: "Review Available Documents", href: "/compliance/certificates", kind: "secondary" },
        ]}
      />

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-12">Our Quality Control Process</h2>
          <div className="space-y-6">
            {qcSteps.map((step) => (
              <div key={step.step} className="flex gap-6 items-start bg-white border border-slate-200  p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-14 h-14 bg-blue-600 text-white  flex items-center justify-center font-bold text-lg">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Documentation Review</h2>
          <p className="max-w-3xl text-slate-600 leading-relaxed mb-8">
            Certificate, declaration, and test-report availability varies by material grade, supplier source, intended application, destination market, and current document validity. Share the exact specification and intended use so our team can confirm the applicable evidence before an order decision.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { cert: "Quality System", scope: "Review the current certificate, issuing body, validity, and manufacturing scope." },
              { cert: "Material Declarations", scope: "Confirm BPA/BPS, restricted-substance, or sourcing statements for the selected construction." },
              { cert: "Application Evidence", scope: "Check whether food-contact, healthcare, transport, or other use-specific evidence applies." },
            ].map((c) => (
              <div key={c.cert} className="bg-white p-5 border border-slate-200">
                <div className="text-[#0f5f5c] font-bold text-lg mb-1">{c.cert}</div>
                <div className="text-slate-500 text-sm">{c.scope}</div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/compliance/certificates" className="inline-flex items-center text-[#0f5f5c] font-semibold hover:text-[#14211f] transition-colors">
              Review certificate guidance →
            </Link>
          </div>
        </div>
      </section>

    </main>
      <CTABanner
        title="Ready to define the quality plan?"
        subtitle="Share the product specification, application, destination, acceptance criteria, and documentation needs for a project-specific review."
        showTrust={false}
      />
    <Footer />
    </>
  );
}
