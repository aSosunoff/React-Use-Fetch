export interface State<TData, TError = any> {
    status: "init" | "request" | "failure" | "success";
    data?: TData;
    error?: TError;
}
export declare type Action<K extends string, V = void> = V extends void ? {
    type: K;
} : {
    type: K;
} & V;
export declare type ActionFetch<T> = Action<"request"> | Action<"success", {
    payload: T;
}> | Action<"failure", {
    payload: any;
}>;
export declare const useFetchReducer: <TData, TError>() => {
    state: State<TData, TError>;
    request: () => void;
    success: (payload?: any) => void;
    failure: (payload?: any) => void;
};
