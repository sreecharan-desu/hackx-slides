---
title: "18. Protected chat"
order: 18
---

# Protected chat

Chat is members-only. Wire RAG later — the auth gate is what we own here.

`src/routes/chat.ts`

```ts
import { Router } from "express";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/chat", requireAuth, async (req, res) => {
  const question = String(req.body.question ?? "").trim();
  if (!question) return res.status(400).json({ error: "question required" });

  // later: forward to the RAG service
  res.json({ answer: "RAG not wired yet.", sources: [] });
});

export default router;
```

Event day needs the same shape on `POST /ask` at `0.0.0.0:8080` — top-level `answer` and `sources`.
