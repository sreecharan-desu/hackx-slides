---
title: "12. Amazon SES (real email)"
order: 12
---

# Amazon SES (real email)

PS path:

```text
Local prototype  →  Nodemailer + MailDev
Production       →  Amazon SES
```

Same `sendMail()` function. Only `.env` changes.

### 5-year-old version

SES is Amazon’s **post office**.  
You drop a letter (email) at SES. SES delivers it to Gmail/Outlook.

### Step 1 — open SES in your region

AWS Console → **Amazon SES** → Region e.g. `ap-south-1` (Mumbai)

### Step 2 — verify sender identity

**Option A (fastest for workshop):** verify your email

```text
SES → Identities → Create identity → Email address
Enter: your-gmail@gmail.com
Click the link AWS emails you
```

**Option B (real domain):** verify `yourdomain.com` (DKIM) — better for production

### Step 3 — leave sandbox? (know this)

New accounts start in **sandbox**:

- can only send **to verified emails**
- request production access later for any recipient

For demo: verify your own email as both From + To.

### Step 4 — create SMTP credentials

```text
SES → SMTP settings → Create SMTP credentials
→ IAM user gets created
→ DOWNLOAD / COPY username + password  (shown once)
```

SMTP endpoint example:

```text
email-smtp.ap-south-1.amazonaws.com
Port: 587  (STARTTLS)
```

### Step 5 — `.env` for SES (copy-paste)

```bash
# Local (MailDev)
# SMTP_HOST=localhost
# SMTP_PORT=1025
# SMTP_USER=
# SMTP_PASS=

# Production / real SES
SMTP_HOST=email-smtp.ap-south-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=AKIA................    # SMTP username from SES
SMTP_PASS=BJxxxxxxxxxxxxxxxxxxxx  # SMTP password from SES
MAIL_FROM="Club Portal <your-verified@email.com>"
APP_URL=https://api.yourdomain.com
```

`MAIL_FROM` **must** be a verified SES identity.

### Step 6 — same Nodemailer code works

No code change if you already use `src/mail.js` from slide 11.

Optional: force TLS on 587:

```js
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false, // true for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
```

### Step 7 — test send

```bash
# after register or:
node -e "
require('dotenv').config();
const { sendMail } = require('./src/mail');
sendMail({
  to: 'your-verified@email.com',
  subject: 'SES test',
  text: 'Hello from Club Portal via Amazon SES'
}).then(() => console.log('sent')).catch(console.error);
"
```

### IAM note (if using AWS SDK instead of SMTP)

Policy action needed: `ses:SendEmail`, `ses:SendRawEmail`

SMTP credentials way = easiest for Express + Nodemailer.

### Common SES errors

| Error | Meaning |
| --- | --- |
| MessageRejected | From address not verified |
| Sandbox restriction | To address not verified |
| Auth failed | Wrong SMTP user/pass or region mismatch |

### Sources

- [Amazon SES docs](https://docs.aws.amazon.com/ses/)
- [SES SMTP](https://docs.aws.amazon.com/ses/latest/dg/send-email-smtp.html)
- [Verify identity](https://docs.aws.amazon.com/ses/latest/dg/creating-identities.html)
- [Request production access](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html)
- [Nodemailer SMTP](https://nodemailer.com/smtp/)
