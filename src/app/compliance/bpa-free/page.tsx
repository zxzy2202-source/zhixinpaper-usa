import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { canonicalUrl } from "@/lib/seo";



export const metadata: Metadata = {
  title: "BPA-Free Thermal Paper | Bisphenol-Free Receipt Rolls EU",
  description: "100% BPA-free and BPS-free thermal paper rolls and labels. Compliant with EU REACH regulation and French Grenelle II law. Safe for food contact and retail use.",
  keywords: "BPA free thermal paper, bisphenol free receipt rolls, BPA free thermal paper Europe",
  alternates: { canonical: canonicalUrl("/compliance/bpa-free") },
};

export default function BPAFreePage() {
  return (

    <>
      <Header />
      <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-green-800 to-blue-800 text-white pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="text-green-200 text-sm mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/compliance" className="hover:text-white">Compliance</Link>
            <span className="mx-2">/</span>
            <span className="text-white">BPA-Free</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-green-500/30 text-green-200 text-sm font-medium px-3 py-1 rounded-full mb-4">Health & Safety</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">BPA-Free & Bisphenol-Free Thermal Paper</h1>
            <p className="text-xl text-green-100 leading-relaxed">
              All Zhixin Paper thermal paper products are manufactured without Bisphenol A (BPA) or Bisphenol S (BPS), meeting the strictest European and North American health and safety standards.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">What is BPA and Why Does It Matter?</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Bisphenol A (BPA) is a chemical developer traditionally used in thermal paper coatings to produce the color-forming reaction when heat is applied. Research has linked BPA to endocrine disruption and potential health risks, particularly through dermal absorption from handling receipts.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The European Union restricted BPA in thermal paper under REACH Regulation (EU) 2016/2235, effective January 2020. France went further with the Grenelle II law, banning BPA in all food contact materials.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Our BPA-free thermal paper uses alternative developer systems that meet or exceed the performance of BPA-based coatings while eliminating the associated health concerns.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Our BPA-Free Commitment</h2>
              {[
                { title: "Zero BPA", desc: "No Bisphenol A in any thermal coating formulation across our entire product range." },
                { title: "Zero BPS", desc: "We also exclude Bisphenol S (BPS), a common BPA substitute with similar health concerns." },
                { title: "Third-Party Tested", desc: "All products are independently tested by accredited laboratories to verify bisphenol-free status." },
                { title: "REACH Compliant", desc: "Full compliance with EU REACH Regulation (EU) 2016/2235 and all subsequent amendments." },
                { title: "Full Documentation", desc: "BPA-free declarations available for all products, suitable for use in your own compliance submissions." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start bg-green-50 rounded-xl p-4 border border-green-100">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm">{item.title}</h3>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-8">Regulatory Compliance Summary</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600 uppercase text-xs tracking-wider">
                <tr>
                  <th className="text-left px-6 py-4">Regulation</th>
                  <th className="text-left px-6 py-4">Jurisdiction</th>
                  <th className="text-left px-6 py-4">Requirement</th>
                  <th className="text-left px-6 py-4">Our Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ["REACH Regulation (EU) 2016/2235", "European Union", "BPA ≤ 0.02% in thermal paper", "Compliant — BPA not used"],
                  ["French Grenelle II Law", "France", "BPA banned in food contact materials", "Compliant — BPA-free"],
                  ["REACH SVHC List", "European Union", "BPS below 0.1% threshold", "Compliant — BPS not used"],
                  ["California Proposition 65", "California, USA", "BPA warning label requirement", "Compliant — no warning required"],
                ].map(([reg, jur, req, status]) => (
                  <tr key={reg} className="hover:bg-green-50/30">
                    <td className="px-6 py-4 font-medium text-slate-800">{reg}</td>
                    <td className="px-6 py-4 text-slate-500">{jur}</td>
                    <td className="px-6 py-4 text-slate-500">{req}</td>
                    <td className="px-6 py-4"><span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">{status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-green-700 to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Download Our BPA-Free Declaration</h2>
          <p className="text-green-100 mb-8">Our BPA-free declaration is available for all products and can be used in your own compliance submissions to customers and regulators.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/compliance/certificates" className="bg-white text-green-700 font-semibold px-8 py-3 rounded-lg hover:bg-green-50 transition-colors">Download Certificate</Link>
            <Link href="/contact" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">Contact Compliance Team</Link>
          </div>
        </div>
      </section>
    </main>
      <CTABanner title="Need BPA-Free Documentation?" subtitle="Request our BPA-free declarations and third-party test reports for your market." primaryLabel="Get Documents" secondaryLabel="Request a Quote" />
    <Footer />
    </>
  );
}
