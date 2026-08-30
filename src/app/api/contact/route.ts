import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/lib/db";
import { contactInquiries } from "@/lib/db/schema";
import { rateLimit } from "@/lib/rate-limit";
import { notifyAll, type InquiryAttachment } from "@/lib/notify";
import { buildInquiryResponse } from "@/lib/inquiry-delivery";
import { COMPANY } from "@/lib/data";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || "placeholder");
}

const MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024;
const MAX_TOTAL_ATTACHMENT_SIZE = 20 * 1024 * 1024;
const ALLOWED_ATTACHMENT_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

function cleanFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120) || "attachment";
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

    const isMultipart = request.headers.get("content-type")?.includes("multipart/form-data");
    let fields: Record<string, string> = {};
    const attachments: InquiryAttachment[] = [];

    if (isMultipart) {
      const formData = await request.formData();
      for (const key of ["firstName", "lastName", "company", "email", "whatsapp", "country", "subject", "message", "customerPath"]) {
        const value = formData.get(key);
        if (typeof value === "string") fields[key] = value;
      }

      const files = formData.getAll("attachments").filter((value): value is File => value instanceof File && value.size > 0);
      const totalSize = files.reduce((sum, file) => sum + file.size, 0);
      if (totalSize > MAX_TOTAL_ATTACHMENT_SIZE) {
        return NextResponse.json({ error: "Attachments must total 20 MB or less." }, { status: 400 });
      }
      for (const file of files) {
        if (!ALLOWED_ATTACHMENT_TYPES.has(file.type)) {
          return NextResponse.json({ error: "Please upload PDF, Word, Excel, CSV, JPG, PNG, or WebP files only." }, { status: 400 });
        }
        if (file.size > MAX_ATTACHMENT_SIZE) {
          return NextResponse.json({ error: "Each attachment must be 10 MB or smaller." }, { status: 400 });
        }
        attachments.push({
          filename: cleanFilename(file.name),
          content: Buffer.from(await file.arrayBuffer()),
        });
      }
    } else {
      const body = await request.json();
      fields = Object.fromEntries(
        ["firstName", "lastName", "company", "email", "whatsapp", "country", "subject", "message", "customerPath"]
          .map((key) => [key, typeof body[key] === "string" ? body[key] : ""])
      );
    }

    const { firstName, lastName, company, email, whatsapp, country, subject, message, customerPath } = fields;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const attachmentNames = attachments.map((attachment) => attachment.filename);
    const storedMessage = attachmentNames.length
      ? `${message}\n\nAttachments: ${attachmentNames.join(", ")}`
      : message;
    const source = customerPath ? `contact_${customerPath}` : "contact_form";
    let stored = false;
    try {
      await db.insert(contactInquiries).values({
        firstName,
        lastName,
        email,
        company: company || null,
        phone: whatsapp || null,
        country: country || null,
        subject: subject || null,
        message: storedMessage,
        status: "new",
        source,
        ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || null,
      });
      stored = true;
    } catch (dbError) {
      console.error("DB insert error (contact):", dbError);
    }

    const notification = await notifyAll({
      kind: "contact",
      name: `${firstName} ${lastName}`,
      email,
      company,
      country,
      phone: whatsapp,
      subject,
      details: {
        "Customer path": customerPath || undefined,
        "WhatsApp": whatsapp || undefined,
        Attachments: attachmentNames.length ? attachmentNames.join(", ") : undefined,
      },
      message,
      source,
      attachments,
    });

    const acceptedResponse = buildInquiryResponse({
      stored,
      notificationSent: notification.anyOk,
      autoReplySent: false,
    });
    if (!acceptedResponse) {
      return NextResponse.json(
        { error: "We could not confirm your message was received. Please contact us directly by email or WhatsApp." },
        { status: 503 }
      );
    }

    let autoReplySent = false;
    try {
      const resend = getResend();
      const { error } = await resend.emails.send({
        from: `${COMPANY.name} <${COMPANY.email}>`,
        to: [email],
        subject: `We received your message — ${COMPANY.name}`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #1e40af; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 20px;">Thank You for Contacting Us</h1>
            <p style="margin: 5px 0 0; opacity: 0.8; font-size: 14px;">${COMPANY.name} — Thermal Paper Manufacturer</p>
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
            <p style="color: #1e293b; font-size: 15px; line-height: 1.6;">Dear ${firstName},</p>
            <p style="color: #1e293b; font-size: 15px; line-height: 1.6;">
              Thank you for reaching out to ${COMPANY.name}. We have received your message. Our sales team will review it and follow up based on your project requirements.
            </p>
            <p style="color: #1e293b; font-size: 15px; line-height: 1.6;">
              For urgent inquiries, you can also reach us via:
            </p>
            <ul style="color: #1e293b; font-size: 15px; line-height: 2;">
              <li>📧 Email: <a href="mailto:${COMPANY.email}" style="color: #2563eb;">${COMPANY.email}</a></li>
              <li>📱 WhatsApp: <a href="https://wa.me/${COMPANY.whatsapp.replace(/\+/g, "").replace(/\s/g, "")}" style="color: #2563eb;">${COMPANY.whatsapp}</a></li>
              <li>📞 Phone: ${COMPANY.phone}</li>
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
            ${COMPANY.name} Co., Ltd. | ${COMPANY.address}<br/>
            <a href="https://www.zhixinpaper.com" style="color: #94a3b8;">www.zhixinpaper.com</a>
          </p>
        </div>
      `,
      });
      if (error) {
        throw new Error(error.message);
      }
      autoReplySent = true;
    } catch (e) {
      console.warn("[contact] auto-reply failed:", (e as Error).message);
    }

    return NextResponse.json({ ...acceptedResponse, autoReplySent });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
