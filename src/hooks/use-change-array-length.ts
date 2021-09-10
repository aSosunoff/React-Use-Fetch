import { useEffect } from "react";
import { usePrevState } from "..";

export const useChangeArrayLength = (arr: any[], fn: () => void) => {
  const prevArrayLength = usePrevState(arr.length);

  useEffect(() => {
    if (prevArrayLength === undefined) return;

    if (arr.length === prevArrayLength) return;

    fn();
  }, [arr.length, fn, prevArrayLength]);
};
