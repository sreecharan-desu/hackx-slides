---
title: "32. Failure modes"
order: 32
---

# Failure modes

Live demos almost never die on clever algorithms. They die on config. Here's the usual cast.

| What goes wrong | What you do |
| --- | --- |
| `.env` in git | gitignore it, rotate secrets |
| Missing `DATABASE_URL` | paste Neon string with `sslmode=require` |
| Forgot `prisma generate` | run it after install on the server |
| Plaintext passwords | bcrypt. always. |
| Bound to `127.0.0.1` | listen on `0.0.0.0` |
| SES From unverified | verify the identity first |
| Idle EC2 + Elastic IP | teardown before you leave the room |
