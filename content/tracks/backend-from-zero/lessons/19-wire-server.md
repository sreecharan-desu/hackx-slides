---
title: "19. Wire everything in server.js"
order: 19
---

# Wire everything in server.js

### Final `src/server.js` (copy-paste)

```js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const meRoutes = require("./routes/me");
const chatRoutes = require("./routes/chat");
const { query } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/db-check", async (req, res) => {
  try {
    const result = await query("SELECT NOW() as now");
    res.json({ ok: true, now: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ ok: false });
  }
});

app.use("/auth", authRoutes);
app.use(meRoutes);   // GET /me
app.use(chatRoutes); // POST /chat

// Event evaluator (30%): same shape later as /ask
app.post("/ask", require("./middleware/auth").requireAuth, async (req, res, next) => {
  req.url = "/chat";
  return chatRoutes.handle(req, res, next);
});

const port = process.env.PORT || 4000;
app.listen(port, "0.0.0.0", () => {
  console.log(`API on 0.0.0.0:${port}`);
});
```

Simpler `/ask` alternative (clearer for teaching):

```js
const { requireAuth } = require("./middleware/auth");

app.post("/ask", requireAuth, async (req, res) => {
  // For now reuse chat stub body
  const question = String(req.body.question || "").trim();
  if (!question) return res.status(400).json({ error: "question required" });
  res.json({
    answer: "RAG not connected yet.",
    sources: [],
  });
});
```

### Restart

```bash
npm run dev
```
