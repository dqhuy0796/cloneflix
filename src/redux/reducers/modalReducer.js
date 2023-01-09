import { modalActionTypes } from "../constants";

const initState = {
    detailsShowing: false,
    previewShowing: false,
    previewPosition: {},
    data: {},
};

const modalReducer = (state = initState, action) => {
    switch (action.type) {
        case modalActionTypes.showPreview:
            return {
                ...state,
                previewShowing: true,
                previewPosition: action.payload.position,
                data: action.payload.data,
            };
        case modalActionTypes.hidePreview:
            return {
                ...state,
                previewShowing: false,
            };
        case modalActionTypes.showDetails:
            if (action.payload) {
                return {
                    ...state,
                    data: action.payload,
                    detailsShowing: true,
                };
            }
            return {
                ...state,
                detailsShowing: true,
            };
        case modalActionTypes.hideDetails:
            return {
                ...state,
                detailsShowing: false,
            };
        default:
            return {
                ...state,
            };
    }
};

export default modalReducer;
