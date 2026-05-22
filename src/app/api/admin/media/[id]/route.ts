import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";
import { mediaFiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { del } from "@vercel/blob";

// DELETE — 删除图片（同时删除 Vercel Blob 上的文件）
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const { id } = await params;
  const fileId = parseInt(id);

  try {
    // 查找记录
    const fileRows = await db
      .select()
      .from(mediaFiles)
      .where(eq(mediaFiles.id, fileId));
    const file = fileRows[0];

    if (!file) {
      return NextResponse.json({ error: "文件不存在" }, { status: 404 });
    }

    // 删除 Vercel Blob 上的文件（仅当 URL 是 blob URL 时）
    if (file.url && file.url.includes("blob.vercel-storage.com")) {
      try {
        await del(file.url);
      } catch {
        // Blob 删除失败不阻塞数据库删除
        console.warn("Blob 文件删除失败:", file.url);
      }

      // 删除缩略图（存储在 folder 字段中）
      if (file.folder && file.folder.includes("blob.vercel-storage.com")) {
        try {
          await del(file.folder);
        } catch {
          console.warn("缩略图删除失败:", file.folder);
        }
      }
    }

    // 删除数据库记录
    await db.delete(mediaFiles).where(eq(mediaFiles.id, fileId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("删除图片失败:", error);
    return NextResponse.json({ error: "删除失败" }, { status: 500 });
  }
}

// PATCH — 更新图片 alt 文本和分类
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const { id } = await params;
  const fileId = parseInt(id);

  try {
    const body = await request.json();
    const { alt, categoryId } = body;

    const updateData: { alt?: string; categoryId?: number | null } = {};
    if (alt !== undefined) updateData.alt = alt || "";
    if (categoryId !== undefined) {
      updateData.categoryId =
        categoryId === null ? null : parseInt(String(categoryId));
    }

    await db
      .update(mediaFiles)
      .set(updateData)
      .where(eq(mediaFiles.id, fileId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("更新图片失败:", error);
    return NextResponse.json({ error: "更新失败" }, { status: 500 });
  }
}
