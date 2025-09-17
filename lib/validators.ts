import { z } from "zod";
import type { CardFormValues, DeckFormValues } from "./types";

export const cardSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters."),
    cost: z.number().int().min(0).max(15),
    type: z.enum(["Creature", "Spell", "Artifact", "Hero"]),
    rarity: z.enum(["Common", "Uncommon", "Rare", "Mythic"]),
    text: z.string().max(800).optional().default(""),
    imageUrl: z.string().url("Invalid image URL."),
    stats: z.object({
      attack: z.number().int().min(0).max(20),
      health: z.number().int().min(1).max(25),
      armor: z.number().int().min(0).max(10).optional().default(0)
    }),
    keywords: z.array(z.string()).max(6),
    setId: z.string().min(2),
    expansion: z.string().min(2),
    version: z.string().regex(/^v\d+\.\d+\.\d+$/, "Version must follow the format vX.Y.Z"),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
  })
  .superRefine((data, ctx) => {
    if (data.type === "Creature" && data.stats.attack === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Creatures should have at least 1 attack.",
        path: ["stats", "attack"]
      });
    }
    if (data.keywords.includes("Berserk") && data.stats.health < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Berserk requires at least 2 health.",
        path: ["stats", "health"]
      });
    }
  });

export const deckSchema = z
  .object({
    name: z.string().min(3),
    format: z.enum(["standard", "unlimited"]),
    cards: z
      .array(
        z.object({
          cardId: z.string(),
          quantity: z.number().int().min(1).max(4)
        })
      )
      .max(60)
  })
  .refine((deck) => deck.cards.reduce((sum, card) => sum + card.quantity, 0) >= 40, {
    message: "The deck must contain at least 40 cards.",
    path: ["cards"]
  })
  .superRefine((deck, ctx) => {
    if (deck.format === "standard") {
      const duplicates = deck.cards.filter((entry) => entry.quantity > 3);
      if (duplicates.length > 0) {
        duplicates.forEach((entry, index) => {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "The Standard format allows a maximum of 3 copies of the same card.",
            path: ["cards", index, "quantity"]
          });
        });
      }
    }
  });

export type CardSchema = z.infer<typeof cardSchema>;
export type DeckSchema = z.infer<typeof deckSchema>;

export function validateCard(values: CardFormValues) {
  return cardSchema.safeParse(values);
}

export function validateDeck(values: DeckFormValues) {
  return deckSchema.safeParse(values);
}
