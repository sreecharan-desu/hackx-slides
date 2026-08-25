---
title: "21. Get it off your laptop"
order: 21
---

# Get it off your laptop

This cannot live on one person's machine. Push the code. Leave secrets at home.

```bash
git init
git add .
git commit -m "auth, /me, prisma, ses"
gh repo create club-portal-backend --public --source=. --remote=origin --push
```

**Public.** A private repo makes `git clone` on EC2 ask for a GitHub username. GitHub will not even say "not found." That prompt is confusing — make it public for class.

Neon URL is a password. `.env` stays off GitHub.

When you want to compare your files: https://github.com/sreecharan-desu/club-portal-backend

Your push to `main` **does** update EC2 once Actions is green (next slides). If DNS fails, curl with `--resolve`.
