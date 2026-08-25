---
title: "19. Open the building"
order: 19
---

# This is the file you start

`server.ts` only listens. `app.ts` mounts routes. Missing a URL? It's a file under `src/routes/`.

`src/app.ts`

```ts
import express from "express";
import cors from "cors";
import health from "./routes/health.ts";
import auth from "./routes/auth.ts";
import me from "./routes/me.ts";
import chat from "./routes/chat.ts";
import ask from "./routes/ask.ts";

export const app = express();
app.use(cors());
app.use(express.json());
app.use(health);
app.use("/auth", auth);
app.use(me);
app.use(chat);
app.use(ask);
```

`src/server.ts`

```ts
import { env } from "./config.ts";
import { app } from "./app.ts";

app.listen(env.port, "0.0.0.0", () => console.log(`up on ${env.port}`));
```

`config.ts` throws if JWT, APP_URL, MAIL_FROM, or DATABASE_URL is missing. That's on purpose.

```bash
npm run dev
```

`up on 4000`. `/health` still never opens Neon.
