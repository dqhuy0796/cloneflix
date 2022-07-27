import { SET_MINI_MODAL, SET_HIDE_MODAL, SET_SHOW_MODAL } from "./action";

export const initState = {
    isShowing: false,
    movie: null,
    position: null,
};

function reducer(state, action) {
    switch (action.type) {
        case SET_MINI_MODAL:
            return {
                ...state,
                isShowing: true,
                movie: action.payload.movie,
                position: action.payload.position,
            };
        case SET_SHOW_MODAL:
            return {
                ...state,
                isShowing: false,
            };
        case SET_HIDE_MODAL:
            return {
                ...state,
                isShowing: false,
            };
        default:
            throw new Error("invalid action");
    }
}

export default reducer;
