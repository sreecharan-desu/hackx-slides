---
title: "13. RAG Pipeline"
order: 13
---

# RAG Pipeline

### Indexing

```text
Documents
   ↓
Extract text
   ↓
Chunk
   ↓
Embed
   ↓
Vector DB
```

### Query

```text
Question
   ↓
Embedding
   ↓
Similarity Search
   ↓
Top-K Chunks
   ↓
LLM
   ↓
Answer + Sources
```

This is the **core slide** — spend the most time here.
