import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import HeroBanner from "@/components/ui/HeroBanner";
import { canonicalUrl } from "@/lib/seo";



export const metadata: Metadata = {
  title: "ISO 9001:2015 Certified Thermal Paper Manufacturer",
  description: "ISO 9001:2015 certified thermal paper and label manufacturer. Full quality management system covering design, production, testing, and delivery.",
  keywords: "ISO 9001 thermal paper manufacturer, quality management thermal paper, ISO certified label manufacturer",
  alternates: { canonical: canonicalUrl("/compliance/iso-9001") },
};

export default function ISO9001Page() {
  return (

    <>
      <Header />
      <main className="min-h-screen bg-white">
      <HeroBanner
        variant="media"
        eyebrow="Quality management"
        title="ISO 9001:2015 Quality Management"
        description="Review the documented quality-management scope, process controls, and available certificate material as part of supplier qualification."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Compliance", href: "/compliance" },
          { label: "ISO 9001" },
        ]}
        actions={[
          { label: "Request Certificate", href: "/compliance/certificates", kind: "primary" },
          { label: "View Quality Process", href: "/factory/quality-control", kind: "secondary" },
        ]}
      />

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">What ISO 9001:2015 Means for You</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                ISO 9001:2015 is the world's most widely recognised quality management standard. For our customers, it means that our quality processes are independently audited and verified by an accredited certification body.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Our quality management system ensures consistent product quality, reliable delivery performance, and a systematic approach to identifying and resolving quality issues before they reach your customers.
              </p>
              <div className="bg-blue-50  p-6 border border-blue-100 mt-6">
                <h3 className="font-semibold text-slate-800 mb-3">Certificate Details</h3>
                <div className="space-y-2 text-sm">
                  {[
                    ["Standard", "ISO 9001:2015"],
                    ["Certification Body", "Bureau Veritas"],
                    ["Scope", "Design, manufacture and supply of thermal paper rolls and thermal labels"],
                    ["Certificate Number", "BV-QMS-2024-001"],
                    ["Valid Through", "December 2026"],
                    ["Surveillance Audits", "Annual"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex gap-3">
                      <span className="text-slate-500 w-36 flex-shrink-0">{k}:</span>
                      <span className="text-slate-800 font-medium">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">QMS Scope & Coverage</h2>
              <div className="space-y-4">
                {[
                  { title: "Product Design & Development", desc: "New product development follows a structured design control process with defined review, verification, and validation stages." },
                  { title: "Supplier Management", desc: "All raw material suppliers are qualified and monitored against defined quality criteria. Critical suppliers undergo annual audits." },
                  { title: "Production Control", desc: "Manufacturing processes are controlled by documented work instructions, process parameters, and in-process inspection criteria." },
                  { title: "Measurement & Testing", desc: "All measurement equipment is calibrated to traceable standards. Test methods follow recognised international standards." },
                  { title: "Non-Conformance Management", desc: "Non-conforming products are identified, segregated, and dispositioned through a formal corrective action process." },
                  { title: "Customer Satisfaction", desc: "Customer feedback is systematically collected and analysed to drive continuous improvement across all processes." },
                ].map((item, i) => (
                  <div key={i} className="bg-white border border-slate-200  p-4 shadow-sm">
                    <h3 className="font-semibold text-slate-800 text-sm mb-1">{item.title}</h3>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
      <CTABanner title="Need ISO 9001 Certified Supplier?" subtitle="Download our ISO 9001:2015 certificate and quality management documentation." primaryLabel="Download Certificate" secondaryLabel="Request a Quote" />
    <Footer />
    </>
  );
}
