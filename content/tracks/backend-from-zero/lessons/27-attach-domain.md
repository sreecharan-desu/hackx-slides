---
title: "27. Domain"
order: 27
---

# Domain

Point a subdomain at a stable Elastic IP so DNS does not chase a changing public address.

| Type | Name | Value |
| --- | --- | --- |
| A | `api` | Elastic IP |

```bash
dig +short api.yourdomain.com
```

Allocate an Elastic IP in EC2 and associate it before you publish the A record.
