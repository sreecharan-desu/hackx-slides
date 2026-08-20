---
title: "2. Backend like you're 5"
order: 2
---

# Backend like you're 5

Imagine a **restaurant**.

```text
Customer (browser / app)
        ↓  "I want pizza"
Waiter (API / Express)
        ↓  writes the order
Kitchen notebook (Database)
        ↓
Waiter brings pizza back
```

- **Frontend** = customer
- **Backend** = waiter + kitchen rules
- **Database** = notebook that remembers forever
- **API** = the menu of things the waiter understands

### One sentence

The backend is a program that **listens for requests**, **does work**, and **sends answers back**.

```text
Request  →  Express  →  Database / other services  →  Response
```

### Sources

- [MDN: What is a web server?](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_web_server)
- [HTTP in plain English](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
