const routes = {
    login: "/login",
    home: "/",
    browse: "/browse",
    tvshow: "/browse/:type",
    movie: "/browse/:type",
    lastest: "/browse/:type",
    mylist: "/browse/:type",
    category: "/browse/:type/:genreId",
    search: "/browse/:type/keyword",
    watching: "/watching/:id",
};

export default routes;
