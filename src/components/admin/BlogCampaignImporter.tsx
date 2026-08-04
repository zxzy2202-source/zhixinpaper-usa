"use client";

import { useMemo, useState, useTransition } from "react";
import { CalendarPlus, CheckCircle2, Loader2 } from "lucide-react";
import { importBlogCampaign } from "@/app/admin/actions";

interface CampaignSummary {
  id: string;
  name: string;
  description: string;
  cadenceDays: number;
  total: number;
  imported: number;
}

function nextPublishSlot() {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  date.setHours(9, 0, 0, 0);
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

export default function BlogCampaignImporter({ campaigns }: { campaigns: CampaignSummary[] }) {
  const [isPending, startTransition] = useTransition();
  const defaultSlot = useMemo(() => nextPublishSlot(), []);
  const [campaignId, setCampaignId] = useState(campaigns[0]?.id || "");
  const [startAt, setStartAt] = useState(defaultSlot);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedCampaign = campaigns.find((campaign) => campaign.id === campaignId) || campaigns[0];

  function handleImport() {
    setMessage(null);
    setError(null);

    startTransition(async () => {
      try {
        const result = await importBlogCampaign({
          campaignId,
          startAt: new Date(startAt).toISOString(),
        });
        setMessage(`已导入 ${result.created.length} 篇草稿，跳过 ${result.skipped.length} 个已存在 slug。`);
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "活动导入失败。");
      }
    });
  }

  return (
    <section className="mb-6 border border-slate-200 bg-white p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <CalendarPlus className="h-5 w-5 text-blue-700" />
            <h2 className="text-base font-semibold text-slate-900">博客活动导入</h2>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            按照 `zxpapers` 的工作流批量导入博客草稿。导入后会生成可编辑草稿，并带上计划发布时间，但默认不会自动批准发布。
          </p>
          {selectedCampaign ? (
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              当前活动已导入 {selectedCampaign.imported}/{selectedCampaign.total} 篇
            </p>
          ) : null}
          {selectedCampaign?.description ? (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              {selectedCampaign.description}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <label className="text-sm font-medium text-slate-700">
            活动
            <select
              value={campaignId}
              onChange={(event) => setCampaignId(event.target.value)}
              className="mt-1 block min-h-10 min-w-64 border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              {campaigns.map((campaign) => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.name}（{campaign.total} 篇，每 {campaign.cadenceDays} 天一篇）
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-medium text-slate-700">
            首次发布时间
            <input
              type="datetime-local"
              value={startAt}
              onChange={(event) => setStartAt(event.target.value)}
              className="mt-1 block min-h-10 border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </label>

          <button
            type="button"
            onClick={handleImport}
            disabled={isPending || !selectedCampaign || !startAt}
            className="inline-flex min-h-10 items-center justify-center gap-2 bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarPlus className="h-4 w-4" />}
            导入草稿队列
          </button>
        </div>
      </div>

      {message ? <p className="mt-3 text-sm text-emerald-700">{message}</p> : null}
      {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
    </section>
  );
}
