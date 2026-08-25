---
title: "32. What actually breaks"
order: 32
---

# What actually breaks

Not algorithms. Config. Every time.

| Thing | Fix |
| --- | --- |
| `.env` in git | gitignore, rotate |
| No `DATABASE_URL` | Neon + `sslmode=require` |
| Prisma `env()` type error | the `earlyAccess` config |
| `--config` schema not found | don't pass `--config` |
| `../../generated` | `./generated/prisma/client.js` from `db.ts` |
| Prisma 6 + client 7 | pin both 6.12.0 |
| Mail Manager 250, empty inbox | we don't use SMTP. SES SDK in `mail.ts` |
| Spam + red banner | that's normal. copy the token |
| Clicked localhost in webmail | of course it failed |
| MessageRejected | To isn't verified |
| Clone asks username | repo is private |
| Live `/health` ok, register 500 | incomplete `.env`. Add **all** club secrets in Actions (JWT, APP_URL, AWS keys, MAIL_FROM, DATABASE_URL) and redeploy |
| Actions green but old /health | pm2 didn't restart or pull failed. `git log -1` on the box |
| `ln` then nginx missing file | create the file **first** |
| Can't hit public IP | open port **80**. `http://IP/health`. no domain needed |
| Bound to 127.0.0.1 | `0.0.0.0` |
| `NEW_REGION` | type `ap-south-1` |
| Keys in Discord | delete the key in IAM |
| Forgot Elastic IP | it bills while you sleep |
