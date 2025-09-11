import React, { type JSX } from "react";
import { useRequireAuthentication } from "~/utils/authentication";

export function Authenticated({ children }: { children: React.ReactNode }): JSX.Element {
  const isAuthenticated = useRequireAuthentication();

  return isAuthenticated ? <>{children}</> : <></>;
}
