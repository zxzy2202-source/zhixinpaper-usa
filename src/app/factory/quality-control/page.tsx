import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { canonicalUrl } from "@/lib/seo";



export const metadata: Metadata = {
  title: "Quality Control | ISO 9001 Thermal Paper Manufacturer",
  description: "ISO 9001:2015 certified quality management system. 100% inline inspection, incoming material testing, and full batch traceability for thermal paper and labels.",
  keywords: "thermal paper quality testing, ISO 9001 label manufacturer, quality management thermal paper",
  alternates: { canonical: canonicalUrl("/factory/quality-control") },
};

const qcSteps = [
  { step: "01", title: "Incoming Material Inspection", desc: "All base paper, thermal coating chemicals, adhesives, and packaging materials are tested against specification before entering production. Certificates of conformity are verified for every batch." },
  { step: "02", title: "In-Process Quality Monitoring", desc: "Inline sensors monitor coating weight, caliper, and image density continuously during production. Statistical process control (SPC) charts flag deviations before they become defects." },
  { step: "03", title: "100% Vision Inspection", desc: "Every finished roll passes through our automated vision inspection system, which detects coating voids, print defects, splices, and dimensional non-conformances at production speed." },
  { step: "04", title: "Finished Goods Testing", desc: "Random samples from every production batch are tested in our laboratory for image density, fade resistance, adhesion (labels), chemical compliance, and dimensional accuracy." },
  { step: "05", title: "Batch Traceability", desc: "Every roll and label pack carries a unique batch code traceable to raw material lot, production line, operator, and test results — enabling rapid response to any quality issue." },
  { step: "06", title: "Customer Complaint Resolution", desc: "Our quality team responds to customer complaints within 24 hours with a preliminary root cause analysis, and within 5 working days with a full 8D corrective action report." },
];

export default function QualityControlPage() {
  return (

    <>
      <Header />
      <main id="main-content" className="legacy-brand-page min-h-screen bg-white">
      <section className="brand-hero bg-[#101b19] text-white pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="text-blue-300 text-sm mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/factory" className="hover:text-white">Factory</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Quality Control</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-blue-500/30 text-blue-200 text-sm font-medium px-3 py-1 rounded-full mb-4">ISO 9001:2015 Certified</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Quality Management System</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Our ISO 9001:2015 certified quality management system covers every stage from raw material receipt to finished goods dispatch — ensuring consistent quality in every roll and every label.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-12">Our Quality Control Process</h2>
          <div className="space-y-6">
            {qcSteps.map((step) => (
              <div key={step.step} className="flex gap-6 items-start bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-14 h-14 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg">
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
          <h2 className="text-2xl font-bold text-slate-800 mb-8">Certifications & Standards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { cert: "ISO 9001:2015", scope: "Quality Management System — full manufacturing scope" },
              { cert: "BPA-Free", scope: "All standard products — EU REACH regulation compliant" },
              { cert: "REACH/RoHS", scope: "SVHC substances below threshold — EU market compliant" },
              { cert: "FSC Chain of Custody", scope: "Responsibly sourced base paper — FSC-C certified" },
              { cert: "EU Food Contact", scope: "Food-safe thermal paper and labels — EU Regulation 10/2011" },
              { cert: "FDA 21 CFR", scope: "US food contact compliant thermal paper and labels" },
            ].map((c) => (
              <div key={c.cert} className="bg-white rounded-xl p-5 border border-slate-200">
                <div className="text-blue-600 font-bold text-lg mb-1">{c.cert}</div>
                <div className="text-slate-500 text-sm">{c.scope}</div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/compliance/certificates" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
              Download All Certificates →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Request Quality Documentation</h2>
          <p className="text-blue-100 mb-8">We provide full quality documentation including test reports, certificates, and MSDS sheets for all products.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/compliance/certificates" className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">Download Certificates</Link>
            <Link href="/contact" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">Contact Quality Team</Link>
          </div>
        </div>
      </section>
    </main>
      <CTABanner />
    <Footer />
    </>
  );
}
