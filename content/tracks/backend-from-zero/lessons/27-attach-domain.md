---
title: "27. Domain? Only if you already have one"
order: 27
---

# Domain? Only if you already have one

**You don't need this.** `server_name _;` + public IP + port 80 already works:

```text
http://13.xxx.xxx.xxx/health
```

No domain in the room? Skip this slide. Seriously.

A pretty hostname does not create Neon users. Same as the IP: if EC2 has no `.env`, register is still `500`.

---

If you *do* own a domain: nicer URL, and you can do HTTPS after.

Stop/start can change the public IP. Elastic IP stays. Point DNS at that.

| Type | Name | Value |
| --- | --- | --- |
| A | `api` | Elastic IP (or current public IP if you don't care) |

Then `dig +short api.yourdomain.com` until it matches. Change Nginx `server_name` to that hostname, `nginx -t`, reload.

No domain? Leave `_`. HTTPS slide is also skippable.
