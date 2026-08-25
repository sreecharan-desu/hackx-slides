---
title: "8. People, and the tokens we email them"
order: 8
---

# People, and the tokens we email them

You don't need twelve tables. Users. And tokens we mailed (verify, reset). Done.

Stick this **under** the generator block:

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

From the repo root. No `--config`:

```bash
npx prisma db push
npx prisma generate
```

`src/db.ts` lives **next to** `src/generated/`. One extra `../` and TypeScript looks outside the project. Ask me how I know.

Wrong:

```ts
import { PrismaClient } from "../../generated/prisma/client.mjs";
```

![Wrong Prisma import](/lessons/prisma-wrong-import.png)

The whole file. One client. Don't open a new connection every request, you'll melt Neon.

```ts
import { PrismaClient } from "./generated/prisma/client.js";

const prisma = new PrismaClient();

export default prisma;
```

Routes: `import prisma from "../db.ts"`. Generated client stays `.js`. Yeah it's inconsistent. Live with it.
