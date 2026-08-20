---
title: "21. Git + GitHub"
order: 21
---

# Git + GitHub

```bash
cd club-portal-backend
git init
git add .
git commit -m "feat: auth, /me, chat stub"
```

### Create private repo + push

```bash
gh repo create club-portal-backend --private --source=. --remote=origin --push
```

Or manually on github.com → then:

```bash
git remote add origin https://github.com/YOUR_USER/club-portal-backend.git
git branch -M main
git push -u origin main
```

### Never commit

```text
.env
node_modules/
```

### Sources

- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [gh cli](https://cli.github.com/)
