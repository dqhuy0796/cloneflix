export const preloadActionTypes = Object.freeze({
    getAllGenres: "GET_ALL_GENRES",
});

export const modalActionTypes = Object.freeze({
    showPreview: "PREVIEW_MODAL_SHOW",
    hidePreview: "PREVIEW_MODAL_HIDE",
    showDetails: "DETAILS_MODAL_SHOW",
    hideDetails: "DETAILS_MODAL_HIDE",
    preloadDetails: "DETAILS_MODAL_PRELOAD",
});

export const pageActionTypes = Object.freeze({
    setTypeParam: "SET_TYPE_PARAM",
    setGenreIdParam: "SET_GENRE_ID_PARAM",
    setGenres: "SET_GENRES",
    setCurrentGenre: "SET_CURRENT_GENRE",
    setSearchKeyword: "SET_SEARCH_KEYWORD",
    setBreadcrumb: "SET_BREADCRUMB",
});

export const userActionTypes = Object.freeze({
    addToMyList: "ADD_TO_MY_LIST",
    removeFromMyList: "REMOVE_FROM_MY_LIST",
    addToMyFavorite: "ADD_TO_MY_FAVOURITE",
    removeFromMyFavourite: "REMOVE_FROM_MY_FAVOURITE",
    selectProfile: "SELECT_PROFILE",
});
