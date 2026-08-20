---
title: "9. Email Verification"
order: 9
---

# Email Verification

```text
User registers
      ↓
Generate verification token
      ↓
Send email
      ↓
User clicks link
      ↓
Account verified
```

### Local development

```text
Node.js
  ↓
Nodemailer
  ↓
Email provider
```

### Production

```text
Backend
  ↓
AWS SES
  ↓
User email
```

`SES` is not mandatory — this is simply how the same architecture can move to AWS.
