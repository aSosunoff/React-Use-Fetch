export interface State<T, TError = any> {
    status: "init" | "request" | "failure" | "success";
    data?: T;
    error?: TError;
}
interface UseFetchOption extends RequestInit {
    responseType?: "text" | "json" | "formData" | "blob" | "arrayBuffer";
}
export declare const useFetch: <TData, TError = any>(url: string, isCache?: boolean) => [State<TData, TError>, (options?: UseFetchOption | undefined) => void];
export {};
