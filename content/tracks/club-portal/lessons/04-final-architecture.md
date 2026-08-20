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

### Layers

- Backend foundation — Express + Postgres
- RAG layer — retrieval + grounded answers
- Frontend — product surface that calls the APIs
