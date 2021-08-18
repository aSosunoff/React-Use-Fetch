export declare type IChangeProps<TProps extends Record<string, any>> = {
    [key in keyof TProps]: {
        from: TProps[key];
        to: TProps[key];
    };
};
export declare const useWhyDidYouUpdate: <TProps extends Record<string, any>>(props: TProps, callback: (change: IChangeProps<TProps>) => void) => void;
