---
title: "30. Against the brief"
order: 30
---

# Against the brief

| 70% requirement | Mechanism |
| --- | --- |
| Sign up / login | auth routes + DynamoDB |
| Session identity | `GET /me` |
| Forgot password | SES + token item |
| Members-only chat | `requireAuth` |
| No secret logging | discipline |

| 30% coordination | Note |
| --- | --- |
| `POST /ask` | top-level `answer` + `sources` |
| Port `8080` | bind `0.0.0.0` |
| Grounding | RAG owns the text |
