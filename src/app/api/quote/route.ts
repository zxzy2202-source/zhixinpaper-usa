import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/lib/db";
import { quoteRequests } from "@/lib/db/schema";
import { rateLimit } from "@/lib/rate-limit";
import { notifyAll } from "@/lib/notify";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || "placeholder");
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: max 5 quote requests per minute per IP
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
      products,
      quantity,
      incoterms,
      specifications,
      customPrinting,
      notes,
      source,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !company) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const productList = Array.isArray(products) && products.length > 0
      ? products.join(", ")
      : "Not specified";

    // Save to database
    try {
      await db.insert(quoteRequests).values({
        firstName,
        lastName,
        email,
        company: company || null,
        phone: phone || null,
        country: country || null,
        productType: products ? (Array.isArray(products) ? products.join(", ") : products) : null,
        quantity: quantity || null,
        specifications: specifications || null,
        message: notes || null,
        status: "new",
        source: source || "quote_form",
        ipAddress: request.headers.get("x-forwarded-for") || null,
      });
    } catch (dbError) {
      console.error("DB insert error (quote):", dbError);
    }

    // 销售通知：Server酱（微信秒推）+ Resend 邮件兜底，必须 await
    await notifyAll({
      kind: "quote",
      name: `${firstName} ${lastName}`,
      email,
      company,
      country,
      phone,
      subject: productList,
      details: {
        Products: productList,
        "Annual Volume": quantity,
        Incoterms: incoterms,
        Specifications: specifications,
        "Custom Printing": customPrinting,
      },
      message: notes,
      source: source || "quote_form",
    });

    // 客户自动回复
    try {
      const resend = getResend();
      await resend.emails.send({
        from: "Zhixin Paper <Sales@zxpapers.com>",
        to: [email],
        subject: "Quote Request Received — Zhixin Paper",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #1e40af; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 20px;">Quote Request Received</h1>
            <p style="margin: 5px 0 0; opacity: 0.8; font-size: 14px;">Zhixin Paper — Thermal Paper Manufacturer</p>
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
            <p style="color: #1e293b; font-size: 15px; line-height: 1.6;">Dear ${firstName},</p>
            <p style="color: #1e293b; font-size: 15px; line-height: 1.6;">
              Thank you for your quote request. Our sales team has received your enquiry and will prepare a detailed quotation within <strong>24 business hours</strong>.
            </p>
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0;">
              <p style="font-weight: bold; color: #475569; margin: 0 0 12px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Your Quote Summary:</p>
              <table style="width: 100%; font-size: 14px;">
                <tr>
                  <td style="padding: 4px 0; color: #64748b; width: 140px;">Products:</td>
                  <td style="padding: 4px 0; color: #1e293b;">${productList}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #64748b;">Annual Volume:</td>
                  <td style="padding: 4px 0; color: #1e293b;">${quantity || "—"}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #64748b;">Incoterms:</td>
                  <td style="padding: 4px 0; color: #1e293b;">${incoterms || "—"}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #64748b;">Specifications:</td>
                  <td style="padding: 4px 0; color: #1e293b;">${specifications || "—"}</td>
                </tr>
              </table>
            </div>
            <p style="color: #1e293b; font-size: 15px; line-height: 1.6;">
              For faster service, contact us directly:
            </p>
            <ul style="color: #1e293b; font-size: 15px; line-height: 2;">
              <li>📧 Email: <a href="mailto:Sales@zxpapers.com" style="color: #2563eb;">Sales@zxpapers.com</a></li>
              <li>📱 WhatsApp: <a href="https://wa.me/8618792771927" style="color: #2563eb;">+86 187 9277 1927</a></li>
            </ul>
          </div>
          <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 16px;">
            Zhixin Paper Co., Ltd. | Xi'an, Shaanxi, China | <a href="https://www.zhixinpaper.com" style="color: #94a3b8;">www.zhixinpaper.com</a>
          </p>
        </div>
      `,
      });
    } catch (e) {
      console.warn("[quote] auto-reply failed:", (e as Error).message);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
