---
title: "5. Bootstrap"
order: 5
---

# Bootstrap

```bash
mkdir club-portal-backend && cd club-portal-backend
npm init -y
npm install express dotenv cors bcrypt jsonwebtoken pg nodemailer
npm install -D nodemon
```

| Package | Role |
| --- | --- |
| express | HTTP |
| dotenv | config |
| cors | browser access |
| bcrypt | password hashes |
| jsonwebtoken | session tickets |
| pg | Postgres client |
| nodemailer | outbound mail |
| nodemon | local reload |

`package.json` is the contract for dependencies and scripts. Nothing mystical.
