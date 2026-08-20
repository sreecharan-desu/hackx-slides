---
title: "25. API Contract"
order: 25
---

# API Contract

```http
POST /ask
```

```json
{
  "question": "..."
}
```

**Response**

```json
{
  "answer": "...",
  "sources": [...]
}
```

Problem statement requires this contract and port `8080`.

If the frontend expects one structure and the backend returns another, **the system breaks**.
