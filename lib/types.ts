export type CardType = "Creature" | "Spell" | "Artifact" | "Hero";
export type CardRarity = "Common" | "Uncommon" | "Rare" | "Mythic";

export interface CardStats {
  attack: number;
  health: number;
  armor?: number;
}

export interface CardFormValues {
  name: string;
  cost: number;
  type: CardType;
  rarity: CardRarity;
  text: string;
  imageUrl: string;
  stats: CardStats;
  keywords: string[];
  setId: string;
  expansion: string;
  version: string;
}

export interface DeckCardEntry {
  cardId: string;
  quantity: number;
}

export interface DeckFormValues {
  name: string;
  format: "standard" | "unlimited";
  cards: DeckCardEntry[];
}
