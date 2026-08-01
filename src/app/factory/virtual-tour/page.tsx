import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import HeroBanner from "@/components/ui/HeroBanner";
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
      <HeroBanner
        variant="media"
        eyebrow="Factory walkthrough"
        title="Virtual Factory Tour"
        description="Review the main material-handling, converting, printing, inspection, packing, and warehouse areas relevant to thermal paper roll and label projects."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Factory", href: "/factory" },
          { label: "Virtual Tour" },
        ]}
        actions={[{ label: "Request a Guided Review", href: "/contact", kind: "primary" }]}
      />

      <section aria-labelledby="factory-tour-video-title" className="bg-[#fbfaf6] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-8 max-w-3xl border-l-2 border-[#9c661d] pl-5">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#9c661d]">Factory video</p>
            <h2 id="factory-tour-video-title" className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-[#14211f] sm:text-4xl">
              Walk through the production environment
            </h2>
            <p className="mt-4 text-base leading-7 text-[#4f5f5a]">
              Use the video to review the factory environment and visible production areas before requesting a focused live walkthrough.
            </p>
          </div>

          <div className="overflow-hidden border border-[#c8bcaa] bg-[#101b19] shadow-[0_24px_60px_rgba(20,33,31,0.16)]">
            <video
              className="aspect-video w-full bg-black object-contain"
              controls
              playsInline
              preload="metadata"
              aria-label="Zhixin Paper factory tour video"
            >
              <source src="/videos/factory-tour.mp4" type="video/mp4" />
              Your browser does not support HTML5 video playback.
            </video>
          </div>
          <p className="mt-4 text-center text-sm leading-6 text-[#687772]">
            Contact us to arrange a live review focused on the equipment, process, or inspection checkpoints relevant to your project.
          </p>
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

    </main>
      <CTABanner
        title="Need a guided factory review?"
        subtitle="Tell us which products, processes, equipment, or audit checkpoints your team wants to examine so availability and scope can be confirmed."
        showTrust={false}
      />
    <Footer />
    </>
  );
}
