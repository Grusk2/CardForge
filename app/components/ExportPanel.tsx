"use client";

import { useMemo, useState } from "react";
import type { CardFormValues } from "@/lib/types";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";

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
    <section className="workspace-panel space-y-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-white">Export Toolkit</h2>
          <p className="text-sm text-slate-400">
            Package the current card as structured data or production-ready assets.
          </p>
        </div>
        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-2 rounded-full border border-primary-400/40 bg-primary-500/90 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-primary-500/25 transition hover:bg-primary-400"
        >
          <DocumentArrowDownIcon className="h-5 w-5" />
          Export {format.toUpperCase()}
        </button>
      </header>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,180px)_1fr] lg:items-start">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">Format</label>
            <p className="text-xs text-slate-500">Choose the pipeline destination.</p>
          </div>
          <select
            value={format}
            onChange={(event) => setFormat(event.target.value as typeof format)}
            className="rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 shadow-inner focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/30"
          >
            <option value="json">JSON</option>
            <option value="png">PNG</option>
            <option value="pdf">PDF</option>
          </select>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">Preview</label>
            <span className="text-[11px] uppercase text-slate-500">Read-only</span>
          </div>
          <pre className="h-64 w-full overflow-auto rounded-2xl border border-white/5 bg-slate-950/70 p-4 font-mono text-xs text-slate-200">
            {jsonPreview}
          </pre>
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
