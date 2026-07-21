import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  ClipboardCheck,
  PackageCheck,
  Printer,
  Ruler,
} from "lucide-react";

interface RollData {
  sizes: readonly string[];
  applications: readonly string[];
  specifications: Record<string, string | undefined>;
}

interface PaymentTerminalRollPageProps {
  roll: RollData;
  faqs: readonly { question: string; answer: string }[];
}

const TERMINOLOGY = [
  {
    term: "Credit card terminal paper rolls",
    related: "Credit card machine paper, card terminal rolls",
    use: "Buyer language for receipt rolls used in countertop or mobile card-payment terminals.",
  },
  {
    term: "Payment terminal rolls",
    related: "Terminal receipt paper, payment receipt rolls",
    use: "The broad device category. Always add the terminal model and full roll specification.",
  },
  {
    term: "EDC rolls",
    related: "Electronic data capture rolls",
    use: "Common buying language in South and Southeast Asian payment channels.",
  },
  {
    term: "EFTPOS rolls",
    related: "EFTPOS paper, payment machine rolls",
    use: "Common in Australia, New Zealand, and other electronic-payment markets.",
  },
];

const APPROVAL_STEPS = [
  {
    icon: Printer,
    title: "Identify the terminal",
    copy: "Send the brand, exact model, and a photo of the paper compartment or current roll label.",
  },
  {
    icon: Ruler,
    title: "Lock the physical specification",
    copy: "Confirm width, target length or OD, core ID, winding direction, and any end mark.",
  },
  {
    icon: ClipboardCheck,
    title: "Approve paper and print",
    copy: "Match the grade, sensitivity, document needs, and any pre-print or reverse-side content.",
  },
  {
    icon: PackageCheck,
    title: "Confirm the supply program",
    copy: "Set units per box, carton count, mixed-model requirements, destination, and annual volume.",
  },
];

const RFQ_FIELDS = [
  "Terminal brand and exact model",
  "Roll width and target length or outer diameter",
  "Core ID, winding direction, and end-mark requirement",
  "Paper grade, document pack, and image-retention need",
  "Quantity per SKU, pack count, destination, and target date",
];

