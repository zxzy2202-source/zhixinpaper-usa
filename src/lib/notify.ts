/**
 * 询盘通知中枢
 * ─────────────────────────────────────────────────────────────────
 * 设计目标：销售在 5 分钟内拿到询盘。
 *
 * 通道：
 *   1) Server酱  → 微信秒推（主通道，老板手机即时弹）
 *   2) Resend    → 邮件（兜底通道，HTML 详情留底）
 *
 * 关键约束：
 *   - 所有 fire-and-forget 副作用必须被 await。
 *     Next.js 16 与 Vercel Serverless 一样，响应返回后会立刻 kill
 *     未 await 的 promise，导致通知丢失。
 *   - 任一通道失败不影响其他通道（Promise.allSettled）。
 *   - 模板按询盘类型分流（contact / quote / samples），各类摘要不同。
 */

import { Resend } from "resend";

// ── 通用类型 ─────────────────────────────────────────────────────
export type InquiryKind = "contact" | "quote" | "samples";

export interface InquiryPayload {
  kind: InquiryKind;
  /** 客户姓名 */
  name: string;
  /** 客户邮箱（用于邮件 replyTo） */
  email: string;
  /** 客户公司（可选） */
  company?: string;
  /** 客户国家 */
  country?: string;
  /** 客户电话 */
  phone?: string;
  /** 询盘主题 / 产品摘要 */
  subject?: string;
  /** 关键字段表（按询盘类型不同） */
  details?: Record<string, string | undefined | null>;
  /** 客户主诉文本 */
  message?: string;
  /** 来源标识（如 quote_form, product_pdp） */
  source?: string;
}

// ── 模板：标题（用于 Server酱 title / 邮件 subject） ──────────────
function buildTitle(p: InquiryPayload): string {
  const tag =
    p.kind === "quote"
      ? "🎯 Quote Request"
      : p.kind === "samples"
        ? "📦 Sample Request"
        : "✉️ Contact";
  const who = p.company || p.name;
  return `[${tag}] ${who}${p.country ? ` · ${p.country}` : ""}`;
}

// ── 模板：Markdown 摘要（Server酱 desp） ─────────────────────────
function buildMarkdown(p: InquiryPayload): string {
  const rows: string[] = [
    `## ${buildTitle(p)}`,
    "",
    `**Name** · ${p.name}`,
    `**Email** · ${p.email}`,
  ];
  if (p.company) rows.push(`**Company** · ${p.company}`);
  if (p.country) rows.push(`**Country** · ${p.country}`);
  if (p.phone) rows.push(`**Phone** · ${p.phone}`);
  if (p.subject) rows.push(`**Subject** · ${p.subject}`);

  if (p.details) {
    const keys = Object.keys(p.details).filter((k) => p.details![k]);
    if (keys.length) {
      rows.push("", "---", "");
      for (const k of keys) rows.push(`**${k}** · ${p.details![k]}`);
    }
  }

  if (p.message) {
    rows.push("", "---", "", "**Message**", "", "```", p.message, "```");
  }

  if (p.source) {
    rows.push("", `_Source · ${p.source}_`);
  }

  rows.push("", `_Time · ${new Date().toISOString()}_`);
  return rows.join("\n");
}

