import ChangePasswordForm from "@/components/admin/ChangePasswordForm";
import { Shield, Database } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">系统设置</h1>
        <p className="text-slate-500 text-sm mt-1">管理您的管理员账号和系统配置。</p>
      </div>

      <div className="space-y-5">
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
              { label: "数据库", value: "Turso (Drizzle ORM)" },
              { label: "认证方式", value: "独立 JWT (jose)" },
              { label: "开发框架", value: "Next.js 15" },
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
