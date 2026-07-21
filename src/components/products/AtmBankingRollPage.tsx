import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  FileCheck2,
  Landmark,
  ShieldCheck,
} from "lucide-react";

interface RollData {
  name: string;
  moq: string;
  sizes: readonly string[];
  applications: readonly string[];
  features: readonly string[];
  specifications: Record<string, string | undefined>;
}

interface AtmBankingRollPageProps {
  roll: RollData;
  faqs: readonly { question: string; answer: string }[];
}

const APPROVAL_POINTS = [
  {
    label: "Terminal fit",
    title: "Match the mechanism before sampling.",
    copy: "Width, OD, core ID, winding direction, dust level, and feed path are checked against the ATM or teller terminal model.",
  },
  {
    label: "Record retention",
    title: "Specify image life and storage conditions.",
    copy: "Archival grade, image density, heat, humidity, light exposure, and expected retention period stay on the approved specification.",
  },
  {
    label: "Controlled content",
    title: "Approve disclosures and back print once.",
    copy: "Regulatory copy, terms, language, artwork revision, ink color, and batch controls are locked before the production run.",
  },
];

const COMPATIBILITY = [
  ["Diebold Nixdorf", "DN200 / DN800 Series"],
  ["NCR", "SelfServ 80 / 6622 / 6687"],
  ["Wincor", "ProCash 2050xe / 4060xe"],
  ["Hyosung", "MX5600T / MX8800T"],
];

const CONTROL_MAP = [
  ["Static-related jams", "Anti-static surface treatment and clean slitting checked before packing."],
  ["Unreadable records", "Image density, sensitivity, and archival-life expectation documented by grade."],
  ["Terminal mismatch", "Printer model, width, OD, core, and winding confirmed before sample dispatch."],
  ["Wrong disclosure copy", "Artwork revision, language, print side, and ink color approved before bulk printing."],
  ["Mixed batch performance", "Lot coding and retained samples support production traceability."],
  ["Storage damage", "Moisture protection, carton strength, pallet marks, and warehouse conditions agreed in advance."],
];

const RFQ_FIELDS = [
  "ATM, teller terminal, or kiosk brand and model",
  "Roll width, OD or length, core ID, and winding direction",
  "Image-life target and storage environment",
  "Back-print artwork, language, and revision control",
  "Annual volume, carton plan, destination, and Incoterm",
  "BPA-free, REACH, ISO, TDS, or archival report requirements",
];

const DOCUMENTS = [
  "BPA-free SGS certificate",
  "REACH and RoHS declarations",
  "ISO 9001:2015 certificate",
  "Archival-grade test report",
  "Technical data sheet",
  "Batch and artwork approval record",
];

const RECOMMENDED_PRODUCTS = [
  {
    label: "Regulatory content",
    name: "Back Print Thermal Rolls",
    copy: "Add disclosures, terms, support details, multilingual copy, or controlled reverse-side content.",
    href: "/products/thermal-paper-rolls/back-print-thermal-rolls",
  },
  {
    label: "Self-service terminals",
    name: "Kiosk & Vending Rolls",
    copy: "Extend the same supply programme to financial kiosks, payment stations, and unattended terminals.",
    href: "/products/thermal-paper-rolls/kiosk-vending-rolls",
  },
  {
    label: "Branch counters",
    name: "Standard POS Rolls",
    copy: "Cover teller counters, payment desks, and branch receipt printers with controlled 57mm and 80mm rolls.",
    href: "/products/thermal-paper-rolls/standard-pos-rolls",
  },
  {
    label: "Brand programmes",
    name: "Custom Printed Rolls",
    copy: "Use approved artwork, logos, QR codes, or campaign content for bank and financial service networks.",
    href: "/products/thermal-paper-rolls/custom-printed-rolls",
  },
];

