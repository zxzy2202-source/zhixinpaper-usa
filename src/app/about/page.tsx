import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import SlotImage from "@/components/ui/SlotImage";
import { breadcrumbSchema, buildMetadata, organizationSchema } from "@/lib/seo";
import {
  ArrowRight,
  Boxes,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Factory,
  FileCheck2,
  Globe2,
  Handshake,
  PackageCheck,
  Printer,
  Scissors,
  ShieldCheck,
  Users,
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "About Zhixin Paper | Manufacturing History Since 2006",
  description:
    "Follow Zhixin Paper's development from a one-person trading business in 2006 to a thermal paper converting and international supply partner.",
  path: "/about",
});

const timeline = [
  {
    id: "2006",
    period: "2006",
    title: "The business begins",
    icon: Handshake,
    change:
      "Zhixin Paper began on June 1, 2006 as a one-person trading business, learning the market through direct customer contact and order coordination.",
    buyerValue:
      "That commercial foundation still shapes how we review specifications: the product must fit the buyer's printer, application, packing plan, and destination.",
  },
  {
    id: "2008",
    period: "2008",
    title: "First converting capability",
    icon: Scissors,
    change:
      "In November 2008, the company installed its first 600 mm thermal paper slitter in a 200 m² workshop and moved from trading into hands-on converting.",
    buyerValue:
      "The change created direct control over roll width, winding, core selection, and finished-roll inspection instead of relying only on third-party processing.",
  },
  {
    id: "2009-2010",
    period: "2009–2010",
    title: "Broader paper converting",
    icon: Printer,
    change:
      "The first NCR computer-paper line was added in 2009. By 2010, the workshop had expanded to 800 m² with four thermal slitters and two NCR production lines.",
    buyerValue:
      "More equipment and formats supported better order allocation, repeat specifications, and coordinated production for customers buying multiple paper consumables.",
  },
  {
    id: "2011",
    period: "2011",
    title: "A larger factory and print capability",
    icon: Building2,
    change:
      "Zhixin moved into a 1,800 m² factory and added a four-color full-rotary NCR printing press, creating more room for production organization and printed-paper work.",
    buyerValue:
      "Buyers gained a clearer route for printed formats, artwork review, production scheduling, and inspection within a more structured factory environment.",
  },
  {
    id: "2011-2017",
    period: "2011–2017",
    title: "Processes become repeatable",
    icon: ClipboardCheck,
    change:
      "The company expanded to six thermal paper lines, added 450 mm roll printing, began thermal label production, built a 30-person production team, and standardized key operating steps.",
    buyerValue:
      "Standardized workflows support consistent specification handoff, in-process checks, packing instructions, and repeat-order reference records across rolls and labels.",
  },
  {
    id: "2018",
    period: "2018",
    title: "Independent factory investment",
    icon: Factory,
    change:
      "Zhixin purchased an independent factory and continued upgrading equipment, automatic packaging, workplace safety management, and the production environment.",
    buyerValue:
      "The investment strengthened control over production flow, packing consistency, factory review, and the practical conditions required for long-term supply programs.",
  },
  {
    id: "2022-2026",
    period: "2022–2026",
    title: "Building international cooperation",
    icon: Globe2,
    change:
      "From 2022 to 2025, the team built international-business knowledge, communication routines, and export service capability from the ground up. In 2026, Zhixin entered a new stage of global supply cooperation.",
    buyerValue:
      "International projects are reviewed through product specifications, sample confirmation, document needs, packing, shipping terms, and destination-specific requirements.",
  },
];

const operatingPrinciples = [
  {
    icon: ShieldCheck,
    title: "Verify before promising",
    text: "Product performance, documents, production plans, and delivery expectations are confirmed against the quoted grade, order specification, application, and project review.",
  },
  {
    icon: PackageCheck,
    title: "Build for repeat orders",
    text: "Approved dimensions, cores, winding, artwork, carton marks, packing, and batch references are treated as part of the product, not as afterthoughts.",
  },
  {
    icon: Users,
    title: "Improve through buyer feedback",
    text: "Our development has followed real customer requirements, from roll converting and print to labels, export packing, and international communication.",
  },
];

