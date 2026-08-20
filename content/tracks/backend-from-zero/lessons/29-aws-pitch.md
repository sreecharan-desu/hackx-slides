---
title: "29. AWS pitch mapping (required)"
order: 29
---

# AWS pitch mapping (required)

PS: local demo is fine. You **must explain** AWS mapping in pitch + Builder Center article.

| What we built | AWS production mapping |
| --- | --- |
| Express on EC2 | EC2 or ECS/Fargate |
| PostgreSQL on box | **Amazon RDS** |
| JWT auth | **Amazon Cognito** (managed auth) |
| Nodemailer locally | **Amazon SES** in production (we actually wire SES SMTP) |
| Club docs files | **Amazon S3** |
| Nginx + HTTPS | ALB + ACM certificates |
| Logs | **CloudWatch** |
| RAG / vectors (Anand) | Bedrock + OpenSearch (pitch) |

### Say this

> We run MailDev locally for speed. For real email we use Amazon SES over SMTP with the same Nodemailer code — verify + forgot-password both go through SES. Cognito/RDS/S3 are the managed upgrades we'd pitch next.

Live deploy = **bonus only**. You already did real **EC2 + domain + SES** — use that story.
