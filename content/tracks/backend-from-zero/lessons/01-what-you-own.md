---
title: "1. Point at the picture"
order: 1
---

# Point at the picture

This is the whole workshop. Stay here two minutes. Don't code yet.

![Club portal architecture](/lessons/club-portal-architecture.png)

**What we're discussing, top to bottom:**

1. A person (curl, browser) hits a public address — IP is enough, `api.sreecharandesu.in` if you have DNS
2. **Nginx + Certbot** on one Ubuntu box. Port 4000 stays closed
3. **Express** (`club-api` under PM2). That's us
4. **Neon** via Prisma — members and mail tokens
5. **SES SendEmail** — verify + reset. Sandbox: From and To must be verified
6. **GitHub Actions** SSHs in, writes the **full** `.env`, restarts PM2

Laptop is the same API on `localhost:4000`. Live is the same repo. Two `.env` files, one Neon.

Today we **explain** this picture, then paste the real files from `club-portal-backend`. Judges want yes/no JSON, hashed passwords, and a lock on chat. The website is someone else's problem.
