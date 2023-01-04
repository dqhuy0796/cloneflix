import { bannerActionTypes } from "../constants";

const initState = {
    data: {},
};

const bannerReducer = (state = initState, action) => {
    switch (action.type) {
        case bannerActionTypes.getRandomMovie:
            return {
                ...state,
                data: action.payload,
            };

        default:
            return {
                ...state,
            };
    }
};

export default bannerReducer;
