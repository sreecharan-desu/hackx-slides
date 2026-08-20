---
title: "27. Attach a domain"
order: 27
---

# Attach a domain

### Buy / use a domain

Examples: Route 53, Namecheap, Cloudflare, Google Domains…

### DNS record

Create an **A record**:

| Type | Name | Value |
| --- | --- | --- |
| A | `api` | `YOUR_EC2_PUBLIC_IP` |

So `api.yourdomain.com` → EC2.

### Wait for DNS

```bash
# from laptop
dig +short api.yourdomain.com
nslookup api.yourdomain.com
```

When it prints your EC2 IP — DNS works.

### Elastic IP (important)

EC2 public IP can change on stop/start.

1. EC2 → Elastic IPs → Allocate
2. Associate to your instance
3. Point DNS A record to the **Elastic IP**

### Sources

- [Route 53 DNS](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/welcome-dns-service.html)
- [Elastic IP](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html)
