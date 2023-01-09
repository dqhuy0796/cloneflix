import { pageActionTypes } from "../constants";

const initState = {
    type: { value: "", title: "" },
    genres: [],
    genreId: 0,
    currentGenre: { id: 0, name: "" },
    searchKeyword: "",
    breadcrumb: [],
};

const pageReducer = (state = initState, action) => {
    switch (action.type) {
        case pageActionTypes.setTypeParam:
            return {
                ...state,
                type: action.payload,
            };
        case pageActionTypes.setGenres:
            return {
                ...state,
                genres: action.payload,
            };
        case pageActionTypes.setGenreIdParam:
            return {
                ...state,
                genreId: action.payload,
            };
        case pageActionTypes.setCurrentGenre:
            return {
                ...state,
                currentGenre: action.payload,
            };
        case pageActionTypes.setBreadcrumb:
            return {
                ...state,
                breadcrumb: action.payload,
            };
        case pageActionTypes.setSearchKeyword:
            return {
                ...state,
                searchKeyword: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};

export default pageReducer;

// i have no idea
