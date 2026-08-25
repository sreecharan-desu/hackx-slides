---
title: "4. Two programs, one region"
order: 4
---

# Two programs, one region

Before we write club code, we need two voices:

- **Node** — runs the door on your laptop (and later on Ubuntu).
- **AWS CLI** — talks to Amazon as a robot, not as clicks in the console.

We are **not** installing Postgres locally. Memory lives in Neon. Mail and the later server live in **Mumbai (`ap-south-1`)** — pick one region and stay there all day.

Open Terminal. Versions mean you're ready:

```bash
node -v    # 20 or higher
npm -v
aws --version
```

Missing `aws`?

```bash
# macOS
brew install node awscli

# Ubuntu laptop
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

AWS CLI install: [docs.aws.amazon.com — getting started](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

---

## A robot user, not your human login

The website password is for you. The CLI wants a **machine pair**: Access key ID + Secret. We create a throwaway workshop user named `club-portal-cli`.

1. [console.aws.amazon.com](https://console.aws.amazon.com) → search **IAM**
2. **Users** → **Create user** → `club-portal-cli` → attach **AdministratorAccess** (workshop only)
3. User → **Security credentials** → **Create access key**
4. Use case: **Command Line Interface (CLI)** — tick the box → **Create**
5. Copy both values into a notes app **on this machine**. Shown once. Not Discord. Not git.

---

## Teach the laptop those keys

```bash
aws configure
```

Four questions. Type over anything in `[square brackets]`.

| It asks | You type |
| --- | --- |
| Access Key ID | `AKIA…` |
| Secret | the long one (the cursor may look empty) |
| Region | `ap-south-1` — **never** `NEW_REGION`, never `Global` |
| Output | `json` |

IAM users are global. EC2 and SES are not. `aws configure` wants a **region code**.

If you already saved `NEW_REGION`, run `aws configure` again and only fix the region, or edit `~/.aws/config` to `region = ap-south-1`.

Proof:

```bash
aws sts get-caller-identity
```

You want an Arn ending in `user/club-portal-cli`. Same keys will send mail later. Next we open an empty folder and invite the packages.
