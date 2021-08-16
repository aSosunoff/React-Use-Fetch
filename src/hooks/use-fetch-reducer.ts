import { useCallback, useMemo, useReducer } from "react";

export interface State<TData, TError = any> {
  status: "init" | "request" | "failure" | "success";
  data?: TData;
  error?: TError;
}

export type Action<K extends string, V = void> = V extends void
  ? { type: K }
  : { type: K } & V;

export type ActionFetch<T> =
  | Action<"request">
  | Action<"success", { payload: T }>
  | Action<"failure", { payload: any }>;

export const useFetchReducer = <TData, TError>() => {
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

  return {
    state,
    request,
    success,
    failure,
  };
};
