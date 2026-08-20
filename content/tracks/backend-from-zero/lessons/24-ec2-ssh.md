---
title: "24. Create EC2 + SSH in"
order: 24
---

# Create EC2 + SSH in

### AWS Console (click path)

1. EC2 → Launch instance
2. Name: `club-portal-api`
3. AMI: **Ubuntu 24.04 LTS**
4. Type: `t3.micro` (free tier if eligible)
5. Key pair: create/download `.pem`
6. Security group inbound:
   - SSH `22` from **My IP**
   - HTTP `80` from `0.0.0.0/0`
   - HTTPS `443` from `0.0.0.0/0`
   - (optional demo) Custom TCP `4000` or `8080` from My IP / event Wi‑Fi

### SSH from your laptop

```bash
chmod 400 ~/Downloads/club-portal.pem

ssh -i ~/Downloads/club-portal.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

First login success message = you are on the machine.

### Update Ubuntu

```bash
sudo apt update && sudo apt upgrade -y
```

### Sources

- [Connect to Linux instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-to-linux-instance.html)
- [Security groups](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security-groups.html)
