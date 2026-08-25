---
title: "7. Postgres, but not on your machine"
order: 7
---

# Postgres, but not on your machine

Close the laptop and the members have to still exist. That's Postgres. We're not installing it locally. **Neon** gives you a URL. **Prisma** is how we talk to it in TypeScript.

1. [console.neon.tech](https://console.neon.tech) → create a project
2. Copy the **Prisma / pooled** string
3. Stick it in `.env` as `DATABASE_URL`. `sslmode=require`. Never commit `.env`. I will judge you.

```bash
npx prisma init
```

That dumps `prisma/schema.prisma` and a config at the **repo root**. If it rewrote `.env`, paste your Neon URL back.

`tsc` wants files under `src`, so:

```bash
mv prisma.config.ts src/prisma.config.ts
```

Replace the generated config. Prisma 6.12 wants `earlyAccess`. Paths stay like you're at the **repo root** — that's why we don't pass `--config`.

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

Top of `schema.prisma`:

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

Two tables next. That's the whole auth world for today.
