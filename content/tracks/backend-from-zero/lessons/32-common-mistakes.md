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
| `tsc`: prisma.config.ts is not under `rootDir` | `mv prisma.config.ts src/prisma.config.ts`. Leave schema paths as `prisma/schema.prisma`. Run CLI from the repo root **without** `--config` |
| `--config src/prisma.config.ts` → schema not found | that flag resolves paths next to the config (`src/prisma/…`). Use `npx prisma db push` / `npx prisma generate` |
| `PrismaClient` import from `../../generated/...` | from `src/db.ts` use `./generated/prisma/client.js` |
| `Cannot find module '@prisma/client/runtime/library'` | `prisma` CLI and `@prisma/client` versions drifted (6 vs 7). Pin both to `6.12.0`, `npm install`, `npx prisma generate` |
| Local import red without extension | use `../db.ts` (and `allowImportingTsExtensions` + `rewriteRelativeImportExtensions` + `noEmit`). Generated Prisma stays `.js` |
| Forgot `prisma generate` | run it after install on the server |
| Plaintext passwords | bcrypt. always. |
| Bound to `127.0.0.1` | listen on `0.0.0.0` |
| 250 OK but empty Gmail | you used Mail Manager SMTP ingress. Leave `SMTP_HOST` unset; `mail.ts` uses SES SendEmail |
| SES sandbox / MessageRejected | **To** isn't verified. Register `sreecharan309@gmail.com`, or `aws sesv2 create-email-identity` for that address |
| CredentialsProviderError on send | `aws configure` missing; SDK does not read keys from `.env` |
| SES From unverified | verify an **email** identity in **ap-south-1**. `MAIL_FROM` must match it |
| Idle EC2 + Elastic IP | teardown before you leave the room |
| `aws configure` region is `NEW_REGION` | type a real code: `ap-south-1` |
| Access keys in git / chat | IAM → delete that key, create a new one |
