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
  const defaultSlot = useMemo(nextPublishSlot, []);
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
        setMessage(`Imported ${result.created.length} draft posts. Skipped ${result.skipped.length} existing slugs.`);
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "Campaign import failed.");
      }
    });
  }

  return (
    <section className="mb-6 border border-slate-200 bg-white p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <CalendarPlus className="h-5 w-5 text-blue-700" />
            <h2 className="text-base font-semibold text-slate-900">Blog Campaign Import</h2>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Import draft content batches modeled after the `zxpapers` workflow. These posts enter the backend as editable drafts with planned publish slots, but they are not auto-approved.
          </p>
          {selectedCampaign ? (
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              Imported {selectedCampaign.imported}/{selectedCampaign.total} in this batch
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
            Campaign
            <select
              value={campaignId}
              onChange={(event) => setCampaignId(event.target.value)}
              className="mt-1 block min-h-10 min-w-64 border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              {campaigns.map((campaign) => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.name} ({campaign.total} posts, every {campaign.cadenceDays} days)
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-medium text-slate-700">
            First publish slot
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
            Import Draft Queue
          </button>
        </div>
      </div>

      {message ? <p className="mt-3 text-sm text-emerald-700">{message}</p> : null}
      {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
    </section>
  );
}
