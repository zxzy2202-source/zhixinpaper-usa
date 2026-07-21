import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { canonicalUrl } from "@/lib/seo";



export const metadata: Metadata = {
  title: "Thermal Paper Factory Tour",
  description: "Take a virtual tour of our thermal paper manufacturing facility. See our coating lines, slitting machines, label production, and quality control laboratory.",
  keywords: "thermal paper factory tour, manufacturing facility video, thermal paper factory China",
  alternates: { canonical: canonicalUrl("/factory/virtual-tour") },
};

const tourStops = [
  { id: "01", name: "Raw Material Warehouse", desc: "Our climate-controlled raw material warehouse stores base paper, thermal coating chemicals, adhesives, and packaging materials. All incoming materials are quarantined and tested before release to production." },
  { id: "02", name: "Thermal Coating Lines", desc: "Six high-speed coating lines apply our proprietary thermal formulations to base paper at speeds up to 800 m/min. Real-time sensors monitor coating weight and uniformity across the full web width." },
  { id: "03", name: "Slitting & Converting Hall", desc: "Our 20+ precision slitting lines convert large-format coated rolls into finished product specifications. Automated tension control ensures consistent roll hardness and diameter." },
  { id: "04", name: "Label Production Division", desc: "Eight flexographic printing lines, four die-cutting stations, and full lamination capability produce direct thermal, thermal transfer, and specialty labels on a range of facestocks." },
  { id: "05", name: "Quality Control Laboratory", desc: "Our on-site laboratory tests every production batch for image density, fade resistance, adhesion, chemical compliance, and dimensional accuracy using calibrated instruments." },
  { id: "06", name: "Finished Goods Warehouse", desc: "Our 10,000 m² finished goods warehouse maintains buffer stock for key SKUs and handles packing, labeling, and dispatch for shipments to distributors worldwide." },
];

export default function VirtualTourPage() {
  return (

    <>
      <Header />
      <main id="main-content" className="legacy-brand-page min-h-screen bg-white">
      <section className="brand-hero bg-[#101b19] text-white pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="text-blue-300 text-sm mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/factory" className="hover:text-white">Factory</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Virtual Tour</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-blue-500/30 text-blue-200 text-sm font-medium px-3 py-1 rounded-full mb-4">360° Factory Tour</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Virtual Factory Tour</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Explore our 50,000 m² manufacturing facility from anywhere in the world. Walk through our production divisions, meet our quality team, and see the technology behind every roll and label we produce.
            </p>
          </div>
        </div>
      </section>

      {/* Video Placeholder */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-slate-800  aspect-video flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-slate-900/80" />
            <div className="relative text-center text-white">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/30 transition-colors">
                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <p className="text-lg font-semibold">Factory Tour Video</p>
              <p className="text-slate-300 text-sm mt-1">Click to play — 8 minute facility walkthrough</p>
            </div>
          </div>
          <p className="text-slate-400 text-sm text-center mt-4">Contact us to request a live video call tour with our factory team.</p>
        </div>
      </section>

      {/* Tour Stops */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-12">Tour Highlights</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {tourStops.map((stop) => (
              <div key={stop.id} className="flex gap-5 bg-white border border-slate-200  p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white  flex items-center justify-center font-bold">
                  {stop.id}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">{stop.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{stop.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Schedule a Live Factory Tour</h2>
          <p className="text-blue-100 mb-8">We offer live video call tours with our factory team, or in-person visits for qualified distributors and importers.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-white text-blue-700 font-semibold px-8 py-3  hover:bg-blue-50 transition-colors">Request Live Tour</Link>
            <Link href="/factory/overview" className="border-2 border-white text-white font-semibold px-8 py-3  hover:bg-white/10 transition-colors">Factory Overview</Link>
          </div>
        </div>
      </section>
    </main>
      <CTABanner />
    <Footer />
    </>
  );
}
