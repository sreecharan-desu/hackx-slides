---
title: "5. Empty folder, first guests"
order: 5
---

# Empty folder, first guests

A club backend starts as a folder and a guest list. TypeScript from minute one — `tsx` runs `.ts` files live so we don't babysit a `dist/` during class.

```bash
mkdir club-portal-backend && cd club-portal-backend
npm init -y
npm pkg set type=module
npm install express cors dotenv bcrypt jsonwebtoken nodemailer @aws-sdk/client-sesv2 @prisma/client@6.12.0
npm install -D typescript tsx prisma@6.12.0 @types/express @types/cors @types/bcrypt @types/jsonwebtoken @types/nodemailer @types/node nodemon
npx tsc --init
```

**Same Prisma version on both packages (6.12.0).** Mix 6 and 7 and the generated client looks for a runtime file that no longer exists. The process dies before anyone can join the club.

Who's on the guest list:

| Guest | Job in the story |
| --- | --- |
| Express | Speaks HTTP at the door |
| Prisma | Typed questions to Postgres |
| SES SDK | Sends letters with the CLI keys |
| bcrypt / jwt | Hash passwords, hand out tickets |
| nodemailer | Only if we dump mail into MailDev locally |
| tsx | Keep TypeScript running while we teach |

Open `tsconfig.json`. Our own files import **`.ts`**. Generated Prisma is the exception: **`.js`**. `rootDir` is `src` — later we move Prisma's config *into* `src` so TypeScript doesn't complain.

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

`noEmit` only — not together with `emitDeclarationOnly`. We are not compiling to disk; `tsx` is the runner.

Scripts from the **repo root**:

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

Do **not** pass `--config src/prisma.config.ts`. Those paths are written from the project root. Next: a process that answers hello.
