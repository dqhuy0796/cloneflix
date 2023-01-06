import { discoverTvShowsActionTypes } from "../constants";

const initState = {
    genres: [],
    tvShowsTopRated: {},
    tvShowsTrending: {},
    tvShowsPopular: {},
    tvShowsAiringToday: {},
    tvShowsOnTheAir: {},
};

const tvShowsReducer = (state = initState, action) => {
    switch (action.type) {
        case discoverTvShowsActionTypes.TvShowGenres:
            return {
                ...state,
                genres: action.payload.genres,
            };
        case discoverTvShowsActionTypes.TvShowsTopRated:
            return {
                ...state,
                tvShowsTopRated: action.payload,
            };
        case discoverTvShowsActionTypes.TvShowsTrending:
            return {
                ...state,
                tvShowsTrending: action.payload,
            };
        case discoverTvShowsActionTypes.TvShowsPopular:
            return {
                ...state,
                tvShowsPopular: action.payload,
            };
        case discoverTvShowsActionTypes.TvShowsAiringToday:
            return {
                ...state,
                tvShowsAiringToday: action.payload,
            };
        case discoverTvShowsActionTypes.TvShowsOnTheAir:
            return {
                ...state,
                tvShowsOnTheAir: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};

export default tvShowsReducer;
