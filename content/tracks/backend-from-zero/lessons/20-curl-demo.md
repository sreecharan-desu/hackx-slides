---
title: "20. Verification script"
order: 20
---

# Verification script

Run this sequence live. If `/me` returns the user, auth is done.

```bash
curl -s http://localhost:4000/health

curl -s -X POST http://localhost:4000/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"email":"you@example.com","password":"password123","name":"You"}'

# copy verify token from MailDev / SES

curl -s "http://localhost:4000/auth/verify?token=TOKEN"

TOKEN=$(curl -s -X POST http://localhost:4000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"you@example.com","password":"password123"}' | jq -r .token)

curl -s http://localhost:4000/me -H "Authorization: Bearer $TOKEN"
```
