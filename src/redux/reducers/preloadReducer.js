import { preloadActionTypes } from "../constants";

const initState = {
    genres: {},
};

const preloadReducer = (state = initState, action) => {
    switch (action.type) {
        case preloadActionTypes.getAllGenres:
            return {
                ...state,
                genres: action.payload.genres,
            };

        default:
            return {
                ...state,
            };
    }
};

export default preloadReducer;
