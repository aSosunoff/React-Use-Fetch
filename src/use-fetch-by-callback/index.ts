import { useCallback, useEffect } from "react";
import { useTrigger } from "../hooks/use-trigger";
import { tuple } from "../utils/tuple";
import { useFetchReducer } from "../hooks/use-fetch-reducer";
import { useParams } from "./use-params";

export const useFetchByCallback = <
  TData,
  TError = any,
  TParams extends any[] = any[]
>(
  callback: (...params: TParams) => Promise<TData>
) => {
  const { state, request, success, failure } = useFetchReducer<TData, TError>();

  const [isStartFetch, { onHandler: fetchStart, offHandler: fetchFinish }] =
    useTrigger();

  const { params, setParamsHandler, clearParamsHandler } = useParams<TParams>();

  useEffect(() => {
    if (!isStartFetch) return;

    let cancelRequest = false;

    (async (...params: TParams) => {
      try {
        const data = await callback(...params);

        if (cancelRequest) return;

        fetchFinish();
        success(data);
        clearParamsHandler();
      } catch (error) {
        if (cancelRequest) return;

        fetchFinish();
        failure(error);
        clearParamsHandler();
      }
    })(...params);

    return () => {
      cancelRequest = true;
    };
  }, [
    callback,
    failure,
    fetchFinish,
    isStartFetch,
    success,
    params,
    clearParamsHandler,
  ]);

  const doFetch = useCallback(
    (...params: TParams) => {
      setParamsHandler(params);
      request();
      fetchStart();
    },
    [request, fetchStart, setParamsHandler]
  );

  return tuple(state, doFetch);
};
