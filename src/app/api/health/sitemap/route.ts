import { NextRequest, NextResponse } from "next/server";
import { checkSitemapHealth, toPublicSitemapHealth } from "@/lib/sitemap-health";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const sitemapUrl = new URL("/sitemap.xml", request.nextUrl.origin).toString();
  const health = await checkSitemapHealth(sitemapUrl);

  if (!health.ok) {
    console.error("[sitemap-health] check failed:", health.error);
  }

  return NextResponse.json(toPublicSitemapHealth(health), {
    status: health.ok ? 200 : 503,
    headers: { "Cache-Control": "no-store" },
  });
}
