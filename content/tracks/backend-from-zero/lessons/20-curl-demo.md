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

**Live API is not this.** After Nginx/HTTPS, `POST https://api.sreecharandesu.in/auth/register` only hits Neon if EC2 has `.env` with `DATABASE_URL`. We tried it without that file: `500 register failed` / `500 login failed`. Laptop still had the users. Two machines, two env files, one Neon project — but the box has to be told the URL.
