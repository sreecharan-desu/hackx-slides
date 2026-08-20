---
title: "29. AWS narrative"
order: 29
---

# AWS narrative

Judges accept a local demo. The pitch still needs a cloud map — say what you run today, then the managed upgrade.

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

| Running today | Pitch analogue |
| --- | --- |
| Express on EC2 | EC2 / ECS |
| Neon Postgres | Amazon RDS |
| JWT in our API | Cognito |
| Nodemailer → SES | SES |
| Document pack | S3 |
| pm2 logs | CloudWatch |

You already run SES and EC2. Neon is the workshop database; RDS is the production sentence.
