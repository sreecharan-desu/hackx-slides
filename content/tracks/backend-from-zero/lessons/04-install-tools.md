---
title: "4. Tooling"
order: 4
---

# Tooling

```bash
node -v    # 20+
npm -v
psql --version
```

```bash
# macOS
brew install node postgresql@16
brew services start postgresql@16

# Ubuntu
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs postgresql postgresql-contrib
sudo systemctl enable --now postgresql
```

Node runs the API. Postgres holds durable state.
