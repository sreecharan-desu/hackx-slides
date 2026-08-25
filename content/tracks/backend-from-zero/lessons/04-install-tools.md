---
title: "4. Node, and a robot on AWS"
order: 4
---

# Node, and a robot on AWS

Two programs before we write real code:

- **Node** — runs our API
- **AWS CLI** — talks to Amazon without clicking around all day

We're not installing Postgres on the laptop. Neon has that. Mail and the later server: stay in **Mumbai (`ap-south-1`)**. Pick one region. Don't wander.

```bash
node -v    # 20+
npm -v
aws --version
```

No `aws`?

```bash
# mac
brew install node awscli

# ubuntu laptop
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

CLI install if brew isn't your thing: [AWS CLI getting started](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

Your console password is for you. The CLI wants a **throwaway IAM user** with an access key.

1. [console.aws.amazon.com](https://console.aws.amazon.com) → **IAM**
2. Create user `club-portal-cli` → **AdministratorAccess** (class shortcut — too wide for a real job later)
3. Security credentials → create access key → use case **CLI**
4. Copy both values into notes on **this** machine. Once. Not Discord. Not a screenshot in the group chat.

```bash
aws configure
```

Four questions. Don't just smash Enter on the `[old junk]` in brackets.

| It asks | Type |
| --- | --- |
| Access key | `AKIA…` |
| Secret | the long one (cursor looks empty, that's normal) |
| Region | `ap-south-1` — not `NEW_REGION`, not `Global` |
| Output | `json` |

IAM is global. SES and EC2 are not. Configure wants a **code** like `ap-south-1`.

If you already saved `NEW_REGION`, run configure again and fix just the region. Or edit `~/.aws/config`.

```bash
aws sts get-caller-identity
```

Arn should end with `user/club-portal-cli`. Laptop: those keys stay in `~/.aws`, not git. Live: the same pair goes in GitHub Actions as `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` so the box can SES without a second `aws configure`.
