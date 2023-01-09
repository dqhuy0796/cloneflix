import { modalActionTypes } from "../constants";

export const setPreviewModal = (position, data) => (dispatch) => {
    dispatch(showPreviewModal({ position: position, data: data }));
};

export const showPreviewModal = (payload) => ({
    type: modalActionTypes.showPreview,
    payload: payload,
});

export const hidePreviewModal = () => ({
    type: modalActionTypes.hidePreview,
});

export const showDetailsModal = (data) => ({
    type: modalActionTypes.showDetails,
    payload: data,
});

export const hideDetailsModal = () => ({
    type: modalActionTypes.hideDetails,
});
