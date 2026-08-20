---
title: "7. Postgres"
order: 7
---

# Postgres

Process memory dies on restart. The database does not.

```bash
sudo -u postgres psql
```

```sql
CREATE USER club WITH PASSWORD 'clubpass' CREATEDB;
CREATE DATABASE club_portal OWNER club;
\q
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

Users and short-lived tokens. That is the auth data model.
