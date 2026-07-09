import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import SlotImage from "@/components/ui/SlotImage";
import { COMPANY } from "@/lib/data";
import { breadcrumbSchema, canonicalUrl, organizationSchema } from "@/lib/seo";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Boxes,
  CheckCircle2,
  ClipboardCheck,
  Factory,
  FileCheck2,
  Gauge,
  PackageCheck,
  Ruler,
  ScanLine,
  Settings,
  ShieldCheck,
  Truck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Thermal Paper Factory | ISO 9001 Manufacturing & QC",
  description:
    "Visit Zhixin Paper's ISO 9001 thermal paper factory. Review production capacity, slitting, die-cutting, custom printing, quality control, certificates, batch records, and export packing for thermal paper rolls and labels.",
  keywords: [
    "thermal paper factory",
    "thermal paper manufacturer China",
    "ISO 9001 thermal paper factory",
    "thermal paper rolls manufacturing",
    "thermal labels factory",
    "thermal paper quality control",
    "OEM thermal paper manufacturer",
    "factory audit thermal paper supplier",
  ],
  alternates: { canonical: canonicalUrl("/factory") },
};

type SlotName =
  | "factory.banner"
  | "home.factory-overview"
  | "home.product.thermal-rolls"
  | "home.product.thermal-labels"
  | "home.compliance";

const capabilityStats = [
  { value: "500M+", label: "Rolls produced annually", detail: "POS, ATM, ticketing, and custom roll formats" },
  { value: "80+", label: "Countries served", detail: "Export cartons, pallets, and mixed SKU programs" },
  { value: "15+", label: "Years experience", detail: "Thermal paper rolls, labels, and OEM packaging" },
  { value: "ISO", label: "9001:2015 managed", detail: "Batch records, inspection steps, and document control" },
];

const factoryProof = [
  {
    icon: Award,
    title: "ISO-managed production",
    text: "Quality procedures, incoming material checks, in-process records, and finished-goods inspection before shipment.",
  },
  {
    icon: Ruler,
    title: "Size and winding control",
    text: "Roll width, OD, core ID, label format, winding direction, and carton count are checked against the approved spec.",
  },
  {
    icon: ScanLine,
    title: "Print and scan reliability",
    text: "Thermal sensitivity, barcode density, black mark position, adhesive, and liner performance are tested by use case.",
  },
  {
    icon: PackageCheck,
    title: "Export packing records",
    text: "Carton marks, pallet labels, mixed SKU packing, batch codes, and shipping terms stay attached to the order.",
  },
];

const capabilityPanels = [
  {
    title: "Thermal paper rolls",
    label: "Slitting and winding",
    image: "home.product.thermal-rolls" as SlotName,
    text: "Standard POS, ATM, lottery, casino, parking, medical, transport, and back-print thermal rolls.",
    href: "/products/thermal-paper-rolls",
  },
  {
    title: "Thermal labels",
    label: "Die-cut and adhesive",
    image: "home.product.thermal-labels" as SlotName,
    text: "Direct thermal, thermal transfer, freezer, high-temperature, fanfold, wristband, and custom labels.",
    href: "/products/thermal-labels",
  },
  {
    title: "OEM and private label",
    label: "Packaging and print",
    image: "home.factory-overview" as SlotName,
    text: "Private-label cartons, back print, logo rolls, QR code, carton artwork, pallet marks, and repeat-order files.",
    href: "/oem-custom/private-label",
  },
];

const productionFlow = [
  { step: "Material check", text: "Base paper, coating grade, adhesive, liner, and certificate route are confirmed." },
  { step: "Spec setup", text: "Width, OD, core ID, sensitivity, label format, print artwork, and packing are locked." },
  { step: "Production run", text: "Slitting, winding, die-cutting, printing, or fanfold work follows the approved spec." },
  { step: "QC release", text: "Size, roll tension, print density, barcode scan, adhesive, and carton count are inspected." },
  { step: "Export packing", text: "Batch code, carton marks, pallet plan, document set, and shipping term are prepared." },
];

const documentRoutes = [
  { title: "ISO 9001:2015", href: "/compliance/iso-9001", text: "Quality management certificate and audit route." },
  { title: "BPA-free / phenol-free", href: "/compliance/bpa-free", text: "Thermal paper formulation and test file route." },
  { title: "REACH / RoHS", href: "/compliance/reach-rohs", text: "Chemical compliance files for import review." },
  { title: "FSC and FDA files", href: "/compliance", text: "Responsible paper, food-contact, and regulated-use documents." },
];

