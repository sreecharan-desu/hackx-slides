---
title: "5. Empty folder, dump packages in"
order: 5
---

# Empty folder, dump packages in

TypeScript from the first command. `tsx` runs `.ts` live so we're not fighting a `dist/` folder while people are still installing Node.

```bash
mkdir club-portal-backend && cd club-portal-backend
npm init -y
npm pkg set type=module
npm install express cors dotenv bcrypt jsonwebtoken nodemailer @aws-sdk/client-sesv2 @prisma/client@6.12.0
npm install -D typescript tsx prisma@6.12.0 @types/express @types/cors @types/bcrypt @types/jsonwebtoken @types/nodemailer @types/node nodemon
npx tsc --init
```

**Pin Prisma 6.12.0 on both `prisma` and `@prisma/client`.** I mixed 6 and 7 once. It looks for a file that doesn't exist anymore and `tsx` just dies. Don't be me.

| Package | Why |
| --- | --- |
| express | HTTP |
| prisma | talk to Postgres without writing SQL by hand |
| `@aws-sdk/client-sesv2` | send mail with the keys from `aws configure` |
| bcrypt / jwt | hash + tickets |
| nodemailer | only if you dump mail to MailDev locally |
| tsx | run TypeScript |

Our files import `.ts`. Generated Prisma imports `.js`. Weird, but that's Node. `rootDir` is `src` so later Prisma config has to live in there too.

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

Don't set `noEmit` and `emitDeclarationOnly` together. `tsc` gets mad.

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

Run those from the repo root. **Don't** add `--config src/prisma.config.ts`. I did. It looks for `src/prisma/schema.prisma` and fails. Ugly.
