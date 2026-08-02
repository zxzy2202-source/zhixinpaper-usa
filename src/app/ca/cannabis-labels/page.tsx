import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { buildMetadata } from "@/lib/seo";
import { SlotImage } from "@/components/ui/SlotImage";



export const metadata: Metadata = buildMetadata({
  title: "Cannabis Labels for Canada",
  description: "Label materials for Canadian cannabis producers and retailers. Confirm bilingual copy, facestock, adhesive, print method, testing, and regulatory review.",
  path: "/ca/cannabis-labels",
  locale: "en_CA",
  keywords: [
    "cannabis labels Canada",
    "Health Canada cannabis labeling",
    "bilingual cannabis labels",
    "Canadian dispensary labels",
  ],
});

export default function CACannabisLabelsPage() {
  return (

    <>
      <Header />
      <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-red-900 to-red-700 text-white pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="text-red-300 text-sm mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/ca" className="hover:text-white">Canada</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Cannabis Labels</span>
          </nav>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🇨🇦</span>
              <span className="bg-red-500/30 text-red-200 text-sm font-medium px-3 py-1 rounded-full">Canadian Cannabis Market</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Cannabis Labels for Canadian Licensed Producers</h1>
            <p className="text-xl text-red-100 leading-relaxed mb-8">
              Thermal label materials for Canadian cannabis projects, reviewed against the buyer&apos;s current bilingual copy, packaging, variable-data workflow, and applicable requirements. Final regulatory approval remains the buyer&apos;s responsibility.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/quote" className="bg-white text-red-700 font-bold px-8 py-3  hover:bg-red-50 transition-colors">Get a Quote</Link>
              <Link href="/samples" className="border-2 border-white text-white font-semibold px-8 py-3  hover:bg-white/10 transition-colors">Request Samples</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Federal Requirements */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-3 text-center">Canadian Cannabis Label Review</h2>
          <p className="text-slate-500 text-center mb-10">Canadian cannabis labelling requirements and official guidance change over time. The licence holder should confirm the current federal, provincial, product-class, packaging, bilingual, symbol, warning, and variable-data requirements before approving artwork.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🌿", title: "Cannabis Symbol", desc: "Confirm whether the current product class and package require the standardized symbol, then use buyer-approved artwork, size, color, and placement." },
              { icon: "🇫🇷", title: "Bilingual Content", desc: "Confirm which required statements must appear in English and French and whether additional provincial language rules apply." },
              { icon: "⚠️", title: "Health Warnings", desc: "Use the current buyer-approved warning text, rotation, language, format, and placement for the product class." },
              { icon: "🧪", title: "Cannabinoid Information", desc: "The licence holder should define the required THC, CBD, serving, unit, package, and testing fields for the approved label." },
              { icon: "📦", title: "Lot and Variable Data", desc: "Confirm the required lot, dates, identifiers, barcode, and traceability fields plus the printing and verification workflow." },
              { icon: "🏭", title: "Licence-Holder Details", desc: "Use the buyer-approved legal name, address, contact details, and other current mandatory statements." },
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

      {/* Provincial Variations */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-3 text-center">Provincial and Buyer Requirements</h2>
          <p className="text-slate-500 text-center mb-10">Provincial distributors and retailers may apply additional submission, packaging, language, data, or display requirements. Confirm the current buyer specification for the destination before artwork approval.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { province: "Ontario", notes: "Confirm the current federal requirements plus the Ontario buyer's packaging, listing, data, and submission specifications." },
              { province: "British Columbia", notes: "Review the current buyer requirements for packaging, product data, display, and distribution alongside federal rules." },
              { province: "Alberta", notes: "Confirm the current product, packaging, data, and retailer requirements with the responsible Alberta buyer or authority." },
              { province: "Quebec", notes: "Obtain buyer and legal review of current French-language and consumer-facing packaging requirements before print approval." },
            ].map((p) => (
              <div key={p.province} className="bg-slate-50  p-5 border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2">{p.province}</h3>
                <p className="text-slate-500 text-sm">{p.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 bg-red-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Recommended Label Products</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Direct Thermal Labels", use: "Retail point-of-sale and inventory workflows", href: "/products/thermal-labels/direct-thermal-labels", slotKey: "products.card.direct-thermal-labels" },
              { name: "Thermal Transfer Labels", use: "Product labels requiring ribbon-based print and longer handling", href: "/products/thermal-labels/thermal-transfer-labels", slotKey: "products.card.thermal-transfer-labels" },
              { name: "Synthetic PP Labels", use: "Packaging exposed to moisture or frequent handling", href: "/products/thermal-labels/synthetic-paper-labels", slotKey: "products.card.synthetic-paper-labels" },
            ].map((p) => (
              <Link key={p.name} href={p.href} className="group flex flex-col overflow-hidden border border-red-200 bg-white transition-all hover:border-red-400 hover:shadow-md">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <SlotImage slotKey={p.slotKey} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-bold text-slate-800 transition group-hover:text-red-700">{p.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">{p.use}</p>
                  <span className="mt-4 text-xs font-semibold text-red-600">View Product →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-red-700 to-red-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Planning a Canadian Cannabis Label Project?</h2>
          <p className="text-red-100 mb-8">Share buyer-approved bilingual copy, product class, variable-data fields, packaging surface, province, and current requirements for material and artwork review. Regulatory approval remains with the licence holder and its qualified advisers.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-white text-red-700 font-bold px-10 py-4  hover:bg-red-50 transition-colors">Contact Our Team</Link>
            <Link href="/quote" className="border-2 border-white text-white font-semibold px-10 py-4  hover:bg-white/10 transition-colors">Get a Quote</Link>
          </div>
        </div>
      </section>
    </main>
      <CTABanner />
    <Footer />
    </>
  );
}
