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
    <section className="workspace-panel space-y-6 text-slate-900 dark:text-slate-100">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Keyword Management</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Curate the shared vocabulary that powers rules text, search filters, and deck validation.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {keywordGroups.map((group) => (
          <article key={group.name} className="workspace-panel__section space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-300">{group.name}</h3>
              <span className="text-[11px] uppercase text-slate-500 dark:text-slate-400">{group.keywords.length} keywords</span>
            </div>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
              {group.keywords.map((keyword) => (
                <li key={keyword} className="flex items-center justify-between">
                  <span>{keyword}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{group.name}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="workspace-panel__section workspace-panel__section--muted space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-200">Add custom keyword</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Extend the keyword pool with new mechanics or localized terminology.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            value={newKeyword}
            onChange={(event) => setNewKeyword(event.target.value)}
            placeholder="e.g. Chronoshift"
            className="flex-1"
          />
          <button
            type="button"
            onClick={handleAddKeyword}
            className="sm:w-40 rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-400 focus-visible:outline focus-visible:outline-primary-300 dark:bg-primary-600 dark:hover:bg-primary-500"
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Add keyword
          </button>
        </div>
        {customKeywords.length > 0 ? (
          <ul className="flex flex-wrap gap-2 text-xs text-primary-600 dark:text-primary-200">
            {customKeywords.map((keyword) => (
              <li key={keyword} className="rounded-full bg-primary-100 px-3 py-1 dark:bg-primary-500/20">
                {keyword}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
