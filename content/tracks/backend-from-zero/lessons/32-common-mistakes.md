---
title: "32. Failure modes"
order: 32
---

# Failure modes

- `.env` committed
- plaintext passwords
- listening on `127.0.0.1` when judges need the LAN
- DNS on a mutable public IP
- SG missing 80/443/22
- weak `JWT_SECRET` in production
- SES From address unverified
- pitching Cognito while unable to show working Express auth

Read the error. Change one variable. Retest with curl.
