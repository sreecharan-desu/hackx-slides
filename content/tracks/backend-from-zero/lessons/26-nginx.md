---
title: "26. Nginx reverse proxy"
order: 26
---

# Nginx reverse proxy

Browser talks to **80/443**.  
Express listens on **4000** inside the machine.

```text
Internet → :443 Nginx → :4000 Express
```

```bash
sudo apt install -y nginx
sudo nano /etc/nginx/sites-available/club-api
```

### Config (copy-paste)

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/club-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Sources

- [Nginx reverse proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)
