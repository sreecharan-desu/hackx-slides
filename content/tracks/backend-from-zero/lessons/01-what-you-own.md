---
title: "1. Let's read the map together"
order: 1
---

# Let's read the map together

Look at this with us. Don't open the editor yet. By the end of the day you will be able to point at every box and say what it does.

![Club portal architecture](/lessons/club-portal-architecture.png)

**Follow the arrows with your finger:**

1. You (browser or `curl`) hit a public address — a public IP is enough. A domain like `api.sreecharandesu.in` is optional
2. **Nginx + Certbot** on one Ubuntu machine. Port **4000 stays closed**. The world talks to 80/443
3. **Express** — our API, kept alive by PM2 (`club-api`)
4. **Neon** (Postgres) through Prisma — members and one-time mail tokens
5. **Amazon SES** — verify and reset mail. Sandbox: From *and* To must be verified identities
6. **GitHub Actions** — a push SSHs into the box, writes your **whole** `.env`, restarts PM2

Your laptop runs the **same** API on `localhost:4000`. Live is the **same** git repo. Two `.env` files. One Neon project.

We will **build** this, not screenshot it. When you need a second look, the finished code is public: https://github.com/sreecharan-desu/club-portal-backend — open it after you have tried the step, so you still understand each file.
