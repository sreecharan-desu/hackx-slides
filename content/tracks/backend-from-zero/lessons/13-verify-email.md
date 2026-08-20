---
title: "13. Email verification"
order: 13
---

# Email verification

The link in the email is a single-use token. After it succeeds, mark the user verified and burn the token.

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
