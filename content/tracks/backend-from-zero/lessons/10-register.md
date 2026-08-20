---
title: "10. Register"
order: 10
---

# Register

`src/routes/auth.js`

```js
const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { query } = require("../db");
const { sendMail } = require("../mail");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    const name = String(req.body.name || "").trim();

    if (!email || password.length < 8) {
      return res.status(400).json({ error: "email and password (min 8) required" });
    }

    const existing = await query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.rows.length) {
      return res.status(409).json({ error: "email already registered" });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const { rows } = await query(
      `INSERT INTO users (email, password_hash, name)
       VALUES ($1, $2, $3)
       RETURNING id, email, name, is_verified`,
      [email, password_hash, name || null]
    );

    const token = crypto.randomBytes(32).toString("hex");
    await query(
      `INSERT INTO email_tokens (user_id, token, purpose, expires_at)
       VALUES ($1, $2, 'verify', NOW() + INTERVAL '24 hours')`,
      [rows[0].id, token]
    );

    await sendMail({
      to: email,
      subject: "Verify your account",
      text: `${process.env.APP_URL}/auth/verify?token=${token}`,
    });

    res.status(201).json({ user: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "register failed" });
  }
});

module.exports = router;
```

Plaintext passwords never leave memory hashed.
