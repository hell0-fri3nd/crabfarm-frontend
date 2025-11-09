import { type RouteConfig, index,route } from "@react-router/dev/routes";

export default [
    route("auth/login", "routes/auth/login.tsx"),
    route("dashboard", "routes/dashboard.tsx")
] satisfies RouteConfig;
