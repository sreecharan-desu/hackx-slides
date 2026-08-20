---
title: "16. GET /me"
order: 16
---

# GET /me

```js
const express = require("express");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
```

```bash
curl http://localhost:4000/me \
  -H "Authorization: Bearer $TOKEN"
```
