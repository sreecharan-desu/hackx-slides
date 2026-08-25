---
title: "29. What we ran vs what we pitch"
order: 29
---

# What we ran vs what we pitch

Judges accept a local demo. They still want to hear how this grows on AWS. Tell the truth: what we touched today, then the managed upgrade.

```mermaid
flowchart TB
  U[Members] --> EDGE[DNS / TLS]
  EDGE --> NGX[Nginx on EC2]
  NGX --> API[Express]
  API --> NEON[(Neon)]
  API --> SES[SES]
  API --> RAG[RAG]

  subgraph pitch [Sentences for later]
    RDS[RDS]
    COG[Cognito]
    S3[S3]
    CW[CloudWatch]
  end

  NEON -. later .-> RDS
  API -. later .-> COG
  API -. later .-> S3
  API -. later .-> CW
```

| What we actually ran | The grown-up sentence |
| --- | --- |
| Express on EC2 | EC2 / ECS |
| Neon | Amazon RDS |
| JWT in our API | Cognito |
| SES SendEmail | SES |
| Docs pack | S3 |
| pm2 logs | CloudWatch |

You're not inventing SES and EC2 — you used them. Neon was the workshop memory; RDS is the production sentence. Next: tick the brief.
