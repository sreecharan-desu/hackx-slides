---
title: "24. Rent a small machine"
order: 24
---

# Rent a small machine

The door has been on a laptop. Now it gets an address on the internet: one Ubuntu box in the **same region** as SES (`ap-south-1`). Click with me — don't skip ahead.

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

Leave **4000 closed** to the world. Nginx will whisper to Express on localhost.

Launch. Wait for **Running** and **2/2 checks**. Copy **Public IPv4** — that URL is how the room hits the API **without a domain** (`http://THAT_IP/health` after Nginx). Elastic IP is optional: only if you want the number to survive stop/start, or you're attaching a domain.

```bash
chmod 400 ~/Downloads/club-portal.pem
ssh -i ~/Downloads/club-portal.pem ubuntu@PASTE_PUBLIC_IP
```

Type `yes`. Then `sudo apt update && sudo apt upgrade -y`.

Database stays on Neon. This box runs Node, Nginx, PM2. Next: clone the public repo and start the door.
