---
title: "3. The repo, as it actually is"
order: 3
---

# The repo, as it actually is

Clone this, don't invent a tree. GitHub: https://github.com/sreecharan-desu/club-portal-backend

`"type": "module"`. Imports from our code end in `.ts`. Generated Prisma ends in `.js`. `rootDir` is `src`, so `prisma.config.ts` lives in `src/` but schema paths are **from the repo root**. Never `prisma --config src/prisma.config.ts`.

```text
club-portal-backend/
├── .github/workflows/blank.yml   Deploy API. SSH + write .env
├── prisma/schema.prisma          User + EmailToken. output → src/generated/prisma
├── src/
│   ├── generated/prisma/         gitignored. npx prisma generate
│   ├── middleware/auth.ts        Bearer JWT → load User
│   ├── routes/auth.ts            register login verify forgot reset
│   ├── routes/me.ts              GET /me
│   ├── routes/chat.ts            POST /chat
│   ├── db.ts                     one PrismaClient
│   ├── mail.ts                   SES SendEmail (MailDev only if SMTP_HOST=localhost)
│   ├── prisma.config.ts          earlyAccess. schema: prisma/schema.prisma
│   └── server.ts                 health, mount routes, POST /ask, listen 0.0.0.0
├── .gitignore                    .env, generated prisma, *.pem
├── package.json                  type module. prisma + client 6.12.0
├── tsconfig.json                 nodenext, noEmit, allowImportingTsExtensions
└── .env                          not in git. laptop copy / box copy
```

**What the site can hit** (one process, port 4000):

| Method | Path | Needs login |
| --- | --- | --- |
| GET | `/health` | no. `{ ok, shipped: "v2" }`. no Neon |
| POST | `/auth/register` | no |
| GET | `/auth/verify?token=` | no |
| POST | `/auth/login` | no |
| POST | `/auth/forgot-password` | no |
| POST | `/auth/reset-password` | no. body token + password. mail link is not a page |
| GET | `/me` | Bearer |
| POST | `/chat` | Bearer. members room |
| POST | `/ask` | Bearer. event-day `answer` + `sources`. same stub |

`/chat` and `/ask` are two URLs on purpose — club story vs judges' checklist. Same lock, same RAG stub, same process. Not a second server.
