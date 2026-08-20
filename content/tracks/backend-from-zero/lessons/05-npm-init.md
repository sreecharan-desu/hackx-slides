---
title: "5. Bootstrap"
order: 5
---

# Bootstrap

We're going TypeScript from the first command. `tsx` lets us run `.ts` files without a separate build step while we're teaching.

```bash
mkdir club-portal-backend && cd club-portal-backend
npm init -y
npm install express cors dotenv bcrypt jsonwebtoken nodemailer @prisma/client
npm install -D typescript tsx prisma @types/express @types/cors @types/bcrypt @types/jsonwebtoken @types/node nodemon
npx tsc --init
```

| Package | Why we care |
| --- | --- |
| express | Speaks HTTP |
| prisma / `@prisma/client` | Schema + typed queries |
| bcrypt / jsonwebtoken | Passwords + login tickets |
| nodemailer | Sends mail |
| tsx | Runs TypeScript live |

Drop these scripts into `package.json` so the room can follow along:

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
