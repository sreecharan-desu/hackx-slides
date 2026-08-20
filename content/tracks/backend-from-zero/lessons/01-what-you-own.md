---
title: "1. Scope"
order: 1
---

# Scope

The API layer. Nothing else.

```text
Frontend ─────────────────────────── Mohan
                │
           Express API ───────────── this session
            /        \
     Postgres      RAG service ───── Anand
```

| Portal requirement | On the API |
| --- | --- |
| Sign up / login | Auth routes |
| Forgot password | Token + SES mail |
| Members-only chat | Auth middleware |
| Who is logged in | `GET /me` |

Local demo satisfies the brief. We still ship to EC2 with a domain — so the AWS story is lived, not recited.
