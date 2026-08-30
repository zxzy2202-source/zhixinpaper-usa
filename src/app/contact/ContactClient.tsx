"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Globe2,
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  PackageCheck,
  Phone,
  ShieldCheck,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { COMPANY } from "@/lib/data";
import QuickContactForm from "./QuickContactForm";

const WHATSAPP_URL = "https://wa.me/8618792771927";

const DIRECT_CONTACTS = [
  {
    icon: Mail,
    label: "Email",
    value: COMPANY.email,
    detail: "Specifications, files, and document questions",
    href: `mailto:${COMPANY.email}`,
    external: false,
  },
  {
    icon: Phone,
    label: "Phone",
    value: COMPANY.phone,
    detail: "Commercial and project coordination",
    href: `tel:${COMPANY.phone.replace(/\s/g, "")}`,
    external: false,
  },
  {
    icon: MapPin,
    label: "Factory address",
    value: "Xi'an, China",
    detail: COMPANY.address,
    href: null,
    external: false,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: COMPANY.whatsapp,
    detail: "Short questions and existing inquiries",
    href: WHATSAPP_URL,
    external: true,
  },
] as const;

const SUPPORT_REASONS = [
  {
    icon: Headphones,
    title: "One review path",
    description:
      "General questions stay separate from formal RFQs and sample evaluation requests.",
  },
  {
    icon: ClipboardCheck,
    title: "Specification context",
    description:
      "Sales can review printer, size, material, packing, and artwork questions with the right context.",
  },
  {
    icon: Globe2,
    title: "Export context",
    description:
      "Destination, documentation, and freight requirements can move into the full commercial RFQ.",
  },
  {
    icon: CheckCircle2,
    title: "A clear next step",
    description:
      "You can see whether a general contact, quotation, or product sample is the correct route.",
  },
];

const SALES_ROUTES = [
  {
    icon: Mail,
    label: "General sales",
    title: "Company and product questions",
    description:
      "Ask about product fit, documents, an existing inquiry, or the next step for your project.",
    action: "Email sales",
    href: `mailto:${COMPANY.email}`,
  },
  {
    icon: FileText,
    label: "Commercial RFQ",
    title: "Pricing and supply review",
    description:
      "Submit size, material, volume, destination, packing, Incoterms, and project timing.",
    action: "Start an RFQ",
    href: "/contact?mode=quote#contact-form",
  },
  {
    icon: PackageCheck,
    label: "Sample evaluation",
    title: "Test before bulk approval",
    description:
      "Request an evaluation sample for printer fit, coating, adhesive, print result, or packing.",
    action: "Request samples",
    href: "/contact?mode=samples#contact-form",
  },
];

const CUSTOMER_PATHS = [
  {
    key: "custom-private-label",
    number: "01",
    title: "Custom / private-label direct",
    audience: "Brand owners, importers, and growing consumer brands",
    model: "Direct custom or private-label supply",
    description: "For Amazon sellers and industry brands that want the product, packaging, and brand program reviewed together.",
    action: "Plan a private-label project",
    icon: Building2,
    priority: false,
  },
  {
    key: "own-brand-distribution",
    number: "02",
    title: "Own-brand distribution",
    audience: "Distributors and importers with an established channel",
    model: "Supply for your own brand portfolio",
    description: "Match repeatable product specifications, packing, and supply planning to the channel you already serve.",
    action: "Discuss distribution supply",
    icon: PackageCheck,
    priority: false,
  },
  {
    key: "tender-supply",
    number: "03",
    title: "Tender supply + support",
    audience: "Local tender companies and awarded contractors",
    model: "Upstream supply with tender assistance",
    description: "Share the bid specification, document scope, sample deadline, and delivery destination before submission or award.",
    action: "Prepare a tender supply plan",
    icon: ShieldCheck,
    priority: true,
  },
  {
    key: "peer-semi-finished",
    number: "04",
    title: "Semi-finished supply to peers",
    audience: "Peer printing plants and converters",
    model: "Material and semi-finished supply",
    description: "Discuss parent rolls, converted stock, or other inputs your plant needs to complete its own production.",
    action: "Discuss converter supply",
    icon: FileText,
    priority: false,
  },
  {
    key: "peer-overflow-manufacturing",
    number: "05",
    title: "Overseas peer overflow manufacturing",
    audience: "Overseas printing plants and converters",
    model: "Overflow capacity and contract manufacturing",
    description: "Route recurring overflow work with the product files, capacity window, quality requirements, and packing plan.",
    action: "Discuss overflow production",
    icon: Globe2,
    priority: true,
  },
] as const;

