import { useEffect } from "react";
import { usePrevState } from "..";

export const useChangeArrayLength = (arr: any[], fn: () => void) => {
  const prevArrayLength = usePrevState(arr.length);

  useEffect(() => {
    if (arr.length !== prevArrayLength) {
      fn();
    }
  }, [arr.length, fn, prevArrayLength]);
};
