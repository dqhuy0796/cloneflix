export const discoverMoviesActionTypes = Object.freeze({
    MovieGenres: "DISCOVER_MOVIE_GENRES",
    NetflixOriginals: "DISCOVER_MOVIES_NETFLIX_ORIGINALS",
    MoviesByGenre: "DISCOVER_MOVIES_BY_GENRE",
    MoviesTopRated: "DISCOVER_MOVIES_TOP_RATED",
    MoviesTrending: "DISCOVER_MOVIES_TRENDING",
});

export const discoverTvShowsActionTypes = Object.freeze({
    TvShowGenres: "FETCH_TV_SHOW_GENRES",
    TvShowsByGenre: "DISCOVER_TV_SHOWS_BY_GENRE",
    TvShowsTopRated: "DISCOVER_TV_SHOWS_TOP_RATED",
    TvShowsTrending: "DISCOVER_TV_SHOWS_TRENDING",
});

export const playerActionTypes = Object.freeze({
    setPause: "PLAYER_PAUSE",
    setPlay: "PLAYER_PLAY",
    setStop: "PLAYER_STOP",
});

export const bannerActionTypes = Object.freeze({
    getRandomMovie: "BANNER_GET_RANDOM_MOVIE",
});

export const modalActionTypes = Object.freeze({
    showPreview: "PREVIEW_MODAL_SHOW",
    hidePreview: "PREVIEW_MODAL_HIDE",
    showDetails: "DETAILS_MODAL_SHOW",
    hideDetails: "DETAILS_MODAL_HIDE",
    preloadDetails: "DETAILS_MODAL_PRELOAD",
});
