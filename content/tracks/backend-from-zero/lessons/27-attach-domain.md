---
title: "27. A domain — only if you have one"
order: 27
---

# A domain — only if you have one

**You do not need a domain for this workshop.** `server_name _;` plus the instance **Public IPv4** (port 80 open) already serves the app:

```text
http://13.xxx.xxx.xxx/health
http://13.xxx.xxx.xxx/auth/register
```

Skip this whole slide if nobody in the room owns a domain. The demo is done.

---

**If you do have a domain** — nicer URLs, and you can add HTTPS next.

EC2 public IPs can change if you **stop** the instance. An **Elastic IP** stays put. Point DNS at that, not at a moving target.

| Type | Name | Value |
| --- | --- | --- |
| A | `api` | Elastic IP (or current public IP if you accept it may change) |

Allocate Elastic IP → associate to the instance → **then** create the A record.

```bash
dig +short api.yourdomain.com
```

When `dig` shows the box, edit Nginx: `server_name api.yourdomain.com;` then `sudo nginx -t && sudo systemctl reload nginx`. Certbot (next) needs this name to be true.

No domain? Stay on `server_name _;` and the public IP. Next slide is HTTPS — also optional.
