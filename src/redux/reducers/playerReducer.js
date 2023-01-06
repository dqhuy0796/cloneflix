import { playerActionTypes } from "../constants";

const initState = {
    playing: false,
    ref: null,
    data: {},
};

const playerReducer = (state = initState, action) => {
    switch (action.type) {
        case playerActionTypes.setPlay:
            return {
                ...state,
            };
        default:
            return {
                ...state,
            };
    }
};

export default playerReducer;

// i have no idea
