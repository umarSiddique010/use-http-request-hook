# <img src="./assets/icon.ico" height="45" align="top"> @mdus/use-http-request-hook

![npm version](https://img.shields.io/npm/v/@mdus/use-http-request-hook?style=flat-square)
![React Version](https://img.shields.io/npm/dependency-version/@mdus/use-http-request-hook/peer/react?style=flat-square)
![License](https://img.shields.io/npm/l/@mdus/use-http-request-hook?style=flat-square)

**A production-ready React hook for making HTTP requests with built-in caching, debounce, waterfall protection, and AbortController.**

This lightweight hook abstracts away the complexity of `fetch`, providing a robust solution for data fetching that handles race conditions, duplicates, and component unmounting automatically.

---

## ✨ Features

- **✅ Universal HTTP Support:** Handles `GET`, `POST`, `PUT`, `DELETE` and others. Automatically serializes JSON bodies and sets `Content-Type`.
- **⚡ Smart Caching:** Built-in LRU (Least Recently Used) caching strategy (max 100 entries) for `GET` requests to minimize network load.
- **🛡️ Waterfall Protection:** Implements request deduplication. If two components request the same URL simultaneously, only one network request is fired.
- **🛑 Auto-Cancellation:** Uses `AbortController` to automatically cancel in-flight requests when the component unmounts, preventing "state update on unmounted component" errors.
- **⏱️ Debounce Support:** Built-in debounce capability, making it perfect for search inputs and dynamic filters.

---

## 📦 Installation

```bash
# npm
npm install @mdus/use-http-request-hook

# yarn
yarn add @mdus/use-http-request-hook

# pnpm
pnpm add @mdus/use-http-request-hook
```

---

## 💻 Quick Start

### 1. Basic GET Request

Fetch data effortlessly with automatic loading and error states.

```jsx
import React from 'react';
import useHttpRequest from '@mdus/use-http-request-hook';

const UserProfile = ({ userId }) => {
  const { data, isLoading, error } = useHttpRequest(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );

  if (isLoading) return <div className="spinner">Loading user...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!data) return null;

  return (
    <div className="card">
      <h2>{data.name}</h2>
      <p>Email: {data.email}</p>
    </div>
  );
};
```

### 2. POST/DELETE Requests & Options

The hook supports complex configurations. Changing options (like `body`) triggers the request, or you can use `refetch` to trigger it manually.

```jsx
import React, { useState } from 'react';
import useHttpRequest from '@mdus/use-http-request-hook';

const CreatePost = () => {
  const [shouldCreate, setShouldCreate] = useState(false);

  // The hook runs when 'url' is provided.
  // We pass null initially to prevent execution until ready.
  const { data, isLoading, error } = useHttpRequest(
    shouldCreate ? 'https://jsonplaceholder.typicode.com/posts' : null,
    {
      method: 'POST',
      body: {
        title: 'foo',
        body: 'bar',
        userId: 1,
      },
      headers: {
        Authorization: 'Bearer my-token',
      },
    },
  );

  return (
    <div>
      <button onClick={() => setShouldCreate(true)} disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Post'}
      </button>

      {error && <p style={{ color: 'red' }}>Failed: {error}</p>}

      {data && <div style={{ color: 'green' }}>Created Post ID: {data.id}</div>}
    </div>
  );
};
```

---

## 📖 API Reference

### `useHttpRequest(url, options)`

#### Arguments

| Argument  | Type               | Description                                                  |
| :-------- | :----------------- | :----------------------------------------------------------- |
| `url`     | `string` \| `null` | The API endpoint URL. Pass `null` to pause/skip the request. |
| `options` | `object`           | (Optional) Configuration object for the request.             |

#### Options Object

| Property   | Default | Description                                                                                           |
| :--------- | :------ | :---------------------------------------------------------------------------------------------------- |
| `method`   | `'GET'` | HTTP method (`GET`, `POST`, `PUT`, `DELETE`, etc.).                                                   |
| `headers`  | `{}`    | Custom request headers. `Content-Type: application/json` is added automatically if a body is present. |
| `body`     | `null`  | Request body. If provided, it is automatically stringified.                                           |
| `debounce` | `0`     | Delay in milliseconds before executing the request. Useful for search inputs.                         |

#### Return Values

| Property    | Type               | Description                                                               |
| :---------- | :----------------- | :------------------------------------------------------------------------ |
| `data`      | `any`              | The parsed JSON response from the API. `null` until loaded.               |
| `error`     | `string` \| `null` | Error message if the request fails (network error or non-200 status).     |
| `isLoading` | `boolean`          | `true` while the request is in flight or debouncing.                      |
| `refetch`   | `function`         | Function to manually trigger the request again using the current options. |

### Global Utilities

The package exports utility functions to manage the internal cache.

```javascript
import { clearCache, invalidateURL } from '@mdus/use-http-request-hook';

// Clear the entire internal cache
clearCache();

// Remove a specific URL from the cache and in-flight tracking
invalidateURL('https://api.example.com/users/1');
```

---

## 🛠 Under the Hood

### 🚀 In-Flight Deduplication

To prevent "waterfalls" or double-fetching, this library maintains a global `inFlightMap`. If Component A requests `/api/user/1` and Component B requests `/api/user/1` while the first is still pending, **only one network call is made**. Both components subscribe to the same promise.

### 🧹 Auto-Cleanup

Every request generates an `AbortController`. If the component unmounts or the `url` changes before the request completes, the `abort()` signal is fired. This ensures your application stays performant and avoids memory leaks from stale asynchronous operations.

---

<div align="center">
  <p><strong>Developed with ❤️ by Md Umar Siddique</strong></p>
  <a href="https://www.linkedin.com/in/md-umar-siddique-1519b12a4/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="https://www.npmjs.com/~umarSiddique010"><img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="NPM" /></a>
  <a href="https://dev.to/umarsiddique010"><img src="https://img.shields.io/badge/DEV.to-0A0A0A?style=for-the-badge&logo=dev.to&logoColor=white" alt="DEV Community" /></a>
  <a href="https://github.com/umarSiddique010"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
  <a href="https://x.com/umarSiddique010"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" /></a>
</div>
