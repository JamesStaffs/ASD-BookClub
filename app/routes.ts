import { type RouteConfig, index, route } from "@react-router/dev/routes";
import * as config from "./config";

export default [
    index("routes/home.tsx"),

    route(config.ROUTES.LOGIN, "routes/auth/login.tsx"),
    route(config.ROUTES.LOGOUT, "routes/auth/logout.tsx"),

    route(config.ROUTES.LISTS.INDEX, "routes/lists/index.tsx"),
    route(config.ROUTES.LISTS.NEW, "routes/lists/new.tsx"),
    route(config.ROUTES.LISTS.SHOW.PATTERN, "routes/lists/show.tsx"),
    route(config.ROUTES.LISTS.EDIT.PATTERN, "routes/lists/edit.tsx"),
] satisfies RouteConfig;