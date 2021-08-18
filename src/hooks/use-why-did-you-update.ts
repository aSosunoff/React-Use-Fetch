import { useEffect, useRef } from "react";

export type IChangeProps<TProps extends Record<string, any>> = {
  [key in keyof TProps]: {
    from: TProps[key];
    to: TProps[key];
  };
};

export const useWhyDidYouUpdate = <TProps extends Record<string, any>>(
  props: TProps,
  callback: (change: IChangeProps<TProps>) => void
) => {
  const previousProps = useRef<TProps>({} as TProps);

  useEffect(() => {
    if (previousProps.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props });

      const changeObj: IChangeProps<any> = {};

      allKeys.forEach((key) => {
        if (previousProps.current[key] !== props[key]) {
          changeObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changeObj).length) {
        callback(changeObj);
      }
    }

    previousProps.current = props;
  }, [props, callback]);
};
