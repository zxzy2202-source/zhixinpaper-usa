import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import FaqSection from "@/components/ui/FaqSection";
import { SlotImage } from "@/components/ui/SlotImage";
import { THERMAL_LABELS, COMPANY } from "@/lib/data";
import { breadcrumbSchema, buildMetadata, canonicalUrl, faqSchema } from "@/lib/seo";
import { ArrowRight, CheckCircle2, Factory, Layers, Printer, ScanLine, Scissors, Truck } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Thermal Labels Wholesale | Direct, Transfer & 4x6",
  description:
    "Wholesale thermal labels for distributors and OEM buyers. Compare direct thermal, thermal transfer, 4x6 shipping, barcode, freezer, and custom label routes by printer, material, adhesive, and application.",
  path: "/products/thermal-labels",
  keywords: [
    "thermal labels wholesale",
    "direct thermal labels",
    "thermal transfer labels",
    "4x6 shipping labels wholesale",
    "barcode labels supplier",
    "shipping labels manufacturer",
    "freezer cold chain labels",
    "custom die-cut thermal labels",
    "permanent adhesive labels",
    "removable thermal labels",
    "OEM thermal labels",
  ],
});

const THERMAL_LABEL_FAQS = [
  {
    question: "What are thermal labels?",
    answer: "Thermal labels are adhesive labels made for thermal printing. Direct thermal labels form an image on a heat-sensitive surface without a ribbon, while thermal transfer labels use a ribbon to create the printed image. The suitable construction depends on the facestock, adhesive, size, core ID, printer model, required image life, handling, and application environment.",
  },
  {
    question: "What is the difference between direct thermal and thermal transfer labels?",
    answer: "Direct thermal labels do not require a ribbon and are commonly considered for applications with a defined service and storage period. Thermal transfer labels use a matched ribbon and may provide higher resistance to selected chemicals, UV exposure, temperature, or abrasion. Actual readable life and resistance depend on the complete label and ribbon construction, print settings, exposure conditions, and representative testing.",
  },
  {
    question: "What sizes and formats are available for thermal labels?",
    answer: "Common formats include 4×6 inch, 4×4 inch, 100×150mm, and 100×100mm labels in roll or fanfold form. Core ID, roll OD, gap or black-mark sensing, perforations, corners, liner, and die-cut shape must match the printer and dispensing process. Custom formats are reviewed according to material, tooling, packing, quantity, and the current production plan.",
  },
  {
    question: "What information is needed for a thermal label quote?",
    answer: "Provide label dimensions, core ID, roll OD or fanfold format, gap or black-mark sensing, facestock, adhesive, printer model, application surface, operating environment, image-life target, compliance needs, quantity, packing, and destination. Include exposure to cold, heat, moisture, chemicals, UV, or abrasion so the quoted construction can be reviewed against those conditions.",
  },
  {
    question: "How should buyers validate a thermal label sample?",
    answer: "Test a production-intent sample with the named printer, ribbon where applicable, substrate, temperature, handling, scanner, and storage conditions. Check feeding, sensing, barcode readability, adhesion, removal behavior, print durability, and label conversion before approving the bulk specification.",
  },
  {
    question: "How should thermal labels be stored before use?",
    answer: "Storage limits depend on the facestock, adhesive, liner, and supplier specification. Keep unopened labels in the agreed temperature and humidity range, away from direct sunlight, heat, moisture, plasticizers, solvents, and reactive chemicals. Record lot numbers and use stock rotation when image life or adhesive performance is critical.",
  },
  {
    question: "Can thermal labels be used for food and healthcare applications?",
    answer: "They may be considered only after the complete label construction and intended use are reviewed. For food-contact or healthcare projects, confirm the facestock, adhesive, coating, ink or ribbon, contact type, temperature, duration, destination rules, and supporting evidence. A declaration or test file applies only to the named material and conditions; it should not be treated as approval for every finished label or application.",
  },
];

const thermalLabelCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Thermal Labels",
  alternateName: [
    "Direct Thermal Labels",
    "Thermal Transfer Labels",
    "Shipping Labels",
    "Barcode Labels",
  ],
  description: "Wholesale direct thermal, thermal transfer, freezer, high-temperature, synthetic, tamper-evident, and custom labels for distributors and OEM buyers.",
  url: canonicalUrl("/products/thermal-labels"),
  inLanguage: "en",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: THERMAL_LABELS.map((label, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: label.name,
      url: canonicalUrl(`/products/thermal-labels/${label.slug}`),
    })),
  },
};

