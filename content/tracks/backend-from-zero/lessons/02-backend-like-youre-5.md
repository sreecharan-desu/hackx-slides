---
title: "2. What a backend is"
order: 2
---

# What a backend is

A process that accepts HTTP, applies rules, and returns JSON.

```text
Client
  │  request
  ▼
Express
  │  read / write / call out
  ▼
Postgres · SES · RAG
  │
  ▼
response
```

The browser never touches the database.  
The API is the only door.
