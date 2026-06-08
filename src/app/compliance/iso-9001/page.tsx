import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
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
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="text-blue-300 text-sm mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/compliance" className="hover:text-white">Compliance</Link>
            <span className="mx-2">/</span>
            <span className="text-white">ISO 9001</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-blue-500/30 text-blue-200 text-sm font-medium px-3 py-1 rounded-full mb-4">Quality Certification</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">ISO 9001:2015 Quality Management</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Our ISO 9001:2015 certification covers the full scope of our manufacturing operations — from raw material procurement through production, quality control, and customer delivery.
            </p>
          </div>
        </div>
      </section>

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
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 mt-6">
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
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                    <h3 className="font-semibold text-slate-800 text-sm mb-1">{item.title}</h3>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Download Our ISO 9001 Certificate</h2>
          <p className="text-blue-100 mb-8">Our ISO 9001:2015 certificate is available for download and can be used to support your own supplier qualification processes.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/compliance/certificates" className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">Download Certificate</Link>
            <Link href="/factory/quality-control" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">View Quality Process</Link>
          </div>
        </div>
      </section>
    </main>
      <CTABanner title="Need ISO 9001 Certified Supplier?" subtitle="Download our ISO 9001:2015 certificate and quality management documentation." primaryLabel="Download Certificate" secondaryLabel="Request a Quote" />
    <Footer />
    </>
  );
}
