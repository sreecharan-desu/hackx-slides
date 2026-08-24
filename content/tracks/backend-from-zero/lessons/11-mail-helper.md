---
title: "11. Outbound mail"
order: 11
---

# Outbound mail

We want one helper for every email in the app. Locally it dumps into MailDev; later the same function talks to SES.

```bash
npx maildev   # UI on :1080 · SMTP on :1025
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

When we flip to SES, we only change `.env`. The call sites don't move. `MAIL_FROM` is the Gmail you verified in SES — no custom domain.
