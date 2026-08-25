---
title: "20. Walk someone through the door"
order: 20
---

# Do this live, don't skip hops

Sandbox only delivers to verified emails. From = Gmail. New user = college mailbox. If `/me` returns the person, you're done with auth.

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

Same dance with `sreecharan309@gmail.com` if that's the inbox you're staring at. Don't skip steps to save time. You'll just debug the skip.

**Live (we ran this).** Same Neon. Same password `password123`. After Actions wrote `.env`:

1. Register college inbox → 201, mail, click verify (`GET /auth/verify?token=`)
2. Login → `/me` `isVerified: true` → `/chat` and `/ask` 200 stubs
3. Forgot → copy token from mail (reset URL may 404) → `POST /auth/reset-password` 200 → token reuse 400 → login 200

`curl --resolve api.sreecharandesu.in:443:43.204.238.87` if the ISP DNS is drunk.
