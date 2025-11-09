import { type RouteConfig, index,route } from "@react-router/dev/routes";

export default [
    index("routes/auth/login.tsx"),
    route("dashboard", "routes/dashboard.tsx")
] satisfies RouteConfig;
