import { useState, useEffect } from "react";

const useDebounce = <T,>(val: T, delay: number) => {
  const [delayedValue, setDelayedValue] = useState<T>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedValue(val);
    }, delay);

		return () => clearTimeout(timer);
  }, [val]);

	return delayedValue as T;
};

export default useDebounce