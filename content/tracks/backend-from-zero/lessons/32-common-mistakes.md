---
title: "32. Common mistakes"
order: 32
---

# Common mistakes

- Committing `.env` to GitHub
- Storing plain text passwords
- Binding only `127.0.0.1` (event judges can't reach you)
- Forgetting `0.0.0.0` for `/ask` on 8080
- Logging tokens / passwords
- Pointing DNS at a changing public IP (use Elastic IP)
- Security group blocks 80/443/22
- `JWT_SECRET` left as `change-me` in production
- Explaining Cognito in pitch but never explaining **your** real Express auth

### Fix mindset

```text
If it fails: read the error → fix one thing → retest with curl
```
