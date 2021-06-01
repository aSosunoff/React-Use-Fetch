import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

type Action<K extends string, V = void> = V extends void
  ? { type: K }
  : { type: K } & V;

type ActionFetch<T> =
  | Action<"request">
  | Action<"success", { payload: T }>
  | Action<"failure", { payload: any }>;

export interface State<T, TError = any> {
  status: "init" | "request" | "failure" | "success";
  data?: T;
  error?: TError;
}

interface Cache<T> {
  [url: string]: T;
}

export const useFetch = <TData, TError = any>(
  url: string,
  isCache = false
): [State<TData, TError>, (options?: RequestInit) => void] => {
  const [options, setOptions] = useState<RequestInit>();

  const cache = useRef<Cache<TData>>({});

  const [isFetch, setFetch] = useState(false);

  const initialState = useMemo<State<TData, TError>>(
    () => ({
      status: "init",
      error: undefined,
      data: undefined,
    }),
    []
  );

  const fetchReducer = useCallback(
    (
      state: State<TData, TError>,
      action: ActionFetch<TData>
    ): State<TData, TError> => {
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
  const success = useCallback(
    (payload) => dispatch({ type: "success", payload }),
    []
  );
  const failure = useCallback(
    (payload) => dispatch({ type: "failure", payload }),
    []
  );

  useEffect(() => {
    if (!url || !isFetch) {
      return;
    }

    let cancelRequest = false;

    const doFetch = async () => {
      request();

      if (isCache && cache.current[url]) {
        setFetch(() => false);
        !cancelRequest && success(cache.current[url]);
        return;
      }

      const response = await fetch(url.toString(), options);

      if (!response.ok) {
        const body = await response.json();
        throw body;
      }

      const data = await response.json();

      if (!cancelRequest) {
        cache.current[url] = data;
        setFetch(() => false);
        success(data);
      }
    };

    doFetch().catch((error) => {
      if (!cancelRequest) {
        setFetch(() => false);
        failure(error);
      }
    });

    return () => {
      cancelRequest = true;
    };
  }, [failure, isCache, isFetch, options, request, success, url]);

  const doFetch = useCallback((options?: RequestInit) => {
    setOptions(() => options);
    setFetch(() => true);
  }, []);

  return [state, doFetch];
};
