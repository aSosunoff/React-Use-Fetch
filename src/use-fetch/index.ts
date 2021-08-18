import { useCallbackAsync } from "./../use-callback-async/index";
import { useCallback } from "react";
import { tuple } from "../utils/tuple";
import { useHeaders } from "./use-headers";

interface UseFetchOption extends RequestInit {
  responseType?: "text" | "json" | "formData" | "blob" | "arrayBuffer";
}

const fetchHandler = async (
  url: string,
  options: UseFetchOption,
  setHeadersHandlerCallback: (headers: Headers) => void
) => {
  const { responseType, ...optionsFetch } = options;

  const response = await fetch(url.toString(), optionsFetch);

  setHeadersHandlerCallback(response.headers);

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

  return data;
};

export const useFetch = <TData, TError = any>(url: string) => {
  const { headers, setHeadersHandler } = useHeaders();

  const [state, doFetch] = useCallbackAsync<
    TData,
    TError,
    [string, UseFetchOption, (headers: Headers) => void]
  >(fetchHandler);

  const doFetchHandler = useCallback(
    (options?: UseFetchOption) =>
      doFetch(
        url,
        {
          responseType: "json",
          ...options,
        },
        setHeadersHandler
      ),
    [doFetch, setHeadersHandler, url]
  );

  return tuple(state, doFetchHandler, headers);
};

/* export const useFetch = <TData, TError = any>(url: string) => {
  const [options, setOptions] = useState<UseFetchOption>({} as UseFetchOption);

  const { headers, setHeadersHandler, clearHeadersHandler } = useHeaders();

  const { state, request, success, failure } = useFetchReducer<TData, TError>();

  const [isFetch, { onHandler: fetchStart, offHandler: fetchFinish }] =
    useTrigger();

  useEffect(() => {
    if (!isFetch) return;

    let cancelRequest = false;

    (async () => {
      try {
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

        if (cancelRequest) return;

        fetchFinish();
        success(data);
      } catch (error) {
        if (cancelRequest) return;

        fetchFinish();
        clearHeadersHandler();
        failure(error);
      }
    })();

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
}; */
