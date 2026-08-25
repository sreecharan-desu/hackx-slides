---
title: "23. The robot's script"
order: 23
---

# The robot's script

Install, typecheck, SSH in, pull, regenerate Prisma, restart PM2. Secrets live in GitHub Settings — not in the YAML.

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
      - run: npm ci && npx tsc --noEmit
      - uses: appleboy/ssh-action@v1.2.0
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            set -e
            cd /var/www/club-portal-backend
            git pull origin main
            npm ci
            npx prisma generate
            pm2 restart club-api || pm2 start "npx tsx src/server.ts" --name club-api
```

Add `EC2_HOST`, `EC2_USER`, `EC2_SSH_KEY` under Settings → Secrets. Push once and watch the run. Next: we actually rent the Ubuntu machine.
