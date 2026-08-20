---
title: "25. Host setup"
order: 25
---

# Host setup

Clone the repo, install, generate Prisma client, put the same `.env` you use locally (with production `APP_URL` and SES).

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

Neon already holds the tables from `prisma db push`. Nothing to install for Postgres on the box.
