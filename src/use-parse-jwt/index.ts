import { useMemo } from "react";
import { parseJWT } from "./parse-jwt";

export const useParseJWT = <T>(token: string) => {
  const JWT = useMemo(() => parseJWT<T>(token), [token]);

  return JWT;
};
