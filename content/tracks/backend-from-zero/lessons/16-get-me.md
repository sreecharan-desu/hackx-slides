---
title: "16. Who am I right now?"
order: 16
---

# Who am I right now?

After login, the lobby only needs one honest answer. That's `GET /me` — same bouncer, JSON of `req.user`.

`src/routes/me.ts`

```ts
import { Router } from "express";
import { requireAuth, type AuthedRequest } from "../middleware/auth.ts";

const router = Router();

router.get("/me", requireAuth, (req: AuthedRequest, res) => {
  res.json({ user: req.user });
});

export default router;
```

```bash
curl http://localhost:4000/me \
  -H "Authorization: Bearer $TOKEN"
```

If this returns the member, auth is a complete story. Celebrate briefly. Next: they lost the password.
