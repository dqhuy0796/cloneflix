import * as httpRequest from "~/utils/httpRequest";

export const getMovieDetails = async (id) => {
    try {
        const query = `/movie/${id}`;
        const payload = {
            api_key: process.env.REACT_APP_TMDB_API_KEY,
            language: "en-US",
            append_to_response: "videos",
        };
        const data = await httpRequest.getApi(query, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const getMovieRecommendations = async (id, page = 1) => {
    try {
        const query = `/movie/${id}/recommendations`;
        const payload = {
            api_key: process.env.REACT_APP_TMDB_API_KEY,
            language: "en-US",
            page: page,
        };
        const data = await httpRequest.getApi(query, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const getMovieSimilar = async (id, page = 1) => {
    try {
        const query = `/movie/${id}/similar`;
        const payload = {
            api_key: process.env.REACT_APP_TMDB_API_KEY,
            language: "en-US",
            page: page,
        };
        const data = await httpRequest.getApi(query, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const getMoviesNowPlaying = async (page = 1) => {
    try {
        const query = "/movie/now_playing";
        const payload = {
            api_key: process.env.REACT_APP_TMDB_API_KEY,
            language: "en-US",
            page: page,
        };
        const data = await httpRequest.getApi(query, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const getMoviesPopular = async (page = 1) => {
    try {
        const query = "/movie/popular";
        const payload = {
            api_key: process.env.REACT_APP_TMDB_API_KEY,
            language: "en-US",
            page: page,
        };
        const data = await httpRequest.getApi(query, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const getMoviesTopRated = async (page = 1) => {
    try {
        const query = "/movie/top_rated";
        const payload = {
            api_key: process.env.REACT_APP_TMDB_API_KEY,
            language: "en-US",
            page: page,
        };
        const data = await httpRequest.getApi(query, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const getMoviesTrending = async (page = 1) => {
    try {
        const query = "/trending/movie/day";
        const payload = {
            api_key: process.env.REACT_APP_TMDB_API_KEY,
            language: "en-US",
            page: page,
        };
        const data = await httpRequest.getApi(query, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};
