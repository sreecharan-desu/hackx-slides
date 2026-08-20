---
title: "8. Database client"
order: 8
---

# Database client

`src/db.js`

```js
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function query(text, params) {
  return pool.query(text, params);
}

module.exports = { pool, query };
```

Smoke check on `server.js`:

```js
const { query } = require("./db");

app.get("/db-check", async (_req, res) => {
  const { rows } = await query("SELECT NOW() AS now");
  res.json({ ok: true, now: rows[0].now });
});
```

```bash
curl http://localhost:4000/db-check
```

If this responds, the API can read durable state.
