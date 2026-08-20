---
title: "6. First process"
order: 6
---

# First process

```bash
mkdir -p src
touch src/server.js .env .gitignore
```

`.gitignore`

```text
node_modules/
.env
```

`.env`

```bash
PORT=4000
AWS_REGION=ap-south-1
USERS_TABLE=club-portal-users
TOKENS_TABLE=club-portal-tokens
JWT_SECRET=replace-with-long-random
APP_URL=http://localhost:4000
SMTP_HOST=localhost
SMTP_PORT=1025
MAIL_FROM="Club Portal <noreply@club.local>"
```

`src/server.js`

```js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.listen(process.env.PORT || 4000, "0.0.0.0", () => {
  console.log("listening");
});
```

```json
{ "scripts": { "dev": "nodemon src/server.js", "start": "node src/server.js" } }
```

```bash
npm run dev
curl http://localhost:4000/health
```
