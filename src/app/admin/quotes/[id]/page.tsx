import { db } from "@/lib/db";
import { quoteRequests } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Building2, Globe, Phone, Calendar } from "lucide-react";
import UpdateStatusForm from "@/components/admin/UpdateStatusForm";

export const dynamic = "force-dynamic";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700 border-blue-200",
  quoted: "bg-purple-100 text-purple-700 border-purple-200",
  negotiating: "bg-amber-100 text-amber-700 border-amber-200",
  won: "bg-emerald-100 text-emerald-700 border-emerald-200",
  lost: "bg-red-100 text-red-600 border-red-200",
};

const STATUS_LABELS: Record<string, string> = {
  new: "新建",
  quoted: "已报价",
  negotiating: "谈判中",
  won: "已成交",
  lost: "已失败",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function QuoteDetailPage({ params }: Props) {
  const { id } = await params;
  const quoteRows = await db
    .select()
    .from(quoteRequests)
    .where(eq(quoteRequests.id, parseInt(id)));
  const quote = quoteRows[0];

  if (!quote) notFound();

  return (
    <div className="max-w-3xl">
      <Link href="/admin/quotes" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        返回报价列表
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{quote.firstName} {quote.lastName}</h1>
          <p className="text-slate-500 text-sm mt-1">报价编号 #{quote.id}</p>
        </div>
        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold border ${STATUS_COLORS[quote.status]}`}>
          {STATUS_LABELS[quote.status] || quote.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {/* Contact Info */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-4">联系信息</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <a href={`mailto:${quote.email}`} className="text-blue-600 hover:underline text-sm">{quote.email}</a>
            </div>
            {quote.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-700 text-sm">{quote.phone}</span>
              </div>
            )}
            {quote.company && (
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-700 text-sm">{quote.company}</span>
              </div>
            )}
            {quote.country && (
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-700 text-sm">{quote.country}</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-slate-500 text-sm">
                {new Date(quote.createdAt).toLocaleString("zh-CN", {
                  year: "numeric", month: "long", day: "numeric",
                  hour: "2-digit", minute: "2-digit"
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Update Status */}
        <UpdateStatusForm
          id={quote.id}
          currentStatus={quote.status}
          currentNotes={quote.notes || ""}
          type="quote"
          statusOptions={[
            { value: "new", label: "新建" },
            { value: "quoted", label: "已报价" },
            { value: "negotiating", label: "谈判中" },
            { value: "won", label: "已成交" },
            { value: "lost", label: "已失败" },
          ]}
        />
      </div>

      {/* Product Details */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-5">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-4">产品需求</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-400 mb-1">产品类型</p>
            <p className="text-slate-900 font-medium text-sm">{quote.productType || "—"}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">采购数量</p>
            <p className="text-slate-900 font-medium text-sm">{quote.quantity || "—"}</p>
          </div>
        </div>
        {quote.specifications && (
          <div className="mt-4">
            <p className="text-xs text-slate-400 mb-1">规格要求</p>
            <p className="text-slate-700 text-sm whitespace-pre-wrap">{quote.specifications}</p>
          </div>
        )}
        {quote.message && (
          <div className="mt-4">
            <p className="text-xs text-slate-400 mb-1">补充说明</p>
            <p className="text-slate-700 text-sm whitespace-pre-wrap">{quote.message}</p>
          </div>
        )}
      </div>

      {/* Quick Reply */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
        <h2 className="font-bold text-slate-900 text-sm mb-3">快速回复</h2>
        <a
          href={`mailto:${quote.email}?subject=Re: Quote Request — Zhixin Paper&body=Dear ${quote.firstName},%0D%0A%0D%0AThank you for your quote request. We are pleased to provide the following pricing:%0D%0A%0D%0A`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors"
        >
          <Mail className="w-4 h-4" />
          发送报价邮件
        </a>
      </div>
    </div>
  );
}
