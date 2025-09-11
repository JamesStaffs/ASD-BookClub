import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as config from "~/config";

export function clientSetJwt(token: string) {
  window.localStorage.setItem(config.JWT_LOCALSTORAGE_KEY, token);
}

export function clientGetJwt(): string | null {
  return window.localStorage.getItem(config.JWT_LOCALSTORAGE_KEY);
}

export function clientClearJwt() {
  window.localStorage.removeItem(config.JWT_LOCALSTORAGE_KEY);
}

export function isAuthenticatedClient(): boolean {
  const token = clientGetJwt();
  return !!token;
}

// Custom hook to enforce authentication in components
export function useRequireAuthentication(): boolean {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = clientGetJwt();
    if (!token) {
      setAuthenticated(false);
      navigate(config.ROUTES.LOGIN, { replace: true });
    } else {
      setAuthenticated(true);
    }
  }, [navigate]);

  return authenticated === true;
}