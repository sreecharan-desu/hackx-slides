---
title: "13. Email verification"
order: 13
---

# Email verification

That link in the email? It's a one-time token. We check it, flip `isVerified`, and burn the token so nobody reuses it.

```ts
router.get("/verify", async (req, res) => {
  try {
    const token = String(req.query.token ?? "");
    const row = await prisma.emailToken.findUnique({ where: { token } });

    if (!row || row.purpose !== "verify" || row.usedAt) {
      return res.status(400).json({ error: "invalid token" });
    }
    if (row.expiresAt < new Date()) {
      return res.status(400).json({ error: "token expired" });
    }

    await prisma.user.update({
      where: { id: row.userId },
      data: { isVerified: true },
    });
    await prisma.emailToken.update({
      where: { token },
      data: { usedAt: new Date() },
    });

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "verify failed" });
  }
});
```

Demo tip: open Gmail (check Spam), click the link, then try logging in.
