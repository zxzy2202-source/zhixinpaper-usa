import type { Metadata } from "next";
import type { ReactNode } from "react";
import { canonicalUrl } from "@/lib/seo";

const PAGE_URL = canonicalUrl("/faq");

export const metadata: Metadata = {
  title: "Thermal Paper Buyer FAQ",
  description:
    "Answers for thermal paper roll and label buyers: MOQ, samples, lead time, compliance documents, shipping, OEM printing, and wholesale ordering.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
};

export default function FAQLayout({ children }: { children: ReactNode }) {
  return children;
}
