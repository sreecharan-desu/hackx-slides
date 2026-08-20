---
title: "27. Domain"
order: 27
---

# Domain

Public IPs on EC2 can change if you stop the instance. An Elastic IP doesn't — so that's what DNS should point at.

| Type | Name | Value |
| --- | --- | --- |
| A | `api` | Elastic IP |

```bash
dig +short api.yourdomain.com
```

Allocate the Elastic IP in EC2, associate it to your instance, *then* create the A record. Wait until `dig` shows the right address before Certbot.
