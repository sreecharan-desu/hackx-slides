---
title: "5. Bootstrap"
order: 5
---

# Bootstrap

We're going TypeScript from the first command. `tsx` lets us run `.ts` files without a separate build step while we're teaching.

```bash
mkdir club-portal-backend && cd club-portal-backend
npm init -y
npm pkg set type=module
npm install express cors dotenv bcrypt jsonwebtoken nodemailer @aws-sdk/client-sesv2 @prisma/client@6.12.0
npm install -D typescript tsx prisma@6.12.0 @types/express @types/cors @types/bcrypt @types/jsonwebtoken @types/nodemailer @types/node nodemon
npx tsc --init
```

Pin **the same** Prisma version on `prisma` and `@prisma/client` (6.12.0). A 7.x client with a 6.x CLI generates code that imports `@prisma/client/runtime/library` — that file is gone in 7, and `tsx` dies with `ERR_MODULE_NOT_FOUND`.

Open `tsconfig.json` and turn these on. Local files import with a **`.ts`** specifier (`import prisma from "../db.ts"`). `tsx` + `allowImportingTsExtensions` is what makes that legal. The generated Prisma client is the exception: import `./generated/prisma/client.js`.

`rootDir` is `src`. Move `prisma.config.ts` **inside** `src/` (slide 7) so `tsc` does not complain that the file is outside `rootDir`.

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

`allowImportingTsExtensions` requires `noEmit` **or** `emitDeclarationOnly`. Do not set both — `tsc` will reject that pair. We use `noEmit` because `tsx` runs the `.ts` files; we are not emitting a `dist/`.

| Package | Why we care |
| --- | --- |
| express | Speaks HTTP |
| prisma / `@prisma/client` | Schema + typed queries (client is generated into `src/generated`) |
| `@aws-sdk/client-sesv2` | `SendEmail` using `aws configure` keys |
| bcrypt / jsonwebtoken | Passwords + login tickets |
| nodemailer | MailDev fallback only (`SMTP_HOST=localhost`) |
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

Run those from the **repo root**. Prisma finds `prisma/schema.prisma` by itself. Do **not** add `--config src/prisma.config.ts` — that config's paths are written from the repo root, so `--config` looks for `src/prisma/schema.prisma` and fails.
