---
title: "6. Just make it say hello"
order: 6
---

# Just make it say hello

Forget members. Forget mail. If `/health` is dead, nothing else matters and you'll debug ghosts.

```bash
mkdir -p src
touch src/server.ts .env .gitignore
```

Gitignore so we don't accidentally publish the whole club:

```text
node_modules/
.env
.env.*
dist/
/src/generated/prisma
.DS_Store
```

Prisma generates a pile of files. Ignore them. Don't hand-edit.

Access keys stay in `~/.aws`. `.env` is just our app:

```bash
PORT=4000
JWT_SECRET=replace-with-long-random
APP_URL=http://localhost:4000
AWS_REGION=ap-south-1
MAIL_FROM=sreecharan309@gmail.com
DATABASE_URL=
```

`MAIL_FROM` is whatever Gmail or college mail you verify later. No domain.

```ts
import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

const port = Number(process.env.PORT) || 4000;
app.listen(port, "0.0.0.0", () => {
  console.log(`listening on ${port}`);
});
```

```bash
npm run dev
curl http://localhost:4000/health
```

`{ ok: true }` and you can breathe. Database next — still not on this laptop.
