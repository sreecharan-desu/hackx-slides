---
title: "3. Shape of the service"
order: 3
---

# Shape of the service

Keep the HTTP surface small so the frontend has a clear contract.

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
│   ├── server.ts
│   ├── db.ts
│   ├── mail.ts
│   ├── middleware/auth.ts
│   └── routes/
├── .env
├── package.json
└── tsconfig.json
```
