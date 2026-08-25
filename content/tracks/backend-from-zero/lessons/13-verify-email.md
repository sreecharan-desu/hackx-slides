---
title: "13. They prove they own the inbox"
order: 13
---

# Prove you own the inbox

The email isn't membership. The **token** is. Look it up, make sure it's unused and not expired, flip `isVerified`, burn the token so nobody reuses the link.

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

Check **Spam**. Subject: Verify your account. Copy the token. Curl it. Don't trust clicking localhost from RGUKT webmail.
