---
title: "20. Verification script"
order: 20
---

# Verification script

```bash
curl -s http://localhost:4000/health

curl -s -X POST http://localhost:4000/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"email":"you@example.com","password":"password123","name":"You"}'

# token from MailDev / SES inbox

curl -s "http://localhost:4000/auth/verify?token=TOKEN"

TOKEN=$(curl -s -X POST http://localhost:4000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"you@example.com","password":"password123"}' | jq -r .token)

curl -s http://localhost:4000/me -H "Authorization: Bearer $TOKEN"
```

`/me` returning the user is the auth milestone.
