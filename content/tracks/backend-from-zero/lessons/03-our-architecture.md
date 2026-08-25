---
title: "3. Seven doors, one building"
order: 3
---

# Seven doors, one building

We don't invent fifty endpoints. A club portal needs seven public moves. Everything else is folders so we can find the bouncer at 2am.

```mermaid
flowchart TB
  subgraph routes [What the lobby can ask]
    R1[Join · POST /auth/register]
    R2[Come back · POST /auth/login]
    R3[Prove mail · GET /auth/verify]
    R4[I forgot · POST /auth/forgot-password]
    R5[New password · POST /auth/reset-password]
    R6[Who am I · GET /me]
    R7[Members chat · POST /chat]
  end

  subgraph src [Inside the building]
    S[The front desk · server.ts]
    RA[Papers · routes]
    A[The bouncer · requireAuth]
    DB[The filing cabinet · db.ts]
    M[The post tray · mail.ts]
  end

  routes --> S
  S --> RA
  RA --> A
  RA --> DB
  RA --> M
```

When we open the laptop later, this is the map — not a dump of filenames for its own sake:

```text
club-portal-backend/
├── prisma/          the shape of member + token rows
├── src/server.ts    the one process we start
├── src/db.ts        one shared database client
├── src/mail.ts      every outbound letter
├── src/middleware/  "show me your ticket"
├── src/routes/      join, me, chat
└── .env             secrets — never git
```

If you can point at a box and say it in one sentence, you're ready. Next we get Node and a machine identity on AWS — so later the same keys send mail.