const factoryPages = [
  {
    href: "/factory/overview",
    title: "Factory overview",
    text: "Production floor, facility records, capacity signals, and buyer audit context.",
    icon: Factory,
  },
  {
    href: "/factory/equipment",
    title: "Equipment and machines",
    text: "Slitting, die-cutting, coating, printing, and packing equipment details.",
    icon: Settings,
  },
  {
    href: "/factory/capacity",
    title: "Production capacity",
    text: "Daily output, lead time, MOQ, inventory buffer, and repeat supply planning.",
    icon: Gauge,
  },
  {
    href: "/factory/quality-control",
    title: "Quality control",
    text: "Incoming inspection, in-process checks, finished goods testing, and traceability.",
    icon: ClipboardCheck,
  },
  {
    href: "/factory/virtual-tour",
    title: "Virtual factory tour",
    text: "Remote review for qualified distributors, importers, and private-label buyers.",
    icon: ScanLine,
  },
];

export default function FactoryPage() {
  const jsonLd = [
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Factory", url: "/factory" },
    ]),
    organizationSchema(),
  ];

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
      <main id="main-content">
        <section className="relative overflow-hidden bg-[#07365f] pt-32 text-white">
          <div className="absolute inset-0">
            <SlotImage
              slotKey="factory.banner"
              alt="Inside Zhixin Paper thermal paper manufacturing line"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-70 saturate-[1.08]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,33,66,0.92)_0%,rgba(10,59,105,0.72)_46%,rgba(226,242,255,0.16)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.03)_45%,rgba(4,25,50,0.28)_100%)]" />
          </div>

          <div className="container-site relative pb-14">
            <nav className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-50/75">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span>/</span>
              <span className="text-white">Factory</span>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[0.95fr_0.55fr] lg:items-end">
              <div className="max-w-4xl">
                <div className="mb-5 inline-flex items-center gap-3 border border-white/25 bg-white/15 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-sky-50 shadow-sm backdrop-blur-sm">
                  <Factory className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
                  ISO 9001:2015 certified thermal paper factory
                </div>
                <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-normal text-white drop-shadow-sm md:text-6xl lg:text-7xl">
                  Factory capacity buyers can verify before a bulk order.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-sky-50/90 md:text-lg">
                  Review our thermal paper roll and label manufacturing capabilities, quality control steps, document
                  routes, export packing, and repeat-order support before you request pricing or samples.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/quote" className="inline-flex items-center justify-center gap-2 bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-500">
                    Request a Quote
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link href="/factory/virtual-tour" className="inline-flex items-center justify-center gap-2 border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10">
                    View Factory Tour
                  </Link>
                </div>
              </div>

              <div className="border border-white/25 bg-white/[0.16] p-5 shadow-[0_24px_70px_rgba(8,47,73,0.22)] backdrop-blur-md">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-100">Audit-ready signals</p>
                <div className="mt-5 grid gap-px bg-white/[0.18]">
                  {[
                    "Batch and material records",
                    "Size and carton inspection",
                    "Samples before bulk production",
                    "Documents before deposit",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 bg-white/[0.12] p-4 text-sm font-semibold text-white">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white py-6">
          <div className="container-site grid gap-px bg-slate-200 md:grid-cols-4">
            {capabilityStats.map((stat) => (
              <div key={stat.label} className="bg-white p-5">
                <p className="text-3xl font-extrabold tracking-normal text-slate-950">{stat.value}</p>
                <p className="mt-2 text-sm font-bold text-slate-900">{stat.label}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{stat.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white py-18">
          <div className="container-site">
            <div className="mb-10 grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <div>
                <p className="section-label">Factory proof</p>
                <h2 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight tracking-normal text-slate-950 md:text-5xl">
                  What buyers check before switching suppliers.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-slate-600 lg:justify-self-end">
                A factory page should answer the questions behind the RFQ: Can the roll size stay stable? Are records
                traceable? Can documents be reviewed before deposit? Can carton and pallet plans repeat?
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {factoryProof.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="border border-slate-200 bg-white p-6">
                    <Icon className="h-6 w-6 text-blue-700" aria-hidden="true" />
                    <h3 className="mt-5 text-lg font-extrabold tracking-normal text-slate-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-18">
          <div className="container-site">
            <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="section-label">Manufacturing capability</p>
                <h2 className="mt-3 max-w-2xl text-4xl font-extrabold leading-tight tracking-normal text-slate-950 md:text-5xl">
                  From parent roll to export-ready cartons.
                </h2>
              </div>
              <Link href="/factory/equipment" className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900">
                View equipment details
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {capabilityPanels.map((panel) => (
                <Link key={panel.title} href={panel.href} className="group overflow-hidden border border-slate-200 bg-white transition-colors hover:border-blue-300">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                    <SlotImage
                      slotKey={panel.image}
                      alt={`${panel.title} manufacturing capability`}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-200">{panel.label}</p>
                      <h3 className="mt-2 text-2xl font-extrabold text-white">{panel.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm leading-7 text-slate-600">{panel.text}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700">
                      Open related page
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-18 text-white">
          <div className="container-site grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">Production flow</p>
              <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-normal text-[#f4f4f6] md:text-5xl">
                Keep the approved spec repeatable.
              </h2>
              <p className="mt-5 text-sm leading-7 text-blue-100/80">
                The order is easier to scale when samples, production settings, carton marks, and document files are
                checked before bulk production.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/samples" className="inline-flex items-center justify-center gap-2 bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-500">
                  Request Free Samples
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/factory/quality-control" className="inline-flex items-center justify-center gap-2 border border-white/20 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10">
                  Quality Control
                </Link>
              </div>
            </div>

            <div className="grid gap-px bg-white/10">
              {productionFlow.map((item, index) => (
                <div key={item.step} className="grid gap-4 bg-slate-900 p-5 sm:grid-cols-[80px_0.55fr_1fr] sm:items-center">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-blue-200/70">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-lg font-extrabold text-white">{item.step}</h3>
                  <p className="text-sm leading-6 text-slate-300">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-18">
          <div className="container-site">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                <SlotImage
                  slotKey="home.compliance"
                  alt="Thermal paper compliance certificates and factory quality documents"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/68 via-slate-950/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-200">Document review</p>
                  <h2 className="mt-2 text-3xl font-extrabold text-white">Certificates before deposit</h2>
                </div>
              </div>

              <div>
                <p className="section-label">Quality and documents</p>
                <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-normal text-slate-950 md:text-5xl">
                  The paperwork should match the product.
                </h2>
                <p className="mt-5 text-sm leading-7 text-slate-600">
                  Export buyers often need compliance files before they approve a factory. We connect the document route
                  to the product and use case, so the quote does not rely on vague certificate claims.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {documentRoutes.map((route) => (
                    <Link key={route.href} href={route.href} className="group border border-slate-200 p-5 transition-colors hover:border-blue-300 hover:bg-slate-50">
                      <FileCheck2 className="h-5 w-5 text-blue-700" aria-hidden="true" />
                      <h3 className="mt-4 text-base font-extrabold text-slate-950">{route.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{route.text}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700">
                        View file route
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-18">
          <div className="container-site">
            <div className="mb-10 grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <p className="section-label">Factory pages</p>
                <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-normal text-slate-950 md:text-5xl">
                  Go deeper into the audit details.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-slate-600 lg:justify-self-end">
                Use these pages when a buyer asks for production capacity, equipment details, quality inspection,
                certificates, or a remote factory review.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {factoryPages.map((page) => {
                const Icon = page.icon;
                return (
                  <Link key={page.href} href={page.href} className="group flex min-h-full flex-col border border-slate-200 bg-white p-5 transition-colors hover:border-blue-300 hover:bg-white">
                    <Icon className="h-5 w-5 text-blue-700" aria-hidden="true" />
                    <h3 className="mt-5 text-lg font-extrabold text-slate-950 group-hover:text-blue-700">{page.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{page.text}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-blue-700">
                      View
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container-site grid gap-4 md:grid-cols-4">
            {[
              { icon: Boxes, title: "Thermal paper rolls", href: "/products/thermal-paper-rolls" },
              { icon: BadgeCheck, title: "Compliance", href: "/compliance" },
              { icon: Truck, title: "Export supply", href: "/export" },
              { icon: ShieldCheck, title: COMPANY.certifications[0], href: "/compliance/iso-9001" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} href={item.href} className="group flex items-center justify-between border border-slate-200 p-5 transition-colors hover:border-blue-300 hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-blue-700" aria-hidden="true" />
                    <span className="text-sm font-extrabold text-slate-950">{item.title}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-700" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </section>

        <CTABanner
          title="Need samples, documents, or a factory review?"
          subtitle="Send the product type, size, monthly volume, destination, and certificates you need. We will reply with samples, document files, packaging options, and factory review support."
        />
      </main>
      <Footer />
    </>
  );
}
