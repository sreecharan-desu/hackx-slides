---
title: "10. Register — copy paste"
order: 10
---

# Register — copy paste

### `src/routes/auth.js` (start of file)

```js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { query } = require("../db");
const { sendMail } = require("../mail");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    const name = String(req.body.name || "").trim();

    if (!email || !password || password.length < 8) {
      return res.status(400).json({ error: "email + password (min 8) required" });
    }

    const existing = await query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.rows.length) {
      return res.status(409).json({ error: "email already registered" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const inserted = await query(
      `INSERT INTO users (email, password_hash, name)
       VALUES ($1, $2, $3)
       RETURNING id, email, name, is_verified, created_at`,
      [email, password_hash, name || null]
    );

    const user = inserted.rows[0];
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

    await query(
      `INSERT INTO email_tokens (user_id, token, purpose, expires_at)
       VALUES ($1, $2, 'verify', $3)`,
      [user.id, token, expires]
    );

    const verifyUrl = `${process.env.APP_URL}/auth/verify?token=${token}`;
    await sendMail({
      to: email,
      subject: "Verify your Club Portal account",
      text: `Open this link to verify: ${verifyUrl}`,
    });

    // Never return password_hash
    res.status(201).json({
      message: "registered — check email to verify",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        is_verified: user.is_verified,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "register failed" });
  }
});

module.exports = router;
```

We will add `mail.js`, verify, login next.

**Never store plain passwords. Ever.**
