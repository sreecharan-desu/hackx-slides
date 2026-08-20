---
title: "11. Backend API Design"
order: 11
---

# Backend API Design

```text
POST /auth/register
POST /auth/login
POST /auth/verify
POST /auth/forgot-password
POST /auth/reset-password
GET  /profile
POST /chat
```

The frontend should not know how authentication or databases work.

**It only talks to APIs.**
