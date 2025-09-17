"use client";

import { type ReactNode, useMemo, useState } from "react";
import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { KEYWORDS } from "@/lib/keywords";
import type { CardFormValues } from "@/lib/types";
import { validateCard } from "@/lib/validators";
import clsx from "classnames";

const defaultValues: CardFormValues = {
  name: "",
  cost: 1,
  type: "Creature",
  rarity: "Common",
  text: "",
  imageUrl: "",
  stats: { attack: 1, health: 1, armor: 0 },
  keywords: [],
  setId: "CORE",
  expansion: "Genesis",
  version: "v1.0.0"
};

interface CardEditorProps {
  onChange?: (values: CardFormValues) => void;
}

export function CardEditor({ onChange }: CardEditorProps) {
  const [values, setValues] = useState<CardFormValues>(defaultValues);
  const [keywordQuery, setKeywordQuery] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredKeywords = useMemo(() => {
    const lower = keywordQuery.toLowerCase();
    return KEYWORDS.filter((keyword) => keyword.toLowerCase().includes(lower));
  }, [keywordQuery]);

  function handleChange<T>(key: keyof CardFormValues, value: T) {
    setValues((prev) => {
      const updated = { ...prev, [key]: value } as CardFormValues;
      onChange?.(updated);
      return updated;
    });
  }

  function handleStatChange(stat: "attack" | "health" | "armor", value: number) {
    const safeValue = Number.isNaN(value)
      ? stat === "health"
        ? 1
        : 0
      : value;
    setValues((prev) => {
      const updated = {
        ...prev,
        stats: { ...prev.stats, [stat]: safeValue }
      };
      onChange?.(updated);
      return updated;
    });
  }

  function addKeyword(keyword: string) {
    if (!keyword || values.keywords.includes(keyword)) return;
    const updated = { ...values, keywords: [...values.keywords, keyword] };
    setValues(updated);
    onChange?.(updated);
    setKeywordQuery("");
  }

  function removeKeyword(keyword: string) {
    const updated = {
      ...values,
      keywords: values.keywords.filter((item) => item !== keyword)
    };
    setValues(updated);
    onChange?.(updated);
  }

  function handleValidate() {
    const result = validateCard(values);
    if (!result.success) {
      const formatted = result.error.issues.reduce<Record<string, string>>((acc, issue) => {
        const path = issue.path.join(".") || "form";
        acc[path] = issue.message;
        return acc;
      }, {});
      setErrors(formatted);
    } else {
      setErrors({});
    }
    return result;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Korteditor</h2>
            <p className="text-sm text-slate-400">
              Ange kortdetaljer och få live-validering enligt spelreglerna.
            </p>
          </div>
          <button type="button" onClick={handleValidate} className="bg-primary-500 px-4 py-2 text-sm font-semibold">
            Validera kort
          </button>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Field label="Namn" error={errors.name}>
            <input
              name="name"
              value={values.name}
              onChange={(event) => handleChange("name", event.target.value)}
              placeholder="Ex. Stjärnvandrare"
            />
          </Field>

          <Field label="Kostnad" error={errors.cost}>
            <input
              type="number"
              name="cost"
              min={0}
              max={15}
              value={values.cost}
              onChange={(event) => {
                const value = Number(event.target.value);
                handleChange("cost", Number.isNaN(value) ? 0 : value);
              }}
            />
          </Field>

          <Field label="Korttyp" error={errors.type}>
            <select value={values.type} onChange={(event) => handleChange("type", event.target.value as CardFormValues["type"]) }>
              <option value="Creature">Varelse</option>
              <option value="Spell">Besvärjelse</option>
              <option value="Artifact">Artefakt</option>
              <option value="Hero">Hjälte</option>
            </select>
          </Field>

          <Field label="Sällsynthet" error={errors.rarity}>
            <select
              value={values.rarity}
              onChange={(event) => handleChange("rarity", event.target.value as CardFormValues["rarity"])}
            >
              <option value="Common">Common</option>
              <option value="Uncommon">Uncommon</option>
              <option value="Rare">Rare</option>
              <option value="Mythic">Mythic</option>
            </select>
          </Field>

          <Field label="Set-ID" error={errors.setId}>
            <input
              name="setId"
              value={values.setId}
              onChange={(event) => handleChange("setId", event.target.value)}
            />
          </Field>

          <Field label="Expansion" error={errors.expansion}>
            <input
              name="expansion"
              value={values.expansion}
              onChange={(event) => handleChange("expansion", event.target.value)}
            />
          </Field>

          <Field label="Version" error={errors.version}>
            <input
              name="version"
              value={values.version}
              onChange={(event) => handleChange("version", event.target.value)}
            />
          </Field>

          <Field label="Bild URL" error={errors.imageUrl}>
            <input
              name="imageUrl"
              value={values.imageUrl}
              onChange={(event) => handleChange("imageUrl", event.target.value)}
              placeholder="https://"
            />
          </Field>

          <Field label="Attack" error={errors["stats.attack"]}>
            <input
              type="number"
              min={0}
              max={20}
              value={values.stats.attack}
              onChange={(event) => handleStatChange("attack", Number(event.target.value))}
            />
          </Field>

          <Field label="Liv" error={errors["stats.health"]}>
            <input
              type="number"
              min={1}
              max={25}
              value={values.stats.health}
              onChange={(event) => handleStatChange("health", Number(event.target.value))}
            />
          </Field>

          <Field label="Rustning" error={errors["stats.armor"]}>
            <input
              type="number"
              min={0}
              max={10}
              value={values.stats.armor ?? 0}
              onChange={(event) => handleStatChange("armor", Number(event.target.value))}
            />
          </Field>
        </div>

        <Field label="Korttext" error={errors.text}>
          <textarea
            rows={4}
            value={values.text}
            onChange={(event) => handleChange("text", event.target.value)}
            placeholder={"Beskriv kortets effekt och eventuella regler."}
          />
        </Field>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">Nyckelord</label>
          <KeywordSelector
            selectedKeywords={values.keywords}
            onAddKeyword={addKeyword}
            onRemoveKeyword={removeKeyword}
            query={keywordQuery}
            onQueryChange={setKeywordQuery}
            suggestions={filteredKeywords}
          />
          {errors.keywords ? <p className="text-sm text-rose-400">{errors.keywords}</p> : null}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label>{label}</label>
      {children}
      {error ? <p className="text-sm text-rose-400">{error}</p> : null}
    </div>
  );
}

