---
title: "24. EC2 access"
order: 24
---

# EC2 access

You are creating one Ubuntu machine on AWS, then logging in from your laptop with SSH. Follow the console exactly.

### 1 · Open EC2

1. Sign in to [https://console.aws.amazon.com](https://console.aws.amazon.com)  
2. Top search bar → type **EC2** → open **EC2**  
3. Confirm the region (top-right), e.g. **Asia Pacific (Mumbai) `ap-south-1`** — stay in this region for everything that follows

### 2 · Launch instance

1. Left sidebar → **Instances** → **Launch instances**  
2. **Name:** `club-portal-api`  
3. **Application and OS Images (AMI):**  
   - Quick Start → **Ubuntu**  
   - Pick **Ubuntu Server 24.04 LTS** (Free tier eligible if shown)  
   - Architecture: **64-bit (x86)**  
4. **Instance type:** `t3.micro` (or `t2.micro` if that is your free-tier option)  
5. **Key pair (login):**  
   - **Create new key pair**  
   - Name: `club-portal`  
   - Type: **RSA**  
   - Format: **`.pem`** (Mac / Linux) — use `.ppk` only if you are on Windows + PuTTY  
   - **Create key pair** → the file downloads once. Store it somewhere safe (e.g. `~/Downloads/club-portal.pem`)

### 3 · Network / security group

Under **Network settings** → **Edit**:

1. Leave **VPC** and **Subnet** on defaults unless you already know otherwise  
2. **Auto-assign public IP:** Enable  
3. **Firewall (security groups):** Create security group  
   - Name: `club-portal-sg`  
4. Add inbound rules:

| Type | Port | Source | Why |
| --- | ---: | --- | --- |
| SSH | 22 | **My IP** | your laptop only |
| HTTP | 80 | Anywhere-IPv4 (`0.0.0.0/0`) | Nginx / Certbot |
| HTTPS | 443 | Anywhere-IPv4 (`0.0.0.0/0`) | TLS |

Do **not** open `4000` to the world — Nginx will proxy to Express on localhost later.

5. Storage: default **8 GiB gp3** is enough  
6. Click **Launch instance** → wait until **Instance state** is **Running** and **Status check** is **2/2 checks passed**

### 4 · Copy the public IP

1. **Instances** → select `club-portal-api`  
2. Details tab → copy **Public IPv4 address** (looks like `13.xxx.xxx.xxx`)  
3. Optional but recommended before a domain: **Elastic IPs** → Allocate → Associate to this instance, then use that IP forever (see Domain slide)

### 5 · SSH from your laptop

```bash
chmod 400 ~/Downloads/club-portal.pem

ssh -i ~/Downloads/club-portal.pem ubuntu@PASTE_PUBLIC_IP
```

First connect: type `yes` when asked about the host fingerprint. You should land on a prompt like `ubuntu@ip-...:~$`.

```bash
sudo apt update && sudo apt upgrade -y
```

Database stays on Neon. This box only needs Node, Nginx, and PM2 — next slide.
