"use client";

import { useEffect, useRef, useState } from "react";
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
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("cardforge-theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      return;
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("cardforge-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!isSettingsOpen) return;
    function handleClick(event: MouseEvent) {
      if (!settingsRef.current?.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isSettingsOpen]);

  function handleWorkspaceSelect(workspaceId: WorkspaceId) {
    setActiveWorkspace(workspaceId);
    setIsSettingsOpen(false);
  }

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <main className="flex min-h-screen flex-col text-slate-900 transition-colors dark:text-slate-100 lg:flex-row">
      <aside className="relative z-10 flex w-full flex-col justify-between gap-8 border-b border-slate-300/60 bg-white/80 px-6 py-6 shadow-sm backdrop-blur-lg transition dark:border-slate-700/80 dark:bg-slate-900/70 dark:shadow-black/30 lg:h-screen lg:w-72 lg:border-b-0 lg:border-r lg:px-6 lg:py-10 lg:shadow-md">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-lg font-semibold text-white dark:bg-slate-700">
              PFP
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">Workspace</p>
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">CardForge</h1>
            </div>
          </div>

          <nav className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {WORKSPACES.map((workspace) => (
              <button
                key={workspace.id}
                type="button"
                onClick={() => handleWorkspaceSelect(workspace.id)}
                className={clsx(
                  "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition focus-visible:outline-none",
                  activeWorkspace === workspace.id
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-200/60 dark:bg-primary-600 dark:shadow-primary-900/40"
                    : "text-slate-600 hover:bg-white/70 dark:text-slate-300 dark:hover:bg-slate-800/80"
                )}
              >
                <span
                  className={clsx(
                    "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition",
                    activeWorkspace === workspace.id
                      ? "border-white/60 bg-white/20 text-white"
                      : "border-slate-300 bg-white text-slate-600 dark:border-slate-600 dark:bg-slate-900/60 dark:text-slate-300"
                  )}
                >
                  {workspace.label
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{workspace.label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {workspace.description}
                  </p>
                </div>
              </button>
            ))}
          </nav>
        </div>

        <div ref={settingsRef} className="relative">
          <button
            type="button"
            onClick={() => setIsSettingsOpen((prev) => !prev)}
            className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-slate-600 transition hover:bg-white/70 dark:text-slate-300 dark:hover:bg-slate-800/80"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-xs font-semibold uppercase tracking-wider text-slate-600 dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-300">
              ⚙️
            </span>
            Settings
          </button>

          {isSettingsOpen ? (
            <div className="absolute bottom-16 left-0 right-0 z-20 space-y-4 rounded-2xl border border-slate-200 bg-white/95 p-4 text-sm shadow-xl dark:border-slate-700 dark:bg-slate-900/95">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Appearance</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Toggle CardForge between light and dark surfaces to suit your environment.
                </p>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{theme === "dark" ? "Dark mode" : "Light mode"}</span>
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label="Toggle dark mode"
                  aria-pressed={theme === "dark"}
                  className={clsx(
                    "flex h-9 w-16 items-center rounded-full px-1 transition focus-visible:outline focus-visible:outline-primary-400",
                    theme === "dark" ? "justify-end bg-primary-500" : "justify-start bg-slate-300"
                  )}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-base shadow-sm">
                    {theme === "dark" ? "🌙" : "☀️"}
                  </span>
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </aside>

      <div className="flex flex-1 justify-center px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <div className="flex w-full max-w-6xl flex-col gap-8 xl:grid xl:grid-cols-[minmax(0,1.25fr)_minmax(0,0.9fr)] xl:items-start xl:gap-10">
          <section className="order-1 flex flex-col gap-6">
            {activeWorkspace === "card-editor" ? <CardEditor onChange={setCard} /> : null}
            {activeWorkspace === "deck-check" ? <DeckBuilder /> : null}
            {activeWorkspace === "export" ? <ExportPanel card={card} /> : null}
            {activeWorkspace === "keyword" ? <KeywordManager /> : null}
          </section>

          <section className="order-2 flex items-start justify-center xl:order-none xl:justify-end">
            <CardPreview card={card} />
          </section>
        </div>
      </div>
    </main>
  );
}
