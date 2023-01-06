import { modalActionTypes } from "../constants";

const initState = {
    preview: {
        showing: false,
        position: {},
        data: {},
    },
    details: {
        showing: false,
        data: {},
    },
};

const modalReducer = (state = initState, action) => {
    switch (action.type) {
        case modalActionTypes.showPreview:
            return {
                ...state,
                preview: {
                    showing: true,
                    position: action.payload.position,
                    data: action.payload.data,
                },
            };
        case modalActionTypes.hidePreview:
            return {
                ...state,
                preview: {
                    ...state.preview,
                    showing: false,
                },
            };
        case modalActionTypes.preloadDetails:
            return {
                ...state,
                details: {
                    ...state.details,
                    data: action.payload,
                },
            };
        case modalActionTypes.showDetails:
            return {
                ...state,
                details: {
                    ...state.details,
                    showing: true,
                },
            };
        case modalActionTypes.hideDetails:
            return {
                ...state,
                details: {
                    ...state.details,
                    showing: false,
                },
            };
        default:
            return {
                ...state,
            };
    }
};

export default modalReducer;
