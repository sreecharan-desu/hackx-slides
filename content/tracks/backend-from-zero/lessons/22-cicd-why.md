---
title: "22. Delivery pipeline"
order: 22
---

# Delivery pipeline

```mermaid
flowchart LR
  P[git push main] --> A[GitHub Actions]
  A --> S[SSH]
  S --> H[EC2 pull + pm2 restart]
```
