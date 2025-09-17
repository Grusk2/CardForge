"use client";

import { useState } from "react";
import { validateDeck } from "@/lib/validators";
import type { DeckFormValues } from "@/lib/types";
import { PlusIcon } from "@heroicons/react/24/outline";

const MOCK_LIBRARY = [
  { id: "c1", name: "Stjärnvandrare", type: "Creature", rarity: "Rare" },
  { id: "c2", name: "Energisprång", type: "Spell", rarity: "Common" },
  { id: "c3", name: "Temporal Ward", type: "Artifact", rarity: "Uncommon" }
];

const defaultDeck: DeckFormValues = {
  name: "Ny lek",
  format: "standard",
  cards: []
};

export function DeckBuilder() {
  const [deck, setDeck] = useState<DeckFormValues>(defaultDeck);
  const [cardId, setCardId] = useState(MOCK_LIBRARY[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  function addCardToDeck() {
    if (!cardId) return;
    setDeck((prev) => {
      const existing = prev.cards.find((card) => card.cardId === cardId);
      const updatedCards = existing
        ? prev.cards.map((card) =>
            card.cardId === cardId
              ? { ...card, quantity: Math.min(card.quantity + quantity, 4) }
              : card
          )
        : [...prev.cards, { cardId, quantity }];
      return { ...prev, cards: updatedCards };
    });
    setQuantity(1);
  }

  function removeCard(id: string) {
    setDeck((prev) => ({
      ...prev,
      cards: prev.cards.filter((card) => card.cardId !== id)
    }));
  }

  function validate() {
    const result = validateDeck(deck);
    if (result.success) {
      setErrors([]);
      setValidationMessage("Leken följer formatreglerna!");
    } else {
      setValidationMessage(null);
      setErrors(result.error.issues.map((issue) => issue.message));
    }
  }

  const totalCards = deck.cards.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Deck-check</h2>
          <p className="text-sm text-slate-400">
            Bygg en lek och kontrollera att den följer begränsningar per format.
          </p>
        </div>
        <button type="button" onClick={validate}>
          Validera lek
        </button>
      </header>

      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1 space-y-2">
            <label>Leknamn</label>
            <input
              value={deck.name}
              onChange={(event) => setDeck((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="Ex. Aether Rush"
            />
          </div>
          <div className="w-full space-y-2 md:w-48">
            <label>Format</label>
            <select
              value={deck.format}
              onChange={(event) => setDeck((prev) => ({ ...prev, format: event.target.value as DeckFormValues["format"] }))}
            >
              <option value="standard">Standard</option>
              <option value="unlimited">Unlimited</option>
            </select>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-slate-950/70 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Lägg till kort</h3>
          <div className="mt-3 flex flex-col gap-3 lg:flex-row">
            <div className="flex flex-1 flex-col gap-2">
              <label>Kort</label>
              <select value={cardId} onChange={(event) => setCardId(event.target.value)} className="bg-slate-900">
                {MOCK_LIBRARY.map((card) => (
                  <option key={card.id} value={card.id}>
                    {card.name} – {card.type}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full space-y-2 lg:w-32">
              <label>Antal</label>
              <input
                type="number"
                min={1}
                max={4}
                value={quantity}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  if (Number.isNaN(value)) {
                    setQuantity(1);
                    return;
                  }
                  setQuantity(Math.min(4, Math.max(1, value)));
                }}
              />
            </div>
            <button type="button" onClick={addCardToDeck} className="lg:w-44">
              <PlusIcon className="mr-2 h-4 w-4" />
              Lägg till kort
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-slate-950/70 p-4">
          <header className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Kortlista ({totalCards} kort)
            </h3>
            <span className="text-xs text-slate-500">Max 60 kort</span>
          </header>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            {deck.cards.length === 0 ? (
              <li className="text-xs text-slate-500">Inga kort har lagts till ännu.</li>
            ) : (
              deck.cards.map((entry) => {
                const card = MOCK_LIBRARY.find((item) => item.id === entry.cardId);
                return (
                  <li key={entry.cardId} className="flex items-center justify-between rounded-xl bg-slate-900/70 px-3 py-2">
                    <div>
                      <p className="font-medium text-slate-100">{card?.name ?? entry.cardId}</p>
                      <p className="text-xs text-slate-500">
                        {card?.type ?? "Okänd typ"} • {card?.rarity ?? "?"}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="badge bg-primary-500/20 text-primary-200">x{entry.quantity}</span>
                      <button
                        type="button"
                        onClick={() => removeCard(entry.cardId)}
                        className="text-xs text-rose-300 hover:text-rose-200"
                      >
                        Ta bort
                      </button>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>

        {validationMessage ? (
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-200">
            {validationMessage}
          </div>
        ) : null}

        {errors.length > 0 ? (
          <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-200">
            <ul className="list-inside list-disc space-y-1">
              {errors.map((error, index) => (
                <li key={`${error}-${index}`}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
