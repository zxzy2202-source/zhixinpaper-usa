import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";



export const metadata: Metadata = {
  title: "Cannabis Labels Canada | Health Canada Compliant Thermal Labels",
  description: "Health Canada compliant cannabis labels for Canadian licensed producers and retailers. Bilingual (English/French) thermal labels meeting federal Cannabis Act requirements.",
  keywords: "cannabis labels Canada, Health Canada cannabis labeling, bilingual cannabis labels, Canadian dispensary labels",
};

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
              Health Canada compliant thermal labels for Canada's federally regulated cannabis market. Bilingual (English/French) labeling, standardized formats, and cannabis symbol compliance — all from a single supplier.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/quote" className="bg-white text-red-700 font-bold px-8 py-3 rounded-lg hover:bg-red-50 transition-colors">Get a Quote</Link>
              <Link href="/samples" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">Request Samples</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Federal Requirements */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-3 text-center">Health Canada Cannabis Act Labelling Requirements</h2>
          <p className="text-slate-500 text-center mb-10">Canada's Cannabis Act (S.C. 2018, c. 16) establishes federal labeling requirements for all cannabis products.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🌿", title: "Cannabis Symbol", desc: "Standardised Health Canada cannabis symbol required on all products. Specific size and placement rules apply." },
              { icon: "🇫🇷", title: "Bilingual Labelling", desc: "All required information must appear in both English and French under the Official Languages Act." },
              { icon: "⚠️", title: "Standardised Health Warning", desc: "Rotating health warning messages from Health Canada's approved list, in both official languages." },
              { icon: "🧪", title: "THC/CBD Content", desc: "Total THC and CBD per unit and per package. Must include both potential and actual THC values." },
              { icon: "📦", title: "Lot Number", desc: "Unique lot identifier enabling product traceability from licensed producer to consumer." },
              { icon: "🏭", title: "Licensed Producer Info", desc: "Name and address of the licensed producer. Contact information for consumer inquiries." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
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
          <h2 className="text-2xl font-bold text-slate-800 mb-3 text-center">Provincial Retail Requirements</h2>
          <p className="text-slate-500 text-center mb-10">In addition to federal requirements, provincial cannabis retailers may have additional labeling or packaging requirements.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { province: "Ontario (OCS)", notes: "Products must meet federal requirements. OCS has specific packaging requirements for retail products." },
              { province: "British Columbia (BC Cannabis)", notes: "Federal requirements apply. BC Cannabis Stores may have additional display requirements." },
              { province: "Alberta (AGLC)", notes: "Federal requirements apply. AGLC has specific requirements for cannabis accessories sold with products." },
              { province: "Quebec (SQDC)", notes: "French-language requirements are particularly strict in Quebec. All consumer-facing text must be in French." },
            ].map((p) => (
              <div key={p.province} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
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
              { name: "Direct Thermal Labels", use: "Retail point-of-sale, inventory labels", href: "/products/thermal-labels/direct-thermal-labels" },
              { name: "Thermal Transfer Labels", use: "Long-term product labels, shelf-stable products", href: "/products/thermal-labels/thermal-transfer-labels" },
              { name: "Synthetic PP Labels", use: "Moisture-resistant packaging labels", href: "/products/thermal-labels/synthetic-paper-labels" },
            ].map((p) => (
              <Link key={p.name} href={p.href} className="bg-white rounded-xl p-5 border border-red-200 hover:border-red-400 hover:shadow-md transition-all group">
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-red-700">{p.name}</h3>
                <p className="text-slate-500 text-sm mb-3">{p.use}</p>
                <span className="text-red-600 text-xs font-semibold">View Product →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-red-700 to-red-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Source Health Canada Compliant Labels?</h2>
          <p className="text-red-100 mb-8">Our team can provide bilingual label templates and compliance documentation for your Health Canada licence application or renewal.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-white text-red-700 font-bold px-10 py-4 rounded-lg hover:bg-red-50 transition-colors">Contact Our Team</Link>
            <Link href="/quote" className="border-2 border-white text-white font-semibold px-10 py-4 rounded-lg hover:bg-white/10 transition-colors">Get a Quote</Link>
          </div>
        </div>
      </section>
    </main>
      <CTABanner />
    <Footer />
    </>
  );
}
