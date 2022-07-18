import { SET_HIDE_MODAL, SET_SHOW_MODAL } from "./action";

export const initState = {
    showModal: false,
    movieData: {},
    positionX: 0,
    positionY: 0,
};

function reducer(state, action) {
    switch (action.type) {
        case SET_SHOW_MODAL:
            return {
                state: action.payload,
            };
        case SET_HIDE_MODAL:
            return {
                ...state,
                showModal: false,
            };
        default:
            throw new Error("invalid action0");
    }
}

export default reducer;
