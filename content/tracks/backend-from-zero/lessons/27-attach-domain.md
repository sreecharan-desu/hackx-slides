---
title: "27. Domain"
order: 27
---

# Domain

| Type | Name | Value |
| --- | --- | --- |
| A | `api` | Elastic IP |

```bash
dig +short api.yourdomain.com
```

Allocate an Elastic IP and associate it. Ephemeral addresses move; DNS should not.
