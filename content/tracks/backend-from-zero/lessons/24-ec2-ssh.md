---
title: "24. EC2 access"
order: 24
---

# EC2 access

We're creating one Ubuntu machine on AWS, then SSHing in from your laptop. Click along with me — don't skip ahead.

### 1 · Open EC2

1. Sign in at [https://console.aws.amazon.com](https://console.aws.amazon.com)  
2. Search bar up top → type **EC2** → open it  
3. Check the region (top-right). Something like **Mumbai `ap-south-1`** is fine — just stay there for everything else

### 2 · Launch instance

1. Left sidebar → **Instances** → **Launch instances**  
2. **Name:** `club-portal-api`  
3. **AMI:** Quick Start → **Ubuntu** → **Ubuntu Server 24.04 LTS** · 64-bit (x86)  
4. **Instance type:** `t3.micro` (or `t2.micro` if that's your free-tier option)  
5. **Key pair:** Create new → name `club-portal` → RSA → **`.pem`** → download it once and don't lose it

### 3 · Security group

Under **Network settings** → **Edit**:

1. Auto-assign public IP: **Enable**  
2. Create a security group named `club-portal-sg`  
3. Inbound rules:

| Type | Port | Source | Why |
| --- | ---: | --- | --- |
| SSH | 22 | **My IP** | only your laptop |
| HTTP | 80 | Anywhere `0.0.0.0/0` | Nginx / Certbot |
| HTTPS | 443 | Anywhere `0.0.0.0/0` | TLS |

Leave port `4000` closed to the internet. Nginx will talk to Express on localhost later.

4. Storage: default 8 GiB is enough  
5. **Launch instance** → wait for **Running** and **2/2 checks passed**

### 4 · Grab the IP

Select the instance → copy **Public IPv4 address**.  
(Before a real domain, allocate an **Elastic IP** and associate it — that IP won't vanish when you stop/start.)

### 5 · SSH in

```bash
chmod 400 ~/Downloads/club-portal.pem
ssh -i ~/Downloads/club-portal.pem ubuntu@PASTE_PUBLIC_IP
```

First time, type `yes`. Then:

```bash
sudo apt update && sudo apt upgrade -y
```

Database stays on Neon. This box just runs Node, Nginx, and PM2.
