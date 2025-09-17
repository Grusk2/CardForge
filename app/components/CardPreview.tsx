"use client";

import Image from "next/image";
import type { CardFormValues } from "@/lib/types";
import clsx from "classnames";

interface CardPreviewProps {
  card: CardFormValues;
}

export function CardPreview({ card }: CardPreviewProps) {
  return (
    <div className="card-surface relative mx-auto flex min-h-[520px] w-full max-w-[420px] flex-col overflow-hidden rounded-3xl border border-slate-200 p-4 text-slate-900 shadow-xl">
      <header className="card-header relative flex items-center justify-between rounded-2xl px-4 py-2 text-white shadow-lg">
        <span className="text-lg font-semibold uppercase tracking-wide">
          {card.name || "New card"}
        </span>
        <span className="badge bg-white text-base font-bold text-primary-700">
          {card.cost}
        </span>
      </header>

      <div className="mt-4 aspect-[3/4] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
        {card.imageUrl ? (
          <Image
            src={card.imageUrl}
            alt={card.name}
            width={600}
            height={800}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
            No artwork selected
          </div>
        )}
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm">
        <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-500">
          <span>{card.type}</span>
          <span>{card.rarity}</span>
        </div>
        <p className="mt-2 whitespace-pre-line text-slate-700">
          {card.text || "Rules text appears here. Describe effects and rules."}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {card.keywords.length > 0 ? (
            card.keywords.map((keyword) => (
              <span key={keyword} className="badge">
                {keyword}
              </span>
            ))
          ) : (
            <span className="text-xs text-slate-500">No keywords</span>
          )}
        </div>
      </div>

      <footer className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2">
        <div className="flex items-center gap-3 text-slate-700">
          <StatBadge label="ATK" value={card.stats.attack} />
          <StatBadge label="HP" value={card.stats.health} />
          {card.stats.armor ? <StatBadge label="ARM" value={card.stats.armor} /> : null}
        </div>
        <div className="text-right text-[11px] uppercase text-slate-500">
          <div>
            Set: <span className="text-slate-700">{card.setId || "—"}</span>
          </div>
          <div>
            Expansion: <span className="text-slate-700">{card.expansion || "—"}</span>
          </div>
          <div>
            Version: <span className="text-slate-700">{card.version || "v1.0.0"}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatBadge({ label, value }: { label: string; value: number }) {
  return (
    <span
      className={clsx(
        "flex h-12 w-12 flex-col items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-bold",
        "shadow-inner shadow-slate-200"
      )}
    >
      <span className="text-[10px] text-slate-500">{label}</span>
      <span className="text-lg text-slate-900">{value}</span>
    </span>
  );
}
