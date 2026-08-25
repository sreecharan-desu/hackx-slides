---
title: "18. The members room"
order: 18
---

# The members room

Chat is for people with a ticket. RAG can arrive later — today we own the **gate**. No ticket, 401. Empty question, 400. Otherwise a honest stub: we haven't wired the librarian yet.

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

Event-day RAG contract is `POST /ask` with top-level `answer` and `sources`. We mount that stub on the **same** process in the next slide — port 4000, not a second listener on 8080. Next: we actually start the building.
