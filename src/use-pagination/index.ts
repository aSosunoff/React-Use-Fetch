import { chunkArray } from "./chunkFromArray";
import { useCallback, useMemo, useState } from "react";

export const usePagination = <T>(size = 5, list: T[]) => {
  const [currentPage, setCurrentPage] = useState(1);

  const chunkList = useMemo(() => chunkArray(list, size), [list, size]);

  const itemOnPage = useMemo(
    () => chunkList[currentPage - 1] || chunkList[0] || [],
    [chunkList, currentPage]
  );

  const setPageHandler = useCallback(
    (page: number) => {
      if (!chunkList[page - 1]) {
        setCurrentPage(1);
      } else {
        setCurrentPage(() => page);
      }
    },
    [chunkList]
  );

  return {
    itemOnPage,
    currentPage,
    pageCount: chunkList.length,
    setPageHandler,
  };
};
