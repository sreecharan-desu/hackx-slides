---
title: "30. Against the brief"
order: 30
---

# Against the brief

Before we wrap, line every portal requirement up against something you can literally demo.

| 70% asks for | You show |
| --- | --- |
| Sign up / login | auth routes + Prisma |
| Who's logged in | `GET /me` |
| Forgot password | SES + token row |
| Members-only chat | `requireAuth` |
| No secret logging | you just… don't |

| 30% coordination | Remember |
| --- | --- |
| `POST /ask` | top-level `answer` + `sources` |
| Port `8080` | bind `0.0.0.0` |
| Grounding | RAG owns that text |
