import { db } from "@/lib/db";
import { contactInquiries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Building2, Globe, Phone, Calendar, MessageSquare } from "lucide-react";
import UpdateStatusForm from "@/components/admin/UpdateStatusForm";

export const dynamic = "force-dynamic";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700 border-blue-200",
  in_progress: "bg-amber-100 text-amber-700 border-amber-200",
  replied: "bg-emerald-100 text-emerald-700 border-emerald-200",
  closed: "bg-slate-100 text-slate-500 border-slate-200",
};

const STATUS_LABELS: Record<string, string> = {
  new: "新建",
  in_progress: "跟进中",
  replied: "已回复",
  closed: "已关闭",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function InquiryDetailPage({ params }: Props) {
  const { id } = await params;
  const inquiryRows = await db
    .select()
    .from(contactInquiries)
    .where(eq(contactInquiries.id, parseInt(id)));
  const inquiry = inquiryRows[0];

  if (!inquiry) notFound();

  return (
    <div className="max-w-3xl">
      <Link href="/admin/inquiries" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        返回询盘列表
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{inquiry.firstName} {inquiry.lastName}</h1>
          <p className="text-slate-500 text-sm mt-1">询盘编号 #{inquiry.id}</p>
        </div>
        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold border ${STATUS_COLORS[inquiry.status]}`}>
          {STATUS_LABELS[inquiry.status] || inquiry.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {/* Contact Info */}
        <div className="bg-white border border-slate-200  p-5">
          <h2 className="font-bold text-xs text-slate-500 uppercase tracking-wide mb-4">联系信息</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <a href={`mailto:${inquiry.email}`} className="text-blue-600 hover:underline text-sm">{inquiry.email}</a>
            </div>
            {inquiry.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-700 text-sm">{inquiry.phone}</span>
              </div>
            )}
            {inquiry.company && (
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-700 text-sm">{inquiry.company}</span>
              </div>
            )}
            {inquiry.country && (
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-700 text-sm">{inquiry.country}</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-slate-500 text-sm">
                {new Date(inquiry.createdAt).toLocaleString("zh-CN", {
                  year: "numeric", month: "long", day: "numeric",
                  hour: "2-digit", minute: "2-digit"
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Update Status */}
        <UpdateStatusForm
          id={inquiry.id}
          currentStatus={inquiry.status}
          currentNotes={inquiry.notes || ""}
          type="inquiry"
          statusOptions={[
            { value: "new", label: "新建" },
            { value: "in_progress", label: "跟进中" },
            { value: "replied", label: "已回复" },
            { value: "closed", label: "已关闭" },
          ]}
        />
      </div>

      {/* Message */}
      <div className="bg-white border border-slate-200  p-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-4 h-4 text-slate-400" />
          <h2 className="font-bold text-slate-900 text-sm">
            {inquiry.subject || "询盘内容"}
          </h2>
        </div>
        <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{inquiry.message}</p>
      </div>

      {/* Quick Reply */}
      <div className="bg-blue-50 border border-blue-200  p-5">
        <h2 className="font-bold text-slate-900 text-sm mb-3">快速回复</h2>
        <a
          href={`mailto:${inquiry.email}?subject=Re: ${inquiry.subject || "Your Inquiry"} — Zhixin Paper&body=Dear ${inquiry.firstName},%0D%0A%0D%0AThank you for contacting Zhixin Paper.%0D%0A%0D%0A`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold  text-sm transition-colors"
        >
          <Mail className="w-4 h-4" />
          发送邮件回复
        </a>
      </div>
    </div>
  );
}
