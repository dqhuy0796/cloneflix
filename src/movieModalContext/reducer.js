import { SET_HIDE_MOVIE_MODAL, SET_SHOW_MOVIE_MODAL } from "./action";

export const initState = {
    isShowing: false,
    movie: null,
};

function reducer(state, action) {
    switch (action.type) {
        case SET_SHOW_MOVIE_MODAL:
            return {
                isShowing: true,
                movie: action.payload,
            };
        case SET_HIDE_MOVIE_MODAL:
            return {
                ...state,
                isShowing: false,
            };
        default:
            throw new Error("invalid action");
    }
}

export default reducer;
