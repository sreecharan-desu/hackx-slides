---
title: "20. RAG Service"
order: 20
---

# RAG Service

```text
Express
   ↓
POST /chat
   ↓
FastAPI
   ↓
RAG
   ↓
Vector DB
   ↓
LLM
```

We're separating the AI service from the main application so each component has a **clear responsibility**.
