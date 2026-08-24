---
title: "8. Schema + client"
order: 8
---

# Schema + client

Auth only needs two models: people, and the short-lived tokens we email them.

Add these **below** the generator / datasource block in `prisma/schema.prisma`:

```prisma
model User {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  name         String?
  isVerified   Boolean  @default(false)
  createdAt    DateTime @default(now())
  tokens       EmailToken[]
}

model EmailToken {
  id        String    @id @default(cuid())
  token     String    @unique
  purpose   String    // "verify" | "reset"
  expiresAt DateTime
  usedAt    DateTime?
  createdAt DateTime  @default(now())
  userId    String
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

```bash
npx prisma db push --config src/prisma.config.ts
npx prisma generate --config src/prisma.config.ts
```

Or `npm run db:push`. Prisma looks for config at the repo root by default — after the move, pass `--config src/prisma.config.ts` every time.

`db push` creates the tables on Neon. `generate` writes the client under `src/generated/prisma/`.

## Import from `src/`, not from the repo root

`src/db.ts` lives **next to** `src/generated/`. One `../` too many and TypeScript looks **outside** the project.

Wrong (red squiggle on the path):

```ts
import { PrismaClient } from "../../generated/prisma/client.mjs";
```

![Wrong Prisma import: ../../generated from src/db.ts](/lessons/prisma-wrong-import.png)

This is the whole `src/db.ts` file — copy it as-is:

```ts
import { PrismaClient } from "./generated/prisma/client.js";

const prisma = new PrismaClient();

export default prisma;
```

| From | Path |
| --- | --- |
| `src/db.ts` | `./generated/prisma/client.js` |
| Not `@prisma/client` | output is `src/generated`, so we import the generated file |
| Not `../../generated/...` | that is two folders **above** `src/` |

Default export. In routes use the **`.js`** specifier — not `.ts`, not extensionless:

```ts
import prisma from "../db.js";
```

One shared client for the whole app. Don't open a fresh connection every request.
