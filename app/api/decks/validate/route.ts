import { NextResponse } from "next/server";
import { deckSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = deckSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Leken misslyckades med validering", issues: parsed.error.issues },
      { status: 422 }
    );
  }

  return NextResponse.json({ message: "Leken är giltig" });
}
