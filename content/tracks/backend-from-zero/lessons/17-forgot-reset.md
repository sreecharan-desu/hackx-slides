---
title: "17. Password reset"
order: 17
---

# Password reset

Required by the 70% brief.

```text
forgot → mail token (30m) → reset → invalidate token
```

```js
router.post("/forgot-password", async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  const generic = { message: "if the account exists, a reset link was sent" };
  const { rows } = await query("SELECT id, email FROM users WHERE email = $1", [email]);
  if (!rows.length) return res.json(generic);

  const token = crypto.randomBytes(32).toString("hex");
  await query(
    `INSERT INTO email_tokens (user_id, token, purpose, expires_at)
     VALUES ($1, $2, 'reset', NOW() + INTERVAL '30 minutes')`,
    [rows[0].id, token]
  );
  await sendMail({
    to: rows[0].email,
    subject: "Reset password",
    text: `${process.env.APP_URL}/reset-password?token=${token}`,
  });
  res.json(generic);
});

router.post("/reset-password", async (req, res) => {
  const token = String(req.body.token || "");
  const password = String(req.body.password || "");
  if (!token || password.length < 8) {
    return res.status(400).json({ error: "token and password required" });
  }

  const { rows } = await query(
    `SELECT * FROM email_tokens
     WHERE token = $1 AND purpose = 'reset' AND used_at IS NULL`,
    [token]
  );
  if (!rows.length || new Date(rows[0].expires_at) < new Date()) {
    return res.status(400).json({ error: "invalid token" });
  }

  const password_hash = await bcrypt.hash(password, 10);
  await query("UPDATE users SET password_hash = $1 WHERE id = $2", [password_hash, rows[0].user_id]);
  await query("UPDATE email_tokens SET used_at = NOW() WHERE id = $1", [rows[0].id]);
  res.json({ ok: true });
});
```

Expiry. Single use. Hash again. Never email the new password.
