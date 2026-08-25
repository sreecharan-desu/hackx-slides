---
title: "21. Leave the laptop"
order: 21
---

# Leave the laptop

The club cannot live only on one person's machine. We push the TypeScript. Secrets stay home.

```bash
git init
git add .
git commit -m "auth, /me, prisma, ses"
gh repo create club-portal-backend --public --source=. --remote=origin --push
```

**Public** so an EC2 box can `git clone` over HTTPS with **no GitHub login**. A private repo prompts `Username for 'https://github.com':` — GitHub hides "not found" behind a login. That's the trap from class.

Neon URL is a password. It stays in `.env`, never on GitHub.

This workshop's clone:

https://github.com/sreecharan-desu/club-portal-backend

Next: why we don't SSH forever.
