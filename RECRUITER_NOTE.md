# Hello!

Thanks for checking out my project — `use-http-request`.  
This isn't just a fetch wrapper — it's a reflection of how I engineer: turning repetitive frontend pain points into clean, safe, **production-ready abstractions**.

---

## Why I Built This

*"If it's worth repeating, it's worth abstracting."*

In real-world React apps, I kept rewriting the same logic:

- Request state (`loading`, `error`, `data`)
- Debounce handling
- Abort on unmount
- Cache for GETs
- Preventing duplicate network calls across components

So I built `useHttpRequest` — a composable React hook that supports:

- **GET caching**
- **Waterfall protection** — only 1 fetch per URL across components
- **AbortController** for cleanup and reactivity
- **POST / PUT / DELETE** support
- Optional **debounce** delay
- Zero dependencies

---

## What This Demonstrates

### Clean, Developer-Centric API

```js
const { data, error, isLoading, refetch } = useHttpRequest(url, options);
```

* Declarative usage — no manual `useEffect`
* `refetch()` for user-controlled updates
* Seamless integration in any component or UI layer

---

### Internals That Scale

* `useRef` to track active controllers (no race conditions)
* `useCallback` + `useMemo` to stabilize logic across renders
* `inFlightMap` to **de-duplicate concurrent GET requests**
* Debounce with `setTimeout` for search and delay patterns
* Manual cache invalidation (e.g., after mutations)

---

### Real Engineering Thinking

* Avoids memory leaks and double-fetch bugs
* Prevents race conditions on re-renders
* Optimized for multi-mount scenarios and global reuse
* Designed for resilience and clarity, not just functionality

---

## About Me

I'm **Md Umar Siddique** — a frontend-focused engineer on a deep, intentional journey to full-stack fluency.

---

### I Specialize In

**Advanced React Hooks & UI Logic**

* Custom hooks like `useTimeout`, `useInterval`, `useHttpRequest`
* Practical use of `useReducer`, `useRef`, `useCallback`, `useMemo`

**Production Engineering Mindset**

* Write code that defends against edge cases and real users
* Think about APIs, caching, lifecycle, and performance

**Open Source Publishing**

* I don't build demo toys — I build real tools
* Everything I publish solves a recurring frontend pain

---

### Currently Learning

**Backend Engineering**

* Node.js + Express
* MongoDB, PostgreSQL, authentication, sessions

**System Design**

* High-level architecture, scaling, and distributed systems

**AI x UI**

* Long-term: I want to build intelligent, human-friendly frontends
  powered by clean backend systems and real-time inference

---

## Vision

My goal is to grow into a **full-stack product engineer** who:

* Writes resilient frontend logic with design in mind
* Ships APIs that scale and recover gracefully
* Collaborates across product, design, and backend teams
* Builds tools and workflows that outlast trends
* Bridges intelligent systems with usable interfaces

---

## Let's Connect

* **Email**: [us70763@gmail.com](mailto:us70763@gmail.com)
* GitHub: [@umarSiddique010](https://github.com/umarSiddique010)
* LinkedIn: [md-umar-siddique](https://linkedin.com/in/md-umar-siddique)
* Dev.to: [@umarSiddique010](https://dev.to/umarsiddique010)

---

Thanks again for your time.

If you're looking for an engineer who's detail-oriented, UX-aware, and systems-conscious — I'd love to connect.

**Md Umar Siddique**  
*Building tools with purpose. Learning with intent.*