import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import FaqSection from "@/components/ui/FaqSection";
import { SlotImage } from "@/components/ui/SlotImage";
import { THERMAL_PAPER_ROLLS, COMPANY } from "@/lib/data";
import { THERMAL_PAPER_GRADE_PATHS } from "@/config/thermalPaperArchitecture";
import { breadcrumbSchema, buildMetadata, canonicalUrl, faqSchema } from "@/lib/seo";
import { ArrowRight, CheckCircle2, Factory, Layers, Printer, ScanLine, Scissors, Truck } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Thermal Paper Rolls: Sizes and Wholesale Specs",
  description:
    "Compare thermal paper roll sizes, metric and inch names, POS and terminal uses, core IDs, coatings, packing, and wholesale quote requirements.",
  path: "/products/thermal-paper-rolls",
  languages: {
    en: "https://www.zhixinpaper.com/products/thermal-paper-rolls",
    "x-default": "https://www.zhixinpaper.com/products/thermal-paper-rolls",
  },
});

const THERMAL_ROLL_FAQS = [
  {
    question: "What are thermal paper rolls?",
    answer:
      "Thermal paper rolls are heat-sensitive paper rolls used in direct thermal printers without ink or toner. Common applications include POS receipts, payment terminals, kiosks, parking systems, and printed receipt programs. A complete specification normally includes width, length or outer diameter, core ID, paper GSM, winding direction, coating, and packing.",
  },
  {
    question: "How are thermal paper roll sizes named?",
    answer:
      "Metric names commonly use width x outer diameter, such as 80 x 80 mm or 57 x 40 mm. Inch-based names often use width x roll length, such as 3 1/8 in x 230 ft or 2 1/4 in x 50 ft. Always confirm which dimensions a supplier is quoting — width alone does not confirm printer fit.",
  },
  {
    question: "Are 80 x 80 mm and 3 1/8 in x 230 ft interchangeable?",
    answer:
      "Not automatically. Both are about 80mm or 3.125 inches wide, but 80 x 80 mm usually states width and outer diameter while 3 1/8 in x 230 ft states width and nominal length. Paper GSM, core ID, winding tension, and actual measured length determine the finished OD. Always confirm the full spec.",
  },
  {
    question: "Are 57mm and 2 1/4-inch receipt paper the same width?",
    answer:
      "They are the same common width family because 2.25 inches is about 57.15mm. However, they are not a complete specification — payment terminals can require different outer diameters, lengths, core IDs, or winding directions even when the paper width matches. Confirm the exact terminal model.",
  },
  {
    question: "How should thermal paper rolls be stored before use?",
    answer:
      "Storage conditions depend on the paper grade, coating, packing, and intended image-life target. Keep rolls in the agreed temperature and humidity range, away from direct sunlight, heat, moisture, plasticizers, solvents, and pressure that can deform the roll. Confirm the supplier storage guidance and rotate stock by lot when image retention matters.",
  },
  {
    question: "What documents should buyers request for a thermal paper roll?",
    answer:
      "Request the technical data sheet and any grade-specific test report, declaration, image-life evidence, or compliance file required for the destination and application. Check that each document identifies the quoted paper grade, manufacturer or certificate holder, test scope, issue date, and relevant conditions before approval.",
  },
  {
    question: "What information is needed for a thermal paper roll quote?",
    answer:
      "Send the application or printer model, roll width, target length or outer diameter, core ID, paper GSM or grade, winding direction, coating or compliance needs, quantity per SKU, packing method, and destination. A current roll photo or sample helps verify ambiguous size names before quoting.",
  },
];

const thermalRollCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Thermal Paper Rolls",
  alternateName: [
    "Thermal Receipt Paper Rolls",
    "POS Receipt Paper Rolls",
    "Till Rolls",
    "Cash Register Paper Rolls",
    "Terminal Paper Rolls",
  ],
  description:
    "Thermal paper roll types, size notation, applications, and wholesale specification requirements.",
  url: canonicalUrl("/products/thermal-paper-rolls"),
  inLanguage: "en",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: THERMAL_PAPER_ROLLS.map((roll, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: roll.name,
      url: canonicalUrl(`/products/thermal-paper-rolls/${roll.slug}`),
    })),
  },
};

