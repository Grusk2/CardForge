"use client";

import { useState } from "react";
import { CardEditor } from "@/app/components/CardEditor";
import { CardPreview } from "@/app/components/CardPreview";
import { DeckBuilder } from "@/app/components/DeckBuilder";
import { ExportPanel } from "@/app/components/ExportPanel";
import { KeywordManager } from "@/app/components/KeywordManager";
import type { CardFormValues } from "@/lib/types";

const initialCard: CardFormValues = {
  name: "Starwanderer",
  cost: 4,
  type: "Creature",
  rarity: "Rare",
  text: "When Starwanderer enters the battlefield, draw a card.\nBerserk: +2 attack during your turn.",
  imageUrl: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=400&q=80",
  stats: { attack: 3, health: 4, armor: 0 },
  keywords: ["Berserk", "Momentum"],
  setId: "CORE",
  expansion: "Genesis",
  version: "v1.0.0"
};

export default function HomePage() {
  const [card, setCard] = useState<CardFormValues>(initialCard);

  return (
    <main className="workspace-shell">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-primary-300">Card design control room</p>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">CardForge</h1>
          <p className="max-w-2xl text-base text-slate-300">
            Craft competitive-ready cards with instant validation, manage mechanics from a shared keyword registry, and
            keep decks compliant with format rules before they ever hit the table.
          </p>
        </div>
        <aside className="flex w-full max-w-sm flex-col gap-4 rounded-3xl border border-primary-500/30 bg-slate-900/80 p-5 text-sm text-primary-100 shadow-[0_20px_40px_-30px_rgba(56,189,248,0.35)] lg:w-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-200">Mission Checklist</p>
          <ul className="space-y-2 text-primary-100">
            <li className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              Card validation powered by Zod schemas
            </li>
            <li className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              Centralized keyword management &amp; curation
            </li>
            <li className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              Deck legality checks for Standard &amp; Unlimited
            </li>
            <li className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              Export flows for JSON / PNG / PDF (prototype)
            </li>
          </ul>
        </aside>
      </header>

      <section className="mt-12 grid gap-8 xl:grid-cols-[minmax(18rem,24rem)_minmax(21rem,28rem)_minmax(20rem,1fr)] xl:gap-10 2xl:gap-12">
        <div className="flex flex-col gap-8">
          <CardEditor onChange={setCard} />
        </div>
        <div className="flex justify-center xl:sticky xl:top-24">
          <CardPreview card={card} />
        </div>
        <div className="flex flex-col gap-8">
          <ExportPanel card={card} />
          <KeywordManager />
          <DeckBuilder />
        </div>
      </section>
    </main>
  );
}
