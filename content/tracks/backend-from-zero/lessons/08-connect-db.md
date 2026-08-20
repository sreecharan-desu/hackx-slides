---
title: "8. Schema + client"
order: 8
---

# Schema + client

Two models cover auth: users, and short-lived email tokens for verify / reset.

`prisma/schema.prisma`

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

`db push` creates tables on Neon from the schema. `generate` builds the typed client.

`src/db.ts`

```ts
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
```

One shared client for the whole app. Import `prisma` in routes — never open a new connection per request.
