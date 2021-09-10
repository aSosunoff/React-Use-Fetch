import { useEffect, useRef } from "react";

export const usePrevState = <T>(state: T) => {
  const prev = useRef<T>();

  useEffect(() => {
    prev.current = state;
  }, [state]);

  return prev.current;
};
