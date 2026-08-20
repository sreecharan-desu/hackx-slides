---
title: "35. Close"
order: 35
---

# Close

That's the path: TypeScript API, Prisma on Neon, mail through SES, Ubuntu behind a domain — then a clean bill.

```mermaid
flowchart LR
  A[npm init] --> B[Auth + /me]
  B --> C[Prisma · Neon]
  C --> D[SES]
  D --> E[EC2 + domain]
  E --> F[Teardown]
```

Frontend consumes the contract. RAG fills grounded answers. Our job was to keep this layer boring, correct, and something you can actually ship — and tear down.
