import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),

    route("/auth/login", "routes/auth/login.tsx"),
    // route("/auth/register", "routes/auth/register.tsx"),
    route("/auth/logout", "routes/auth/logout.tsx"),

    route("/lists", "routes/lists/index.tsx"),
    route("/lists/new", "routes/lists/new.tsx"),
    route("/lists/:id", "routes/lists/show.tsx"),
    route("/lists/:id/edit", "routes/lists/edit.tsx"),
] satisfies RouteConfig;
