---
title: "11. Mail helper (Nodemailer)"
order: 11
---

# Mail helper (Nodemailer)

PS tip: **nodemailer is fine for local reset emails**.

Next slide: plug the **same helper** into **Amazon SES** (real delivery).

### Dev inbox (optional, recommended)

```bash
npx maildev
# UI: http://localhost:1080
# SMTP: localhost:1025
```

### `src/mail.js` (copy-paste)

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
  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM || "noreply@club.local",
    to,
    subject,
    text,
  });
  console.log("mail sent:", info.messageId);
  return info;
}

module.exports = { sendMail };
```

### 5-year-old version

Nodemailer is a **postman**.  
MailDev is a **toy mailbox** on your laptop so you can see emails without Gmail.

### Switch to SES later

Keep this file. Only change `.env` (see **slide 12 — Amazon SES**).

### Sources

- [Nodemailer](https://nodemailer.com/about/)
- [MailDev](https://github.com/maildev/maildev)
