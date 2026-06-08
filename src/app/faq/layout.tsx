import type { Metadata } from "next";
import type { ReactNode } from "react";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Thermal Paper FAQ | Wholesale Orders, Samples & Compliance",
  description:
    "Answers for thermal paper roll and label buyers: MOQ, samples, lead time, compliance documents, shipping, OEM printing, and wholesale ordering.",
  alternates: { canonical: canonicalUrl("/faq") },
};

export default function FAQLayout({ children }: { children: ReactNode }) {
  return children;
}
