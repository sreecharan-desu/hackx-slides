---
title: "22. A robot ships while we sleep"
order: 22
---

# A robot ships while we sleep

We don't want to SSH and paste forever. Push to `main`. A robot checks the types. Then it updates the box.

```mermaid
flowchart LR
  P[You push] --> A[GitHub Actions]
  A --> S[SSH to Ubuntu]
  S --> H[Pull, generate Prisma, restart]
```

CI means "it still boots." CD means "and the live door has it." Next: the YAML that does that.
