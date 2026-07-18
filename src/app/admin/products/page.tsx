import { db } from "@/lib/db";
import { productOverrides } from "@/lib/db/schema";
import { THERMAL_PAPER_ROLLS, THERMAL_LABELS } from "@/lib/data";
import Link from "next/link";
import { Package, Pencil, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProductsAdminPage() {
  const overrides = await await db.select().from(productOverrides);
  const overrideMap = new Map(overrides.map((o) => [o.slug, o]));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">产品管理</h1>
        <p className="text-slate-500 text-sm mt-1">
          编辑产品描述、特性和规格参数。修改后将覆盖默认内容。
        </p>
      </div>

      {/* Rolls */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-slate-700 mb-3 flex items-center gap-2">
          <Package className="w-4 h-4 text-blue-600" />
          热敏纸卷
          <span className="text-xs font-normal text-slate-400">（共 {THERMAL_PAPER_ROLLS.length} 款产品）</span>
        </h2>
        <div className="bg-white border border-slate-200  overflow-hidden">
          <div className="divide-y divide-slate-100">
            {THERMAL_PAPER_ROLLS.map((product) => {
              const hasOverride = overrideMap.has(product.slug);
              return (
                <div key={product.slug} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-semibold text-slate-900 text-sm">{product.name}</h3>
                      {hasOverride && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold ">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          已自定义
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-xs">{product.subtitle} · 最小起订量: {product.moq}</p>
                  </div>
                  <Link
                    href={`/admin/products/${product.slug}?type=roll`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold  text-xs transition-colors"
                  >
                    <Pencil className="w-3 h-3" />
                    编辑
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Labels */}
      <div>
        <h2 className="text-base font-bold text-slate-700 mb-3 flex items-center gap-2">
          <Package className="w-4 h-4 text-purple-600" />
          热敏标签
          <span className="text-xs font-normal text-slate-400">（共 {THERMAL_LABELS.length} 款产品）</span>
        </h2>
        <div className="bg-white border border-slate-200  overflow-hidden">
          <div className="divide-y divide-slate-100">
            {THERMAL_LABELS.map((product) => {
              const hasOverride = overrideMap.has(product.slug);
              return (
                <div key={product.slug} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-semibold text-slate-900 text-sm">{product.name}</h3>
                      {hasOverride && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-bold ">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          已自定义
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-xs">{product.subtitle} · 最小起订量: {product.moq}</p>
                  </div>
                  <Link
                    href={`/admin/products/${product.slug}?type=label`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold  text-xs transition-colors"
                  >
                    <Pencil className="w-3 h-3" />
                    编辑
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
