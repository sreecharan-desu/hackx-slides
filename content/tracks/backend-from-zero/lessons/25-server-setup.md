---
title: "25. Host setup"
order: 25
---

# Host setup

You're on the box now. Clone the repo, install, generate Prisma, drop in your production `.env`.

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git
```

```bash
sudo mkdir -p /var/www && sudo chown ubuntu:ubuntu /var/www
cd /var/www
git clone https://github.com/YOU/club-portal-backend.git
cd club-portal-backend
npm ci
npx prisma generate
```

```bash
sudo npm i -g pm2
pm2 start "npx tsx src/server.ts" --name club-api
pm2 save && pm2 startup
curl http://127.0.0.1:4000/health
```

Same Neon `DATABASE_URL` as local is fine. Tables already exist from `prisma db push` — nothing Postgres-related to install here.
