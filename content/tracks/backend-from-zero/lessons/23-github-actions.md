---
title: "23. GitHub Actions deploy"
order: 23
---

# GitHub Actions deploy

### Create workflow

```bash
mkdir -p .github/workflows
```

### `.github/workflows/deploy.yml` (copy-paste)

```yaml
name: Deploy API

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install + syntax check
        run: |
          npm ci
          node --check src/server.js

      - name: Deploy over SSH
        uses: appleboy/ssh-action@v1.2.0
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            set -e
            cd /var/www/club-portal-backend
            git pull origin main
            npm ci --omit=dev
            pm2 restart club-api || pm2 start src/server.js --name club-api
```

### GitHub → Settings → Secrets

| Secret | Value |
| --- | --- |
| `EC2_HOST` | server public IP or domain |
| `EC2_USER` | `ubuntu` |
| `EC2_SSH_KEY` | private key contents |

### Sources

- [GitHub Actions](https://docs.github.com/en/actions)
- [appleboy/ssh-action](https://github.com/appleboy/ssh-action)
