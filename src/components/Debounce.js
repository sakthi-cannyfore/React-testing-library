import { useEffect, useRef } from "react";

export default function Debounce(fn, delay) {
  let refValue = useRef(null);

  function useDebounce(...args) {
    if (refValue.current) clearTimeout(refValue.current);

    refValue.current = setTimeout(() => {
      fn(...args);
    }, delay);
  }

  useEffect(() => {
    return () => clearTimeout(refValue.current);
  }, []);
  return useDebounce;
}
