---
title: "16. GET /me"
order: 16
---

# GET /me

After login, the UI needs one simple question answered: "who am I right now?"

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

If this returns the user, auth is working end to end. Celebrate briefly, then move on.
