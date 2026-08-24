---
title: "3. Shape of the service"
order: 3
---

# Shape of the service

We're keeping the HTTP surface tiny on purpose — so whoever builds the UI has a clean contract to call.

```mermaid
flowchart TB
  subgraph routes [HTTP surface]
    R1[POST /auth/register]
    R2[POST /auth/login]
    R3[GET /auth/verify]
    R4[POST /auth/forgot-password]
    R5[POST /auth/reset-password]
    R6[GET /me]
    R7[POST /chat]
  end

  subgraph src [src/]
    S[server.ts]
    DB[db.ts]
    M[mail.ts]
    A[middleware/auth.ts]
    RA[routes/auth.ts]
  end

  routes --> S
  S --> RA
  RA --> A
  RA --> DB
  RA --> M
```

```text
club-portal-backend/
├── prisma/schema.prisma
├── src/
│   ├── prisma.config.ts    ← inside rootDir so tsc is happy
│   ├── generated/prisma/   ← prisma generate (do not hand-edit)
│   ├── server.ts
│   ├── db.ts
│   ├── mail.ts
│   ├── middleware/auth.ts
│   └── routes/
├── .env
├── package.json
└── tsconfig.json
```

If you can point at a folder and say what it does in one sentence, you're in good shape.
