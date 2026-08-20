---
title: "6. First process"
order: 6
---

# First process

First win of the day: get a process listening. Auth can wait until `/health` says hello.

```bash
mkdir -p src
touch src/server.ts .env .gitignore
```

`.gitignore` — keep secrets and junk out of git from minute one:

```text
node_modules/
.env
dist/
```

`.env` for now (Neon comes next):

```bash
PORT=4000
JWT_SECRET=replace-with-long-random
APP_URL=http://localhost:4000
DATABASE_URL=
```

`src/server.ts`

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

If that curls back `{ ok: true }`, the room is ready.
