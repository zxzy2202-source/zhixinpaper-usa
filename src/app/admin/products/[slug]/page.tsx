import { db } from "@/lib/db";
import { productOverrides } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { THERMAL_PAPER_ROLLS, THERMAL_LABELS } from "@/lib/data";
import { notFound } from "next/navigation";
import ProductEditor from "@/components/admin/ProductEditor";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ type?: string }>;
}

export default async function ProductEditPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { type } = await searchParams;

  const productType = type === "label" ? "label" : "roll";

  // Find base product data
  const baseProduct = productType === "roll"
    ? THERMAL_PAPER_ROLLS.find((p) => p.slug === slug)
    : THERMAL_LABELS.find((p) => p.slug === slug);

  if (!baseProduct) notFound();

  // Get any existing override
  const overrideRows = await db
    .select()
    .from(productOverrides)
    .where(eq(productOverrides.slug, slug));
  const override = overrideRows[0];

  return (
    <ProductEditor
      slug={slug}
      productType={productType}
      baseProduct={baseProduct}
      override={override || null}
    />
  );
}
