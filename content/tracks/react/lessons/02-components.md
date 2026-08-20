---
title: "2. Components"
order: 2
---

# 2. Components

Components let you split the UI into independent, reusable pieces.

```jsx
function Hello({ name }) {
  return <h1>Hello, {name}</h1>;
}

export default function App() {
  return <Hello name="hackx" />;
}
```

A component is just a function that returns JSX.
