---
title: "3. Shape of the service"
order: 3
---

# Shape of the service

```text
POST /auth/register
POST /auth/login
GET  /auth/verify
POST /auth/forgot-password
POST /auth/reset-password
GET  /me
POST /chat
```

```text
club-portal-backend/
├── src/
│   ├── server.js
│   ├── db.js
│   ├── mail.js
│   ├── middleware/auth.js
│   └── routes/
│       ├── auth.js
│       ├── me.js
│       └── chat.js
├── .env
└── package.json
```

Small surface. Clear ownership. Easy to hand to frontend.
