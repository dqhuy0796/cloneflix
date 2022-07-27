export const SET_SHOW_MOVIE_MODAL = "show_movie_modal";
export const SET_HIDE_MOVIE_MODAL = "hide_movie_modal";

export const setShowMovieModal = (payload) => ({
    type: SET_SHOW_MOVIE_MODAL,
    payload,
});
export const setHideMovieModal = (payload) => ({
    type: SET_HIDE_MOVIE_MODAL,
    payload,
});
