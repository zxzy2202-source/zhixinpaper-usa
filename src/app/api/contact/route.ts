import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/lib/db";
import { contactInquiries } from "@/lib/db/schema";
import { rateLimit } from "@/lib/rate-limit";
import { notifyAll } from "@/lib/notify";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || "placeholder");
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: max 5 contact submissions per minute per IP
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const { success: rateLimitOk } = rateLimit(ip, { maxRequests: 5, windowMs: 60000 });
    if (!rateLimitOk) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { firstName, lastName, company, email, country, subject, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to database
    try {
      await db.insert(contactInquiries).values({
        firstName,
        lastName,
        email,
        company: company || null,
        country: country || null,
        subject: subject || null,
        message,
        status: "new",
        source: "contact_form",
        ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || null,
      });
    } catch (dbError) {
      console.error("DB insert error (contact):", dbError);
      // Don't fail the request if DB write fails — notification still goes out
    }

    // 销售通知：Server酱（微信秒推）+ Resend 邮件兜底，必须 await
    await notifyAll({
      kind: "contact",
      name: `${firstName} ${lastName}`,
      email,
      company,
      country,
      subject,
      message,
      source: "contact_form",
    });

    // 客户自动回复（独立通道，失败不影响询盘流程）
    try {
      const resend = getResend();
      await resend.emails.send({
        from: "Zhixin Paper <Sales@zxpapers.com>",
        to: [email],
        subject: "We received your message — Zhixin Paper",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #1e40af; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 20px;">Thank You for Contacting Us</h1>
            <p style="margin: 5px 0 0; opacity: 0.8; font-size: 14px;">Zhixin Paper — Thermal Paper Manufacturer</p>
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
            <p style="color: #1e293b; font-size: 15px; line-height: 1.6;">Dear ${firstName},</p>
            <p style="color: #1e293b; font-size: 15px; line-height: 1.6;">
              Thank you for reaching out to Zhixin Paper. We have received your message and our sales team will respond within <strong>24 business hours</strong>.
            </p>
            <p style="color: #1e293b; font-size: 15px; line-height: 1.6;">
              For urgent inquiries, you can also reach us via:
            </p>
            <ul style="color: #1e293b; font-size: 15px; line-height: 2;">
              <li>📧 Email: <a href="mailto:Sales@zxpapers.com" style="color: #2563eb;">Sales@zxpapers.com</a></li>
              <li>📱 WhatsApp: <a href="https://wa.me/8618792771927" style="color: #2563eb;">+86 187 9277 1927</a></li>
              <li>📞 Phone: +86 153 3924 7872</li>
            </ul>
            <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin-top: 20px;">
              Business Hours: Monday–Friday, 9:00–18:00 GMT+8
            </p>
            <div style="margin-top: 24px; padding: 16px; background: white; border: 1px solid #e2e8f0; border-radius: 6px;">
              <p style="font-weight: bold; color: #475569; margin: 0 0 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Your Message Summary:</p>
              <p style="color: #64748b; margin: 0; font-size: 13px; line-height: 1.6; white-space: pre-wrap;">${message.substring(0, 300)}${message.length > 300 ? "..." : ""}</p>
            </div>
          </div>
          <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 16px;">
            Zhixin Paper Co., Ltd. | Building 15, Phase 1 Zone 2, Ronghao Industrial Park, Gaoling District, Xi'an, Shaanxi, China<br/>
            <a href="https://www.zhixinpaper.com" style="color: #94a3b8;">www.zhixinpaper.com</a>
          </p>
        </div>
      `,
      });
    } catch (e) {
      console.warn("[contact] auto-reply failed:", (e as Error).message);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
