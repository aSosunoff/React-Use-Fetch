import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";

type Action<K extends string, V = void> = V extends void ? { type: K } : { type: K } & V;

type ActionFetch<T> =
  | Action<"request">
  | Action<"success", { payload: T }>
  | Action<"failure", { payload: string }>;

interface State<T> {
  status: "init" | "request" | "failure" | "success";
  data?: T;
  error?: string;
}

interface Cache<T> {
  [url: string]: T;
}

export const useFetch = <T>(
  url: string,
  options?: RequestInit,
  isCache: boolean = false
): [State<T>, () => void] => {
  const cache = useRef<Cache<T>>({});

  const [isFetch, setFetch] = useState(false);

  const initialState = useMemo<State<T>>(
    () => ({
      status: "init",
      error: undefined,
      data: undefined,
    }),
    []
  );

  const fetchReducer = useCallback(
    (state: State<T>, action: ActionFetch<T>): State<T> => {
      switch (action.type) {
        case "request":
          return { ...initialState, status: "request" };
        case "success":
          return { ...initialState, status: "success", data: action.payload };
        case "failure":
          return { ...initialState, status: "failure", error: action.payload };
        default:
          return state;
      }
    },
    [initialState]
  );

  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const request = useCallback(() => dispatch({ type: "request" }), []);
  const success = useCallback((payload) => dispatch({ type: "success", payload }), []);
  const failure = useCallback((payload) => dispatch({ type: "failure", payload }), []);

  useEffect(() => {
    if (!url || !isFetch) {
      return;
    }

    let cancelRequest = false;

    (async () => {
      request();

      if (isCache && cache.current[url]) {
        setFetch(() => false);
        !cancelRequest && success(cache.current[url]);
        return;
      }

      try {
        const response = await fetch(url, options);
        const data = await response.json();

        cache.current[url] = data;
        setFetch(() => false);
        !cancelRequest && success(data);
      } catch (error) {
        setFetch(() => false);
        !cancelRequest && failure(error.message);
      }
    })();

    return () => {
      cancelRequest = true;
    };
  }, [failure, isCache, isFetch, options, request, success, url]);

  const doFetch = useCallback(() => setFetch(() => true), []);

  return [state, doFetch];
};
