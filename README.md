# CardForge – Card Game Builder

CardForge is a Next.js project that helps designers build, validate, and export cards for custom trading card games. The prototype includes an advanced card editor with live preview, centralized keyword management, a deck validator, and export tools.

## Features

- **Card editor** with Zod validation and live preview.
- **Keyword management** with support for custom entries.
- **Deck check** to ensure lists comply with format rules.
- **Export panel** for JSON, PNG, and PDF (PNG/PDF currently stubbed).
- **Prisma schema** that models cards, sets, keywords, and decks.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and update if needed:

   ```bash
   cp .env.example .env
   ```

3. Run the database migrations and generate the Prisma client:

   ```bash
   npx prisma db push
   npx prisma generate
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## API overview

- `POST /api/cards` – Validates and persists a new card in the database.
- `GET /api/cards` – Returns the list of created cards including keywords and set information.
- `POST /api/decks/validate` – Validates that a deck follows the format restrictions.

## Testing & quality

The project uses `next lint` for static analysis. Run:

```bash
npm run lint
```

## Future work

- Implement full PNG/PDF export flows.
- Connect the card editor to the API routes for saving and loading cards.
- Add authentication and user management.

Happy forging with CardForge!
