export declare const useCallbackAsync: <TData, TError = any, TParams extends any[] = any[]>(callback: (...params: TParams) => Promise<TData>) => [import("../hooks/use-fetch-reducer").State<TData, TError>, (...params: TParams) => void];
