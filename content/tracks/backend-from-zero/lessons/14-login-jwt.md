---
title: "14. Login — issue JWT"
order: 14
---

# Login — issue JWT

JWT = a **signed ticket** the server trusts.

```text
Login success → give ticket → client shows ticket on every request
```

Add to `src/routes/auth.js`:

```js
router.post("/login", async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    const found = await query("SELECT * FROM users WHERE email = $1", [email]);
    if (!found.rows.length) {
      return res.status(401).json({ error: "invalid email or password" });
    }

    const user = found.rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ error: "invalid email or password" });
    }

    if (!user.is_verified) {
      return res.status(403).json({ error: "verify your email first" });
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        is_verified: user.is_verified,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "login failed" });
  }
});
```

### Security habits

- Same error for bad email / bad password (don't leak which is wrong)
- Never log `password`
- Never return `password_hash`

### Sources

- [jwt.io introduction](https://jwt.io/introduction)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
