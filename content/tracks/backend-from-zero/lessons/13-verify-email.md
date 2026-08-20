---
title: "13. Email verification"
order: 13
---

# Email verification

```js
router.get("/verify", async (req, res) => {
  try {
    const token = String(req.query.token || "");
    const row = await db.token.findUnique({ where: { token } });

    if (!row || row.purpose !== "verify" || row.usedAt) {
      return res.status(400).json({ error: "invalid token" });
    }
    if (new Date(row.expiresAt) < new Date()) {
      return res.status(400).json({ error: "token expired" });
    }

    await db.user.update({
      where: { email: row.userEmail },
      data: { isVerified: true },
    });
    await db.token.update({
      where: { token },
      data: { usedAt: new Date().toISOString() },
    });

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "verify failed" });
  }
});
```
