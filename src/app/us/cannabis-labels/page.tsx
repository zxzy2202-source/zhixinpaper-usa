import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { canonicalUrl } from "@/lib/seo";



export const metadata: Metadata = {
  title: "Cannabis Labels USA | Dispensary Thermal Labels | State Compliant",
  description: "FDA-compliant and state-compliant cannabis labels for US dispensaries. Direct thermal and thermal transfer labels meeting California, Colorado, Michigan, New York cannabis regulations.",
  keywords: "cannabis label supplier USA, dispensary thermal labels, cannabis compliance labels, state cannabis label requirements",
  alternates: { canonical: canonicalUrl("/us/cannabis-labels") },
};

const states = [
  { name: "California", code: "CA", agency: "DCC", system: "Metrc", notes: "Universal symbol, English required, QR to COA" },
  { name: "Colorado", code: "CO", agency: "MED", system: "Metrc", notes: "Per-serving THC, 'NOT FOR RESALE' on individual servings" },
  { name: "Michigan", code: "MI", agency: "MRA", system: "Metrc", notes: "Child-resistant, resealable packaging required" },
  { name: "New York", code: "NY", agency: "OCM", system: "Metrc", notes: "English + Spanish required, QR to COA" },
  { name: "Illinois", code: "IL", agency: "IDFPR", system: "BioTrackTHC", notes: "Universal symbol, batch number, expiry date" },
  { name: "Washington", code: "WA", agency: "LCB", system: "Leaf Data", notes: "Traceability ID, serving size, THC/CBD per serving" },
  { name: "Oregon", code: "OR", agency: "OLCC", system: "Metrc", notes: "Net weight, cannabinoid content, harvest date" },
  { name: "Nevada", code: "NV", agency: "CCB", system: "Metrc", notes: "Distributor info, lab results, activation time for edibles" },
];

export default function USCannabisLabelsPage() {
  return (

    <>
      <Header />
      <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 to-green-700 text-white pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="text-green-300 text-sm mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/us" className="hover:text-white">United States</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Cannabis Labels</span>
          </nav>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🇺🇸</span>
              <span className="bg-green-500/30 text-green-200 text-sm font-medium px-3 py-1 rounded-full">US Cannabis Market</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Cannabis Labels for US Dispensaries</h1>
            <p className="text-xl text-green-100 leading-relaxed mb-8">
              State-compliant thermal labels for every US cannabis market. From California to New York, our labels meet the specific requirements of each state's regulatory framework — with track-and-trace barcodes, universal symbols, and compliant adhesives.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/quote" className="bg-white text-green-700 font-bold px-8 py-3  hover:bg-green-50 transition-colors">Get a Quote</Link>
              <Link href="/samples" className="border-2 border-white text-white font-semibold px-8 py-3  hover:bg-white/10 transition-colors">Request Samples</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Requirements */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-3 text-center">Common US Cannabis Label Requirements</h2>
          <p className="text-slate-500 text-center mb-10">While each state has specific rules, these elements are required in most jurisdictions.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "⚠️", title: "Universal Cannabis Symbol", desc: "Required in most states. Minimum size and color specifications apply — verify per state." },
              { icon: "🧪", title: "THC/CBD Content", desc: "Total THC and CBD per serving and per package. Some states require both total and activated THC." },
              { icon: "📱", title: "Track-and-Trace QR Code", desc: "Unique identifier linking to Metrc, BioTrackTHC, or state system. Must be scannable by inspectors." },
              { icon: "⚕️", title: "Health Warning Statements", desc: "State-specific warning text. Keep away from children, no driving, pregnancy risk." },
              { icon: "📦", title: "Batch & Lot Number", desc: "Links product to cultivation/manufacturing records for recall and compliance purposes." },
              { icon: "📅", title: "Expiration / Best By Date", desc: "Required for edibles and most processed products. Format varies by state." },
            ].map((item) => (
              <div key={item.title} className="bg-white  p-5 border border-slate-200 shadow-sm">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* State-by-State */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-3 text-center">State-by-State Overview</h2>
          <p className="text-slate-500 text-center mb-10">Key regulatory agencies and track-and-trace systems by state.</p>
          <div className="overflow-x-auto  border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">State</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Agency</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Track & Trace</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Key Notes</th>
                </tr>
              </thead>
              <tbody>
                {states.map((state, i) => (
                  <tr key={state.code} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="px-4 py-3 font-semibold text-slate-800">{state.name} ({state.code})</td>
                    <td className="px-4 py-3 text-slate-600">{state.agency}</td>
                    <td className="px-4 py-3 text-slate-600">{state.system}</td>
                    <td className="px-4 py-3 text-slate-500">{state.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-3 text-center">* Requirements change frequently. Always verify current regulations with your state agency before printing.</p>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 bg-green-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Recommended Label Products</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Direct Thermal Labels", use: "Point-of-sale, dispensary counter labels", href: "/products/thermal-labels/direct-thermal-labels" },
              { name: "Synthetic PP Labels", use: "Moisture-resistant product labels, outdoor applications", href: "/products/thermal-labels/synthetic-paper-labels" },
              { name: "Tamper-Evident Labels", use: "Child-resistant packaging seals, security labels", href: "/products/thermal-labels/tamper-evident-labels" },
            ].map((p) => (
              <Link key={p.name} href={p.href} className="bg-white  p-5 border border-green-200 hover:border-green-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-green-700">{p.name}</h3>
                <p className="text-slate-500 text-sm mb-3">{p.use}</p>
                <span className="text-green-600 text-xs font-semibold">View Product →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-green-700 to-green-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Need State-Specific Cannabis Labels?</h2>
          <p className="text-green-100 mb-8">Our compliance team can review your state's requirements and recommend the right label specification. Free consultation available.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-white text-green-700 font-bold px-10 py-4  hover:bg-green-50 transition-colors">Talk to Compliance Team</Link>
            <Link href="/blog/cannabis-label-requirements-usa" className="border-2 border-white text-white font-semibold px-10 py-4  hover:bg-white/10 transition-colors">Read US State Guide</Link>
          </div>
        </div>
      </section>
    </main>
      <CTABanner />
    <Footer />
    </>
  );
}
