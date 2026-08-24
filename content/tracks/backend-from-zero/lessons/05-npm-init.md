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

Open `tsconfig.json` and turn these on. Prisma's generated client is `.js`. Without this, `import prisma from "../db.ts"` type-errors — use `import prisma from "../db.js"` instead. The file on disk is still `db.ts`; the `.js` in the import is the emit name.

`rootDir` is `src`. If `prisma.config.ts` stays at the repo root, `tsc` errors: **file is not under rootDir**. Put the Prisma config **inside** `src/` (slide 7).

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "allowImportingTsExtensions": true,
    "rewriteRelativeImportExtensions": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

`allowImportingTsExtensions` requires `noEmit` **or** `emitDeclarationOnly`. Do not set both — `tsc` will reject that pair. We use `noEmit` because `tsx` runs the `.ts` files; we are not emitting a `dist/`.

| Package | Why we care |
| --- | --- |
| express | Speaks HTTP |
| prisma / `@prisma/client` | Schema + typed queries (client is generated into `src/generated`) |
| bcrypt / jsonwebtoken | Passwords + login tickets |
| nodemailer | Sends mail |
| tsx | Runs TypeScript live |

Drop these scripts into `package.json` so the room can follow along:

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "start": "tsx src/server.ts",
    "db:push": "prisma db push --config src/prisma.config.ts",
    "db:studio": "prisma studio --config src/prisma.config.ts"
  }
}
```
