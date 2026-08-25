---
title: "25. Clone it on the box"
order: 25
---

# Clone it on the box

SSH in. Clone and install. First green **Deploy API** writes the **full** `.env` (JWT, APP_URL, AWS keys, MAIL_FROM, Neon — not only `DATABASE_URL`). If any of those GitHub secrets are empty, the job fails and live register stays `500` while `/health` looks fine.

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git
```

```bash
sudo mkdir -p /var/www && sudo chown ubuntu:ubuntu /var/www
cd /var/www
git clone https://github.com/sreecharan-desu/club-portal-backend.git
cd club-portal-backend
npm ci
npx prisma generate
```

If Git asks for a **username**, the repo is still private.

```bash
nano /var/www/club-portal-backend/.env
```

Backup only. Same keys as laptop: `PORT`, `JWT_SECRET`, `APP_URL`, `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `MAIL_FROM`, `DATABASE_URL`. After club secrets exist in GitHub, every deploy overwrites this file with the full set.

```bash
sudo npm i -g pm2
pm2 start "npx tsx src/server.ts" --name club-api
pm2 save && pm2 startup
curl http://127.0.0.1:4000/health
curl -s -X POST http://127.0.0.1:4000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"x@y.com","password":"password123"}'
```

`401` on login = Neon is reachable. `500` = still no `DATABASE_URL`. Then Nginx.
