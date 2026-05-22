import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";
import { mediaCategories, mediaFiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// PATCH /api/admin/media-categories/[id] — 更新分类
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const { id } = await params;
  const categoryId = parseInt(id);

  if (isNaN(categoryId)) {
    return NextResponse.json({ error: "无效的分类 ID" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { name, slug, description, color, sortOrder } = body;

    const updatedRows = await db
      .update(mediaCategories)
      .set({
        ...(name !== undefined && { name: name.trim() }),
        ...(slug !== undefined && {
          slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
        }),
        ...(description !== undefined && { description: description.trim() }),
        ...(color !== undefined && { color }),
        ...(sortOrder !== undefined && { sortOrder }),
      })
      .where(eq(mediaCategories.id, categoryId))
      .returning();
    const updated = updatedRows[0];

    if (!updated) {
      return NextResponse.json({ error: "分类不存在" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("更新分类失败:", error);
    return NextResponse.json({ error: "更新分类失败" }, { status: 500 });
  }
}

// DELETE /api/admin/media-categories/[id] — 删除分类（图片的 category_id 置为 null）
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const { id } = await params;
  const categoryId = parseInt(id);

  if (isNaN(categoryId)) {
    return NextResponse.json({ error: "无效的分类 ID" }, { status: 400 });
  }

  try {
    // 将该分类下的图片的 category_id 置为 null
    await db.update(mediaFiles)
      .set({ categoryId: null })
      .where(eq(mediaFiles.categoryId, categoryId))
      ;

    // 删除分类
    const deletedRows = await db
      .delete(mediaCategories)
      .where(eq(mediaCategories.id, categoryId))
      .returning();
    const deleted = deletedRows[0];

    if (!deleted) {
      return NextResponse.json({ error: "分类不存在" }, { status: 404 });
    }

    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    console.error("删除分类失败:", error);
    return NextResponse.json({ error: "删除分类失败" }, { status: 500 });
  }
}
