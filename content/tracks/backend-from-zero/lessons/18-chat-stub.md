---
title: "18. Protected chat"
order: 18
---

# Protected chat

RAG is Anand’s service. Auth gate is ours.

`src/routes/chat.js`

```js
const express = require("express");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/chat", requireAuth, async (req, res) => {
  const question = String(req.body.question || "").trim();
  if (!question) return res.status(400).json({ error: "question required" });

  // later: forward to FastAPI
  res.json({
    answer: "RAG not wired yet.",
    sources: [],
  });
});

module.exports = router;
```

Event day (30%): same contract on `POST /ask`, listen `0.0.0.0:8080`.

```json
{ "answer": "...", "sources": [{ "document": "..." }] }
```
