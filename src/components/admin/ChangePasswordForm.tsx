"use client";

import { useState, useTransition } from "react";
import { changeAdminPassword } from "@/app/admin/actions";
import { Eye, EyeOff, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setResult({ error: "两次输入的新密码不一致。" });
      return;
    }
    if (newPassword.length < 8) {
      setResult({ error: "密码长度不能少于 8 位字符。" });
      return;
    }

    startTransition(async () => {
      const res = await changeAdminPassword({ currentPassword, newPassword });
      setResult(res);
      if (res.success) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {result?.error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {result.error}
        </div>
      )}
      {result?.success && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-3 text-sm">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          密码修改成功。
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1.5">当前密码</label>
        <div className="relative">
          <input
            type={showCurrent ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="w-full px-3 py-2.5 pr-10 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1.5">新密码</label>
        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={8}
            className="w-full px-3 py-2.5 pr-10 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1.5">确认新密码</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> 更新中...</> : "确认修改密码"}
      </button>
    </form>
  );
}
