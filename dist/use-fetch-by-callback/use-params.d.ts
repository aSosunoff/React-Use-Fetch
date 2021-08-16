export declare const useParams: <TParams extends any[] = any[]>() => {
    params: TParams;
    setParamsHandler: (params: TParams) => void;
    clearParamsHandler: () => void;
};
