---
title: "5. useEffect"
order: 5
---

# 5. useEffect

Before we understand `useEffect`, let’s understand what are `Side effects`.

### Side effects

Side effects are operations that reach outside the pure render path — things React can't predict just from props and state.

Common examples:

- **Fetching data** from an API.
- **Modifying the DOM** manually.
- **Subscribing to events** (like WebSocket connections, timers, or browser events).
- **Starting a clock**

#### Problem in running side effects in React components

If you run side effects directly in the component body, you can hit:

- **Unnecessary or duplicated effects** (like multiple API calls).
- **Inconsistent behavior** (side effects might happen before rendering finishes).
- **Performance issues** (side effects could block rendering or cause excessive re-rendering).

### How useEffect Manages Side Effects:

```js
useEffect(() => {
  // Code here is the "effect" — this is where side effects happen
}, [/* dependencies */]);
```

- The first argument to `useEffect` is the **effect function**, where you put the code that performs the side effect.
- The second argument is the **dependencies array**, which controls when the effect runs. This array tells React to re-run the effect only when certain values (props or state) change. If you pass an empty array `[]`, the effect runs once after mount.
- **Optional Cleanup**: If your side effect needs cleanup (e.g., unsubscribing from a WebSocket, clearing intervals), `useEffect` allows you to return a function that React will call when the component unmounts or before the effect re-runs.

### To recap

`useEffect` is how you synchronize your component with something outside of React.

### Linkedin like topbar

```jsx
import { useEffect, useState } from "react";

function App() {
  const [currentTab, setCurrentTab] = useState(1);
  const [tabData, setTabData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/todos/" + currentTab)
      .then(async (res) => {
        const json = await res.json();
        setTabData(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <button
        onClick={() => setCurrentTab(1)}
        style={{ color: currentTab == 1 ? "red" : "black" }}
      >
        Todo #1
      </button>
      <button
        onClick={() => setCurrentTab(2)}
        style={{ color: currentTab == 2 ? "red" : "black" }}
      >
        Todo #2
      </button>
      <button
        onClick={() => setCurrentTab(3)}
        style={{ color: currentTab == 3 ? "red" : "black" }}
      >
        Todo #3
      </button>
      <button
        onClick={() => setCurrentTab(4)}
        style={{ color: currentTab == 4 ? "red" : "black" }}
      >
        Todo #4
      </button>
      <br />
      {loading ? "Loading..." : tabData.title}
    </div>
  );
}

export default App;
```

### Create a Countdown

```jsx
import React, { useState, useEffect } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [seconds]);

  return <div>{seconds}</div>;
};
```

### Fetching data

Put network requests inside `useEffect`, not in the render body.
