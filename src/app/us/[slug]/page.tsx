import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

const VALID_SLUGS: Record<string, string> = {
  "fda-compliant": "/us/fda-compliant",
  "cannabis-labels": "/us/cannabis-labels",
};

export async function generateStaticParams() {
  return Object.keys(VALID_SLUGS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!VALID_SLUGS[slug]) return { title: "Not Found" };
  return { title: `US ${slug.replace(/-/g, " ")} | Market Guide` };
}

export default async function USSlugPage({ params }: Props) {
  const { slug } = await params;
  const target = VALID_SLUGS[slug];
  if (!target) notFound();
  redirect(target);
}
