import { useCallback, useState } from "react";

type useHeadersState = {
  [key: string]: string;
} | null;

export const useHeaders = () => {
  const [headers, setHeaders] = useState<useHeadersState>(null);

  const setHeadersHandler = useCallback((headers: Headers) => {
    const headersFinal = Array.from(headers.entries()).reduce(
      (res, [key, value]) => ({
        ...res,
        [key]: value,
      }),
      {}
    );

    setHeaders(() => headersFinal);
  }, []);

  const clearHeadersHandler = useCallback(() => {
    setHeaders(() => null);
  }, []);

  return {
    headers,
    setHeadersHandler,
    clearHeadersHandler,
  };
};
