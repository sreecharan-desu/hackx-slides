---
title: "28. TLS"
order: 28
---

# TLS

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
curl https://api.yourdomain.com/health
```

HTTP for the demo room. HTTPS for anything you put on a real domain.
