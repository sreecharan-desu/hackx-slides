---
title: "7. Neon + Prisma"
order: 7
---

# Neon + Prisma

Here's the painless path: Neon gives you Postgres in the cloud, Prisma gives you typed TypeScript instead of raw SQL in your routes.

### Grab a connection string (do this live)

1. Open [https://console.neon.tech](https://console.neon.tech) and sign in  
2. Hit **Create project**  
3. Copy the connection string they show you  
4. Paste it into `.env` as `DATABASE_URL`

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST/neondb?sslmode=require"
```

If Neon offers a string labeled for **Prisma** / pooled, use that one. And seriously — don't commit `.env`.

```bash
npx prisma init
```

That scaffolds `prisma/schema.prisma`. Wire the datasource to env like this:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

You're not installing Postgres on your laptop. You're borrowing Neon's.
