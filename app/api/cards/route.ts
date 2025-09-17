import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cardSchema } from "@/lib/validators";

export async function GET() {
  try {
    const cards = await prisma.card.findMany({
      include: {
        keywords: {
          include: {
            keyword: true
          }
        },
        set: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(cards);
  } catch (error) {
    console.error("Failed to fetch cards", error);
    return NextResponse.json({ message: "Kunde inte hämta kort." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = cardSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Validering misslyckades", issues: parsed.error.issues },
        { status: 422 }
      );
    }

    const card = await prisma.card.create({
      data: {
        name: parsed.data.name,
        cost: parsed.data.cost,
        type: parsed.data.type,
        rarity: parsed.data.rarity,
        text: parsed.data.text ?? "",
        imageUrl: parsed.data.imageUrl,
        attack: parsed.data.stats.attack,
        health: parsed.data.stats.health,
        armor: parsed.data.stats.armor ?? 0,
        expansion: parsed.data.expansion,
        version: parsed.data.version,
        set: {
          connectOrCreate: {
            where: { code: parsed.data.setId },
            create: {
              code: parsed.data.setId,
              name: `${parsed.data.setId} Set`,
              version: parsed.data.version
            }
          }
        },
        keywords: {
          create: parsed.data.keywords.map((keyword) => ({
            keyword: {
              connectOrCreate: {
                where: { name: keyword },
                create: {
                  name: keyword
                }
              }
            }
          }))
        }
      },
      include: {
        keywords: {
          include: { keyword: true }
        },
        set: true
      }
    });

    return NextResponse.json(card, { status: 201 });
  } catch (error) {
    console.error("Failed to create card", error);
    return NextResponse.json({ message: "Något gick fel vid skapandet." }, { status: 500 });
  }
}
