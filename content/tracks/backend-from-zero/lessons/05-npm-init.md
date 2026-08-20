---
title: "5. npm init — start the project"
order: 5
---

# npm init — start the project

```bash
mkdir club-portal-backend
cd club-portal-backend
npm init -y
```

### What just happened? (5-year-old version)

`package.json` is a **shopping list** for your app.

- name of the project
- scripts (`npm start`)
- dependencies (packages you install)

### Install packages (copy-paste)

```bash
npm install express dotenv cors bcrypt jsonwebtoken pg nodemailer
npm install -D nodemon
```

| Package | Why |
| --- | --- |
| `express` | The waiter (HTTP server) |
| `dotenv` | Secrets from `.env` file |
| `cors` | Let frontend call us |
| `bcrypt` | Hash passwords |
| `jsonwebtoken` | Login tickets (JWT) |
| `pg` | Talk to PostgreSQL |
| `nodemailer` | Send reset emails (PS allows this) |
| `nodemon` | Auto-restart while coding |

### Sources

- [npm docs: package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
- [Express installing](https://expressjs.com/en/starter/installing.html)
