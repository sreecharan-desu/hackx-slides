---
title: "3. Our architecture (your piece)"
order: 3
---

# Our architecture (your piece)

```text
Client
  │
  │  POST /auth/register
  │  POST /auth/login
  │  GET  /me
  │  POST /auth/forgot-password
  │  POST /auth/reset-password
  │  POST /chat          (forward to RAG later)
  ▼
┌─────────────────────────┐
│   Express (Node.js)     │
│   port 4000 (local)     │
│   port 8080 (event /ask)│
└───────────┬─────────────┘
            │
            ▼
      PostgreSQL
   (users, tokens, ...)
```

### Folders we will create

```text
club-portal-backend/
├── src/
│   ├── server.js
│   ├── db.js
│   ├── middleware/
│   │   └── auth.js
│   └── routes/
│       ├── auth.js
│       └── me.js
├── .env
├── .gitignore
└── package.json
```

Keep it small. Understanding > fancy folders.
