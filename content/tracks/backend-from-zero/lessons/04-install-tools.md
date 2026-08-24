---
title: "4. Tooling"
order: 4
---

# Tooling

Before we touch code, make sure your laptop can run Node and talk to AWS. You don't need Postgres installed locally — Neon handles that.

```bash
node -v    # 20+
npm -v
aws --version
```

```bash
# macOS
brew install node awscli

# Ubuntu
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

The CLI talks to AWS as *you*. `aws configure` asks for four things — here's where they come from.

### Create an access key (IAM, not root)

1. Sign in at [https://console.aws.amazon.com](https://console.aws.amazon.com)
2. Search bar → **IAM** → open **IAM**
3. Left sidebar → **Users** → **Create user**
   - Name: `club-portal-cli`
   - Permissions: attach **AdministratorAccess** for this workshop (tighten later)
4. Open the user → **Security credentials** → **Access keys** → **Create access key**
5. Use case: **Command Line Interface (CLI)** → confirm → **Create**
6. Copy **Access key ID** and **Secret access key** now — the secret is shown **once**

Never paste these into git, Discord, or a screenshot.

### Run `aws configure`

```bash
aws configure
```

| Prompt | What you type | Example |
| --- | --- | --- |
| AWS Access Key ID | the key from IAM | `AKIA…` |
| AWS Secret Access Key | the secret from IAM | long random string |
| Default region name | a **real** region code | `ap-south-1` (Mumbai) |
| Default output format | how CLI prints JSON | `json` |

If your prompt already shows `[NEW_REGION]`, that's leftover junk. Type `ap-south-1` over it (or `us-east-1` if that's the region you'll use for EC2).

```bash
aws sts get-caller-identity
```

If that prints your account id and the IAM user, you're configured. We'll use this same CLI later for teardown.
