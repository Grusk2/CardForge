"use client";

import { useMemo, useState } from "react";
import type { CardFormValues } from "@/lib/types";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { Select } from "@/app/components/ui/Select";

interface ExportPanelProps {
  card: CardFormValues;
}

export function ExportPanel({ card }: ExportPanelProps) {
  const [format, setFormat] = useState<"json" | "png" | "pdf">("json");

  const jsonPreview = useMemo(() => JSON.stringify(card, null, 2), [card]);

  function handleExport() {
    switch (format) {
      case "json":
        downloadFile("card.json", jsonPreview);
        break;
      case "png":
        alert("PNG export requires server-side rendering of the card layout. Stub implemented for the prototype.");
        break;
      case "pdf":
        alert("PDF export will rely on a future print-and-play generator.");
        break;
    }
  }

  return (
    <section className="workspace-panel space-y-6 text-slate-900 dark:text-slate-100">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Export Toolkit</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Package the current card as structured data or production-ready assets.
          </p>
        </div>
        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-400"
        >
          <DocumentArrowDownIcon className="h-5 w-5" />
          Export {format.toUpperCase()}
        </button>
      </header>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,260px)_minmax(0,1fr)] xl:items-start 2xl:gap-10">
        <div className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">Format</label>
            <p className="text-xs text-slate-500 dark:text-slate-400">Choose the pipeline destination.</p>
          </div>
          <Select value={format} onChange={(event) => setFormat(event.target.value as typeof format)}>
            <option value="json">JSON</option>
            <option value="png">PNG</option>
            <option value="pdf">PDF</option>
          </Select>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">Preview</label>
            <span className="text-[11px] uppercase text-slate-500 dark:text-slate-400">Read-only</span>
          </div>
          <div className="max-h-[28rem] min-h-[18rem] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/90 shadow-inner shadow-slate-200 dark:border-slate-700 dark:bg-slate-900/70">
            <pre className="h-full w-full overflow-auto p-4 font-mono text-xs leading-relaxed text-slate-700 dark:text-slate-200 sm:text-sm xl:p-5 xl:text-[0.95rem] whitespace-pre-wrap break-words">
              {jsonPreview}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

function downloadFile(filename: string, content: string) {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(content)
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