// ── 模板：HTML 邮件正文 ──────────────────────────────────────────
function buildEmailHtml(p: InquiryPayload): string {
  const color =
    p.kind === "quote" ? "#f59e0b" : p.kind === "samples" ? "#059669" : "#1e40af";
  const banner =
    p.kind === "quote"
      ? "⚡ Priority Lead — respond within 4 business hours"
      : p.kind === "samples"
        ? "📋 Prepare and ship sample kit to address above"
        : "Reply directly to respond. Target: 24 business hours.";
  const bgBanner =
    p.kind === "quote" ? "#fef3c7" : p.kind === "samples" ? "#ecfdf5" : "#eff6ff";
  const textBanner =
    p.kind === "quote" ? "#92400e" : p.kind === "samples" ? "#065f46" : "#1e40af";

  const detailRows = p.details
    ? Object.entries(p.details)
        .filter(([, v]) => v)
        .map(
          ([k, v]) => `
        <tr>
          <td style="padding:8px 0;font-weight:bold;color:#475569;width:160px;font-size:14px;">${escapeHtml(k)}:</td>
          <td style="padding:8px 0;color:#1e293b;font-size:14px;">${escapeHtml(String(v))}</td>
        </tr>`
        )
        .join("")
    : "";

  const messageBlock = p.message
    ? `
      <div style="margin-top:16px;padding:16px;background:white;border:1px solid #e2e8f0;border-radius:6px;">
        <p style="font-weight:bold;color:#475569;margin:0 0 8px;font-size:14px;">Message:</p>
        <p style="color:#1e293b;margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(p.message)}</p>
      </div>`
    : "";

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
      <div style="background:${color};color:white;padding:20px;border-radius:8px 8px 0 0;">
        <h1 style="margin:0;font-size:20px;">${escapeHtml(buildTitle(p))}</h1>
        <p style="margin:5px 0 0;opacity:0.85;font-size:14px;">Zhixin Paper Website</p>
      </div>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-top:none;padding:24px;border-radius:0 0 8px 8px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:8px 0;font-weight:bold;color:#475569;width:160px;font-size:14px;">Name:</td>
            <td style="padding:8px 0;color:#1e293b;font-size:14px;">${escapeHtml(p.name)}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-weight:bold;color:#475569;font-size:14px;">Email:</td>
            <td style="padding:8px 0;font-size:14px;"><a href="mailto:${escapeHtml(p.email)}" style="color:#2563eb;">${escapeHtml(p.email)}</a></td>
          </tr>
          ${p.company ? `<tr><td style="padding:8px 0;font-weight:bold;color:#475569;font-size:14px;">Company:</td><td style="padding:8px 0;color:#1e293b;font-size:14px;">${escapeHtml(p.company)}</td></tr>` : ""}
          ${p.country ? `<tr><td style="padding:8px 0;font-weight:bold;color:#475569;font-size:14px;">Country:</td><td style="padding:8px 0;color:#1e293b;font-size:14px;">${escapeHtml(p.country)}</td></tr>` : ""}
          ${p.phone ? `<tr><td style="padding:8px 0;font-weight:bold;color:#475569;font-size:14px;">Phone:</td><td style="padding:8px 0;color:#1e293b;font-size:14px;">${escapeHtml(p.phone)}</td></tr>` : ""}
          ${p.subject ? `<tr><td style="padding:8px 0;font-weight:bold;color:#475569;font-size:14px;">Subject:</td><td style="padding:8px 0;color:#1e293b;font-size:14px;">${escapeHtml(p.subject)}</td></tr>` : ""}
          ${detailRows}
        </table>
        ${messageBlock}
        <div style="margin-top:20px;padding:12px 16px;background:${bgBanner};border-left:4px solid ${color};border-radius:0 6px 6px 0;">
          <p style="margin:0;font-size:13px;color:${textBanner};"><strong>Action Required:</strong> ${banner}</p>
        </div>
      </div>
      <p style="text-align:center;color:#94a3b8;font-size:12px;margin-top:16px;">
        Sent from zhixinpaper.com${p.source ? ` · source: ${escapeHtml(p.source)}` : ""}
      </p>
    </div>
  `;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ── 通道 1：Server酱 ─────────────────────────────────────────────
async function sendServerChan(p: InquiryPayload): Promise<{
  ok: boolean;
  error?: string;
}> {
  const sendkey = process.env.SERVERCHAN_SENDKEY;
  if (!sendkey) return { ok: false, error: "SERVERCHAN_SENDKEY not set" };

  try {
    const res = await fetch(`https://sctapi.ftqq.com/${sendkey}.send`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        title: buildTitle(p),
        desp: buildMarkdown(p),
      }).toString(),
      // 5 秒超时，防止 Serverless 卡死
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    const data = (await res.json()) as { code?: number; message?: string };
    if (data.code !== 0) {
      return { ok: false, error: `Server酱 code=${data.code} ${data.message ?? ""}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

// ── 通道 2：Resend 邮件 ──────────────────────────────────────────
async function sendEmail(p: InquiryPayload): Promise<{
  ok: boolean;
  error?: string;
}> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, error: "RESEND_API_KEY not set" };

  const to = process.env.NOTIFY_EMAIL_TO || "Sales@zxpapers.com";
  const from =
    process.env.NOTIFY_EMAIL_FROM ||
    "Zhixin Paper Website <noreply@zhixinpaper.com>";

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: p.email,
      subject: buildTitle(p),
      html: buildEmailHtml(p),
    });
    if (error) return { ok: false, error: String(error) };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

// ── 主入口：并发推送，任一失败不阻塞其他 ─────────────────────────
export interface NotifyResult {
  serverchan: { ok: boolean; error?: string };
  email: { ok: boolean; error?: string };
  /** 是否至少一个通道成功 */
  anyOk: boolean;
}

/**
 * 并发推送所有通道；必须 await 调用。
 *
 * 用法：
 *   const result = await notifyAll({ kind: "quote", name, email, ... });
 *   if (!result.anyOk) console.error("all channels failed", result);
 */
export async function notifyAll(p: InquiryPayload): Promise<NotifyResult> {
  const [scResult, mailResult] = await Promise.allSettled([
    sendServerChan(p),
    sendEmail(p),
  ]);

  const serverchan =
    scResult.status === "fulfilled"
      ? scResult.value
      : { ok: false, error: String(scResult.reason) };
  const email =
    mailResult.status === "fulfilled"
      ? mailResult.value
      : { ok: false, error: String(mailResult.reason) };

  const result: NotifyResult = { serverchan, email, anyOk: serverchan.ok || email.ok };

  // 任一失败都打日志，方便后台排查（不影响请求成功返回）
  if (!serverchan.ok) {
    console.warn("[notify] serverchan failed:", serverchan.error);
  }
  if (!email.ok) {
    console.warn("[notify] email failed:", email.error);
  }

  return result;
}
