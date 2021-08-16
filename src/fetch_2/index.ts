import { useCallback, useEffect, useState } from "react";
import { useTrigger } from "./use-trigger";
import { tuple } from "./tuple";
import { useFetchReducer } from "./use-fetch-reducer";
import { useHeaders } from "./use-headers";

interface UseFetchOption extends RequestInit {
  responseType?: "text" | "json" | "formData" | "blob" | "arrayBuffer";
}

export const useFetchCustom = <TData, TError = any>(url: string) => {
  const [options, setOptions] = useState<UseFetchOption>({} as UseFetchOption);

  const { headers, setHeadersHandler, clearHeadersHandler } = useHeaders();

  const { state, request, success, failure } = useFetchReducer<TData, TError>();

  const [isFetch, { onHandler: fetchStart, offHandler: fetchFinish }] =
    useTrigger();

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
        fetchFinish();
        success(data);
      }
    };

    doFetch().catch((error) => {
      if (!cancelRequest) {
        fetchFinish();
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
    fetchFinish,
  ]);

  const doFetch = useCallback(
    (options?: UseFetchOption) => {
      request();

      setOptions(() => ({
        responseType: "json",
        ...options,
      }));

      fetchStart();
    },
    [request, fetchStart]
  );

  return tuple(state, doFetch, headers);
};
