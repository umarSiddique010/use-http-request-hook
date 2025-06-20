import { useCallback, useEffect, useRef, useState, useMemo } from "react";

const cache = new Map();
const MAX_CACHE_SIZE = 100;
const inFlightMap = new Map();

export function clearCache() {
  cache.clear();
  inFlightMap.clear();
}

export function invalidateURL(url) {
  cache.delete(url);
  inFlightMap.delete(url);
}

function useHttpRequest(url, options = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const controller = useRef(null);
  const timeoutRef = useRef(null);
  const didSetInFlight = useRef(false);

  const stableOptions = useMemo(
    () => ({
      method: options.method || "GET",
      headers: options.headers || {},
      body: options.body || null,
      debounce: options.debounce || 0,
    }),
    [options.method, options.headers, options.body, options.debounce]
  );

  const fetchData = useCallback(() => {
    if (!url) return;

    const method = stableOptions.method.toUpperCase();
    const headers = { ...stableOptions.headers };
    const body =
      method !== "GET" && stableOptions.body
        ? JSON.stringify(stableOptions.body)
        : undefined;

    if (body && !headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }

    const shouldCache = method === "GET";


    if (shouldCache && cache.has(url)) {
      setData(cache.get(url));
      setIsLoading(false);
      setError(null);
      return;
    }

    if (shouldCache && inFlightMap.has(url)) {
      setIsLoading(true);
      inFlightMap
        .get(url)
        .then((result) => {
          setData(result);
          setError(null);
        })
        .catch((err) => {
          if (err.name !== "AbortError") setError(err.message);
        })
        .finally(() => setIsLoading(false));
      return;
    }

    controller.current = new AbortController();
    const { signal } = controller.current;

    const runFetch = async () => {
      setIsLoading(true);
      setError(null);

      const fetchPromise = fetch(url, {
        method,
        headers,
        body,
        signal,
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((result) => {
          if (shouldCache && result) {
            if (cache.size >= MAX_CACHE_SIZE) {
              const firstValue = cache.keys().next().value;
              cache.delete(firstValue);
            } 
            cache.set(url, result);
          }
          return result;
        });

      if (shouldCache) {
        inFlightMap.set(url, fetchPromise);
        didSetInFlight.current = true
      }

      try {
        const result = await fetchPromise;
        setData(result);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
        if (shouldCache) inFlightMap.delete(url);
      }
    };

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (stableOptions.debounce > 0) {
      timeoutRef.current = setTimeout(runFetch, stableOptions.debounce);
    } else {
      runFetch();
    }
  }, [url, stableOptions]);

  useEffect(() => {
    fetchData();
    return () => {
      if (controller.current) controller.current.abort();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (didSetInFlight.current)
        inFlightMap.delete(url);
    };
  }, [fetchData]);

  return { data, error, isLoading, refetch: fetchData };
}

export default useHttpRequest;
