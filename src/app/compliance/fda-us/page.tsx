import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";



export const metadata: Metadata = {
  title: "FDA Compliant Thermal Paper | US Food Contact Labels",
  description: "FDA 21 CFR compliant thermal paper and labels for US food contact applications. BPA-free, food-safe thermal paper for US distributors and food manufacturers.",
  keywords: "FDA compliant thermal paper, US food contact labels, FDA 21 CFR thermal paper",
};

export default function FDAUSPage() {
  return (

    <>
      <Header />
      <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-900 to-slate-800 text-white pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="text-blue-300 text-sm mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/compliance" className="hover:text-white">Compliance</Link>
            <span className="mx-2">/</span>
            <span className="text-white">FDA US</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-red-500/30 text-red-200 text-sm font-medium px-3 py-1 rounded-full mb-4">US Market Compliance</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">FDA Compliant Thermal Paper for the US Market</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Our FDA-compliant thermal paper and label products meet the requirements of FDA 21 CFR (Code of Federal Regulations) for food contact materials, enabling safe use in US food service, retail, and packaging applications.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">FDA 21 CFR Compliance</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The US Food and Drug Administration (FDA) regulates food contact materials under 21 CFR (Code of Federal Regulations). For thermal paper and labels, the relevant sections cover paper and paperboard components (21 CFR 176) and adhesive components (21 CFR 175).
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Our FDA-compliant grades use only substances listed in the relevant 21 CFR sections, ensuring that migration to food does not exceed safe limits under intended conditions of use.
              </p>
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 mt-6">
                <h3 className="font-semibold text-slate-800 mb-3">Applicable Regulations</h3>
                <div className="space-y-2 text-sm text-slate-600">
                  {[
                    "FDA 21 CFR 176.170 — Components of paper and paperboard",
                    "FDA 21 CFR 176.180 — Components of paper and paperboard (aqueous contact)",
                    "FDA 21 CFR 175.105 — Adhesives",
                    "FDA 21 CFR 175.125 — Pressure-sensitive adhesives",
                    "California Proposition 65 — No required warnings",
                  ].map((reg, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                      <span>{reg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">US Market Applications</h2>
              <div className="space-y-4">
                {[
                  { app: "Grocery & Supermarket", desc: "Deli counter labels, fresh produce stickers, and POS receipt paper for US grocery chains." },
                  { app: "Food Service & Restaurants", desc: "Receipt paper and order labels for US restaurants, cafes, and quick-service operations." },
                  { app: "Food Manufacturing", desc: "Production labels, batch labels, and traceability labels for US food manufacturers." },
                  { app: "Cold Chain & Distribution", desc: "Shipping labels and temperature-indicator labels for US cold chain logistics." },
                  { app: "Cannabis Dispensary Labels", desc: "Compliant labels for cannabis products in US states with food contact requirements." },
                ].map((item, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                    <h3 className="font-semibold text-slate-800 text-sm mb-1">{item.app}</h3>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-red-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">FDA Compliance Documentation</h2>
          <p className="text-blue-100 mb-8">Our FDA compliance letters and test reports are available for all food-contact grade products. Contact our compliance team for documentation.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/compliance/certificates" className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">Download Certificates</Link>
            <Link href="/us" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">US Market Overview</Link>
          </div>
        </div>
      </section>
    </main>
      <CTABanner title="Need FDA Compliance Documentation?" subtitle="Request our FDA 21 CFR compliance declarations and test reports for the US market." primaryLabel="Get Documents" secondaryLabel="Request a Quote" />
    <Footer />
    </>
  );
}
