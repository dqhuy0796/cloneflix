import { discoverTvShowsActionTypes } from "../constants";
import { tvShowService } from "~/services";

export const setTvShowGenres = (data) => ({
    type: discoverTvShowsActionTypes.TvShowGenres,
    payload: data,
});

export const getTvShowGenres = () => async (dispatch) => {
    const response = await tvShowService.getTvShowGenres();
    dispatch(setTvShowGenres(response));
};

export const setTvShowsTopRated = (data) => ({
    type: discoverTvShowsActionTypes.TvShowsTopRated,
    payload: data,
});

export const getTvShowsTopRated = () => async (dispatch) => {
    const response = await tvShowService.getTvShowsTopRated();
    dispatch(setTvShowsTopRated(response));
};

export const setTvShowsTrending = (data) => ({
    type: discoverTvShowsActionTypes.TvShowsTrending,
    payload: data,
});

export const getTvShowsTrending = () => async (dispatch) => {
    const response = await tvShowService.getTvShowsTrending();
    dispatch(setTvShowsTrending(response));
};

export const setTvShowsAiringToday = (data) => ({
    type: discoverTvShowsActionTypes.TvShowsAiringToday,
    payload: data,
});

export const getTvShowsAiringToday = () => async (dispatch) => {
    const response = await tvShowService.getTvShowsAiringToday();
    dispatch(setTvShowsAiringToday(response));
};

export const setTvShowsOnTheAir = (data) => ({
    type: discoverTvShowsActionTypes.TvShowsOnTheAir,
    payload: data,
});

export const getTvShowsOnTheAir = () => async (dispatch) => {
    const response = await tvShowService.getTvShowsOnTheAir();
    dispatch(setTvShowsOnTheAir(response));
};

export const setTvShowsPopular = (data) => ({
    type: discoverTvShowsActionTypes.TvShowsPopular,
    payload: data,
});

export const getTvShowsPopular = () => async (dispatch) => {
    const response = await tvShowService.getTvShowsPopular();
    dispatch(setTvShowsPopular(response));
};
