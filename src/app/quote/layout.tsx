import type { Metadata } from "next";
import type { ReactNode } from "react";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Request a Thermal Paper Quote | Wholesale Rolls & Labels",
  description:
    "Request a custom quote for thermal paper rolls and labels. Share product sizes, quantities, market requirements, and compliance needs for factory-direct pricing.",
  alternates: { canonical: canonicalUrl("/quote") },
};

export default function QuoteLayout({ children }: { children: ReactNode }) {
  return children;
}
