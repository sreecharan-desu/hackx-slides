---
title: "14. Come back tomorrow"
order: 14
---

# Come back tomorrow

Email + password. Find them, check the hash, refuse if they never verified, then hand a JWT.

Same error for bad email and bad password. Don't help attackers.

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

That's the ticket. Next we actually check it instead of trusting whoever shows up.
