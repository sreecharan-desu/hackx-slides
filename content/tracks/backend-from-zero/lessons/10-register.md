---
title: "10. Register"
order: 10
---

# Register

```js
const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { db } = require("../db");
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

    const existing = await db.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: "email already registered" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await db.user.create({
      data: { email, passwordHash, name: name || null },
    });

    const token = crypto.randomBytes(32).toString("hex");
    await db.token.create({
      data: {
        token,
        userEmail: email,
        purpose: "verify",
        expiresAt: new Date(Date.now() + 864e5).toISOString(),
      },
    });

    await sendMail({
      to: email,
      subject: "Verify your account",
      text: `${process.env.APP_URL}/auth/verify?token=${token}`,
    });

    res.status(201).json({
      user: { id: user.id, email: user.email, name: user.name, isVerified: user.isVerified },
    });
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      return res.status(409).json({ error: "email already registered" });
    }
    console.error(err);
    res.status(500).json({ error: "register failed" });
  }
});

module.exports = router;
```
