import * as httpRequest from "~/utils/httpRequest";

export const fetchTvShow = async (id) => {
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
export const fetchTvShowSeason = async (id, season = 1) => {
    try {
        const data = await httpRequest.getApi(`tv/${id}/season/${season}`, {
            params: {
                api_key: process.env.REACT_APP_TMDB_API_KEY,
                language: "en-US",
                append_to_response: "videos",
            },
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};
