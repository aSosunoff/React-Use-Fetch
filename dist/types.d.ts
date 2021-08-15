export interface State<TData, TError = any> {
    status: "init" | "request" | "failure" | "success";
    data?: TData;
    error?: TError;
}
declare type Action<K extends string, V = void> = V extends void ? {
    type: K;
} : {
    type: K;
} & V;
export declare type ActionFetch<T, E> = Action<"request"> | Action<"success", {
    payload: T;
}> | Action<"failure", {
    payload: E;
}>;
export {};
