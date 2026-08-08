import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/lib/db";
import { sampleRequests } from "@/lib/db/schema";
import { rateLimit } from "@/lib/rate-limit";
import { notifyAll } from "@/lib/notify";
import { buildInquiryResponse } from "@/lib/inquiry-delivery";
import { COMPANY } from "@/lib/data";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || "placeholder");
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: max 5 sample requests per minute per IP
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const { success: rateLimitOk } = rateLimit(ip, { maxRequests: 5, windowMs: 60000 });
    if (!rateLimitOk) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      firstName,
      lastName,
      company,
      email,
      country,
      phone,
      address,
      products,
      notes,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !company || !address) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let stored = false;
    try {
      await db.insert(sampleRequests).values({
        firstName,
        lastName,
        email,
        company: company || null,
        phone: phone || null,
        country: country || null,
        address: address || null,
        products: Array.isArray(products) ? JSON.stringify(products) : null,
        notes: notes || null,
        status: "new",
        source: "samples_form",
        ipAddress: request.headers.get("x-forwarded-for") || null,
      });
      stored = true;
    } catch (dbError) {
      console.error("DB insert error (samples):", dbError);
    }

    const productList = Array.isArray(products) && products.length > 0
      ? products.join(", ")
      : "Not specified";

    const notification = await notifyAll({
      kind: "samples",
      name: `${firstName} ${lastName}`,
      email,
      company,
      country,
      phone,
      subject: productList,
      details: {
        "Requested Samples": productList,
        "Shipping Address": address,
      },
      message: notes,
      source: "samples_form",
    });

    const acceptedResponse = buildInquiryResponse({
      stored,
      notificationSent: notification.anyOk,
      autoReplySent: false,
    });
    if (!acceptedResponse) {
      return NextResponse.json(
        { error: "We could not confirm your sample request was received. Please contact us directly by email or WhatsApp." },
        { status: 503 }
      );
    }

    let autoReplySent = false;
    try {
      const resend = getResend();
      const { error } = await resend.emails.send({
        from: `${COMPANY.name} <${COMPANY.email}>`,
        to: [email],
        subject: `Sample Request Received — ${COMPANY.name}`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #059669; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 20px;">Sample Request Confirmed</h1>
            <p style="margin: 5px 0 0; opacity: 0.8; font-size: 14px;">${COMPANY.name} — Thermal Paper Manufacturer</p>
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
            <p style="color: #1e293b; font-size: 15px; line-height: 1.6;">Dear ${firstName},</p>
            <p style="color: #1e293b; font-size: 15px; line-height: 1.6;">
              Thank you for requesting samples from ${COMPANY.name}. We have received your request. Our team will review product availability, shipping details, and qualification requirements before confirming the sample plan.
            </p>
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0;">
              <p style="font-weight: bold; color: #475569; margin: 0 0 12px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">What to Expect:</p>
              <ul style="color: #1e293b; font-size: 14px; line-height: 2; margin: 0; padding-left: 20px;">
                <li>Our team will review the requested products and shipping destination</li>
                <li>Availability, courier options, and any sample charges will be confirmed before dispatch</li>
                <li>A tracking number will be provided if and when the sample kit ships</li>
                <li>Transit time depends on destination, courier service, and customs clearance</li>
              </ul>
            </div>
            <p style="color: #1e293b; font-size: 15px; line-height: 1.6;">
              If you have any questions, contact us:
            </p>
            <ul style="color: #1e293b; font-size: 15px; line-height: 2;">
              <li>📧 <a href="mailto:${COMPANY.email}" style="color: #2563eb;">${COMPANY.email}</a></li>
              <li>📱 WhatsApp: <a href="https://wa.me/${COMPANY.whatsapp.replace(/\+/g, "").replace(/\s/g, "")}" style="color: #2563eb;">${COMPANY.whatsapp}</a></li>
            </ul>
          </div>
          <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 16px;">
            ${COMPANY.name} Co., Ltd. | Xi'an, Shaanxi, China | <a href="https://www.zhixinpaper.com" style="color: #94a3b8;">www.zhixinpaper.com</a>
          </p>
        </div>
      `,
      });
      if (error) {
        throw new Error(error.message);
      }
      autoReplySent = true;
    } catch (e) {
      console.warn("[samples] auto-reply failed:", (e as Error).message);
    }

    return NextResponse.json({ ...acceptedResponse, autoReplySent });
  } catch (error) {
    console.error("Samples API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
