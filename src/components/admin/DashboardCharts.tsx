"use client";

import { Globe, TrendingUp } from "lucide-react";

interface ChartDataPoint {
  date: string;
  inquiries: number;
  quotes: number;
  samples: number;
  total: number;
}

interface Props {
  chartData: ChartDataPoint[];
  topCountries: [string, number][];
}

export default function DashboardCharts({ chartData, topCountries }: Props) {
  const maxTotal = Math.max(...chartData.map((d) => d.total), 1);
  const totalLeads = chartData.reduce((sum, d) => sum + d.total, 0);
  const maxCountry = Math.max(...topCountries.map(([, count]) => count), 1);

  const displayData = chartData.slice(-14);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
      {/* Trend Chart */}
      <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <h2 className="font-bold text-slate-900 text-sm">线索趋势（近 14 天）</h2>
          </div>
          <span className="text-xs text-slate-400">近 30 天共 {totalLeads} 条</span>
        </div>

        {/* Bar Chart */}
        <div className="flex items-end gap-1 h-32 mb-3">
          {displayData.map((d) => (
            <div key={d.date} className="flex-1 flex flex-col items-center gap-0.5 group relative">
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {d.date}：{d.total} 条
                <br />
                联系 {d.inquiries} · 报价 {d.quotes} · 样品 {d.samples}
              </div>
              {/* Stacked bars */}
              <div className="w-full flex flex-col-reverse gap-0.5" style={{ height: "100%" }}>
                {d.total === 0 ? (
                  <div className="w-full bg-slate-100 rounded-sm flex-1" style={{ maxHeight: "4px" }} />
                ) : (
                  <>
                    {d.samples > 0 && (
                      <div
                        className="w-full bg-amber-400 rounded-sm"
                        style={{ height: `${(d.samples / maxTotal) * 128}px` }}
                      />
                    )}
                    {d.quotes > 0 && (
                      <div
                        className="w-full bg-purple-400 rounded-sm"
                        style={{ height: `${(d.quotes / maxTotal) * 128}px` }}
                      />
                    )}
                    {d.inquiries > 0 && (
                      <div
                        className="w-full bg-blue-400 rounded-sm"
                        style={{ height: `${(d.inquiries / maxTotal) * 128}px` }}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* X-axis labels */}
        <div className="flex gap-1">
          {displayData.map((d, i) => (
            <div key={d.date} className="flex-1 text-center">
              {i % 3 === 0 && (
                <span className="text-[9px] text-slate-400">{d.date}</span>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-3">
          {[
            { color: "bg-blue-400", label: "联系询盘" },
            { color: "bg-purple-400", label: "报价请求" },
            { color: "bg-amber-400", label: "样品申请" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-sm ${item.color}`} />
              <span className="text-xs text-slate-500">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Country Distribution */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-4 h-4 text-emerald-600" />
          <h2 className="font-bold text-slate-900 text-sm">来源国家 Top 8</h2>
        </div>

        {topCountries.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">暂无数据</div>
        ) : (
          <div className="space-y-3">
            {topCountries.map(([country, count]) => (
              <div key={country}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-700 font-medium">{country}</span>
                  <span className="text-xs text-slate-400 font-semibold">{count}</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{ width: `${(count / maxCountry) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
