---
title: "35. Close"
order: 35
---

# Close

```mermaid
flowchart LR
  A[npm init] --> B[Auth + /me]
  B --> C[DynamoDB]
  C --> D[SES]
  D --> E[EC2 + domain]
  E --> F[Teardown]
```

From zero to a signed-in member on `/me`, mail on SES, data in DynamoDB, API on Ubuntu — then a clean bill.

Frontend consumes the contract.  
RAG fills the answers.  
This layer stays correct, deployable, and disposable.
