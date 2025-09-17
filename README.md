# CardForge – Kortspelsbyggare

CardForge är ett Next.js-projekt som låter designers bygga, validera och exportera kort till egna kortspel. Prototypen omfattar en avancerad korteditor med live-preview, central nyckelordshantering, deck-check och exportpanel.

## Funktioner

- **Korteditor** med Zod-validering och realtidsförhandsvisning.
- **Nyckelordshantering** med möjlighet att lägga till egna nyckelord.
- **Deck-check** för att säkerställa att lekar följer formatregler.
- **Exportpanel** för JSON, PNG och PDF (de sistnämnda som stubbar).
- **Prisma-schema** för att modellera kort, set, nyckelord och lekar.

## Kom igång

1. Installera beroenden:

   ```bash
   npm install
   ```

2. Kopiera `.env.example` till `.env` och justera vid behov:

   ```bash
   cp .env.example .env
   ```

3. Kör databas-migreringar och generera Prisma-klienten:

   ```bash
   npx prisma db push
   npx prisma generate
   ```

4. Starta utvecklingsservern:

   ```bash
   npm run dev
   ```

## API-översikt

- `POST /api/cards` – Validerar och sparar ett nytt kort i databasen.
- `GET /api/cards` – Returnerar listan över skapade kort inklusive nyckelord och setinformation.
- `POST /api/decks/validate` – Validerar att en lek följer formatreglerna.

## Testning och kvalitet

Projektet använder `next lint` för statisk analys. Kör:

```bash
npm run lint
```

## Vidare utveckling

- Implementera riktig PNG/PDF-export.
- Koppla korteditorn till API-routes för att spara och ladda kort.
- Lägg till autentisering och användarhantering.

Lycka till med vidareutvecklingen av CardForge!
