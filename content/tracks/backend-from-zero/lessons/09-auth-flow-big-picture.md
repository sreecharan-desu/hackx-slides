---
title: "9. Auth flow (big picture)"
order: 9
---

# Auth flow (big picture)

Problem statement: **email + password is enough**. No Google login needed.

```text
REGISTER
  email + password
       ↓
  hash password (bcrypt)
       ↓
  save user (is_verified = false)
       ↓
  create verify token
       ↓
  send email link
       ↓
  user clicks → is_verified = true

LOGIN
  email + password
       ↓
  find user
       ↓
  compare hash
       ↓
  issue JWT
       ↓
  client stores token
       ↓
  later requests send:  Authorization: Bearer <token>

GET /me
  read token
       ↓
  load user from DB
       ↓
  return profile (never password_hash)
```

### Auth vs Authorization (simple)

- **Authentication** = who are you? (login)
- **Authorization** = are you allowed? (members-only chat)

### Sources

- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [bcrypt explained](https://auth0.com/blog/hashing-in-action-understanding-bcrypt/)
