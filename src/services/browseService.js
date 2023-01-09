import * as httpRequest from "../utils/httpRequest";

export const getNetflixOriginals = async (page = 1) => {
    try {
        const query = "/discover/movie";
        const payload = {
            api_key: process.env.REACT_APP_TMDB_API_KEY,
            language: "en-US",
            with_networks: 213,
            page: page,
        };
        const data = await httpRequest.getApi(query, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const getNetflixTrending = async (page = 1) => {
    try {
        const query = "/trending/all/day";
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
export const getAllGenres = async () => {
    try {
        const query = "genre/list";
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
export const getSearchMultiResult = async (keyword, page = 1) => {
    try {
        const query = "search/multi";
        const payload = {
            api_key: process.env.REACT_APP_TMDB_API_KEY,
            language: "en-US",
            query: keyword,
            page: page,
        };
        const data = await httpRequest.getApi(query, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};
