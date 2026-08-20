---
title: "27. Domain"
order: 27
---

# Domain

| Type | Name | Value |
| --- | --- | --- |
| A | `api` | Elastic IP of the instance |

```bash
dig +short api.yourdomain.com
```

Allocate an Elastic IP and associate it. Ephemeral public addresses move; DNS should not.
