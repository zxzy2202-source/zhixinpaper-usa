"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, MessageSquare, FileText, Package, Settings,
  LogOut, Globe, Mail, Send, FlaskConical,
  Menu, X, ExternalLink, Image, LayoutGrid
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

interface NavItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  exact?: boolean;
}

const NAV_ITEMS: { section: string; items: NavItem[] }[] = [
  {
    section: "概览",
    items: [
      { href: "/admin", icon: LayoutDashboard, label: "仪表盘", exact: true },
    ],
  },
  {
    section: "线索与询盘",
    items: [
      { href: "/admin/inquiries", icon: Mail, label: "联系询盘" },
      { href: "/admin/quotes", icon: Send, label: "报价请求" },
      { href: "/admin/samples", icon: FlaskConical, label: "样品申请" },
    ],
  },
  {
    section: "内容管理",
    items: [
      { href: "/admin/blog", icon: FileText, label: "博客文章" },
      { href: "/admin/products", icon: Package, label: "产品管理" },
      { href: "/admin/media", icon: Image, label: "图片管理" },
    ],
  },
  {
    section: "系统",
    items: [
      { href: "/admin/settings", icon: Settings, label: "系统设置" },
    ],
  },
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
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
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
          {NAV_ITEMS.map((group) => (
            <div key={group.section} className="mb-5">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest px-3 mb-2">
                {group.section}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href, item.exact);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={clsx(
                          "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
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
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-800 p-3 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            查看前台网站
          </Link>
          <button
            onClick={async () => {
              await fetch("/api/admin/logout", { method: "POST" });
              router.push("/admin/login");
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-all"
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
              {NAV_ITEMS.flatMap(g => g.items).find(i => isActive(i.href, i.exact))?.label || "后台管理"}
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
