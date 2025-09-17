"use client";

import { useState } from "react";
import clsx from "classnames";

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

type WorkspaceId = "card-editor" | "deck-check" | "export" | "keyword";

const WORKSPACES: Array<{
  id: WorkspaceId;
  label: string;
  description: string;
}> = [
  {
    id: "card-editor",
    label: "Card Editor",
    description: "Design and validate individual cards"
  },
  {
    id: "deck-check",
    label: "Deck Check",
    description: "Assemble decks and confirm legality"
  },
  {
    id: "export",
    label: "Export",
    description: "Package cards for sharing"
  },
  {
    id: "keyword",
    label: "Keyword",
    description: "Manage shared terminology"
  }
];

export default function HomePage() {
  const [card, setCard] = useState<CardFormValues>(initialCard);
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceId>("card-editor");

  return (
    <main className="flex min-h-screen bg-neutral-200 text-slate-900">
      <aside className="flex w-72 flex-col justify-between border-r border-slate-300 bg-white/80 px-6 py-10 shadow-md">
        <div className="space-y-10">
          <div className="flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-lg font-semibold text-white">
              PFP
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Workspace</p>
              <h1 className="text-2xl font-semibold">CardForge</h1>
            </div>
          </div>

          <nav className="space-y-2">
            {WORKSPACES.map((workspace) => (
              <button
                key={workspace.id}
                type="button"
                onClick={() => setActiveWorkspace(workspace.id)}
                className={clsx(
                  "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition",
                  activeWorkspace === workspace.id
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-200/60"
                    : "text-slate-600 hover:bg-white"
                )}
              >
                <span
                  className={clsx(
                    "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold",
                    activeWorkspace === workspace.id
                      ? "border-white/60 bg-white/20"
                      : "border-slate-300 bg-white text-slate-600"
                  )}
                >
                  {workspace.label
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </span>
                <div>
                  <p className="text-sm font-semibold">{workspace.label}</p>
                  <p className="text-xs text-slate-500">
                    {workspace.description}
                  </p>
                </div>
              </button>
            ))}
          </nav>
        </div>

        <button
          type="button"
          className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-slate-600 transition hover:bg-white"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-xs font-semibold uppercase tracking-wider">
            ⚙️
          </span>
          Settings
        </button>
      </aside>

      <div className="flex flex-1 items-start justify-center px-10 py-12">
        <div className="grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <section className="flex flex-col gap-6">
            {activeWorkspace === "card-editor" ? <CardEditor onChange={setCard} /> : null}
            {activeWorkspace === "deck-check" ? <DeckBuilder /> : null}
            {activeWorkspace === "export" ? <ExportPanel card={card} /> : null}
            {activeWorkspace === "keyword" ? <KeywordManager /> : null}
          </section>

          <section className="flex items-start justify-center">
            <CardPreview card={card} />
          </section>
        </div>
      </div>
    </main>
  );
}
