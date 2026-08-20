---
title: "12. Amazon SES"
order: 12
---

# Amazon SES

```text
Nodemailer  →  SES SMTP  →  inbox
```

1. SES → Identities → verify From address (or domain)
2. SMTP settings → create credentials (save once)
3. Point `.env` at the regional endpoint

```bash
SMTP_HOST=email-smtp.ap-south-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=…          # SES SMTP username
SMTP_PASS=…          # SES SMTP password
MAIL_FROM="Club Portal <verified@address>"
```

Sandbox: send only to verified recipients. Request production access when you need the open internet.

`MAIL_FROM` must match a verified identity. Region of SMTP host must match the SES console region.

| Failure | Likely cause |
| --- | --- |
| MessageRejected | unverified From |
| sandbox block | unverified To |
| auth error | bad SMTP secret / wrong region |
