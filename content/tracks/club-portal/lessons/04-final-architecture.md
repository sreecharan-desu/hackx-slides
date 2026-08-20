---
title: "4. Final Architecture"
order: 4
---

# Final Architecture

```text
                 React Frontend
                       |
                       ↓
                 Express API
                 /          \
                ↓            ↓
           PostgreSQL      FastAPI
                              |
                              ↓
                         RAG Pipeline
                              |
                              ↓
                         Vector DB
                              |
                              ↓
                             LLM
```

### Ownership

- **You** — backend foundation
- **Anand** — RAG layer
- **Mohan** — usable product (frontend + integration)
