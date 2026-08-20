---
title: "6. First Express server"
order: 6
---

# First Express server

### Create files

```bash
mkdir -p src
touch src/server.js .env .gitignore
```

### `.gitignore` (copy-paste)

```text
node_modules/
.env
.DS_Store
```

### `.env` (copy-paste)

```bash
PORT=4000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/club_portal
JWT_SECRET=change-me-to-a-long-random-string
APP_URL=http://localhost:4000
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_USER=
SMTP_PASS=
MAIL_FROM="Club Portal <noreply@club.local>"
```

### `src/server.js` (copy-paste)

```js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true, message: "backend is alive" });
});

const port = process.env.PORT || 4000;
app.listen(port, "0.0.0.0", () => {
  console.log(`API listening on http://0.0.0.0:${port}`);
});
```

### package.json scripts

```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js"
  }
}
```

### Run it

```bash
npm run dev
```

### Test

```bash
curl http://localhost:4000/health
```

Expected:

```json
{"ok":true,"message":"backend is alive"}
```

### Sources

- [Express Hello world](https://expressjs.com/en/starter/hello-world.html)
- [dotenv](https://github.com/motdotla/dotenv)
