import React from "react";
import { useRequireAuthentication } from "~/utils/authentication";

export function Authenticated({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useRequireAuthentication();

  return isAuthenticated ? <>{children}</> : null;
}
