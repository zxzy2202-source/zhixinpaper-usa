import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import HeroBanner from "@/components/ui/HeroBanner";
import { canonicalUrl } from "@/lib/seo";

const PAGE_URL = canonicalUrl("/factory/virtual-tour");

export const metadata: Metadata = {
  title: "Virtual Factory Tour | Zhixin Paper",
  description:
    "Review the production areas shown in Zhixin Paper's factory video, including material handling, converting, label production, inspection, packing, and warehousing.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Virtual Factory Tour | Zhixin Paper",
    description:
      "Review the production areas shown in Zhixin Paper's factory video, including material handling, converting, label production, inspection, packing, and warehousing.",
    siteName: "Zhixin Paper",
    images: [
      {
        url: "/images/factory-overview.jpg",
        width: 1200,
        height: 630,
        alt: "Zhixin Paper factory production environment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Virtual Factory Tour | Zhixin Paper",
    description:
      "Review the production areas shown in Zhixin Paper's factory video, including material handling, converting, label production, inspection, packing, and warehousing.",
    images: ["/images/factory-overview.jpg"],
  },
};

const tourStops = [
  { id: "01", name: "Raw Material Warehouse", desc: "Review the visible storage and material-control areas used for base paper, coating inputs, adhesives, and packaging materials. Incoming inspection and release records can be discussed for the quoted project." },
  { id: "02", name: "Thermal Coating Area", desc: "Review the coating equipment and process-control points visible during the walkthrough. Available line configuration, coating method, inspection controls, and production scheduling must be confirmed for the selected grade." },
  { id: "03", name: "Slitting & Converting Hall", desc: "Review the converting equipment used to produce quoted roll dimensions and winding formats. Tension, roll hardness, diameter, core, and tolerance criteria are confirmed through the approved specification and inspection plan." },
  { id: "04", name: "Label Production Area", desc: "Review the printing, die-cutting, and finishing capabilities relevant to the requested label construction. Process availability depends on facestock, adhesive, liner, artwork, finishing, quantity, and schedule." },
  { id: "05", name: "Quality Control Laboratory", desc: "Review the visible inspection equipment and discuss which incoming, in-process, and finished-product checks apply to the quoted construction. Acceptance criteria and report availability require project confirmation." },
  { id: "06", name: "Finished Goods Warehouse", desc: "Review the packing, labeling, storage, and dispatch areas shown in the tour. Stock availability, storage conditions, packing method, and shipment timing are confirmed for each order." },
];

const factoryTourVideoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Zhixin Paper Virtual Factory Tour",
  description:
    "Factory walkthrough covering material handling, thermal coating, converting, label production, inspection, packing, and warehousing.",
  thumbnailUrl: [canonicalUrl("/images/factory-overview.jpg")],
  contentUrl: canonicalUrl("/videos/factory-tour.mp4"),
  embedUrl: canonicalUrl("/factory/virtual-tour"),
  uploadDate: "2026-08-05",
  publisher: {
    "@type": "Organization",
    name: "Zhixin Paper",
    url: canonicalUrl("/"),
  },
  inLanguage: "en",
};

export default function VirtualTourPage() {
  return (

    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(factoryTourVideoSchema).replace(/</g, "\\u003c") }}
      />
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
