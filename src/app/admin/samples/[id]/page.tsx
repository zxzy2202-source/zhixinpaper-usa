import { db } from "@/lib/db";
import { sampleRequests } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Building2, Globe, Phone, Calendar, MapPin, Package } from "lucide-react";
import UpdateStatusForm from "@/components/admin/UpdateStatusForm";
import TrackingForm from "@/components/admin/TrackingForm";

export const dynamic = "force-dynamic";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700 border-blue-200",
  preparing: "bg-amber-100 text-amber-700 border-amber-200",
  shipped: "bg-purple-100 text-purple-700 border-purple-200",
  delivered: "bg-emerald-100 text-emerald-700 border-emerald-200",
  converted: "bg-green-100 text-green-700 border-green-200",
};

const STATUS_LABELS: Record<string, string> = {
  new: "新建",
  preparing: "备货中",
  shipped: "已发货",
  delivered: "已签收",
  converted: "已转化",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SampleDetailPage({ params }: Props) {
  const { id } = await params;
  const sampleRows = await db
    .select()
    .from(sampleRequests)
    .where(eq(sampleRequests.id, parseInt(id)));
  const sample = sampleRows[0];

  if (!sample) notFound();

  let productList: string[] = [];
  try { productList = JSON.parse(sample.products || "[]"); } catch {}

  return (
    <div className="max-w-3xl">
      <Link href="/admin/samples" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        返回样品列表
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{sample.firstName} {sample.lastName}</h1>
          <p className="text-slate-500 text-sm mt-1">样品申请编号 #{sample.id}</p>
        </div>
        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold border ${STATUS_COLORS[sample.status]}`}>
          {STATUS_LABELS[sample.status] || sample.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {/* Contact Info */}
        <div className="bg-white border border-slate-200  p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-4">联系与收货信息</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <a href={`mailto:${sample.email}`} className="text-blue-600 hover:underline text-sm">{sample.email}</a>
            </div>
            {sample.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-700 text-sm">{sample.phone}</span>
              </div>
            )}
            {sample.company && (
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-700 text-sm">{sample.company}</span>
              </div>
            )}
            {sample.country && (
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-700 text-sm">{sample.country}</span>
              </div>
            )}
            {sample.address && (
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-slate-700 text-sm whitespace-pre-wrap">{sample.address}</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-slate-500 text-sm">
                {new Date(sample.createdAt).toLocaleString("zh-CN", {
                  year: "numeric", month: "long", day: "numeric",
                  hour: "2-digit", minute: "2-digit"
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Update Status */}
        <UpdateStatusForm
          id={sample.id}
          currentStatus={sample.status}
          currentNotes={sample.notes || ""}
          type="sample"
          statusOptions={[
            { value: "new", label: "新建" },
            { value: "preparing", label: "备货中" },
            { value: "shipped", label: "已发货" },
            { value: "delivered", label: "已签收" },
            { value: "converted", label: "已转化为订单" },
          ]}
        />
      </div>

      {/* Products Requested */}
      <div className="bg-white border border-slate-200  p-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Package className="w-4 h-4 text-slate-400" />
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">申请产品清单</p>
        </div>
        {productList.length > 0 ? (
          <ul className="space-y-2">
            {productList.map((product, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                <span className="w-5 h-5 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                {product}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-400 text-sm">未指定具体产品</p>
        )}
        {sample.notes && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-400 mb-1">客户备注</p>
            <p className="text-slate-700 text-sm whitespace-pre-wrap">{sample.notes}</p>
          </div>
        )}
      </div>

      {/* Tracking */}
      <TrackingForm
        id={sample.id}
        currentTracking={sample.trackingNumber || ""}
        currentShippedAt={sample.shippedAt || ""}
      />
    </div>
  );
}
