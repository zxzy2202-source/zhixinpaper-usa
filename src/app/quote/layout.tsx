import type { Metadata } from "next";
import type { ReactNode } from "react";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Request a Thermal Paper Quote",
  description:
    "Request a thermal paper roll or label quote. Share size, material, quantity, printer, market, documents, packing, destination, and preferred delivery terms.",
  alternates: { canonical: canonicalUrl("/quote") },
};

export default function QuoteLayout({ children }: { children: ReactNode }) {
  return children;
}
