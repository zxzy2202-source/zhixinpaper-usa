import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { FaqItem } from "@/lib/faq";

interface FaqSectionProps {
  faqs: readonly FaqItem[];
  id?: string;
  title?: string;
  intro?: string;
  eyebrow?: string;
  className?: string;
  tone?: "light" | "paper";
}

export default function FaqSection({
  faqs,
  id,
  title = "Frequently asked questions",
  intro,
  eyebrow = "Buyer questions",
  className = "",
  tone = "paper",
}: FaqSectionProps) {
  const sectionTone = tone === "light" ? "bg-white" : "bg-[#fbfaf6]";
  return (
    <section id={id} className={`${sectionTone} border-t border-[#ded6c8] py-14 md:py-16 ${className}`}>
      <div className="container-site grid gap-10 lg:grid-cols-[0.7fr_1fr] lg:gap-12">
        <div>
          <p className="section-label">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold text-[#14211f] md:text-4xl">{title}</h2>
          {intro && <p className="mt-5 max-w-lg text-sm leading-7 text-[#4f5f5a]">{intro}</p>}
        </div>
        <div className="border-t border-[#ded6c8]">
          {faqs.map((faq, index) => (
            <details key={`${faq.question}-${index}`} className="group border-b border-[#ded6c8]" open={index === 0}>
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-left marker:content-none">
                <span className="text-base font-bold leading-6 text-[#14211f]">{faq.question}</span>
                <ChevronRight className="h-5 w-5 shrink-0 text-[#0f5f5c] transition-transform duration-200 group-open:rotate-90" aria-hidden="true" />
              </summary>
              <div className="max-w-3xl pb-6 pr-10 text-sm leading-7 text-[#4f5f5a]">
                <p>{faq.answer}</p>
                {faq.link && (
                  <Link href={faq.link.href} className="mt-3 inline-flex items-center gap-2 font-bold text-[#0f5f5c] hover:underline">
                    {faq.link.text}
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
