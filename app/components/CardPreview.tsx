"use client";

import Image from "next/image";
import type { CardFormValues } from "@/lib/types";
import clsx from "classnames";

interface CardPreviewProps {
  card: CardFormValues;
}

export function CardPreview({ card }: CardPreviewProps) {
  return (
    <div className="card-surface relative mx-auto flex h-[480px] w-[320px] flex-col overflow-hidden rounded-3xl border border-white/10 p-4 text-slate-100 shadow-2xl sm:h-[520px] sm:w-[360px] lg:h-[600px] lg:w-[420px]">
      <header className="card-header relative flex items-center justify-between rounded-2xl px-4 py-2 text-slate-50 shadow-lg">
        <span className="text-lg font-semibold uppercase tracking-wide">
          {card.name || "New card"}
        </span>
        <span className="badge bg-white/20 text-base font-bold text-slate-900">
          {card.cost}
        </span>
      </header>

      <div className="mt-4 flex-1 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70">
        {card.imageUrl ? (
          <Image
            src={card.imageUrl}
            alt={card.name}
            width={288}
            height={200}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
            No artwork selected
          </div>
        )}
      </div>

      <div className="mt-4 rounded-2xl bg-slate-900/70 p-4 text-sm">
        <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
          <span>{card.type}</span>
          <span>{card.rarity}</span>
        </div>
        <p className="mt-2 whitespace-pre-line text-slate-100">
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

      <footer className="mt-3 flex items-center justify-between rounded-2xl bg-slate-900/70 px-4 py-2">
        <div className="flex items-center gap-3 text-slate-200">
          <StatBadge label="ATK" value={card.stats.attack} />
          <StatBadge label="HP" value={card.stats.health} />
          {card.stats.armor ? <StatBadge label="ARM" value={card.stats.armor} /> : null}
        </div>
        <div className="text-right text-[11px] uppercase text-slate-500">
          <div>
            Set: <span className="text-slate-300">{card.setId || "—"}</span>
          </div>
          <div>
            Expansion: <span className="text-slate-300">{card.expansion || "—"}</span>
          </div>
          <div>
            Version: <span className="text-slate-300">{card.version || "v1.0.0"}</span>
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
        "flex h-12 w-12 flex-col items-center justify-center rounded-full border border-slate-700 bg-slate-950/80 text-xs font-bold",
        "shadow-inner shadow-black/60"
      )}
    >
      <span className="text-[10px] text-slate-500">{label}</span>
      <span className="text-lg text-slate-100">{value}</span>
    </span>
  );
}
