import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import SlotImage from "@/components/ui/SlotImage";
import { COMPLIANCE_ITEMS } from "@/lib/data";
import { breadcrumbSchema, canonicalUrl, organizationSchema } from "@/lib/seo";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ClipboardCheck,
  FileCheck,
  FileText,
  Leaf,
  Shield,
  ShieldCheck,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Thermal Paper Compliance | BPA-Free, REACH, ISO 9001, FSC, FDA",
  description:
    "Review Zhixin Paper compliance routes for BPA-free thermal paper, REACH/RoHS, ISO 9001:2015, FSC, EU food contact, FDA, phenol-free grades, and product-specific document packs.",
  keywords: [
    "thermal paper compliance",
    "BPA-free thermal paper certificate",
    "REACH RoHS thermal paper",
    "ISO 9001 thermal paper manufacturer",
    "FSC thermal paper",
    "FDA compliant thermal paper",
    "thermal paper certificates",
  ],
  alternates: { canonical: canonicalUrl("/compliance") },
};

const ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  FileCheck,
  Award,
  Leaf,
  UtensilsCrossed,
  Shield,
};

const heroSignals = [
  "Certificate route before deposit",
  "Product-specific declarations",
  "Batch and material records",
  "Import review support",
];

const proofBand = [
  { value: "ISO", label: "9001:2015", text: "Quality system and inspection records" },
  { value: "BPA", label: "Free routes", text: "Thermal paper roll and label options" },
  { value: "REACH", label: "RoHS files", text: "Chemical compliance review path" },
  { value: "FSC", label: "FDA support", text: "Responsible paper and food-contact files" },
];

const documentRoutes = [
  {
    title: "For import and distributor review",
    documents: "BPA-free declaration, REACH/RoHS statement, ISO 9001 certificate",
    products: "POS rolls, ATM rolls, labels, custom printed rolls",
    href: "/compliance/certificates",
  },
  {
    title: "For food service and retail chains",
    documents: "Food-contact route, BPA-free route, carton and batch records",
    products: "Receipt paper, deli labels, bakery labels, food packaging labels",
    href: "/compliance/eu-food-contact",
  },
  {
    title: "For private label programs",
    documents: "Product spec sheet, artwork proof, carton marks, certificate package",
    products: "OEM receipt rolls, branded cartons, custom printed labels",
    href: "/oem-custom/private-label",
  },
  {
    title: "For regulated applications",
    documents: "Market-specific declaration, sample test route, repeat-order records",
    products: "Healthcare, cannabis, lottery, transport, and ticketing media",
    href: "/industries",
  },
];

const reviewSteps = [
  {
    title: "Send market and use case",
    text: "Tell us the country, sales channel, product use, printer or applicator, and any customer compliance request.",
  },
  {
    title: "Match the document route",
    text: "We identify which certificate, declaration, or test report should travel with the roll, label, carton, or sample.",
  },
  {
    title: "Check samples before bulk",
    text: "Samples can be reviewed together with coating grade, adhesive, core, carton pack, and certificate route.",
  },
  {
    title: "Repeat the approved file set",
    text: "Batch code, product spec, carton marks, and document records stay attached to repeat orders.",
  },
];

const requestItems = ["Product or application", "Destination market", "Required certificates", "Order stage"];

