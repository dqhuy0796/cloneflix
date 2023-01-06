import { playerActionTypes } from "../constants";
import { discoverMoviesService, movieService, tvShowService } from "~/services";

export const playerAction = (data) => ({
    type: playerActionTypes.setPlay,
    payload: data,
});

export const dispatchPlayerAction = () => async (dispatch) => {
    const netflixOriginals = await discoverMoviesService.discoverNetflixOriginals();

    const randomIndex = Math.floor(Math.random() * netflixOriginals.results.length);
    const randomMedia = netflixOriginals.results[randomIndex];
    const response = randomMedia.first_air_date
        ? await tvShowService.getTvShowDetails(randomMedia.id)
        : await movieService.getMovieDetails(randomMedia.id);

    dispatch(playerAction(response));
};

// i have no idea to solve this
