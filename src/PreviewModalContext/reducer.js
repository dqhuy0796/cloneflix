import { SET_HIDE_PREVIEW_MODAL, SET_SHOW_MINI_MODAL, SET_SHOW_PREVIEW_MODAL } from "./action";

export const initState = {
    isShowing: false,
    isFullsize: false,
    movie: null,
    position: null,
    // timeOut: null,
};

function reducer(state, action) {
    switch (action.type) {
        case SET_SHOW_MINI_MODAL:
            return {
                isShowing: true,
                isFullsize: false,
                movie: action.payload.movie,
                position: action.payload.position,
                // timeOut: action.payload.timeOut,
            };
        case SET_SHOW_PREVIEW_MODAL:
            return {
                isShowing: true,
                isFullsize: false,
                movie: action.payload.movie,
                position: action.payload.position,
            };
        case SET_HIDE_PREVIEW_MODAL:
            return {
                ...state,
                isShowing: false,
                isFullsize: false,
                // timeOut: null,
            };
        default:
            throw new Error("invalid action");
    }
}

export default reducer;
