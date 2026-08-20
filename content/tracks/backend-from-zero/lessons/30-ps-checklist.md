---
title: "30. Against the brief"
order: 30
---

# Against the brief

**70%**

| Requirement | Endpoint / mechanism |
| --- | --- |
| Sign up | `POST /auth/register` |
| Login | `POST /auth/login` |
| Session identity | `GET /me` |
| Forgot password | SES-backed reset |
| Members-only chat | `requireAuth` |
| No secret logging | discipline |

**30% coordination**

| Requirement | Note |
| --- | --- |
| `POST /ask` | exact top-level `answer` + `sources` |
| Port `8080` | bind `0.0.0.0` |
| Grounding / fallback | RAG owns the text |

Campus fallback when retrieval fails — from `01-onboarding-faq.md`, not invented.
