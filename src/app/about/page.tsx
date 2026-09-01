import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SlotImage from "@/components/ui/SlotImage";
import { breadcrumbSchema, buildMetadata, organizationSchema } from "@/lib/seo";
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  Factory,
  FileCheck2,
  Mail,
  MessageCircle,
  PackageCheck,
  Phone,
  Play,
  Printer,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "About Zhixin Paper Manufacturing and Supply",
  description:
    "Learn how Zhixin Paper grew from a one-person trading business founded on June 1, 2006 into a thermal paper, label, NCR form, and international supply partner.",
  path: "/about",
});

const history = [
  [
    "June 1, 2006",
    "Trade business begins",
    "Zhixin Paper started with one person and no factory, learning customer requirements directly through the market before building manufacturing capability.",
    "about.history.2006",
  ],
  [
    "November 2009",
    "First 600 mm slitter",
    "In a 200㎡ workshop, the first 600 mm thermal paper slitting machine marked the practical transition from trade to production.",
    "about.history.2009",
  ],
  [
    "2009–2010",
    "NCR and workshop expansion",
    "The first NCR computer paper line was installed, the workshop grew from 400㎡ to 800㎡, and the operation reached four thermal slitters and two NCR lines.",
    "about.history.2009-2010",
  ],
  [
    "2011–2017",
    "Manufacturing foundation",
    "Zhixin moved into a 1,800㎡ facility, installed four-color full-rotary NCR printing, expanded to six thermal lines, and began thermal label production.",
    "about.history.2011-2017",
  ],
  [
    "2018",
    "Factory upgrade for projects",
    "An independent factory, automatic thermal-roll packing, equipment upgrades, and improved safety standards strengthened the supply base for larger projects.",
    "about.history.2018",
  ],
  [
    "2022–2025",
    "International capability rebuilt",
    "The team rebuilt export knowledge and customer communication from the ground up, creating the service route used for international cooperation today.",
    "about.history.2022-2025",
  ],
  [
    "2026",
    "Stable long-term supply",
    "Zhixin combines a real factory operation, mature production capability, and international communication to support stable long-term supply for global customers.",
    "about.history.2026",
  ],
] as const;

const reasons = [
  [
    Factory,
    "Converting in context",
    "Review roll, label, printing, packing, and factory requirements together before a bulk program.",
  ],
  [
    FileCheck2,
    "Specification discipline",
    "Dimensions, cores, winding, artwork, carton marks, and inspection points are recorded as part of the order.",
  ],
  [
    ShieldCheck,
    "Evidence before promise",
    "Product fit, document needs, production plans, and delivery expectations are reviewed against the actual project.",
  ],
  [
    PackageCheck,
    "Built for repeat orders",
    "Approved specifications and packing references make the next order easier to quote and check.",
  ],
  [
    Users,
    "Buyer feedback matters",
    "Customer requirements have shaped the move from trading to converting, labels, print, and export service.",
  ],
  [
    Truck,
    "International service route",
    "Destination, application, shipping terms, and documentation are considered as part of qualification.",
  ],
] as const;

const equipment = [
  [
    "Thermal paper converting",
    "Roll slitting, winding, core selection, and finished-roll packing for printer and POS applications.",
    "about.equipment.thermal-paper",
    Factory,
  ],
  [
    "Thermal label production",
    "Label formats can be reviewed alongside material, adhesive, liner, artwork, and barcode requirements.",
    "about.equipment.thermal-label",
    Boxes,
  ],
  [
    "NCR paper and printing",
    "The company's development includes NCR lines and four-color full-rotary NCR printing capability.",
    "about.equipment.ncr",
    Printer,
  ],
  [
    "Quality and export review",
    "Carton marks, pallet plans, destination, and shipping terms are clarified before the quote is finalized.",
    "about.equipment.quality",
    FileCheck2,
  ],
] as const;

