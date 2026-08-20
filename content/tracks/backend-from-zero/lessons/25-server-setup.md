---
title: "25. Host setup"
order: 25
---

# Host setup

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git postgresql postgresql-contrib
sudo systemctl enable --now postgresql

sudo -u postgres psql <<'SQL'
CREATE USER club WITH PASSWORD 'STRONG_SECRET';
CREATE DATABASE club_portal OWNER club;
SQL
```

```bash
sudo mkdir -p /var/www && sudo chown ubuntu:ubuntu /var/www
cd /var/www
git clone https://github.com/YOU/club-portal-backend.git
cd club-portal-backend && npm ci --omit=dev
```

`.env` on the host — SES credentials, strong `JWT_SECRET`, public `APP_URL`.

```bash
sudo npm i -g pm2
pm2 start src/server.js --name club-api
pm2 save && pm2 startup
curl http://127.0.0.1:4000/health
```
