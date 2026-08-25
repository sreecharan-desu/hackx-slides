---
title: "32. How demos actually die"
order: 32
---

# How demos actually die

They almost never die on clever algorithms. They die on config. Here's the usual cast.

| What goes wrong | What you do |
| --- | --- |
| `.env` in git | gitignore it, rotate secrets |
| Missing `DATABASE_URL` | Neon string with `sslmode=require` |
| Prisma config type-error on `env()` | Slide 7 `earlyAccess` file — no `engine: "classic"` |
| `tsc`: config not under `rootDir` | Move it into `src/`. Run Prisma **without** `--config` |
| `--config` → schema not found | Paths resolve next to the config. Use `npx prisma db push` |
| Import `../../generated` | From `db.ts` use `./generated/prisma/client.js` |
| Prisma 6 CLI + client 7 | Pin both to `6.12.0`, generate again |
| Mail Manager 250, empty inbox | Leave `SMTP_HOST` unset; SES SendEmail |
| Mail in Spam + "dangerous" | Expected. Copy `token=`; curl verify locally |
| Clicked localhost in webmail | Webmail can't reach your laptop's `:4000` |
| Sandbox MessageRejected | To isn't verified. Use Gmail or the college mailbox |
| Git clone asks for username | Repo is private. Make it public or use a token |
| `ln` then nginx "no such file" | Create `/etc/nginx/sites-available/club-api` **first** |
| Can't hit the public IP | SG must allow **80** from `0.0.0.0/0`. Use `http://PUBLIC_IP/health`. Domain is optional |
| Bound to `127.0.0.1` | Listen on `0.0.0.0` |
| `NEW_REGION` | Type `ap-south-1` |
| Keys in chat | IAM → delete that key |
| Idle Elastic IP | Teardown before you leave |