export default function PaymentTerminalRollPage({ roll, faqs }: PaymentTerminalRollPageProps) {
  return (
    <main id="main-content" className="bg-[#fbfaf6] pt-[64px] md:pt-[92px]">
      <section className="border-b border-[#203531] bg-[#101b19] text-white">
        <div className="container-site py-4">
          <nav className="flex items-center gap-1.5 text-xs font-semibold text-[#aebbb5]" aria-label="Breadcrumb">
            <Link href="/products" className="transition hover:text-white">Products</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/products/thermal-paper-rolls" className="transition hover:text-white">Thermal paper rolls</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">Payment terminal rolls</span>
          </nav>
        </div>

        <div className="container-site grid gap-8 pb-12 pt-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(380px,0.72fr)] lg:items-center lg:pb-16 lg:pt-10">
          <div>
            <p className="text-xs font-bold text-[#d6b273]">Payment terminal consumables</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.04] text-white sm:text-5xl lg:text-6xl">
              Credit Card Terminal Paper Rolls
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-[#d6b273]">
              Compact thermal receipt rolls for payment-terminal distributors, merchant service providers, and multi-model device fleets.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#c7d0cb] sm:text-base">
              A 57mm or 2 1/4-inch name is only a starting point. Confirm the terminal model, roll compartment, OD or length, core, winding, paper grade, and packing before approval.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#9c661d] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#7d4f16]">
                Send Terminal Specification <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/samples" className="inline-flex min-h-12 items-center justify-center border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
                Request Fit Samples
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden border border-white/12 bg-[#0b1513]">
            <Image
              src="/images/thermal-rolls-product.jpg"
              alt="Compact credit card terminal thermal paper rolls"
              fill
              fetchPriority="high"
              loading="eager"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-[#ded6c8] bg-white py-14 md:py-16">
        <div className="container-site grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="section-label">Direct answer</p>
            <h2 className="mt-3 text-3xl font-bold text-[#14211f] md:text-4xl">What paper do credit card terminals use?</h2>
          </div>
          <div>
            <p className="text-base leading-8 text-[#4f5f5a]">
              Most receipt-printing payment terminals use compact direct thermal paper rolls, commonly in the 57mm or 2 1/4-inch width family. Fit is model-specific: maximum OD, nominal length, core ID, winding direction, paper sensitivity, and compartment geometry can differ even between terminals from the same brand.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {roll.applications.map((application) => (
                <span key={application} className="border border-[#c8bcaa] bg-[#fbfaf6] px-3 py-2 text-xs font-semibold text-[#33413e]">{application}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#ded6c8] bg-[#f4f0e8] py-16 md:py-20">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="section-label">Buyer terminology</p>
            <h2 className="mt-3 text-3xl font-bold text-[#14211f] md:text-4xl">Different market names, one qualification task.</h2>
          </div>
          <div className="mt-9 overflow-x-auto border border-[#ded6c8] bg-white">
            <table className="w-full min-w-[820px] text-left">
              <thead className="bg-[#101b19] text-white">
                <tr>
                  <th className="px-5 py-4 text-xs font-bold">Buyer term</th>
                  <th className="px-5 py-4 text-xs font-bold">Related names</th>
                  <th className="px-5 py-4 text-xs font-bold">Qualification note</th>
                </tr>
              </thead>
              <tbody>
                {TERMINOLOGY.map((item, index) => (
                  <tr key={item.term} className={index % 2 === 0 ? "bg-white" : "bg-[#fbfaf6]"}>
                    <th scope="row" className="px-5 py-5 text-sm font-bold text-[#14211f]">{item.term}</th>
                    <td className="px-5 py-5 text-sm text-[#4f5f5a]">{item.related}</td>
                    <td className="px-5 py-5 text-sm leading-7 text-[#4f5f5a]">{item.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-b border-[#ded6c8] bg-white py-16 md:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <p className="section-label">Common formats</p>
            <h2 className="mt-3 text-3xl font-bold text-[#14211f] md:text-4xl">Use the size list to shortlist, not to approve.</h2>
            <p className="mt-5 text-sm leading-7 text-[#4f5f5a]">
              Commercial size names can describe width x OD or width x nominal length. Share the terminal model and current roll before treating any listed format as compatible.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {roll.sizes.map((size) => (
                <span key={size} className="border border-[#c8bcaa] bg-[#fbfaf6] px-4 py-2.5 text-sm font-bold text-[#14211f]">{size}</span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-5 text-sm font-bold text-[#0f5f5c]">
              <Link href="/blog/thermal-paper-roll-sizes-guide" className="inline-flex items-center gap-2 hover:underline">Roll size guide <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/blog/thermal-paper-printer-compatibility-guide" className="inline-flex items-center gap-2 hover:underline">Printer compatibility guide <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
          <dl className="border-t border-[#ded6c8]">
            {Object.entries(roll.specifications).filter((entry): entry is [string, string] => Boolean(entry[1])).map(([label, value]) => (
              <div key={label} className="grid gap-2 border-b border-[#ded6c8] py-4 sm:grid-cols-[0.8fr_1.2fr]">
                <dt className="text-sm font-semibold text-[#87918c]">{label}</dt>
                <dd className="text-sm font-bold text-[#14211f]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-[#101b19] py-16 text-white md:py-20">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-end">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Approve one model first, then control the fleet.</h2>
            <p className="max-w-2xl text-sm leading-7 text-[#c7d0cb] lg:justify-self-end">
              A multi-terminal program needs a model-to-spec matrix. Keep the approved sample, paper grade, carton label, and revision record tied to each SKU.
            </p>
          </div>
          <ol className="mt-10 grid gap-px bg-white/15 md:grid-cols-2 lg:grid-cols-4">
            {APPROVAL_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.title} className="bg-[#101b19] p-6">
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-[#d6b273]" />
                    <span className="text-xs font-bold text-[#87918c]">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#aebbb5]">{step.copy}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="border-b border-[#ded6c8] bg-[#fbfaf6] py-16 md:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[0.72fr_1fr]">
          <div>
            <p className="section-label">Quote preparation</p>
            <h2 className="mt-3 text-3xl font-bold text-[#14211f] md:text-4xl">Send the fields that change fit and landed cost.</h2>
            <Link href="/quote" className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 bg-[#9c661d] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#7d4f16]">
              Start a Terminal Roll RFQ <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="border-t border-[#ded6c8]">
            {RFQ_FIELDS.map((field, index) => (
              <li key={field} className="grid grid-cols-[42px_1fr] gap-3 border-b border-[#ded6c8] py-4">
                <span className="text-sm font-bold text-[#9c661d]">0{index + 1}</span>
                <span className="text-sm font-semibold leading-6 text-[#33413e]">{field}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <p className="section-label">Buyer questions</p>
            <h2 className="mt-3 text-3xl font-bold text-[#14211f] md:text-4xl">Confirm compatibility before volume pricing.</h2>
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
            <h2 className="text-3xl font-bold text-white">Send one terminal model and one current roll.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85">We will identify the missing specification fields and recommend a fit-check sample route.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/samples" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#14211f] px-7 py-3.5 text-sm font-bold text-white">
              Request Samples <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/products/thermal-paper-rolls/standard-pos-rolls" className="inline-flex min-h-12 items-center justify-center border border-white/55 px-7 py-3.5 text-sm font-semibold text-white">
              Compare POS Rolls
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
