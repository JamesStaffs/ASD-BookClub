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

// A wrapper for fetch() that includes the JWT in the Authorization header
export function fetchAuthenticated(input: RequestInfo, init: RequestInit = {}) {
  const hasWindow = typeof window !== "undefined";
  const token = hasWindow ? clientGetJwt() : null;

  const headers = new Headers(init.headers || {});
  
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  // Set Content-Type header if not already set and if method is not GET
  const method = (init.method || "GET").toUpperCase();
  if (method !== "GET" && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  let url = typeof input === "string" ? input : (input as Request).url;
  if (!url.startsWith(config.API_BASE_URL)) {
    url = config.API_BASE_URL + (url.startsWith("/") ? url : "/" + url);
  }

  return fetch(url, { ...init, headers });
}