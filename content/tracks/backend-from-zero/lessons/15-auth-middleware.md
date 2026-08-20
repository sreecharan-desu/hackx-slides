---
title: "15. Auth middleware"
order: 15
---

# Auth middleware

Middleware = a **bouncer** before the route.

```text
Request → bouncer checks ticket → route handler
```

### `src/middleware/auth.js` (copy-paste)

```js
const jwt = require("jsonwebtoken");
const { query } = require("../db");

async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({ error: "missing token" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const found = await query(
      `SELECT id, email, name, is_verified, created_at
       FROM users WHERE id = $1`,
      [payload.sub]
    );

    if (!found.rows.length) {
      return res.status(401).json({ error: "user not found" });
    }

    req.user = found.rows[0];
    next();
  } catch (err) {
    return res.status(401).json({ error: "invalid or expired token" });
  }
}

module.exports = { requireAuth };
```

Chat page = **members only** → every chat request must pass this bouncer.
