---
title: "11. Outbound mail"
order: 11
---

# Outbound mail

One helper for every email. Locally it hits MailDev; in production the same code hits SES.

```bash
npx maildev   # UI :1080 · SMTP :1025
```

`src/mail.ts`

```ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "localhost",
  port: Number(process.env.SMTP_PORT || 1025),
  secure: false,
  auth: process.env.SMTP_USER
    ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    : undefined,
});

export async function sendMail(opts: { to: string; subject: string; text: string }) {
  return transporter.sendMail({
    from: process.env.MAIL_FROM,
    ...opts,
  });
}
```

Swap SMTP settings in `.env` when you move to SES. Call sites stay unchanged.
