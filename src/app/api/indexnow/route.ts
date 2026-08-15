import { NextRequest, NextResponse } from "next/server";
import { submitIndexNow } from "@/lib/indexnow";
import { getSessionFromRequest } from "@/lib/session";

export const dynamic = "force-dynamic";

function isAuthorized(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const providedSecret = request.headers.get("x-cron-secret");
  return Boolean(cronSecret && providedSecret && cronSecret === providedSecret);
}

export async function POST(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  if (!isAuthorized(request) && !session?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: { urls?: unknown };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON" }, { status: 400 });
  }

  if (!Array.isArray(payload.urls) || payload.urls.some((url) => typeof url !== "string")) {
    return NextResponse.json({ error: "urls must be an array of strings" }, { status: 400 });
  }

  try {
    const result = await submitIndexNow(payload.urls);
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("[indexnow] submission failed:", error);
    return NextResponse.json({ error: "IndexNow submission failed" }, { status: 502 });
  }
}
