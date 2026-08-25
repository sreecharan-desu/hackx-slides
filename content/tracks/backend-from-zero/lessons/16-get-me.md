---
title: "16. Who am I right now?"
order: 16
---

# Who am I?

After login the UI just needs this. Same middleware. JSON of `req.user`.

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

If that returns the user, auth works. You can smile for two seconds.
