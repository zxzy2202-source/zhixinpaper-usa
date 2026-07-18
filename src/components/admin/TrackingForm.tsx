"use client";

import { useState, useTransition } from "react";
import { updateSampleTracking } from "@/app/admin/actions";
import { Truck, CheckCircle2, Loader2 } from "lucide-react";

interface Props {
  id: number;
  currentTracking: string;
  currentShippedAt: string;
}

export default function TrackingForm({ id, currentTracking, currentShippedAt }: Props) {
  const [tracking, setTracking] = useState(currentTracking);
  const [shippedAt, setShippedAt] = useState(
    currentShippedAt ? currentShippedAt.split("T")[0] : new Date().toISOString().split("T")[0]
  );
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    if (!tracking) return;
    startTransition(async () => {
      await updateSampleTracking({ id, trackingNumber: tracking, shippedAt });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  };

  return (
    <div className="bg-white border border-slate-200  p-5">
      <div className="flex items-center gap-2 mb-4">
        <Truck className="w-4 h-4 text-slate-400" />
        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">发货与物流追踪</p>
      </div>
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">物流追踪号</label>
          <input
            type="text"
            value={tracking}
            onChange={(e) => setTracking(e.target.value)}
            placeholder="例：1Z999AA10123456784"
            className="w-full px-3 py-2 border border-slate-200  text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">发货日期</label>
          <input
            type="date"
            value={shippedAt}
            onChange={(e) => setShippedAt(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200  text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleSave}
          disabled={isPending || !tracking}
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-bold  text-sm transition-colors flex items-center justify-center gap-2"
        >
          {isPending ? (
            <><Loader2 className="w-3.5 h-3.5 animate-spin" /> 保存中...</>
          ) : saved ? (
            <><CheckCircle2 className="w-3.5 h-3.5" /> 已保存，状态已更新为已发货！</>
          ) : (
            <><Truck className="w-3.5 h-3.5" /> 标记为已发货</>
          )}
        </button>
      </div>
    </div>
  );
}
