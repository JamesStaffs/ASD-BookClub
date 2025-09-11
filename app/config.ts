import type { Routes } from "./types/Routes";

export const API_BASE_URL = "https://687a1addabb83744b7eb7154.mockapi.io/api" as const;
export const JWT_LOCALSTORAGE_KEY = "jwt" as const;

export const ROUTES: Routes = {
    HOME: "/",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REGISTER: "/auth/register",
    LISTS: {
        INDEX: "/lists",
        NEW: "/lists/new",
        SHOW: {
            PATTERN: "/lists/:id",
            PATH: (id) => `/lists/${id}`
        },
        EDIT: {
            PATTERN: "/lists/:id/edit",
            PATH: (id) => `/lists/${id}/edit`
        },
    }
} as const;