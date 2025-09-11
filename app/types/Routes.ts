type RouteHelpers = {
    PATTERN: string;
    PATH: (id: number | string) => string;
};

export type Routes = {
    HOME: string;
    LOGIN: string;
    LOGOUT: string;
    REGISTER: string;
    LISTS: {
        INDEX: string;
        NEW: string;
        SHOW: RouteHelpers;
        EDIT: RouteHelpers;
    };
};