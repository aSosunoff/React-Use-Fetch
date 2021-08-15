import { State } from "./types";
export declare const useFetchReducer: <TData, TError>() => {
    state: State<TData, TError>;
    request: () => void;
    success: (payload: any) => void;
    failure: (payload: any) => void;
};
