---
title: "19. Compose the app"
order: 19
---

# Compose the app

This is the file you actually start. Everything mounts here so there's one place to look when something's missing.

`src/server.ts`

```ts
import "dotenv/config";
import express from "express";
import cors from "cors";
import { requireAuth } from "./middleware/auth";
import authRoutes from "./routes/auth";
import meRoutes from "./routes/me";
import chatRoutes from "./routes/chat";

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

If the console says `up on 4000`, you're cooking.