const team = [
  [
    "Production coordination",
    "Specification, capacity, and packing checks are aligned before a quotation is released.",
    "about.team.production",
  ],
  [
    "Quality review",
    "Inspection points and requested documents are matched to the paper grade and destination.",
    "about.team.quality",
  ],
  [
    "Export service",
    "Product, sample, freight, and document questions stay connected through the inquiry route.",
    "about.team.export",
  ],
  [
    "Artwork and labels",
    "Artwork, barcode, adhesive, liner, and label format checks stay visible before approval.",
    "about.team.artwork",
  ],
  [
    "Packing and documents",
    "Carton marks, pallet plans, destination, and requested files are checked with the order.",
    "about.team.packing",
  ],
  [
    "Customer support",
    "One contact route keeps product fit, samples, freight, and follow-up questions together.",
    "about.team.support",
  ],
] as const;

const processStories = [
  [
    "Material and converting",
    "Match grade, size, core, winding, and packing to the printer or application before production.",
    "about.process.material",
  ],
  [
    "Export coordination",
    "Keep product, sample, freight, destination, and document questions connected in one project record.",
    "about.process.export",
  ],
] as const;

function ContactRail() {
  return (
    <aside
      className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col overflow-hidden rounded-l-xl border border-r-0 border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,27,48,0.14)] md:flex"
      aria-label="Contact shortcuts"
    >
      <a
        href="https://wa.me/8618792771927"
        className="flex h-12 w-12 items-center justify-center border-b border-slate-100 text-[#1677ff] transition hover:bg-[#edf5ff]"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
      <a
        href="tel:+8618792771927"
        className="flex h-12 w-12 items-center justify-center border-b border-slate-100 text-[#1677ff] transition hover:bg-[#edf5ff]"
        aria-label="Call Zhixin Paper"
      >
        <Phone className="h-5 w-5" />
      </a>
      <a
        href="mailto:sales@zhixinpaper.com"
        className="flex h-12 w-12 items-center justify-center text-[#1677ff] transition hover:bg-[#edf5ff]"
        aria-label="Email Zhixin Paper"
      >
        <Mail className="h-5 w-5" />
      </a>
    </aside>
  );
}

function ImagePanel({
  slotKey,
  alt,
  className = "",
}: {
  slotKey: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] bg-[#dce8f5] ${className}`}
    >
      <SlotImage
        slotKey={slotKey}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition duration-500 hover:scale-[1.03]"
      />
    </div>
  );
}

