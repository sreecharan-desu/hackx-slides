---
title: "24. EC2 access"
order: 24
---

# EC2 access

One Ubuntu box. Your laptop SSHs in. That is the whole server story for this workshop.

Ubuntu 24.04 · `t3.micro` · download the `.pem`.

Security group: `22` (your IP), `80`, `443`.

```bash
chmod 400 club-portal.pem
ssh -i club-portal.pem ubuntu@PUBLIC_IP
sudo apt update && sudo apt upgrade -y
```

Database stays on Neon — the instance only runs Node, Nginx, and PM2.
