---
title: "4. Tracking re-renders"
order: 4
---

# 4. Tracking re-renders

React re-renders a component when its state or props change.

```jsx
function App() {
  console.log("rendered");
  const [value, setValue] = useState("");

  return (
    <input value={value} onChange={(e) => setValue(e.target.value)} />
  );
}
```

Watch the console — every keystroke re-renders `App`.