export default function AboutPage() {
  const jsonLd = [
    organizationSchema(),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "About Us", url: "/about" },
    ]),
  ];
  return (
    <>
      <Header />
      <ContactRail />
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <main id="main-content" className="bg-white pt-[64px] text-[#0d1b35] md:pt-[92px]">
        <section className="relative overflow-hidden bg-[#0d1b35] text-white">
          <SlotImage
            slotKey="about.banner"
            alt="Zhixin Paper production campus and factory capability"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,27,53,0.82),rgba(13,27,53,0.45),rgba(13,27,53,0.08))]" />
          <div className="about-shell relative flex min-h-[380px] flex-col justify-center py-16 md:min-h-[380px] md:py-16">
            <nav
              className="sr-only"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span>/</span>
              <span className="text-white">About Us</span>
            </nav>
            <div className="max-w-xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#b8d3ff]">
                Established June 1, 2006
              </p>
              <h1 className="!text-white text-5xl font-extrabold leading-[1.04] tracking-normal md:text-6xl">
                About Us
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-white/90 md:text-lg">
                Zhixin Paper began on June 1, 2006 with one person and a trading
                business. A first 600 mm slitter in a 200㎡ workshop in November
                2009 marked the move into manufacturing; today we connect
                thermal rolls, labels, NCR forms, and export support for repeat supply.
              </p>
              <Link
                href="/contact?mode=quote#contact-form"
                className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#1677ff] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(22,119,255,0.35)] transition hover:bg-[#0d65df]"
              >
                Get a Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <div
          className="overflow-hidden bg-[#1677ff] py-5"
          aria-label="Zhixin Paper brand"
        >
          <div className="flex min-w-max items-center justify-around gap-10 px-4 md:gap-16 md:px-8">
            {Array.from({ length: 8 }, (_, item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-xl font-extrabold tracking-[0.14em] text-white"
              >
                <span className="flex h-11 w-11 items-center justify-center bg-white p-1">
                  <Image
                    src="/images/logo.png"
                    alt="Zhixin Paper"
                    width={40}
                    height={40}
                    className="h-9 w-9 object-contain"
                  />
                </span>
                <span>ZHIXIN PAPER</span>
              </div>
            ))}
          </div>
        </div>

        <section className="about-shell py-16 md:py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1677ff]">
                About Us
              </p>
              <h2 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">
                Company Profile
              </h2>
            </div>
            <Link
              href="/contact?mode=quote#contact-form"
              className="inline-flex items-center gap-3 self-start rounded-full bg-[#1677ff] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#0d65df] md:self-auto"
            >
              Send Your Inquiry Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 border-t border-[#dbe5f3] pt-8 text-base leading-8 text-[#44536b]">
            <p className="max-w-6xl text-lg font-bold leading-7 text-[#0d1b35] md:text-xl">
              Zhixin Paper grew by listening to buyers first, then building the
              equipment, processes, and team needed to deliver consistently.
              Every quotation connects the paper grade with the printer, application,
              packing plan, destination, and repeat-order expectations.
            </p>
            <div className="mt-5 grid gap-6 lg:grid-cols-2 lg:gap-14">
              <p>
                The story starts on June 1, 2006 with one person and no factory.
                After the first 600 mm slitter arrived in November 2009, Zhixin
                added slitting, winding, NCR printing, labels, packing, and factory
                investment in stages.
              </p>
              <p>
                Today, buyers can review thermal rolls, labels, NCR forms, and
                export documentation through one inquiry route. We keep the
                specification visible so long-term cooperation gets easier with every order.
              </p>
            </div>
            <Link
              href="#history"
              className="mt-5 inline-flex items-center gap-2 font-bold text-[#1677ff] hover:underline"
            >
              Read More <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section id="about-company-video" className="bg-[#f3f7fd] py-16 md:py-20">
          <div className="about-shell">
            <h2 className="sr-only">Vision and Mission</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1677ff]">Vision</p>
                <p className="mt-3 max-w-xl text-base leading-7 text-[#44536b]">
                  Make paper procurement easier to qualify with clear, useful information.
                </p>
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1677ff]">Mission</p>
                <p className="mt-3 max-w-xl text-base leading-7 text-[#44536b]">
                  Turn requirements into checked product and supply decisions that support long-term cooperation.
                </p>
              </div>
            </div>
            <div className="relative mt-10 aspect-[16/7] overflow-hidden rounded-[8px] bg-[#0d1b35]">
            <SlotImage
              slotKey="about.vision"
              alt="Zhixin Paper factory overview"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#0d1b35]/20" />
            <Link
              href="/factory"
              aria-label="Open factory capability page"
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1677ff] shadow-xl transition hover:scale-105"
            >
              <Play className="ml-1 h-6 w-6 fill-current" />
            </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="about-shell">
            <div className="grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1677ff]">
                  Company Culture
                </p>
                <h2 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">
                  Build confidence in every order
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-8 text-[#44536b] md:justify-self-end">
                For global customers, our working culture centers on clear
                communication, consistent quality, reliable delivery, and
                long-term partnership.
              </p>
            </div>

            <figure className="mt-10 overflow-hidden border border-[#dbe5f3] bg-[#f3f7fd]">
              <SlotImage
                slotKey="about.culture"
                alt="Zhixin Paper company culture display at the workshop entrance"
                width={2048}
                height={1152}
                sizes="100vw"
                className="h-auto w-full"
              />
              <figcaption className="sr-only">
                Zhixin Paper company culture and brand values displayed at the workshop entrance.
              </figcaption>
            </figure>

            <div className="mt-8 grid border-y border-[#dbe5f3] sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["01", "Clear communication", "Responsible pricing and transparent project communication."],
                ["02", "Consistent quality", "Shared standards and attention to the details that affect use."],
                ["03", "Reliable delivery", "Clear milestones and dependable follow-through for each order."],
                ["04", "Long-term partnership", "Continuous improvement built around repeat cooperation."],
              ].map(([number, title, text], index) => (
                <div
                  key={title}
                  className={`py-6 sm:px-6 lg:py-7 ${index > 0 ? "lg:border-l lg:border-[#dbe5f3]" : ""}`}
                >
                  <div className="text-xs font-bold text-[#1677ff]">{number}</div>
                  <h3 className="mt-3 text-lg font-bold text-[#0d1b35]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5d6b82]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f3f7fd] py-16 md:py-20">
          <div className="about-shell grid gap-12 lg:grid-cols-2 lg:gap-20">
            <ImagePanel
              slotKey="about.approach"
              alt="Zhixin Paper production and customer service team"
              className="min-h-[360px] lg:min-h-[520px]"
            />
            <div className="flex flex-col justify-center">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1677ff]">
                Our approach
              </p>
              <h2 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">
                From requirement to repeat supply
              </h2>
              <p className="mt-6 text-base leading-8 text-[#44536b]">
                Our manufacturing path was built in stages, from the first
                slitter to thermal rolls, NCR printing, labels, and export service.
                We connect material, size, core, winding, printing, packing,
                destination, and documents before the order enters production.
              </p>
              <Link
                href="/contact?mode=quote#contact-form"
                className="mt-9 inline-flex items-center gap-3 self-start rounded-full bg-[#1677ff] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#0d65df]"
              >
                Send Your Inquiry Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="about-shell border-y border-[#dbe5f3] py-12 md:py-14">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["200㎡", "First manufacturing workshop in 2009"],
              ["600 mm", "First thermal slitter"],
              ["1,800㎡", "2011 manufacturing facility"],
              ["6", "Thermal lines by 2017"],
            ].map(([value, label]) => (
              <div key={value} className="border-t-2 border-[#1677ff] pt-4">
                <div className="text-3xl font-extrabold text-[#1677ff]">
                  {value}
                </div>
                <div className="mt-2 text-sm font-semibold leading-6 text-[#44536b]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#f3f7fd] py-16 md:py-20">
          <div className="about-shell">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1677ff]">
                Why us
              </p>
              <h2 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">
                Why Choose Us
              </h2>
              <p className="mt-5 text-base leading-8 text-[#44536b]">
                A procurement partner should make the next decision clearer,
                from first specification to repeat shipment.
              </p>
            </div>
            <div className="mt-12 grid gap-px overflow-hidden border border-[#dbe5f3] bg-[#dbe5f3] sm:grid-cols-2 lg:grid-cols-3">
              {reasons.map(([Icon, title, text]) => (
                <div key={title} className="bg-white p-7 md:p-8">
                  <Icon className="h-8 w-8 text-[#1677ff]" aria-hidden="true" />
                  <h3 className="mt-6 text-xl font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#5d6b82]">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="history" className="scroll-mt-24 bg-white py-16 md:py-20">
          <div className="about-shell">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1677ff]">
                History
              </p>
              <h2 className="mt-3 text-4xl font-extrabold md:text-5xl text-[#0d1b35]">
                Company History
              </h2>
              <p className="mt-5 text-base leading-8 text-[#5d6b82]">
                The development record explains how each capability was added
                and what it changed for buyers.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {history.map(([year, title, text, slotKey], index) => (
                <article
                  key={year}
                  className="overflow-hidden border border-[#dbe5f3] bg-[#f3f7fd]"
                >
                  <div className="relative aspect-[4/2]">
                    <SlotImage
                      slotKey={slotKey}
                      alt={`${year} Zhixin Paper history`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover grayscale-[20%]"
                    />
                  </div>
                  <div className="p-5">
                    <div className="text-2xl font-extrabold text-[#1677ff]">
                      {year}
                    </div>
                    <div className="mt-3 text-lg font-bold text-[#0d1b35]">{title}</div>
                    <p className="mt-3 text-sm leading-7 text-[#5d6b82]">
                      {text}
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#1677ff]">
                      <CheckCircle2 className="h-4 w-4" />
                      Why it matters to buyers
                    </div>
                    <div className="mt-3 text-xs font-bold uppercase tracking-[0.15em] text-[#8ba0bb]">
                      Chapter {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-shell py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1677ff]">
                Production Capacity
              </p>
              <h2 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">
                Production Equipment
              </h2>
              <p className="mt-5 text-base leading-8 text-[#44536b]">
                Review the production and qualification context that sits behind
                a project-specific quote.
              </p>
              <Link
                href="/factory"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#1677ff] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#0d65df]"
              >
                View Factory Capability <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {equipment.map(([title, text, slotKey, Icon], index) => (
                <article
                  key={title}
                  className="overflow-hidden rounded-2xl border border-[#dbe5f3] bg-white"
                >
                  <div className="relative aspect-[4/2.3]">
                    <SlotImage
                      slotKey={slotKey}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <Icon className="h-6 w-6 text-[#1677ff]" />
                      <span className="text-xs font-bold text-[#8ba0bb]">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-bold">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#5d6b82]">
                      {text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0d1b35] py-16 text-white md:py-20">
          <div className="about-shell">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8bb9ff]">Process stories</p>
                <h2 className="mt-3 text-4xl font-extrabold md:text-5xl">Production in context</h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-white/70">
                The same review continues from material selection through export documentation and repeat-order control.
              </p>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {processStories.map(([title, text, slotKey]) => (
                <article key={title} className="grid overflow-hidden border border-white/15 bg-white/[0.06] sm:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-52">
                    <SlotImage slotKey={slotKey} alt={title} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/70">{text}</p>
                    <Link href="/contact?mode=quote#contact-form" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8bb9ff]">
                      Start with a specification <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f3f7fd] py-20 md:py-28">
          <div className="about-shell">
            <div className="flex flex-col gap-6 border-b border-[#c7d6ea] pb-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1677ff]">
                  Our Team
                </p>
                <h2 className="mt-3 text-4xl font-extrabold">Our Team</h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-[#5d6b82]">
                Meet the functions behind a reviewed project, from production
                coordination to export service.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {team.map(([title, text, slotKey]) => (
                <article
                  key={title}
                  className="overflow-hidden rounded-2xl bg-white"
                >
                  <div className="relative aspect-[4/3]">
                    <SlotImage
                      slotKey={slotKey}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#5d6b82]">
                      {text}
                    </p>
                    <a
                      href="mailto:sales@zhixinpaper.com"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#1677ff]"
                    >
                      <Mail className="h-4 w-4" />
                      Contact this function
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-shell py-20 md:py-28">
          <div className="flex flex-col gap-6 border-b border-[#dbe5f3] pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1677ff]">
                Resource Center
              </p>
              <h2 className="mt-3 text-4xl font-extrabold">Resource Center</h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#5d6b82]">
              Review capability, quality evidence, and product routes before
              sending a specification.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              [
                Factory,
                "Factory capability",
                "Converting, printing, packing, and factory context.",
                "/factory",
              ],
              [
                FileCheck2,
                "Quality control",
                "Inspection and document route for your project.",
                "/factory/quality-control",
              ],
              [
                Boxes,
                "Product qualification",
                "Share size, core, material, application, and destination.",
                "/contact?mode=samples#contact-form",
              ],
            ].map(([Icon, title, text, href], index) => (
              <Link
                key={title as string}
                href={href as string}
                className="group border border-[#dbe5f3] bg-white p-7 transition hover:-translate-y-1 hover:border-[#1677ff]"
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-7 w-7 text-[#1677ff]" />
                  <span className="text-xs font-bold text-[#8ba0bb]">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold">{title as string}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5d6b82]">
                  {text as string}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#1677ff]">
                  Review route{" "}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10 grid overflow-hidden border border-[#dbe5f3] bg-[#0d1b35] lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div className="relative aspect-[784/556] lg:aspect-auto lg:h-full">
              <SlotImage slotKey="about.catalog" alt="Zhixin Paper product and capability catalog" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
            </div>
            <div className="p-7 text-white md:p-9">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8bb9ff]">Product and capability guide</p>
              <h3 className="mt-3 text-2xl font-extrabold">Review the 2026 catalog route</h3>
              <p className="mt-4 text-sm leading-7 text-white/70">Use the inquiry route to request product, material, packing, and compliance information for your project.</p>
              <Link href="/contact?mode=quote#contact-form" className="mt-6 inline-flex items-center gap-2 bg-[#1677ff] px-5 py-3 text-sm font-bold text-white">
                Request a copy <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="bg-[#0d1b35] py-20 text-white md:py-28"
        >
          <div className="about-shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8bb9ff]">
                Contact us
              </p>
              <h2 className="mt-3 text-4xl font-extrabold md:text-5xl">
                Send Your Inquiry Now
              </h2>
              <p className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-[#8bb9ff]">Specification-led inquiry</p>
              <p className="mt-6 text-base leading-8 text-white/70">
                Tell us what you need to source. The existing quote workflow
                captures product, volume, destination, documents, and delivery
                context for a proper review.
              </p>
              <div className="mt-8 grid gap-4 text-sm text-white/75">
                <a
                  href="mailto:sales@zhixinpaper.com"
                  className="flex items-center gap-3 hover:text-white"
                >
                  <Mail className="h-5 w-5 text-[#8bb9ff]" />
                  sales@zhixinpaper.com
                </a>
                <a
                  href="tel:+8618792771927"
                  className="flex items-center gap-3 hover:text-white"
                >
                  <Phone className="h-5 w-5 text-[#8bb9ff]" />
                  +86 187 9277 1927
                </a>
              </div>
            </div>
            <form
              action="/contact?mode=quote#contact-form"
              method="get"
              className="rounded-2xl bg-white p-6 text-[#0d1b35] sm:p-8"
            >
              <h3 className="text-2xl font-bold">Quick Quote</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold">
                  Your Name
                  <input
                    name="name"
                    required
                    className="mt-2 w-full border border-[#dbe5f3] px-4 py-3 font-normal outline-none focus:border-[#1677ff]"
                  />
                </label>
                <label className="text-sm font-semibold">
                  Your Email
                  <input
                    name="email"
                    type="email"
                    required
                    className="mt-2 w-full border border-[#dbe5f3] px-4 py-3 font-normal outline-none focus:border-[#1677ff]"
                  />
                </label>
                <label className="text-sm font-semibold sm:col-span-2">
                  Phone
                  <input
                    name="phone"
                    className="mt-2 w-full border border-[#dbe5f3] px-4 py-3 font-normal outline-none focus:border-[#1677ff]"
                  />
                </label>
                <label className="text-sm font-semibold sm:col-span-2">
                  Your Requirement
                  <textarea
                    name="requirement"
                    rows={4}
                    required
                    className="mt-2 w-full resize-y border border-[#dbe5f3] px-4 py-3 font-normal outline-none focus:border-[#1677ff]"
                  />
                </label>
                <label className="text-sm font-semibold sm:col-span-2">
                  Supporting file <span className="font-normal text-[#5d6b82]">(optional)</span>
                  <input
                    name="attachment"
                    type="file"
                    className="mt-2 block w-full border border-dashed border-[#b9c9df] px-4 py-3 text-sm font-normal text-[#5d6b82] file:mr-4 file:border-0 file:bg-[#eef4fd] file:px-3 file:py-2 file:font-semibold file:text-[#1677ff]"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#1677ff] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#0d65df]"
              >
                Submit Now <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-3 text-xs text-[#5d6b82]">
                You will continue to the full specification form.
              </p>
            </form>
          </div>
        </section>

        <section className="bg-[#f3f7fd] py-20 md:py-24">
          <div className="about-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1677ff]">
                Next step
              </p>
              <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
                Specification-led review
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#44536b]">
                Share the roll or label requirements, then let the team confirm
                fit, documents, samples, and shipping terms.
              </p>
            </div>
            <Link
              href="/contact?mode=quote#contact-form"
              className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#1677ff] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#0d65df]"
            >
              Start a Project <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
