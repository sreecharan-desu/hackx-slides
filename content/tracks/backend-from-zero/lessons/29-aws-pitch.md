---
title: "29. AWS narrative"
order: 29
---

# AWS narrative

```mermaid
flowchart TB
  U[Members] --> EDGE[DNS / TLS]
  EDGE --> NGX[Nginx on EC2]
  NGX --> API[Express API]
  API --> DDB[(DynamoDB)]
  API --> SES[Amazon SES]
  API --> RAG[RAG service]

  subgraph pitch [Managed upgrades to pitch]
    COG[Cognito]
    S3[S3 docs]
    CW[CloudWatch]
  end

  API -. later .-> COG
  API -. later .-> S3
  API -. later .-> CW
```

| Running today | Pitch analogue |
| --- | --- |
| Express on EC2 | EC2 / ECS |
| DynamoDB tables | DynamoDB (already) |
| JWT in our API | Cognito |
| Nodemailer → SES | SES |
| Document pack | S3 |
| pm2 logs | CloudWatch |

We already run DynamoDB, SES, and EC2. That is the spine — not fiction.
