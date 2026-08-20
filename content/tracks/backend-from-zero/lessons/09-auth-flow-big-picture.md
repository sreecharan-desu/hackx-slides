---
title: "9. Auth model"
order: 9
---

# Auth model

Email + password. No social providers. Matches the brief.

```text
register → hash → store → verify mail → login → JWT → /me
```

```text
REGISTER
  bcrypt(password)
  user.is_verified = false
  email token (24h)

LOGIN
  bcrypt.compare
  jwt.sign({ sub, email })

REQUEST
  Authorization: Bearer <token>

GET /me
  resolve user from token
  never return password_hash
```

Authentication answers *who*.  
Authorization answers *allowed*. Chat is the latter.
