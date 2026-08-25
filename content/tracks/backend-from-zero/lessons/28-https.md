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

`curl https://api.…/health` can be `{ok:true}` while `POST /auth/register` is 500. Health skips the database. Accounts only land in Neon after `.env` exists on EC2.
