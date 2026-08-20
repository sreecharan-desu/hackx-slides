---
title: "4. Tooling"
order: 4
---

# Tooling

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
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o awscliv2.zip
unzip awscliv2.zip && sudo ./aws/install
```

```bash
aws configure
# Access Key · Secret · region e.g. ap-south-1 · json
```

Node runs the API. DynamoDB holds durable state. AWS CLI creates tables and tears them down.
