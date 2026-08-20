---
title: "13. Verify email"
order: 13
---

# Verify email

Add to `src/routes/auth.js`:

```js
router.get("/verify", async (req, res) => {
  try {
    const token = String(req.query.token || "");
    if (!token) return res.status(400).json({ error: "token required" });

    const found = await query(
      `SELECT * FROM email_tokens
       WHERE token = $1 AND purpose = 'verify' AND used_at IS NULL`,
      [token]
    );

    if (!found.rows.length) {
      return res.status(400).json({ error: "invalid token" });
    }

    const row = found.rows[0];
    if (new Date(row.expires_at) < new Date()) {
      return res.status(400).json({ error: "token expired" });
    }

    await query("UPDATE users SET is_verified = TRUE WHERE id = $1", [row.user_id]);
    await query("UPDATE email_tokens SET used_at = NOW() WHERE id = $1", [row.id]);

    res.json({ message: "email verified — you can login now" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "verify failed" });
  }
});
```

### Flow

```text
Register → email link → GET /auth/verify?token=... → is_verified = true
```

### Test later with curl (after wiring routes)

```bash
# copy token from MailDev UI or DB
curl "http://localhost:4000/auth/verify?token=PASTE_TOKEN"
```
