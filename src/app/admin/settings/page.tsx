import ChangePasswordForm from "@/components/admin/ChangePasswordForm";
import { Shield, Database, Search } from "lucide-react";
import { getSeoGlobal, calculateSeoScore } from "@/lib/siteSettings";
import SeoEditor from "./SeoEditor";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const seo = await getSeoGlobal();
  const score = calculateSeoScore(seo);

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">SEO 设置</h1>
        <p className="text-slate-500 text-sm mt-1">
          全站 SEO 元数据、搜索引擎站长验证，以及管理员账号与系统信息。
        </p>
      </div>

      <div className="space-y-5">
        {/* SEO 评分卡 */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl p-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">SEO 健康度</p>
            <p className="text-3xl font-extrabold text-slate-900 tabular-nums">
              {score}
              <span className="text-base text-slate-400 ml-1">/100</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {score >= 90 ? "🎉 表现优秀，继续保持" :
               score >= 70 ? "✅ 基础健全，可继续优化" :
               score >= 50 ? "⚠ 还有提升空间" :
               "🚨 建议尽快完善以下字段"}
            </p>
          </div>
          <div className="w-32 hidden sm:block">
            <div className="h-2.5 bg-white rounded-full overflow-hidden border border-blue-100">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all"
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        </div>

        {/* SEO 字段编辑 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Search className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-slate-900">SEO 元数据</h2>
          </div>
          <SeoEditor initial={seo} />
        </div>

        {/* Change Password */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Shield className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-slate-900">修改密码</h2>
          </div>
          <ChangePasswordForm />
        </div>

        {/* System Info */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-slate-400" />
            <h2 className="font-bold text-slate-900">系统信息</h2>
          </div>
          <div className="space-y-2 text-sm">
            {[
              { label: "数据库", value: "Turso (libSQL + Drizzle)" },
              { label: "图床", value: "Cloudflare R2" },
              { label: "认证方式", value: "独立 JWT (jose)" },
              { label: "开发框架", value: "Next.js 16" },
              { label: "管理员账号", value: "admin@zhixinpaper.com" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between py-2 border-b border-slate-100 last:border-0">
                <span className="text-slate-500">{item.label}</span>
                <span className="text-slate-900 font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
