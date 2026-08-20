---
title: "24. EC2 access"
order: 24
---

# EC2 access

Ubuntu 24.04 · `t3.micro` · key pair downloaded.

Security group: `22` (your IP), `80`, `443`.

```bash
chmod 400 club-portal.pem
ssh -i club-portal.pem ubuntu@PUBLIC_IP
sudo apt update && sudo apt upgrade -y
```

IAM on the instance (or env keys): allow DynamoDB read/write on your two tables + SES send if not using SMTP user.
