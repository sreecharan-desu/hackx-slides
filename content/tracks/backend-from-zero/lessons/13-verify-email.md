---
title: "13. They prove they own the inbox"
order: 13
---

# They prove they own the inbox

The letter is not the membership card. The **token** is. We look it up, we check it isn't used or expired, we flip `isVerified`, we burn the token so nobody replays the link.

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

Open the inbox you registered — **Spam first**. Subject: **Verify your account**. From: `MAIL_FROM` **via** `amazonses.com`. Copy `token=` and curl (next beats) — don't rely on clicking localhost in webmail. Then they can try login.
