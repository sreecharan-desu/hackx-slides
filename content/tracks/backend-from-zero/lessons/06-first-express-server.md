---
title: "6. First heartbeat"
order: 6
---

# First heartbeat

Before members, before mail: prove a process is alive. If `/health` doesn't answer, nothing else in the story matters.

```bash
mkdir -p src
touch src/server.ts .env .gitignore
```

`.gitignore` is the "don't leak the club secrets" list:

```text
node_modules/
.env
.env.*
dist/
/src/generated/prisma
.DS_Store
```

Prisma will later write generated code. Ignore it. Never edit it by hand.

`.env` is the back office. Access keys stay in `~/.aws` — not here.

```bash
PORT=4000
JWT_SECRET=replace-with-long-random
APP_URL=http://localhost:4000
AWS_REGION=ap-south-1
MAIL_FROM=sreecharan309@gmail.com
DATABASE_URL=
```

`MAIL_FROM` is the **email identity** we verify later (Gmail or college mail — nobody needs a domain today).

The smallest possible door:

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

`{ ok: true }` means the room is breathing. Next we rent a database in the cloud — still no Postgres on the laptop.
