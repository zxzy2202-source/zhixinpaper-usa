import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";



export const metadata: Metadata = {
  title: "Custom Printed Thermal Paper | Logo Printed Receipt Rolls",
  description: "Custom printed thermal paper rolls and labels with your logo, promotional messaging, and QR codes. Full-color flexographic printing from 50,000 rolls.",
  keywords: "custom printed thermal paper, logo printed receipt rolls, custom thermal paper printing",
};

const printOptions = [
  { name: "Logo & Branding", desc: "Print your company logo, brand colors, and tagline on every roll. Ideal for retail chains and hospitality businesses." },
  { name: "Promotional Messaging", desc: "Add promotional offers, loyalty program information, or seasonal campaigns directly to your receipt paper." },
  { name: "QR Codes & URLs", desc: "Drive digital engagement with printed QR codes linking to your website, app, or loyalty program." },
  { name: "Legal & Compliance Text", desc: "Pre-print required legal text, return policies, or compliance statements to save time at the point of sale." },
  { name: "Custom Back Printing", desc: "Utilise the reverse side of receipt paper for advertising, maps, or additional brand messaging." },
  { name: "Variable Data Printing", desc: "Serialised numbering, unique codes, or batch identifiers for traceability and anti-counterfeiting applications." },
];

export default function CustomPrintingPage() {
  return (

    <>
      <Header />
      <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="text-blue-300 text-sm mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/oem-custom" className="hover:text-white">OEM & Custom</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Custom Printing</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-blue-500/30 text-blue-200 text-sm font-medium px-3 py-1 rounded-full mb-4">Custom Print Service</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Custom Printed Thermal Paper</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Turn every receipt into a brand touchpoint. Our full-color flexographic printing service puts your logo, messaging, and QR codes on every roll — with no compromise on thermal print quality.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/quote" className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">Get Printing Quote</Link>
              <Link href="/samples" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">Request Print Samples</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Custom Printing Options</h2>
          <p className="text-slate-500 mb-12 max-w-2xl">We offer a full range of custom printing options for thermal paper rolls and labels, from simple logo printing to complex multi-color designs.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {printOptions.map((opt, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-slate-800 mb-2">{opt.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{opt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-8">Technical Specifications</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-100">
                {[
                  ["Printing Method", "Flexographic (water-based inks)"],
                  ["Colors", "Up to 4 colors per side (front and/or back)"],
                  ["Color Matching", "Pantone color matching available"],
                  ["Minimum Print Area", "10mm × 10mm"],
                  ["Registration Accuracy", "±0.5mm"],
                  ["Minimum Order Quantity", "50,000 rolls / 100,000 labels"],
                  ["Lead Time", "20–30 working days from artwork approval"],
                  ["Artwork Format", "AI, EPS, PDF (vector preferred)"],
                ].map(([key, val]) => (
                  <tr key={key} className="hover:bg-blue-50/30">
                    <td className="px-6 py-4 font-medium text-slate-700 w-1/2 md:w-1/3">{key}</td>
                    <td className="px-6 py-4 text-slate-500">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Print Your Brand?</h2>
          <p className="text-blue-100 mb-8">Send us your artwork and requirements for a custom printing quote within 24 hours.</p>
          <Link href="/quote" className="bg-white text-blue-700 font-semibold px-10 py-4 rounded-lg hover:bg-blue-50 transition-colors inline-block">Request Custom Print Quote</Link>
        </div>
      </section>
    </main>
      <CTABanner />
    <Footer />
    </>
  );
}
