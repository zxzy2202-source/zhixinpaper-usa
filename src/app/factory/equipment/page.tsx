import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import HeroBanner from "@/components/ui/HeroBanner";
import { SlotImage } from "@/components/ui/SlotImage";
import { canonicalUrl } from "@/lib/seo";



export const metadata: Metadata = {
  title: "Thermal Paper Factory Equipment",
  description: "Explore the coating, slitting, rewinding, printing, die cutting, converting, and inspection stages used for thermal paper roll and label projects.",
  keywords: "thermal paper slitting machines, label die cutting equipment, thermal paper manufacturing equipment",
  alternates: { canonical: canonicalUrl("/factory/equipment") },
};

const equipment = [
  {
    slug: "thermal-coating",
    category: "Thermal Coating",
    summary: "Used within the coating stage for applicable thermal paper constructions and protective layers.",
    roles: ["Material and coating-route preparation", "Controlled web handling through the coating stage", "Process checks against the approved product plan"],
    slotKey: "factory.equipment.thermal-coating",
    alt: "Thermal coating production equipment used in a paper manufacturing process",
    objectPosition: "center",
  },
  {
    slug: "slitting-rewinding",
    category: "Slitting & Rewinding",
    summary: "Supports roll conversion and rewinding according to the confirmed width, length, core, winding, and packing format.",
    roles: ["Jumbo-roll conversion into finished formats", "Web tension and winding review", "Dimensional and roll-finish checks"],
    slotKey: "factory.equipment.slitting-rewinding",
    alt: "Paper roll slitting and rewinding equipment in a converting facility",
    objectPosition: "center",
  },
  {
    slug: "flexographic-printing",
    category: "Flexographic Printing",
    summary: "Supports custom back printing, branding, codes, and label graphics after artwork and print-route review.",
    roles: ["Artwork and plate-route confirmation", "Ink, substrate, and color review", "Registration and print-sample checks"],
    slotKey: "factory.equipment.flexographic-printing",
    alt: "Flexographic printing equipment for custom paper and label projects",
    objectPosition: "52% center",
  },
  {
    slug: "die-cutting-finishing",
    category: "Die Cutting & Finishing",
    summary: "Converts label materials into the agreed shape, pitch, liner, sensing, and finished-roll configuration.",
    roles: ["Die and layout preparation", "Matrix removal and finishing", "Roll, fanfold, or sheet-format review"],
    slotKey: "factory.equipment.die-cutting-finishing",
    alt: "Label die cutting and finishing equipment in production",
    objectPosition: "58% center",
  },
  {
    slug: "lamination-converting",
    category: "Lamination & Converting",
    summary: "Combines or finishes applicable material layers where the product construction requires added protection or functionality.",
    roles: ["Material-construction review", "Roll-fed lamination or converting", "Finished construction and winding checks"],
    slotKey: "factory.equipment.lamination-converting",
    alt: "Roll-fed lamination and converting equipment in a factory",
    objectPosition: "center",
  },
  {
    slug: "quality-inspection",
    category: "Quality Inspection",
    summary: "Inspection methods are selected against the agreed material, application, acceptance criteria, and quality plan.",
    roles: ["Visual and dimensional review", "Print, barcode, adhesion, or image checks where applicable", "Production and inspection record review"],
    slotKey: "factory.equipment.quality-inspection",
    alt: "Quality inspection process for thermal paper and label rolls",
    objectPosition: "46% center",
  },
];

export default function FactoryEquipmentPage() {
  return (

    <>
      <Header />
      <main id="main-content" className="legacy-brand-page min-h-screen bg-white">
      <HeroBanner
        variant="media"
        eyebrow="Production technology"
        title="Manufacturing Equipment"
        description="Review the converting, printing, finishing, and inspection equipment used across thermal paper roll and label projects. Capabilities are confirmed against the required material, dimensions, print, and quality plan."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Factory", href: "/factory" },
          { label: "Equipment" },
        ]}
        actions={[{ label: "Discuss Production Requirements", href: "/quote", kind: "primary" }]}
      />

      <section
        data-component="equipment-showcase"
        aria-labelledby="equipment-showcase-title"
        className="overflow-hidden bg-[#fbfaf6] py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-14 max-w-3xl border-l-2 border-[#9c661d] pl-5 sm:mb-20">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#9c661d]">Production route</p>
            <h2 id="equipment-showcase-title" className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-[#14211f] sm:text-4xl">
              Equipment by process stage
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#4f5f5a] sm:text-lg">
              Each project follows an equipment route selected for its material, dimensions, print, finishing, inspection, and packing requirements.
            </p>
          </div>

          <div className="divide-y divide-[#ded6c8]">
            {equipment.map((item, index) => (
              <article
                key={item.slug}
                data-component="equipment-feature"
                data-equipment={item.slug}
                aria-labelledby={`equipment-${item.slug}`}
                className="grid min-w-0 gap-8 py-12 first:pt-0 last:pb-0 md:grid-cols-2 md:items-center md:gap-10 lg:gap-16 lg:py-20"
              >
                <div
                  data-component="equipment-copy"
                  className={`min-w-0 ${index % 2 === 1 ? "md:order-2" : ""}`}
                >
                  <p data-component="process-index" className="text-xs font-bold uppercase tracking-[0.12em] text-[#9c661d]">
                    {String(index + 1).padStart(2, "0")} / {String(equipment.length).padStart(2, "0")}
                  </p>
                  <h2 id={`equipment-${item.slug}`} className="mt-3 break-words text-3xl font-semibold leading-tight tracking-[-0.015em] text-[#14211f]">
                    {item.category}
                  </h2>
                  <p className="mt-4 max-w-[58ch] text-base leading-7 text-[#4f5f5a] sm:text-lg">
                    {item.summary}
                  </p>
                  <div className="mt-7">
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#0f5f5c]">Typical role</p>
                    <ul className="mt-3 space-y-3">
                      {item.roles.map((role) => (
                        <li key={role} className="flex gap-3 text-sm leading-6 text-[#354440] sm:text-base">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#9c661d]" />
                          <span>{role}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div
                  data-component="equipment-image"
                  className={`group relative aspect-[16/10] min-w-0 overflow-hidden border border-[#ded6c8] bg-[#f4f0e8] shadow-[0_18px_48px_rgba(20,33,31,0.08)] md:aspect-[4/3] ${index % 2 === 1 ? "md:order-1" : ""}`}
                >
                  <SlotImage
                    slotKey={item.slotKey}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1199px) 48vw, 560px"
                    className="object-cover saturate-[0.9] contrast-[1.03] transition-transform duration-200 motion-reduce:transition-none md:group-hover:scale-[1.015]"
                    style={{ objectPosition: item.objectPosition }}
                  />
                  <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#101b19]/35 to-transparent" />
                  <p className="absolute bottom-3 left-4 right-4 text-xs font-medium tracking-wide text-white/90">
                    {item.category} process reference
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </main>
      <CTABanner
        title="Want to review the production route?"
        subtitle="Share the product specification and inspection needs so we can identify the relevant equipment, process stages, and available factory evidence."
        showTrust={false}
      />
    <Footer />
    </>
  );
}
