---
title: "32. Failure modes"
order: 32
---

# Failure modes

Most live demos die on config, not on algorithms.

| Mistake | Fix |
| --- | --- |
| `.env` in git | gitignore + rotate secrets |
| Missing `DATABASE_URL` | paste Neon string, `sslmode=require` |
| Forgot `prisma generate` | run after install on the server |
| Plaintext passwords | bcrypt only |
| Bind `127.0.0.1` | listen `0.0.0.0` |
| SES From unverified | verify identity first |
| Idle EC2 + Elastic IP | run teardown before you leave |
