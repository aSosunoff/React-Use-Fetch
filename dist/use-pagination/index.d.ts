export declare const usePagination: <T>(size: number | undefined, list: T[]) => {
    itemOnPage: T[];
    currentPage: number;
    pageCount: number;
    setPageHandler: (page: number) => void;
};
