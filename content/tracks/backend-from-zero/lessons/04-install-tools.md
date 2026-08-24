---
title: "4. Tooling"
order: 4
---

# Tooling

We're setting up two tools: **Node** (runs our API) and the **AWS CLI** (a program you type commands into, instead of clicking the website). No local Postgres — Neon hosts that.

Open **Terminal**. Type each command, then press **Enter**. If it prints a version number, it worked.

```bash
node -v    # want 20 or higher, e.g. v20.11.0
npm -v
aws --version
```

If `aws` says `command not found`, install it first:

```bash
# macOS
brew install node awscli

# Ubuntu
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
# then: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
```

---

## 1. Create keys in the AWS website

The CLI needs a **username + password for machines**. AWS calls these **Access key ID** and **Secret access key**.

1. Browser: [https://console.aws.amazon.com](https://console.aws.amazon.com) → sign in
2. Top search → type `IAM` → click **IAM**
3. Left: **Users** → **Create user**
   - User name: `club-portal-cli`
   - Next → attach policy **AdministratorAccess** (workshop only)
   - Create user
4. Click the user → tab **Security credentials** → **Create access key**
5. Choose **Command Line Interface (CLI)** → tick the confirmation → **Next** → **Create access key**
6. You now see two values. Copy both into a notes app **on your machine**:
   - **Access key ID** — starts with `AKIA…`
   - **Secret access key** — long random string, shown **once**

Don't screenshot this. Don't paste it in Discord or git.

---

## 2. Save those keys on your laptop

In Terminal, type this and press Enter:

```bash
aws configure
```

It will ask **four questions**, one at a time. Type your answer, then **Enter**.

If you see something in `[square brackets]`, that is the **old** value. **Do not press Enter** to keep a bad old value. Type the new answer over it.

| It asks | You type | Notes |
| --- | --- | --- |
| `AWS Access Key ID` | your `AKIA…` key | paste, then Enter |
| `AWS Secret Access Key` | your secret | paste, then Enter (it may look empty — that's ok) |
| `Default region name` | `ap-south-1` | Mumbai. **Not** `NEW_REGION`. **Not** `NEW_REGION` with extra spaces. |
| `Default output format` | `json` | lowercase `json` |

**Worked example** (your keys will be different):

```text
AWS Access Key ID [****************ogin]: AKIAEXAMPLE123456789
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [NEW_REGION]: ap-south-1
Default output format [None]: json
```

On the region line, if it already says `[NEW_REGION]`, type `ap-south-1` anyway, then Enter.

---

## 3. If you already ran configure and it failed

This error:

```text
aws: [ERROR]: Provided region_name 'NEW_REGION' doesn't match a supported format.
```

means the CLI saved the fake region `NEW_REGION`. Fix it by running `aws configure` **again** and answering **only** the region correctly:

1. `aws configure`
2. Access Key → **Enter** (keep existing)
3. Secret → **Enter** (keep existing)
4. Default region name → type `ap-south-1` → Enter
5. Output format → type `json` → Enter

Or open the config file and edit it:

```bash
nano ~/.aws/config
```

It should look **exactly** like this (not `NEW_REGION`):

```ini
[default]
region = ap-south-1
output = json
```

Save: `Ctrl+O`, Enter, then `Ctrl+X`.

Other valid regions: `us-east-1`, `ap-south-1`, `eu-west-1`. It must look like `xx-xxxx-n` — never a made-up word.

---

## 4. Check it worked

```bash
aws sts get-caller-identity
```

Success looks like:

```json
{
    "UserId": "AIDA…",
    "Account": "123456789012",
    "Arn": "arn:aws:iam::123456789012:user/club-portal-cli"
}
```

If you still get the `NEW_REGION` error, you didn't save the region yet. Repeat step 3.

We'll use this same CLI later to launch / tear down EC2. Stay in **one** region (`ap-south-1`) for the whole workshop.
