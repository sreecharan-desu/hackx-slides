---
title: "20. Walk someone through the door"
order: 20
---

# Walk the door with us — every hop

Sandbox only delivers to verified emails. From = your Gmail. New member = the other verified inbox. When `/me` returns that person, you finished auth.

```bash
curl -s http://localhost:4000/health

# MAIL_FROM is Gmail; the member is the other verified inbox
curl -s -X POST http://localhost:4000/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"email":"o210008@rguktong.ac.in","password":"password123","name":"Sreecharan"}'

# Spam · subject "Verify your account"
# body: http://localhost:4000/auth/verify?token=HEX...
# copy HEX; don't click localhost in webmail

curl -s "http://localhost:4000/auth/verify?token=HEX"

TOKEN=$(curl -s -X POST http://localhost:4000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"o210008@rguktong.ac.in","password":"password123"}' | jq -r .token)

curl -s http://localhost:4000/me -H "Authorization: Bearer $TOKEN"
```

You can use `sreecharan309@gmail.com` as the member if that is the inbox on your screen. Run every hop. Skipping one hop is how you spend an hour debugging the hop you skipped.

**Same story on the public URL** (after Actions has written `.env` on EC2):

1. Register the college inbox → 201 → open the verify mail (`GET /auth/verify?token=`)
2. Login → `/me` shows `isVerified: true` → `/chat` and `/ask` return the stub
3. Forgot password → copy the token (the reset URL in the browser is often **404**) → `POST /auth/reset-password` → using the token twice is 400 → login again

If your ISP cannot resolve the domain: `curl --resolve api.sreecharandesu.in:443:43.204.238.87 …`