export default function CompliancePage() {
  const jsonLd = [
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Compliance", url: "/compliance" },
    ]),
    organizationSchema(),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Thermal Paper Compliance",
      url: canonicalUrl("/compliance"),
      about: [
        "BPA-free thermal paper",
        "REACH and RoHS compliance",
        "ISO 9001 thermal paper manufacturing",
        "FSC paper sourcing",
        "FDA and food-contact documentation",
      ],
      mainEntity: {
        "@type": "ItemList",
        itemListElement: COMPLIANCE_ITEMS.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          url: canonicalUrl(`/compliance/${item.slug}`),
        })),
      },
    },
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
        <section className="relative overflow-hidden bg-slate-50 pt-32">
          <div className="absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,#eaf6ff_0%,rgba(248,250,252,0)_100%)]" />
          <div className="container-site relative pb-16">
            <nav className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              <Link href="/" className="hover:text-blue-700">
                Home
              </Link>
              <span>/</span>
              <span className="text-slate-900">Compliance</span>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[0.92fr_0.68fr] lg:items-end">
              <div>
                <div className="mb-5 inline-flex items-center gap-3 border border-blue-200 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700 shadow-sm">
                  <FileText className="h-3.5 w-3.5 text-cyan-600" aria-hidden="true" />
                  Compliance document center
                </div>
                <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-normal text-slate-950 md:text-6xl lg:text-7xl">
                  Thermal paper compliance files buyers can review before ordering.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                  Find the certificate route for BPA-free thermal paper rolls, REACH/RoHS, ISO 9001, FSC,
                  food-contact uses, FDA requests, phenol-free grades, and product-specific document packs.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/compliance/certificates" className="inline-flex items-center justify-center gap-2 bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-500">
                    View Certificates
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-colors hover:border-blue-300 hover:text-blue-700">
                    Request Documents
                  </Link>
                </div>
              </div>

              <div className="border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.10)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                  <SlotImage
                    slotKey="home.compliance"
                    alt="Thermal paper compliance certificates and quality documents"
                    fill
                    priority
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.02)_0%,rgba(15,23,42,0.58)_100%)]" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-100">Document package</p>
                    <h2 className="mt-2 text-2xl font-extrabold leading-tight text-white">
                      Match certificates to the product, market, and use case.
                    </h2>
                  </div>
                </div>
                <div className="grid gap-px bg-slate-200 sm:grid-cols-2">
                  {heroSignals.map((signal) => (
                    <div key={signal} className="flex items-center gap-3 bg-white p-4 text-sm font-semibold text-slate-800">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                      {signal}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-6">
          <div className="container-site grid gap-px bg-slate-200 md:grid-cols-4">
            {proofBand.map((item) => (
              <div key={item.value} className="bg-white p-5">
                <p className="text-3xl font-extrabold tracking-normal text-slate-950">{item.value}</p>
                <p className="mt-2 text-sm font-bold text-slate-900">{item.label}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white py-18">
          <div className="container-site">
            <div className="mb-10 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <p className="section-label">Compliance routes</p>
                <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-normal text-slate-950 md:text-5xl">
                  Start with the document a buyer needs to approve.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-slate-600 lg:justify-self-end">
                Different buyers ask for different files. This page keeps the route simple: open the certificate page,
                review the product fit, then request the exact file pack for the order.
              </p>
            </div>

            <div className="grid gap-px bg-slate-200 md:grid-cols-2 lg:grid-cols-4">
              {COMPLIANCE_ITEMS.map((item) => {
                const Icon = ICONS[item.icon] ?? ShieldCheck;
                return (
                  <Link key={item.slug} href={`/compliance/${item.slug}`} className="group bg-white p-6 transition-colors hover:bg-blue-50">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center border border-blue-100 bg-blue-50 text-blue-700 transition-colors group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-extrabold leading-tight text-slate-950 transition-colors group-hover:text-blue-700">
                      {item.name}
                    </h3>
                    <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">{item.description}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-blue-700">
                      Open file route
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-18">
          <div className="container-site">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div>
                <p className="section-label">Buyer document map</p>
                <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-normal text-slate-950 md:text-5xl">
                  Choose by review scenario, not by certificate name only.
                </h2>
                <p className="mt-5 text-sm leading-7 text-slate-600">
                  If a customer, importer, retailer, or tender team asks for paperwork, the useful answer depends on
                  product use, destination market, and order stage.
                </p>
              </div>

              <div className="border border-slate-200 bg-white">
                {documentRoutes.map((route) => (
                  <Link key={route.title} href={route.href} className="grid gap-4 border-b border-slate-200 p-5 transition-colors last:border-b-0 hover:bg-blue-50 md:grid-cols-[0.75fr_1fr_auto] md:items-center">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-950">{route.title}</h3>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">
                        {route.products}
                      </p>
                    </div>
                    <p className="text-sm leading-6 text-slate-600">{route.documents}</p>
                    <ArrowRight className="h-4 w-4 text-blue-700" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-18 text-white">
          <div className="container-site">
            <div className="mb-10 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200">Review process</p>
                <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-normal text-[#f4f6fa] md:text-5xl">
                  Keep compliance review attached to the actual order.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-slate-300 lg:justify-self-end">
                A certificate page is useful only when it connects back to the roll, label, carton, sample, and repeat
                order. The review process below is built around that buyer workflow.
              </p>
            </div>

            <div className="grid gap-px bg-white/10 lg:grid-cols-4">
              {reviewSteps.map((step, index) => (
                <div key={step.title} className="bg-slate-900 p-6">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-blue-200/70">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-6 text-xl font-extrabold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-18">
          <div className="container-site">
            <div className="grid gap-8 border border-slate-200 bg-slate-50 p-6 md:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="section-label">Request a document pack</p>
                <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-normal text-slate-950 md:text-4xl">
                  Send the details that decide which file set matters.
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  We can quote the product and prepare the compliance route together, so the buyer review does not happen
                  after the pallet is already planned.
                </p>
              </div>

              <div className="grid gap-px bg-slate-200 sm:grid-cols-2">
                {requestItems.map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-white p-4">
                    <ClipboardCheck className="h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                    <span className="text-sm font-bold text-slate-900">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CTABanner
          title="Need compliance documentation for a buyer review?"
          subtitle="Send the product, destination market, required certificate names, and order stage. We will prepare the right document route with your quote or samples."
          primaryLabel="Request Documents"
          primaryHref="/contact"
          secondaryLabel="Request a Quote"
          secondaryHref="/quote"
          trustItems={["ISO 9001:2015", "BPA-free routes", "REACH/RoHS", "FSC / FDA document support"]}
        />
      </main>
      <Footer />
    </>
  );
}
