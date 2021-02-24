interface State<T> {
    status: "init" | "request" | "failure" | "success";
    data?: T;
    error?: any;
}
export declare const useFetch: <T>(url: string, isCache?: boolean) => [State<T>, (options?: RequestInit | undefined) => void];
export {};
