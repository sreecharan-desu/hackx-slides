---
title: "7. Memory lives in the cloud"
order: 7
---

# Memory lives in the cloud

Members have to survive closing the laptop. That memory is Postgres. We don't install it here — **Neon** hosts it. **Prisma** is how TypeScript talks without raw SQL in every route.

| Tool | Role in the story |
| --- | --- |
| Neon | A Postgres you get as a URL |
| Prisma | The schema and the typed questions |

## Get the URL

1. [console.neon.tech](https://console.neon.tech) → sign in → **Create project**
2. Copy the **Prisma / pooled** connection string
3. Paste into `.env` as `DATABASE_URL=...` (`sslmode=require`). Never commit `.env`.

## Init Prisma, then move the config

```bash
npx prisma init
```

That drops `prisma/schema.prisma` and a `prisma.config.ts` at the **repo root**. Keep your Neon URL if it rewrote `.env`.

`tsc` wants everything under `src`. Move the config:

```bash
mv prisma.config.ts src/prisma.config.ts
```

Replace the generated file. Prisma 6.12 wants `earlyAccess`. Paths stay **as if you were still at the repo root** — that's why we never `--config` this file.

```ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  earlyAccess: true,
});
```

Top of `prisma/schema.prisma` — client lands next to `db.ts`:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Next slide: the two tables a club actually needs — people, and the short-lived tokens we email them.
