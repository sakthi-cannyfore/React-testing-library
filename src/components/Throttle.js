import { useEffect, useRef } from "react";

export default function useThrottle(fn, delay) {
  const lastCallRef = useRef(0);
  const lastArgsRef = useRef(null);
  const timeoutRef = useRef(null);

  function throttled(...args) {
    const now = Date.now();

    if (now - lastCallRef.current >= delay) {
      fn(...args);
      lastCallRef.current = now;
    } else {
      lastArgsRef.current = args;

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        fn(...lastArgsRef.current);
        lastCallRef.current = Date.now();
      }, delay - (now - lastCallRef.current));
    }
  }

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return throttled;
}
