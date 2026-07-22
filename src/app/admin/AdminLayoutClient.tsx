"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, FileText, Settings,
  LogOut, Globe, MessageSquare,
  Menu, X, ExternalLink, Image as ImageIcon, Home, History
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

interface NavItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  exact?: boolean;
}

// 后台菜单 —— B2B 简化版（对齐 zxpapers 风格）
// 隐藏路径：/admin/products（产品很少改，URL 直接进）
//          /admin/media（媒体库高级，B2B 用不上，URL 直接进）
//          /admin/quotes /admin/samples（合并到 /admin/inquiries Tab 内）
const NAV_ITEMS: NavItem[] = [
  { href: "/admin", icon: LayoutDashboard, label: "仪表盘", exact: true },
  { href: "/admin/hero", icon: Home, label: "首页 Hero" },
  { href: "/admin/image-slots", icon: ImageIcon, label: "图片管理" },
  { href: "/admin/blog", icon: FileText, label: "文章管理" },
  { href: "/admin/inquiries", icon: MessageSquare, label: "客户询盘" },
  { href: "/admin/optimizations", icon: History, label: "优化记录" },
  { href: "/admin/settings", icon: Settings, label: "SEO 设置" },
];

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={clsx(
        "fixed top-0 left-0 h-full w-64 bg-slate-900 z-30 flex flex-col transition-transform duration-300",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-800">
          <div className="w-8 h-8 bg-blue-600  flex items-center justify-center shrink-0">
            <Globe className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm truncate">知新纸业</p>
            <p className="text-slate-400 text-xs">后台管理</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto text-slate-400 hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href, item.exact);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={clsx(
                      "flex items-center gap-3 px-3 py-2.5  text-sm font-medium transition-all",
                      active
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    )}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-800 p-3 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5  text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            查看前台网站
          </Link>
          <button
            onClick={async () => {
              await fetch("/api/admin/logout", { method: "POST" });
              router.push("/admin/login");
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5  text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-all"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            退出登录
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 lg:px-6 py-3 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-500 hover:text-slate-700 lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <p className="text-sm text-slate-500">
              {NAV_ITEMS.find(i => isActive(i.href, i.exact))?.label || "后台管理"}
            </p>
          </div>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">A</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
