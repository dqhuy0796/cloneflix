import * as httpRequest from "../utils/httpRequest";

export const discoverMovieGenres = async () => {
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
export const discoverNetflixOriginals = async (page) => {
    try {
        const query = "/discover/movie";
        const payload = {
            api_key: process.env.REACT_APP_TMDB_API_KEY,
            language: "en-US",
            with_networks: 213,
            page: page || 1,
        };
        const data = await httpRequest.getApi(query, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const discoverMoviesByGenre = async (genre, page) => {
    try {
        const query = "/discover/movie";
        const payload = {
            api_key: process.env.REACT_APP_TMDB_API_KEY,
            language: "en-US",
            with_genres: genre,
            page: page || 1,
        };
        const data = await httpRequest.getApi(query, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const discoverMoviesTopRated = async (page) => {
    try {
        const query = "/movie/top_rated";
        const payload = {
            api_key: process.env.REACT_APP_TMDB_API_KEY,
            language: "en-US",
            page: page || 1,
        };
        const data = await httpRequest.getApi(query, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const discoverMoviesTrending = async (page) => {
    try {
        const query = "/trending/movie/day";
        const payload = {
            api_key: process.env.REACT_APP_TMDB_API_KEY,
            language: "en-US",
            page: page || 1,
        };
        const data = await httpRequest.getApi(query, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};
