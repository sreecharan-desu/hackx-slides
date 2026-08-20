---
title: "4. Tooling"
order: 4
---

# Tooling

You need Node for the API and the AWS CLI for deploy and teardown — not for the database.

```bash
node -v    # 20+
npm -v
aws --version
```

```bash
# macOS
brew install node awscli

# Ubuntu
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

```bash
aws configure
# Access Key · Secret · region e.g. ap-south-1 · json
```

Postgres will live on **Neon** in the cloud. No local Postgres install required for the workshop.
