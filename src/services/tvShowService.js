import * as httpRequest from "~/utils/httpRequest";

export const getTvShowDetails = async (id) => {
    try {
        const query = `/tv/${id}`;
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
export const getTvShowSeason = async (id, season = 1) => {
    try {
        const query = `tv/${id}/season/${season}`;
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
export const getTvShowRecommendations = async (id, page = 1) => {
    try {
        const query = `/tv/${id}/recommendations`;
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
export const getTvShowSimilar = async (id, page = 1) => {
    try {
        const query = `/tv/${id}/similar`;
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
export const getTvShowsAiringToday = async (page = 1) => {
    try {
        const query = "/tv/airing_today";
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
export const getTvShowsOnTheAir = async (page = 1) => {
    try {
        const query = "/tv/on_the_air";
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
export const getTvShowsPopular = async (page = 1) => {
    try {
        const query = "/tv/popular";
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
export const getTvShowsTopRated = async (page = 1) => {
    try {
        const query = "/tv/top_rated";
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
export const getTvShowsTrending = async (page = 1) => {
    try {
        const query = "/trending/tv/day";
        const payload = {
            api_key: process.env.REACT_APP_TMDB_API_KEY,
            language: "en-US",
            include_null_first_air_dates: false,
            page: page,
        };
        const data = await httpRequest.getApi(query, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const getTvShowsByGenreId = async (genreId, page = 1) => {
    try {
        const query = "/discover/tv";
        const payload = {
            api_key: process.env.REACT_APP_TMDB_API_KEY,
            language: "en-US",
            with_genres: genreId,
            page: page,
        };
        const data = await httpRequest.getApi(query, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const getTvShowGenres = async () => {
    try {
        const query = "/genre/tv/list";
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
