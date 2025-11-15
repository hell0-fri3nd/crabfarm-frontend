import { type RouteConfig,route,index } from "@react-router/dev/routes";

export default [

    // Public section
    route("/auth", "routes/auth-layout.tsx", [
        index("routes/auth/login.tsx"),
        route("pin", "routes/auth/pin.tsx"),
 
    ]),

    // Protected section
    route("/page", "routes/page-layout.tsx", [
        route("", "routes/page/dashboard.tsx"),
        route("logs", "routes/page/logs.tsx"),
        route("weigh-and-snap", "routes/page/weigh-and-snap.tsx"),

    ]),
    route("","routes/default-routing.tsx"),
    route("*", "routes/page-not-found.tsx")

] satisfies RouteConfig;
