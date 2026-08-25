---
title: "28. HTTPS — only if you have a name"
order: 28
---

# HTTPS — only if you have a name

**No domain?** Stop here. HTTP on the **public IP** is the webinar path. Judges can curl `http://PUBLIC_IP/health`. Skip Certbot.

**You have DNS working?** Then hang a lock. Certbot talks to Nginx.

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
curl https://api.yourdomain.com/health
```

If DNS isn't ready, Certbot fails. Fix the name, retry — don't panic. Next: how we talk about AWS without lying.
