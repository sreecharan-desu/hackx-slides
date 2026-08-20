---
title: "21. Source control"
order: 21
---

# Source control

```bash
git init
git add .
git commit -m "auth, /me, mail, chat gate"
gh repo create club-portal-backend --private --source=. --remote=origin --push
```

Keep `.env` and `node_modules/` out of the tree. Secrets live on the host and in Actions.
