---
title: "29. AWS narrative"
order: 29
---

# AWS narrative

Judges are fine with a local demo. They still want to hear how this would look on AWS. So we tell the truth about what we run today, then the managed upgrade.

```mermaid
flowchart TB
  U[Members] --> EDGE[DNS / TLS]
  EDGE --> NGX[Nginx on EC2]
  NGX --> API[Express API]
  API --> NEON[(Neon Postgres)]
  API --> SES[Amazon SES]
  API --> RAG[RAG service]

  subgraph pitch [Managed upgrades to pitch]
    RDS[Amazon RDS]
    COG[Cognito]
    S3[S3 docs]
    CW[CloudWatch]
  end

  NEON -. later .-> RDS
  API -. later .-> COG
  API -. later .-> S3
  API -. later .-> CW
```

| What we actually run | What we'd say in the pitch |
| --- | --- |
| Express on EC2 | EC2 / ECS |
| Neon Postgres | Amazon RDS |
| JWT in our API | Cognito |
| Nodemailer → SES | SES |
| Document pack | S3 |
| pm2 logs | CloudWatch |

You're not inventing SES and EC2 — you already touched them. Neon is the workshop DB; RDS is the production sentence.
