---
title: "25. Server setup — Node, Postgres, PM2"
order: 25
---

# Server setup — Node, Postgres, PM2

Run **on the EC2 Ubuntu machine** after SSH.

### Node 20

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git
node -v
npm -v
```

### PostgreSQL on the same box (simple)

```bash
sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable --now postgresql

sudo -u postgres psql <<'SQL'
CREATE USER club WITH PASSWORD 'CHANGE_ME_STRONG';
CREATE DATABASE club_portal OWNER club;
SQL
```

Create tables (same SQL as slide 7).

### App directory

```bash
sudo mkdir -p /var/www
sudo chown ubuntu:ubuntu /var/www
cd /var/www
git clone https://github.com/YOUR_USER/club-portal-backend.git
cd club-portal-backend
npm ci --omit=dev
```

### Production `.env`

```bash
nano /var/www/club-portal-backend/.env
```

```bash
PORT=4000
DATABASE_URL=postgresql://club:CHANGE_ME_STRONG@localhost:5432/club_portal
JWT_SECRET=long-random-production-secret
APP_URL=https://api.yourdomain.com

# Amazon SES SMTP (see slide 12)
SMTP_HOST=email-smtp.ap-south-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=YOUR_SES_SMTP_USERNAME
SMTP_PASS=YOUR_SES_SMTP_PASSWORD
MAIL_FROM="Club Portal <verified-identity@yourdomain.com>"
```

`MAIL_FROM` must match a **verified SES identity**. Test forgot-password once on the server.

### PM2 (keeps app alive)

```bash
sudo npm install -g pm2
cd /var/www/club-portal-backend
pm2 start src/server.js --name club-api
pm2 save
pm2 startup
# run the command PM2 prints
```

```bash
curl http://127.0.0.1:4000/health
```

### Sources

- [PM2 Quick Start](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Nodesource Node packages](https://github.com/nodesource/distributions)
