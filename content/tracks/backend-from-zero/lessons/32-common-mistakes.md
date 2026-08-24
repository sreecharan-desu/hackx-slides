---
title: "32. Failure modes"
order: 32
---

# Failure modes

Live demos almost never die on clever algorithms. They die on config. Here's the usual cast.

| What goes wrong | What you do |
| --- | --- |
| `.env` in git | gitignore it, rotate secrets |
| Missing `DATABASE_URL` | paste Neon string with `sslmode=require` |
| `prisma.config.ts` red on `env("DATABASE_URL")` | replace with the `earlyAccess` file from slide 7 — no `engine: "classic"` |
| `tsc`: prisma.config.ts is not under `rootDir` | `mv prisma.config.ts src/prisma.config.ts`, point schema at `../prisma/schema.prisma`, run CLI with `--config src/prisma.config.ts` |
| `PrismaClient` import from `../../generated/...` | from `src/db.ts` use `./generated/prisma/client.js` |
| `import prisma from "../db.ts"` red | import `../db.js` (file is still `db.ts`). Turn on `allowImportingTsExtensions` + `rewriteRelativeImportExtensions` + `noEmit` in `tsconfig.json` |
| Forgot `prisma generate` | run it after install on the server |
| Plaintext passwords | bcrypt. always. |
| Bound to `127.0.0.1` | listen on `0.0.0.0` |
| SES From unverified | verify an **email** identity (Gmail is fine — no domain). MAIL_FROM must match it |
| Idle EC2 + Elastic IP | teardown before you leave the room |
| `aws configure` region is `NEW_REGION` | type a real code: `ap-south-1` |
| Access keys in git / chat | IAM → delete that key, create a new one |
