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

# token from MailDev or:
psql "$DATABASE_URL" -c \
  "SELECT token FROM email_tokens WHERE purpose='verify' ORDER BY id DESC LIMIT 1;"

curl -s "http://localhost:4000/auth/verify?token=TOKEN"

TOKEN=$(curl -s -X POST http://localhost:4000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"you@example.com","password":"password123"}' | jq -r .token)

curl -s http://localhost:4000/me -H "Authorization: Bearer $TOKEN"

curl -s -X POST http://localhost:4000/chat \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"question":"When is the next workshop?"}'
```

`/me` returning the user is the auth milestone.
