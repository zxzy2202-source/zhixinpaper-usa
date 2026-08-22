"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, ChevronDown, Search } from "lucide-react";
import type { FaqGroup } from "@/lib/faq";

type FaqPageClientProps = {
  groups: readonly FaqGroup[];
};

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function FaqPageClient({ groups }: FaqPageClientProps) {
  const [query, setQuery] = useState("");
  const [openKey, setOpenKey] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredGroups = useMemo(
    () => groups
      .map((group) => ({
        ...group,
        questions: group.questions.filter((faq) =>
          !normalizedQuery || `${group.category} ${faq.question} ${faq.answer}`.toLowerCase().includes(normalizedQuery),
        ),
      }))
      .filter((group) => group.questions.length > 0),
    [groups, normalizedQuery],
  );

  return (
    <main id="main-content" className="bg-white">
      <section className="relative isolate overflow-hidden bg-[#101b19] py-24 text-white md:py-32">
        <div className="absolute inset-0 -z-10 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-30" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,17,15,0.94),rgba(7,17,15,0.68),rgba(7,17,15,0.78))]" aria-hidden="true" />
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#e0bb72]">
              <span className="h-px w-9 bg-[#d6b273]" /> Buyer support
            </p>
            <h1 className="max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">Frequently Asked Questions</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#dbe3dd] md:text-lg">
              Clear answers for distributors, importers, and buyers reviewing thermal paper, labels, compliance, OEM services, and ordering details.
            </p>
            <Link href="/quote" className="mt-8 inline-flex min-h-12 items-center gap-2 bg-[#b9822f] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#9c661d]">
              Request a Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-site grid gap-12 py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16">
        <div className="min-w-0">
          <label htmlFor="faq-search" className="sr-only">Search FAQs</label>
          <div className="relative mb-12">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#75847e]" aria-hidden="true" />
            <input
              id="faq-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search FAQs..."
              className="h-14 w-full border border-[#c8bcaa] bg-white pl-12 pr-4 text-sm text-[#14211f] outline-none transition focus:border-[#0f5f5c] focus:ring-2 focus:ring-[#0f5f5c]/15"
            />
          </div>

          {filteredGroups.length > 0 ? (
            <div className="space-y-14">
              {filteredGroups.map((group) => {
                const sectionId = `faq-${group.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
                return (
                  <section key={group.category} id={sectionId} className="scroll-mt-28">
                    <div className="mb-5 flex items-end justify-between gap-4 border-b border-[#ded6c8] pb-3">
                      <h2 className="text-2xl font-bold tracking-tight text-[#14211f] md:text-3xl">{group.category}</h2>
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#87918c]">{group.questions.length} questions</span>
                    </div>
                    <div className="border-t border-[#ded6c8]">
                      {group.questions.map((faq) => {
                        const key = `${group.category}::${faq.question}`;
                        const isOpen = openKey === key;
                        return (
                          <div key={faq.question} className="border-b border-[#ded6c8]">
                            <button
                              type="button"
                              aria-expanded={isOpen}
                              onClick={() => setOpenKey(isOpen ? "" : key)}
                              className="flex min-h-[68px] w-full items-center justify-between gap-6 py-5 text-left text-base font-bold leading-6 text-[#14211f] transition hover:text-[#0f5f5c]"
                            >
                              <span>{faq.question}</span>
                              <ChevronDown className={`h-5 w-5 shrink-0 text-[#0f5f5c] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                            </button>
                            {isOpen && (
                              <div className="max-w-3xl pb-6 pr-8 text-sm leading-7 text-[#4f5f5a]">
                                <p>{faq.answer}</p>
                                {faq.link && (
                                  <Link href={faq.link.href} className="mt-3 inline-flex items-center gap-2 font-bold text-[#0f5f5c] hover:underline">
                                    {faq.link.text} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                  </Link>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            <div className="border border-dashed border-[#c8bcaa] px-6 py-12 text-center">
              <h2 className="text-xl font-bold text-[#14211f]">No matching questions</h2>
              <p className="mt-2 text-sm text-[#687772]">Try a broader search or clear the search field.</p>
              <button type="button" onClick={() => setQuery("")} className="mt-5 font-bold text-[#0f5f5c] hover:underline">Clear search</button>
            </div>
          )}
        </div>

        <aside className="self-start lg:sticky lg:top-28">
          <div className="border-l-2 border-[#0f5f5c] pl-5">
            <h2 className="text-lg font-bold text-[#14211f]">On this page</h2>
            <nav aria-label="FAQ sections" className="mt-4">
              <ol className="space-y-3">
                {groups.map((group, index) => {
                  const sectionId = `faq-${group.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
                  return (
                    <li key={group.category}>
                      <button type="button" onClick={() => scrollToSection(sectionId)} className="flex items-start gap-2 text-left text-sm leading-5 text-[#0f5f5c] hover:text-[#9c661d]">
                        <span className="text-[#87918c]">{index + 1}.</span> {group.category}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
          <div className="mt-10 border-t border-[#ded6c8] pt-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#87918c]">Need a project answer?</p>
            <p className="mt-3 text-sm leading-6 text-[#4f5f5a]">Send the size, grade, quantity, destination, and application. We will review the right product path with you.</p>
            <Link href="/quote" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#0f5f5c] hover:text-[#9c661d]">Start an RFQ <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
