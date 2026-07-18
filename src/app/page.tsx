import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SlotImage from "@/components/ui/SlotImage";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { THERMAL_LABELS } from "@/lib/data";
import {
  ArrowRight,
  Check,
  Factory,
  FileCheck2,
  PackageCheck,
  Ruler,
  ScanLine,
  ShieldCheck,
  Tag,
  Truck,
} from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Thermal Paper Rolls & Thermal Labels Manufacturer | Zhixin Paper",
  description:
    "Factory-direct thermal paper rolls and thermal labels for distributors, importers, and private-label buyers. Confirm sizes, materials, compliance files, samples, packing, and shipping terms.",
  path: "/",
  keywords: [
    "thermal paper rolls manufacturer",
    "thermal labels manufacturer",
    "receipt paper rolls wholesale",
    "80mm thermal paper rolls",
    "POS paper rolls supplier",
    "4x6 shipping labels wholesale",
    "direct thermal labels supplier",
    "BPA free thermal paper",
    "private label thermal paper",
  ],
});

const PRODUCT_LINES = [
  {
    title: "Thermal paper rolls",
    href: "/products/thermal-paper-rolls",
    slotKey: "home.product.thermal-rolls" as const,
    alt: "Thermal paper rolls in common POS, terminal, ATM, and ticketing sizes",
    copy: "Receipt, payment terminal, ATM, lottery, parking, and ticket rolls engineered around printer fit and measured length.",
    specs: ["80mm & 57mm", "3 1/8 in x 230 ft", "Custom print & core"],
    link: "Explore paper rolls",
  },
  {
    title: "Thermal labels",
    href: "/products/thermal-labels",
    slotKey: "home.product.thermal-labels" as const,
    alt: "Direct thermal shipping, barcode, retail, and logistics labels",
    copy: "Direct thermal labels for shipping, barcode, warehouse, retail, food, and private-label supply programs.",
    specs: ["4 x 6 shipping", "Barcode & retail", "Permanent & removable"],
    link: "Explore thermal labels",
  },
];

const APPLICATIONS = [
  {
    title: "Retail & POS",
    copy: "Receipt rolls and shelf labels built for repeat use across stores, restaurants, and payment terminals.",
    href: "/industries/retail-pos",
  },
  {
    title: "Logistics & warehouse",
    copy: "Shipping, barcode, pallet, and inventory labels matched to printers, surfaces, and handling conditions.",
    href: "/industries/logistics-warehouse",
  },
  {
    title: "Banking & payment",
    copy: "ATM and terminal rolls with controlled OD, winding, image density, and archival options.",
    href: "/industries/banking-finance",
  },
  {
    title: "Lottery & ticketing",
    copy: "Paper rolls for lottery, gaming, parking, kiosk, and transport systems with barcode and black-mark control.",
    href: "/industries/lottery-gaming",
  },
];

const SPEC_STEPS = [
  {
    icon: <Ruler className="h-5 w-5" />,
    number: "01",
    title: "Confirm the specification",
    copy: "Size, length or label gap, material, core, OD, winding, printer model, and annual volume.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    number: "02",
    title: "Match samples and files",
    copy: "Approve print, adhesion, image life, BPA/BPS-free grade, REACH, Prop 65, FSC, FDA, or ISO files.",
  },
  {
    icon: <Truck className="h-5 w-5" />,
    number: "03",
    title: "Plan the repeat order",
    copy: "Lock carton marks, private label, pallet loading, lead time, mixed SKUs, and FOB, CIF, or DDP terms.",
  },
];

const FACTORY_POINTS = [
  { icon: <ScanLine className="h-5 w-5" />, title: "Printer-fit checks", copy: "Core, OD, winding, sensitivity, die cut, and gap are checked against the application." },
  { icon: <PackageCheck className="h-5 w-5" />, title: "Packing control", copy: "Shrink wrap, carton strength, labels, pallet marks, and loading plans are confirmed before shipment." },
  { icon: <FileCheck2 className="h-5 w-5" />, title: "Document matching", copy: "Samples, material declarations, and current test files stay tied to the quoted grade." },
];

const HERO_PROOF = [
  "Thermal paper rolls",
  "Direct thermal labels",
  "OEM & private label",
  "Export documentation",
] as const;

const RFQ_FIELDS = [
  "Product use case",
  "Size, core, OD or label format",
  "Monthly quantity and destination",
  "Required certificates and packing",
] as const;

