import { discoverMoviesActionTypes } from "../constants";

const initState = {
    netflixOriginals: {},
    moviesByGenre: {},
    moviesTopRated: {},
    moviesTrending: {},
};

const moviesReducer = (state = initState, action) => {
    switch (action.type) {
        case discoverMoviesActionTypes.NetflixOriginals:
            return {
                ...state,
                netflixOriginals: action.payload,
            };

        case discoverMoviesActionTypes.MoviesTopRated:
            return {
                ...state,
                moviesTopRated: action.payload,
            };

        case discoverMoviesActionTypes.MoviesTrending:
            return {
                ...state,
                moviesTrending: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};

export default moviesReducer;
