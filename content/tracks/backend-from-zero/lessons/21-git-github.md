---
title: "21. Source control"
order: 21
---

# Source control

Ship the TypeScript source. Keep secrets and generated client noise out of git.

```bash
git init
git add .
git commit -m "auth, /me, prisma, ses"
gh repo create club-portal-backend --private --source=. --remote=origin --push
```

`.env` never leaves the machine. Neon’s connection string is a secret.
