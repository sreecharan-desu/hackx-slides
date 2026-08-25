---
title: "10. Someone wants in"
order: 10
---

# Someone wants in

A new member types an email and a password. We do not trust the password as text. We hash it, we save the person as **unverified**, we mint a one-time token, we send a letter.

`src/routes/auth.ts` — the join scene:

```ts
import { Router } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import prisma from "../db.ts";
import { sendMail } from "../mail.ts";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const email = String(req.body.email ?? "").trim().toLowerCase();
    const password = String(req.body.password ?? "");
    const name = String(req.body.name ?? "").trim();

    if (!email || password.length < 8) {
      return res.status(400).json({ error: "email and password (min 8) required" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: "email already registered" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, passwordHash, name: name || null },
    });

    const token = crypto.randomBytes(32).toString("hex");
    await prisma.emailToken.create({
      data: {
        token,
        purpose: "verify",
        expiresAt: new Date(Date.now() + 864e5),
        userId: user.id,
      },
    });

    await sendMail({
      to: email,
      subject: "Verify your account",
      text: `${process.env.APP_URL}/auth/verify?token=${token}`,
    });

    res.status(201).json({
      user: { id: user.id, email: user.email, name: user.name, isVerified: user.isVerified },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "register failed" });
  }
});

export default router;
```

Walk the happy path once. Then show a duplicate email — the club already knows that person.

**Sandbox:** the `to` address must already be a verified **email** identity. Register as `sreecharan309@gmail.com` or `o210008@rguktong.ac.in`. Anyone else: they verify that inbox first (slide 12). Next: one helper for every letter.
