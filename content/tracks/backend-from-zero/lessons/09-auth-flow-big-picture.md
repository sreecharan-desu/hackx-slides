---
title: "9. Auth model"
order: 9
---

# Auth model

The brief says email + password is enough. So that's what we're building — no Google login rabbit hole.

```mermaid
flowchart TB
  R[Register] --> H[bcrypt hash]
  H --> U[(Postgres · User)]
  U --> M[SES verify mail]
  M --> V[Verify token]
  V --> L[Login]
  L --> J[JWT]
  J --> ME[GET /me]
```

Quick vocab while we're here: **authentication** is "who are you?", **authorization** is "are you allowed?" Chat is the second one.
