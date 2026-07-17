import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { canonicalUrl } from "@/lib/seo";



export const metadata: Metadata = {
  title: "Sample Process | Free Thermal Paper Samples",
  description: "Request free thermal paper and label samples. Standard samples dispatched within 3 working days. Custom samples in 7–10 days. No obligation, no cost.",
  keywords: "thermal paper free sample, label sample request, thermal paper samples distributor",
  alternates: { canonical: canonicalUrl("/oem-custom/sample-process") },
};

const steps = [
  { step: "01", title: "Submit Sample Request", desc: "Complete our online sample request form or contact your account manager. Specify the products, sizes, and quantities you need to evaluate." },
  { step: "02", title: "Sample Preparation", desc: "Our warehouse team picks standard samples from stock. Custom samples are prepared by our production team within 7–10 working days." },
  { step: "03", title: "Dispatch & Tracking", desc: "Samples are dispatched via DHL Express or FedEx with full tracking. Standard samples typically arrive within 3–5 business days worldwide." },
  { step: "04", title: "Technical Support", desc: "Our technical team is available to answer questions about sample performance, printer compatibility, and specification matching." },
  { step: "05", title: "Feedback & Quotation", desc: "Once you've evaluated the samples, our sales team will provide a competitive quotation based on your volume requirements." },
];

export default function SampleProcessPage() {
  return (

    <>
      <Header />
      <main id="main-content" className="legacy-brand-page min-h-screen bg-white">
      <section className="brand-hero bg-[#101b19] text-white pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="text-blue-300 text-sm mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/oem-custom" className="hover:text-white">OEM & Custom</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Sample Process</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-blue-500/30 text-blue-200 text-sm font-medium px-3 py-1 rounded-full mb-4">Free Samples</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How Our Sample Process Works</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              We offer free samples of all standard products to qualified distributors and importers. Evaluate our quality before committing to a production order — no obligation, no cost.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/samples" className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">Request Free Samples</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-12">Sample Process Steps</h2>
          <div className="space-y-6">
            {steps.map((s) => (
              <div key={s.step} className="flex gap-6 items-start bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex-shrink-0 w-14 h-14 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg">{s.step}</div>
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
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-3">Standard Samples</h3>
              <p className="text-slate-500 text-sm mb-4">Available from stock for all standard products. Dispatched within 1–3 working days.</p>
              <ul className="space-y-2 text-sm text-slate-600">
                {["Standard POS Rolls (57mm, 80mm)", "ATM Paper Rolls", "Direct Thermal Labels (100×150mm)", "Fanfold Labels", "Synthetic PP Labels"].map(p => (
                  <li key={p} className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />{p}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-3">Custom Samples</h3>
              <p className="text-slate-500 text-sm mb-4">Produced to your exact specification. Allow 7–10 working days for preparation.</p>
              <ul className="space-y-2 text-sm text-slate-600">
                {["Custom sizes and specifications", "Specialty adhesive formulations", "High-temperature and cryo labels", "Custom printed samples", "Private label mock-ups"].map(p => (
                  <li key={p} className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Request Your Free Samples Today</h2>
          <p className="text-blue-100 mb-8">Samples are free for qualified distributors and importers. Complete our sample request form and we'll dispatch within 3 working days.</p>
          <Link href="/samples" className="bg-white text-blue-700 font-semibold px-10 py-4 rounded-lg hover:bg-blue-50 transition-colors inline-block">Request Free Samples</Link>
        </div>
      </section>
    </main>
      <CTABanner />
    <Footer />
    </>
  );
}
