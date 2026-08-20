---
title: "16. GET /me"
order: 16
---

# GET /me

After login, the frontend asks “who am I?” once. This is that endpoint.

`src/routes/me.ts`

```ts
import { Router } from "express";
import { requireAuth, type AuthedRequest } from "../middleware/auth";

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

Profile, nav, and “can open chat?” all hang off this response.
