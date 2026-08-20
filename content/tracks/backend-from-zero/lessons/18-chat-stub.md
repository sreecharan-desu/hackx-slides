---
title: "18. Protected chat"
order: 18
---

# Protected chat

Chat is for logged-in members only. RAG can come later — today we own the gate.

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

On event day you'll also expose `POST /ask` on `0.0.0.0:8080` with top-level `answer` and `sources`. Same idea, stricter contract.
