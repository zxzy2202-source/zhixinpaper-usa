import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import HeroBanner from "@/components/ui/HeroBanner";
import SlotImage from "@/components/ui/SlotImage";
import { INDUSTRIES, THERMAL_PAPER_ROLLS, THERMAL_LABELS } from "@/lib/data";
import { INDUSTRY_BUYER_INSIGHTS } from "@/lib/marketInsights";
import { buildMetadata, canonicalUrl } from "@/lib/seo";
import { ArrowRight, CheckCircle2, FileCheck2, ShieldCheck } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = INDUSTRIES.find((i) => i.slug === slug);
  if (!industry) return {};
  return buildMetadata({
    title: `${industry.name} Thermal Paper`,
    description: `Thermal paper rolls and labels for ${industry.name.toLowerCase()} buyers. Compare materials, printer fit, compliance files, OEM packing, and wholesale supply.`,
    path: `/industries/${slug}`,
    keywords: typeof industry.keywords === "string" ? industry.keywords.split(",").map((k: string) => k.trim()) : industry.keywords,
  });
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const industry = INDUSTRIES.find((i) => i.slug === slug);
  if (!industry) notFound();
  const insight = INDUSTRY_BUYER_INSIGHTS[slug] || null;
  const isPilot = slug === "casino";

  const relatedProducts = [
    ...THERMAL_PAPER_ROLLS.filter((r) =>
      industry.products.some((p) => r.name.toLowerCase().includes(p.toLowerCase().split(" ")[0]))
    ).slice(0, 3),
    ...THERMAL_LABELS.filter((l) =>
      industry.products.some((p) => l.name.toLowerCase().includes(p.toLowerCase().split(" ")[0]))
    ).slice(0, 3),
  ].slice(0, 4);

  const faqs = buildIndustryFaqs(industry.name, industry.products, insight);
  const pageUrl = canonicalUrl(`/industries/${slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl("/") },
          { "@type": "ListItem", position: 2, name: "Industries", item: canonicalUrl("/industries") },
          { "@type": "ListItem", position: 3, name: industry.name, item: pageUrl },
        ],
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: `${industry.name} Thermal Paper Solutions`,
        description: industry.description,
        url: pageUrl,
        provider: { "@type": "Organization", name: "Zhixin Paper", url: canonicalUrl("/") },
        areaServed: "Worldwide",
        serviceType: industry.products,
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#recommended-products`,
        name: `Recommended products for ${industry.name}`,
        itemListElement: relatedProducts.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: product.name,
          url: canonicalUrl(`/products/${product.slug.includes("label") ? "thermal-labels" : "thermal-paper-rolls"}/${product.slug}`),
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <main id="main-content" className={isPilot ? "pilot-brand-page" : undefined}>
        <HeroBanner
          variant="standard"
          eyebrow={industry.tag ? `Industry solutions · ${industry.tag}` : "Industry solutions"}
          title={industry.name}
          description={(
            <>
              <p>{industry.description}</p>
              <p className="mt-3 text-base">We help buyers confirm operating risk, required documents, product fit, packaging, and the repeat-order plan before bulk production.</p>
            </>
          )}
          breadcrumbs={[
            { label: "Industries", href: "/industries" },
            { label: industry.name },
          ]}
          actions={[
            { label: "Get Industry Quote", href: "/quote", kind: "primary" },
            { label: "Request Samples", href: "/samples", kind: "secondary" },
          ]}
          aside={(
            <aside className="border border-[#ded6c8] bg-white/80 p-6 shadow-[0_18px_48px_rgba(20,33,31,0.08)] backdrop-blur-sm">
              <h2 className="text-lg font-bold text-[#14211f]">Key products</h2>
              <div className="mt-4 space-y-3">
                {industry.products.map((product) => (
                  <div key={product} className="flex items-center gap-2.5 text-sm text-[#4f5f5a]">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0f5f5c]" aria-hidden="true" />
                    {product}
                  </div>
                ))}
              </div>
              <Link href="/industries" className="mt-6 inline-flex items-center gap-2 border-t border-[#ded6c8] pt-4 text-sm font-semibold text-[#0f5f5c] hover:underline">
                Browse other industries <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </aside>
          )}
        />

        {insight && (
          <section className="bg-white py-16">
            <div className="container-site">
              <div className="mb-10 grid gap-5 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
                <div>
                  <p className="section-label">Buyer insight</p>
                  <h2 className="mt-3 text-3xl font-extrabold tracking-normal text-slate-950 md:text-4xl">
                    What buyers check before sourcing for {industry.name}.
                  </h2>
                </div>
                <p className="text-sm leading-7 text-slate-600">
                  These notes translate internal market research into the practical questions procurement,
                  operations, and maintenance teams usually ask before switching supply.
                </p>
              </div>

              <div className="grid gap-px bg-slate-200 lg:grid-cols-4">
                <InsightColumn title="Buyer types" items={insight.buyerTypes} />
                <InsightColumn title="Purchase motives" items={insight.purchaseMotives} />
                <InsightColumn title="Common risks" items={insight.commonRisks} />
                <InsightColumn title="Quote checklist" items={insight.quoteChecklist} />
              </div>
            </div>
          </section>
        )}

        {insight && (
          <section className="bg-slate-950 py-14 text-white">
            <div className="container-site grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-300">Sourcing path</p>
                <h2 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-normal text-white md:text-4xl">
                  Send the operating spec, not just the paper name.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                  For {industry.name.toLowerCase()} buyers, the right quote depends on terminal fit, barcode or print
                  reliability, batch control, documents, packaging, and destination.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href="/quote" className="inline-flex items-center justify-center gap-2 bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-100">
                  Request a Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/samples" className="inline-flex items-center justify-center gap-2 border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  Request Free Samples
                </Link>
              </div>
            </div>
          </section>
        )}

        <section className="border-y border-slate-200 bg-slate-50 py-12">
          <div className="container-site grid gap-5 md:grid-cols-2">
            <div className="flex gap-4 border border-slate-200 bg-white p-6">
              <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-blue-600" />
              <div>
                <h2 className="text-lg font-extrabold text-slate-950">Technical review and applicability</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Prepared by the Zhixin Paper product and quality team. Final material, compliance, printer fit,
                  image life, and performance requirements are confirmed against the buyer&apos;s application,
                  destination market, and approved sample before production.
                </p>
              </div>
            </div>
            <div className="flex gap-4 border border-slate-200 bg-white p-6">
              <FileCheck2 className="mt-1 h-6 w-6 shrink-0 text-blue-600" />
              <div>
                <h2 className="text-lg font-extrabold text-slate-950">Verification resources</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Review our documented controls, available compliance files, and sample process before approving
                  a purchasing specification.
                </p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-blue-600">
                  <Link href="/factory/quality-control" className="hover:text-blue-700">Quality control</Link>
                  <Link href="/compliance" className="hover:text-blue-700">Compliance files</Link>
                  <Link href="/samples" className="hover:text-blue-700">Sample validation</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="py-16 bg-slate-50">
            <div className="container-site">
              <div className="mb-8">
                <p className="section-label">Recommended Products</p>
                <h2 className="mt-2 font-bold text-slate-900 text-3xl">
                  Products matched to {industry.name}.
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {relatedProducts.map((p) => {
                  const category = "moq" in p && p.moq
                    ? (p.slug.includes("label") ? "thermal-labels" : "thermal-paper-rolls")
                    : "thermal-paper-rolls";
                  return (
                    <Link
                      key={p.slug}
                      href={`/products/${category}/${p.slug}`}
                      className="group flex flex-col bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all overflow-hidden"
                    >
                      <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                        <SlotImage
                          slotKey={`products.card.${p.slug}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="font-bold text-slate-900 text-sm leading-snug mb-1 group-hover:text-blue-600 transition-colors">
                          {p.name}
                        </h3>
                        <p className="text-slate-400 text-xs leading-relaxed flex-1">{p.subtitle}</p>
                        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">
                          View details <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <section className="bg-white py-16" id="faq">
          <div className="container-site">
            <div className="max-w-3xl">
              <p className="section-label">Industry FAQ</p>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-950 md:text-4xl">
                Practical sourcing answers for {industry.name} buyers.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Use these answers to prepare a comparable specification. Final performance is validated against
                the named printer, material, environment, and destination requirements.
              </p>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {faqs.map((faq) => (
                <details key={faq.question} className="group border border-slate-200 bg-slate-50 p-6 open:bg-white">
                  <summary className="cursor-pointer list-none pr-6 text-base font-extrabold leading-6 text-slate-950">
                    {faq.question}
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}

function buildIndustryFaqs(
  industryName: string,
  products: string[],
  insight: (typeof INDUSTRY_BUYER_INSIGHTS)[string] | null
) {
  const productList = products.join(", ");
  const checklist = insight?.quoteChecklist.join(", ") ?? "printer model, dimensions, application surface, operating environment, documents, and volume";
  const risks = insight?.commonRisks.join(", ") ?? "printer mismatch, weak print quality, unsuitable material, and incomplete packing details";

  return [
    {
      question: `Which products are commonly sourced for ${industryName}?`,
      answer: `Common options include ${productList}. The final selection depends on the printer, dimensions, sensing method, application surface, operating environment, and required retention period.`,
    },
    {
      question: `What information is needed to quote a ${industryName} project?`,
      answer: `Provide ${checklist}. These details allow suppliers to compare the same specification instead of quoting only by a general paper or label name.`,
    },
    {
      question: `How should buyers validate printer and application compatibility?`,
      answer: `Share the exact printer or terminal model and test a production-intent sample in the real workflow. Check feeding, cutting, sensor response, print density, barcode readability, adhesion where relevant, and handling after storage.`,
    },
    {
      question: `Which sourcing risks should ${industryName} buyers review?`,
      answer: `Review ${risks}. Agree measurable acceptance criteria and the document pack before bulk production.`,
    },
    {
      question: `Can compliance or performance be confirmed from the product name alone?`,
      answer: `No. Suitability depends on the selected material, test conditions, destination rules, printer, storage, and application. Request the relevant declaration or test file and approve a sample against the project requirements.`,
    },
  ];
}

function InsightColumn({ items, title }: { items: string[]; title: string }) {
  return (
    <div className="bg-white p-6">
      <h3 className="text-lg font-extrabold tracking-normal text-slate-950">{title}</h3>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-600">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-blue-600" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
