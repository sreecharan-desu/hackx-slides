---
title: "31. Run of show"
order: 31
---

# Run of show

| Block | Minutes |
| --- | ---: |
| Model + architecture | 3 |
| Boot Express + Postgres | 5 |
| Register → verify → login → `/me` | 6 |
| SES + reset | 4 |
| Chat gate | 2 |
| Actions → EC2 → domain → TLS | 6 |
| AWS map vs brief | 3 |

Speak to the diagram. Paste the block. Run the command. Move on.

```bash
npm run dev
curl -H "Authorization: Bearer $TOKEN" localhost:4000/me
ssh -i key.pem ubuntu@IP
pm2 status
sudo certbot --nginx -d api.yourdomain.com
```
