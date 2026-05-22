"use client";

import { useState, useTransition } from "react";
import { updateLeadStatus } from "@/app/admin/actions";
import { CheckCircle2, Loader2 } from "lucide-react";

interface Props {
  id: number;
  currentStatus: string;
  currentNotes: string;
  type: "inquiry" | "quote" | "sample";
  statusOptions: { value: string; label: string }[];
}

export default function UpdateStatusForm({ id, currentStatus, currentNotes, type, statusOptions }: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [notes, setNotes] = useState(currentNotes);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      await updateLeadStatus({ id, type, status, notes });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <h2 className="font-bold text-xs text-slate-500 uppercase tracking-wide mb-4">更新状态</h2>
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">当前状态</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">内部备注</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="添加关于此线索的内部备注..."
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
        <button
          onClick={handleSave}
          disabled={isPending}
          className="w-full py-2 bg-slate-900 hover:bg-slate-700 text-white font-bold rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
        >
          {isPending ? (
            <><Loader2 className="w-3.5 h-3.5 animate-spin" /> 保存中...</>
          ) : saved ? (
            <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 已保存！</>
          ) : (
            "保存更改"
          )}
        </button>
      </div>
    </div>
  );
}
