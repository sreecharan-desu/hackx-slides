---
title: "24. EC2 access"
order: 24
---

# EC2 access

Launch Ubuntu 24.04 · `t3.micro` · key pair downloaded.

Security group: `22` (your IP), `80`, `443`.

```bash
chmod 400 club-portal.pem
ssh -i club-portal.pem ubuntu@PUBLIC_IP
sudo apt update && sudo apt upgrade -y
```

First successful shell on the instance is the hard part done.
