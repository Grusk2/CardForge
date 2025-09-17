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
    <section className="workspace-panel space-y-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Card Editor</h2>
          <p className="text-sm text-slate-400">
            Tune every attribute and validate the configuration before committing to a print run.
          </p>
        </div>
        <button
          type="button"
          onClick={handleValidate}
          className="rounded-full border border-primary-400/40 bg-primary-500/90 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-primary-500/20 transition hover:bg-primary-400"
        >
          Validate card
        </button>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] xl:gap-8">
        <div className="space-y-5">
          <Section title="Card identity" description="Essential details that appear in search results and deck lists.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" error={errors.name} className="sm:col-span-2">
                <input
                  name="name"
                  value={values.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  placeholder="e.g. Starwanderer"
                />
              </Field>

              <Field label="Cost" error={errors.cost}>
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

              <Field label="Card type" error={errors.type}>
                <select
                  value={values.type}
                  onChange={(event) => handleChange("type", event.target.value as CardFormValues["type"])}
                >
                  <option value="Creature">Creature</option>
                  <option value="Spell">Spell</option>
                  <option value="Artifact">Artifact</option>
                  <option value="Hero">Hero</option>
                </select>
              </Field>

              <Field label="Rarity" error={errors.rarity}>
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

              <Field label="Set ID" error={errors.setId}>
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
            </div>
          </Section>

          <Section title="Artwork & lore" description="Control how the card presents itself visually and narratively.">
            <div className="grid gap-4">
              <Field label="Image URL" error={errors.imageUrl}>
                <input
                  name="imageUrl"
                  value={values.imageUrl}
                  onChange={(event) => handleChange("imageUrl", event.target.value)}
                  placeholder="https://"
                />
              </Field>

              <Field label="Rules text" error={errors.text}>
                <textarea
                  rows={5}
                  value={values.text}
                  onChange={(event) => handleChange("text", event.target.value)}
                  placeholder={"Describe the card effect and any special rules."}
                />
              </Field>
            </div>
          </Section>
        </div>

        <div className="space-y-5">
          <Section title="Combat profile" description="Balance the numbers to match the intended power curve.">
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Attack" error={errors["stats.attack"]}>
                <input
                  type="number"
                  min={0}
                  max={20}
                  value={values.stats.attack}
                  onChange={(event) => handleStatChange("attack", Number(event.target.value))}
                />
              </Field>

              <Field label="Health" error={errors["stats.health"]}>
                <input
                  type="number"
                  min={1}
                  max={25}
                  value={values.stats.health}
                  onChange={(event) => handleStatChange("health", Number(event.target.value))}
                />
              </Field>

              <Field label="Armor" error={errors["stats.armor"]}>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={values.stats.armor ?? 0}
                  onChange={(event) => handleStatChange("armor", Number(event.target.value))}
                />
              </Field>
            </div>
          </Section>

          <Section
            title="Keywords"
            description="Attach mechanics and ability words to surface core interactions."
            variant="muted"
          >
            <KeywordSelector
              selectedKeywords={values.keywords}
              onAddKeyword={addKeyword}
              onRemoveKeyword={removeKeyword}
              query={keywordQuery}
              onQueryChange={setKeywordQuery}
              suggestions={filteredKeywords}
            />
            {errors.keywords ? <p className="text-sm text-rose-400">{errors.keywords}</p> : null}
          </Section>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
  className
}: {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("space-y-2", className)}>
      <label>{label}</label>
      {children}
      {error ? <p className="text-sm text-rose-400">{error}</p> : null}
    </div>
  );
}

function Section({
  title,
  description,
  children,
  variant = "default"
}: {
  title: string;
  description: string;
  children: ReactNode;
  variant?: "default" | "muted";
}) {
  return (
    <div
      className={clsx(
        "workspace-panel__section space-y-4",
        variant === "muted" && "workspace-panel__section--muted"
      )}
    >
      <div className="space-y-1">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">{title}</h3>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      {children}
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
    <div className="flex flex-col gap-4">
      <Combobox value={query} onChange={onAddKeyword}>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-md focus:outline-none">
            <Combobox.Input
              className="w-full border border-slate-700 bg-slate-900 py-2 pl-3 pr-10 text-sm leading-5 text-slate-100"
              displayValue={() => query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search keywords"
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
          Add keyword
        </button>
      </div>
    </div>
  );
}
