---
title: "14. Login"
order: 14
---

# Login

```js
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    const { rows } = await query("SELECT * FROM users WHERE email = $1", [email]);
    if (!rows.length) return res.status(401).json({ error: "invalid credentials" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: "invalid credentials" });
    if (!user.is_verified) return res.status(403).json({ error: "email not verified" });

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      process.env.JWT_SECRET,
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

Identical error for bad email and bad password.  
Never log the password. Never return the hash.
