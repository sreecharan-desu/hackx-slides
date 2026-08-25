---
title: "15. The bouncer"
order: 15
---

# Don't even start the handler

If they don't have a Bearer token, chat shouldn't run. Read the header, verify JWT, load the user, put them on `req.user`.

```mermaid
flowchart LR
  REQ[A request] --> MW[requireAuth]
  MW -->|ticket ok| DB[(Still them?)]
  MW --> H[The room]
```

`src/middleware/auth.ts`

```ts
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../db.ts";

export type AuthedRequest = Request & {
  user?: { id: string; email: string; name: string | null; isVerified: boolean };
};

export async function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const [scheme, token] = String(req.headers.authorization ?? "").split(" ");
    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ error: "unauthorized" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { sub: string; email: string };
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) return res.status(401).json({ error: "unauthorized" });

    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      isVerified: user.isVerified,
    };
    next();
  } catch {
    return res.status(401).json({ error: "unauthorized" });
  }
}
```

Hang this on chat. Hang it on anything that shouldn't be public.
