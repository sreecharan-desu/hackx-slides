---
title: "8. Connect Express → Postgres"
order: 8
---

# Connect Express → Postgres

### `src/db.js` (copy-paste)

```js
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("error", (err) => {
  console.error("Unexpected PG error", err);
});

async function query(text, params) {
  return pool.query(text, params);
}

module.exports = { pool, query };
```

### Test route — add to `src/server.js`

```js
const { query } = require("./db");

app.get("/db-check", async (req, res) => {
  try {
    const result = await query("SELECT NOW() as now");
    res.json({ ok: true, now: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "db down" });
  }
});
```

### Test

```bash
curl http://localhost:4000/db-check
```

If this works: **waiter can read the notebook**.

### Sources

- [node-postgres Pool](https://node-postgres.com/features/pooling)
