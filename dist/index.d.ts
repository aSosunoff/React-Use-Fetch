export interface State<T, TError = any> {
    status: "init" | "request" | "failure" | "success";
    data?: T;
    error?: TError;
}
export declare const useFetch: <TData, TError = any>(url: string, isCache?: boolean) => [State<TData, TError>, (options?: RequestInit | undefined) => void];
