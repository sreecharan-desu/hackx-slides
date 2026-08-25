---
title: "11. One sendMail"
order: 11
---

# One sendMail

Register and reset both call `sendMail`. One file. SES SendEmail. Same keys as `aws configure` (laptop) or `AWS_*` in `.env` (the box).

`src/mail.ts`

```ts
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { env } from "./config.ts";

const ses = new SESv2Client({ region: env.awsRegion });

export async function sendMail(opts: { to: string; subject: string; text: string }) {
  return ses.send(
    new SendEmailCommand({
      FromEmailAddress: env.mailFrom,
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
```

Routes never talk to AWS themselves. Don't add SMTP. Mail Manager SMTP said 250 and delivered nothing.
