import { useHeaders } from "./useHeaderas";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";

type Action<K extends string, V = void> = V extends void
  ? { type: K }
  : { type: K } & V;

type ActionFetch<T, E> =
  | Action<"request">
  | Action<"success", { payload: T }>
  | Action<"failure", { payload: E }>;

export interface State<TData, TError = any> {
  status: "init" | "request" | "failure" | "success";
  data?: TData;
  error?: TError;
}

interface UseFetchOption extends RequestInit {
  responseType?: "text" | "json" | "formData" | "blob" | "arrayBuffer";
}

export const useFetch = <TData, TError = any>(
  url: string
): [
  State<TData, TError>,
  (options?: UseFetchOption) => void,
  ReturnType<typeof useHeaders>["headers"]
] => {
  const [options, setOptions] = useState<UseFetchOption>({} as UseFetchOption);

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
      action: ActionFetch<TData, TError>
    ): State<TData, TError> => {
      switch (action.type) {
        case "request":
          return { ...initialState, status: "request", data: state.data };
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
    if (!isFetch) {
      return;
    }

    let cancelRequest = false;

    const doFetch = async () => {
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
    isFetch,
    options,
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
