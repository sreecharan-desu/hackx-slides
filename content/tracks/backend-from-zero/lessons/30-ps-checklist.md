---
title: "30. Can you demo the brief?"
order: 30
---

# Can you demo the brief?

| They asked | You show |
| --- | --- |
| Signup / login | those routes + Prisma |
| Who's logged in | `GET /me` |
| Forgot password | SES + a token row |
| Members chat | requireAuth |
| Don't log secrets | just… don't |

| Extra | Remember |
| --- | --- |
| `POST /ask` | `answer` + `sources` |
| Listen on `0.0.0.0` | we already do |
| Grounding | that's RAG's job |
