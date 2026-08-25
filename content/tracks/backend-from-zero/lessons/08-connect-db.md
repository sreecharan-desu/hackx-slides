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
npx prisma db push
npx prisma generate
```

Or `npm run db:push`. Run from the repo root, **no** `--config`. Prisma loads `prisma/schema.prisma` on its own.

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

Default export. In **your** files use the **`.ts`** specifier:

```ts
import prisma from "../db.ts";
```

Leave the generated Prisma import as **`.js`** (`./generated/prisma/client.js`). Mixing `prisma@6` with `@prisma/client@7` is what produced `Cannot find module '@prisma/client/runtime/library'` — keep both at 6.12.0, then `npx prisma generate`.

One shared client for the whole app. Don't open a fresh connection every request.
