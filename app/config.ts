export const API_BASE_URL = "https://687a1addabb83744b7eb7154.mockapi.io/api";
export const JWT_LOCALSTORAGE_KEY = "jwt";
export const ROUTES = {
    HOME: "/",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REGISTER: "/auth/register",
    LISTS: {
        INDEX: "/lists",
        NEW: "/lists/new",
        SHOW: {
            PATTERN: "/lists/:id",
            PATH: (id: number | String) => `/lists/${id}`
        },
        EDIT: {
            PATTERN: "/lists/:id/edit",
            PATH: (id: number | String) => `/lists/${id}/edit`
        },
    }
};