interface KeywordSelectorProps {
  selectedKeywords: string[];
  suggestions: string[];
  query: string;
  onQueryChange: (value: string) => void;
  onAddKeyword: (keyword: string) => void;
  onRemoveKeyword: (keyword: string) => void;
}

function KeywordSelector({
  selectedKeywords,
  suggestions,
  query,
  onQueryChange,
  onAddKeyword,
  onRemoveKeyword
}: KeywordSelectorProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
      <Combobox value={query} onChange={onAddKeyword}>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-md focus:outline-none">
            <Combobox.Input
              className="w-full border border-slate-700 bg-slate-900 py-2 pl-3 pr-10 text-sm leading-5 text-slate-100"
              displayValue={() => query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Sök efter nyckelord"
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2 text-slate-400">
              <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
            </Combobox.Button>
          </div>
          {suggestions.length > 0 ? (
            <Combobox.Options className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md bg-slate-900 py-1 text-sm shadow-lg ring-1 ring-black/5">
              {suggestions.map((keyword) => (
                <Combobox.Option
                  key={keyword}
                  value={keyword}
                  className={({ active }) =>
                    clsx(
                      "relative cursor-default select-none py-2 pl-8 pr-4",
                      active ? "bg-primary-600 text-white" : "text-slate-100"
                    )
                  }
                >
                  {({ active }) => (
                    <>
                      <span className="block truncate">{keyword}</span>
                      {active ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-white">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          ) : null}
        </div>
      </Combobox>

      <div className="flex flex-wrap gap-2">
        {selectedKeywords.map((keyword) => (
          <span
            key={keyword}
            className="inline-flex items-center gap-2 rounded-full bg-primary-500/20 px-3 py-1 text-xs font-medium text-primary-200"
          >
            {keyword}
            <button
              type="button"
              onClick={() => onRemoveKeyword(keyword)}
              className="rounded-full bg-primary-500/30 p-0.5 text-primary-100 hover:bg-primary-500/60"
            >
              <XMarkIcon className="h-3 w-3" />
            </button>
          </span>
        ))}
        <button
          type="button"
          onClick={() => (query ? onAddKeyword(query) : null)}
          className="inline-flex items-center gap-1 text-xs font-medium text-primary-300"
        >
          <PlusIcon className="h-4 w-4" />
          Lägg till
        </button>
      </div>
    </div>
  );
}