export default function HomePage() {
  const jsonLd = [breadcrumbSchema([{ name: "Home", url: "/" }])];
  const featuredLabels = THERMAL_LABELS.slice(0, 3);

  return (
    <>
      <Header />
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main id="main-content" className="bg-[#fbfaf6] pt-[64px] md:pt-[92px]">
        <section className="relative isolate overflow-hidden bg-[#101b19] text-white">
          <SlotImage
            slotKey="home.hero"
            alt="Thermal paper manufacturing line with finished paper rolls ready for wholesale supply"
            fill
            priority
            sizes="100vw"
            quality={88}
            className="-z-20 object-cover object-[62%_center]"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,20,18,0.97)_0%,rgba(8,20,18,0.84)_48%,rgba(8,20,18,0.24)_82%,rgba(8,20,18,0.08)_100%)]" />

          <div className="container-site py-14 md:py-18 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.58fr] lg:items-end">
              <div className="max-w-[760px]">
                <h1 className="text-[2.35rem] font-bold leading-[1.05] text-white sm:text-5xl lg:text-[4rem]">
                  Verified thermal rolls and labels for import buyers.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-[#dce4df] md:text-lg">
                  Match rolls, labels, documents, packing, and freight terms before bulk production.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/quote"
                    className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#9c661d] px-7 py-3.5 text-sm font-bold text-white shadow-[0_18px_46px_rgba(185,130,47,0.28)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#7d4f16] active:translate-y-px"
                  >
                    Request a Quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/products"
                    className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/35 bg-[#101b19]/30 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10 active:translate-y-px"
                  >
                    Browse Products
                  </Link>
                </div>
              </div>

              <aside className="border border-white/14 bg-[#0b1513]/86 p-5 shadow-[0_24px_80px_rgba(5,16,14,0.34)] backdrop-blur-sm md:p-6">
                <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs font-bold text-[#d6b273]">RFQ checklist</p>
                    <h2 className="mt-2 text-2xl font-bold leading-tight text-white">
                      Send the details buyers actually check.
                    </h2>
                  </div>
                  <FileCheck2 className="h-6 w-6 shrink-0 text-[#d6b273]" aria-hidden="true" />
                </div>
                <div className="mt-5 grid gap-3">
                  {RFQ_FIELDS.map((field) => (
                    <div key={field} className="flex items-center gap-3 border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-[#dce4df]">
                      <Check className="h-4 w-4 shrink-0 text-[#d6b273]" aria-hidden="true" />
                      {field}
                    </div>
                  ))}
                </div>
                <Link href="/quote" className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-white px-5 py-3 text-sm font-bold text-[#14211f] transition duration-200 hover:-translate-y-0.5 hover:bg-[#f4f0e8] active:translate-y-px">
                  Request a Quote
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </aside>
            </div>
          </div>
        </section>

        <section aria-label="Homepage sourcing proof" className="border-b border-[#ded6c8] bg-[#fbfaf6] py-6">
          <div className="container-site grid border border-[#ded6c8] bg-[#fbfaf6] sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-[#ded6c8]">
            {HERO_PROOF.map((item) => (
              <div key={item} className="flex items-center gap-3 border-b border-[#ded6c8] p-4 text-sm font-bold text-[#14211f] last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0">
                <Check className="h-4 w-4 shrink-0 text-[#0f5f5c]" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-[#ded6c8] bg-[#fbfaf6] py-20 md:py-28">
          <div className="container-site">
            <div className="max-w-3xl border-b border-[#ded6c8] pb-10">
              <h2 className="text-3xl font-bold text-[#14211f] md:text-5xl">Two product lines. One supply partner.</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#4f5f5a]">
                Start with the product your customer buys. Each route leads to the sizes, applications, material options, and RFQ details needed for an accurate quote.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {PRODUCT_LINES.map((product) => (
                <article key={product.title} className="group border border-[#ded6c8] bg-white">
                  <Link href={product.href} className="block">
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#101b19]">
                      <SlotImage
                        slotKey={product.slotKey}
                        alt={product.alt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.025]"
                      />
                    </div>
                    <div className="p-6 md:p-8">
                      <div className="flex items-start justify-between gap-6">
                        <h3 className="text-3xl font-bold text-[#14211f] md:text-4xl">{product.title}</h3>
                        <ArrowRight className="mt-1 h-6 w-6 shrink-0 text-[#0f5f5c] transition group-hover:translate-x-1" />
                      </div>
                      <p className="mt-4 max-w-xl text-sm leading-7 text-[#4f5f5a]">{product.copy}</p>
                      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#ded6c8] pt-5 text-sm font-semibold text-[#33413e]">
                        {product.specs.map((spec) => <span key={spec}>{spec}</span>)}
                      </div>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0f5f5c]">{product.link}</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f4f0e8] py-20 md:py-24">
          <div className="container-site grid gap-12 lg:grid-cols-[0.72fr_1fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <h2 className="text-3xl font-bold text-[#14211f] md:text-5xl">Find the product by application.</h2>
              <p className="mt-5 max-w-lg text-base leading-8 text-[#4f5f5a]">
                Buyers usually know the printer or operating environment before they know the exact paper grade or adhesive. Begin there.
              </p>
              <Link href="/industries" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#0f5f5c] hover:underline">
                View all industries <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="border-t border-[#c8bcaa]">
              {APPLICATIONS.map((item, index) => (
                <Link key={item.title} href={item.href} className="group grid gap-3 border-b border-[#c8bcaa] py-6 sm:grid-cols-[56px_0.72fr_1fr_auto] sm:items-center">
                  <span className="text-sm font-bold tabular-nums text-[#5f6b66]">0{index + 1}</span>
                  <h3 className="text-xl font-bold text-[#14211f] transition group-hover:text-[#0f5f5c]">{item.title}</h3>
                  <p className="text-sm leading-7 text-[#4f5f5a]">{item.copy}</p>
                  <ArrowRight className="hidden h-5 w-5 text-[#0f5f5c] transition group-hover:translate-x-1 sm:block" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#203531] bg-[#101b19] py-20 text-white md:py-24">
          <div className="container-site">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-white md:text-5xl">A useful quote starts before the price.</h2>
              <p className="mt-5 text-base leading-8 text-[#c7d0cb]">
                We turn an RFQ into a production-ready specification, so samples, documents, packing, and freight are reviewed against the same product.
              </p>
            </div>
            <div className="mt-12 grid border-y border-white/15 lg:grid-cols-3 lg:divide-x lg:divide-white/15">
              {SPEC_STEPS.map((step) => (
                <article key={step.number} className="border-b border-white/15 py-7 last:border-b-0 lg:border-b-0 lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <div className="flex items-center justify-between text-[#d6b273]">
                    {step.icon}
                    <span className="text-sm font-bold tabular-nums">{step.number}</span>
                  </div>
                  <h3 className="mt-8 text-2xl font-bold text-white">{step.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#aebbb5]">{step.copy}</p>
                </article>
              ))}
            </div>
            <Link href="/quote" className="mt-10 inline-flex min-h-12 items-center justify-center gap-2 bg-white px-7 py-3.5 text-sm font-bold text-[#14211f] transition hover:-translate-y-0.5 hover:bg-[#f4f0e8]">
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="bg-[#fbfaf6] py-20 md:py-28">
          <div className="container-site grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
            <div className="relative min-h-[480px] overflow-hidden bg-[#101b19]">
              <SlotImage
                slotKey="home.factory-overview"
                alt="Thermal paper production, quality inspection, and export packing"
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#101b19]/90 to-transparent p-7 pt-24 text-white">
                <Factory className="h-7 w-7 text-[#d6b273]" />
                <p className="mt-4 max-w-xl text-lg font-bold leading-7">Production evidence matters most when the second order needs to match the first.</p>
              </div>
            </div>

            <div className="flex flex-col justify-center lg:pl-8">
              <h2 className="text-3xl font-bold text-[#14211f] md:text-5xl">Built for repeatable supply.</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-[#4f5f5a]">
                Product performance is only part of the order. The approved specification must survive production, packing, transport, and warehouse receipt.
              </p>
              <div className="mt-8 border-t border-[#ded6c8]">
                {FACTORY_POINTS.map((point) => (
                  <div key={point.title} className="grid grid-cols-[42px_1fr] gap-4 border-b border-[#ded6c8] py-5">
                    <span className="flex h-10 w-10 items-center justify-center bg-[#e7eee9] text-[#0f5f5c]">{point.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-[#14211f]">{point.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#4f5f5a]">{point.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/factory/overview" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#0f5f5c] hover:underline">
                See our factory process <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="border-y border-[#ded6c8] bg-white py-20 md:py-24">
          <div className="container-site grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-start">
            <div>
              <Tag className="h-7 w-7 text-[#0f5f5c]" />
              <h2 className="mt-5 text-3xl font-bold text-[#14211f] md:text-5xl">Thermal labels for the same supply chain.</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-[#4f5f5a]">
                Add shipping, barcode, retail, or specialty labels to a paper-roll program while keeping one supplier conversation for samples, cartons, and freight.
              </p>
              <Link href="/products/thermal-labels" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#0f5f5c] hover:underline">
                View all thermal labels <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="border-t border-[#ded6c8]">
              {featuredLabels.map((label) => (
                <Link key={label.slug} href={`/products/thermal-labels/${label.slug}`} className="group flex items-center justify-between gap-5 border-b border-[#ded6c8] py-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#14211f] transition group-hover:text-[#0f5f5c]">{label.name}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#4f5f5a]">{label.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-[#0f5f5c] transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#9c661d] py-16 text-white">
          <div className="container-site grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="max-w-3xl text-3xl font-bold text-white md:text-4xl">Send us your roll or label specification.</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/85">
                We will review product fit, samples, documents, packing, lead time, and shipping terms for your destination.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#14211f] px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#0b1513]">
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/samples" className="inline-flex min-h-12 items-center justify-center border border-white/55 px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10">
                Request Samples
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
