---
title: "23. CI/CD — homework, not done"
order: 23
---

# CI/CD — homework, not done

If someone asks "where's your pipeline?" this is the answer: **we deploy by SSH today.** The YAML below is what you'd add when you have time. We have **not** put `EC2_HOST` / `EC2_USER` / `EC2_SSH_KEY` in GitHub → Settings → Secrets. A push from the laptop will **not** update EC2 until you do.

When you do it, you need:

| Secret | What it is |
| --- | --- |
| `EC2_HOST` | public IP (or Elastic IP) |
| `EC2_USER` | `ubuntu` |
| `EC2_SSH_KEY` | full contents of the `.pem` |

Create `.github/workflows/deploy.yml` on `main`:

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

Then push from your machine and watch the Actions tab. First time it'll fail if the clone path or pm2 name is wrong. That's normal.

Until those secrets exist: change code locally → `git push` → SSH → `cd /var/www/club-portal-backend && git pull && pm2 restart club-api`.
