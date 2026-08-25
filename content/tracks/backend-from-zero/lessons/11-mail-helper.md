---
title: "11. One tray for every letter"
order: 11
---

# One tray for every letter

Join, verify, reset — three scenes, **one** `sendMail`. If we scatter Nodemailer in every route, flipping to SES later becomes a treasure hunt.

Default story: letters go through **SES SendEmail** using the same IAM keys as `aws configure`. MailDev (`SMTP_HOST=localhost`) is the optional local dump.

```bash
npm install @aws-sdk/client-sesv2
```

`src/mail.ts`

```ts
import nodemailer from "nodemailer";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const host = process.env.SMTP_HOST;
const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || "ap-south-1";
const useMaildev = host === "localhost" || host === "127.0.0.1";

const ses = new SESv2Client({ region });

export async function sendMail(opts: { to: string; subject: string; text: string }) {
  const from = process.env.MAIL_FROM;
  if (!from) throw new Error("MAIL_FROM is not set");

  if (useMaildev) {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT || 1025),
      secure: false,
    });
    return transporter.sendMail({ from, ...opts });
  }

  return ses.send(
    new SendEmailCommand({
      FromEmailAddress: from,
      Destination: { ToAddresses: [opts.to] },
      Content: {
        Simple: {
          Subject: { Data: opts.subject, Charset: "UTF-8" },
          Body: { Text: { Data: opts.text, Charset: "UTF-8" } },
        },
      },
    }),
  );
}

export default sendMail;
```

`MAIL_FROM` is a verified **email** — no domain required. Call sites stay `sendMail({ to, subject, text })`. Next: how SES sandbox actually works on webinar day.
