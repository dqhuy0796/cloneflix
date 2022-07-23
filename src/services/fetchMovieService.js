import * as httpRequest from "~/utils/httpRequest";

export const fetchMovie = async (id) => {
    try {
        const data = await httpRequest.fetchApi(`/movie/${id}`, {
            params: {
                api_key: httpRequest.API_KEY,
                language: "en-US",
                append_to_response: "videos",
            },
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};
