import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { canonicalUrl } from "@/lib/seo";
import { SlotImage } from "@/components/ui/SlotImage";

const PAGE_URL = canonicalUrl("/us/cannabis-labels");

export const metadata: Metadata = {
  title: "Cannabis Labels for US Dispensaries",
  description: "Thermal label materials for US cannabis brands and dispensaries. Confirm state-specific copy, facestock, adhesive, print method, testing, and approval scope.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
};

const states = [
  { name: "California", code: "CA", authority: "Confirm the current state and local authority", workflow: "Confirm the buyer's current track-and-trace workflow", review: "Approved symbols, warnings, test references, identifiers, and packaging copy" },
  { name: "Colorado", code: "CO", authority: "Confirm the current state and local authority", workflow: "Confirm the buyer's current track-and-trace workflow", review: "Serving declarations, warnings, identifiers, and package configuration" },
  { name: "Michigan", code: "MI", authority: "Confirm the current state and local authority", workflow: "Confirm the buyer's current track-and-trace workflow", review: "Packaging construction, warnings, identifiers, and approved artwork" },
  { name: "New York", code: "NY", authority: "Confirm the current state and local authority", workflow: "Confirm the buyer's current track-and-trace workflow", review: "Language, symbols, test references, identifiers, and approved artwork" },
  { name: "Illinois", code: "IL", authority: "Confirm the current state and local authority", workflow: "Confirm the buyer's current track-and-trace workflow", review: "Symbols, batch information, date fields, warnings, and package copy" },
  { name: "Washington", code: "WA", authority: "Confirm the current state and local authority", workflow: "Confirm the buyer's current track-and-trace workflow", review: "Traceability fields, serving declarations, warnings, and identifiers" },
  { name: "Oregon", code: "OR", authority: "Confirm the current state and local authority", workflow: "Confirm the buyer's current track-and-trace workflow", review: "Quantity, cannabinoid, production, warning, and traceability fields" },
  { name: "Nevada", code: "NV", authority: "Confirm the current state and local authority", workflow: "Confirm the buyer's current track-and-trace workflow", review: "Licensee details, test references, instructions, warnings, and identifiers" },
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">US Cannabis Warning and Dispensary Labels</h1>
            <p className="text-xl text-green-100 leading-relaxed mb-8">
              Thermal cannabis labels for US dispensaries, processors, and brand owners, reviewed against the buyer&apos;s current state rules, approved warning copy, packaging surface, print process, and track-and-trace workflow. Final regulatory approval remains the buyer&apos;s responsibility.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/quote" className="bg-white text-green-700 font-bold px-8 py-3  hover:bg-green-50 transition-colors">Get a Quote</Link>
              <Link href="/samples" className="border-2 border-white text-white font-semibold px-8 py-3  hover:bg-white/10 transition-colors">Request Samples</Link>
              <Link href="/us" className="border-2 border-green-200 text-white font-semibold px-8 py-3 hover:bg-white/10 transition-colors">Back to USA Supplier Page</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Requirements */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-3 text-center">US Cannabis Warning Label Review Areas</h2>
          <p className="text-slate-500 text-center mb-10">The applicable elements depend on the current state and local rules, product class, licence, packaging format, and buyer-approved artwork.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "⚠️", title: "Required Symbols", desc: "Confirm current symbol artwork, size, color, placement, and exemptions with the licence holder before printing." },
              { icon: "🧪", title: "Cannabinoid & Test Data", desc: "Use only buyer-approved values and test references tied to the applicable product, batch, and jurisdiction." },
              { icon: "📱", title: "Traceability Identifier", desc: "Confirm the identifier format, data source, barcode or QR specification, and verification workflow used by the buyer." },
              { icon: "⚕️", title: "Warning Statements", desc: "Use the current authority- and licence-holder-approved warning copy, language, formatting, and placement." },
              { icon: "📦", title: "Batch & Product Fields", desc: "Confirm which production, licence, batch, lot, quantity, ingredient, and contact fields belong on the final artwork." },
              { icon: "📅", title: "Date & Use Information", desc: "Confirm whether date, storage, serving, or use instructions apply and use the buyer-approved format." },
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
          <h2 className="text-2xl font-bold text-slate-800 mb-3 text-center">State-Specific Review Starting Points</h2>
          <p className="text-slate-500 text-center mb-10">These rows identify information to confirm for each project; they are not a substitute for current authority guidance or licence-holder approval.</p>
          <div className="overflow-x-auto  border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">State</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Authority Review</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Buyer Workflow</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Artwork Review</th>
                </tr>
              </thead>
              <tbody>
                {states.map((state, i) => (
                  <tr key={state.code} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="px-4 py-3 font-semibold text-slate-800">{state.name} ({state.code})</td>
                    <td className="px-4 py-3 text-slate-600">{state.authority}</td>
                    <td className="px-4 py-3 text-slate-600">{state.workflow}</td>
                    <td className="px-4 py-3 text-slate-500">{state.review}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-3 text-center">* Requirements and responsible authorities can change. Obtain current written approval from the licence holder and qualified advisers before printing.</p>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 bg-green-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Recommended Label Products</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Direct Thermal Labels", use: "Point-of-sale and dispensary counter workflows", href: "/products/thermal-labels/direct-thermal-labels", slotKey: "products.card.direct-thermal-labels" },
              { name: "Synthetic PP Labels", use: "Packaging exposed to moisture or frequent handling", href: "/products/thermal-labels/synthetic-paper-labels", slotKey: "products.card.synthetic-paper-labels" },
              { name: "Tamper-Evident Labels", use: "Packaging seals and security-label workflows", href: "/products/thermal-labels/tamper-evident-labels", slotKey: "products.card.tamper-evident-labels" },
            ].map((p) => (
              <Link key={p.name} href={p.href} className="group flex flex-col overflow-hidden border border-green-200 bg-white transition-all hover:border-green-400 hover:shadow-md">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <SlotImage slotKey={p.slotKey} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-bold text-slate-800 transition group-hover:text-green-700">{p.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">{p.use}</p>
                  <span className="mt-4 text-xs font-semibold text-green-600">View Product →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-green-700 to-green-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Need State-Specific Cannabis Labels?</h2>
          <p className="text-green-100 mb-8">Share the target state, current approved artwork, packaging, printer, and retention needs. Our team can review material and print options; the buyer is responsible for final regulatory approval.</p>
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
