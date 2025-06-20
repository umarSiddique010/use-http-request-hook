# useHttpRequest

A lightweight, production-ready React hook for making HTTP requests — with:

- ✅ Built-in **GET request caching**
- ✅ **Waterfall protection** for shared concurrent requests
- ✅ Native **AbortController** handling
- ✅ Optional **debounce** delay
- ✅ Easy **refetch** and **manual cache invalidation**
- ✅ Zero dependencies — just `fetch` and idiomatic React

---

## Why Use This Hook?

> No more boilerplate, stale fetches, or duplicate network calls.

`useHttpRequest` is for React developers who want:
- Clean async logic without `useEffect` gymnastics
- Reliable loading/error/data state without manual tracking
- Built-in **caching** and **request deduplication** (waterfall protection)
- Auto-abort behavior to prevent memory leaks
- Full support for `GET`, `POST`, `PUT`, `DELETE`, and custom configs

**Perfect for:**
- Fetching data on mount
- Debounced APIs (e.g., search/autocomplete)
- Avoiding redundant GET calls in multiple components
- Keeping UI state clean, responsive, and React-idiomatic

---

## What Is This?

`useHttpRequest()` is a custom React hook that simplifies `fetch()` logic inside functional components.

It handles:
- What to fetch (`url`)
- How to fetch (method, headers, body)
- When to fetch (with debounce and cleanup)
- What to do with the result (`data`, `error`, `isLoading`)

You use it like this:

```js
const { data, error, isLoading, refetch } = useHttpRequest(url, options);
```

---

## Installation

```bash
npm install @mdus/use-http-request-hook
# or
yarn add @mdus/use-http-request-hook
```

---

## API Reference

### What It Expects

| Argument  | Type     | Required | Description                                 |
| --------- | -------- | -------- | ------------------------------------------- |
| `url`     | `string` | ✅ Yes    | The URL or endpoint to fetch data from      |
| `options` | `object` | ❌ No     | An optional object to configure the request |

### What Goes Inside `options`

| Option     | Type     | Default | Description                                               |
| ---------- | -------- | ------- | --------------------------------------------------------- |
| `method`   | `string` | `"GET"` | HTTP method (`"GET"`, `"POST"`, `"PUT"`, `"DELETE"` etc.) |
| `headers`  | `object` | `{}`    | Any custom headers (`Content-Type`, auth tokens, etc.)    |
| `body`     | `object` | `null`  | Payload for non-GET requests (automatically stringified)  |
| `debounce` | `number` | `0`     | Delay in milliseconds before the request is sent          |

### What It Returns

| Key         | Type       | Description                                          |
| ----------- | ---------- | ---------------------------------------------------- |
| `data`      | `any`      | The JSON response from the API (or `null` initially) |
| `isLoading` | `boolean`  | `true` while request is in progress                  |
| `error`     | `string`   | Error message if something goes wrong                |
| `refetch`   | `function` | Manually re-trigger the request                      |

---

## Examples

### 1. Simple GET Request

```jsx
import useHttpRequest from "@mdus/use-http-request-hook";

function Products() {
  const { data, isLoading, error } = useHttpRequest("https://fakestoreapi.com/products");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {data?.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
```

### 2. POST Request with JSON Body

```jsx
const { data, error, isLoading } = useHttpRequest("https://api.example.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: {
    name: "Alice",
    email: "alice@example.com"
  }
});
```

### 3. Debounced GET Request (e.g., Search Input)

```jsx
const { data, isLoading } = useHttpRequest(`https://api.com/search?q=${query}`, {
  debounce: 500 // Waits 500ms after typing stops
});
```

### 4. Manual Refetch

```jsx
const { data, refetch } = useHttpRequest("https://api.com/stats");

<button onClick={refetch}>Refresh Data</button>
```

---

## Advanced Features

### GET Caching

* Only `GET` requests are cached by default
* Cached in memory (not persisted to disk)
* Avoids repeat requests during a session

```js
// Will use cache if already fetched:
useHttpRequest("https://api.com/items");
```

### Waterfall Protection

Multiple components requesting the **same GET URL** won't duplicate the request:

```jsx
// Component A
useHttpRequest("https://api.com/profile");

// Component B  
useHttpRequest("https://api.com/profile");

// ✅ Only one fetch will actually run — both use same in-flight promise
```

### Manual Cache Control

```js
import { clearCache, invalidateURL } from "@mdus/use-http-request-hook";

clearCache(); // Wipe all cached GET responses
invalidateURL("https://api.com/products"); // Clear just one
```

---

## How It Works (Beginner-Friendly Flow)

1. You call `useHttpRequest(url, options)`
2. The hook checks if this is a `GET` request and already cached
3. If not cached, it creates a `fetch()` request with `AbortController`
4. While the request is in progress, `isLoading` is `true`
5. If successful, `data` is filled and cached (for `GET` only)
6. If there's an error, it shows up in `error`
7. If component unmounts or URL changes, the request is safely aborted

### Auto Cleanup

* Cancels in-progress requests if:
  * Component unmounts
  * URL or `options` change
* Prevents memory leaks or setting state on an unmounted component

---

## How It Works Internally

* Uses native `fetch()` with `AbortController` for safety
* `GET` responses cached in a `Map` (session memory)
* In-flight GET requests tracked in another `Map` to prevent waterfall issues
* Uses `setTimeout` for debouncing and cleans up on unmount
* React `useRef`, `useCallback`, and `useMemo` ensure stability across renders

---

## File Structure

```
use-http-request-hook/
├── src/
│   └── useHttpRequest.js
├── dist/
│   └── index.js
├── package.json
└── README.md
```

---

## Author

**Md Umar Siddique**

* GitHub: [@umarSiddique010](https://github.com/umarSiddique010)
* LinkedIn: [md-umar-siddique](https://linkedin.com/in/md-umar-siddique)
* X / Twitter: [@umarSiddique010](https://x.com/umarSiddique010)
* Dev.to: [@umarSiddique010](https://dev.to/umarsiddique010)

---

## License

MIT © 2025 Md Umar Siddique

---

## Final Note

This hook is designed to solve **real problems** React developers face every day — while staying small, composable, and dependency-free. It's a reflection of production-level thinking: eliminating duplication, managing edge cases, and creating a smoother dev experience.

If it helps you, feel free to star, use, and share.