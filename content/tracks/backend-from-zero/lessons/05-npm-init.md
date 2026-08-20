---
title: "5. Bootstrap"
order: 5
---

# Bootstrap

TypeScript from minute one — `tsx` runs `.ts` without a separate build step while you teach.

```bash
mkdir club-portal-backend && cd club-portal-backend
npm init -y
npm install express cors dotenv bcrypt jsonwebtoken nodemailer @prisma/client
npm install -D typescript tsx prisma @types/express @types/cors @types/bcrypt @types/jsonwebtoken @types/node nodemon
npx tsc --init
```

| Package | Role |
| --- | --- |
| express | HTTP |
| prisma / `@prisma/client` | schema + typed queries |
| bcrypt / jsonwebtoken | passwords + session tickets |
| nodemailer | outbound mail |
| tsx | run TypeScript directly |

Add scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "start": "tsx src/server.ts",
    "db:push": "prisma db push",
    "db:studio": "prisma studio"
  }
}
```
