import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export const useDidUpdate = (
  effect: EffectCallback,
  dependencies: DependencyList
) => {
  const hasMounted = useRef(true);

  useEffect(() => {
    if (hasMounted.current) {
      hasMounted.current = false;
      return;
    }

    return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};
