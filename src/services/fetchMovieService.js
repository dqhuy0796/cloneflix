import * as httpRequest from "~/utils/httpRequest";

export const fetchMovie = async (id) => {
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
