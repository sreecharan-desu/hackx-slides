---
title: "22. CI/CD — what & why"
order: 22
---

# CI/CD — what & why

```text
You push code to GitHub
        ↓
GitHub Actions runs checks
        ↓
(optionally) deploys to EC2 over SSH
```

- **CI** = Continuous Integration → test/build on every push
- **CD** = Continuous Deployment → ship to the server automatically

### 5-year-old version

Every time you save your homework to the cloud folder, a robot:

1. checks for mistakes
2. copies the new homework to the school notice board (server)
