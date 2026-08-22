import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AboutReferenceHeader from "@/components/layout/AboutReferenceHeader";
import Footer from "@/components/layout/Footer";
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
    "Learn how Xi'an Zhi Xin Paper Co., Ltd. developed from a 2006 predecessor business into a thermal paper converting and international supply partner.",
  path: "/about",
});

const history = [
  [
    "June 1, 2006",
    "Trade business begins",
    "Zhixin Paper started with one person and no factory, learning customer requirements directly through the market before building manufacturing capability.",
    "/images/factory-overview.jpg",
  ],
  [
    "November 2008",
    "First 600 mm slitter",
    "In a 200㎡ workshop, the first 600 mm thermal paper slitting machine marked the practical transition from trade to production.",
    "/images/hero-bg.jpg",
  ],
  [
    "2009–2010",
    "NCR and workshop expansion",
    "The first NCR computer paper line was installed, the workshop grew from 400㎡ to 800㎡, and the operation reached four thermal slitters and two NCR lines.",
    "/images/compliance-certifications.jpg",
  ],
  [
    "2011–2017",
    "Manufacturing foundation",
    "Zhixin moved into a 1,800㎡ facility, installed four-color full-rotary NCR printing, expanded to six thermal lines, and began thermal label production.",
    "/images/thermal-rolls-product.jpg",
  ],
  [
    "2018",
    "Factory upgrade for projects",
    "An independent factory, automatic thermal-roll packing, equipment upgrades, and improved safety standards strengthened the supply base for larger projects.",
    "/images/factory-overview.jpg",
  ],
  [
    "2022–2025",
    "International capability rebuilt",
    "The team rebuilt export knowledge and customer communication from the ground up, creating the service route used for international cooperation today.",
    "/images/thermal-labels-product.jpg",
  ],
  [
    "2026",
    "Stable long-term supply",
    "Zhixin combines a real factory operation, mature production capability, and international communication to support stable long-term supply for global customers.",
    "/images/factory-overview.jpg",
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
    "/images/thermal-rolls-product.jpg",
    Factory,
  ],
  [
    "Thermal label production",
    "Label formats can be reviewed alongside material, adhesive, liner, artwork, and barcode requirements.",
    "/images/thermal-labels-product.jpg",
    Boxes,
  ],
  [
    "NCR paper and printing",
    "The company's development includes NCR lines and four-color full-rotary NCR printing capability.",
    "/images/hero-bg.jpg",
    Printer,
  ],
  [
    "Quality and export review",
    "Carton marks, pallet plans, destination, and shipping terms are clarified before the quote is finalized.",
    "/images/compliance-certifications.jpg",
    FileCheck2,
  ],
] as const;

