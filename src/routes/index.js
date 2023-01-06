import config from "~/config";
import Account from "~/pages/Account";
import Categories from "~/pages/Categories";
import Details from "~/pages/Details";
import Home from "~/pages/Home";
import Login from "~/pages/Login";
import Search from "~/pages/Search";
import NotFound from "~/pages/NotFound";

const publicRoutes = [
    { path: config.routes.home, Component: Home },
    { path: config.routes.categories, Component: Categories },
    { path: config.routes.details, Component: Details },
    { path: config.routes.login, Component: Login },
    { path: config.routes.search, Component: Search },
    { path: "*", Component: NotFound },
];
const privateRoutes = [
    { path: config.routes.account, Component: Account },
    // { path: config.routes.account, Component: Account },
];
export { privateRoutes, publicRoutes };
