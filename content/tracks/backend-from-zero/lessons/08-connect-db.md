---
title: "8. Two kinds of paper"
order: 8
---

# Two kinds of paper

Auth is not a dozen tables. It's **people**, and **tokens we mailed them** (verify, reset). That's the whole filing cabinet for today.

Add these **below** the generator block in `prisma/schema.prisma`:

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

Push the shape to Neon, then generate the TypeScript client. From the **repo root**, no `--config`:

```bash
npx prisma db push
npx prisma generate
```

Or `npm run db:push`.

`src/db.ts` sits **next to** `src/generated/`. One extra `../` and TypeScript looks outside the project.

Wrong:

```ts
import { PrismaClient } from "../../generated/prisma/client.mjs";
```

![Wrong Prisma import](/lessons/prisma-wrong-import.png)

The whole file — one shared client for the whole club, not a new connection per request:

```ts
import { PrismaClient } from "./generated/prisma/client.js";

const prisma = new PrismaClient();

export default prisma;
```

Your routes import `../db.ts`. Generated Prisma stays `.js`. Next: the human journey — join, mail, ticket, "who am I?"
