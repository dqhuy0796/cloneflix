import { pageActionTypes } from "../constants";
import { movieService, tvShowService } from "../../services";
import _ from "lodash";

export const setTypeParamAction = (data) => ({
    type: pageActionTypes.setTypeParam,
    payload: data,
});

export const setGenresAction = (data) => ({
    type: pageActionTypes.setGenres,
    payload: data,
});

export const setGenreIdParamAction = (data) => ({
    type: pageActionTypes.setGenreIdParam,
    payload: data,
});

export const setCurrentGenreAction = (data) => ({
    type: pageActionTypes.setCurrentGenre,
    payload: data,
});

export const setSearchKeywordAction = (data) => ({
    type: pageActionTypes.setSearchKeyword,
    payload: data,
});

export const setBreadcrumbAction = (data) => ({
    type: pageActionTypes.setBreadcrumb,
    payload: data,
});

export const loadTypeParamAction = (data) => async (dispatch) => {
    dispatch(setTypeParamAction(data));
    dispatch(loadGenresAction(data.value));
    if (_.isEmpty(data.title)) {
        dispatch(setBreadcrumbAction([]));
    } else {
        dispatch(setBreadcrumbAction([data.title]));
    }
};

export const loadGenresAction = (value) => async (dispatch) => {
    const response = value === "tv" ? await tvShowService.getTvShowGenres() : await movieService.getMovieGenres();
    dispatch(setGenresAction(response.genres));
};

export const loadGenreIdParamAction = (genreId, genres) => async (dispatch) => {
    dispatch(setGenreIdParamAction(genreId));
    dispatch(loadCurrentGenreAction(genreId, genres));
};

export const loadCurrentGenreAction = (type, genre) => async (dispatch) => {
    dispatch(setCurrentGenreAction(genre));
    dispatch(setGenreIdParamAction(genre.id));
    dispatch(setBreadcrumbAction([type.title, genre.name]));
};

export const resetCurrentGenreAction = () => async (dispatch) => {
    dispatch(setCurrentGenreAction({ id: 0, name: "" }));
    dispatch(setGenreIdParamAction(0));
};

export const loadSearchKeywordAction = (keyword) => async (dispatch) => {
    dispatch(setSearchKeywordAction(keyword));
    dispatch(loadTypeParamAction({ value: "search", title: "Search" }));
};

export const loadBreadcrumbAction = (type, genre) => async (dispatch) => {
    let breadcrumb = [];
    if (!_.isUndefined(type) && !_.isEmpty(type)) {
        breadcrumb.push(type.title);
    }
    if (!_.isUndefined(genre) && !_.isEmpty(genre)) {
        breadcrumb.push(genre.name);
    }
    dispatch(setBreadcrumbAction(breadcrumb));
};

// i have no idea to solve this
