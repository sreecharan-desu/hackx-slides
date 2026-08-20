---
title: "6. props"
order: 6
---

# 6. props

Props pass data from parent to child.

```jsx
function Card({ title, children }) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

Props are read-only — never mutate them inside the child.
