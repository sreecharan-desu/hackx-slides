---
title: "4. Install tools (once)"
order: 4
---

# Install tools (once)

### Check Node + npm

```bash
node -v
npm -v
```

Need **Node 20+**. If missing:

```bash
# macOS (Homebrew)
brew install node

# Ubuntu
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Check PostgreSQL

```bash
psql --version
```

If missing (Ubuntu):

```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

macOS:

```bash
brew install postgresql@16
brew services start postgresql@16
```

### Sources

- [Node.js downloads](https://nodejs.org/)
- [PostgreSQL install](https://www.postgresql.org/download/)
