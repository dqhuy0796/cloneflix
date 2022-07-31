export const SET_SHOW_MINI_MODAL = "show_mini_modal";

export const SET_SHOW_PREVIEW_MODAL = "show_preview_modal";

export const SET_HIDE_PREVIEW_MODAL = "hide_preview_modal";

export const setShowMiniModal = (payload) => ({
    type: SET_SHOW_MINI_MODAL,
    payload,
});
export const setShowPreviewModal = (payload) => ({
    type: SET_SHOW_PREVIEW_MODAL,
    payload,
});

export const setHidePreviewModal = (payload) => ({
    type: SET_HIDE_PREVIEW_MODAL,
    payload,
});
