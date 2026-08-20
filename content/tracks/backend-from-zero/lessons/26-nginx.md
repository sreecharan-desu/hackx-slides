---
title: "26. Nginx"
order: 26
---

# Nginx

The internet shouldn't talk to Express on `:4000` directly. Nginx takes 80/443 and quietly proxies inward.

```mermaid
flowchart LR
  NET[Internet :443] --> NGX[Nginx]
  NGX --> APP[Express :4000]
```

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/club-api /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

`nginx -t` before reload — saves you from locking yourself out of a bad config.
