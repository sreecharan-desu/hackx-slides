---
title: "3. useState"
order: 3
---

# 3. useState

`useState` lets a component remember values between renders.

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

Calling `setCount` schedules a re-render with the new value.