export default function ThermalPaperRollsPage() {
  const jsonLd = [
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Products", url: "/products" },
      { name: "Thermal Paper Rolls", url: "/products/thermal-paper-rolls" },
    ]),
    thermalRollCollectionSchema,
    faqSchema(THERMAL_ROLL_FAQS),
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
      <main id="main-content">
        {/* ── HERO ── */}
        <section className="paper-noise border-b border-[#ded6c8] bg-[#fbfaf6] pt-32 pb-16">
          <div className="container-site">
            <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-[#87918c]">
              <Link href="/products" className="transition-colors hover:text-[#0f5f5c]">Products</Link>
              <span>/</span>
              <span className="text-[#4f5f5a]">Thermal Paper Rolls</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-0.5 w-8 bg-[#9c661d]" />
              <span className="text-xs font-bold text-[#0f5f5c]">Thermal Paper Rolls</span>
            </div>
            <h1 className="font-bold text-[#14211f] text-5xl md:text-6xl mb-4">
              Thermal Paper Rolls
            </h1>
            <p className="text-[#4f5f5a] text-lg max-w-2xl mb-6">
              Standard POS rolls, payment terminal rolls, ATM rolls, lottery and casino tickets, parking tickets, and custom printed receipt paper. BPA-free, REACH compliant, with OEM printing and DDP shipping options.
            </p>
            <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/quote"
                className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#9c661d] px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-[#7d4f16]"
              >
                Request a Roll Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/samples"
                className="inline-flex min-h-11 items-center justify-center border border-[#0f5f5c]/35 bg-white/55 px-7 py-3 text-sm font-semibold text-[#0f5f5c] transition-colors hover:border-[#0f5f5c] hover:bg-white"
              >
                Request Samples
              </Link>
            </div>
            <div className="flex flex-wrap gap-3">
              {["BPA-Free Documents", "Roll Size Control", "Scan Reliability", "OEM Printing", "Pallet & DDP Options"].map((f) => (
                <span key={f} className="flex items-center gap-1.5 border border-[#ded6c8] bg-[#f4f0e8] px-3 py-1.5 text-xs font-semibold text-[#4f5f5a]">
                  <CheckCircle2 className="w-3 h-3 text-[#0f5f5c]" />
                  {f}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUCT CARDS ── */}
        <section className="py-20 bg-[#fbfaf6]">
          <div className="container-site">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {THERMAL_PAPER_ROLLS.map((roll) => (
                <div key={roll.slug} className="group flex flex-col overflow-hidden border border-[#ded6c8] bg-[#fbfaf6] transition-all hover:border-[#0f5f5c]/40">
                  <Link href={`/products/thermal-paper-rolls/${roll.slug}`} className="flex flex-col flex-1 hover:bg-[#f4f0e8] transition-colors">
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#e7eee9]">
                      <SlotImage
                        slotKey={`products.card.${roll.slug}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h2 className="font-bold text-[#14211f] text-xl transition-colors group-hover:text-[#0f5f5c]">{roll.name}</h2>
                        {roll.tag && (
                          <span className={`ml-2 shrink-0 border px-2 py-0.5 text-[10px] font-bold ${roll.tag === "New" ? "border-[#0f5f5c]/25 bg-[#0f5f5c]/10 text-[#0f5f5c]" : "bg-[#e7eee9] text-[#0f5f5c] border-[#0f5f5c]/25"}`}>{roll.tag}</span>
                        )}
                      </div>
                      <p className="text-[#4f5f5a] text-sm mb-4">{roll.subtitle}</p>
                      <div className="space-y-1.5 mb-4">
                        {roll.features.slice(0, 3).map((f) => (
                          <div key={f} className="flex items-center gap-2 text-xs text-[#4f5f5a]">
                            <CheckCircle2 className="w-3 h-3 text-[#0f5f5c]/60 shrink-0" />
                            {f}
                          </div>
                        ))}
                      </div>
                      <div className="mt-auto flex items-center justify-between border-t border-[#ded6c8] pt-4">
                        <span className="text-[#87918c] text-xs">MOQ: {roll.moq}</span>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0f5f5c]">
                          Details <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                  <a
                    href={`https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}?text=Hi,%20I'm%20interested%20in%20${encodeURIComponent(roll.name)}%20thermal%20paper%20rolls.%20Please%20send%20details.`}
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

        {/* ── T3 PERFORMANCE GRADES ── */}
        <section id="performance-grades" className="scroll-mt-28 border-t border-[#ded6c8] bg-[#101b19] py-20 text-white">
          <div className="container-site">
            <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end mb-10">
              <div>
                <p className="text-xs font-bold text-[#d6b273]">T3 functional performance</p>
                <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
                  Specify the exposure, not just the grade name.
                </h2>
              </div>
              <p className="text-sm leading-7 text-[#c7d0cb]">
                Water-resistant, three-proof, and long-life are incomplete buying terms. Qualification starts with the named risk, contact method, temperature and humidity, duration, readability target, and acceptance test.
              </p>
            </div>

            <div className="divide-y divide-white/15 border-y border-white/15">
              {THERMAL_PAPER_GRADE_PATHS.map((grade) => (
                <div key={grade.name} className="grid gap-4 py-6 md:grid-cols-[0.7fr_0.9fr_1.4fr] md:gap-8">
                  <div>
                    <span className="text-[11px] font-bold text-[#d6b273]">{grade.maturity}</span>
                    <h3 className="mt-2 text-lg font-bold text-white">{grade.name}</h3>
                  </div>
                  <p className="text-sm leading-6 text-[#e7eee9]">{grade.use}</p>
                  <p className="text-sm leading-6 text-[#aebbb5]">{grade.evidence}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 border-l-2 border-[#d6b273] pl-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-3xl text-sm leading-6 text-[#e7eee9]">
                A performance option remains a configuration or project candidate until the quoted grade, test method, sample result, and application conditions are linked to the order.
              </p>
              <Link href="/quote" className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-bold text-[#e7c98f] hover:text-white">
                Submit test conditions <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── PRODUCTION LINE ── */}
        <section className="border-t border-[#ded6c8] bg-[#101b19] py-20 text-white">
          <div className="container-site">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center mb-12">
              <div>
                <p className="text-xs font-bold text-[#d6b273]">Production line</p>
                <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
                  From jumbo roll to finished roll.
                </h2>
                <p className="mt-5 text-sm leading-7 text-[#c7d0cb] max-w-xl">
                  Every thermal paper roll order follows a documented production path. From slitting and rewinding to packing and palletizing, each step is tracked against the approved specification.
                </p>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden border border-white/10">
                <SlotImage
                  slotKey="factory.equipment.slitting-rewinding"
                  alt="Thermal paper roll slitting and rewinding production line"
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
                  { icon: <Layers className="w-5 h-5" />, step: "Coating", detail: "Thermal coating applied to base paper with controlled sensitivity and density" },
                  { icon: <Scissors className="w-5 h-5" />, step: "Slitting", detail: "Jumbo rolls slit to ordered width with precise edge control" },
                  { icon: <Factory className="w-5 h-5" />, step: "Rewinding", detail: "Slit rolls rewound to specified outer diameter and core ID" },
                  { icon: <Printer className="w-5 h-5" />, step: "Printing", detail: "Custom logo, patterns, or compliance text printed on roll back" },
                  { icon: <ScanLine className="w-5 h-5" />, step: "QC inspection", detail: "OD, core fit, image density, and scan reliability tested per batch" },
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
                  alt="Thermal coating production line for paper rolls"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden border border-white/10">
                <SlotImage
                  slotKey="factory.equipment.slitting-rewinding"
                  alt="Roll slitting and rewinding equipment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden border border-white/10">
                <SlotImage
                  slotKey="factory.equipment.flexographic-printing"
                  alt="Flexographic printing for custom roll branding"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden border border-white/10">
                <SlotImage
                  slotKey="factory.equipment.quality-inspection"
                  alt="Quality inspection station for thermal paper rolls"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {[
                { label: "Coating width", value: "Up to 1,600mm", desc: "Accommodates large-format jumbo rolls" },
                { label: "Slitting precision", value: "±0.5mm", desc: "Consistent width across every roll in the order" },
                { label: "Annual capacity", value: "500M+ rolls", desc: "Multi-line production for volume buyers" },
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
          faqs={THERMAL_ROLL_FAQS}
          title="Clear answers before you request a quote."
          intro="These answers define the naming and measurement rules used throughout this product category."
          eyebrow="Thermal roll FAQ"
          className="bg-[#f4f0e8]"
        />

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
