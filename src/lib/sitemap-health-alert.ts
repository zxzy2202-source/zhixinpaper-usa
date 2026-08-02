import { timingSafeEqual } from "node:crypto";
import { Resend } from "resend";
import type { SitemapHealthSnapshot } from "@/lib/sitemap-health";

export type SitemapAlertResult = {
  configured: boolean;
  sent: boolean;
  serverchan: { configured: boolean; ok: boolean };
  email: { configured: boolean; ok: boolean };
};

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function isCronAuthorized(authorization: string | null, secret: string | undefined) {
  if (!secret || !authorization?.startsWith("Bearer ")) return false;
  return safeEqual(authorization.slice("Bearer ".length), secret);
}

function buildAlertText(snapshot: SitemapHealthSnapshot) {
  return [
    "Sitemap health check failed.",
    "",
    `Database: ${snapshot.database}`,
    `Sitemap: ${snapshot.sitemap}`,
    `Static posts: ${snapshot.staticPosts}`,
    `Published database posts: ${snapshot.publishedDatabasePosts ?? "unavailable"}`,
    `Missing database posts: ${snapshot.missingDatabasePosts ?? "unavailable"}`,
    `Checked at: ${snapshot.checkedAt}`,
    "",
    "Review database access, sitemap availability, and published database post membership.",
  ].join("\n");
}

async function sendServerChanAlert(snapshot: SitemapHealthSnapshot) {
  const sendkey = process.env.SERVERCHAN_SENDKEY;
  if (!sendkey) return { configured: false, ok: false };

  try {
    const response = await fetch(`https://sctapi.ftqq.com/${sendkey}.send`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        title: "[Zhixin Paper] Sitemap health check failed",
        desp: buildAlertText(snapshot),
      }).toString(),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return { configured: true, ok: false };
    const body = (await response.json()) as { code?: number };
    return { configured: true, ok: body.code === 0 };
  } catch {
    return { configured: true, ok: false };
  }
}

async function sendEmailAlert(snapshot: SitemapHealthSnapshot) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.SITEMAP_ALERT_EMAIL_TO || process.env.NOTIFY_EMAIL_TO;
  const from = process.env.SITEMAP_ALERT_EMAIL_FROM || process.env.NOTIFY_EMAIL_FROM;
  if (!apiKey || !to || !from) return { configured: false, ok: false };

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: "[Zhixin Paper] Sitemap health check failed",
      text: buildAlertText(snapshot),
    });
    return { configured: true, ok: !error };
  } catch {
    return { configured: true, ok: false };
  }
}

export async function sendSitemapHealthAlert(snapshot: SitemapHealthSnapshot): Promise<SitemapAlertResult> {
  const [serverchan, email] = await Promise.all([
    sendServerChanAlert(snapshot),
    sendEmailAlert(snapshot),
  ]);

  return {
    configured: serverchan.configured || email.configured,
    sent: serverchan.ok || email.ok,
    serverchan,
    email,
  };
}
