"use client";

import { useState } from "react";
import { CardEditor } from "@/app/components/CardEditor";
import { CardPreview } from "@/app/components/CardPreview";
import { DeckBuilder } from "@/app/components/DeckBuilder";
import { ExportPanel } from "@/app/components/ExportPanel";
import { KeywordManager } from "@/app/components/KeywordManager";
import type { CardFormValues } from "@/lib/types";

const initialCard: CardFormValues = {
  name: "Stjärnvandrare",
  cost: 4,
  type: "Creature",
  rarity: "Rare",
  text: "När Stjärnvandrare kommer i spel, dra ett kort.\nBerserk: +2 attack under din tur.",
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
    <main className="mx-auto max-w-7xl space-y-10 px-4 py-10">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">CardForge</h1>
          <p className="mt-2 max-w-2xl text-base text-slate-400">
            Webbaserat verktyg för att skapa, validera och exportera kort till egna kortspel. Designa kort,
            hantera nyckelord och säkerställ att lekar följer formatregler.
          </p>
        </div>
        <div className="rounded-3xl border border-primary-500/30 bg-primary-500/10 px-6 py-4 text-sm text-primary-100 shadow-lg">
          <p className="font-semibold uppercase tracking-wide text-primary-300">Snabbstatus</p>
          <ul className="mt-2 space-y-1 text-primary-100">
            <li>✔ Kortvalidering med Zod</li>
            <li>✔ Nyckelordshantering</li>
            <li>✔ Deck-check för Standard och Unlimited</li>
            <li>✔ Export till JSON / PNG / PDF (stub)</li>
          </ul>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <CardEditor onChange={setCard} />
        <div className="flex flex-col items-center justify-start gap-6">
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
