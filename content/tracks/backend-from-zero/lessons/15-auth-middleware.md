---
title: "15. Auth middleware"
order: 15
---

# Auth middleware

```text
Authorization: Bearer <jwt>
        │
        ▼
   requireAuth
        │
        ▼
     route handler
```

`src/middleware/auth.js`

```js
const jwt = require("jsonwebtoken");
const { query } = require("../db");

async function requireAuth(req, res, next) {
  try {
    const [scheme, token] = String(req.headers.authorization || "").split(" ");
    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ error: "unauthorized" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { rows } = await query(
      `SELECT id, email, name, is_verified, created_at FROM users WHERE id = $1`,
      [payload.sub]
    );
    if (!rows.length) return res.status(401).json({ error: "unauthorized" });

    req.user = rows[0];
    next();
  } catch {
    return res.status(401).json({ error: "unauthorized" });
  }
}

module.exports = { requireAuth };
```

Attach to every members-only route. Chat included.
