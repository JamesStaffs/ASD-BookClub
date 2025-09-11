import { UnauthorizedError } from "~/errors/UnauthorizedError";
import type { FetchAuthenticated, FetchAuthenticatedHandleUnauthorizedResponse } from "~/types/FetchAuthenticated";
import type { Jwt } from "~/types/Jwt";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as config from "~/config";

export function clientSetJwt(token: Jwt): void {
  window.localStorage.setItem(config.JWT_LOCALSTORAGE_KEY, token);
}

export function clientGetJwt(): Jwt | null {
  return window.localStorage.getItem(config.JWT_LOCALSTORAGE_KEY) as Jwt | null;
}

export function clientClearJwt(): void {
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

/**
 * @throws {UnauthorizedError}
 */
export const fetchAuthenticated: FetchAuthenticated = async (input, init = {}) => {
  const hasWindow = typeof window !== "undefined";
  const token: Jwt | null = hasWindow ? clientGetJwt() : null;

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
  if (!url.startsWith(config.API_BASE_URL) && !url.startsWith("http")) {
    url = config.API_BASE_URL + (url.startsWith("/") ? url : "/" + url);
  }

  // Inspect the response to ensure we are authenticated
  const response = await fetch(url, { ...init, headers });
  fetchAuthenticatedHandleUnauthorizedResponse(response);

  return response;
};

/**
 * @throws {UnauthorizedError}
 */
const fetchAuthenticatedHandleUnauthorizedResponse: FetchAuthenticatedHandleUnauthorizedResponse = (response) => {
  if (response.status === 401) {
    throw new UnauthorizedError();
  }
  return response;
};