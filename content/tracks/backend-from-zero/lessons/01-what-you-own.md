---
title: "1. Scope"
order: 1
---

# Scope

The API layer. Nothing else.

```mermaid
flowchart TB
  FE["Frontend · Mohan"]
  API["Express API · this session"]
  DDB["DynamoDB"]
  SES["Amazon SES"]
  RAG["RAG · Anand"]

  FE --> API
  API --> DDB
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
