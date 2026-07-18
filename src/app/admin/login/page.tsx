"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Use absolute URL with credentials to ensure cookie is set correctly
      const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
      const res = await fetch(`${baseUrl}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      let data: { success?: boolean; error?: string } = {};
      try { data = await res.json(); } catch { /* ignore */ }

      if (!res.ok) {
        setError(data.error || "邮箱或密码错误，请重试。");
        setLoading(false);
        return;
      }

      // 登录成功，使用硬跳转确保 Cookie 生效
      window.location.href = callbackUrl;
    } catch (err) {
      console.error("Login error:", err);
      setError("登录请求失败，请刷新页面后重试。");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">邮箱地址</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="admin@zhixinpaper.com"
            className="w-full pl-10 pr-4 py-3 border border-slate-200  text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">登录密码</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="请输入密码"
            className="w-full pl-10 pr-12 py-3 border border-slate-200  text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700  px-4 py-3 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold  transition-colors flex items-center justify-center gap-2 shadow-sm"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            登录中...
          </>
        ) : (
          "登 录"
        )}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600  mb-4 shadow-lg shadow-blue-600/30">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">知新纸业</h1>
          <p className="text-slate-400 text-sm mt-1">后台管理系统</p>
        </div>

        {/* Login Card */}
        <div className="bg-white  shadow-2xl p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">管理员登录</h2>
          <Suspense fallback={
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
            </div>
          }>
            <LoginForm />
          </Suspense>

          <p className="text-center text-xs text-slate-400 mt-6">
            仅限授权人员访问，所有操作均有记录。
          </p>
        </div>

        <p className="text-center text-slate-500 text-xs mt-6">
          © 2025 西安知新纸业有限公司
        </p>
      </div>
    </div>
  );
}
