---
title: "25. Host setup"
order: 25
---

# Host setup

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git
```

```bash
sudo mkdir -p /var/www && sudo chown ubuntu:ubuntu /var/www
cd /var/www
git clone https://github.com/YOU/club-portal-backend.git
cd club-portal-backend && npm ci --omit=dev
```

`.env` on the host — region, table names, SES SMTP, strong `JWT_SECRET`, public `APP_URL`.

Instance role (preferred) or `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` with least privilege on DynamoDB.

```bash
sudo npm i -g pm2
pm2 start src/server.js --name club-api
pm2 save && pm2 startup
curl http://127.0.0.1:4000/health
```

Tables already exist in DynamoDB — no database to install on the box.
