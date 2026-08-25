---
title: "28. HTTPS is extra"
order: 28
---

# HTTPS is extra

**No domain?** Stop. HTTP on the public IP is the demo. `http://PUBLIC_IP/health`. Skip Certbot.

**DNS actually works?** Then:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
curl https://api.yourdomain.com/health
```

If DNS is lying, Certbot fails. Fix DNS. Don't panic.
