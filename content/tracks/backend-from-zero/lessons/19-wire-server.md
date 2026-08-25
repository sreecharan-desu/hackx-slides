---
title: "19. Open the building"
order: 19
---

# Open the building

This is the file you actually start. Everything hangs off one desk. If a route is missing, you look here first.

`src/server.ts`

```ts
import "dotenv/config";
import express from "express";
import cors from "cors";
import { requireAuth } from "./middleware/auth.ts";
import authRoutes from "./routes/auth.ts";
import meRoutes from "./routes/me.ts";
import chatRoutes from "./routes/chat.ts";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/auth", authRoutes);
app.use(meRoutes);
app.use(chatRoutes);

app.post("/ask", requireAuth, async (req, res) => {
  const question = String(req.body.question ?? "").trim();
  if (!question) return res.status(400).json({ error: "question required" });
  res.json({ answer: "RAG not wired yet.", sources: [] });
});

const port = Number(process.env.PORT) || 4000;
app.listen(port, "0.0.0.0", () => console.log(`up on ${port}`));
```

```bash
npm run dev
```

If the console says `up on 4000`, the building is open. Next we walk a real person through join → mail → login → me.
