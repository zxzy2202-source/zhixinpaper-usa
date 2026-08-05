import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/ui/HeroBanner";
import { buildMetadata } from "@/lib/seo";
import { CASE_STUDIES } from "@/lib/case-studies";

export const metadata: Metadata = buildMetadata({
  title: "Project Case Studies | Thermal Paper & Label Qualification",
  description: "Anonymized thermal paper and label project overviews showing how device, material, documentation, and application requirements are reviewed.",
  path: "/case-studies",
});

const listJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Thermal Paper Project Case Studies",
  description: "Anonymized project overviews showing how thermal paper and label requirements are qualified.",
  itemListElement: CASE_STUDIES.map((cs, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://www.zhixinpaper.com/case-studies/${cs.slug}`,
    name: cs.title,
  })),
};

export default function CaseStudiesPage() {
  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listJsonLd) }} />
      <main className="min-h-screen bg-white">
        <HeroBanner
          eyebrow="Project case studies"
          title="How Thermal Paper and Label Requirements Are Qualified"
          description="These anonymized project overviews explain the review process used for device compatibility, material selection, documentation, samples, and supply planning. They are not universal performance guarantees."
          breadcrumbs={[{ label: "Case Studies" }]}
          actions={[{ label: "Discuss Your Project", href: "/quote", kind: "primary" }]}
        />

        <section className="border-b border-slate-200 bg-slate-50 py-8">
          <div className="mx-auto max-w-6xl px-6">
            <p className="max-w-4xl text-sm leading-6 text-slate-600">
              Customer identities and commercially sensitive details are omitted. Outcomes vary with equipment condition, print settings, artwork, materials, environment, test methods, order specification, and regulatory review.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-8 md:grid-cols-2">
              {CASE_STUDIES.map((caseStudy) => (
                <article key={caseStudy.slug} className="flex flex-col border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
                    <span>{caseStudy.industry}</span>
                    <span aria-hidden="true">·</span>
                    <span>{caseStudy.region}</span>
                  </div>
                  <h2 className="mt-3 text-xl font-bold leading-snug text-slate-900">{caseStudy.title}</h2>
                  <p className="mt-2 text-sm text-slate-500">{caseStudy.client}</p>

                  <div className="mt-6 space-y-5">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Challenge</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{caseStudy.challenge}</p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Qualification approach</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{caseStudy.solution}</p>
                    </div>
                    <ul className="space-y-2">
                      {caseStudy.outcomes.slice(0, 2).map((outcome) => (
                        <li key={outcome} className="flex items-start gap-2 text-sm leading-6 text-slate-700">
                          <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-green-600" aria-hidden="true" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto border-t border-slate-100 pt-5">
                    <Link href={`/case-studies/${caseStudy.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900">
                      Read project overview <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-900 py-16 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-bold">Build a Specification Around Your Application</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
              Share the printer model, dimensions, surface, environment, destination, documentation needs, and forecast. Our team will review the feasible material and validation route.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/quote" className="bg-white px-8 py-3 font-semibold text-slate-900 hover:bg-slate-100">Request a Project Review</Link>
              <Link href="/samples" className="border border-white px-8 py-3 font-semibold text-white hover:bg-white/10">Request Samples</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
