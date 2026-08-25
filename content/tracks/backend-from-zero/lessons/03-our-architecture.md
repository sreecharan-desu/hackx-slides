---
title: "3. Folders you can explain out loud"
order: 3
---

# Folders you can explain out loud

If a teammate asks "where does login live?" you should be able to say `src/routes/auth.ts` without opening Google.

Finished example (compare later, type first): https://github.com/sreecharan-desu/club-portal-backend

`"type": "module"`. Our files import `.ts`. Generated Prisma imports `.js`. Config sits in `src/` because TypeScript `rootDir` is `src`. Prisma schema paths are from the **repo root** — so we never pass `--config`.

Mail is **SES SendEmail** only. No MailDev. No Nodemailer.

```text
club-portal-backend/
├── .github/workflows/blank.yml
├── prisma/schema.prisma
├── src/
│   ├── config.ts              required env. process dies if a secret is missing
│   ├── app.ts                 cors, json, plug in routers
│   ├── server.ts              listen on 0.0.0.0
│   ├── db.ts                  one PrismaClient for the whole app
│   ├── mail.ts                SES. that's the whole mail story
│   ├── prisma.config.ts
│   ├── middleware/auth.ts     "got a Bearer token?"
│   └── routes/
│       ├── health.ts          GET /health — never opens Neon
│       ├── auth.ts            register, login, verify, forgot, reset
│       ├── me.ts              GET /me
│       ├── chat.ts            POST /chat
│       └── ask.ts             POST /ask
├── package.json               prisma + client both 6.12.0
└── .env                       never git. laptop copy AND box copy
```

Say it in one breath: **config, then app, then listen.** Each URL family is one file.

| Method | Path | Need a login? |
| --- | --- | --- |
| GET | `/health` | no. `{ shipped: "v3" }` |
| POST | `/auth/register` | no |
| GET | `/auth/verify` | no |
| POST | `/auth/login` | no |
| POST | `/auth/forgot-password` | no |
| POST | `/auth/reset-password` | no. copy the token from mail — the link is not a webpage |
| GET | `/me` | yes |
| POST | `/chat` | yes — members room |
| POST | `/ask` | yes — same stub, `answer` + `sources` |

Why two chat URLs? One sentence for the club, one sentence for a hackathon brief. Same process. Same lock. Same "RAG later" JSON.
