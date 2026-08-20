---
title: "20. Verification script"
order: 20
---

# Verification script

Run this live with the room. If `/me` comes back with the user, auth is done — that's the milestone.

```bash
curl -s http://localhost:4000/health

curl -s -X POST http://localhost:4000/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"email":"you@example.com","password":"password123","name":"You"}'

# grab the verify token from MailDev / SES

curl -s "http://localhost:4000/auth/verify?token=TOKEN"

TOKEN=$(curl -s -X POST http://localhost:4000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"you@example.com","password":"password123"}' | jq -r .token)

curl -s http://localhost:4000/me -H "Authorization: Bearer $TOKEN"
```

Don't skip steps to "save time." The whole point is watching each hop succeed.
