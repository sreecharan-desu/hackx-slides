---
title: "1. Scope"
order: 1
---

# Scope

Today we build the **API only** — auth, identity, mail, and deploy.

```mermaid
flowchart TB
  FE[Frontend]
  API[Express API · this session]
  DB[(Postgres · Neon)]
  SES[Amazon SES]
  RAG[RAG service]

  FE --> API
  API --> DB
  API --> SES
  API --> RAG
```

| Portal requirement | On the API |
| --- | --- |
| Sign up / login | Auth routes |
| Forgot password | Token + SES |
| Members-only chat | Auth middleware |
| Who is logged in | `GET /me` |

| Demo bar | What we still ship |
| --- | --- |
| Local demo | Enough for the brief |
| Live AWS | Bonus — EC2 + domain so the story is lived |
