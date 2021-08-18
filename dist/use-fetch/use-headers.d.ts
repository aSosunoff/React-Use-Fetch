declare type useHeadersState = {
    [key: string]: string;
} | null;
export declare const useHeaders: () => {
    headers: useHeadersState;
    setHeadersHandler: (headers: Headers) => void;
    clearHeadersHandler: () => void;
};
export {};
