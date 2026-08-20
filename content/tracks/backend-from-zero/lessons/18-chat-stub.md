---
title: "18. Chat stub (members only)"
order: 18
---

# Chat stub (members only)

Anand owns RAG. You own: **logged-in users only** can hit chat.

```text
POST /chat  +  Bearer token
      ↓
requireAuth
      ↓
forward to FastAPI  (or temporary echo)
```

### `src/routes/chat.js` (copy-paste)

```js
const express = require("express");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// Temporary stub until RAG is connected
router.post("/chat", requireAuth, async (req, res) => {
  const question = String(req.body.question || "").trim();
  if (!question) return res.status(400).json({ error: "question required" });

  // Later: call FastAPI RAG service here
  // const rag = await fetch(process.env.RAG_URL + "/ask", { ... })

  res.json({
    answer:
      "RAG not connected yet. When connected, answers come only from club documents with sources.",
    sources: [],
    askedBy: req.user.email,
  });
});

module.exports = router;
```

### 30% note (event day)

Judges also need:

```http
POST /ask   on port 8080
```

Exact JSON: `{ "answer", "sources": [ { "document", ... } ] }`

You can mount the same handler on `/ask` and listen on `8080` for the evaluator. Anand fills the real answer.
