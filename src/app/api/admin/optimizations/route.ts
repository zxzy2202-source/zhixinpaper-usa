import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { createOptimizationLog, listOptimizationLogs } from "@/lib/optimizationLog";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "未授权" }, { status: 401 });

  try {
    const records = await listOptimizationLogs();
    return NextResponse.json({ records, count: records.length });
  } catch (error) {
    console.error("[optimizations] GET failed:", error);
    return NextResponse.json({ error: "查询优化记录失败" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "未授权" }, { status: 401 });
  if (session.role === "viewer") {
    return NextResponse.json({ error: "只读账号不能新增记录" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "请求体非法" }, { status: 400 });
  }

  try {
    const payload = body && typeof body === "object"
      ? { ...body, source: "admin", createdBy: session.email }
      : body;
    const result = await createOptimizationLog(payload, session.id);
    revalidatePath("/admin/optimizations");
    return NextResponse.json(
      { ok: true, created: result.created, record: result.record },
      { status: result.created ? 201 : 200 },
    );
  } catch (error) {
    const fields = error instanceof Error && "fields" in error
      ? (error as Error & { fields?: Record<string, string> }).fields
      : undefined;
    if (fields) return NextResponse.json({ error: "字段校验失败", fields }, { status: 400 });
    console.error("[optimizations] POST failed:", error);
    return NextResponse.json({ error: "保存优化记录失败" }, { status: 500 });
  }
}
