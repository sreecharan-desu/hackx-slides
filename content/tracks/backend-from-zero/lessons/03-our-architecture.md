---
title: "3. Shape of the service"
order: 3
---

# Shape of the service

```mermaid
flowchart TB
  subgraph routes [HTTP surface]
    R1[POST /auth/register]
    R2[POST /auth/login]
    R3[GET /auth/verify]
    R4[POST /auth/forgot-password]
    R5[POST /auth/reset-password]
    R6[GET /me]
    R7[POST /chat]
  end

  subgraph src [src/]
    S[server.js]
    DB[db.js]
    M[mail.js]
    A[middleware/auth.js]
    RA[routes/auth.js]
    RM[routes/me.js]
    RC[routes/chat.js]
  end

  routes --> S
  S --> RA & RM & RC
  RA & RM --> A
  RA & RM & RC --> DB
  RA --> M
```

```text
club-portal-backend/
├── src/
│   ├── server.js
│   ├── db.js          # typed data access
│   ├── mail.js
│   ├── middleware/auth.js
│   └── routes/
├── .env
└── package.json
```
