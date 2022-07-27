export const SET_MINI_MODAL = "set_mini_modal";
export const SET_SHOW_MODAL = "show_mini_modal";
export const SET_HIDE_MODAL = "hide_mini_modal";

export const setMiniModal = (payload) => ({
    type: SET_MINI_MODAL,
    payload,
});
export const setShowMiniModal = () => ({
    type: SET_SHOW_MODAL,
});
export const setHideMiniModal = () => ({
    type: SET_HIDE_MODAL,
});
