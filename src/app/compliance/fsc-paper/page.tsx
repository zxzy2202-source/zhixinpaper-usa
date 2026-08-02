import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { canonicalUrl } from "@/lib/seo";



export const metadata: Metadata = {
  title: "FSC Paper Sourcing Review",
  description: "Review FSC paper sourcing options for thermal rolls and labels. Confirm the quoted grade, certificate holder, chain-of-custody scope, product claim, trademark approval, and destination before use.",
  keywords: "FSC thermal paper sourcing, responsible paper sourcing, FSC claim review",
  alternates: { canonical: canonicalUrl("/compliance/fsc-paper") },
};

export default function FSCPaperPage() {
  return (

    <>
      <Header />
      <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-green-900 to-green-700 text-white pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="text-green-300 text-sm mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/compliance" className="hover:text-white">Compliance</Link>
            <span className="mx-2">/</span>
            <span className="text-white">FSC Paper</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-green-500/30 text-green-200 text-sm font-medium px-3 py-1 rounded-full mb-4">Sourcing review</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">FSC Paper Sourcing for Thermal Products</h1>
            <p className="text-xl text-green-100 leading-relaxed">
              FSC-related paper options may be reviewed for selected thermal products and supply routes. Any claim depends on the quoted grade, current certificate chain, transaction documents, destination, and approved trademark use.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">About FSC Sourcing Review</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The Forest Stewardship Council (FSC) operates a certification and chain-of-custody system for forest-based materials. Buyers should verify the current certificate holder, issuer, validity, scope, product claim, and transaction evidence for the selected grade and supplying entities.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                A certificate held by one entity does not automatically cover every mill, converter, trader, product, or shipment. The documented chain and permitted claim must be confirmed before an order or printed artwork is approved.
              </p>
              <div className="bg-green-50  p-6 border border-green-100">
                <h3 className="font-semibold text-slate-800 mb-3">Documents to Verify</h3>
                <div className="space-y-2 text-sm">
                  {[
                    ["Certificate Holder", "Confirm the legal entity on the current certificate"],
                    ["Issuer and Validity", "Confirm with the issuing body or FSC database"],
                    ["Certified Scope", "Match the supplier, activity, and product group"],
                    ["Product Claim", "Confirm the claim stated on the quotation and invoice"],
                    ["Trademark Use", "Require approval before printing an FSC mark or claim"],
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
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Project Review Points</h2>
              <div className="space-y-4">
                {[
                  { title: "Material Route", desc: "Confirm that the selected base paper and converting route support the requested claim." },
                  { title: "Chain of Custody", desc: "Review each relevant legal entity and transaction document in the supply chain." },
                  { title: "Claim and Artwork", desc: "Confirm the permitted claim and obtain trademark approval before printing packaging or marketing material." },
                  { title: "Destination Needs", desc: "Align sourcing evidence with the buyer's market, reporting process, and customer requirements." },
                  { title: "Performance Validation", desc: "Test print quality, sensitivity, handling, and storage for the selected grade instead of assuming equivalence." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start bg-white border border-slate-200  p-4">
                    <div className="w-8 h-8 bg-green-100  flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 text-sm mb-1">{item.title}</h3>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-green-700 to-green-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Review an FSC Paper Requirement</h2>
          <p className="text-green-100 mb-8">Share the product construction, quantity, destination, requested claim, and artwork needs so the available paper route and current documents can be reviewed.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/quote" className="bg-white text-green-700 font-semibold px-8 py-3  hover:bg-green-50 transition-colors">Request Sourcing Review</Link>
            <Link href="/compliance/certificates" className="border-2 border-white text-white font-semibold px-8 py-3  hover:bg-white/10 transition-colors">Request Current Documents</Link>
          </div>
        </div>
      </section>
    </main>
      <CTABanner title="Need an FSC Paper Option?" subtitle="Request a review of the paper grade, certificate chain, product claim, trademark route, destination, and sample plan." primaryLabel="Request FSC Review" secondaryLabel="Request Samples" />
    <Footer />
    </>
  );
}
