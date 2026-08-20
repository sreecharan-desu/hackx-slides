---
title: "29. AWS narrative"
order: 29
---

# AWS narrative

Judges accept a local demo. The pitch still needs a cloud map.

| Running today | Production analogue |
| --- | --- |
| Express on EC2 | EC2 / ECS |
| Postgres on box | RDS |
| JWT in our API | Cognito (managed auth) |
| Nodemailer → SES SMTP | SES |
| Document files | S3 |
| Nginx + Certbot | ALB + ACM |
| pm2 logs | CloudWatch |

We already run SES and EC2. That is the spine of the story — Cognito and RDS are the managed upgrades, not fiction.
