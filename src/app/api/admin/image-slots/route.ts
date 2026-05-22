import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";
import { imageSlots, mediaFiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { SLOT_REGISTRY, SLOT_GROUP_LABELS } from "@/lib/imageSlots";
import { invalidateSlotCache } from "@/lib/imageSlotResolver";

/**
 * GET /api/admin/image-slots
 * 返回：SLOT_REGISTRY ⊕ 当前 DB 中的绑定（含媒体文件 url / 缩略图）
 */
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "未授权" }, { status: 401 });

  try {
    const rows = await db
      .select({
        slotKey: imageSlots.slotKey,
        mediaFileId: imageSlots.mediaFileId,
        updatedAt: imageSlots.updatedAt,
        url: mediaFiles.url,
        filename: mediaFiles.originalName,
        width: mediaFiles.width,
        height: mediaFiles.height,
      })
      .from(imageSlots)
      .leftJoin(mediaFiles, eq(imageSlots.mediaFileId, mediaFiles.id));

    const bindingMap = new Map(rows.map((r) => [r.slotKey, r]));

    const slots = SLOT_REGISTRY.map((def) => {
      const b = bindingMap.get(def.key);
      return {
        ...def,
        binding: b
          ? {
              mediaFileId: b.mediaFileId,
              url: b.url,
              filename: b.filename,
              width: b.width,
              height: b.height,
              updatedAt: b.updatedAt,
            }
          : null,
      };
    });

    return NextResponse.json({
      slots,
      groupLabels: SLOT_GROUP_LABELS,
    });
  } catch (e) {
    console.error("[image-slots] GET failed:", e);
    return NextResponse.json({ error: "查询失败" }, { status: 500 });
  }
}

/**
 * PUT /api/admin/image-slots
 * body: { slotKey: string, mediaFileId: number | null }
 * - mediaFileId = null → 解绑
 */
export async function PUT(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "未授权" }, { status: 401 });

  let body: { slotKey?: string; mediaFileId?: number | null };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "请求体非法" }, { status: 400 });
  }

  const { slotKey, mediaFileId } = body;
  if (!slotKey || typeof slotKey !== "string") {
    return NextResponse.json({ error: "缺少 slotKey" }, { status: 400 });
  }
  if (!SLOT_REGISTRY.find((s) => s.key === slotKey)) {
    return NextResponse.json({ error: `未注册槽位: ${slotKey}` }, { status: 400 });
  }
  if (mediaFileId !== null && typeof mediaFileId !== "number") {
    return NextResponse.json({ error: "mediaFileId 必须是 number 或 null" }, { status: 400 });
  }

  try {
    // upsert：先 delete 再 insert（SQLite 简单写法）
    await db.delete(imageSlots).where(eq(imageSlots.slotKey, slotKey));
    if (mediaFileId !== null) {
      await db.insert(imageSlots).values({
        slotKey,
        mediaFileId,
        updatedBy: session.id,
      });
    }
    invalidateSlotCache();
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[image-slots] PUT failed:", e);
    return NextResponse.json({ error: "保存失败" }, { status: 500 });
  }
}
