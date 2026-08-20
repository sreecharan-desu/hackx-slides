---
title: "20. Full curl demo script"
order: 20
---

# Full curl demo script

Run these **in order**. Copy-paste.

```bash
# 1) health
curl -s http://localhost:4000/health | jq

# 2) register
curl -s -X POST http://localhost:4000/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"email":"you@example.com","password":"password123","name":"You"}' | jq

# 3) get verify token from DB (or MailDev)
psql "$DATABASE_URL" -c "SELECT token FROM email_tokens WHERE purpose='verify' ORDER BY id DESC LIMIT 1;"

# 4) verify
curl -s "http://localhost:4000/auth/verify?token=PASTE_TOKEN" | jq

# 5) login
TOKEN=$(curl -s -X POST http://localhost:4000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"you@example.com","password":"password123"}' | jq -r .token)
echo "$TOKEN"

# 6) /me
curl -s http://localhost:4000/me \
  -H "Authorization: Bearer $TOKEN" | jq

# 7) chat (members only)
curl -s -X POST http://localhost:4000/chat \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"question":"When is the next workshop?"}' | jq

# 8) forgot password
curl -s -X POST http://localhost:4000/auth/forgot-password \
  -H 'Content-Type: application/json' \
  -d '{"email":"you@example.com"}' | jq
```

### Install jq (pretty JSON)

```bash
# macOS
brew install jq
# Ubuntu
sudo apt install -y jq
```

If `/me` works with the token — **auth is done**.
