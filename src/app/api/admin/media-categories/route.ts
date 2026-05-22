import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";
import { mediaCategories } from "@/lib/db/schema";
import { eq, asc, sql } from "drizzle-orm";
import { mediaFiles } from "@/lib/db/schema";

// GET /api/admin/media-categories — 获取所有分类（含图片数量）
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  try {
    const categories = await db
      .select()
      .from(mediaCategories)
      .orderBy(asc(mediaCategories.sortOrder), asc(mediaCategories.name));

    const counts = await db
      .select({
        categoryId: mediaFiles.categoryId,
        count: sql<number>`count(*)`,
      })
      .from(mediaFiles)
      .groupBy(mediaFiles.categoryId);

    const countMap: Record<number, number> = {};
    counts.forEach((row) => {
      if (row.categoryId !== null) {
        countMap[row.categoryId] = row.count;
      }
    });

    const result = categories.map((cat) => ({
      ...cat,
      imageCount: countMap[cat.id] ?? 0,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("获取分类失败:", error);
    return NextResponse.json({ error: "获取分类失败" }, { status: 500 });
  }
}

// POST /api/admin/media-categories — 创建新分类
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, slug, description, color, sortOrder } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: "分类名称和标识符不能为空" }, { status: 400 });
    }

    // 检查重复
    const existing = await db
      .select()
      .from(mediaCategories)
      .where(eq(mediaCategories.slug, slug));

    if (existing.length > 0) {
      return NextResponse.json({ error: "该标识符已存在" }, { status: 409 });
    }

    const created = await db
      .insert(mediaCategories)
      .values({
        name: name.trim(),
        slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
        description: description?.trim() || "",
        color: color || "#6366f1",
        sortOrder: sortOrder ?? 0,
      })
      .returning();

    return NextResponse.json({ ...created[0], imageCount: 0 }, { status: 201 });
  } catch (error) {
    console.error("创建分类失败:", error);
    return NextResponse.json({ error: "创建分类失败" }, { status: 500 });
  }
}
