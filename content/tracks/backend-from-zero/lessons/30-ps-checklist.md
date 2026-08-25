---
title: "30. Can you show what they asked for?"
order: 30
---

# Can you show what they asked for?

When someone reviews your project, this is the checklist. You run the curls. You explain the JSON.

| They asked | You show |
| --- | --- |
| Signup / login | register → verify mail → login |
| Who's logged in | `GET /me` |
| Forgot password | SES + `POST /auth/reset-password` (copy token; the mail URL is not a page) |
| Members chat | `POST /chat` with JWT; 401 without |
| Event `/ask` | same stub: `answer` + `sources` |
| Secrets | `.env` not in git. Actions writes the live file |

`GET /health` with `shipped: "v3"` only proves a new **process**. A fake login returning **401** proves Neon is actually reachable.
