---
title: "26. The internet talks to Nginx"
order: 26
---

# The internet talks to Nginx

Express on `:4000` is the back office. Strangers on the internet should knock on **80** (and later 443). Nginx takes the knock and whispers to `127.0.0.1:4000`.

Install Nginx (`sudo apt install nginx -y`). Prove the back office first: `curl http://127.0.0.1:4000/health`.

```mermaid
flowchart LR
  NET[The street] --> NGX[Nginx · 80]
  NGX --> APP[Express · 4000]
```

**Paste the `server` block into a file — not into the terminal.** The `ln` command only creates a shortcut. If the file doesn't exist, Nginx screams "No such file."

```bash
sudo nano /etc/nginx/sites-available/club-api
```

Until you have a domain, `_` matches **any** Host header — including the raw **public IPv4**. That is enough to put the app on the internet. A domain is optional; add it later if you own one.

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

Save: `Ctrl+O`, Enter, `Ctrl+X`. If a **broken** symlink already exists, remove it, then enable:

```bash
sudo rm -f /etc/nginx/sites-enabled/club-api
sudo ln -s /etc/nginx/sites-available/club-api /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
curl http://127.0.0.1/health
```

On the box that's localhost. From your **laptop** (security group must allow **HTTP 80** from the world):

```bash
curl http://PASTE_PUBLIC_IPV4/health
```

Open the same URL in a browser. `{ ok: true }` means the club is on the public address — **no domain required**.

If you *do* have a domain, next slide is optional: point DNS at this box and later change `server_name` to `api.yourdomain.com`. If you don't, skip it. `nginx -t` before reload — don't lock yourself out.
