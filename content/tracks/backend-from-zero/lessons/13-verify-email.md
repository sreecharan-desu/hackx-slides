---
title: "13. Email verification"
order: 13
---

# Email verification

```text
register → token mail → GET /auth/verify → is_verified
```

```js
router.get("/verify", async (req, res) => {
  try {
    const token = String(req.query.token || "");
    const { rows } = await query(
      `SELECT * FROM email_tokens
       WHERE token = $1 AND purpose = 'verify' AND used_at IS NULL`,
      [token]
    );
    if (!rows.length) return res.status(400).json({ error: "invalid token" });
    if (new Date(rows[0].expires_at) < new Date()) {
      return res.status(400).json({ error: "token expired" });
    }

    await query("UPDATE users SET is_verified = TRUE WHERE id = $1", [rows[0].user_id]);
    await query("UPDATE email_tokens SET used_at = NOW() WHERE id = $1", [rows[0].id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "verify failed" });
  }
});
```

One-time token. Expiry enforced. Marked used after success.
