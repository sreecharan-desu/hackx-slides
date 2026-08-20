---
title: "28. TLS"
order: 28
---

# TLS

HTTP is fine for a classroom demo. The moment there's a real domain, we want HTTPS — Certbot does the boring part.

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
curl https://api.yourdomain.com/health
```

If DNS isn't ready yet, Certbot will fail. Fix DNS first, then retry — don't panic.
