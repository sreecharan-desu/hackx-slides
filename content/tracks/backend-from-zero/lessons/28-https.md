---
title: "28. TLS"
order: 28
---

# TLS

Certbot talks to Let’s Encrypt and rewrites Nginx for HTTPS. One command after DNS resolves.

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
curl https://api.yourdomain.com/health
```
