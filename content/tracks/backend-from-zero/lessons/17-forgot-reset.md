---
title: "17. Forgot + reset password"
order: 17
---

# Forgot + reset password

Required by 70% PS.

```text
Email
 ↓
temporary token (expires)
 ↓
email reset link
 ↓
user sets new password
 ↓
invalidate token (one-time)
```

Add to `src/routes/auth.js`:

```js
router.post("/forgot-password", async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const found = await query("SELECT id, email FROM users WHERE email = $1", [email]);

    // Always same response — don't leak whether email exists
    const generic = { message: "if that email exists, a reset link was sent" };
    if (!found.rows.length) return res.json(generic);

    const user = found.rows[0];
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 30); // 30 min

    await query(
      `INSERT INTO email_tokens (user_id, token, purpose, expires_at)
       VALUES ($1, $2, 'reset', $3)`,
      [user.id, token, expires]
    );

    const resetUrl = `${process.env.APP_URL}/reset-password?token=${token}`;
    await sendMail({
      to: user.email,
      subject: "Reset your Club Portal password",
      text: `Reset link (30 min): ${resetUrl}`,
    });

    res.json(generic);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "forgot-password failed" });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const token = String(req.body.token || "");
    const password = String(req.body.password || "");

    if (!token || password.length < 8) {
      return res.status(400).json({ error: "token + password (min 8) required" });
    }

    const found = await query(
      `SELECT * FROM email_tokens
       WHERE token = $1 AND purpose = 'reset' AND used_at IS NULL`,
      [token]
    );
    if (!found.rows.length) return res.status(400).json({ error: "invalid token" });

    const row = found.rows[0];
    if (new Date(row.expires_at) < new Date()) {
      return res.status(400).json({ error: "token expired" });
    }

    const password_hash = await bcrypt.hash(password, 10);
    await query("UPDATE users SET password_hash = $1 WHERE id = $2", [
      password_hash,
      row.user_id,
    ]);
    await query("UPDATE email_tokens SET used_at = NOW() WHERE id = $1", [row.id]);

    res.json({ message: "password updated — login again" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "reset-password failed" });
  }
});
```

### Rules (say out loud)

- Token expiry
- One-time use
- Never email the password itself
- Hash the new password
