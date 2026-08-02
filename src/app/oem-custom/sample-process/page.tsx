import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import HeroBanner from "@/components/ui/HeroBanner";
import { canonicalUrl } from "@/lib/seo";



export const metadata: Metadata = {
  title: "Thermal Paper and Label Sample Process",
  description: "Plan thermal paper and label sample evaluation. Availability, preparation time, charges, documents, courier terms, and delivery estimates are confirmed after project review.",
  keywords: "thermal paper sample process, label sample request, thermal paper samples distributor",
  alternates: { canonical: canonicalUrl("/oem-custom/sample-process") },
};

const steps = [
  { step: "01", title: "Submit Sample Request", desc: "Complete our online sample request form or contact your account manager. Specify the products, sizes, and quantities you need to evaluate." },
  { step: "02", title: "Sample Preparation", desc: "Stock availability, custom preparation route, sample charges, and timing are confirmed after the requested construction and evaluation plan are reviewed." },
  { step: "03", title: "Dispatch & Tracking", desc: "The courier method, freight responsibility, tracking, and delivery estimate are confirmed for the destination before dispatch." },
  { step: "04", title: "Technical Support", desc: "Our technical team is available to answer questions about sample performance, printer compatibility, and specification matching." },
  { step: "05", title: "Feedback & Quotation", desc: "Once you've evaluated the samples, our sales team will provide a competitive quotation based on your volume requirements." },
];

export default function SampleProcessPage() {
  return (

    <>
      <Header />
      <main id="main-content" className="legacy-brand-page min-h-screen bg-white">
      <HeroBanner
        variant="media"
        eyebrow="Sample evaluation"
        title="How Our Sample Process Works"
        description="Plan sample selection around the printer, application, dimensions, material, adhesive, print, and document needs. Availability, preparation time, freight, and any sample charges are confirmed after request review."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "OEM & Custom", href: "/oem-custom" },
          { label: "Sample Process" },
        ]}
        actions={[{ label: "Submit Sample Requirements", href: "/samples", kind: "primary" }]}
      />

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-12">Sample Process Steps</h2>
          <div className="space-y-6">
            {steps.map((s) => (
              <div key={s.step} className="flex gap-6 items-start bg-white border border-slate-200  p-6 shadow-sm">
                <div className="flex-shrink-0 w-14 h-14 bg-blue-600 text-white  flex items-center justify-center font-bold text-lg">{s.step}</div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{s.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-8">Sample Availability</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white  p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-3">Standard Samples</h3>
              <p className="text-slate-500 text-sm mb-4">Stock availability, sample quantity, charges, documents, and dispatch timing are confirmed after request review.</p>
              <ul className="space-y-2 text-sm text-slate-600">
                {["Standard POS Rolls (57mm, 80mm)", "ATM Paper Rolls", "Direct Thermal Labels (100×150mm)", "Fanfold Labels", "Synthetic PP Labels"].map(p => (
                  <li key={p} className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />{p}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white  p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-3">Custom Samples</h3>
              <p className="text-slate-500 text-sm mb-4">Preparation route and timing are confirmed after specifications, artwork, materials, tooling, and evaluation criteria are reviewed.</p>
              <ul className="space-y-2 text-sm text-slate-600">
                {["Custom sizes and specifications", "Specialty adhesive formulations", "High-temperature and cryo labels", "Custom printed samples", "Private label mock-ups"].map(p => (
                  <li key={p} className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

    </main>
      <CTABanner
        title="Ready to plan sample evaluation?"
        subtitle="Share the device, application, dimensions, material, adhesive, print, quantity, destination, and evaluation criteria for sample review."
        showTrust={false}
      />
    <Footer />
    </>
  );
}
