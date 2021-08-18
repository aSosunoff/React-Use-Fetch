interface UseFetchOption extends RequestInit {
    responseType?: "text" | "json" | "formData" | "blob" | "arrayBuffer";
}
export declare const useFetch: <TData, TError = any>(url: string) => [import("../hooks/use-fetch-reducer").State<TData, TError>, (options?: UseFetchOption | undefined) => void, {
    [key: string]: string;
} | null];
export {};
