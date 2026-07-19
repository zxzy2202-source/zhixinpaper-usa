import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  FileCheck2,
  PackageCheck,
  Printer,
  Ruler,
  ScanLine,
} from "lucide-react";

interface RollData {
  name: string;
  subtitle: string;
  moq: string;
  sizes: readonly string[];
  applications: readonly string[];
  features: readonly string[];
  specifications: Record<string, string | undefined>;
}

interface StandardPosRollPageProps {
  roll: RollData;
  faqs: readonly { question: string; answer: string }[];
  regionalNotes: readonly {
    market: string;
    href: string;
    compliance: string;
    sourcing: string;
    shipping: string;
  }[];
}

const RFQ_FIELDS = [
  "Roll width and target length or OD",
  "Core ID, winding direction, and carton count",
  "Printer or payment terminal model",
  "Destination, annual volume, and required documents",
];

const RISKS = [
  { title: "Short rolls", copy: "Measured length, OD, GSM, and carton quantity stay on the approved specification." },
  { title: "Printer jams", copy: "Width tolerance, core ID, winding, dust level, and target printer are checked before sampling." },
  { title: "Fading receipts", copy: "Coating sensitivity, image-life expectation, and storage conditions are documented in the TDS." },
  { title: "Chemical claims", copy: "BPA-free, BPS-free, phenol-free, REACH, and Prop 65 routes are matched to the destination." },
  { title: "Damaged cartons", copy: "Shrink wrap, carton strength, pallet marks, and loading method are agreed before shipment." },
  { title: "Approval delays", copy: "Sample, artwork, test reports, and declarations are collected in one review sequence." },
];

const DOCUMENTS = [
  "BPA-free test report",
  "REACH and RoHS declarations",
  "Prop 65 support files",
  "ISO 9001 certificate",
  "FSC documentation when required",
  "Technical data sheet",
];

