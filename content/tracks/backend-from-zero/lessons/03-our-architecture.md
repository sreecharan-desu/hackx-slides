---
title: "3. The repo, as it actually is"
order: 3
---

# The repo, as it actually is

Bored? Skim this and sit back down: https://github.com/sreecharan-desu/club-portal-backend

`"type": "module"`. Our imports end in `.ts`. Generated Prisma ends in `.js`. Prisma config lives in `src/` because `rootDir` is `src`. Schema paths are from the **repo root**. Never `prisma --config`.

No MailDev. No Nodemailer. Mail is SES or it doesn't send.

```text
club-portal-backend/
├── .github/workflows/blank.yml
├── prisma/schema.prisma
├── src/
│   ├── config.ts              crash if JWT / APP_URL / MAIL_FROM / DATABASE_URL missing
│   ├── app.ts                 cors, json, mount every router
│   ├── server.ts              listen 0.0.0.0
│   ├── db.ts                  one PrismaClient
│   ├── mail.ts                SES SendEmail. that's it
│   ├── prisma.config.ts
│   ├── middleware/auth.ts     Bearer → User
│   └── routes/
│       ├── health.ts          GET /health — no Neon
│       ├── auth.ts            register login verify forgot reset
│       ├── me.ts              GET /me
│       ├── chat.ts            POST /chat
│       └── ask.ts             POST /ask
├── package.json               prisma + client 6.12.0
└── .env                       not git. laptop copy / Actions copy
```

How to explain it: **config → app → listen**. One folder per URL family.

| Method | Path | Login |
| --- | --- | --- |
| GET | `/health` | no. `{ shipped: "v3" }` |
| POST | `/auth/register` | no |
| GET | `/auth/verify` | no |
| POST | `/auth/login` | no |
| POST | `/auth/forgot-password` | no |
| POST | `/auth/reset-password` | no. copy token; the mail URL is not a page |
| GET | `/me` | yes |
| POST | `/chat` | yes. club room |
| POST | `/ask` | yes. judges want `answer` + `sources` |

`/chat` and `/ask` are two doors, one lock, one stub, one process.
