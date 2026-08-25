---
title: "24. A tiny Ubuntu box"
order: 24
---

# A tiny Ubuntu box

Laptop was fine. Now we want a public address. One Ubuntu machine, **same region as SES** (`ap-south-1`). Click with me. Don't skip.

### Open EC2

1. [console.aws.amazon.com](https://console.aws.amazon.com) → search **EC2**
2. Region top-right: **Mumbai `ap-south-1`**

### Launch

1. **Instances** → **Launch instances**
2. Name: `club-portal-api`
3. AMI: **Ubuntu Server 24.04 LTS** · 64-bit (x86)
4. Type: `t3.micro` (or `t2.micro`)
5. Key pair: create `club-portal` → RSA → **`.pem`** → download once

### Who can knock

Network → **Edit**: public IP **Enable**. Security group `club-portal-sg`:

| Door | Port | Who | Why |
| --- | ---: | --- | --- |
| SSH | 22 | **My IP** | only your laptop |
| HTTP | 80 | Anywhere | Nginx / Certbot |
| HTTPS | 443 | Anywhere | TLS |

Leave **4000 closed**. Nginx talks to Express on localhost. Don't expose 4000 "just to test."

Launch. Wait for Running + 2/2 checks. Copy **Public IPv4**. After Nginx that's `http://THAT_IP/health` — **no domain**. Elastic IP only if you care about stop/start or you actually have DNS.

```bash
chmod 400 ~/Downloads/club-portal.pem
ssh -i ~/Downloads/club-portal.pem ubuntu@PASTE_PUBLIC_IP
```

Type `yes`. Then `sudo apt update && sudo apt upgrade -y`.

Database stays on Neon. This box is just Node, Nginx, PM2.
