---
title: "26. Nginx"
order: 26
---

# Nginx

Public traffic terminates on 80/443. Express stays on loopback `:4000`.

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
