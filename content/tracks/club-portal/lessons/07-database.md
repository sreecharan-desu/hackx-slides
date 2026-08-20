---
title: "7. Database"
order: 7
---

# Database

**Why do we need a database?**

We need persistent data for:

- Users
- Authentication
- Profiles
- Password-reset tokens
- Documents
- Chat history, if implemented

```text
Application
      ↓
Database
      ↓
Persistent data
```

A variable disappears when the server restarts.

**A database doesn't.**
