import { bannerActionTypes } from "../constants";
import { discoverMoviesService, fetchMovieService, fetchTvShowService } from "~/services";

export const mapBannerMediaData = (data) => ({
    type: bannerActionTypes.getRandomMovie,
    payload: data,
});

export const fetchBannerMediaData = () => async (dispatch) => {
    const netflixOriginals = await discoverMoviesService.discoverNetflixOriginals();

    const randomIndex = Math.floor(Math.random() * netflixOriginals.results.length);
    const randomMedia = netflixOriginals.results[randomIndex];
    const response = randomMedia.first_air_date
        ? await fetchTvShowService.fetchTvShow(randomMedia.id)
        : await fetchMovieService.fetchMovie(randomMedia.id);
    dispatch(mapBannerMediaData(response));
};
