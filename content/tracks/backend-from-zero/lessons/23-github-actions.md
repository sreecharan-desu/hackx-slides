---
title: "23. GitHub Actions"
order: 23
---

# GitHub Actions

`.github/workflows/deploy.yml`

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
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm ci && node --check src/server.js
      - uses: appleboy/ssh-action@v1.2.0
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

Repo secrets: `EC2_HOST`, `EC2_USER`, `EC2_SSH_KEY`.
