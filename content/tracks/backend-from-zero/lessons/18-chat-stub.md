---
title: "18. Protected chat"
order: 18
---

# Protected chat

Chat is for logged-in members only. RAG can come later — today we own the gate.

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

On event day the RAG contract is `POST /ask` with top-level `answer` and `sources`. This app mounts that stub on the **same** process as `/chat` (slide 19) — port 4000, not a second listener on 8080.
