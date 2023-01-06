import * as httpRequest from "~/utils/httpRequest";

export const fetchTvShowGenres = async () => {
    try {
        const query = "/genre/movie/list";
        const payload = {
            api_key: process.env.REACT_APP_TMDB_API_KEY,
            language: "en-US",
        };
        const data = await httpRequest.getApi(query, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const discoverTopRatedTvShows = async (page) => {
    try {
        const query = "/tv/top_rated";
        const data = await httpRequest.getApi(query, {
            params: {
                api_key: process.env.REACT_APP_TMDB_API_KEY,
                language: "en-US",
                include_null_first_air_dates: false,
                page: page || 1,
            },
        });
        return data.results;
    } catch (error) {
        console.log(error);
    }
};
export const discoverTrendingTvShows = async (page) => {
    try {
        const query = "/trending/tv/day";
        const data = await httpRequest.getApi(query, {
            params: {
                api_key: process.env.REACT_APP_TMDB_API_KEY,
                language: "en-US",
                include_null_first_air_dates: false,
                page: page || 1,
            },
        });
        return data.results;
    } catch (error) {
        console.log(error);
    }
};
export const discoverTvShowsByGenre = async (genre, page) => {
    try {
        const query = "/discover/tv";
        const data = await httpRequest.getApi(query, {
            params: {
                api_key: process.env.REACT_APP_TMDB_API_KEY,
                language: "en-US",
                with_genres: genre,
                include_null_first_air_dates: false,
                page: page || 1,
            },
        });
        return data.results;
    } catch (error) {
        console.log(error);
    }
};
