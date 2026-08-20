---
title: "30. PS checklist — your slice"
order: 30
---

# PS checklist — your slice

### 70% — backend responsibility

| Item | Done when |
| --- | --- |
| Sign up | `POST /auth/register` |
| Login | `POST /auth/login` → JWT |
| Who am I | `GET /me` |
| Forgot password | email reset link (Nodemailer local → **Amazon SES** prod) |
| Real email path | SES verified identity + SMTP creds |
| Members-only chat | `requireAuth` on `/chat` |
| No password logging | never `console.log(password)` |
| AWS explanation | pitch slide 28 |

### 30% — coordinate with Anand/Mohan

| Item | Your touch |
| --- | --- |
| `POST /ask` exact JSON | mount route, bind `0.0.0.0:8080` |
| Port 8080 | event Wi‑Fi evaluator |
| Auth still required for UI chat | keep middleware |

### Fallback (RAG / Anand — know the text)

```text
I could not find that in the club documents. Please
contact Shanmukha Sasi Sadineni, AWS Student Builder
Group Leader, at sadinenisasi@gmail.com or
7396025334.
```

### Safety

- Answer only from club documents (RAG)
- Never invent AWS pricing/limits
- Never log private student data
