import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import QuoteForm from "./QuoteForm";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { ArrowRight, CheckCircle2, FileCheck, Shield, Truck } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Request a Quote — Thermal Paper Rolls & Labels",
  description:
    "Submit an RFQ for thermal paper rolls and labels. Share product, destination, volume, and compliance needs. Sales reviews spec, samples, and freight before quoting.",
  path: "/quote",
});

const HERO_TRUST = [
  { icon: <CheckCircle2 className="h-4 w-4 shrink-0 text-[#d6b273]" />, text: "Specification & printer fit review" },
  { icon: <FileCheck className="h-4 w-4 shrink-0 text-[#d6b273]" />, text: "BPA-free & compliance documents" },
  { icon: <Truck className="h-4 w-4 shrink-0 text-[#d6b273]" />, text: "FOB · CIF · DDP freight options" },
  { icon: <Shield className="h-4 w-4 shrink-0 text-[#d6b273]" />, text: "NDA available on request" },
];

const HERO_STEPS = [
  { num: "01", title: "Fill the form", sub: "Product, spec & destination" },
  { num: "02", title: "Sales reviews", sub: "Grade, docs & sample plan" },
  { num: "03", title: "Quote issued", sub: "Price, lead time & freight" },
];

export default function QuotePage() {
  const jsonLd = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Request a Quote", url: "/quote" },
  ]);

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main-content">
        {/* ── HERO ── */}
        <section className="relative overflow-hidden bg-[#101b19] pt-[72px]">
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="/images/factory-overview.jpg"
              alt="Thermal paper manufacturing facility"
              fill
              className="object-cover object-center opacity-55"
              priority
              sizes="100vw"
              quality={60}
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(8,20,18,0.78)_0%,rgba(8,20,18,0.55)_55%,rgba(8,20,18,0.35)_100%)]" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Breadcrumb */}
            <div className="border-b border-white/10 bg-[#101b19]/70 backdrop-blur-sm">
              <div className="mx-auto max-w-6xl px-6 py-3">
                <nav className="flex items-center gap-2 text-xs text-slate-400">
                  <Link href="/" className="hover:text-white transition-colors">Home</Link>
                  <span>/</span>
                  <span className="text-slate-300">Request a Quote</span>
                </nav>
              </div>
            </div>

            <div className="mx-auto max-w-6xl px-6 py-12 md:py-16 lg:py-20">
              <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
                {/* Left: headline + trust badges */}
                <div className="max-w-2xl">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#d6b273]">
                    Factory-direct wholesale · RFQ intake
                  </p>
                  <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl xl:text-6xl">
                    Get a landed-cost quote<br className="hidden sm:block" /> in one form.
                  </h1>
                  <p className="mt-5 max-w-xl text-base leading-8 text-[#c7d0cb] md:text-lg">
                    Share your roll spec, destination, volume, and compliance needs.
                    Sales matches the grade, documents, sample plan, and freight term.
                  </p>

                  {/* Trust badges */}
                  <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {HERO_TRUST.map((item) => (
                      <div
                        key={item.text}
                        className="flex items-start gap-2 border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-sm"
                      >
                        {item.icon}
                        <span className="text-xs font-medium leading-4 text-slate-200">{item.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA row */}
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <a
                      href="#quote-form"
                      className="inline-flex min-h-11 items-center gap-2 bg-[#9c661d] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#9c661d]/25 transition-all hover:bg-[#7d4f16]"
                    >
                      Start your RFQ <ArrowRight className="h-4 w-4" />
                    </a>
                    <Link
                      href="/samples"
                      className="inline-flex min-h-11 items-center gap-2 border border-white/20 bg-white/8 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/15"
                    >
                      Request samples first
                    </Link>
                  </div>
                </div>

                {/* Right: 3-step flow card */}
                <div className="hidden lg:block shrink-0 w-64">
                  <div className="border border-white/10 bg-white/5 backdrop-blur-md p-6">
                    <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#d6b273]">How it works</p>
                    <div className="space-y-0 divide-y divide-white/10">
                      {HERO_STEPS.map(({ num, title, sub }) => (
                        <div key={num} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                          <span className="mt-0.5 text-2xl font-black leading-none text-white/20">{num}</span>
                          <div>
                            <p className="text-sm font-bold text-white">{title}</p>
                            <p className="mt-0.5 text-xs text-slate-400">{sub}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 border-t border-white/10 pt-5">
                      <p className="text-[10px] leading-5 text-slate-400">
                        Spec sheets or artwork? Email to sales after submitting — reference your company name.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── INFO STRIP ── */}
        <div className="border-b border-[#ded6c8] bg-[#fbfaf6]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid divide-x divide-[#ded6c8] sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Product", text: "Rolls, labels, OEM, or mixed program" },
                { label: "Fit", text: "Width, OD, core, printer model, coating" },
                { label: "Files", text: "REACH, FDA, Prop 65, FSC, ISO, BPA-free" },
                { label: "Route", text: "FOB, CIF, DDP, pallet, or container terms" },
              ].map((item) => (
                <div key={item.label} className="px-5 py-4">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#0f5f5c]">{item.label}</div>
                  <p className="mt-1 text-sm leading-6 text-[#4f5f5a]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FORM ── */}
        <div id="quote-form">
          <QuoteForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
