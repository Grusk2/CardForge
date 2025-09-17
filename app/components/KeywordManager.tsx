"use client";

import { useState } from "react";
import { keywordGroups, KEYWORDS } from "@/lib/keywords";
import { PlusIcon } from "@heroicons/react/24/outline";

export function KeywordManager() {
  const [customKeywords, setCustomKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState("");

  function handleAddKeyword() {
    if (!newKeyword) return;
    const formatted = newKeyword
      .trim()
      .replace(/\s+/g, " ")
      .replace(/^\w/, (char) => char.toUpperCase());
    if (formatted && !customKeywords.includes(formatted) && !KEYWORDS.includes(formatted)) {
      setCustomKeywords((prev) => [...prev, formatted]);
      setNewKeyword("");
    }
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl">
      <header className="mb-6">
        <h2 className="text-xl font-semibold text-white">Nyckelordshantering</h2>
        <p className="text-sm text-slate-400">
          Centralt register för kortnyckelord. Lägg till egna termer och se vilka kortkategorier de tillhör.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {keywordGroups.map((group) => (
          <article key={group.name} className="rounded-2xl border border-white/5 bg-slate-950/70 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-300">{group.name}</h3>
            <ul className="mt-2 space-y-2 text-sm text-slate-200">
              {group.keywords.map((keyword) => (
                <li key={keyword} className="flex items-center justify-between">
                  <span>{keyword}</span>
                  <span className="text-xs text-slate-500">Core</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-slate-950/60 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Lägg till eget nyckelord</h3>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={newKeyword}
            onChange={(event) => setNewKeyword(event.target.value)}
            placeholder="Ex. Chronoshift"
            className="flex-1"
          />
          <button type="button" onClick={handleAddKeyword} className="sm:w-36">
            <PlusIcon className="mr-2 h-4 w-4" />
            Lägg till
          </button>
        </div>
        {customKeywords.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-2 text-xs text-primary-200">
            {customKeywords.map((keyword) => (
              <li key={keyword} className="rounded-full bg-primary-500/20 px-3 py-1">
                {keyword}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
