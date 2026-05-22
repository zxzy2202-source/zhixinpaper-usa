import { db } from "@/lib/db";
import { imageSlots, mediaFiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { SLOT_REGISTRY } from "@/lib/imageSlots";
import { getHeroHome } from "@/lib/siteSettings";
import HeroEditor from "./HeroEditor";

export const dynamic = "force-dynamic";

export default async function HeroAdminPage() {
  const heroSlot = SLOT_REGISTRY.find((s) => s.key === "home.hero");

  const binding = await db
    .select({
      url: mediaFiles.url,
      filename: mediaFiles.originalName,
      width: mediaFiles.width,
      height: mediaFiles.height,
    })
    .from(imageSlots)
    .leftJoin(mediaFiles, eq(imageSlots.mediaFileId, mediaFiles.id))
    .where(eq(imageSlots.slotKey, "home.hero"))
    .limit(1);

  const currentImage = binding[0]?.url ?? heroSlot?.fallback ?? "";
  const isCustomImage = !!binding[0]?.url;
  const hero = await getHeroHome();

  return (
    <HeroEditor
      initialHero={hero}
      currentImage={currentImage}
      isCustomImage={isCustomImage}
      recommendedSize={heroSlot?.recommendedSize}
      filename={binding[0]?.filename ?? null}
    />
  );
}
