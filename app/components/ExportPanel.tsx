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
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Export</h2>
          <p className="text-sm text-slate-400">
            Download card data in multiple formats for integration or printing.
          </p>
        </div>
        <button type="button" onClick={handleExport}>
          <DocumentArrowDownIcon className="mr-2 h-5 w-5" />
          Export {format.toUpperCase()}
        </button>
      </header>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex w-full flex-col gap-2 lg:w-40">
          <label>Format</label>
          <select value={format} onChange={(event) => setFormat(event.target.value as typeof format)}>
            <option value="json">JSON</option>
            <option value="png">PNG</option>
            <option value="pdf">PDF</option>
          </select>
        </div>
        <div className="flex-1">
          <label>Preview (JSON)</label>
          <pre className="mt-2 h-64 overflow-auto rounded-2xl border border-white/5 bg-slate-950/70 p-4 text-xs text-slate-200">
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
