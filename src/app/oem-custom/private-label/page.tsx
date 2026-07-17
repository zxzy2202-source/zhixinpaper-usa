import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { canonicalUrl } from "@/lib/seo";



export const metadata: Metadata = {
  title: "Private Label Thermal Paper | White Label Receipt Rolls Manufacturer",
  description: "Private label thermal paper rolls and labels under your brand. Custom packaging, branded cores, and full white-label service from 50,000 rolls. ISO 9001 certified.",
  keywords: "private label thermal paper, white label receipt rolls, OEM thermal paper manufacturer",
  alternates: { canonical: canonicalUrl("/oem-custom/private-label") },
};

const benefits = [
  { title: "Your Brand, Our Manufacturing", desc: "We produce thermal paper rolls and labels to your exact specifications, packaged under your brand name with your logo, colors, and product codes." },
  { title: "Custom Packaging Options", desc: "Choose from shrink-wrapped rolls, retail boxes, bulk cartons, or custom packaging designs. We handle all packaging artwork and production." },
  { title: "Branded Core Printing", desc: "Cores can be printed with your brand name, product code, and barcode for professional presentation and inventory management." },
  { title: "Full Compliance Documentation", desc: "All private label products come with full compliance documentation including ISO certificates, BPA-free declarations, and REACH statements in your brand name." },
  { title: "Flexible MOQ", desc: "Private label service available from 50,000 rolls or 100,000 labels. Lower MOQ available for established distributor partners." },
  { title: "15-Day Lead Time", desc: "Standard private label orders ship within 15 working days of artwork approval. Rush orders available for established accounts." },
];

export default function PrivateLabelPage() {
  return (

    <>
      <Header />
      <main id="main-content" className="legacy-brand-page min-h-screen bg-white">
      <section className="brand-hero bg-[#101b19] text-white pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="text-blue-300 text-sm mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/oem-custom" className="hover:text-white">OEM & Custom</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Private Label</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-blue-500/30 text-blue-200 text-sm font-medium px-3 py-1 rounded-full mb-4">White Label Service</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Private Label Thermal Paper</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Build your own thermal paper brand with our full private label service. We manufacture, package, and certify — you sell under your brand name.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/quote" className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">Get Private Label Quote</Link>
              <Link href="/samples" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">Request Samples</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Why Choose Our Private Label Service?</h2>
          <p className="text-slate-500 mb-12 max-w-2xl">Our private label program gives distributors and importers a complete branded product line without the capital investment of manufacturing.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-bold">{i + 1}</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{b.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-8">Private Label Process</h2>
          <div className="flex flex-col md:flex-row gap-4">
            {["Submit Requirements", "Artwork & Approval", "Sample Production", "Mass Production", "Quality Check", "Shipment"].map((step, i) => (
              <div key={i} className="flex-1 text-center">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-sm">{i + 1}</div>
                <p className="text-sm font-medium text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Private Label Programme</h2>
          <p className="text-blue-100 mb-8">Contact our OEM team to discuss your requirements and receive a tailored private label proposal.</p>
          <Link href="/quote" className="bg-white text-blue-700 font-semibold px-10 py-4 rounded-lg hover:bg-blue-50 transition-colors inline-block">Get a Private Label Quote</Link>
        </div>
      </section>
    </main>
      <CTABanner />
    <Footer />
    </>
  );
}