const SUPPORT_NETWORK = [
  {
    title: "Thermal paper rolls",
    description: "POS, ATM, queue, and application-specific roll projects.",
    href: "/products/thermal-paper-rolls",
    image: "/images/thermal-rolls-product.jpg",
  },
  {
    title: "Thermal labels",
    description: "Direct thermal label material, adhesive, and construction review.",
    href: "/products/thermal-labels",
    image: "/images/thermal-labels-product.jpg",
  },
  {
    title: "OEM and private label",
    description: "Artwork, packaging, roll construction, and brand-program coordination.",
    href: "/oem-custom",
    image: "/images/factory-overview.jpg",
  },
  {
    title: "Factory and quality",
    description: "Review the manufacturing and quality-control context behind your inquiry.",
    href: "/factory",
    image: "/images/factory-overview.jpg",
  },
  {
    title: "Compliance review",
    description: "Check available documentation against your market and application needs.",
    href: "/compliance",
    image: "/images/compliance-certifications.jpg",
  },
  {
    title: "Export markets",
    description: "Route destination-specific commercial questions to the appropriate review.",
    href: "/markets",
    image: "/images/hero-bg.jpg",
  },
];

export default function ContactClient({ mode, context }: { mode?: string; context?: string }) {
  const selectedRoute = mode === "quote" ? "Commercial RFQ" : mode === "samples" ? "Sample evaluation" : "General question";
  const selectedCustomerPath = CUSTOMER_PATHS.find((path) => path.key === context);

  return (
    <>
      <Header />
      <main id="main-content" className="bg-white text-[#001429]">
        <section className="relative overflow-hidden bg-[#eef1f5] pt-[72px]">
          <div className="relative min-h-[430px] sm:min-h-[460px]">
            <Image
              src="/images/contact/contact-hero.jpg"
              alt="Sales support specialist ready to discuss a paper project"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[66%_center] sm:object-center"
            />
            <div className="absolute inset-y-0 left-0 w-full bg-[#eef1f5]/90 sm:w-[72%] lg:hidden" />
            <div className="relative z-10 mx-auto flex min-h-[430px] max-w-[1440px] items-center px-5 py-14 sm:min-h-[460px] sm:px-8 lg:px-12 xl:px-16">
              <div className="max-w-[650px]">
                <p className="text-sm font-bold uppercase text-[#006af6]">Sales and support</p>
                <h1 className="mt-4 max-w-[620px] text-4xl font-bold leading-[1.08] text-[#001429] sm:text-5xl lg:text-[54px]">
                  Contact Zhixin Paper
                </h1>
                <p className="mt-5 max-w-[590px] text-base leading-7 text-[#52647a] sm:text-lg sm:leading-8">
                  Connect with the right team for thermal paper rolls, labels, OEM packaging, export documents, and project support.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/contact?mode=quote#contact-form"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#006af6] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0057cc]"
                  >
                    Commercial RFQ <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact?mode=samples#contact-form"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#006af6] bg-white/90 px-6 py-3 text-sm font-bold text-[#006af6] transition-colors hover:bg-white"
                  >
                    Request samples <PackageCheck className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#006af6]" aria-label="Zhixin Paper service areas">
          <div className="mx-auto grid min-h-16 max-w-[1440px] grid-cols-2 items-center px-5 sm:grid-cols-3 sm:px-8 lg:grid-cols-5 lg:px-12 xl:px-16">
            {["Thermal Rolls", "Thermal Labels", "OEM Programs", "Export Support", "Quality Review"].map(
              (item, index) => (
                <div
                  key={item}
                  className={`${index > 1 ? "hidden sm:flex" : "flex"} items-center justify-center gap-2 border-white/20 px-3 text-center text-sm font-bold text-white lg:border-l lg:first:border-l-0`}
                >
                  <ArrowRight className="h-4 w-4 shrink-0" />
                  <span>{item}</span>
                </div>
              )
            )}
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24 xl:px-16">
          <div className="mx-auto max-w-[1320px]">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase text-[#006af6]">Contact us</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Get support from Zhixin Paper
              </h2>
              <p className="mt-4 text-base leading-7 text-[#52647a] sm:text-lg">
                One Contact Us page for every request. Choose a route below and keep the right product, destination, and project context together.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="Contact request routes">
              {[
                ["General question", "Product, document, or project support", "/contact#contact-form"],
                ["Commercial RFQ", "Pricing, volume, freight, and timing", "/contact?mode=quote#contact-form"],
                ["Sample evaluation", "Printer fit, material, or packing test", "/contact?mode=samples#contact-form"],
              ].map(([label, description, href]) => (
                <Link
                  key={label}
                  href={href}
                  className={`border px-4 py-4 transition-colors ${selectedRoute === label ? "border-[#006af6] bg-[#eef5ff]" : "border-[#dfe5ed] bg-white hover:border-[#006af6]/50"}`}
                >
                  <span className="block text-sm font-bold text-[#001429]">{label}</span>
                  <span className="mt-1 block text-xs leading-5 text-[#52647a]">{description}</span>
                </Link>
              ))}
            </div>

            <section className="mt-14 border-y border-[#dfe5ed] py-10" aria-labelledby="customer-paths-title">
              <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase text-[#006af6]">Customer path</p>
                <h2 id="customer-paths-title" className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                  Which type of supply partner are you?
                </h2>
                <p className="mt-4 text-base leading-7 text-[#52647a]">
                  Choose the closest match. Your selection travels with the Contact Us RFQ so sales can start with the right commercial context.
                </p>
              </div>

              <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                {CUSTOMER_PATHS.map((path) => {
                  const Icon = path.icon;
                  const href = `/contact?context=${path.key}#contact-form`;
                  const selected = selectedCustomerPath?.key === path.key;
                  return (
                    <Link
                      key={path.key}
                      href={href}
                      className={`group flex h-full flex-col border p-5 transition-[border-color,background-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-[#006af6]/60 hover:shadow-[0_14px_30px_rgba(0,106,246,0.10)] ${selected ? "border-[#006af6] bg-[#eef5ff]" : "border-[#dfe5ed] bg-white"}`}
                      data-customer-path={path.key}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eaf2ff] text-[#006af6]"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                        <span className="text-xs font-bold tracking-[0.16em] text-[#91a0b2]">{path.number}</span>
                      </div>
                      <h3 className="mt-5 text-lg font-bold leading-6 text-[#001429]">{path.title}</h3>
                      <p className="mt-3 text-sm font-semibold leading-6 text-[#26384f]">{path.audience}</p>
                      <p className="mt-2 text-xs font-bold uppercase tracking-[0.06em] text-[#7a8ba0]">{path.model}</p>
                      <p className="mt-3 flex-1 text-sm leading-6 text-[#52647a]">{path.description}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#006af6]">{path.action}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
                      {path.priority && <span className="mt-3 inline-flex w-fit items-center gap-1 rounded-full bg-[#fff5df] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#9c661d]"><ShieldCheck className="h-3 w-3" aria-hidden="true" /> Priority path</span>}
                    </Link>
                  );
                })}
              </div>
            </section>

            <div id="contact-form" className="mt-10 grid scroll-mt-28 overflow-hidden rounded-lg border border-[#e5e9f0] bg-white lg:grid-cols-[minmax(0,1fr)_420px]">
              <div className="p-5 sm:p-8 lg:p-10">
                {(mode || selectedCustomerPath) && (
                  <div className="mb-6 border-l-4 border-[#006af6] bg-[#eef5ff] px-4 py-3">
                    <p className="text-xs font-bold uppercase text-[#006af6]">Selected request</p>
                    <p className="mt-1 text-sm font-bold text-[#001429]">{selectedCustomerPath?.title || selectedRoute}</p>
                    <p className="mt-1 text-xs leading-5 text-[#52647a]">
                      {selectedCustomerPath
                        ? `${selectedCustomerPath.audience}. Share the relevant files and project details below.`
                        : "Use this Contact Us route to send your request; the team will keep the project context with your message."}
                    </p>
                  </div>
                )}
                <QuickContactForm customerPath={selectedCustomerPath?.key} />
              </div>
              <aside className="bg-[#006af6] p-6 text-white sm:p-8 lg:p-10" aria-labelledby="contact-information-title">
                <p className="text-sm font-bold uppercase text-white/75">Direct contact</p>
                <h3 id="contact-information-title" className="mt-3 text-2xl font-bold sm:text-3xl">
                  Contact information
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/80">
                  Include your company, destination market, product, and question so sales can route the request correctly.
                </p>

                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold uppercase text-white/70">Address</p>
                      <p className="mt-1 text-sm leading-6">{COMPANY.address}</p>
                    </div>
                  </div>
                  <a href={`mailto:${COMPANY.email}`} className="flex items-start gap-4 hover:text-white/80">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold uppercase text-white/70">Email</p>
                      <p className="mt-1 break-all text-sm font-bold">{COMPANY.email}</p>
                    </div>
                  </a>
                  <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="flex items-start gap-4 hover:text-white/80">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold uppercase text-white/70">Phone</p>
                      <p className="mt-1 text-sm font-bold">{COMPANY.phone}</p>
                    </div>
                  </a>
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="flex items-start gap-4 hover:text-white/80">
                    <MessageCircle className="mt-0.5 h-5 w-5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold uppercase text-white/70">WhatsApp</p>
                      <p className="mt-1 text-sm font-bold">{COMPANY.whatsapp}</p>
                    </div>
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="bg-[#f4f6fa] px-5 py-16 sm:px-8 lg:px-12 lg:py-20 xl:px-16">
          <div className="mx-auto max-w-[1320px]">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase text-[#006af6]">Choose the right request route</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Contact us now</h2>
              <p className="mt-4 text-base leading-7 text-[#52647a]">
                Use the same Contact Us entry point for general support, a commercial RFQ, or a sample evaluation request.
              </p>
            </div>

            <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-[#dfe5ed] bg-[#dfe5ed] lg:grid-cols-3">
              {SALES_ROUTES.map((route) => {
                const Icon = route.icon;
                const content = (
                  <>
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#eaf2ff] text-[#006af6]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-6 text-xs font-bold uppercase text-[#006af6]">{route.label}</p>
                    <h3 className="mt-2 text-xl font-bold">{route.title}</h3>
                    <p className="mt-3 min-h-[84px] text-sm leading-7 text-[#52647a]">{route.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#006af6]">
                      {route.action} <ArrowRight className="h-4 w-4" />
                    </span>
                  </>
                );

                return route.href.startsWith("/") ? (
                  <Link key={route.label} href={route.href} className="bg-white p-6 transition-colors hover:bg-[#fafdff] sm:p-8">
                    {content}
                  </Link>
                ) : (
                  <a key={route.label} href={route.href} className="bg-white p-6 transition-colors hover:bg-[#fafdff] sm:p-8">
                    {content}
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24 xl:px-16">
          <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase text-[#006af6]">Inquiry process</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">Send your inquiry now</h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#52647a]">
                A short, specific first message is enough to route a general question. Commercial details can then move into the structured RFQ.
              </p>
              <ol className="mt-8 space-y-5">
                {[
                  ["Share the context", "Name the product, application, company, and destination market."],
                  ["Choose the route", "Use general contact, commercial RFQ, or sample evaluation."],
                  ["Review the next step", "Sales will use the supplied context to continue the correct workflow."],
                ].map(([title, description], index) => (
                  <li key={title} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#006af6] text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-bold">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-[#52647a]">{description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="relative min-h-[360px] overflow-hidden rounded-lg sm:min-h-[440px]">
              <Image
                src="/images/factory-overview.jpg"
                alt="Zhixin Paper manufacturing and project support"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-[#006af6] p-5 text-white sm:left-auto sm:max-w-sm sm:p-6">
                <p className="text-sm font-bold">Commercial details belong in the RFQ</p>
                <p className="mt-2 text-sm leading-6 text-white/80">
                  Size, material, volume, destination, packing, freight terms, and timing can be reviewed together there.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#e5e9f0] bg-[#f8fafc] px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="mx-auto grid max-w-[1320px] divide-y divide-[#e5e9f0] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {DIRECT_CONTACTS.map((item, index) => {
              const Icon = item.icon;
              const inner = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#006af6] text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold uppercase text-[#006af6]">{item.label}</span>
                    <span className="mt-1 block break-words text-sm font-bold text-[#001429]">{item.value}</span>
                    <span className="mt-1 block text-xs leading-5 text-[#52647a]">{item.detail}</span>
                  </span>
                </>
              );
              const classes = `${index % 2 === 0 ? "sm:border-l-0" : ""} flex min-h-40 items-start gap-4 px-2 py-7 sm:px-5 lg:border-l lg:px-6 lg:first:border-l-0`;

              return item.href ? (
                <a key={item.label} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined} className={classes}>
                  {inner}
                </a>
              ) : (
                <div key={item.label} className={classes}>
                  {inner}
                </div>
              );
            })}
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24 xl:px-16">
          <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <p className="text-sm font-bold uppercase text-[#006af6]">Buyer support</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">Why buyers use direct support</h2>
              <p className="mt-4 text-base leading-7 text-[#52647a]">
                A focused contact route reduces repeated questions and keeps commercial specifications attached to the correct project.
              </p>
            </div>
            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {SUPPORT_REASONS.map((reason) => {
                const Icon = reason.icon;
                return (
                  <article key={reason.title} className="border-t border-[#dfe5ed] pt-5">
                    <Icon className="h-7 w-7 text-[#006af6]" />
                    <h3 className="mt-4 text-lg font-bold">{reason.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#52647a]">{reason.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#001429] px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-24 xl:px-16">
          <div className="mx-auto max-w-[1320px]">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase text-[#62a6ff]">Commercial routes</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">Speak to sales directly</h2>
              <p className="mt-4 text-base leading-7 text-white/70">
                Select the route that matches the decision you need to make. The detailed form remains available after this first contact.
              </p>
            </div>

            <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-white/15 bg-white/15 lg:grid-cols-3">
              {SALES_ROUTES.map((route) => {
                const Icon = route.icon;
                const content = (
                  <>
                    <Icon className="h-7 w-7 text-[#62a6ff]" />
                    <p className="mt-6 text-xs font-bold uppercase text-[#62a6ff]">{route.label}</p>
                    <h3 className="mt-2 text-xl font-bold">{route.title}</h3>
                    <p className="mt-3 min-h-[84px] text-sm leading-7 text-white/65">{route.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white">
                      {route.action} <ArrowRight className="h-4 w-4" />
                    </span>
                  </>
                );
                const classes = "bg-[#001429] p-6 transition-colors hover:bg-[#08223c] sm:p-8";

                return route.href.startsWith("/") ? (
                  <Link key={route.label} href={route.href} className={classes}>
                    {content}
                  </Link>
                ) : (
                  <a key={route.label} href={route.href} className={classes}>
                    {content}
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24 xl:px-16">
          <div className="mx-auto max-w-[1320px]">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase text-[#006af6]">Capability routing</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">Zhixin Paper support network</h2>
              <p className="mt-4 text-base leading-7 text-[#52647a]">
                Continue to the most relevant capability page when your question needs product, factory, compliance, or market context.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SUPPORT_NETWORK.map((item) => (
                <Link key={item.title} href={item.href} className="group overflow-hidden rounded-lg border border-[#e5e9f0] bg-white">
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#eef1f5]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 min-h-[52px] text-sm leading-6 text-[#52647a]">{item.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#006af6]">
                      View capability <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#006af6] px-5 py-12 text-white sm:px-8 lg:px-12 xl:px-16">
          <div className="mx-auto flex max-w-[1320px] flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <Building2 className="mt-1 h-7 w-7 shrink-0" />
              <div>
                <h2 className="text-2xl font-bold">Ready with commercial specifications?</h2>
                <p className="mt-2 text-sm leading-6 text-white/80">
                  Move size, material, volume, packing, destination, and timing into one qualified RFQ.
                </p>
              </div>
            </div>
            <Link
              href="/contact?mode=quote#contact-form"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-[#006af6] transition-colors hover:bg-[#eef5ff]"
            >
              Build your RFQ <FileCheck2 className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
