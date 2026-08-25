---
title: "26. Nginx, not port 4000"
order: 26
---

# Nginx, not port 4000

Express on `:4000` is for localhost. People on the internet hit **80**. Nginx forwards to `127.0.0.1:4000`.

```bash
sudo apt install nginx -y
curl http://127.0.0.1:4000/health
```

That curl should already work. Then:

```mermaid
flowchart LR
  NET[Internet] --> NGX[Nginx :80]
  NGX --> APP[Express :4000]
```

**Write the server block into a file first.** `ln` only makes a shortcut. If the file is missing, `nginx -t` fails. Create, then link.

```bash
sudo nano /etc/nginx/sites-available/club-api
```

`server_name _;` matches anything — including the **public IP**. That's how you go live **without a domain**.

```nginx
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Ctrl+O, Enter, Ctrl+X. If a broken symlink already exists, delete it first:

```bash
sudo rm -f /etc/nginx/sites-enabled/club-api
sudo ln -s /etc/nginx/sites-available/club-api /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
curl http://127.0.0.1/health
```

That's on the box. From your **laptop** (SG must allow port 80):

```bash
curl http://PASTE_PUBLIC_IPV4/health
```

Open it in a browser. `{ ok: true }` and Nginx works. **That is not a user in Neon.** Hit register on this URL. `500` = no `.env` on the box. Copy `DATABASE_URL` onto EC2, `pm2 restart`, then register again.
