import { useCallback, useEffect, useState } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialValue: string = ""
): [T, (data: T) => void] => {
  const [data, setData] = useState<T>(() => {
    const data = localStorage.getItem(key);

    if (data) {
      return JSON.parse(data);
    }

    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data, key]);

  const setItem = useCallback((data) => {
    setData(() => data);
  }, []);

  return [data, setItem];
};
