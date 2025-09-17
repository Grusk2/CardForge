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
      <div className="space-y-10">
        <header className="dashboard-header">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary-200">Design &amp; Validation Hub</p>
            <div className="space-y-2">
              <h1 className="text-4xl font-semibold text-white sm:text-5xl">CardForge</h1>
              <p className="max-w-3xl text-base text-slate-300">
                Det kompletta gränssnittet för att bygga kort, kontrollera lekar och hålla ordning på nyckelord – allt i
                en arbetsvy anpassad för både prototypande och turneringsförberedelser.
              </p>
            </div>
          </div>
          <dl className="dashboard-metrics">
            <div>
              <dt>Validator</dt>
              <dd>Zod-powered schemas</dd>
            </div>
            <div>
              <dt>Nyckelord</dt>
              <dd>Delat bibliotek</dd>
            </div>
            <div>
              <dt>Formatstöd</dt>
              <dd>Standard &amp; Unlimited</dd>
            </div>
            <div>
              <dt>Export</dt>
              <dd>JSON · PNG · PDF</dd>
            </div>
          </dl>
        </header>

        <section className="dashboard-grid">
          <div className="space-y-8">
            <CardEditor onChange={setCard} />
            <DeckBuilder />
          </div>
          <div className="space-y-8">
            <CardPreview card={card} />
            <ExportPanel card={card} />
            <KeywordManager />
          </div>
        </section>
      </div>
    </main>
  );
}
