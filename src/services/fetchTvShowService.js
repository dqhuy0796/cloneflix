import * as httpRequest from "~/utils/httpRequest";

export const fetchTvShow = async (id) => {
    try {
        const data = await httpRequest.fetchApi(`/tv/${id}`, {
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
