---
title: "19. Compose the app"
order: 19
---

# Compose the app

`src/server.js`

```js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { requireAuth } = require("./middleware/auth");
const { query } = require("./db");

const authRoutes = require("./routes/auth");
const meRoutes = require("./routes/me");
const chatRoutes = require("./routes/chat");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.get("/db-check", async (_req, res) => {
  const { rows } = await query("SELECT NOW() AS now");
  res.json({ ok: true, now: rows[0].now });
});

app.use("/auth", authRoutes);
app.use(meRoutes);
app.use(chatRoutes);

app.post("/ask", requireAuth, async (req, res) => {
  const question = String(req.body.question || "").trim();
  if (!question) return res.status(400).json({ error: "question required" });
  res.json({ answer: "RAG not wired yet.", sources: [] });
});

app.listen(process.env.PORT || 4000, "0.0.0.0", () => {
  console.log("up");
});
```

```bash
npm run dev
```
