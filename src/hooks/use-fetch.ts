import { throws } from "assert";
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

export const useFetch = <T>(url: string, options?: RequestInit): [State<T>, () => void] => {
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

  useEffect(() => {
    let cancelRequest = false;

    if (!url) {
      return;
    }

    const fetchData = async () => {
      setFetch(() => false);

      dispatch({ type: "request" });

      if (cache.current[url]) {
        dispatch({ type: "success", payload: cache.current[url] });
      } else {
        try {
          if (cancelRequest) return;

          const response = await fetch(url, options);
          const data = await response.json();

          cache.current[url] = data;

          dispatch({ type: "success", payload: data });
        } catch (error) {
          if (cancelRequest) return;
          dispatch({ type: "failure", payload: error.message });
        }
      }
    };

    if (isFetch) {
      fetchData();
    }

    return () => {
      cancelRequest = true;
    };
  }, [isFetch, options, url]);

  const doFetch = useCallback(() => setFetch(() => true), []);

  return [state, doFetch];
};
