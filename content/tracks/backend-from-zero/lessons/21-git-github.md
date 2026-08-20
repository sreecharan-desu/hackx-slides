---
title: "21. Source control"
order: 21
---

# Source control

Time to get this off your laptop. Push the TypeScript — leave secrets behind.

```bash
git init
git add .
git commit -m "auth, /me, prisma, ses"
gh repo create club-portal-backend --private --source=. --remote=origin --push
```

That Neon connection string is a password. It stays in `.env`, not in GitHub.
