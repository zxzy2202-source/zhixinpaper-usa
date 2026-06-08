import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { canonicalUrl } from "@/lib/seo";



export const metadata: Metadata = {
  title: "FSC Certified Thermal Paper | Sustainable Receipt Paper",
  description: "FSC chain of custody certified thermal paper rolls. Responsibly sourced base paper from sustainably managed forests. Available for EU and North American markets.",
  keywords: "FSC thermal paper, sustainable receipt paper, FSC certified label manufacturer",
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
            <span className="inline-block bg-green-500/30 text-green-200 text-sm font-medium px-3 py-1 rounded-full mb-4">Sustainability</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">FSC Certified Thermal Paper</h1>
            <p className="text-xl text-green-100 leading-relaxed">
              Our FSC chain of custody certification ensures that the base paper used in our thermal products comes from responsibly managed forests that provide environmental, social, and economic benefits.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">About FSC Certification</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The Forest Stewardship Council (FSC) is an international non-profit organisation that promotes responsible management of the world's forests. FSC certification provides a credible link between responsible production and consumption of forest products.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Our FSC Chain of Custody (CoC) certification covers the full supply chain from forest to finished product, ensuring that FSC-certified raw materials are tracked and segregated throughout our manufacturing process.
              </p>
              <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <h3 className="font-semibold text-slate-800 mb-3">FSC Certificate Details</h3>
                <div className="space-y-2 text-sm">
                  {[
                    ["Certification Type", "FSC Chain of Custody (CoC)"],
                    ["Certificate Code", "FSC-C123456"],
                    ["Certification Body", "SGS"],
                    ["Scope", "Thermal paper rolls and labels"],
                    ["Valid Through", "2026"],
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
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Why Choose FSC Thermal Paper?</h2>
              <div className="space-y-4">
                {[
                  { title: "Environmental Responsibility", desc: "Demonstrate your commitment to sustainable sourcing to your customers and stakeholders." },
                  { title: "Regulatory Readiness", desc: "Meet increasing EU sustainability requirements including the Corporate Sustainability Reporting Directive (CSRD)." },
                  { title: "Brand Differentiation", desc: "Use the FSC logo on your packaging and marketing materials to communicate your sustainability credentials." },
                  { title: "Customer Demand", desc: "Respond to growing consumer and B2B customer demand for sustainably sourced products." },
                  { title: "No Performance Compromise", desc: "FSC-certified thermal paper delivers identical print quality and performance to standard grades." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start bg-white border border-slate-200 rounded-xl p-4">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
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
          <h2 className="text-3xl font-bold mb-4">Request FSC-Certified Products</h2>
          <p className="text-green-100 mb-8">FSC-certified grades are available for most standard products. Contact us to discuss availability and pricing for your requirements.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/quote" className="bg-white text-green-700 font-semibold px-8 py-3 rounded-lg hover:bg-green-50 transition-colors">Get FSC Quote</Link>
            <Link href="/compliance/certificates" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">Download FSC Certificate</Link>
          </div>
        </div>
      </section>
    </main>
      <CTABanner title="Need FSC Certified Paper?" subtitle="Request FSC Chain of Custody certified products with logo printing for your brand." primaryLabel="Request FSC Products" secondaryLabel="Request Free Samples" />
    <Footer />
    </>
  );
}