export default function ThermalLabelsPage() {
  const jsonLd = [
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Products", url: "/products" },
      { name: "Thermal Labels", url: "/products/thermal-labels" },
    ]),
    thermalLabelCollectionSchema,
    faqSchema(THERMAL_LABEL_FAQS),
  ];

  return (
    <>
      <Header />
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
      <main>
        <section className="paper-noise border-b border-[#ded6c8] bg-[#fbfaf6] pt-32 pb-16">
          <div className="container-site">
            <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-[#87918c]">
              <Link href="/products" className="transition-colors hover:text-[#0f5f5c]">Products</Link>
              <span>/</span>
              <span className="text-[#4f5f5a]">Thermal Labels</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-0.5 w-8 bg-[#9c661d]" />
              <span className="text-xs font-bold text-[#0f5f5c]">Thermal Labels</span>
            </div>
            <h1 className="font-bold text-[#14211f] text-5xl md:text-6xl mb-4">
              Thermal Labels
            </h1>
            <p className="text-[#4f5f5a] text-lg max-w-2xl mb-6">
              Complete range of thermal labels for shipping, logistics, healthcare, cold chain, industrial, and specialty applications. Direct thermal and thermal transfer options available.
            </p>
            <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/quote"
                className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#9c661d] px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-[#7d4f16]"
              >
                Request a Label Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/samples"
                className="inline-flex min-h-11 items-center justify-center border border-[#0f5f5c]/35 bg-white/55 px-7 py-3 text-sm font-semibold text-[#0f5f5c] transition-colors hover:border-[#0f5f5c] hover:bg-white"
              >
                Request Samples
              </Link>
            </div>
            <div className="flex flex-wrap gap-3">
              {["BPA-Free & Food Safe", "Shipping & Barcode Labels", "Freezer & Cold Chain", "Permanent & Removable", "Custom Die-Cut Sizes", "Bulk & Pallet Orders"].map((f) => (
                <span key={f} className="flex items-center gap-1.5 border border-[#ded6c8] bg-[#f4f0e8] px-3 py-1.5 text-xs font-semibold text-[#4f5f5a]">
                  <CheckCircle2 className="w-3 h-3 text-[#0f5f5c]" />
                  {f}
                </span>
              ))}
            </div>
            <div className="mt-8 border-t border-[#ded6c8] pt-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#87918c]">Choose the right label route</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-[#0f5f5c]">
                <Link href="/products/thermal-labels/direct-thermal-labels" className="underline-offset-4 hover:underline">Direct thermal and 4x6 shipping labels</Link>
                <Link href="/products/thermal-labels/thermal-transfer-labels" className="underline-offset-4 hover:underline">Thermal transfer and durable labels</Link>
                <Link href="/blog/direct-vs-thermal-transfer" className="underline-offset-4 hover:underline">Direct vs thermal transfer guide</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#fbfaf6]">
          <div className="container-site">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {THERMAL_LABELS.map((label) => (
                <div key={label.slug} className="group flex flex-col overflow-hidden border border-[#ded6c8] bg-[#fbfaf6] transition-all hover:border-[#0f5f5c]/40">
                  <Link href={`/products/thermal-labels/${label.slug}`} className="flex flex-col flex-1 hover:bg-[#f4f0e8] transition-colors">
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#e7eee9]">
                      <SlotImage
                        slotKey={`products.card.${label.slug}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h2 className="font-bold text-[#14211f] text-xl transition-colors group-hover:text-[#0f5f5c]">{label.name}</h2>
                        {label.tag && (
                          <span className={`ml-2 shrink-0 border px-2 py-0.5 text-[10px] font-bold ${label.tag === "New" ? "border-[#0f5f5c]/25 bg-[#0f5f5c]/10 text-[#0f5f5c]" : "bg-[#e7eee9] text-[#0f5f5c] border-[#0f5f5c]/25"}`}>{label.tag}</span>
                        )}
                      </div>
                      <p className="text-[#4f5f5a] text-sm mb-4">{label.subtitle}</p>
                      <div className="space-y-1.5 mb-4">
                        {label.features.map((f) => (
                          <div key={f} className="flex items-center gap-2 text-xs text-[#4f5f5a]">
                            <CheckCircle2 className="w-3 h-3 text-[#0f5f5c]/60 shrink-0" />
                            {f}
                          </div>
                        ))}
                      </div>
                      <div className="mt-auto flex items-center justify-between border-t border-[#ded6c8] pt-4">
                        <span className="text-[#87918c] text-xs">MOQ: {label.moq}</span>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0f5f5c]">
                          Details <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                  <a
                    href={`https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}?text=Hi,%20I'm%20interested%20in%20${encodeURIComponent(label.name)}%20thermal%20labels.%20Please%20send%20details.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full border-t border-[#ded6c8] bg-[#f0fff4] hover:bg-[#d8f5e0] text-[#128C7E] text-xs font-semibold py-2.5 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Inquire via WhatsApp
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#ded6c8] bg-[#101b19] py-20 text-white">
          <div className="container-site">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center mb-12">
              <div>
                <p className="text-xs font-bold text-[#d6b273]">Production line</p>
                <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
                  From raw material to shipped labels.
                </h2>
                <p className="mt-5 text-sm leading-7 text-[#c7d0cb] max-w-xl">
                  Every thermal label order follows a documented production path. From coating and die-cutting to slitting and packing, each step is tracked against the approved specification — so the second order matches the first.
                </p>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden border border-white/10">
                <SlotImage
                  slotKey="factory.equipment.die-cutting-finishing"
                  alt="Thermal label die-cutting and finishing production line"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute top-7 left-7 right-7 h-0.5 bg-[#2a4a3c] hidden lg:block" aria-hidden="true" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative">
                {[
                  { icon: <Layers className="w-5 h-5" />, step: "Coating", detail: "Thermal coating applied to facestock with controlled sensitivity and density" },
                  { icon: <Printer className="w-5 h-5" />, step: "Printing", detail: "Custom logo, brand, or compliance text printed before lamination" },
                  { icon: <Scissors className="w-5 h-5" />, step: "Die-cutting", detail: "Precision rotary or flatbed die-cutting to exact label dimensions" },
                  { icon: <ScanLine className="w-5 h-5" />, step: "QC inspection", detail: "Barcode scan rate, adhesion, and image density tested per batch" },
                  { icon: <Factory className="w-5 h-5" />, step: "Slitting & rewinding", detail: "Master rolls slit to ordered width, rewound to specified core and OD" },
                  { icon: <Truck className="w-5 h-5" />, step: "Packing & dispatch", detail: "Carton labels, pallet plans, and shipping documents matched to order" },
                ].map((item, i) => (
                  <div key={item.step} className="relative flex flex-col items-center text-center">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 z-10 ${
                      i === 5 ? "bg-emerald-600 text-white" : "bg-[#1a3a2e] text-[#d6b273]"
                    }`}>
                      {item.icon}
                    </div>
                    <p className="font-bold text-white text-sm mb-1">{i + 1}. {item.step}</p>
                    <p className="text-[#8ca39a] text-xs leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="relative aspect-[4/3] overflow-hidden border border-white/10">
                <SlotImage
                  slotKey="factory.equipment.thermal-coating"
                  alt="Thermal coating production line for label facestock"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden border border-white/10">
                <SlotImage
                  slotKey="factory.equipment.flexographic-printing"
                  alt="Flexographic printing equipment for custom label production"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden border border-white/10">
                <SlotImage
                  slotKey="factory.equipment.lamination-converting"
                  alt="Label lamination and converting production equipment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden border border-white/10">
                <SlotImage
                  slotKey="factory.equipment.quality-inspection"
                  alt="Quality inspection station for thermal label production"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {[
                { label: "Coating width", value: "Up to 1,600mm", desc: "Accommodates large-format label orders" },
                { label: "Die-cutting precision", value: "±0.1mm", desc: "Suitable for barcode and auto-apply labels" },
                { label: "Annual capacity", value: "500M+ labels", desc: "Multi-line production for volume buyers" },
              ].map((stat) => (
                <div key={stat.label} className="border border-white/10 bg-white/[0.04] p-6 text-center">
                  <p className="font-bold text-[#d6b273] text-2xl mb-1">{stat.value}</p>
                  <p className="font-semibold text-white text-sm">{stat.label}</p>
                  <p className="text-[#8ca39a] text-xs mt-2">{stat.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 border-l-2 border-[#d6b273] pl-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-3xl text-sm leading-6 text-[#e7eee9]">
                Production capacity and capability statements are provided for reference. The actual process, timeline, and quality plan for each order are defined by the approved material, specification, sample, and current production schedule.
              </p>
              <Link href="/factory/overview" className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-bold text-[#e7c98f] hover:text-white">
                View factory overview <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <FaqSection
          id="faq"
          faqs={THERMAL_LABEL_FAQS}
          title="Clear answers before you request a quote."
          intro="These answers cover the most common questions about thermal label materials, formats, and ordering requirements."
          eyebrow="Thermal label FAQ"
          className="bg-[#f4f0e8]"
        />

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
