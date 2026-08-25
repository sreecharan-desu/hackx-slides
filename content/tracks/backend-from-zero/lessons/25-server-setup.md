---
title: "25. Clone it on the box"
order: 25
---

# Clone it on the box

You're SSH'd in. Make a folder, clone the **public** repo, install, generate Prisma, drop `.env` (same Neon URL is fine).

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

If Git asks for a **username**, the repo is still private. Public clones don't log in. Ctrl+C, make it public, clone again.

```bash
sudo npm i -g pm2
pm2 start "npx tsx src/server.ts" --name club-api
pm2 save && pm2 startup
curl http://127.0.0.1:4000/health
```

`{ ok: true }` on the box. The internet still shouldn't hit `:4000`. Nginx next.

Shipping a new commit is still **you** on SSH (`git pull` + `pm2 restart`). GitHub Actions is not driving this box yet.