const procurementPaths = [
  {
    icon: Factory,
    label: "Factory review",
    title: "See how production is organized",
    text: "Review converting, printing, packing, equipment, and factory-audit context before a bulk program.",
    href: "/factory/overview",
    action: "Explore the factory",
  },
  {
    icon: FileCheck2,
    label: "Quality and documents",
    title: "Check the evidence route",
    text: "Understand inspection steps and request the document set relevant to your material, market, and intended use.",
    href: "/factory/quality-control",
    action: "Review quality control",
  },
  {
    icon: Boxes,
    label: "Product qualification",
    title: "Move from specification to sample",
    text: "Share printer model, size, core, material, packing, destination, and application so the team can review fit before quotation.",
    href: "/samples",
    action: "Request samples",
  },
];

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
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main id="main-content" className="bg-[#fbfaf6] pt-[88px] text-[#14211f]">
        <section className="relative min-h-[620px] overflow-hidden border-b border-white/15 bg-[#14211f] text-white lg:min-h-[700px]">
          <div className="absolute inset-0">
            <SlotImage
              slotKey="about.banner"
              alt="Zhixin Paper thermal paper converting factory"
              fill
              fetchPriority="high"
              loading="eager"
              sizes="100vw"
              className="object-cover object-center opacity-90"
            />
            <div className="absolute inset-0 bg-[#0c1715]/45" />
            <div className="absolute inset-y-0 left-0 w-full bg-[#0c1715]/35 lg:w-[68%]" />
          </div>

          <div className="container-site relative flex min-h-[620px] flex-col justify-between py-8 lg:min-h-[700px] lg:py-12">
            <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <span>/</span>
              <span className="text-white">About</span>
            </nav>

            <div className="max-w-4xl py-14">
              <div className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#e1c18a]">
                <span className="h-px w-10 bg-[#e1c18a]" />
                Manufacturing history since 2006
              </div>
              <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.04] tracking-normal text-white md:text-6xl lg:text-7xl">
                A manufacturing record, built year by year.
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-white/82 md:text-lg">
                Zhixin Paper grew from a one-person trading business into a thermal paper converting and international supply partner through practical investment in equipment, people, processes, and buyer service.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#history"
                  className="inline-flex items-center justify-center gap-2 bg-[#f4f0e8] px-6 py-3 text-sm font-bold text-[#14211f] transition-colors hover:bg-white"
                >
                  Read Our History
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/factory"
                  className="inline-flex items-center justify-center gap-2 border border-white/35 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
                >
                  Review Factory Capability
                </Link>
              </div>
            </div>

            <div className="grid border-t border-white/20 sm:grid-cols-3">
              {[
                ["2006", "Business established"],
                ["2008", "First thermal slitter"],
                ["2026", "Global cooperation stage"],
              ].map(([value, label]) => (
                <div key={value} className="border-white/20 py-5 sm:border-l sm:px-6 first:sm:border-l-0 first:sm:pl-0">
                  <div className="text-2xl font-extrabold text-white">{value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.14em] text-white/62">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <nav className="sticky top-[88px] z-20 border-b border-[#ded6c8] bg-[#fbfaf6]/95 backdrop-blur-sm" aria-label="About page sections">
          <div className="container-site grid grid-cols-3 items-start gap-3 py-4 text-center text-[10px] font-bold uppercase leading-4 tracking-[0.1em] text-[#53605d] sm:flex sm:gap-7 sm:text-left sm:text-xs sm:tracking-[0.14em]">
            <a href="#history" className="transition-colors hover:text-[#0f5f5c]">History</a>
            <a href="#principles" className="transition-colors hover:text-[#0f5f5c]">Operating principles</a>
            <a href="#procurement" className="transition-colors hover:text-[#0f5f5c]">Buyer next steps</a>
          </div>
        </nav>

        <section className="border-b border-[#ded6c8] py-16 md:py-20">
          <div className="container-site grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#0f5f5c]">What the record shows</div>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-normal md:text-4xl">
                Growth came from adding control where buyers needed it.
              </h2>
            </div>
            <div className="grid gap-7 sm:grid-cols-2">
              {[
                ["Market knowledge", "Direct customer contact came first, before equipment expansion."],
                ["Converting control", "Slitting, winding, print, labels, and packing were added in stages."],
                ["Process discipline", "Production growth was paired with standardized operating steps."],
                ["Export readiness", "International communication and service capability were built deliberately."],
              ].map(([title, text]) => (
                <div key={title} className="border-t-2 border-[#b9822f] pt-5">
                  <h3 className="text-base font-bold text-[#14211f]">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#5d6763]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="history" className="scroll-mt-36 py-20 md:py-28">
          <div className="container-site">
            <div className="max-w-3xl">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#0f5f5c]">Development record</div>
              <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-normal md:text-5xl">From market learning to global supply cooperation.</h2>
              <p className="mt-5 text-base leading-8 text-[#5d6763]">
                Each milestone below is drawn from the company development record. The buyer notes explain why the change matters in a procurement relationship.
              </p>
            </div>

            <div className="mt-14 border-t border-[#cfc6b7]">
              {timeline.map((item, index) => {
                const Icon = item.icon;
                return (
                  <article id={item.id} key={item.id} className="scroll-mt-40 grid gap-6 border-b border-[#cfc6b7] py-10 md:grid-cols-[0.34fr_0.84fr_1.18fr] md:gap-10 md:py-14">
                    <div>
                      <div className="flex items-center gap-4">
                        <span className="flex h-10 w-10 items-center justify-center border border-[#0f5f5c] text-[#0f5f5c]">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="text-2xl font-extrabold text-[#0f5f5c]">{item.period}</span>
                      </div>
                      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#8a8072]">Chapter {String(index + 1).padStart(2, "0")}</div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold leading-tight text-[#14211f]">{item.title}</h3>
                      <p className="mt-4 text-sm leading-7 text-[#5d6763]">{item.change}</p>
                    </div>
                    <div className="border-l-2 border-[#b9822f] bg-[#f4f0e8] px-6 py-5">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#806229]">
                        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                        Why it matters to buyers
                      </div>
                      <p className="mt-3 text-sm leading-7 text-[#3f4a46]">{item.buyerValue}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="principles" className="scroll-mt-36 border-y border-[#ded6c8] bg-[#14211f] py-20 text-white md:py-24">
          <div className="container-site">
            <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#e1c18a]">Long-term operating principles</div>
                <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white md:text-4xl">What stays constant as the business grows.</h2>
              </div>
              <div className="grid gap-px bg-white/15 md:grid-cols-3">
                {operatingPrinciples.map((principle) => {
                  const Icon = principle.icon;
                  return (
                    <div key={principle.title} className="bg-[#14211f] p-7 md:p-8">
                      <Icon className="h-6 w-6 text-[#e1c18a]" aria-hidden="true" />
                      <h3 className="mt-6 text-lg font-bold text-white">{principle.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/68">{principle.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="procurement" className="scroll-mt-36 py-20 md:py-28">
          <div className="container-site">
            <div className="flex flex-col gap-6 border-b border-[#cfc6b7] pb-9 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#0f5f5c]">Continue your review</div>
                <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-normal md:text-5xl">Turn company history into procurement evidence.</h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-[#5d6763]">
                Use the routes below to review current factory capability, quality controls, and product qualification details for your project.
              </p>
            </div>

            <div className="grid md:grid-cols-3">
              {procurementPaths.map((path, index) => {
                const Icon = path.icon;
                return (
                  <Link
                    key={path.title}
                    href={path.href}
                    className="group border-b border-[#cfc6b7] py-9 md:border-l md:px-8 first:md:border-l-0 first:md:pl-0 last:md:pr-0"
                  >
                    <div className="flex items-center justify-between">
                      <Icon className="h-6 w-6 text-[#0f5f5c]" aria-hidden="true" />
                      <span className="text-xs font-bold text-[#a39786]">0{index + 1}</span>
                    </div>
                    <div className="mt-7 text-xs font-bold uppercase tracking-[0.14em] text-[#806229]">{path.label}</div>
                    <h3 className="mt-3 text-xl font-bold leading-snug text-[#14211f]">{path.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#5d6763]">{path.text}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0f5f5c]">
                      {path.action}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <CTABanner
          title="Qualify the paper, packing, and supply plan for your project."
          subtitle="Share your printer model, dimensions, material or grade, packing, destination, and application. The team will review product fit, sample options, documents, lead time, and shipping terms."
          trustItems={[
            "Specification-led review",
            "Samples for qualified projects",
            "Project-specific document route",
            "FOB / CIF / DDP terms reviewed by destination",
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
