---
title: "5. Bootstrap"
order: 5
---

# Bootstrap

```bash
mkdir club-portal-backend && cd club-portal-backend
npm init -y
npm install express dotenv cors bcrypt jsonwebtoken nodemailer \
  @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
npm install -D nodemon
```

| Package | Role |
| --- | --- |
| express | HTTP |
| dotenv | config |
| bcrypt / jsonwebtoken | auth |
| nodemailer | mail |
| `@aws-sdk/client-dynamodb` | DynamoDB control plane |
| `@aws-sdk/lib-dynamodb` | document reads/writes |

No raw SQL. No `pg`. Access goes through a typed `db` module — Prisma-shaped call sites on a DynamoDB engine.
