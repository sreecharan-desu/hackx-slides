---
title: "18. Protected chat"
order: 18
---

# Protected chat

```js
const express = require("express");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/chat", requireAuth, async (req, res) => {
  const question = String(req.body.question || "").trim();
  if (!question) return res.status(400).json({ error: "question required" });

  res.json({ answer: "RAG not wired yet.", sources: [] });
});

module.exports = router;
```

Event day: `POST /ask` · `0.0.0.0:8080` · top-level `answer` + `sources`.