export default function StandardPosRollPage({ roll, faqs, regionalNotes }: StandardPosRollPageProps) {
  const featuredSpecs = [
    ["Common widths", "57mm / 80mm"],
    ["Paper grades", "48 / 55 / 60 GSM"],
    ["Core options", "12 / 17 / 25mm"],
    ["Lead time", "10-15 business days"],
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
            <span className="text-white">POS receipt rolls</span>
          </nav>
        </div>

        <div className="container-site grid gap-7 pb-10 pt-5 md:grid-cols-[minmax(0,0.92fr)_minmax(300px,0.72fr)] md:items-center md:gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,0.78fr)] lg:pb-16 lg:pt-10">
          <div>
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.02] text-white sm:text-5xl lg:text-6xl">
              POS receipt paper rolls built for repeat wholesale orders.
            </h1>
            <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-[#d6b273] sm:text-lg sm:leading-8">
              57mm and 80mm thermal rolls for retail, restaurants, supermarkets, payment terminals, and POS distributors.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#c7d0cb] sm:text-base sm:leading-8">
              Confirm real roll length, printer fit, paper grade, compliance files, carton packing, and delivery terms before bulk production.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#9c661d] px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#7d4f16] active:translate-y-px">
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/samples" className="inline-flex min-h-12 items-center justify-center border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10 active:translate-y-px">
                Request Samples
              </Link>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-px bg-white/15 lg:grid-cols-4">
              {featuredSpecs.map(([label, value]) => (
                <div key={label} className="bg-[#101b19] p-3 sm:p-4">
                  <p className="text-xs font-semibold text-[#87918c]">{label}</p>
                  <p className="mt-2 text-sm font-bold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden border border-white/12 bg-[#0b1513]">
            <Image
              src="/images/thermal-rolls-product.jpg"
              alt="57mm and 80mm POS thermal receipt paper rolls"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-[#ded6c8] bg-white py-20 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[0.68fr_1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-3xl font-bold text-[#14211f] md:text-5xl">Lock the specification before comparing price.</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#4f5f5a]">
              Two rolls with the same printed size can differ in real length, paper weight, core, OD, coating, and carton count. Those differences determine landed cost and field performance.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {roll.applications.map((application) => (
                <span key={application} className="border border-[#c8bcaa] bg-[#fbfaf6] px-3 py-2 text-xs font-semibold text-[#33413e]">{application}</span>
              ))}
            </div>
          </div>

          <div>
            <div className="grid gap-px bg-[#ded6c8] sm:grid-cols-2">
              {roll.sizes.map((size, index) => (
                <div key={size} className={`bg-[#fbfaf6] px-5 py-4 text-sm font-bold text-[#14211f] ${index === roll.sizes.length - 1 && roll.sizes.length % 2 !== 0 ? "sm:col-span-2" : ""}`}>{size}</div>
              ))}
            </div>
            <dl className="mt-8 border-t border-[#ded6c8]">
              {Object.entries(roll.specifications).filter((entry): entry is [string, string] => Boolean(entry[1])).map(([label, value]) => (
                <div key={label} className="grid gap-2 border-b border-[#ded6c8] py-4 sm:grid-cols-[0.8fr_1.2fr]">
                  <dt className="text-sm font-semibold text-[#87918c]">{label}</dt>
                  <dd className="text-sm font-bold text-[#14211f]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f0e8] py-20 md:py-24">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-end">
            <h2 className="text-3xl font-bold text-[#14211f] md:text-5xl">Remove the reasons a buyer rejects the second order.</h2>
            <p className="max-w-2xl text-base leading-8 text-[#4f5f5a] lg:justify-self-end">
              The inspection plan follows the complaints distributors actually receive, not a generic quality checklist.
            </p>
          </div>
          <div className="mt-10 border-t border-[#c8bcaa]">
            {RISKS.map((risk, index) => (
              <article key={risk.title} className="grid gap-3 border-b border-[#c8bcaa] py-5 sm:grid-cols-[56px_0.55fr_1fr] sm:items-center">
                <span className="text-sm font-bold tabular-nums text-[#87918c]">0{index + 1}</span>
                <h3 className="text-xl font-bold text-[#14211f]">{risk.title}</h3>
                <p className="text-sm leading-7 text-[#4f5f5a]">{risk.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#101b19] py-20 text-white md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[0.92fr_1fr]">
          <div>
            <h2 className="text-3xl font-bold text-white md:text-5xl">One RFQ, one approval sequence.</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#c7d0cb]">
              Send the details that change the product and landed cost. We return a specification route, sample plan, document list, packing recommendation, and shipping options.
            </p>
            <ol className="mt-8 border-t border-white/15">
              {RFQ_FIELDS.map((field, index) => (
                <li key={field} className="grid grid-cols-[42px_1fr] gap-3 border-b border-white/15 py-4">
                  <span className="text-sm font-bold tabular-nums text-[#d6b273]">0{index + 1}</span>
                  <span className="text-sm font-semibold leading-6 text-white">{field}</span>
                </li>
              ))}
            </ol>
            <Link href="/quote" className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 bg-white px-7 py-3.5 text-sm font-bold text-[#14211f] transition hover:-translate-y-0.5 hover:bg-[#f4f0e8]">
              Start Your RFQ <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="border border-white/15 bg-white/[0.05] p-6 md:p-8">
            <div className="flex items-center gap-3">
              <FileCheck2 className="h-6 w-6 text-[#d6b273]" />
              <h3 className="text-2xl font-bold text-white">Files available for buyer review</h3>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {DOCUMENTS.map((document) => (
                <div key={document} className="flex items-center gap-3 border border-white/10 p-4 text-sm font-semibold text-[#d9dfda]">
                  <Check className="h-4 w-4 shrink-0 text-[#d6b273]" />
                  {document}
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-4 border-t border-white/15 pt-6 sm:grid-cols-2">
              {[
                { icon: Printer, title: "Printer fit", copy: "Epson, Star, Bixolon, Citizen, Clover, Square, and PAX models." },
                { icon: Ruler, title: "Length control", copy: "Measured length, OD, GSM, core, and winding tied to the sample." },
                { icon: ScanLine, title: "Print performance", copy: "Sensitivity, dust, image density, and storage expectations checked." },
                { icon: PackageCheck, title: "Export packing", copy: "Shrink wrap, carton marks, pallet plan, and mixed SKU loading." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-3">
                    <Icon className="mt-1 h-5 w-5 shrink-0 text-[#d6b273]" />
                    <div>
                      <h4 className="font-bold text-white">{item.title}</h4>
                      <p className="mt-2 text-sm leading-6 text-[#aebbb5]">{item.copy}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="container-site mt-12 grid gap-px bg-white/15 md:grid-cols-3">
          {regionalNotes.map((region) => (
            <Link key={region.market} href={region.href} className="group bg-[#101b19] p-6 transition hover:bg-[#142724]">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-bold text-white">{region.market}</h3>
                <ArrowRight className="h-4 w-4 text-[#d6b273] transition group-hover:translate-x-1" />
              </div>
              <p className="mt-4 text-sm leading-6 text-[#aebbb5]">{region.compliance}</p>
              <p className="mt-3 text-xs leading-5 text-[#87918c]">{region.shipping}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-b border-[#ded6c8] bg-white py-14 md:py-16">
        <div className="container-site grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-center">
          <div>
            <p className="section-label">Buyer tools</p>
            <h2 className="mt-3 text-3xl font-bold text-[#14211f] md:text-4xl">Move from a familiar name to an approved specification.</h2>
          </div>
          <div className="grid gap-px bg-[#ded6c8] sm:grid-cols-3">
            {[
              { label: "Roll Size Guide", href: "/blog/thermal-paper-roll-sizes-guide", copy: "Measure width, OD, length, core, GSM, and winding." },
              { label: "Printer Compatibility", href: "/blog/thermal-paper-printer-compatibility-guide", copy: "Qualify the exact POS printer or terminal model." },
              { label: "Payment Terminal Rolls", href: "/products/thermal-paper-rolls/credit-card-terminal-rolls", copy: "Separate compact terminal fleets from counter POS supply." },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="group bg-[#fbfaf6] p-5 transition hover:bg-[#f4f0e8]">
                <h3 className="flex items-center justify-between gap-3 text-base font-bold text-[#14211f]">
                  {item.label}
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#9c661d] transition group-hover:translate-x-1" />
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#4f5f5a]">{item.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf6] py-20 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <h2 className="text-3xl font-bold text-[#14211f] md:text-5xl">Questions buyers ask before ordering.</h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-[#4f5f5a]">
              Confirm these points before requesting samples to shorten internal approval and avoid a second specification round.
            </p>
          </div>
          <div className="border-t border-[#ded6c8]">
            {faqs.map((faq) => (
              <article key={faq.question} className="border-b border-[#ded6c8] py-6">
                <h3 className="text-lg font-bold text-[#14211f]">{faq.question}</h3>
                <p className="mt-3 text-sm leading-7 text-[#4f5f5a]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#9c661d] py-14 text-white">
        <div className="container-site grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-3xl font-bold text-white">Send the roll size, printer, volume, and destination.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85">We will return the specification route, sample plan, document pack, packing recommendation, and shipping terms.</p>
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
  );
}
