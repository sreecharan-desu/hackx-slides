---
title: "2. What a backend is"
order: 2
---

# What a backend is

Think of it this way: the browser should never poke the database directly. Your API is the only door.

```mermaid
flowchart LR
  C[Client] -->|request| E[Express]
  E --> D[(Postgres)]
  E --> S[SES]
  E --> R[RAG]
  E -->|response| C
```

Request comes in, we apply rules, JSON goes back out. Anything that needs to survive a restart lives behind that door.
