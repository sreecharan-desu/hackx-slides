---
title: "7. PostgreSQL — the notebook"
order: 7
---

# PostgreSQL — the notebook

### Why a database?

```text
Variable in Node  →  dies when server restarts
Row in Postgres   →  still there tomorrow
```

We need to remember:

- users (email + hashed password)
- email verify tokens
- password reset tokens

### Create database (copy-paste)

```bash
# Ubuntu default user is often "postgres"
sudo -u postgres psql
```

Inside `psql`:

```sql
CREATE USER club WITH PASSWORD 'clubpass' CREATEDB;
CREATE DATABASE club_portal OWNER club;
\q
```

Update `.env`:

```bash
DATABASE_URL=postgresql://club:clubpass@localhost:5432/club_portal
```

### Create tables

```bash
psql "$DATABASE_URL"
```

```sql
CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name          TEXT,
  is_verified   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE email_tokens (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token      TEXT UNIQUE NOT NULL,
  purpose    TEXT NOT NULL CHECK (purpose IN ('verify', 'reset')),
  expires_at TIMESTAMPTZ NOT NULL,
  used_at    TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

```sql
\dt
\q
```

### Sources

- [PostgreSQL tutorial](https://www.postgresqltutorial.com/)
- [node-postgres (pg)](https://node-postgres.com/)
