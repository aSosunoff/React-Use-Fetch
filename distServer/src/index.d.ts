interface State<T> {
    status: "init" | "request" | "failure" | "success";
    data?: T;
    error?: string;
}
export declare const useFetch: <T>(url: string, options?: RequestInit | undefined, isCache?: boolean) => [State<T>, () => void];
export {};