const team = [
  [
    "Production coordination",
    "Specification, capacity, and packing checks are aligned before a quotation is released.",
    "/images/factory-overview.jpg",
  ],
  [
    "Quality review",
    "Inspection points and requested documents are matched to the paper grade and destination.",
    "/images/compliance-certifications.jpg",
  ],
  [
    "Export service",
    "Product, sample, freight, and document questions stay connected through the inquiry route.",
    "/images/thermal-labels-product.jpg",
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
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] bg-[#dce8f5] ${className}`}
    >
      <Image
        src={src}
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
      <AboutReferenceHeader />
      <ContactRail />
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <main id="main-content" className="bg-white pt-[76px] text-[#0d1b35]">
        <section className="relative overflow-hidden bg-[#0d1b35] text-white">
          <Image
            src="/images/hero-bg.jpg"
            alt="Thermal paper converting equipment in a production facility"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-65"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,27,53,0.92),rgba(13,27,53,0.58),rgba(13,27,53,0.2))]" />
          <div className="about-shell relative flex min-h-[520px] flex-col justify-center py-20 md:min-h-[610px] md:py-24">
            <nav
              className="absolute left-4 top-7 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70 sm:left-6 lg:left-8"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span>/</span>
              <span className="text-white">About Us</span>
            </nav>
            <div className="max-w-2xl">
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-[#8bb9ff]">
                Established June 1, 2006
              </p>
              <h1 className="!text-white text-5xl font-extrabold leading-[1.04] tracking-normal md:text-7xl">
                About Us
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/85 md:text-lg">
                Xi&apos;an Zhi Xin Paper Co., Ltd. began with one person and a
                trading business, then built manufacturing capability from the
                first 600 mm slitter in November 2008 to a mature paper, label,
                NCR, and international supply operation.
              </p>
              <Link
                href="/quote"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#1677ff] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(22,119,255,0.35)] transition hover:bg-[#0d65df]"
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
          <div className="flex min-w-max items-center justify-around gap-20 px-8 text-white">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-xl font-extrabold tracking-[0.22em] opacity-95"
              >
                <span className="h-3 w-10 bg-white" aria-hidden="true" />
                <span>ZHIXIN PAPER</span>
              </div>
            ))}
          </div>
        </div>

        <section className="about-shell py-20 md:py-28">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1677ff]">
                About Us
              </p>
              <h2 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">
                Company Profile
              </h2>
            </div>
            <Link
              href="/quote"
              className="inline-flex items-center gap-3 self-start rounded-full bg-[#1677ff] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#0d65df] md:self-auto"
            >
              Send Your Inquiry Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-10 border-t border-[#dbe5f3] pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div className="text-base leading-8 text-[#44536b]">
              <p className="text-xl font-bold leading-8 text-[#0d1b35]">
                Zhixin Paper combines market understanding with direct
                converting experience.
              </p>
              <p className="mt-5">
                The company started with customer-facing trade, then added
                slitting, winding, printing, labels, packing, and factory
                investment in stages. That history matters to buyers because
                every quotation still needs to connect the paper grade with the
                printer, application, packing plan, destination, and
                repeat-order expectations.
              </p>
              <Link
                href="#history"
                className="mt-5 inline-flex items-center gap-2 font-bold text-[#1677ff] hover:underline"
              >
                Read More <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {[
                ["June 1, 2006", "Trade business began"],
                ["November 2008", "First 600 mm slitter"],
                ["2011–2017", "Manufacturing foundation"],
                ["2026", "Stable long-term supply"],
              ].map(([value, label]) => (
                <div
                  key={value}
                  className="flex items-center gap-5 border-l-4 border-[#1677ff] bg-[#f3f7fd] px-5 py-4"
                >
                  <span className="text-2xl font-extrabold text-[#1677ff]">
                    {value}
                  </span>
                  <span className="text-sm font-semibold text-[#44536b]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="about-company-video"
          className="about-shell pb-20 md:pb-28"
        >
          <div className="relative aspect-[16/7] overflow-hidden rounded-[28px] bg-[#0d1b35]">
            <Image
              src="/images/factory-overview.jpg"
              alt="Zhixin Paper factory overview"
              fill
              sizes="100vw"
              className="object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-[#0d1b35]/25" />
            <Link
              href="/factory"
              aria-label="Open factory capability page"
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1677ff] shadow-xl transition hover:scale-105"
            >
              <Play className="ml-1 h-6 w-6 fill-current" />
            </Link>
          </div>
        </section>

        <section className="bg-[#f3f7fd] py-20 md:py-28">
          <div className="about-shell grid gap-12 lg:grid-cols-2 lg:gap-20">
            <ImagePanel
              src="/images/thermal-rolls-product.jpg"
              alt="Thermal paper rolls"
              className="min-h-[360px] lg:min-h-[520px]"
            />
            <div className="flex flex-col justify-center">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1677ff]">
                Our approach
              </p>
              <h2 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">
                Company Profile
              </h2>
              <p className="mt-6 text-base leading-8 text-[#44536b]">
                Years of supply development have made specification-led review
                part of the work. We connect material, size, core, winding,
                printing, packing, destination, and documents before the order
                enters production.
              </p>
              <div className="mt-8 grid gap-7 sm:grid-cols-2">
                <div>
                  <h3 className="text-xl font-bold">Vision</h3>
                  <p className="mt-2 text-sm leading-7 text-[#5d6b82]">
                    Make paper procurement easier to qualify with clear, useful
                    information.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Mission</h3>
                  <p className="mt-2 text-sm leading-7 text-[#5d6b82]">
                    Turn requirements into checked product and supply decisions.
                  </p>
                </div>
              </div>
              <Link
                href="/quote"
                className="mt-9 inline-flex items-center gap-3 self-start rounded-full bg-[#1677ff] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#0d65df]"
              >
                Send Your Inquiry Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="about-shell py-20 md:py-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["200㎡", "First workshop in 2008"],
              ["600 mm", "First thermal slitter"],
              ["1,800㎡", "2011 manufacturing facility"],
              ["6", "Thermal lines by 2017"],
            ].map(([value, label]) => (
              <div key={value} className="border-t-2 border-[#1677ff] pt-5">
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

        <section className="bg-[#f3f7fd] py-20 md:py-28">
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

        <section
          id="history"
          className="scroll-mt-24 bg-[#0d1b35] py-20 text-white md:py-28"
        >
          <div className="about-shell">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8bb9ff]">
                History
              </p>
              <h2 className="mt-3 text-4xl font-extrabold md:text-5xl">
                Company History
              </h2>
              <p className="mt-5 text-base leading-8 text-white/70">
                The development record explains how each capability was added
                and what it changed for buyers.
              </p>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {history.map(([year, title, text, image], index) => (
                <article
                  key={year}
                  className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04]"
                >
                  <div className="relative aspect-[4/2]">
                    <Image
                      src={image}
                      alt={`${year} Zhixin Paper history`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-2xl font-extrabold text-[#8bb9ff]">
                      {year}
                    </div>
                    <div className="mt-3 text-lg font-bold">{title}</div>
                    <p className="mt-3 text-sm leading-7 text-white/65">
                      {text}
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#8bb9ff]">
                      <CheckCircle2 className="h-4 w-4" />
                      Why it matters to buyers
                    </div>
                    <div className="mt-3 text-xs font-bold uppercase tracking-[0.15em] text-white/35">
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
              {equipment.map(([title, text, image, Icon], index) => (
                <article
                  key={title}
                  className="overflow-hidden rounded-2xl border border-[#dbe5f3] bg-white"
                >
                  <div className="relative aspect-[4/2.3]">
                    <Image
                      src={image}
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
              {team.map(([title, text, image]) => (
                <article
                  key={title}
                  className="overflow-hidden rounded-2xl bg-white"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={image}
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
                "/samples",
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
              action="/quote"
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
              href="/quote"
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
