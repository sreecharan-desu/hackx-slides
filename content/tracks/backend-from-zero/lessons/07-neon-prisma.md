---
title: "7. Neon + Prisma"
order: 7
---

# Neon + Prisma

Neon gives you hosted Postgres in under a minute. Prisma turns that database into typed TypeScript calls — no hand-written SQL in routes.

### Get a connection string

1. Open [https://console.neon.tech](https://console.neon.tech) and sign in  
2. **Create project** → copy the connection string  
3. Paste into `.env` as `DATABASE_URL`

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST/neondb?sslmode=require"
```

Use the string Neon labels for **Prisma** / pooled if they offer one. Keep `.env` out of git.

```bash
npx prisma init
```

That creates `prisma/schema.prisma`. Point the datasource at env:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
