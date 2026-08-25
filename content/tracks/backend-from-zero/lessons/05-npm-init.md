---
title: "5. Empty folder, dump packages in"
order: 5
---

# Empty folder, dump packages in

TypeScript from the first command. `tsx` runs `.ts` live. Small list on purpose.

```bash
mkdir club-portal-backend && cd club-portal-backend
npm init -y
npm pkg set type=module
npm install express cors dotenv bcrypt jsonwebtoken @aws-sdk/client-sesv2 @prisma/client@6.12.0
npm install -D typescript tsx prisma@6.12.0 @types/express @types/cors @types/bcrypt @types/jsonwebtoken @types/node
npx tsc --init
```

**Pin Prisma 6.12.0 on both.** If one is 6 and one is 7, `tsx` dies looking for a file that moved.

| Package | Why |
| --- | --- |
| express | HTTP |
| prisma | Postgres without handwritten SQL |
| `@aws-sdk/client-sesv2` | mail. same keys as `aws configure` |
| bcrypt / jwt | hash + tickets |
| tsx | run TypeScript |

No Nodemailer. No MailDev. If it isn't SES, we don't send it.

Our files import `.ts`. Generated Prisma imports `.js`. `rootDir` is `src`.

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "module": "nodenext",
    "allowImportingTsExtensions": true,
    "rewriteRelativeImportExtensions": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

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

Run from repo root. **Don't** pass `--config src/prisma.config.ts`.
