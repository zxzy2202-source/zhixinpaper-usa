import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";



export const metadata: Metadata = {
  title: "REACH & RoHS Compliance | SVHC Free Thermal Paper",
  description: "REACH SVHC compliant thermal paper and labels. RoHS compliant thermal labels for electronics. Full SVHC screening and compliance documentation available.",
  keywords: "REACH thermal paper, RoHS labels EU, SVHC free thermal paper",
};

export default function ReachRohsPage() {
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
            <span className="text-white">REACH & RoHS</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-blue-500/30 text-blue-200 text-sm font-medium px-3 py-1 rounded-full mb-4">EU Chemical Compliance</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">REACH & RoHS Compliance</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Our thermal paper and label products meet the requirements of EU REACH Regulation (EC) No 1907/2006 and RoHS Directive 2011/65/EU, ensuring safe use in European markets.
            </p>
          </div>
        </div>
      </section>

      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">REACH Compliance</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                REACH (Registration, Evaluation, Authorisation and Restriction of Chemicals) is the EU's comprehensive chemicals regulation. For thermal paper, the key requirements relate to the SVHC (Substances of Very High Concern) candidate list and specific restrictions on substances like BPA.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                We screen all raw materials and finished products against the current SVHC candidate list. Our products contain no SVHC substances above the 0.1% (w/w) threshold, and we maintain full documentation to support our customers' own REACH compliance obligations.
              </p>
              <div className="space-y-3">
                {[
                  "SVHC substances below 0.1% threshold in all products",
                  "BPA restriction (REACH Annex XVII) — fully compliant",
                  "Annual SVHC screening against updated candidate list",
                  "Full supply chain traceability for raw materials",
                  "REACH compliance statements available on request",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <span className="text-slate-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">RoHS Compliance</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                RoHS (Restriction of Hazardous Substances) Directive 2011/65/EU restricts the use of certain hazardous substances in electrical and electronic equipment. Our thermal labels used in electronics manufacturing and industrial applications are fully RoHS compliant.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                This is particularly relevant for our high-temperature labels, chemical-resistant labels, and wristband labels used in electronics manufacturing, automotive, and medical device applications.
              </p>
              <div className="space-y-3">
                {[
                  "Lead (Pb) — below threshold",
                  "Mercury (Hg) — not present",
                  "Cadmium (Cd) — not present",
                  "Hexavalent Chromium (Cr VI) — not present",
                  "Polybrominated Biphenyls (PBB) — not present",
                  "Polybrominated Diphenyl Ethers (PBDE) — not present",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <span className="text-slate-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Download REACH & RoHS Documentation</h2>
          <p className="text-blue-100 mb-8">Full compliance documentation available for all products. Contact our compliance team for product-specific declarations.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/compliance/certificates" className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">Download Certificates</Link>
            <Link href="/contact" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">Contact Compliance Team</Link>
          </div>
        </div>
      </section>
    </main>
      <CTABanner title="Need REACH & RoHS Documentation?" subtitle="Request our SVHC declarations and RoHS test reports for EU market compliance." primaryLabel="Get Documents" secondaryLabel="Request a Quote" />
    <Footer />
    </>
  );
}
