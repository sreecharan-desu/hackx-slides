---
title: "11. Outbound mail"
order: 11
---

# Outbound mail

Local: MailDev. Production: SES. One helper.

```bash
npx maildev   # UI :1080 · SMTP :1025
```

`src/mail.js`

```js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "localhost",
  port: Number(process.env.SMTP_PORT || 1025),
  secure: false,
  auth: process.env.SMTP_USER
    ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    : undefined,
});

async function sendMail({ to, subject, text }) {
  return transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject,
    text,
  });
}

module.exports = { sendMail };
```

Swap hosts in `.env`. Keep call sites identical.
