---
title: "20. Walk someone through the door"
order: 20
---

# Walk someone through the door

Do this live. Sandbox only delivers to **verified emails**. This account can use Gmail as From and the college mailbox as the new member.

If `/me` comes back with the person, the auth story is done.

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

Same walk with `sreecharan309@gmail.com` if that's the inbox on screen. Don't skip hops to "save time." Next: get the TypeScript off the laptop.
