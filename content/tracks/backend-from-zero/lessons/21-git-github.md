---
title: "21. Source control"
order: 21
---

# Source control

```bash
git init
git add .
git commit -m "auth, /me, dynamodb, ses"
gh repo create club-portal-backend --private --source=. --remote=origin --push
```

Keep `.env` out of the tree. Credentials live on the host and in Actions secrets.
