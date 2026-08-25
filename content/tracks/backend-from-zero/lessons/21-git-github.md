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

**Public.** Private repos make `git clone` on EC2 ask for a GitHub username. GitHub won't even say "not found." That's the prompt that made everyone swear in class.

Neon URL is a password. `.env` stays off GitHub.

Clone for this workshop: https://github.com/sreecharan-desu/club-portal-backend

Pushing here **does** update EC2 once Actions is green (slide 23). If DNS is drunk, curl with `--resolve`.
