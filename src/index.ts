import { useHeaders } from "./useHeaderas";
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

interface UseFetchOption extends RequestInit {
  responseType?: "text" | "json" | "formData" | "blob" | "arrayBuffer";
}

export const useFetch = <TData, TError = any>(
  url: string,
  isCache = false
): [
  State<TData, TError>,
  (options?: UseFetchOption) => void,
  ReturnType<typeof useHeaders>["headers"]
] => {
  const [options, setOptions] = useState<UseFetchOption>({} as UseFetchOption);

  const cache = useRef<Cache<TData>>({});

  const [isFetch, setFetch] = useState(false);

  const { headers, setHeadersHandler, clearHeadersHandler } = useHeaders();

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
      if (isCache && cache.current[url]) {
        setFetch(() => false);
        !cancelRequest && success(cache.current[url]);
        return;
      }

      const { responseType, ...optionsFetch } = options;

      const response = await fetch(url.toString(), optionsFetch);

      setHeadersHandler(response.headers);

      if (!response.ok) {
        const body = await response.json();
        throw body;
      }

      let data = null;

      switch (responseType) {
        case "text":
          data = await response.text();
          break;
        case "json":
          data = await response.json();
          break;
        case "formData":
          data = await response.formData();
          break;
        case "blob":
          data = await response.blob();
          break;
        case "arrayBuffer":
          data = await response.arrayBuffer();
          break;
        default:
          throw new Error("Not found type of response");
      }

      if (!cancelRequest) {
        cache.current[url] = data;
        setFetch(() => false);
        success(data);
      }
    };

    doFetch().catch((error) => {
      if (!cancelRequest) {
        setFetch(() => false);
        clearHeadersHandler();
        failure(error);
      }
    });

    return () => {
      cancelRequest = true;
    };
  }, [
    clearHeadersHandler,
    failure,
    isCache,
    isFetch,
    options,
    request,
    setHeadersHandler,
    success,
    url,
  ]);

  const doFetch = useCallback(
    (options?: UseFetchOption) => {
      request();

      setOptions(() => ({
        responseType: "json",
        ...options,
      }));

      setFetch(() => true);
    },
    [request]
  );

  return [state, doFetch, headers];
};
