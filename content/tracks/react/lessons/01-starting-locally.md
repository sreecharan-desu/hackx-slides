---
title: "1. Starting a react project locally"
order: 1
---

# 1. Starting a react project locally

We'll use **Vite** to spin up a React app quickly.

## Vite

Ref - [https://vite.dev/guide/](https://vite.dev/guide/)

Vite (French for "quick", pronounced `/vit/`, like "veet") is a build tool that aims to provide a faster and leaner development experience for modern web projects. It consists of two major parts:

- A **dev server** that provides rich feature enhancements over native ES modules, for example extremely fast Hot Module Replacement (HMR).
- A **build command** that bundles your code with Rollup, pre-configured to output highly optimized static assets for production.

### Initializing a react project.

```bash
npm create vite@latest
```

Pick the React + TypeScript template, then:

```bash
cd my-app
npm install
npm run dev
```
