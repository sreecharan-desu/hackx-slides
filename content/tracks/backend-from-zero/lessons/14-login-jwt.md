---
title: "14. Come back tomorrow"
order: 14
---

# Come back tomorrow

They return with email and password. We find the person, we compare hashes, we refuse if they never proved the inbox, then we hand a **JWT** — a ticket that rides on later requests.

Same lie for bad email and bad password. We don't help attackers guess which one failed.

```ts
import jwt from "jsonwebtoken";

router.post("/login", async (req, res) => {
  try {
    const email = String(req.body.email ?? "").trim().toLowerCase();
    const password = String(req.body.password ?? "");

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "invalid credentials" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ error: "invalid credentials" });
    if (!user.isVerified) return res.status(403).json({ error: "email not verified" });

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "login failed" });
  }
});
```

The ticket is not magic. Next we hire a bouncer who actually checks it.