export default function AtmBankingRollPage({ roll, faqs }: AtmBankingRollPageProps) {
  const featuredSpecs = [
    ["Image life", "Up to 7 years"],
    ["Feed control", "Anti-static standard"],
    ["Print speed", "Up to 300mm/sec"],
    ["MOQ", roll.moq],
  ];

  return (
    <main id="main-content" className="bg-[#fbfaf6] pt-[64px] md:pt-[92px]">
      <section className="border-b border-[#203531] bg-[#101b19] text-white">
        <div className="container-site py-4">
          <nav className="flex items-center gap-1.5 text-xs font-semibold text-[#aebbb5]" aria-label="Breadcrumb">
            <Link href="/products" className="transition hover:text-white">Products</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/products/thermal-paper-rolls" className="transition hover:text-white">Thermal paper rolls</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">ATM and bank receipt rolls</span>
          </nav>
        </div>

        <div className="container-site grid gap-8 pb-10 pt-5 md:grid-cols-[minmax(0,0.96fr)_minmax(300px,0.72fr)] md:items-center md:gap-10 lg:pb-16 lg:pt-10">
          <div>
            <p className="text-xs font-bold uppercase text-[#d6b273]">Archival-grade ATM and bank receipt paper</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.03] text-white sm:text-5xl lg:text-6xl">
              ATM receipt rolls engineered for uptime and traceable records.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#c7d0cb]">
              BPA-free thermal paper for Diebold Nixdorf, NCR, Wincor, Hyosung, teller terminals, and financial kiosks, with anti-static feed control and optional regulatory back print.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#9c661d] px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#7d4f16]">
                Request an ATM Roll Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/samples" className="inline-flex min-h-12 items-center justify-center border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10">
                Request Samples
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-px bg-white/15 lg:grid-cols-4">
              {featuredSpecs.map(([label, value]) => (
                <div key={label} className="bg-[#101b19] p-3 sm:p-4">
                  <p className="text-xs font-semibold text-[#87918c]">{label}</p>
                  <p className="mt-2 text-sm font-bold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden border border-white/15 bg-[#0b1513]">
            <Image
              src="/images/thermal-rolls-product.jpg"
              alt="ATM and bank receipt thermal paper rolls"
              fill
              fetchPriority="high"
              loading="eager"
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-[#101b19]/88 p-5 text-white backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Landmark className="h-5 w-5 text-[#d6b273]" />
                <p className="text-sm font-bold">Built for financial terminals and controlled document workflows.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="Product page sections" className="sticky top-[64px] z-40 border-b border-[#ded6c8] bg-[#fbfaf6]/95 backdrop-blur-md lg:top-[88px]">
        <div className="container-site flex gap-6 overflow-x-auto py-3 text-sm font-semibold text-[#4f5f5a]">
          {[
            ["Overview", "#overview"],
            ["Specifications", "#specifications"],
            ["Compatibility", "#compatibility"],
            ["Quality", "#quality"],
            ["Documents", "#documents"],
            ["Related products", "#related-products"],
            ["FAQ", "#faq"],
          ].map(([label, href]) => (
            <a key={href} href={href} className="shrink-0 transition hover:text-[#0f5f5c]">{label}</a>
          ))}
        </div>
      </nav>

      <section id="overview" aria-labelledby="atm-roll-definition" className="border-b border-[#ded6c8] bg-[#fbfaf6] py-12 md:py-14">
        <div className="container-site grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase text-[#0f5f5c]">Quick answer</p>
            <h2 id="atm-roll-definition" className="mt-4 text-3xl font-bold text-[#14211f] md:text-4xl">What are ATM receipt paper rolls?</h2>
          </div>
          <div>
            <p className="text-base leading-8 text-[#33413e]">
              ATM receipt paper rolls are thermal paper rolls made for automated teller machines, bank counters, financial kiosks, and other transaction terminals. Compared with general receipt paper, buyers typically specify terminal fit, anti-static performance, image retention, controlled back print, and traceable compliance files.
            </p>
            <dl className="mt-7 grid gap-px bg-[#ded6c8] sm:grid-cols-3">
              <div className="bg-white p-4">
                <dt className="text-xs font-semibold text-[#87918c]">Common widths</dt>
                <dd className="mt-2 text-sm font-bold text-[#14211f]">57mm, 80mm, 82.5mm</dd>
              </div>
              <div className="bg-white p-4">
                <dt className="text-xs font-semibold text-[#87918c]">Typical buyers</dt>
                <dd className="mt-2 text-sm font-bold text-[#14211f]">Banks, ATM service firms, kiosk operators</dd>
              </div>
              <div className="bg-white p-4">
                <dt className="text-xs font-semibold text-[#87918c]">Key checks</dt>
                <dd className="mt-2 text-sm font-bold text-[#14211f]">Fit, image life, static control, back print</dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-[#0f5f5c]">
              <Link href="/industries/banking-finance" className="inline-flex items-center gap-2 hover:underline">Banking industry solutions <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/compliance/certificates" className="inline-flex items-center gap-2 hover:underline">Review compliance files <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/products/thermal-paper-rolls/back-print-thermal-rolls" className="inline-flex items-center gap-2 hover:underline">ATM back-print options <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#ded6c8] bg-white py-14 md:py-16">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1fr] lg:items-end">
            <h2 className="text-3xl font-bold text-[#14211f] md:text-4xl">Approve performance, fit, and controlled content.</h2>
            <p className="max-w-2xl text-base leading-8 text-[#4f5f5a] lg:justify-self-end">
              Banking paper is not only a roll-size purchase. The terminal mechanism, retention period, disclosure copy, and document trail all affect approval and repeat-order stability.
            </p>
          </div>
          <div className="mt-10 grid gap-px bg-[#ded6c8] lg:grid-cols-3">
            {APPROVAL_POINTS.map((point) => (
              <article key={point.label} className="bg-[#fbfaf6] p-6 md:p-8">
                <p className="text-xs font-bold uppercase text-[#0f5f5c]">{point.label}</p>
                <h3 className="mt-4 text-xl font-bold text-[#14211f]">{point.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#4f5f5a]">{point.copy}</p>
              </article>
            ))}
          </div>
          <figure className="relative mt-8 aspect-[16/7] overflow-hidden bg-[#101b19]">
            <Image
              src="/images/factory-overview.jpg"
              alt="Thermal paper converting and inspection equipment in the production facility"
              fill
              sizes="(min-width: 1024px) 80vw, 100vw"
              className="object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-[#101b19]/88 px-5 py-4 text-sm font-semibold text-white backdrop-blur-sm">
              Converting, inspection, and lot-control workflow for repeat orders.
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="specifications" className="bg-[#f4f0e8] py-14 md:py-16">
        <div className="container-site grid gap-12 lg:grid-cols-[0.72fr_1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-3xl font-bold text-[#14211f] md:text-4xl">ATM roll specifications</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#4f5f5a]">
              Share the terminal model before sampling. We will match the width, OD, core, winding, paper grade, sensitivity, and back-print requirement to the mechanism.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {roll.applications.map((application) => (
                <span key={application} className="border border-[#c8bcaa] bg-[#fbfaf6] px-3 py-2 text-xs font-semibold text-[#33413e]">{application}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="grid gap-px bg-[#c8bcaa] sm:grid-cols-2">
              {roll.sizes.map((size, index) => (
                <div
                  key={size}
                  className={`bg-[#fbfaf6] px-5 py-4 text-sm font-bold text-[#14211f] ${index === roll.sizes.length - 1 && roll.sizes.length % 2 !== 0 ? "sm:col-span-2" : ""}`}
                >
                  {size}
                </div>
              ))}
            </div>
            <dl className="mt-8 border-t border-[#c8bcaa]">
              {Object.entries(roll.specifications).filter((entry): entry is [string, string] => Boolean(entry[1])).map(([label, value]) => (
                <div key={label} className="grid gap-2 border-b border-[#c8bcaa] py-4 sm:grid-cols-[0.8fr_1.2fr]">
                  <dt className="text-sm font-semibold text-[#87918c]">{label}</dt>
                  <dd className="text-sm font-bold text-[#14211f]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="compatibility" className="border-b border-[#ded6c8] bg-white py-14 md:py-16">
        <div className="container-site grid gap-12 lg:grid-cols-[0.78fr_1fr]">
          <div>
            <p className="text-xs font-bold uppercase text-[#0f5f5c]">Terminal compatibility</p>
            <h2 className="mt-4 text-3xl font-bold text-[#14211f] md:text-4xl">Check the machine model before selecting a roll.</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#4f5f5a]">
              Model families are a starting point. The final sample is checked against your installed mechanism, firmware environment, and receipt specification.
            </p>
          </div>
          <div className="border border-[#ded6c8] bg-[#fbfaf6] px-5 md:px-7">
            {COMPATIBILITY.map(([brand, models]) => (
              <div key={brand} className="grid gap-2 border-b border-[#ded6c8] py-5 last:border-b-0 sm:grid-cols-[0.72fr_1fr] sm:items-center">
                <p className="text-lg font-bold text-[#14211f]">{brand}</p>
                <p className="text-sm leading-6 text-[#4f5f5a]">{models}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="quality" className="border-b border-[#ded6c8] bg-white py-14 md:py-16">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-end">
            <h2 className="text-3xl font-bold text-[#14211f] md:text-4xl">Quality controls</h2>
            <p className="max-w-2xl text-base leading-8 text-[#4f5f5a] lg:justify-self-end">Each control is tied to a buyer-visible risk, so the approved sample and repeat order stay on the same basis.</p>
          </div>
          <div className="mt-10 border-t border-[#ded6c8]">
            {CONTROL_MAP.map(([risk, control], index) => (
              <article key={risk} className="grid gap-3 border-b border-[#ded6c8] py-5 sm:grid-cols-[56px_0.55fr_1fr] sm:items-center">
                <span className="text-sm font-bold tabular-nums text-[#87918c]">0{index + 1}</span>
                <h3 className="text-xl font-bold text-[#14211f]">{risk}</h3>
                <p className="text-sm leading-7 text-[#4f5f5a]">{control}</p>
              </article>
            ))}
          </div>
          <figure className="relative mt-8 aspect-[16/6] overflow-hidden bg-[#101b19]">
            <Image
              src="/uploads/1776487771203_32b6c697519b48fc814b3a4712323de2.jpg"
              alt="Export cartons of thermal paper rolls secured on pallets outside the factory"
              fill
              sizes="(min-width: 1024px) 80vw, 100vw"
              className="object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-[#101b19]/88 px-5 py-4 text-sm font-semibold text-white backdrop-blur-sm">
              Export cartons, pallet identification, and shipment preparation.
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="documents" className="bg-[#f4f0e8] py-14 md:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-[0.9fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <FileCheck2 className="h-6 w-6 text-[#0f5f5c]" />
              <h2 className="text-3xl font-bold text-[#14211f] md:text-4xl">Buyer review files</h2>
            </div>
            <div className="relative mt-7 aspect-[4/3] overflow-hidden border border-[#c8bcaa] bg-white">
              <Image
                src="/images/compliance-certifications.jpg"
                alt="ISO 9001, BPA-free, REACH, and FSC compliance documentation"
                fill
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="mt-7 grid gap-px bg-[#c8bcaa] sm:grid-cols-2">
              {DOCUMENTS.map((document) => (
                <div key={document} className="flex items-center gap-3 bg-[#fbfaf6] p-4 text-sm font-semibold text-[#33413e]">
                  <Check className="h-4 w-4 shrink-0 text-[#0f5f5c]" />{document}
                </div>
              ))}
            </div>
          </div>
          <div className="border border-[#c8bcaa] bg-[#fbfaf6] p-6 md:p-8">
            <h2 className="text-3xl font-bold text-[#14211f]">ATM roll RFQ checklist</h2>
            <ol className="mt-6 border-t border-[#ded6c8]">
              {RFQ_FIELDS.map((field, index) => (
                <li key={field} className="grid grid-cols-[42px_1fr] gap-3 border-b border-[#ded6c8] py-4">
                  <span className="text-sm font-bold tabular-nums text-[#b9822f]">0{index + 1}</span>
                  <span className="text-sm font-semibold leading-6 text-[#33413e]">{field}</span>
                </li>
              ))}
            </ol>
            <Link href="/quote" className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 bg-[#14211f] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#0f5f5c]">
              Start Your RFQ <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section id="related-products" className="border-b border-[#ded6c8] bg-white py-14 md:py-16">
        <div className="container-site">
          <div className="grid gap-8 border-b border-[#ded6c8] pb-9 lg:grid-cols-[0.7fr_1fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase text-[#0f5f5c]">Related product programme</p>
              <h2 className="mt-4 text-3xl font-bold text-[#14211f] md:text-4xl">Related thermal paper products</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#4f5f5a] lg:justify-self-end">
              Combine adjacent terminal and printed-roll requirements under one specification, document, packing, and shipment review.
            </p>
          </div>

          <div className="grid border-l border-t border-[#ded6c8] sm:grid-cols-2 lg:grid-cols-4">
            {RECOMMENDED_PRODUCTS.map((product, index) => (
              <Link
                key={product.href}
                href={product.href}
                className="group flex min-h-[230px] flex-col border-b border-r border-[#ded6c8] bg-[#fbfaf6] p-6 transition hover:bg-[#f4f0e8]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-bold tabular-nums text-[#87918c]">0{index + 1}</span>
                  <ArrowRight className="h-4 w-4 text-[#0f5f5c] transition group-hover:translate-x-1" />
                </div>
                <div className="mt-auto pt-12">
                  <p className="text-xs font-bold uppercase text-[#b9822f]">{product.label}</p>
                  <h3 className="mt-3 text-xl font-bold text-[#14211f] transition group-hover:text-[#0f5f5c]">{product.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#4f5f5a]">{product.copy}</p>
                </div>
              </Link>
            ))}
          </div>

          <Link href="/products/thermal-paper-rolls" className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#0f5f5c] hover:underline">
            View all thermal paper rolls <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section id="faq" className="bg-[#fbfaf6] py-14 md:py-16">
        <div className="container-site grid gap-12 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <ShieldCheck className="h-7 w-7 text-[#0f5f5c]" />
            <h2 className="mt-5 text-3xl font-bold text-[#14211f] md:text-4xl">Frequently asked questions</h2>
          </div>
          <div className="border-t border-[#ded6c8]">
            {faqs.map((faq, index) => (
              <details key={faq.question} className="group border-b border-[#ded6c8]" open={index === 0}>
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-left marker:content-none">
                  <span className="text-base font-bold leading-6 text-[#14211f]">{faq.question}</span>
                  <ChevronRight className="h-5 w-5 shrink-0 text-[#0f5f5c] transition-transform duration-200 group-open:rotate-90" aria-hidden="true" />
                </summary>
                <p className="max-w-3xl pb-6 pr-10 text-sm leading-7 text-[#4f5f5a]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#9c661d] py-14 text-white">
        <div className="container-site grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-3xl font-bold text-white">Send the terminal model and retention requirement.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85">We will return the roll specification, sample plan, document pack, back-print route, packing recommendation, and shipping terms.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/quote" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#14211f] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#0b1513]">
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/samples" className="inline-flex min-h-12 items-center justify-center border border-white/55 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
              Request Samples
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
