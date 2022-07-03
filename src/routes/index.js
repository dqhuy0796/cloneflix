import config from '~/config';
import Account from '~/pages/Account';
import Categories from '~/pages/Categories';
import Detail from '~/pages/Detail';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Search from '~/pages/Search';

const publicRoutes = [
    { path: config.routes.home, Component: Home },
    { path: config.routes.categories, Component: Categories },
    { path: config.routes.detail, Component: Detail },
    { path: config.routes.login, Component: Login },
    { path: config.routes.search, Component: Search },
];
const privateRoutes = [
    { path: config.routes.account, Component: Account },
    // { path: config.routes.account, Component: Account },
];
export { privateRoutes, publicRoutes };
