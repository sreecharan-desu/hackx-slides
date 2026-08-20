---
title: "4. Tooling"
order: 4
---

# Tooling

Before we touch code, make sure your laptop can run Node and talk to AWS. You don't need Postgres installed locally — Neon handles that.

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

We'll use the AWS CLI later for teardown. For now, just get `aws configure` out of the way.
