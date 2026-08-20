---
title: "32. Failure modes"
order: 32
---

# Failure modes

| Mistake | Fix |
| --- | --- |
| `.env` in git | gitignore + rotate secrets |
| Plaintext passwords | bcrypt only |
| Bind `127.0.0.1` | listen `0.0.0.0` |
| Wrong DynamoDB region | match `AWS_REGION` to tables |
| SES From unverified | verify identity first |
| SG missing 80 / 443 / 22 | open what you need |
| Idle EC2 + Elastic IP + tables | run teardown before you leave |
