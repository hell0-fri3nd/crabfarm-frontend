import { type RouteConfig,route,index } from "@react-router/dev/routes";

export default [

    // Public section
    route("/auth", "routes/auth-layout.tsx", [
        index("routes/auth/login.tsx"),
        route("pin", "routes/auth/pin.tsx"),
 
    ]),

    // Protected section
    route("page", "routes/page-layout.tsx", [
        index("routes/page/dashboard.tsx"),
        // route("settings", "routes/page/settings.tsx"),
        // route("profile", "routes/page/profile.tsx"),

    ]),
    route("/","routes/default-routing.tsx"),
    route("*", "routes/page-not-found.tsx")

] satisfies RouteConfig;
