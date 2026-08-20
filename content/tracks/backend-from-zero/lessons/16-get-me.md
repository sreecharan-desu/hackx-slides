---
title: "16. GET /me — who am I?"
order: 16
---

# GET /me — who am I?

Frontend needs: “who is logged in right now?”

```text
Authorization: Bearer <token>
        ↓
     GET /me
        ↓
  { id, email, name, ... }
```

### `src/routes/me.js` (copy-paste)

```js
const express = require("express");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
```

### Why `/me` matters

- Profile page
- Navbar avatar / email
- Decide if user can open chat
- Mohan’s frontend will call this after login

**Never include password fields.**
