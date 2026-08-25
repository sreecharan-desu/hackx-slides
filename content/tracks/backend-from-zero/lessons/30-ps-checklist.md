---
title: "30. Can you demo the brief?"
order: 30
---

# Can you demo the brief?

We already did this on `https://api.sreecharandesu.in` after club secrets landed in Actions.

| They asked | You show |
| --- | --- |
| Signup / login | register 201 → verify → login 200 |
| Who's logged in | `GET /me` verified |
| Forgot password | SES + `POST /auth/reset-password` (copy token; URL is not a page) |
| Members chat | `POST /chat` 200 stub, 401 without JWT |
| Event `/ask` | same stub, `answer` + `sources` |
| Don't log secrets | `.env` gitignored. Actions writes it |

Health `shipped: "v3"` only proves the new build. Login 401 on a fake user proves Neon.
