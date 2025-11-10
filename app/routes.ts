import { type RouteConfig,route } from "@react-router/dev/routes";

export default [

    // Public section
    route("auth", "routes/auth-layout.tsx", [
        route("login", "routes/auth/login.tsx")
    ]),

    // Protected section
    route("page", "routes/page-layout.tsx", [
        route("dashboard", "routes/page/dashboard.tsx"),
        // route("settings", "routes/page/settings.tsx"),
        // route("profile", "routes/page/profile.tsx"),
    ]),

] satisfies RouteConfig;
