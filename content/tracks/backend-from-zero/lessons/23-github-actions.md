---
title: "23. Secrets, the DB, and proving deploy"
order: 23
---

# Secrets, the DB, and proving deploy

Settings → Secrets and variables → Actions. Add **every** row. Skip one and deploy dies.

## 1. Door — how the runner logs in

| Secret | What it is |
| --- | --- |
| `EC2_HOST` | public IP of the instance |
| `EC2_USER` | `ubuntu` |
| `EC2_SSH_KEY` | full text of the `.pem` |

Port 22 must allow GitHub (workshop: `0.0.0.0/0` on 22). Home `/32` only → SSH timeout.

## 2. Club — the whole `.env`, not only Neon

Laptop `.env` and live `.env` are the same keys. Actions writes all of them onto EC2.

| Secret | Why live dies without it |
| --- | --- |
| `PORT` | Express listen (default `4000` if you omit) |
| `JWT_SECRET` | login / `/me` |
| `APP_URL` | verify + reset links in mail |
| `AWS_REGION` | SES region (`ap-south-1`) |
| `AWS_ACCESS_KEY_ID` | SES SDK on the box |
| `AWS_SECRET_ACCESS_KEY` | SES SDK on the box |
| `MAIL_FROM` | verified From identity |
| `DATABASE_URL` | Prisma / Neon |

Do **not** set `SMTP_HOST` in production secrets. Empty = SES SendEmail. `localhost` = MailDev. Mail Manager SMTP was the 250-and-nothing bug.

`appleboy` `envs:` copies every club secret into the SSH session. Script writes `.env` (`umask 077`), then `pm2 restart`. Don't `cat .env` in the log.

Any of `JWT_SECRET`, `APP_URL`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `MAIL_FROM`, `DATABASE_URL` empty → **exit 1**. No partial file.

Laptop can still use `aws configure`. Live uses the AWS_* secrets so Ubuntu doesn't need a second `aws configure`.

## 3. The workflow

`.github/workflows/blank.yml`. Job: **Deploy API**.

```yaml
env:
  PORT: ${{ secrets.PORT }}
  JWT_SECRET: ${{ secrets.JWT_SECRET }}
  APP_URL: ${{ secrets.APP_URL }}
  AWS_REGION: ${{ secrets.AWS_REGION }}
  AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
  AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
  MAIL_FROM: ${{ secrets.MAIL_FROM }}
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
with:
  envs: PORT,JWT_SECRET,APP_URL,AWS_REGION,AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY,MAIL_FROM,DATABASE_URL
```

Skip `tsc --noEmit` — Prisma TS4094.

## 4. Prove it live

1. Stamp `/health` (`shipped: "cicd"`)
2. All club secrets in GitHub
3. `git push origin main`
4. Actions green
5. Health, then register — `500` means a club secret is still missing or SES/Neon rejected the call
