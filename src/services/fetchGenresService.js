import * as httpRequest from "~/utils/httpRequest";

export const fetchMovieGenres = async () => {
    try {
        const query = "/genre/movie/list";
        const data = await httpRequest.getApi(query, {
            params: {
                api_key: process.env.REACT_APP_TMDB_API_KEY,
                language: "en-US",
            },
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const fetchTvShowGenres = async () => {
    try {
        const query = "/genre/movie/list";
        const data = await httpRequest.getApi(query, {
            params: {
                api_key: process.env.REACT_APP_TMDB_API_KEY,
                language: "en-US",
            },
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};
