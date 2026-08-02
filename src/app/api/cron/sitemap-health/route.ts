import { NextRequest, NextResponse } from "next/server";
import { checkSitemapHealth, toPublicSitemapHealth } from "@/lib/sitemap-health";
import { isCronAuthorized, sendSitemapHealthAlert } from "@/lib/sitemap-health-alert";

export const dynamic = "force-dynamic";

const NO_STORE_HEADERS = { "Cache-Control": "no-store" };

export async function GET(request: NextRequest) {
  if (!isCronAuthorized(request.headers.get("authorization"), process.env.CRON_SECRET)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401, headers: NO_STORE_HEADERS });
  }

  const sitemapUrl = new URL("/sitemap.xml", request.nextUrl.origin).toString();
  const health = await checkSitemapHealth(sitemapUrl);
  if (health.ok) {
    return NextResponse.json(
      { ...toPublicSitemapHealth(health), alert: { required: false, configured: false, sent: false } },
      { headers: NO_STORE_HEADERS },
    );
  }

  console.error("[sitemap-monitor] health check failed:", health.error);
  const alert = await sendSitemapHealthAlert(health);

  return NextResponse.json(
    {
      ...toPublicSitemapHealth(health),
      alert: { required: true, configured: alert.configured, sent: alert.sent },
    },
    { status: 503, headers: NO_STORE_HEADERS },
  );
}
