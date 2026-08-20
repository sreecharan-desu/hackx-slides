---
title: "28. HTTPS with Let's Encrypt"
order: 28
---

# HTTPS with Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

Follow prompts. Certbot edits Nginx for you.

### Test

```bash
curl https://api.yourdomain.com/health
```

### Auto-renew

```bash
sudo certbot renew --dry-run
```

### 5-year-old version

HTTP = postcard anyone can read.  
HTTPS = sealed envelope.

### Sources

- [Certbot](https://certbot.eff.org/)
- [Let's Encrypt](https://letsencrypt.org/)
