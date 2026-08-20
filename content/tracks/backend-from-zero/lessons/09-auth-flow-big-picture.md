---
title: "9. Auth model"
order: 9
---

# Auth model

Email + password only — matches the problem statement. No social login.

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

Authentication answers *who you are*. Authorization answers *what you’re allowed to do* — chat is the latter.
