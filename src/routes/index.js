import config from "~/config";
import Watching from "~/pages/Watching";
import Browse from "~/layouts/Browse";
import Category from "~/layouts/Category";
import Home from "~/pages/Home";
import Login from "~/pages/Login";
import NotFound from "~/pages/NotFound";
import MainLayout from "~/layouts/MainLayout";
import { Fragment } from "react";

const publicRoutes = [
    { path: config.routes.login, Component: Login, Layout: Fragment },
    { path: config.routes.home, Component: Home, Layout: Fragment },
    { path: config.routes.watching, Component: Watching, Layout: Fragment },
    { path: config.routes.browse, Component: Browse, Layout: MainLayout },
    { path: config.routes.movie, Component: Browse, Layout: MainLayout },
    { path: config.routes.tvshow, Component: Browse, Layout: MainLayout },
    { path: config.routes.category, Component: Category, Layout: MainLayout },
    { path: config.routes.search, Component: Category, Layout: MainLayout },
    { path: "*", Component: NotFound, Layout: Fragment },
];
const privateRoutes = [
    // { path: config.routes.account, Component: Watching },
];
export { privateRoutes, publicRoutes };
