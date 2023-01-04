import { discoverMoviesActionTypes } from "../constants";
import { discoverMoviesService } from "~/services";

export const mapNetflixOriginals = (data) => ({
    type: discoverMoviesActionTypes.NetflixOriginals,
    payload: data,
});

export const discoverNetflixOriginals = () => async (dispatch) => {
    const response = await discoverMoviesService.discoverNetflixOriginals();
    dispatch(mapNetflixOriginals(response));
};

export const mapMoviesTopRated = (data) => ({
    type: discoverMoviesActionTypes.MoviesTopRated,
    payload: data,
});

export const discoverMoviesTopRated = () => async (dispatch) => {
    const response = await discoverMoviesService.discoverMoviesTopRated();
    dispatch(mapMoviesTopRated(response));
};

export const mapMoviesTrending = (data) => ({
    type: discoverMoviesActionTypes.MoviesTrending,
    payload: data,
});

export const discoverMoviesTrending = () => async (dispatch) => {
    const response = await discoverMoviesService.discoverMoviesTrending();
    dispatch(mapMoviesTrending(response));
};
