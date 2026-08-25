---
title: "18. The members room"
order: 18
---

# Members only

Chat is for people who logged in. RAG can wait. Today we own the lock. No token → 401. Empty question → 400. Otherwise we admit it: librarian isn't plugged in.

`src/routes/chat.ts`

```ts
import { Router } from "express";
import { requireAuth } from "../middleware/auth.ts";

const router = Router();

router.post("/chat", requireAuth, async (req, res) => {
  const question = String(req.body.question ?? "").trim();
  if (!question) return res.status(400).json({ error: "question required" });

  // later: forward to the RAG service
  res.json({ answer: "RAG not wired yet.", sources: [] });
});

export default router;
```

Event day also wants `POST /ask` with `answer` and `sources`. We stick that stub on the **same** process. Port 4000. Not some second server on 8080.
