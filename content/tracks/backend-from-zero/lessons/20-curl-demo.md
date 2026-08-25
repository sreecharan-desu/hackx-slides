---
title: "20. Verification script"
order: 20
---

# Verification script

Run this live with the room. Sandbox only delivers to **verified email identities** — no domain required. This account can use Gmail or the college mailbox.

If `/me` comes back with the user, auth is done — that's the milestone.

```bash
curl -s http://localhost:4000/health

# MAIL_FROM is Gmail; To can be the other verified identity
curl -s -X POST http://localhost:4000/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"email":"o210008@rguktong.ac.in","password":"password123","name":"Sreecharan"}'

# open Spam on o210008@rguktong.ac.in — subject "Verify your account"
# body looks like: http://localhost:4000/auth/verify?token=HEX...
# copy HEX only; do not click localhost in webmail

curl -s "http://localhost:4000/auth/verify?token=HEX"

TOKEN=$(curl -s -X POST http://localhost:4000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"o210008@rguktong.ac.in","password":"password123"}' | jq -r .token)

curl -s http://localhost:4000/me -H "Authorization: Bearer $TOKEN"
```

Same script with `sreecharan309@gmail.com` if that's the inbox you're watching.

Don't skip steps to "save time." The whole point is watching each hop succeed.
