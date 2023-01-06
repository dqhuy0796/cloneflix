export const discoverMoviesActionTypes = Object.freeze({
    MovieGenres: "GET_MOVIE_GENRES",
    NetflixOriginals: "GET_MOVIES_NETFLIX_ORIGINALS",
    MoviesByGenre: "GET_MOVIES_BY_GENRE",
    MoviesTopRated: "GET_MOVIES_TOP_RATED",
    MoviesTrending: "GET_MOVIES_TRENDING",
    MoviesPopular: "GET_MOVIES_POPULAR",
    MoviesNowPlaying: "GET_MOVIES_NOW_PLAYING",
});

export const discoverTvShowsActionTypes = Object.freeze({
    TvShowGenres: "GET_TV_SHOW_GENRES",
    TvShowsByGenre: "GET_TV_SHOWS_BY_GENRE",
    TvShowsTopRated: "GET_TV_SHOWS_TOP_RATED",
    TvShowsTrending: "GET_TV_SHOWS_TRENDING",
    TvShowsPopular: "GET_TV_SHOWS_POPULAR",
    TvShowsOnTheAir: "GET_TV_SHOWS_ON_THE_AIR",
    TvShowsAiringToday: "GET_TV_SHOWS_AIRING_TODAY",
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
