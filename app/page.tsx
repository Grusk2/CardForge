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
    <main className="mx-auto max-w-7xl space-y-12 px-4 py-10">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">CardForge</h1>
          <p className="mt-2 max-w-2xl text-base text-slate-400">
            Web-based toolkit for creating, validating, and exporting custom trading cards. Design cards, manage
            keywords, and ensure decks follow format rules.
          </p>
        </div>
        <div className="rounded-3xl border border-primary-500/30 bg-primary-500/10 px-6 py-4 text-sm text-primary-100 shadow-lg">
          <p className="font-semibold uppercase tracking-wide text-primary-300">At a Glance</p>
          <ul className="mt-2 space-y-1 text-primary-100">
            <li>✔ Card validation with Zod</li>
            <li>✔ Keyword management</li>
            <li>✔ Deck checks for Standard &amp; Unlimited</li>
            <li>✔ Export to JSON / PNG / PDF (stub)</li>
          </ul>
        </div>
      </header>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] xl:gap-10">
        <CardEditor onChange={setCard} />
        <div className="flex w-full flex-col items-center gap-6 lg:items-stretch">
          <CardPreview card={card} />
          <ExportPanel card={card} />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <KeywordManager />
        <DeckBuilder />
      </section>
    </main>
  );
}
